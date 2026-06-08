# GPT Pro Judge 02 - Technical Execution

You are simulating a senior Web3 technical judge for the Arbitrum Open House London Online Buildathon.

Judge all ideas AND their demo plans together. Score every idea 0-10 on:
- Feasibility in a short buildathon.
- Smart contract quality potential.
- Integration risk, where 10 = low/manageable risk and 0 = likely failure.
- Proof strength: explorer/event/receipt/test/Dune evidence.
- Realness: can judges actually click through a real onchain flow?
- Fatal technical concern: yes/no.

Hackathon facts:
- Must deploy on an Arbitrum chain.
- Submission asks for frontend/demo URL and core contract addresses.
- Judging includes smart contract quality.
- Partner primitives include Robinhood Chain, Arbitrum/Stylus, ZeroDev, Dune, OpenZeppelin, GMX, Fhenix, Alchemy, AWS.

Candidates:
1. IDEA-001 ProofPay Mandates — receipt-bound reimbursement; valid pays, invalid rejects; contracts: mandate, receipt hash, payment/rejection events.
2. IDEA-002 Standing Action Vault — RWA standing instructions; distribution claim/sweep/no-sell; contracts: vault policy, mock RWA/distribution, action blocker.
3. IDEA-003 DefaultShield — liquidation-defense mandate; oracle shock triggers repay; contracts: mock lending, rescue policy, block sale.
4. IDEA-004 TenderLock — tender/offer escrow; mandate gates price/time/eligibility/revocation; contracts: offer registry, escrow, tender receipt.
5. IDEA-005 CovenantFuse — covenant drawdown vault; agents/signatures/risk matrix; contracts: credit vault, covenant registry, draw/reject.
6. IDEA-006 RecallRail — settlement recall right; evidence gates and final state; contracts: settlement rail, recall claim, finalization.
7. IDEA-007 T+60 Ghost Order — challengeable scheduled intent; bond/expiry/calldata commitment/challenge; contracts: intent escrow, challenge verifier, flight recorder.
8. IDEA-008 HedgeCovenant — no-sell hedge; hedge can open, principal sale blocked; contracts: policy, mock hedge, blocked sale receipt.
9. IDEA-009 Sealed Suitability — private encrypted rule; Fhenix/confidential check or mock; contracts: encrypted policy, route hash, redacted receipt.
10. IDEA-010 Refusal Theater — refusal receipt; unsafe calldata refused under halt/stale/exposure; contracts: RefusalHub, policy registry, receipt NFT/SBT.

Output:
1. A markdown table with one row per idea and columns: Idea, Feasibility, Contract Quality, Integration Risk, Proof Strength, Realness, Fatal Concern, Notes.
2. Top 3 safest high-upside builds.
3. One selected winner from this judge only.

Be severe. Penalize FHE/integration complexity, vague oracle assumptions, and anything likely to fail live. Reward a small airtight contract primitive with strong tests and explorer-visible events.
