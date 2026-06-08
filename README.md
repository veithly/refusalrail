# Reject 1 unsafe RWA trade, stamp NO

> Reject 1 unsafe RWA trade, stamp NO.

RefusalRail is a Cloudflare Worker app for the Arbitrum Open House London Online Buildathon. A judge selects a market shock, lets a bounded RWA agent try an unsafe action, and gets a durable refusal receipt with policy hash, calldata hash, shock hash, owner, and proof hash.

[Live demo](https://refusalrail.veithly.workers.dev) · [Repository](https://github.com/veithly/refusalrail) · [Demo video](https://raw.githubusercontent.com/veithly/refusalrail/main/pitch/recording/pitch-demo-combined-final.mp4) · [Deployment runbook](./docs/DEPLOYMENT.md) · [Submission pack](./SUBMISSION.md)

## What Ships

- Cloudflare Worker app with server-rendered HTML/CSS/JS.
- Durable Object `RefusalLedger` with SQLite-backed receipt storage.
- Interactive surfaces: `/app`, `/app/policy`, `/app/receipts`, plus receipt detail routes.
- Wallet entry in the product chrome: connect a browser wallet, choose the built-in test wallet, prepare RefusalHub calldata, send `eth_sendTransaction`, and bind the resulting tx hash back to a receipt.
- Solidity proof contracts: `PolicyRegistry`, `RefusalReceipt`, `RefusalHub`, `DemoRWAAsset`.
- Chain-ready receipt loop: prepare RefusalHub calldata from a receipt, submit with a wallet/script, then bind the explorer tx hash back to the Durable Object receipt.
- Vitest policy tests and Playwright desktop/mobile hero-path tests.
- HackathonHunter PRD, visual contract, stack lock, acceptance matrices, and submission pack.

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

The deploy script writes `deployments/arbitrum-sepolia.json` and prints the Wrangler vars that turn on live chain proof preparation in the Worker UI.

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

Deploy after Cloudflare login:

```bash
npx wrangler login
npm run deploy
```

Live Worker:

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
- `npm run deploy`: published `https://refusalrail.veithly.workers.dev` as Worker version `2097af97-31b8-4248-8748-7fc91f493340`.
- `visual_qa_scan.mjs --url https://refusalrail.veithly.workers.dev --fail-on error`: 0 errors and 0 warnings across desktop/mobile routes.
- Runtime audit: `npm audit --omit=dev` found 0 vulnerabilities.
- Dev audit note: `solc` currently brings dev-only `tmp` advisories; it is not shipped in the Worker runtime.
- Final video: `pitch/recording/pitch-demo-combined-final.mp4`, 86 seconds, 1920x1200, H.264 High, AAC stereo.

## Cloudflare Note

The Worker is live on Cloudflare with the Durable Object ledger and deployed Arbitrum Sepolia contract addresses configured. See `docs/DEPLOYMENT.md`.

## No Financial Advice

RefusalRail is a testnet/hackathon safety-rail prototype. It does not trade real securities, provide investment advice, or connect to brokerage accounts.
