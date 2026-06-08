# Judge Magnet Brief

## Evidence used

| Source | Used for | Portable lesson |
|---|---|---|
| `pitch/winner_research.md` | Hackathon rules, sponsor fit, recent Web3 winner patterns | Arbitrum/Robinhood Chain projects must prove contract quality, real product need, and chain-native action. |
| AgentMandate winner pattern | Bounded agent authority | "Agent with limits" is credible only when the contract, not the model, is the authority. |
| Omeswap winner pattern | Risk gate and decision receipt | A veto is judge-readable when it emits a durable receipt. |
| Chainlink Convergence 2026 winners | DeFAI risk gates and attestations | Current DeFAI winners combine autonomous proposals with deterministic safety checks and proof. |
| `pitch/idea_tournament.md` GPT Pro judges | Concept selection and demo pressure test | RefusalRail wins on technical proof and 60-second demo consequence, but must avoid feeling thin by anchoring itself in RWA standing actions. |

## First-pass survival

- Required submission fields: live URL, repo URL, short project description, demo video URL, chain deployment proof, sponsor/track selection, and team/project metadata.
- Must-open links: Cloudflare live app, GitHub or repo archive, contract source/tests, explorer transaction or local proof report, README, SUBMISSION.
- Fresh-work / version-control requirement: repo must show project-specific code, contracts, UI, tests, and Hunter artifacts created for this hackathon.
- AI/spec/tool attribution requirement: disclose Codex, GPT Pro research, and generated/assisted planning in README/SUBMISSION if the form asks for AI tooling.
- Partner/sponsor prize requirement: explain `Arbitrum chain deployment -> RWA standing action safety -> refusal receipt proof`; name Robinhood Chain as primary target and Arbitrum Sepolia as fallback.
- Disqualification risks: no real deployment proof, broken public URL, exposed private key, securities/trading advice claims, or hiding the contract path behind a UI-only demo.

## Judge personas

| Persona | What they care about first | What would make them stop watching | Evidence we show |
|---|---|---|---|
| Arbitrum smart contract judge | Whether unsafe calldata is actually blocked by contract logic | A UI-only refusal, fake tx hash, or no invariant test | `RefusalHub`, `PolicyRegistry`, `RefusalReceipt`, event/test proof, receipt detail. |
| Robinhood Chain / RWA sponsor judge | Why this belongs in tokenized assets instead of generic DeFi | Portfolio dashboard, generic trading bot, or no RWA constraint | Halt, stale price, max exposure, no-sell-principal policy, standing action context. |
| Agentic track judge | Whether the agent is useful but bounded | Agent can do nothing, or agent has unlimited authority | "Agent proposes; contract decides" flow with allowed sweep and refused sell. |
| Product/demo judge | Whether the first minute has a visible consequence | Explanation-heavy setup or wallet gate before value | Shock card, "Let the agent try", red NO stamp, receipt drawer. |

## Winner thesis

- Personal or customer scar: Self-custody finance users want standing actions, but a delegated agent is either powerless or overpowered. Unsafe attempts often vanish into backend logs instead of becoming proof.
- Why this problem is worth a judge's attention: Tokenized RWAs make market halts, stale prices, exposure caps, and no-sell-principal policies first-class safety constraints.
- What the project proves in one screen action: A judge-selected shock causes the same agent action to be refused and recorded.
- Why the domain/sponsor primitive is necessary: Without an Arbitrum/Robinhood Chain-style RWA execution context, this is only a compliance UI. The product is the contract-enforced refusal and receipt.
- Why this can continue after the hackathon: RWA wallets, agent frameworks, and tokenized asset apps need reusable policy rails before retail users trust autonomous finance actions.

## Prototype cut

- 2-3 must-have features:
  1. Shock-driven unsafe action attempt that produces a refusal receipt.
  2. Safe standing action under the same policy for contrast.
  3. Receipt/detail/history proof surface with policy, calldata, reason, and tx/proof fields.
- One miracle: unsafe agent calldata becomes a durable, judge-readable refusal receipt.
- Cut features: real securities, live brokerage connection, prediction, general trading bot, full portfolio dashboard, real money swaps, Dune as core product.
- Why the cut does not weaken the demo: the winning proof is the refusal primitive, not breadth of asset coverage.

## Attention ladder

| Time | Judge should think | Screen / artefact evidence |
|---|---|---|
| 0-10s | "This demo wants the trade to fail." | Landing hero and shock cards. |
| 10-30s | "I can change the outcome." | Judge selects `MARKET_HALT`, `STALE_PRICE`, or `MAX_EXPOSURE`. |
| 30-60s | "The contract rejected the unsafe action and left a receipt." | Red NO stamp, refusal receipt, persisted run id. |
| 2-3min | "This is more than theater." | Safe sweep comparison, policy workbench, receipt history, tests. |
| 5min / Q&A | "I can inspect the rule, proof, and deployment path." | README, contract/test report, stack lock, Cloudflare URL, explorer/deploy evidence. |

## Aha moment

- User action: choose a shock and click "Let the agent try".
- Visible consequence: unsafe RWA action flips from pending to refused.
- Proof artefact: refusal receipt with attempted calldata hash, policy hash, refusal code, shock snapshot, fallback route, and tx/proof field.
- Why a judge can retell it: "The contract stamps NO on unsafe RWA trades" is concrete and seven words long.

## Rubric coverage

| Rubric / prize criterion | Where it appears | Proof |
|---|---|---|
| Smart contract quality | Contract/test panel, README, repository | Policy predicates, event schema, invariant test, deployment plan. |
| Product-market fit | Hero, PRD problem section, RWA workbench | Self-custody standing actions with no-sell and shock constraints. |
| Innovation/creativity | Refusal receipt primitive | The failed action is the inspectable artifact. |
| Real problem solving | User cases, app flow, Q&A | Bounded agent authority for tokenized assets. |
| Best Agentic Project | Agent action card and policy executor | Agent proposes, contract enforces, receipt records. |
| Robinhood Chain / Arbitrum fit | Stack lock, submission, deployment evidence | RWA-specific policy and Arbitrum-compatible chain target. |

## Q&A bank

| Likely judge question | 1-sentence answer | Proof link / screen |
|---|---|---|
| Is this just a UI refusal? | No, the UI is wired to a policy engine and the final contract path emits the refusal receipt event. | `/app/receipts/[id]`, contract/test report. |
| Why not a normal trading bot with limits? | RefusalRail makes unsafe attempts durable and inspectable, so failures become audit evidence instead of disappearing into logs. | Receipt detail and history. |
| Why Robinhood Chain / RWA? | RWA standing actions need market-halt, stale-price, exposure, and principal-sale rules that ordinary token allowlists do not express. | Policy workbench and PRD. |
| What if live chain RPC fails during judging? | The app keeps a persisted Cloudflare proof path and labels seeded tx/event evidence separately from live deployment proof. | `.hunter/seed-manifest.json`, README limitations. |
| What did you cut? | Real securities, advice, brokerage integration, and portfolio optimization were cut to keep the safety primitive credible. | PRD section 14. |

## Anti-hype red flags

- Ambiguity removed: the product is not "AI helps trading"; it refuses unsafe RWA calldata.
- Template/starter-kit distance: UI must render as a forensic policy workbench with receipt timeline, not a generic landing/dashboard.
- Missing-code or thin-repo risk: contract/test/proof paths and Cloudflare Worker build must be visible in README.
- Over-indexed criterion: do not optimize only for showmanship; include contract, storage, and deployment evidence.
- Reused-project risk: repo artefacts and pitch name tie directly to Arbitrum Open House and Robinhood Chain RWA constraints.

## Judge-Magnet Scorecard

| Dimension | Score | Evidence |
|---|---:|---|
| First-pass survival | 2 | Submission links, eligibility, partner fit, attribution, and disqualification risks are explicit. |
| Problem belief | 2 | Delegated self-custody RWA actions create a specific authority conflict. |
| Prototype cut | 2 | Three P0 features, one miracle, and cut features are named. |
| Aha/proof | 2 | Judge action creates a visible refusal and a receipt artefact. |
| Rubric coverage | 2 | Every major rubric and prize line maps to a screen or repo proof. |
| After-hack credibility | 1 | Continuation thesis is clear; live external partner/user feedback remains a post-demo gap. |
| **Judge-Magnet Score** | **11/12** | Passes the >= 9/12 gate. |
