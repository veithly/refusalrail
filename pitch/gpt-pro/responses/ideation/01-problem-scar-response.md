Idea 1

Name: ProofPay Mandates

5-12 word rumor: “The expense report that pays itself, but only with receipts.”

Workflow scar: Grant teams, DAO contributors, and hackathon operators still reimburse people through screenshots, spreadsheets, Discord DMs, and multisig chaos. The pain is not “payments”; it is proving that a messy offchain expense fits a previously agreed mandate before money moves.

Target user: Arbitrum ecosystem teams, grant operators, event organizers, DAO treasurers, contributor squads.

New primitive: A receipt-bound payment mandate: an onchain budget object with allowed vendors, spend caps, time windows, categories, approvers, and dispute rules. An agent can prepare reimbursement, but the contract enforces the mandate and emits a machine-readable receipt trail.

First click: “Create a mandate: London event travel, 2,000 USDC cap, receipts required.”

Demo plan:
0-10s hook: Show two reimbursement requests: one valid train receipt, one fake “team dinner” over budget.
10-30s judge interaction: Judge clicks “submit expense.” The agent extracts amount, merchant, date, category, and maps it to the mandate.
30-60s visible consequence: Valid receipt is paid instantly on Arbitrum Sepolia or Arbitrum One test deployment; invalid one is rejected with exact policy failure. A proof page shows transaction hash, receipt digest, policy clause, and payer/payee.

Proof artifact: ExpensePaid / ExpenseRejected events, receipt hash, policy hash, invoice digest, simulated attestation, and downloadable “audit packet.”

Sponsor/domain necessity: Arbitrum is not decoration here: tiny reimbursement actions, disputes, partial approvals, and receipt events need cheap execution. Arbitrum ecosystem teams are also obvious early users.

One miracle: Make receipt validation feel magical without overclaiming. The hackathon version can use structured mock receipts plus optional OCR, while contracts enforce the important part.

Cut list: No corporate card. No fiat rails. No full accounting suite. No dashboard-first view. No generalized DAO tooling.

Expected risk: Judges may see it as “expense software with crypto.” The demo must emphasize the new primitive: bounded delegated spending with verifiable receipts.

Anti-wrapper score /10: 8.5

Idea 2

Name: ActionVault for Tokenized Assets

5-12 word rumor: “Your tokenized ETF follows instructions while you sleep.”

Workflow scar: Tokenized equities, ETFs, and RWAs promise 24/7 access, but real users do not want a trading bot. They want safe standing instructions: claim distributions, accept cash settlement, rebalance within a limit, exercise a corporate action, or route proceeds without waking up at 3 a.m.

Target user: Self-custody Robinhood Chain users holding tokenized equities, ETFs, treasuries, or private-market assets.

New primitive: A standing-action vault for non-chatbot asset operations. Users sign narrow policies such as “claim distributions,” “sweep cash to USDC,” “never sell principal,” “max 1 action per day,” or “require confirmation above $500.” Agents can only execute allowed action types.

First click: “Set an instruction for my tokenized ETF distributions.”

Demo plan:
0-10s hook: Show a user missing a mock distribution event because they are offline.
10-30s judge interaction: Judge chooses one policy: “auto-claim dividends and sweep to USDC; never trade shares.”
30-60s visible consequence: A simulated corporate-action event fires. The vault claims the distribution, swaps or routes proceeds according to policy, and refuses a prohibited sell attempt. The UI shows “allowed action executed” and “prohibited action blocked.”

Proof artifact: Policy NFT or vault record, InstructionCreated, DistributionClaimed, SweepExecuted, and ActionBlocked events. Include before/after balances and a receipt explaining which clause authorized the action.

Sponsor/domain necessity: This is purpose-built for Robinhood Chain’s stated lane: tokenized RWAs, equities, ETFs, programmatic actions, self-custody, and 24/7 access. It also gives the team a credible shot at the reserved Robinhood Chain placement.

One miracle: Create convincing mock tokenized equity and distribution contracts that feel like future Robinhood Chain infrastructure without pretending to integrate unavailable production assets.

Cut list: No AI trading chatbot. No price prediction. No portfolio dashboard. No generic rebalancer. No “buy/sell because AI said so.”

Expected risk: Corporate actions can become legally and operationally complex. Keep the demo to simulated distribution claims and bounded cash sweeping.

Anti-wrapper score /10: 9

Idea 3

Name: DefaultShield

5-12 word rumor: “A liquidation agent that needs receipts before touching collateral.”

Workflow scar: Borrowers in DeFi do not need another APY screen. They need a panic button before liquidation: “repay from this wallet,” “sell only this collateral,” “do not exceed this slippage,” “notify my teammate,” and “prove exactly what happened.” Today, protection bots are opaque and overpowered.

Target user: Arbitrum DeFi borrowers, small funds, power users, DAO treasuries with collateralized positions.

New primitive: A liquidation-defense mandate: a contract-bounded rescue policy that lets an agent perform one concrete action—repay, top up collateral, or unwind a capped amount—only when risk conditions are met and only within hard limits.

First click: “Protect this position at health factor 1.15.”

Demo plan:
0-10s hook: Show a mock lending position sliding toward liquidation. Countdown bar turns red.
10-30s judge interaction: Judge selects a rescue rule: “At 1.15, repay up to 300 USDC from vault; never sell collateral.”
30-60s visible consequence: Price oracle simulation pushes health factor below threshold. Agent attempts rescue. Contract checks policy, executes repayment, health factor improves, and a second prohibited attempt to sell collateral is blocked.

Proof artifact: Policy hash, oracle snapshot, health-factor before/after, RescueExecuted event, ForbiddenActionBlocked event, and a plain-English receipt.

Sponsor/domain necessity: Arbitrum has deep DeFi usage and low-cost execution, making small automated defensive actions economically realistic. The project also aligns with agentic-prize patterns: agents can act, but contracts define the cage.

One miracle: The demo must make liquidation risk legible in seconds. A clean simulator with real-feeling lending primitives matters more than integrating five protocols.

Cut list: No yield optimizer. No APY comparison. No trading recommendations. No multi-protocol dashboard. No open-ended “AI manages your money.”

Expected risk: Could be mistaken for a keeper bot. Differentiate with user-owned mandates, explicit permission boundaries, blocked-action receipts, and policy portability.

Anti-wrapper score /10: 8.8