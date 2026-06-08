# GPT Pro Judge 01 - Rubric / Sponsor Fit

You are simulating a senior judge for the Arbitrum Open House London Online Buildathon.

Judge all ideas AND their demo plans together. Score every idea 0-10 on:
- Rubric fit: smart contract quality, PMF, innovation, real problem.
- Sponsor necessity: Robinhood Chain / Arbitrum / partner tech is structurally required.
- Track strategy: chance to compete for Overall + Best Agentic + Robinhood/Arbitrum reserved placement.
- Prize likelihood: would judges feel pressure to reward it?
- Fatal sponsor/rubric concern: yes/no.

Hackathon facts:
- Must deploy on an Arbitrum chain: Arbitrum One, Arbitrum Nova, Robinhood Chain testnet, or Arbitrum Sepolia.
- Prizes: 70k USDC Overall, 15k USDC Best Agentic Project, up to 30k USDC grants.
- At least one top-three project is reserved for Robinhood Chain and at least one for Arbitrum.
- Robinhood Chain: EVM L2 for tokenized RWAs/equities/ETFs/private assets, self-custody, programmatic finance, 24/7 access, built with Arbitrum Chain tech.

Candidates:
1. IDEA-001 ProofPay Mandates — expense reimbursement mandate; demo: judge submits receipt; valid pays, invalid rejects; proof: ExpensePaid/Rejected, receipt hash, policy hash.
2. IDEA-002 Standing Action Vault — tokenized ETF/RWA standing instructions; demo: judge chooses auto-claim/sweep/no-sell; distribution claimed, sell blocked; proof: policy vault, DistributionClaimed, ActionBlocked.
3. IDEA-003 DefaultShield — liquidation-defense mandate; demo: judge picks rescue rule and oracle shock; repayment executes, collateral sale blocked; proof: oracle snapshot, RescueExecuted, ForbiddenActionBlocked.
4. IDEA-004 TenderLock — tokenized equity tender/offer escrow; demo: judge signs tender mandate with min price/expiry; shares escrow and receipt minted; proof: Tender Receipt, mandate hash, gate checks.
5. IDEA-005 CovenantFuse — private-credit covenant drawdown vault; demo: judge selects receivable batch; draw releases or fails by covenant matrix; proof: risk-gate receipt, vault tx hash.
6. IDEA-006 RecallRail — opt-in time-boxed settlement recall; demo: wrong settlement, judge picks evidence type; payment returns/freezes/finalizes; proof: Settlement Rail Receipt.
7. IDEA-007 T+60 Ghost Order — challengeable scheduled intent; demo: future trade countdown, judge injects stale oracle/policy change; old calldata invalidated; proof: FlightRecorderReceipt.
8. IDEA-008 HedgeCovenant — no-sell hedge for tokenized equity exposure; demo: judge sets no-sell rule and market shock; hedge executes, principal sale blocked; proof: hedge tx, blocked sell receipt.
9. IDEA-009 Sealed Suitability — private/redacted compliance constraint; demo: judge seals secret rule; violating route rejected without revealing rule; proof: redacted receipt, ciphertext handle, allow/deny event.
10. IDEA-010 Refusal Theater — public refusal receipt; demo: judge chooses halt/stale/exposure shock and signs bad attempt; contract stamps NO and mints refusal receipt; proof: RefusalReceipt, calldata hash, policy version, oracle snapshot.

Output:
1. A markdown table with one row per idea and columns: Idea, Rubric Fit, Sponsor Necessity, Track Strategy, Prize Likelihood, Fatal Concern, Notes.
2. Top 3 picks with short reasons.
3. One selected winner from this judge only.

Be severe. Penalize generic dashboards/chatbots, weak Robinhood fit, and ideas that cannot win both demo attention and smart-contract-quality trust.
