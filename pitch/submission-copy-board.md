# Submission Copy Board: RefusalRail

> Source for HackQuest answers, README framing, video links, and final judge copy.

## One-line rumor

Reject 1 unsafe RWA trade and block it with a NO receipt.

## Judge hooks

- Agentic control hook -> proof: the `/app` workbench lets a judge choose `MARKET_HALT`, run `Let the agent try`, and see a persisted `NO` receipt.
- Arbitrum proof hook -> proof: RefusalHub is deployed at `0x3540038833ae8750EfF20e7EfCaE16F206e90Cf8`; refused demo tx is `https://sepolia.arbiscan.io/tx/0x0b809bc31f75b6ff5947ccb5875dc5df975e1fe379b3a533f8e84454e42bf372`.
- Product realness hook -> proof: `tests/hero.spec.ts` covers browser wallet, test wallet, refusal, receipt detail, tx binding, safe sweep, and auditor history.
- Public operability hook -> proof: live app `https://refusalrail.veithly.workers.dev` passed deployed Playwright smoke with 18 tests.

## Audience hooks

- The demo wants the trade to fail -> visual: full video `00:00-00:15`, hook scene and NO receipt thesis.
- The judge controls the shock -> visual: full video `01:04-01:22`, `MARKET_HALT` refusal run.
- The failed action becomes evidence -> visual: full video `01:22-01:59`, receipt detail and chain path.
- A safe action still passes -> visual: full video `01:59-02:15`, OK receipt contrast.

## Proof stack

- Live product: `https://refusalrail.veithly.workers.dev`, click `Run refused trade`, choose a shock, click `Let the agent try`.
- Main video: `https://raw.githubusercontent.com/veithly/refusalrail/main/pitch/recording/pitch-demo-combined-final.mp4`, 3:30 full judge demo.
- Quick preview: `https://raw.githubusercontent.com/veithly/refusalrail/main/pitch/recording/pitch-demo-preview-final.mp4`, 1:36 highlights cut.
- Repo proof: `contracts/RefusalHub.sol`, `contracts/PolicyRegistry.sol`, `src/policy.ts`, `src/index.ts`, `tests/hero.spec.ts`.
- Sponsor/domain proof: Arbitrum Sepolia contract deployment and refused tx listed in `deployments/arbitrum-sepolia.json`.
- User/state proof: Durable receipt records include `walletAddress`, `policyHash`, `calldataHash`, `shockHash`, `proofHash`, status, and tx binding.

## Sponsor / track fit

- Track: Arbitrum Open House London: Online Buildathon.
- Sponsor primitive: Arbitrum-compatible contracts on Arbitrum Sepolia for the refusal hub, policy registry, receipt book, and demo RWA asset.
- Why removal collapses the product: without the Arbitrum contract path, RefusalRail would be a web-only policy log instead of an on-chain-ready refusal primitive.
- Proof visible to reviewer: `/app/receipts/[id]` prepares RefusalHub calldata, and `deployments/arbitrum-sepolia.json` names all deployed addresses.

## Objection handling

- If judge asks "Is this only a UI refusal?": No; the policy engine writes a receipt record, the detail page prepares RefusalHub calldata, and the demo tx is on Arbitrum Sepolia.
- If judge asks "Why is this RWA-specific?": The refusal reasons model RWA standing-action hazards: market halt, stale price, max exposure, and no-sell-principal policy.
- If judge asks "Can a judge run it without setup?": Yes; the public app has a built-in test wallet path, and the browser-wallet path is covered in `tests/hero.spec.ts`.
- If judge asks "Does it block everything?": No; the safe sweep path creates an OK receipt under the same policy.

## Field strategy

- Tagline angle: a concrete refusal result, not a category label.
- Short description angle: judge action, visible NO receipt, Arbitrum proof.
- Long description spine: wallet or test identity -> shock -> agent attempt -> refusal receipt -> tx binding -> auditor history.
- Challenges angle: binding a wallet-facing chain path to a no-login judge flow without gating the first minute.
- Accomplishment angle: shipped live product, deployed contracts, real tx, 18 public E2E tests, 3:30 main video.

## Do-not-say

- Generic AI product language
- "Autonomous trading bot"
- "Real securities trading"
- "Portfolio optimizer"
- Helper hosting or narration vendors as sponsor fit
