import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { ContractFactory, JsonRpcProvider, Wallet, ZeroAddress } from "ethers";

const root = new URL("..", import.meta.url).pathname;
const artifactsDir = join(root, "artifacts", "contracts");
const deploymentsDir = join(root, "deployments");
const defaultRpcUrl = "https://sepolia-rollup.arbitrum.io/rpc";

async function applyEnvFile(filename) {
  const file = join(root, filename);
  if (!existsSync(file)) return;
  const text = await readFile(file, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key]) continue;
    process.env[key] = rawValue.replace(/^['"]|['"]$/g, "");
  }
}

async function applyLocalSecretSource() {
  const source = process.env.SECRET_SOURCE || join(process.env.HOME || "", "use_key.txt");
  if (!source || !existsSync(source) || process.env.PRIVATE_KEY) return;
  const text = await readFile(source, "utf8");
  const match = text.match(/^\s*PRIVATE_KEY\s*=\s*([^\r\n#]+)/m);
  const rawValue = match ? match[1] : text.trim().split(/\s+/)[0];
  if (rawValue) process.env.PRIVATE_KEY = rawValue.replace(/^['"]|['"]$/g, "");
}

await applyEnvFile(".env");
await applyLocalSecretSource();
process.env.ARBITRUM_SEPOLIA_RPC_URL ||= defaultRpcUrl;

const required = ["PRIVATE_KEY", "ARBITRUM_SEPOLIA_RPC_URL"];
const missing = required.filter((name) => !process.env[name]);
if (missing.length) {
  console.error(`Missing required env: ${missing.join(", ")}`);
  console.error("Load .env values or provide PRIVATE_KEY in $HOME/use_key.txt. The RPC defaults to the official Arbitrum Sepolia public RPC.");
  process.exit(1);
}

const chainId = process.env.CHAIN_ID || "421614";
const chainName = process.env.CHAIN_NAME || "Arbitrum Sepolia";
const explorerBaseUrl = process.env.EXPLORER_BASE_URL || "https://sepolia.arbiscan.io";
const provider = new JsonRpcProvider(process.env.ARBITRUM_SEPOLIA_RPC_URL);
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

async function artifact(name) {
  return JSON.parse(await readFile(join(artifactsDir, `${name}.json`), "utf8"));
}

async function deploy(name, args = []) {
  const item = await artifact(name);
  const factory = new ContractFactory(item.abi, item.bytecode, wallet);
  const contract = await factory.deploy(...args);
  await contract.waitForDeployment();
  const address = await contract.getAddress();
  console.log(`${name}: ${address}`);
  return { name, address, abi: item.abi };
}

console.log(`Deploying RefusalRail contracts as ${wallet.address} to ${chainName} (${chainId})`);

const policyRegistry = await deploy("PolicyRegistry");
const refusalReceipt = await deploy("RefusalReceipt", [ZeroAddress]);
const refusalHub = await deploy("RefusalHub", [policyRegistry.address, refusalReceipt.address]);
const receiptContract = new (await import("ethers")).Contract(refusalReceipt.address, refusalReceipt.abi, wallet);
const setHubTx = await receiptContract.setHub(refusalHub.address);
await setHubTx.wait();
console.log(`RefusalReceipt.setHub: ${setHubTx.hash}`);
const demoRwaAsset = await deploy("DemoRWAAsset", [wallet.address, 1_000_000n * 10n ** 18n]);

const deployedAt = new Date().toISOString();
const manifest = {
  chainId,
  chainName,
  explorerBaseUrl,
  deployer: wallet.address,
  deployedAt,
  contracts: {
    PolicyRegistry: policyRegistry.address,
    RefusalReceipt: refusalReceipt.address,
    RefusalHub: refusalHub.address,
    DemoRWAAsset: demoRwaAsset.address
  },
  transactions: {
    setHub: setHubTx.hash
  },
  env: {
    REFUSAL_HUB_ADDRESS: refusalHub.address,
    POLICY_REGISTRY_ADDRESS: policyRegistry.address,
    REFUSAL_RECEIPT_ADDRESS: refusalReceipt.address,
    DEMO_RWA_ASSET_ADDRESS: demoRwaAsset.address,
    CONTRACTS_DEPLOYED_AT: deployedAt,
    CHAIN_ID: chainId,
    CHAIN_NAME: chainName,
    EXPLORER_BASE_URL: explorerBaseUrl
  }
};

await mkdir(deploymentsDir, { recursive: true });
const filename = `${chainName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.json`;
await writeFile(join(deploymentsDir, filename), JSON.stringify(manifest, null, 2));

console.log(`Deployment manifest: deployments/${filename}`);
console.log("Wrangler vars to set:");
for (const [key, value] of Object.entries(manifest.env)) {
  console.log(`${key}=${value}`);
}
