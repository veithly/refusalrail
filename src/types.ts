export type ShockCode = "NONE" | "MARKET_HALT" | "STALE_PRICE" | "MAX_EXPOSURE";

export type ActionType = "SELL_PRINCIPAL" | "CLAIM_DISTRIBUTION";

export type ReceiptStatus = "refused" | "allowed";

export interface PolicySnapshot {
  id: string;
  version: number;
  policyHash: string;
  noSellPrincipal: boolean;
  allowDistributionSweep: boolean;
  maxExposureBps: number;
  stalePriceSeconds: number;
  fallbackRoute: string;
}

export interface ReceiptRecord {
  id: string;
  status: ReceiptStatus;
  actionType: ActionType;
  shock: ShockCode;
  reasonCode: string;
  policyHash: string;
  calldataHash: string;
  shockHash: string;
  proofHash: string;
  fallbackRoute: string;
  ownerId: string;
  userId: string;
  sessionId: string;
  roleId: string;
  walletAddress: string;
  balanceBefore: number;
  balanceAfter: number;
  chainTxHash: string | null;
  explorerUrl: string | null;
  chainProofStatus: "pending" | "prepared" | "submitted";
  chainAction: PreparedChainAction | null;
  createdAt: string;
}

export interface PreparedChainAction {
  to: string;
  data: string;
  value: string;
  chainId: string;
  explorerHint: string;
  contractMethod: string;
}

export interface DeploymentInfo {
  status: "pending" | "configured";
  chainId: string;
  chainName: string;
  explorerBaseUrl: string;
  walletConnectProjectId: string;
  publicRpcUrl: string;
  refusalHub: string;
  policyRegistry: string;
  refusalReceipt: string;
  demoRwaAsset: string;
  deployedAt: string;
}

export interface Env {
  LEDGER: DurableObjectNamespace;
  APP_ENV: string;
  BUILD_ID: string;
  CHAIN_ID?: string;
  CHAIN_NAME?: string;
  EXPLORER_BASE_URL?: string;
  WALLETCONNECT_PROJECT_ID?: string;
  PUBLIC_ARBITRUM_SEPOLIA_RPC_URL?: string;
  REFUSAL_HUB_ADDRESS?: string;
  POLICY_REGISTRY_ADDRESS?: string;
  REFUSAL_RECEIPT_ADDRESS?: string;
  DEMO_RWA_ASSET_ADDRESS?: string;
  CONTRACTS_DEPLOYED_AT?: string;
}
