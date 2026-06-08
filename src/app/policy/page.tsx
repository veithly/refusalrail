export const routeEvidence = {
  route: "/app/policy",
  surface: "Policy editor",
  userCaseBeat: "policy audit and safe action contrast",
  onboardingContract: {
    placeholders: [
      { "data-placeholder-example": "policy-fallback-matrix", text: "Policy fallback matrix remains visible if the API is unavailable." },
      { "data-placeholder-example": "contract-address-pending", text: "Contract cards show pending or configured deployment state." }
    ],
    nextStep: { "data-next-step-cta": "run-refusal-from-policy", text: "Run refusal" },
    firstSessionTargetMs: 60000
  },
  seedDemoData: [
    { policyRow: "MARKET_HALT", outcome: "seed demo data refuses principal sale" },
    { policyRow: "STALE_PRICE", outcome: "seed demo data refuses stale quote" },
    { policyRow: "CLAIM_DISTRIBUTION", outcome: "seed demo data allows safe sweep" }
  ]
};
