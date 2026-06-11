import { chromium } from "playwright";
import { mkdir, rm, copyFile, readFile } from "node:fs/promises";
import { join } from "node:path";
import { JsonRpcProvider, Wallet } from "ethers";

const projectRoot = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const baseUrl = process.env.DEMO_URL || "http://127.0.0.1:4393";
const outDir = join(projectRoot, "pitch", "recording");
const rawDir = join(projectRoot, "pitch", "_raw-recording-full");
const demoTestWallet = "0x2eE81C112CA5A5Fd7123644f4c18262a05175c66";
const fallbackTxHash = "0x0b809bc31f75b6ff5947ccb5875dc5df975e1fe379b3a533f8e84454e42bf372";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function parseEnvText(text) {
  const values = {};
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    let value = match[2].trim();
    if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    values[match[1]] = value;
  }
  return values;
}

async function loadLocalEnv() {
  const values = {};
  for (const name of [".env", ".env.local"]) {
    try {
      Object.assign(values, parseEnvText(await readFile(join(projectRoot, name), "utf8")));
    } catch {
      // Optional local files. Recording can still bind the known real demo tx.
    }
  }
  return values;
}

async function createSigner() {
  const localEnv = await loadLocalEnv();
  const privateKey = String(process.env.PRIVATE_KEY || localEnv.PRIVATE_KEY || "").trim();
  const rpcUrl = String(
    process.env.ARBITRUM_SEPOLIA_RPC_URL ||
      process.env.PUBLIC_ARBITRUM_SEPOLIA_RPC_URL ||
      localEnv.ARBITRUM_SEPOLIA_RPC_URL ||
      localEnv.PUBLIC_ARBITRUM_SEPOLIA_RPC_URL ||
      "https://sepolia-rollup.arbitrum.io/rpc"
  ).trim();
  const normalizedPrivateKey = privateKey && !privateKey.startsWith("0x") ? `0x${privateKey}` : privateKey;
  if (!/^0x[a-fA-F0-9]{64}$/.test(normalizedPrivateKey) || !rpcUrl) return null;
  const provider = new JsonRpcProvider(rpcUrl, 421614);
  return new Wallet(normalizedPrivateKey, provider);
}

async function main() {
  const signer = await createSigner();
  const account = signer ? signer.address : demoTestWallet;

  await mkdir(outDir, { recursive: true });
  await rm(rawDir, { recursive: true, force: true });
  await mkdir(rawDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1200 },
    deviceScaleFactor: 1,
    recordVideo: { dir: rawDir, size: { width: 1920, height: 1200 } }
  });

  await context.exposeFunction("__rrSendDemoTransaction", async (transaction) => {
    if (!signer) return fallbackTxHash;
    try {
      const sent = await signer.sendTransaction({
        to: transaction.to,
        data: transaction.data,
        value: BigInt(transaction.value || "0x0")
      });
      return sent.hash;
    } catch {
      return fallbackTxHash;
    }
  });

  await context.addInitScript((walletAddress) => {
    globalThis.ethereum = {
      on() {},
      async request(args) {
        if (args.method === "eth_requestAccounts") return [walletAddress];
        if (args.method === "wallet_switchEthereumChain") return null;
        if (args.method === "wallet_addEthereumChain") return null;
        if (args.method === "eth_sendTransaction") return globalThis.__rrSendDemoTransaction(args.params && args.params[0] ? args.params[0] : {});
        return null;
      }
    };
  }, account);

  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await wait(2200);

  await page.getByTestId("connect-wallet").click();
  await page.getByText(/Browser wallet connected/i).first().waitFor({ timeout: 10000 });
  await wait(3000);

  await page.goto(`${baseUrl}/app`, { waitUntil: "networkidle" });
  await page.getByText(/Browser wallet connected/i).first().waitFor({ timeout: 10000 });
  await wait(2200);
  await page.getByRole("radio", { name: /MARKET_HALT/i }).click();
  await wait(1300);
  await page.getByTestId("run-refusal").click();
  await page.getByText(/Refused\. Receipt/i).waitFor({ timeout: 10000 });
  await wait(3200);

  await page.getByTestId("open-latest-receipt").first().click();
  await page.getByRole("rowheader", { name: "walletAddress" }).waitFor({ timeout: 10000 });
  await wait(2600);
  await page.getByTestId("prepare-chain-action").click();
  await page.locator("#chain-action-output").getByText(/RefusalHub|contractMethod|data|to/i).waitFor({ timeout: 10000 });
  await wait(2600);
  await page.getByTestId("send-chain-wallet").click();
  await page.getByRole("heading", { name: "Chain proof submitted" }).waitFor({ timeout: 10000 });
  await wait(3200);

  await page.goto(`${baseUrl}/app`, { waitUntil: "networkidle" });
  await wait(1400);
  await page.getByTestId("run-safe").click();
  await page.getByText(/Allowed\. Safe sweep receipt/i).waitFor({ timeout: 10000 });
  await wait(2500);

  await page.goto(`${baseUrl}/app/policy`, { waitUntil: "networkidle" });
  await wait(3300);
  await page.goto(`${baseUrl}/app/receipts?role=auditor`, { waitUntil: "networkidle" });
  await wait(3300);
  await page.goto(`${baseUrl}/app/build`, { waitUntil: "networkidle" });
  await wait(3600);

  const video = page.video();
  await page.close();
  await context.close();
  await browser.close();

  const rawPath = await video.path();
  const target = join(outDir, "full-demo.webm");
  await copyFile(rawPath, target);
  console.log(`wrote ${target}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
