import type { ActionType, PolicySnapshot, ReceiptRecord, ShockCode } from "./types";

export const POLICY: Omit<PolicySnapshot, "policyHash"> = {
  id: "rwa-standing-action-v1",
  version: 1,
  noSellPrincipal: true,
  allowDistributionSweep: true,
  maxExposureBps: 2500,
  stalePriceSeconds: 90,
  fallbackRoute: "claim_distribution_and_sweep_proceeds"
};

const REASON_BY_SHOCK: Record<ShockCode, string> = {
  NONE: "POLICY_PASS",
  MARKET_HALT: "MARKET_HALT",
  STALE_PRICE: "STALE_PRICE",
  MAX_EXPOSURE: "MAX_EXPOSURE"
};

const encoder = new TextEncoder();

export async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function currentPolicy(): Promise<PolicySnapshot> {
  const policyHash = await sha256Hex(JSON.stringify(POLICY));
  return { ...POLICY, policyHash };
}

export async function evaluateAction(input: {
  actionType: ActionType;
  shock: ShockCode;
  ownerId: string;
  userId: string;
  sessionId: string;
  roleId: string;
  walletAddress?: string;
}): Promise<Omit<ReceiptRecord, "id" | "createdAt">> {
  const policy = await currentPolicy();
  const blockedPrincipalSale =
    input.actionType === "SELL_PRINCIPAL" && policy.noSellPrincipal && input.shock !== "NONE";
  const blockedExposure =
    input.actionType === "SELL_PRINCIPAL" && input.shock === "MAX_EXPOSURE";
  const stalePriceBlock =
    input.actionType === "SELL_PRINCIPAL" && input.shock === "STALE_PRICE";
  const marketHaltBlock =
    input.actionType === "SELL_PRINCIPAL" && input.shock === "MARKET_HALT";

  const refused = blockedPrincipalSale || blockedExposure || stalePriceBlock || marketHaltBlock;
  const status = refused ? "refused" : "allowed";
  const reasonCode = refused ? REASON_BY_SHOCK[input.shock] : "POLICY_PASS";
  const balanceBefore = 100000;
  const balanceAfter = status === "allowed" ? 100240 : balanceBefore;

  const calldata = {
    actionType: input.actionType,
    shock: input.shock,
    ownerId: input.ownerId,
    policyHash: policy.policyHash,
    intent: input.actionType === "SELL_PRINCIPAL" ? "sell_principal" : "claim_distribution"
  };
  const shockSnapshot = {
    shock: input.shock,
    marketOpen: input.shock !== "MARKET_HALT",
    priceAgeSeconds: input.shock === "STALE_PRICE" ? 420 : 12,
    exposureBps: input.shock === "MAX_EXPOSURE" ? 4200 : 1600
  };
  const calldataHash = await sha256Hex(JSON.stringify(calldata));
  const shockHash = await sha256Hex(JSON.stringify(shockSnapshot));
  const proofHash = await sha256Hex(
    JSON.stringify({
      status,
      reasonCode,
      calldataHash,
      shockHash,
      policyHash: policy.policyHash,
      ownerId: input.ownerId
    })
  );

  return {
    status,
    actionType: input.actionType,
    shock: input.shock,
    reasonCode,
    policyHash: policy.policyHash,
    calldataHash,
    shockHash,
    proofHash,
    fallbackRoute: policy.fallbackRoute,
    ownerId: input.ownerId,
    userId: input.userId,
    sessionId: input.sessionId,
    roleId: input.roleId,
    walletAddress: input.walletAddress || "guest-wallet",
    balanceBefore,
    balanceAfter,
    chainTxHash: null,
    explorerUrl: null,
    chainProofStatus: "pending",
    chainAction: null
  };
}

export function shortHash(hash: string): string {
  if (!hash) return "";
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
}
