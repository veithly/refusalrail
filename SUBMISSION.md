# Submission: Arbitrum Open House London Online Buildathon

## Platform

HackQuest

## URL

https://www.hackquest.io/projects/RefusalRail

## Project name

RefusalRail

## Tagline

Reject 1 unsafe RWA agent trade in 60 seconds and block it.

## Short description

Block one unsafe RWA agent trade and save proof in 60 seconds. 1 NO receipt names wallet and hashes, then links the refusal to Arbitrum Sepolia proof at https://refusalrail.veithly.workers.dev.

## Project intro

RefusalRail refuses unsafe RWA agent trades in 60 seconds and records the NO as an Arbitrum Sepolia-ready receipt.

## HackQuest Description

RefusalRail turns a failed RWA agent action into proof a judge can inspect. Open the live app, use the built-in test wallet or a browser wallet, choose `MARKET_HALT`, `STALE_PRICE`, or `MAX_EXPOSURE`, and click `Let the agent try`. The bounded agent attempts `sell_principal(tokenized_etf, shock=MARKET_HALT)`. Policy stops the action before execution and stamps `NO`. 1 NO receipt names wallet and hashes: wallet address, owner/session, role, reason, `policyHash`, `calldataHash`, `shockHash`, and `proofHash`.

Why this matters: standing RWA agents are useful only if users can trust their limits. A user may allow an agent to claim distributions or sweep proceeds while they are offline. During a market halt, stale price, or exposure breach, the same agent must refuse a principal sale. RefusalRail treats that refusal as the product output. It gives the user and auditor a record of what the agent tried, why policy blocked it, who owned the action, and how the proof can be checked.

The product loop is live, not a video-only walkthrough: Home -> Workbench -> NO receipt -> Receipt detail -> Arbitrum Sepolia proof -> OK safe sweep -> Auditor history. No login is required for the judge path. The test wallet path proves the full flow in public, while the browser-wallet path covers EIP-1193 transaction handoff when a wallet is available. The same policy can also write an OK receipt for a safe sweep, so the rail blocks unsafe standing actions without blocking everything.

The Arbitrum path is core to the mechanism. `RefusalHub`, `PolicyRegistry`, `RefusalReceipt`, and `DemoRWAAsset` are deployed on Arbitrum Sepolia. Receipt pages prepare RefusalHub calldata and can bind an explorer transaction back to the saved receipt. RefusalHub: `0x3540038833ae8750EfF20e7EfCaE16F206e90Cf8`. Refused demo tx: https://sepolia.arbiscan.io/tx/0x0b809bc31f75b6ff5947ccb5875dc5df975e1fe379b3a533f8e84454e42bf372.

Live app: https://refusalrail.veithly.workers.dev

Repository: https://github.com/veithly/refusalrail

Main judge demo, 3:30, narration + ducked BGM: https://raw.githubusercontent.com/veithly/refusalrail/main/pitch/recording/pitch-demo-combined-final.mp4

Quick preview, 1:36, narration + ducked BGM: https://raw.githubusercontent.com/veithly/refusalrail/main/pitch/recording/pitch-demo-preview-final.mp4

Deck source: https://github.com/veithly/refusalrail/tree/main/pitch/deck

Limits: this is a testnet hackathon prototype. It does not trade real securities, connect to a brokerage account, predict prices, or provide financial advice. The next milestone is policy package export for RWA teams that need signed, reusable refusal policies across more venue adapters.

## What it does

A judge opens the live app, uses the built-in test wallet or a browser wallet, chooses a shock such as `MARKET_HALT`, and lets a bounded RWA agent attempt the unsafe action. RefusalRail evaluates the policy before execution, stamps NO, and saves a receipt with wallet identity, policy hash, calldata hash, shock hash, proof hash, and chain proof controls.

The same workbench can run a safe sweep and write an OK receipt under the same policy. An auditor view shows receipt history, so the project is not only a one-run demo. The failed action becomes the artifact a reviewer can inspect.

## How we built it

The core mechanism is an Arbitrum-compatible refusal path. `PolicyRegistry`, `RefusalReceipt`, `RefusalHub`, and `DemoRWAAsset` are deployed on Arbitrum Sepolia. Receipt detail pages prepare RefusalHub transaction data and can bind an explorer tx back to the same receipt. Deployed hub: `0x3540038833ae8750EfF20e7EfCaE16F206e90Cf8`. Refused demo tx: https://sepolia.arbiscan.io/tx/0x0b809bc31f75b6ff5947ccb5875dc5df975e1fe379b3a533f8e84454e42bf372.

The app stores receipt records with wallet address, role, owner/session fields, reason code, and proof hashes. Tests cover the fresh judge path, browser-wallet send, built-in test wallet, tx binding, safe sweep, auditor history, and the public deployment.

## Why it fits the judging criteria

- Smart contract quality -> RefusalHub, PolicyRegistry, RefusalReceipt, and DemoRWAAsset compile and are deployed on Arbitrum Sepolia; proof is in `deployments/arbitrum-sepolia.json` and the refused tx link.
- Agentic project -> the agent proposes a principal sale, but deterministic policy decides and records the refusal; proof is the `/app` workbench and `tests/hero.spec.ts`.
- RWA fit -> the policy reasons are market halt, stale price, max exposure, and no-sell-principal boundaries; proof is the policy page and receipt reason codes.
- Product realness -> judges can run refusal, safe sweep, receipt detail, and auditor history on the live URL; proof is the deployed E2E pass in `.hunter/gates/G5-public-smoke.report.json`.

## Challenges we ran into

The hard part was keeping the first minute open while still proving wallet and chain behavior. A forced wallet setup would hide the product result, but a pure guest demo would look thin. RefusalRail solves that split with a built-in test wallet for public judging, an optional EIP-1193 browser-wallet path, and receipt pages that prepare or bind Arbitrum Sepolia proof.

## Accomplishments we're proud of

The project now ships as a live app with receipt storage, wallet identity, deployed Arbitrum Sepolia contracts, a real refused demo tx, 18 public E2E checks, visual QA with 0 errors, a 3:30 main judge video, and a 1:36 preview cut.

## What we learned

For agentic finance, a refusal should be treated as a product output, not an error message. The useful object is the record that says what the agent tried, why policy stopped it, which wallet identity was involved, and where the chain proof lives.

## What's next

Add policy package export so RWA teams can review, sign, and reuse refusal policies across more venue adapters.

## Built with

React, Web3, Ethers, Node, Solidity, RainbowKit, Wagmi, Viem, Arbitrum Sepolia

## Track / Category

Arbitrum Open House London: Online Buildathon. Sectors: DeFi, Infra, RWA, AI.

## Demo URL

https://refusalrail.veithly.workers.dev

## Repo URL

https://github.com/veithly/refusalrail

## Video URL

Main judge demo, 3:30, with narration and ducked BGM: https://raw.githubusercontent.com/veithly/refusalrail/main/pitch/recording/pitch-demo-combined-final.mp4

Quick preview, 1:36, with narration and ducked BGM: https://raw.githubusercontent.com/veithly/refusalrail/main/pitch/recording/pitch-demo-preview-final.mp4

## Deck URL

Deck source: https://github.com/veithly/refusalrail/tree/main/pitch/deck

## HackQuest media assets

Cover image: `pitch/hackquest-assets/cover.png`

Project images:

- `pitch/hackquest-assets/01-live-url-hero.png`
- `pitch/hackquest-assets/02-refusal-workbench.png`
- `pitch/hackquest-assets/03-receipt-detail.png`
- `pitch/hackquest-assets/04-chain-proof.png`

## Documentation URL

https://github.com/veithly/refusalrail/blob/main/docs/DEPLOYMENT.md

## Progress During Hackathon

Built during the hackathon from the Hunter gate plan: PRD, UI interaction plan, visual contract, product slice, judge-user spine, runtime gates, claim matrix, submission pack, and proof-backed form copy.

Product work shipped: wallet dock, browser-wallet path, built-in test wallet, shock picker, deterministic policy engine, receipt ledger, receipt detail pages, RefusalHub calldata preparation, tx binding, safe sweep OK path, auditor history, and useful empty/error states.

Chain work shipped: Arbitrum Sepolia Solidity contracts for `PolicyRegistry`, `RefusalReceipt`, `RefusalHub`, and `DemoRWAAsset`; deployed contract addresses; and one refused demo tx that links the saved receipt to an explorer record.

Judge media shipped: Swiss-style web deck rebuilt from the latest product screenshots, HackQuest cover plus four 1280x720 project images, 3:30 main judge demo with narration and BGM, 1:36 preview cut, README, repo evidence, and updated HackQuest submission text.

Verification shipped: `npm run build`, `npm test`, public deployment smoke, deployed Playwright E2E with 18 passing tests, visual QA with 0 warnings, Hunter video/submission audits, and public HackQuest readback showing the new video and four new project images.

## Fundraising Status

Not fundraising. This is a hackathon prototype with no token sale, securities offering, brokerage integration, or financial advice. The next milestone is policy package export plus more RWA venue adapters for institutional review workflows.

## Deployment Details

Arbitrum Sepolia deployment

RefusalHub: `0x3540038833ae8750EfF20e7EfCaE16F206e90Cf8`

PolicyRegistry: `0xa9df142D14218CC99f3068CBADC1D1965f7623B7`

RefusalReceipt: `0xf6aC320e7C4E865A72c588c89BE23Ff12ca543C3`

DemoRWAAsset: `0x320392A010982f8F8F81e9E8aE8aaD083Be69810`

Refused demo tx: https://sepolia.arbiscan.io/tx/0x0b809bc31f75b6ff5947ccb5875dc5df975e1fe379b3a533f8e84454e42bf372

Live app: https://refusalrail.veithly.workers.dev

Deployment version: `29b87c4d-a444-4381-8d9e-3b4b579b3fae`

## Team members

Rick Shao, AI Technical Architect, SpoonOS, China Shanghai

## Contact / Social

X / Twitter: `@RickEACC`

Telegram: `@rickyeacc`

## Smart contract addresses

- RefusalHub: `0x3540038833ae8750EfF20e7EfCaE16F206e90Cf8`
- PolicyRegistry: `0xa9df142D14218CC99f3068CBADC1D1965f7623B7`
- RefusalReceipt: `0xf6aC320e7C4E865A72c588c89BE23Ff12ca543C3`
- DemoRWAAsset: `0x320392A010982f8F8F81e9E8aE8aaD083Be69810`

## Known limitations

RefusalRail does not trade real securities, connect to brokerage accounts, predict prices, or provide financial advice. The current proof path uses Arbitrum Sepolia testnet contracts and a public judging app.

## Did you use any AI?

Yes. Codex assisted implementation, testing, and submission packaging. GPT Pro research artifacts are saved under `pitch/gpt-pro/`; architecture and final product decisions are reflected in the repo evidence above.
