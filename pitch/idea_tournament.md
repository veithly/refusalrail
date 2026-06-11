# Idea Tournament

## Context

- Hackathon: Arbitrum Open House London: Online Buildathon.
- Required deployment: Arbitrum chain; supported networks include Arbitrum One, Arbitrum Nova, Robinhood Chain testnet, and Arbitrum Sepolia.
- Prize strategy: 70k USDC Overall, 15k USDC Best Agentic Project, up to 30k USDC grants.
- Strategic note: at least one top-three project is reserved for Robinhood Chain and at least one for Arbitrum.
- Rubric: smart contract quality, product-market fit, innovation/creativity, solving a real problem.
- Sponsor primitives: Robinhood Chain RWA finance, Arbitrum/Stylus, ZeroDev, Dune, OpenZeppelin, GMX, Fhenix, Alchemy, AWS.

## G0 Winner-Slot Handoff

- winner slot fit: primary story is Arbitrum product realness for an agentic RWA refusal receipt, not a generic AI assistant.
- selectedWinnerSlot: prove one refused RWA agent action becomes wallet-linked Arbitrum Sepolia receipt proof in 60 seconds.
- proofPathBeforeSubmission: public live app, saved `NO` receipt, deployed Arbitrum Sepolia contracts, refused explorer tx, 18 deployed E2E checks, and HackQuest-hosted video/images.
- saturationRisk: medium; adjacent HackQuest cards cluster around DeFi/RWA primitives and wallet defense, but not refusal receipts.
- nearestCompetitor: shieldai for wallet safety, bitUSD for DeFi contract proof, and EduBricks for RWA positioning.
- required mutation: make the failed action the durable artifact: 1 NO receipt names wallet and hashes.

## Raw GPT Pro Ideation Windows

| Window | Prompt | Response | Ideas returned |
|---|---|---|---:|
| 01-problem-scar | `pitch/gpt-pro/prompts/ideation/01-problem-scar-compact.md` | `pitch/gpt-pro/responses/ideation/01-problem-scar-response.md` | 3 |
| 02-winner-pattern | `pitch/gpt-pro/prompts/ideation/02-winner-pattern-compact.md` | `pitch/gpt-pro/responses/ideation/02-winner-pattern-response.md` | 3 |
| 03-sponsor-primitive | `pitch/gpt-pro/prompts/ideation/03-sponsor-primitive.md` + manual fallback extraction | `pitch/gpt-pro/responses/ideation/03-sponsor-primitive-response.md` | 3 |
| 04-weird-demo | `pitch/gpt-pro/prompts/ideation/04-weird-demo.md` | `pitch/gpt-pro/responses/ideation/04-weird-demo-response.md` | 3 |

## Dedupe Notes

- `ActionVault for Tokenized Assets` and `MandateRail` merge into `IDEA-002 Standing Action Vault`: same retail/RWA standing-instruction primitive and same proof surface.
- `BlackoutProof` and `Black-Bar Broker` merge into `IDEA-009 Sealed Suitability`: same hidden constraint / redacted compliance proof primitive.
- `T+60 Ghost Order` and `RecallRail` are kept separate because one challenges a future user operation before execution and the other adds an opt-in settlement recall right after payment.
- `Refusal Theater` is kept separate from other policy-gated concepts because its demo win condition is a public onchain refusal receipt, not successful execution.

## Deduped Candidates

| Idea ID | Name | 5-12 word rumor | Winner pattern basis | Novelty delta | Judge surprise | Demo interaction | New primitive | 60s consequence | Proof artifact | Merged from |
|---|---|---|---|---|---|---|---|---|---|---|
| `IDEA-001` | ProofPay Mandates | Expense report pays itself, only with receipts. | DoraHacks-style one concrete financial action; contract mandate gates agent-prepared reimbursement. | Moves hackathon/grant reimbursement from multisig chaos to receipt-bound delegated spending. | Judge submits valid and invalid receipts; one pays, one rejects. | Judge chooses an expense and sees policy clause enforcement. | Receipt-bound payment mandate. | Valid reimbursement paid; invalid request rejected with clause. | `ExpensePaid` / `ExpenseRejected`, receipt hash, policy hash, audit packet. | ProofPay Mandates |
| `IDEA-002` | Standing Action Vault | Tokenized ETF follows instructions while you sleep. | AgentMandate + Robinhood Chain RWA standing instructions. | Agent is not trading for alpha; it executes narrow asset operations like distributions, sweeps, no-sell rules. | Agent is allowed to claim distribution but blocked from selling principal. | Judge chooses policy; simulated corporate action fires. | RWA standing-action vault. | Distribution claimed and swept; prohibited sell blocked. | Policy vault record, `DistributionClaimed`, `SweepExecuted`, `ActionBlocked`. | ActionVault + MandateRail |
| `IDEA-003` | DefaultShield | Liquidation agent needs receipts before touching collateral. | Agentic risk gate with onchain rescue policy. | Focuses on defensive permissioned rescue, not yield optimization. | Judge pushes position below threshold and watches only allowed repayment execute. | Judge selects rescue rule and injects oracle shock. | Liquidation-defense mandate. | Health factor improves; forbidden collateral sale blocked. | Oracle snapshot, policy hash, `RescueExecuted`, `ForbiddenActionBlocked`. | DefaultShield |
| `IDEA-004` | TenderLock | Tokenized equity holders tender without broker queue. | Corporate-action escrow translates RWA winner patterns into one concrete action. | Makes tokenized equities programmable beyond trading: tender, opt-in, revoke, expire. | Judge signs mandate and sees shares escrow only if timing/price/eligibility gates pass. | Judge creates tender mandate with expiry and revocation window. | Mandated corporate-action escrow. | Tender receipt minted with gate results and escrow state. | Tender Receipt NFT/SBT, mandate hash, gate checks, execution event. | TenderLock |
| `IDEA-005` | CovenantFuse | Private-credit agents release capital only after covenant proof. | DeFAI policy gates + verifiable capital movement. | Attacks post-issuance RWA credit operations, not RWA token launch. | One failed covenant keeps capital locked; passed checks release drawdown. | Judge requests draw and selects receivable batch. | Covenant-gated drawdown vault. | USDC releases or stays locked with pass/fail matrix. | Risk-gate receipt, agent signatures, covenant thresholds, vault tx hash. | CovenantFuse |
| `IDEA-006` | RecallRail | Mistaken RWA payments get opt-in recall rails. | Time-boxed settlement safety for institutional self-custody. | Adds programmable, transparent recovery without custodial rollback. | Judge sends wrong settlement and triggers recall before finality. | Judge chooses evidence type for recall claim. | Time-boxed settlement recall right. | Payment returns, freezes, or finalizes based on pre-agreed gates. | Settlement Rail Receipt, recall window, evidence hash, final state event. | RecallRail |
| `IDEA-007` | T+60 Ghost Order | Future trade can be haunted and reversed. | Challengeable intent + agentic delayed execution. | Agent actions get due process; pending action can be challenged before execution. | Countdown order becomes "haunted" after judge injects stale oracle/policy change. | Judge arms future order, then injects shock during countdown. | ChallengeableIntent. | Old calldata invalidated; safe route or cancellation receipt appears. | FlightRecorderReceipt with intent hash, challenge packet, old/new policy. | T+60 Ghost Order |
| `IDEA-008` | HedgeCovenant | No-sell seatbelt for tokenized equity exposure. | RWA risk mandate + policy-gated hedging. | Hedges downside without allowing agent to liquidate the user's core asset. | Judge chooses "never sell principal"; hedge can open, sell attempt fails. | Judge injects downside scenario and sees hedge policy execute. | No-sell hedge covenant. | Hedge action executes; principal sale blocked. | Policy hash, hedge tx, blocked sell receipt, exposure before/after. | HedgeCovenant |
| `IDEA-009` | Sealed Suitability | Contract enforces a secret red line. | Fhenix/private constraint + Robinhood RWA suitability. | Compliance proof without exposing holdings or private constraints. | Judge types a private forbidden ticker; public receipt says denied by private rule. | Judge seals secret rule; agent proposes violating route. | SealedSuitabilityPredicate. | Route rejected by private rule without revealing it. | Redacted receipt, ciphertext handle, policy commitment, allow/deny event. | BlackoutProof + Black-Bar Broker |
| `IDEA-010` | Refusal Theater | Contract stamps NO on a live trade. | AgentMandate/DeFAI refusal becomes the artifact. | The failed action is the product: public proof of exactly why unsafe calldata was refused. | Judge tries to force bad trade; system celebrates refusal with red receipt. | Judge picks shock card: halt, stale price, exposure. | RefusalReceipt. | Bad trade refused; red receipt minted with policy and fallback route. | RefusalReceipt NFT/SBT, calldata hash, policy version, refusal reason, oracle snapshot. | Refusal Theater |

## Demo Interaction Plans

| Idea ID | 0-10s hook | 10-30s interaction | 30-60s consequence | Judge participation | Visual staging | Fallback if live input fails |
|---|---|---|---|---|---|---|
| `IDEA-001` | Valid and invalid expense requests side by side. | Judge submits one receipt. | One payment executes, one rejects with exact clause. | Chooses receipt and category. | Receipt scanner + policy clause spotlight. | Seeded receipts and predeployed events. |
| `IDEA-002` | User sleeps through mock ETF distribution. | Judge chooses auto-claim/sweep/no-sell policy. | Distribution claimed; prohibited sell blocked. | Chooses standing instruction. | Asset timeline and policy card. | Mock distribution contract and seeded vault state. |
| `IDEA-003` | Health factor countdown turns red. | Judge selects rescue rule and pushes price down. | Repay executes; forbidden collateral sale blocked. | Chooses rule and shock size. | Liquidation meter + receipt drawer. | Mock lending/oracle contracts. |
| `IDEA-004` | Tender offer appears for tokenized shares. | Judge signs tender mandate. | Escrow and tender receipt appear. | Sets min price, quantity, expiry. | Corporate-action ticket + receipt. | Mock offer registry and seeded events. |
| `IDEA-005` | Borrower has approved credit but draw is locked. | Judge selects receivable batch. | Draw releases or fails with covenant matrix. | Chooses batch / covenant scenario. | Risk committee matrix. | Mock receivable batch and vault events. |
| `IDEA-006` | Settlement is sent to wrong address. | Judge triggers recall claim. | Payment returns/freezes/finalizes. | Chooses evidence type. | Settlement rail timeline. | Seeded payment and recall events. |
| `IDEA-007` | Future trade in 60s countdown coffin. | Judge injects stale oracle/policy change. | Pending action becomes challenged and rewritten/canceled. | Chooses challenge packet. | Ghost overlay + flight recorder. | Precomputed challenge packets. |
| `IDEA-008` | Tokenized stock exposure falls fast. | Judge sets no-sell hedge covenant. | Hedge executes; principal sale fails. | Chooses no-sell rule and shock. | Seatbelt / hedge path animation. | Mock asset + hedge token events. |
| `IDEA-009` | Judge writes a private rule, then it black-bars. | Judge seals secret rule. | Violating route rejected by private predicate. | Creates secret forbidden constraint. | Redacted receipt / sealed envelope. | Precomputed encrypted policy; Fhenix mock if live FHE slow. |
| `IDEA-010` | "This demo only wins if the trade fails." | Judge chooses halt/stale/exposure shock. | Contract refuses and mints red receipt. | Picks the poison card and signs bad attempt. | Courtroom red stamp + flight recorder. | Preseeded refusal events and local oracle toggle. |

## GPT Pro Judges

| Judge | Prompt | Response | Role |
|---|---|---|---|
| Rubric/Sponsor | `pitch/gpt-pro/prompts/judging/01-rubric-sponsor-judge.md` | `pitch/gpt-pro/responses/judging/01-rubric-sponsor-judge-response.md` | Sponsor/rubric fit |
| Technical | `pitch/gpt-pro/prompts/judging/02-technical-execution-judge.md` | `pitch/gpt-pro/responses/judging/02-technical-execution-judge-response.md` | Execution risk |
| Product/Demo | `pitch/gpt-pro/prompts/judging/03-product-demo-judge.md` | `pitch/gpt-pro/responses/judging/03-product-demo-judge-response.md` | User clarity and showmanship |

## Scoreboard

Judge averages use the numeric dimensions each judge provided. Ideas with any fatal concern remain visible but are excluded from final selection unless the concern is explicitly resolved.

| Idea ID | Rubric/Sponsor Avg | Technical Avg | Product/Demo Avg | Aggregate | Fatal concerns | Judge picks |
|---|---:|---:|---:|---:|---|---|
| `IDEA-001` | 2.88 | 8.80 | 8.00 | 6.56 | Rubric/Sponsor: too generic / weak sponsor need |  |
| `IDEA-002` | 8.68 | 6.80 | 7.40 | 7.63 | None | Rubric/Sponsor winner |
| `IDEA-003` | 6.70 | 5.40 | 8.20 | 6.77 | Technical: real liquidation/oracle flow likely fragile |  |
| `IDEA-004` | 8.68 | 8.00 | 6.40 | 7.69 | Product/Demo: explanation-heavy and legal realism risk |  |
| `IDEA-005` | 6.98 | 5.20 | 5.80 | 5.99 | Technical + Product/Demo: overcomplicated / dashboard risk |  |
| `IDEA-006` | 4.25 | 8.00 | 8.80 | 7.02 | Rubric/Sponsor: fights blockchain finality / weak sponsor fit |  |
| `IDEA-007` | 8.55 | 7.40 | 9.20 | 8.38 | None | Product/Demo top 2 |
| `IDEA-008` | 7.90 | 6.80 | 7.20 | 7.30 | None |  |
| `IDEA-009` | 8.18 | 3.60 | 8.60 | 6.79 | Technical + Product/Demo: FHE/privacy credibility risk |  |
| `IDEA-010` | 7.28 | 8.80 | 9.60 | 8.56 | None | Technical winner; Product/Demo winner |

## Selected Winner

- Idea ID: `IDEA-010`
- Working project name after sponsor hardening: **RefusalRail**
- Why it wins: highest aggregate among non-fatal candidates; best technical proof surface; strongest live demo; two of three GPT Pro judges selected it.
- Sponsor hardening from judges: the Rubric/Sponsor judge worried that "Refusal Theater" can feel thin as a standalone product. The selected concept should be packaged as a Robinhood Chain RWA standing-action safety rail: users authorize narrow agent actions, but every unsafe RWA action produces a public refusal receipt.
- Recent idea family: agentic finance mandate / DeFAI risk gate / decision receipt.
- Freshness Delta: moves beyond 2026 "agent with daily limit" examples by making the refused unsafe action itself a durable receipt and first-screen proof.
- Mutation Operator: `bounded trading agent` -> `RWA standing-action safety rail with public refusal artifact`.
- 2026 clone trap avoided: not a wallet dashboard, generic assistant, static APY card, Uniswap chatbot, or AgentMandate clone with only token allowlists and max swaps.
- Novelty delta: not "agent with limits"; it creates a durable, inspectable refusal artifact for unsafe calldata under RWA-style constraints.
- Judge-Magnet basis: `pitch/judge_magnet.md` scores 11/12; first-pass survival, attention ladder, rubric coverage, and Q&A bank all point to the same 60-second refusal proof.
- Judge-Magnet reason: a busy judge can retell the project as "Contract stamps NO on unsafe RWA trades" and then inspect the receipt, policy, and test evidence.
- Demo interaction/showcase reason: judge personally injects a halt/stale-price/exposure shock, signs a bad agent attempt, and sees the contract stamp NO plus mint a refusal receipt within 60 seconds.
- Tie-breaker: stronger 60-second visible consequence than `IDEA-002`; lower technical risk than `IDEA-007`; more memorable than `IDEA-008`.
- Known risk: Robinhood Chain/RWA specificity must be visible in the first minute, not only named in copy.
- Next file: `pitch/concept_lock.md`
- Next file: `pitch/demo_interaction_plan.md`
