# Submission: Arbitrum Open House London Online Buildathon

## Platform

HackQuest

## URL

https://www.hackquest.io/projects/RefusalRail

## Project name

RefusalRail

## Tagline

Reject 1 unsafe RWA trade and block it with a NO receipt.

## Short description

Block one unsafe RWA agent trade, save a NO receipt, and inspect wallet identity, hashes, and Arbitrum Sepolia proof at https://refusalrail.veithly.workers.dev.

## Project intro

RefusalRail refuses unsafe RWA agent trades in 60 seconds and records the NO as an Arbitrum Sepolia-ready receipt.

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

Main judge demo, 3:30: https://raw.githubusercontent.com/veithly/refusalrail/main/pitch/recording/pitch-demo-combined-final.mp4

Quick preview, 1:36: https://raw.githubusercontent.com/veithly/refusalrail/main/pitch/recording/pitch-demo-preview-final.mp4

## Deck URL

Deck source: https://github.com/veithly/refusalrail/tree/main/pitch/deck

## Documentation URL

https://github.com/veithly/refusalrail/blob/main/docs/DEPLOYMENT.md

## Progress During Hackathon

Built during the hackathon: PRD, UI interaction plan, logo system, forensic product redesign, wallet dock, browser-wallet path, built-in test wallet, receipt ledger, receipt detail views, Solidity contracts, Arbitrum Sepolia deployment, public app deployment, 3:30 main judge video, 1:36 preview video, GitHub repo, claim matrix, and public E2E verification. A judge can now run the whole proof path: live app, refusal receipt, chain proof, and auditor history.

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

Deployment version: `ff33feb4-2174-4da8-8785-8e01af8a5c58`

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
