# Reject 1 unsafe RWA agent trade in 60 seconds.

> Reject 1 unsafe RWA agent trade in 60 seconds.

RefusalRail is a judge-ready safety rail for the Arbitrum Open House London Online Buildathon. A judge selects a market shock, lets a bounded RWA agent try an unsafe action, and gets a `NO` receipt that names the wallet and hashes: policy hash, calldata hash, shock hash, wallet owner, and proof hash.

[Live demo](https://refusalrail.veithly.workers.dev) · [Repository](https://github.com/veithly/refusalrail) · [Full demo video](https://raw.githubusercontent.com/veithly/refusalrail/main/pitch/recording/pitch-demo-combined-final.mp4) · [Quick preview](https://raw.githubusercontent.com/veithly/refusalrail/main/pitch/recording/pitch-demo-preview-final.mp4) · [Deployment runbook](./docs/DEPLOYMENT.md) · [Submission pack](./SUBMISSION.md)

## What Ships

- Live app with server-rendered HTML/CSS/JS and product API routes.
- `RefusalLedger` receipt store with wallet-owned proof records.
- Interactive surfaces: `/app`, `/app/policy`, `/app/receipts`, plus receipt detail routes.
- Wallet entry in the product chrome: connect a browser wallet, choose the built-in test wallet, prepare RefusalHub calldata, send `eth_sendTransaction`, and bind the resulting tx hash back to a receipt.
- Solidity proof contracts: `PolicyRegistry`, `RefusalReceipt`, `RefusalHub`, `DemoRWAAsset`.
- Chain-ready receipt loop: prepare RefusalHub calldata from a receipt, submit with a wallet/script, then bind the explorer tx hash back to the same receipt.
- Vitest policy tests and Playwright desktop/mobile hero-path tests.
- HackathonHunter PRD, visual contract, stack lock, acceptance matrices, claim matrix, and submission pack.

## Commands

```bash
npm install
npm run build
npm test
npm run test:e2e
npm run deploy:dry
```

Contract deployment, once a funded testnet key and RPC are available:

```bash
cp .env.example .env
# Fill PRIVATE_KEY and ARBITRUM_SEPOLIA_RPC_URL without committing .env.
npm run contracts:deploy
```

The deploy script writes `deployments/arbitrum-sepolia.json` and prints the runtime vars that turn on live chain proof preparation in the app UI.

Current Arbitrum Sepolia deployment:

- `RefusalHub`: `0x3540038833ae8750EfF20e7EfCaE16F206e90Cf8`
- `PolicyRegistry`: `0xa9df142D14218CC99f3068CBADC1D1965f7623B7`
- `RefusalReceipt`: `0xf6aC320e7C4E865A72c588c89BE23Ff12ca543C3`
- `DemoRWAAsset`: `0x320392A010982f8F8F81e9E8aE8aaD083Be69810`
- Refused demo tx: `0x0b809bc31f75b6ff5947ccb5875dc5df975e1fe379b3a533f8e84454e42bf372`

Local dev:

```bash
npm run dev
```

Open `http://127.0.0.1:4387`.

Deploy after runtime login:

```bash
npx wrangler login
npm run deploy
```

Live app:

```txt
https://refusalrail.veithly.workers.dev
```

## Verification Status

- `npm run build`: passed.
- `npm test`: 3 policy tests passed.
- `npm run test:e2e`: 16 local browser tests passed across desktop and mobile; 2 deployed-only tests skipped without `DEPLOYED_URL`.
- `DEPLOYED_URL=https://refusalrail.veithly.workers.dev PLAYWRIGHT_BASE_URL=https://refusalrail.veithly.workers.dev npm run test:e2e`: 18 public tests passed.
- `npm run deploy:dry`: passed with Wrangler 4.98.0.
- `npm run contracts:deploy`: passed on Arbitrum Sepolia.
- `npm run deploy`: published `https://refusalrail.veithly.workers.dev` as deployment version `29b87c4d-a444-4381-8d9e-3b4b579b3fae`.
- `visual_qa_scan.mjs --url https://refusalrail.veithly.workers.dev --fail-on error`: 0 errors and 0 warnings across desktop/mobile routes.
- Runtime audit: `npm audit --omit=dev` found 0 vulnerabilities.
- Dev audit note: `solc` currently brings dev-only `tmp` advisories; it is not shipped in the deployed runtime bundle.
- Full judge demo: `pitch/recording/pitch-demo-combined-final.mp4`, 3:30, 1920x1200, H.264, AAC stereo with ducked Hunter BGM.
- Quick preview: `pitch/recording/pitch-demo-preview-final.mp4`, 1:36, 1920x1200, H.264, AAC stereo with ducked Hunter BGM.

## Deployment Note

The public app is live with the receipt ledger and deployed Arbitrum Sepolia contract addresses configured. See `docs/DEPLOYMENT.md`.

## No Financial Advice

RefusalRail is a testnet/hackathon safety-rail prototype. It does not trade real securities, provide investment advice, or connect to brokerage accounts.
