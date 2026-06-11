export const routeEvidence = {
  route: "/app/build",
  surface: "Build and sponsor proof",
  userCaseBeat: "judge verifies live app, receipt ledger, Solidity contracts, and Arbitrum Sepolia binding",
  onboardingContract: {
    placeholders: [
      { "data-placeholder-example": "deployment-health", text: "Health JSON exposes build id, chain status, and refusal hub." },
      { "data-placeholder-example": "contract-proof", text: "Contract cards show RefusalHub, PolicyRegistry, RefusalReceipt, and DemoRWAAsset." }
    ],
    nextStep: { "data-next-step-cta": "open-health-json", text: "Open health JSON" },
    firstSessionTargetMs: 60000
  },
  seedDemoData: [
    { contract: "RefusalHub", address: "0x3540038833ae8750EfF20e7EfCaE16F206e90Cf8", reason: "deployed sponsor proof" },
    { contract: "PolicyRegistry", address: "0xa9df142D14218CC99f3068CBADC1D1965f7623B7", reason: "deployed policy proof" },
    { tx: "0x0b809bc31f75b6ff5947ccb5875dc5df975e1fe379b3a533f8e84454e42bf372", reason: "Arbitrum Sepolia refusal demo tx" }
  ]
};
