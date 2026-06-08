# Concept Lock

## Selected concept

- Project name: RefusalRail
- Seven-word rumor: Reject 1 unsafe RWA trade, stamp NO.
- Hero copy: Reject 1 unsafe RWA trade in 60 seconds.
- Track/domain: Arbitrum Web3 + Robinhood Chain RWA + Best Agentic Project.
- Sponsor/domain primitive: Robinhood Chain tokenized RWA standing actions, Arbitrum contract execution, ZeroDev-style bounded agent session, OpenZeppelin contract quality, optional Dune proof.

## Anti-Wrapper Score

| Dimension | Score | Evidence |
|---|---:|---|
| Residue | 2 | "The contract stamps NO on unsafe trades" is retellable. |
| Workflow Scar | 2 | Retail/self-custody RWA users want automation without handing agents unlimited trading authority. |
| New Primitive | 2 | Public refusal receipts for unsafe calldata, not a dashboard or chatbot. |
| Live Consequence | 2 | Judge-selected shock changes a real tx result and mints/refuses onchain state. |
| Sponsor/Domain Necessity | 2 | Robinhood Chain/RWA standing actions make the safety rail meaningful; Arbitrum makes cheap visible policy enforcement feasible. |
| **Total** | **10** | Passes G1 anti-wrapper gate. |

## Workflow Scar

- Who hurts: self-custody users, RWA apps, agentic wallet builders, and finance teams that want automation with provable limits.
- Existing artifact/workflow: wallet approvals, trading bots, policy docs, backend compliance logs.
- Failure mode: the agent is either powerless or overpowered; unsafe attempts disappear into logs rather than becoming proof.
- Why it matters now: Robinhood Chain makes tokenized equities/ETFs/RWAs and 24/7 self-custody finance a live sponsor context.

## One Miracle

- Miracle: unsafe agent calldata becomes a durable, judge-readable onchain refusal receipt.
- Boring reliable parts: mock RWA ERC20, policy registry, oracle/shock fixture, receipt contract, demo wallet, explorer link, tests.
- Cut list: no real securities, no financial advice, no live brokerage integration, no portfolio dashboard, no price prediction, no general-purpose trading bot.

## Demo Magic Moment

First 15 seconds:
- Judge sees: "This demo only wins if the trade fails."
- User action: choose `MARKET_HALT`, `STALE_PRICE`, or `MAX_EXPOSURE`.

Live input:
- What changes: selected shock changes the policy verdict.
- Input source: judge-selected shock card plus testnet transaction.

Visible consequence:
- Before: agent action card is green and ready to execute.
- After: contract stamps `NO`, action is refused, receipt appears.
- Proof artifact: refusal receipt with tx hash, calldata hash, policy hash, reason code, and oracle snapshot.

Deterministic proof:
- `RefusalHub` enforces policy predicates; the LLM/agent can propose but cannot override.
- Invariant test proves unsafe action does not execute without `ActionRefused`.

Judge participation:
- Click shock card.
- Sign/use demo wallet.
- Rerun with safe distribution sweep.

## Four-Horizon Clarity

- 5s: Reject 1 unsafe RWA trade in 60 seconds.
- 30s: Click a shock card, then let the agent try.
- 60s: Bad trade is refused; receipt mints; safe action can execute.
- 5min: Show contracts, tests, explorer link, Dune proof, and why Robinhood Chain RWA automation needs this.

## Decision

- Why this beats the safe idea: `Standing Action Vault` has better sponsor fit, but weaker demo shock. RefusalRail absorbs its sponsor context while keeping the stronger visible consequence.
- Why this beats the weird idea: `T+60 Ghost Order` is theatrical but riskier to explain and build; RefusalRail is simpler and more testable.
- Why this is buildable in the deadline: one policy registry, one refusal hub, one mock RWA asset, one receipt contract, one demo flow.
