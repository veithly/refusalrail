export const routeEvidence = {
  route: "/app/receipts/[id]",
  surface: "Receipt detail",
  userCaseBeat: "proof artifact inspection",
  walletContract: {
    prepare: { "data-testid": "prepare-chain-action", text: "Prepare tx data" },
    send: { "data-testid": "send-chain-wallet", text: "Send with connected wallet" },
    bind: { "data-testid": "bind-chain-form", text: "Bind tx hash" }
  },
  onboardingContract: {
    placeholders: [
      { "data-placeholder-example": "missing-proof-id", text: "Receipt not found. Return to receipt history or run a new refusal." },
      { "data-placeholder-example": "chain-proof-pending", text: "Chain proof can be prepared after the receipt exists." }
    ],
    nextStep: { "data-next-step-cta": "back-to-receipts", text: "Back to receipts" },
    firstSessionTargetMs: 60000
  },
  seedDemoData: [
    { receiptId: "demo-market-halt", label: "(demo)", reason: "seed demo data detail includes proof hash" },
    { receiptId: "demo-stale-price", label: "(demo)", reason: "seed demo data detail includes calldata hash" },
    { receiptId: "demo-safe-sweep", label: "(demo)", reason: "seed demo data detail includes safe sweep contrast" }
  ]
};
