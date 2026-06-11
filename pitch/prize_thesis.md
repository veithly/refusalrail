# Prize Thesis: RefusalRail

## Primary Prize

- Primary prize: Arbitrum Open House London: Online Buildathon.
- Backup prize: none.
- Why this exact prize is winnable: RefusalRail shows a visible Arbitrum-native consequence in the first minute: a judge runs one unsafe RWA agent action, policy blocks it, and the receipt prepares or binds Arbitrum Sepolia proof.
- Why we are not optimizing for other prizes: the public story stays on agentic RWA safety, refusal receipts, and Arbitrum contract proof. We will not chase unrelated wallet, NFT, or generic AI assistant tracks.

## Sponsor Primitive

- Primary sponsor primitive: Arbitrum Sepolia EVM contracts for `PolicyRegistry`, `RefusalReceipt`, `RefusalHub`, and `DemoRWAAsset`.
- User action changed by this primitive: a judge can turn a refused web action into chain-bound proof instead of reading a local log.
- What breaks if removed: the core outcome collapses into a web-only receipt; the user can no longer connect the refusal to a contract address, calldata path, or explorer transaction.
- Proof surface: `/app/receipts/[id]`, `deployments/arbitrum-sepolia.json`, and the refused tx at `https://sepolia.arbiscan.io/tx/0x0b809bc31f75b6ff5947ccb5875dc5df975e1fe379b3a533f8e84454e42bf372`.

## Target User And Feasibility

- Target user/community/workflow: RWA builders and agentic wallet teams that want delegated standing actions with visible policy limits.
- Buyer / budget owner, if this became a product: a tokenized asset desk, wallet risk team, or RWA compliance lead that needs audit evidence for delegated actions.
- Purchase/adoption trigger: teams want agents to claim distributions or sweep proceeds, but they need proof when policy refuses a principal sale during market stress.
- Existing alternative: chat warnings, dashboard flags, or transaction failures that do not preserve wallet identity, policy inputs, hashes, and chain proof in one inspectable object.
- Why our demo is more than a toy: the public app has a complete loop across workbench, receipt detail, chain proof, safe contrast, auditor history, deployed contracts, and 18 deployed E2E checks.

## 30-Second Demo Moment

- 0-10s hook: the judge sees the wallet rail, shock picker, and red `NO` receipt thesis.
- 10-30s user action: the judge chooses `MARKET_HALT` and clicks `Let the agent try`.
- Visible result: RefusalRail blocks the unsafe principal sale and saves a durable `NO` receipt.
- Proof artifact: 1 NO receipt names wallet and hashes.

## Killer Artifact

- Proof phrase: "1 NO receipt names wallet and hashes"
- Why a judge can repeat it: the phrase matches the receipt detail screen and the proof table fields.
- Where it appears: short description, HackQuest Description first paragraph, README proof copy, and video narration.

## No-Go Trigger

- Kill if: the refusal cannot create a saved receipt with wallet identity and proof hashes.
- Pivot if: the chain path cannot prove more than a decorative contract address.
- Do not build: a generic AI dashboard, chat assistant, or portfolio optimizer with no refusal artifact.
