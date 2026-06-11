export const routeEvidence = {
  route: "/app",
  surface: "Refusal workbench",
  hero: { "data-hero-text": "Reject 1 unsafe RWA trade in 60 seconds." },
  primaryCta: { "data-cta-primary": "connect-wallet-and-run-refusal" },
  walletContract: {
    connect: { "data-testid": "connect-wallet", text: "Connect wallet" },
    testWallet: { "data-testid": "use-test-wallet", address: "0x2eE81C112CA5A5Fd7123644f4c18262a05175c66" },
    sendTx: { "data-testid": "send-chain-wallet", method: "eth_sendTransaction" },
    modes: ["TestMode", "LiveMode", "data-mode"]
  },
  dataVisualLane: "operational-dashboard",
  dataHeroComposition: "policy-flight-recorder",
  onboardingContract: {
    placeholders: [
      { "data-placeholder-example": "receipt-empty-state", text: "No receipts yet. Run the refusal path to create evidence." },
      { "data-placeholder-example": "calldata-preview-state", text: "Policy executes before the agent can move principal." }
    ],
    nextStep: { "data-next-step-cta": "run-refusal", text: "Let the agent try" },
    firstSessionTargetMs: 60000
  },
  seedDemoData: [
    { "data-demo-badge": "(demo)", shock: "MARKET_HALT", reason: "seed demo data for first-run proof" },
    { "data-demo-badge": "(demo)", shock: "STALE_PRICE", reason: "seed demo data for stale-price proof" },
    { "data-demo-badge": "(demo)", shock: "MAX_EXPOSURE", reason: "seed demo data for exposure proof" }
  ]
};
