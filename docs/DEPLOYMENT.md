# Deployment Runbook

## Cloudflare Target

- Runtime: Cloudflare Workers.
- Live URL: `https://refusalrail.veithly.workers.dev`.
- Config: `wrangler.jsonc`.
- Main entry: `src/index.ts`.
- State binding: Durable Object binding `LEDGER` using class `RefusalLedger`.
- Runtime secrets: none required for the Cloudflare hero path.
- Optional chain deployment env: `PRIVATE_KEY`, `ARBITRUM_SEPOLIA_RPC_URL`.

## Verified Locally

```bash
npm run build
npm test
npm run test:e2e
npm run deploy:dry
```

`npm run deploy:dry` succeeded with Wrangler 4.98.0. The dry-run bundle includes `env.LEDGER`, app vars, and all Arbitrum Sepolia contract address vars.

## Deploy

Authenticate once:

```bash
npx wrangler login
```

Deploy:

```bash
npm run deploy
```

Current deployment:

```txt
https://refusalrail.veithly.workers.dev
Worker version: 07ec3378-01eb-4df1-ab1c-c9ad9e40038e
Build ID: wallet-rainbowkit-mimo-2026-06-09T150658Z
```

After deploy, run public smoke:

```bash
DEPLOYED_URL=https://<worker-name>.<account>.workers.dev npm run test:e2e
```

Final public verification on 2026-06-09:

```bash
DEPLOYED_URL=https://refusalrail.veithly.workers.dev PLAYWRIGHT_BASE_URL=https://refusalrail.veithly.workers.dev npm run test:e2e
# 18 passed

node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/visual_qa_scan.mjs . --url https://refusalrail.veithly.workers.dev --fail-on warning
# 0 errors, 0 warnings

curl -fsS https://refusalrail.veithly.workers.dev/api/health
# buildId wallet-rainbowkit-mimo-2026-06-09T150658Z, chainStatus configured
```

## Contract Deployment

The app works before private keys are available. The receipt page shows `Chain proof ready` after the deployed contract addresses are set in Wrangler vars, and falls back to complete Cloudflare proof mode if they are removed.

When a funded Arbitrum Sepolia wallet and RPC are available:

```bash
cp .env.example .env
# Fill PRIVATE_KEY and ARBITRUM_SEPOLIA_RPC_URL in .env.
npm run contracts:deploy
```

The script deploys `PolicyRegistry`, `RefusalReceipt`, `RefusalHub`, links the hub as the receipt minter, deploys `DemoRWAAsset`, writes `deployments/arbitrum-sepolia.json`, and prints Worker vars. Set those values in `wrangler.jsonc` or the Cloudflare dashboard before `npm run deploy`.

Current chain vars:

```txt
CHAIN_ID=421614
CHAIN_NAME=Arbitrum Sepolia
EXPLORER_BASE_URL=https://sepolia.arbiscan.io
REFUSAL_HUB_ADDRESS=0x3540038833ae8750EfF20e7EfCaE16F206e90Cf8
POLICY_REGISTRY_ADDRESS=0xa9df142D14218CC99f3068CBADC1D1965f7623B7
REFUSAL_RECEIPT_ADDRESS=0xf6aC320e7C4E865A72c588c89BE23Ff12ca543C3
DEMO_RWA_ASSET_ADDRESS=0x320392A010982f8F8F81e9E8aE8aaD083Be69810
CONTRACTS_DEPLOYED_AT=2026-06-08T12:03:14.518Z
```

On-chain smoke:

- `RefusalHub.previewVerdict(SellPrincipal, MarketHalt)` returned `refused=true`.
- Demo refused transaction: `0x0b809bc31f75b6ff5947ccb5875dc5df975e1fe379b3a533f8e84454e42bf372`.

## Bindings And Secrets

- `LEDGER`: Durable Object, configured in `wrangler.jsonc`.
- `APP_ENV`: plain Wrangler var, no secret.
- `BUILD_ID`: plain Wrangler var, no secret.
- Chain addresses above: plain Wrangler vars, no secret.
- No D1, KV, R2, Queue, or Worker secret is required for the Cloudflare app loop.
- Chain deployment keys are optional and must stay outside the repo.

## Current Status

Wrangler is authenticated for `veithly@live.com`, and `npm run deploy` published Worker version `07ec3378-01eb-4df1-ab1c-c9ad9e40038e`.
