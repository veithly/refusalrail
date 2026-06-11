# Submission Pack: RefusalRail

## Title

RefusalRail, RWA refusal receipts

## One-line description

RefusalRail lets a judge run one unsafe RWA agent trade, watch policy refuse it, and inspect a durable receipt with wallet identity, hashes, and Arbitrum Sepolia proof.

## HackQuest long-description spine

The public Description should open with the live judge action: choose a shock, click `Let the agent try`, see policy stamp `NO`, and inspect wallet/proof hashes on the saved receipt. It should then explain why RWA standing actions need refusal records, show the complete live loop from workbench to chain proof to auditor history, name the Arbitrum Sepolia contract path, link the main video and repo, and state the testnet/non-advice limitation in plain language.

## Who it's for

Hackathon judges, RWA builders, and agentic wallet teams who need delegated finance actions with visible limits before a user trusts automation with tokenized assets.

## Problem

A self-custody user may want an agent to claim distributions or sweep proceeds while they are offline. During a market halt, stale price, or exposure breach, that same agent must not sell principal. A warning inside a chat transcript is too weak; the user and auditor need a refusal record they can inspect during review.

## Core features

- Judge chooses `MARKET_HALT`, `STALE_PRICE`, or `MAX_EXPOSURE` -> the workbench runs a bounded agent attempt -> a `NO` receipt appears with reason, wallet, policy hash, calldata hash, shock hash, and proof hash.
- Judge opens a receipt detail page -> the page prepares RefusalHub transaction data and accepts a bound explorer tx hash -> the receipt links web proof to Arbitrum Sepolia proof.
- Judge runs safe sweep -> the same policy writes an OK receipt -> reviewers see the rail blocks unsafe principal sale without blocking every standing action.
- Auditor opens receipt history -> persisted records survive the first run -> the project shows a second role/history surface instead of a one-screen demo.

## Sponsor usage

RefusalRail uses Arbitrum-compatible Solidity contracts on Arbitrum Sepolia: `PolicyRegistry`, `RefusalReceipt`, `RefusalHub`, and `DemoRWAAsset`. The reviewer sees the chain path on receipt detail pages and in `deployments/arbitrum-sepolia.json`; removing it would leave only a web receipt log.

## Demo steps

1. Open `https://refusalrail.veithly.workers.dev` and click `Run refused trade`.
2. Use the built-in test wallet or connect a browser wallet, choose `MARKET_HALT`, and click `Let the agent try`.
3. Open the latest receipt, inspect `walletAddress`, `policyHash`, `calldataHash`, `shockHash`, `proofHash`, and prepare or bind the RefusalHub transaction.
4. Run `Safe sweep`, then open `/app/receipts?role=auditor` to compare NO and OK receipts.

## Demo credentials

No login is needed. Public access uses guest mode plus a built-in Arbitrum Sepolia test wallet path. Browser-wallet entry is optional and covered by the EIP-1193 Playwright path in `tests/hero.spec.ts`.

## Known limitations

The project is a testnet hackathon prototype. It does not trade real securities, connect to a brokerage account, predict prices, or give financial advice. The current chain proof targets Arbitrum Sepolia while Robinhood Chain is treated as the RWA destination pattern when public deployment support is available.

## Video storybeat

The 3:30 main video opens with the product thesis, shows the no-login judge path, runs a live refusal, opens the receipt detail, binds the chain proof path, runs the safe contrast, and closes on the deployed contracts and limitations. It is mixed with real Hunter BGM through sidechain ducking so narration stays readable. The 1:36 cut stays as a quick preview.

## HackQuest media

- Cover: `pitch/hackquest-assets/cover.png`
- Project image 1: `pitch/hackquest-assets/01-live-url-hero.png`
- Project image 2: `pitch/hackquest-assets/02-refusal-workbench.png`
- Project image 3: `pitch/hackquest-assets/03-receipt-detail.png`
- Project image 4: `pitch/hackquest-assets/04-chain-proof.png`

## Deck vertebrae

- Proof-first opening: the failed trade is the product.
- User problem and stake: delegated RWA agents need refusal proof during shocks.
- Live product loop: shock input, agent attempt, NO receipt, receipt detail, safe sweep.
- Sponsor or tech mechanism: Arbitrum Sepolia contracts bind refusal receipts to chain evidence.
- Proof, limitation, and ask: live app, repo, tests, real tx, no real securities or brokerage integration.

## FAQ for judges

- Q: Is RefusalRail only a frontend demo? A: No; `tests/hero.spec.ts` covers receipt persistence and tx binding, and `deployments/arbitrum-sepolia.json` lists the deployed contracts and refused tx.
- Q: Why does this belong in an RWA track? A: The rules model RWA standing-action hazards: market halt, stale price, exposure cap, and no-sell-principal boundaries.
- Q: What can I try in under a minute? A: Open the live URL, choose `MARKET_HALT`, run `Let the agent try`, then open the receipt detail and inspect the proof fields.

## Claim source

- Claim matrix: `.hunter/claim-matrix.json`
- Runtime report: `.hunter/runtime-interaction.report.json`
- Judge red-team: `pitch/judge-red-team.md`
