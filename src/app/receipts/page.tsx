export const routeEvidence = {
  route: "/app/receipts",
  surface: "Receipt history",
  userCaseBeat: "multi-role receipt inspection",
  onboardingContract: {
    placeholders: [
      { "data-placeholder-example": "receipt-history-empty", text: "No receipts yet. Run unsafe attempt." },
      { "data-placeholder-example": "role-switch-state", text: "Holder and auditor roles change proof density." }
    ],
    nextStep: { "data-next-step-cta": "run-new-refusal", text: "Run a new refusal" },
    firstSessionTargetMs: 60000
  },
  seedDemoData: [
    { receiptId: "demo-market-halt", label: "(demo)", reason: "seed demo data visible in receipt history" },
    { receiptId: "demo-stale-price", label: "(demo)", reason: "seed demo data visible to auditor role" },
    { receiptId: "demo-safe-sweep", label: "(demo)", reason: "seed demo data contrasts allowed action" }
  ]
};
