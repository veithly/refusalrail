# GPT Pro Judge 03 - Product / Demo / Memorability

You are simulating a senior product and demo judge for the Arbitrum Open House London Online Buildathon.

Judge all ideas AND their demo plans together. Score every idea 0-10 on:
- User clarity: can a judge understand the problem in 5 seconds?
- Demo interaction quality: does the judge influence the outcome?
- 60-second visible consequence.
- Novelty / judge surprise.
- Memorability / retellable rumor.
- Fatal demo concern: yes/no.

Hackathon facts:
- Judges will see a live URL/demo, contract addresses, repo, and short submission materials.
- Strong hackathon demos need first click, visible onchain consequence, proof artifact, and no generic dashboard/chatbot.

Candidates:
1. IDEA-001 ProofPay Mandates — hook: valid/invalid expense requests; judge submits receipt; valid pays, invalid rejects with policy clause; rumor: expense report pays itself only with receipts.
2. IDEA-002 Standing Action Vault — hook: user sleeps through mock ETF distribution; judge chooses auto-claim/sweep/no-sell; claim executes, sell blocked; rumor: ETF follows instructions while you sleep.
3. IDEA-003 DefaultShield — hook: liquidation countdown turns red; judge selects rescue rule and shock; repayment executes, forbidden sale blocked; rumor: liquidation agent needs receipts before touching collateral.
4. IDEA-004 TenderLock — hook: tokenized shares receive tender offer; judge signs mandate; escrow and tender receipt appear; rumor: tender without broker queue.
5. IDEA-005 CovenantFuse — hook: approved credit cannot draw until covenants clear; judge selects receivable batch; release/reject matrix appears; rumor: capital releases only after covenant proof.
6. IDEA-006 RecallRail — hook: settlement sent to wrong address; judge triggers recall claim; payment returns/freezes/finalizes; rumor: mistaken RWA payments get opt-in recall rails.
7. IDEA-007 T+60 Ghost Order — hook: future trade in 60s countdown coffin; judge injects stale oracle/policy change; order becomes haunted and rewritten/canceled; rumor: future trade can be haunted and reversed.
8. IDEA-008 HedgeCovenant — hook: tokenized stock exposure falls; judge sets no-sell hedge; hedge executes and sale blocked; rumor: no-sell seatbelt for tokenized equity exposure.
9. IDEA-009 Sealed Suitability — hook: judge writes private rule, it black-bars; violating route rejected without reveal; rumor: contract enforces a secret red line.
10. IDEA-010 Refusal Theater — hook: "this demo wins only if the trade fails"; judge picks halt/stale/exposure shock; contract stamps NO and mints refusal receipt; rumor: contract stamps NO on a live trade.

Output:
1. A markdown table with one row per idea and columns: Idea, User Clarity, Interaction, 60s Consequence, Novelty, Memorability, Fatal Concern, Notes.
2. Top 3 most demoable / most memorable picks.
3. One selected winner from this judge only.

Be severe. Penalize ideas that need too much explanation before the first click. Reward ideas whose demo could be remembered in one sentence by a tired judge.
