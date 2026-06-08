import type { DeploymentInfo, Env, PreparedChainAction, ReceiptRecord, ShockCode } from "./types";

const TRY_ACTION_SELECTOR = "01ef1ff8";

const SHOCK_TO_ENUM: Record<ShockCode, number> = {
  NONE: 0,
  MARKET_HALT: 1,
  STALE_PRICE: 2,
  MAX_EXPOSURE: 3
};

function strip0x(value: string): string {
  return value.startsWith("0x") ? value.slice(2) : value;
}

function word(value: bigint | number): string {
  const bigintValue = typeof value === "bigint" ? value : BigInt(value);
  return bigintValue.toString(16).padStart(64, "0");
}

function paddedBytes(hex: string): string {
  const clean = strip0x(hex);
  const paddedLength = Math.ceil(clean.length / 64) * 64;
  return clean.padEnd(paddedLength, "0");
}

function encodeTryAction(receipt: ReceiptRecord): string {
  const actionType = receipt.actionType === "SELL_PRINCIPAL" ? 0 : 1;
  const shock = SHOCK_TO_ENUM[receipt.shock];
  const attemptedCalldata = strip0x(receipt.calldataHash);
  return `0x${TRY_ACTION_SELECTOR}${word(actionType)}${word(shock)}${word(96)}${word(attemptedCalldata.length / 2)}${paddedBytes(attemptedCalldata)}`;
}

export function getDeploymentInfo(env: Env): DeploymentInfo {
  const refusalHub = env.REFUSAL_HUB_ADDRESS || "";
  const policyRegistry = env.POLICY_REGISTRY_ADDRESS || "";
  const refusalReceipt = env.REFUSAL_RECEIPT_ADDRESS || "";
  const demoRwaAsset = env.DEMO_RWA_ASSET_ADDRESS || "";
  const configured = [refusalHub, policyRegistry, refusalReceipt, demoRwaAsset].every((value) =>
    /^0x[a-fA-F0-9]{40}$/.test(value)
  );
  return {
    status: configured ? "configured" : "pending",
    chainId: env.CHAIN_ID || "421614",
    chainName: env.CHAIN_NAME || "Arbitrum Sepolia",
    explorerBaseUrl: env.EXPLORER_BASE_URL || "https://sepolia.arbiscan.io",
    refusalHub,
    policyRegistry,
    refusalReceipt,
    demoRwaAsset,
    deployedAt: env.CONTRACTS_DEPLOYED_AT || ""
  };
}

export function prepareChainAction(receipt: ReceiptRecord, deployment: DeploymentInfo): PreparedChainAction | null {
  if (deployment.status !== "configured") return null;
  return {
    to: deployment.refusalHub,
    data: encodeTryAction(receipt),
    value: "0x0",
    chainId: `0x${Number(deployment.chainId).toString(16)}`,
    explorerHint: deployment.explorerBaseUrl,
    contractMethod: "RefusalHub.tryAction(uint8,uint8,bytes)"
  };
}

export async function requestWalletSendTransaction(action: PreparedChainAction): Promise<string> {
  const provider = (globalThis as unknown as { ethereum?: { request(args: unknown): Promise<string> } }).ethereum;
  if (!provider) {
    throw new Error("Wallet provider is unavailable in this browser context.");
  }
  return provider.request({
    method: "eth_sendTransaction",
    params: [
      {
        to: action.to,
        data: action.data,
        value: action.value,
        chainId: action.chainId
      }
    ]
  });
}
