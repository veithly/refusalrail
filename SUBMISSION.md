# RefusalRail Submission

## Tagline

Reject 1 unsafe RWA trade, stamp NO.

## Project Summary

RefusalRail is a policy flight recorder for agentic tokenized asset actions. A judge chooses a shock condition, lets a bounded agent try an unsafe RWA action, and watches the policy rail refuse it with a durable receipt.

## Track Fit

- Arbitrum: contracts are Solidity/EVM-compatible and target Arbitrum Sepolia as fallback deployment.
- Robinhood Chain / RWA: the policy domain is tokenized asset standing actions, not generic DeFi.
- Best Agentic Project: the agent proposes an action, but policy decides and records the result.

## Demo Path

1. Open the live app or local Worker.
2. Click "Connect wallet" for a browser wallet, or "Use test wallet" for the built-in judge path.
3. Click "Try a refused trade".
4. Choose `MARKET_HALT`, `STALE_PRICE`, or `MAX_EXPOSURE`.
5. Click "Let the agent try".
6. Open the receipt and inspect `walletAddress`, policy hash, calldata hash, shock hash, and proof hash.
7. Click "Prepare tx data" on the receipt detail page to see the RefusalHub transaction payload.
8. Send the transaction with the connected wallet or bind an explorer tx hash to the receipt.
9. Run safe sweep to show the same policy can allow a narrow action.

## Links

- Live URL: https://refusalrail.veithly.workers.dev
- Cloudflare Worker version: `2097af97-31b8-4248-8748-7fc91f493340`
- Repository: current workspace.
- Deployment runbook: `docs/DEPLOYMENT.md`.
- PRD: `pitch/project_prd.md`.
- Visual contract: `pitch/visual-build-contract.md`.
- Final video file: `pitch/recording/pitch-demo-combined-final.mp4`.
- Combined pitch/demo composition: `pitch/polish-combined/index.html`.
- Contracts: `contracts/`.
- Chain deployment script: `scripts/deploy-contracts.mjs`.
- Arbitrum Sepolia deployment: `deployments/arbitrum-sepolia.json`.
- On-chain refused demo tx: `0x0b809bc31f75b6ff5947ccb5875dc5df975e1fe379b3a533f8e84454e42bf372`.
- Tests: `tests/`.

## Verification

- Build: `npm run build` passed.
- Unit tests: `npm test` passed.
- Browser tests: `npm run test:e2e` passed locally with 16 tests and 2 deployed-only skips.
- Public browser tests: `DEPLOYED_URL=https://refusalrail.veithly.workers.dev PLAYWRIGHT_BASE_URL=https://refusalrail.veithly.workers.dev npm run test:e2e` passed with 18 tests.
- Cloudflare dry-run: `npm run deploy:dry` passed.
- Cloudflare deploy: `npm run deploy` published https://refusalrail.veithly.workers.dev as Worker version `2097af97-31b8-4248-8748-7fc91f493340`.
- Contract deployment: `npm run contracts:deploy` passed on Arbitrum Sepolia.
- HackathonHunter main audit: `prd,delivery-mode,ui-libs,build-plan,feature-density,realness,cloudflare,video` passed.
- G4 onboarding, interaction, and seed audits passed.
- Visual QA: desktop/mobile routes passed with 0 errors and 0 warnings.
- Final video: `pitch/recording/pitch-demo-combined-final.mp4`, 86 seconds, 1920x1200, H.264 High, AAC stereo.

## Known Limitations

- Live receipt transactions use the deployed Arbitrum Sepolia contracts and the funded test wallet.
- No real securities, brokerage integration, price prediction, or financial advice.
- The video URL field still needs the final uploaded MP4 link if the submission form requires a public video URL.

## AI/Tooling Attribution

Codex implemented the project using the local HackathonHunter skill flow. GPT Pro research artifacts already exist under `pitch/gpt-pro/`.
