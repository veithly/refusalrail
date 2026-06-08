# HackathonHunter Best PRD + UIUX Spec Prompt

You are turning the selected hackathon idea into a buildable PRD and detailed UIUX interaction plan. Do not generate code. Produce a concrete product spec that a judge can test in a live browser.

## Current Hackathon Brief

- Hackathon: Arbitrum Open House London: Online Buildathon.
- Submission deadline: 2026-06-14 22:59 UTC.
- Required deployment: an Arbitrum chain. Arbitrum Sepolia is available as the deployed proof network; Robinhood Chain is the primary RWA story when public testnet resources are usable.
- Prize strategy: Overall, Best Agentic Project, Robinhood Chain / Arbitrum alignment.
- Judging criteria: smart contract quality, product-market fit, innovation/creativity, and solving a real problem.
- Sponsor primitives to respect: Robinhood Chain tokenized RWAs, Arbitrum-compatible contract execution, bounded agent authority, OpenZeppelin-grade contract posture, public explorer proof.

## Selected Idea / Concept Lock

- Project name: RefusalRail.
- Seven-word rumor: Reject 1 unsafe RWA trade, stamp NO.
- Hero copy: Reject 1 unsafe RWA trade in 60 seconds.
- Product thesis: RefusalRail is a Cloudflare-hosted RWA agent workbench. A user authorizes narrow standing actions, an agent tries an unsafe tokenized-asset action, and the contract/policy rail refuses the calldata and records a durable refusal receipt.
- One miracle: unsafe agent calldata becomes a durable, judge-readable onchain refusal receipt.
- Boring reliable parts: mock RWA asset, policy registry, refusal hub, receipt contract, Cloudflare Worker UI/API, Durable Object receipt ledger, tests, explorer links.
- Cut list: no real securities, no financial advice, no live brokerage integration, no portfolio dashboard, no price prediction, no general-purpose trading bot.

## Why This Idea Won

The local tournament compared 10 ideas. RefusalRail won as IDEA-010 because:

- Highest non-fatal aggregate score across three GPT Pro judges: 8.56.
- Technical judge selected it as the safest, most verifiable build: policy checks, event design, calldata hashing, receipt issuance, tests, explorer evidence.
- Product/demo judge selected it as the clearest hackathon demo: judge chooses a failure condition, the contract stamps NO, a refusal receipt appears.
- Rubric/sponsor judge warned that the idea could feel thin unless it is packaged as a real Robinhood Chain / RWA standing-action safety rail, not just "refusal theater."

Key judge concerns to solve in the PRD/UIUX:

- Make Robinhood Chain / RWA specificity visible in the first minute.
- Avoid a UI-only refusal. The policy rail and receipt proof must be inspectable.
- Show both refused and allowed paths under the same policy so the agent is bounded, not useless.
- Keep the explanation short. The first click must happen before a wallet or registration wall.

## Winner Research / Pattern Constraints

- Recent Web3 winners reward a concrete product job plus a protocol primitive. The chain must create a user-visible ability, not act as a stack badge.
- Agentic finance winners reward bounded authority: the agent proposes, but deterministic policy/contracts decide.
- Current DeFAI/RWA winner patterns favor risk gates, circuit breakers, durable receipts, attestations, and public proof.
- Clone traps to avoid: AI trading chatbot, wallet dashboard, static APY cards, generic risk score, portfolio terminal, Dune dashboard as product, "AgentMandate but only token allowlists."
- Fresh mutation: `bounded trading agent` -> `RWA standing-action safety rail with public refusal artifact`.

## Judge Magnet

- First-pass survival claim: the judge can open the live URL, click one shock card, run the agent attempt, see NO, and inspect a saved receipt.
- Attention ladder:
  - 0-10s: "This demo wants the trade to fail."
  - 10-30s: judge selects `MARKET_HALT`, `STALE_PRICE`, or `MAX_EXPOSURE`.
  - 30-60s: unsafe action is refused and saved.
  - 2-3min: safe sweep comparison, policy workbench, receipt history, tests.
  - 5min/Q&A: contract sources, deployed addresses, explorer tx, README, limitation section.
- Q&A answer to protect: "No, this is not just a UI refusal. The UI is wired to deterministic policy state, persisted receipts, and deployed Solidity contracts."

## Current Implementation Constraints

The project is already implemented and should be brought into alignment, not reimagined:

- Frontend/backend: Cloudflare Worker rendered HTML with custom CSS.
- State: Cloudflare Durable Object SQLite-backed storage.
- Routes:
  - `/`: landing and first CTA.
  - `/app`: shock cards, unsafe action attempt, safe sweep, receipt rail.
  - `/app/policy`: policy matrix and contract/policy evidence.
  - `/app/receipts`: receipt history with holder/auditor role switch.
  - `/app/receipts/:id`: proof table and receipt detail.
  - `/about`: architecture and deployment proof.
- APIs:
  - `POST /api/runs/refuse`
  - `POST /api/runs/safe`
  - `GET /api/receipts`
  - `GET /api/receipts/:id`
  - `GET /api/policy`
  - `GET /api/health`
- Contracts:
  - `RefusalHub`
  - `PolicyRegistry`
  - `RefusalReceipt`
  - `DemoRWAAsset`
- Current deployed proof network: Arbitrum Sepolia.
- Deployed addresses:
  - `PolicyRegistry`: `0xa9df142D14218CC99f3068CBADC1D1965f7623B7`
  - `RefusalReceipt`: `0xf6aC320e7C4E865A72c588c89BE23Ff12ca543C3`
  - `RefusalHub`: `0x3540038833ae8750EfF20e7EfCaE16F206e90Cf8`
  - `DemoRWAAsset`: `0x320392A010982f8F8F81e9E8aE8aaD083Be69810`
- Refused demo tx: `0x0b809bc31f75b6ff5947ccb5875dc5df975e1fe379b3a533f8e84454e42bf372`
- Cloudflare URL: `https://refusalrail.veithly.workers.dev`
- Required env:
  - `PRIVATE_KEY` for local contract deployment only, from `$HOME/use_key.txt`, never committed.
  - `ARBITRUM_SEPOLIA_RPC_URL` for contract deployment.
  - `CLOUDFLARE_API_TOKEN` or Wrangler login for deploy.

## Existing P0 Requirements

1. Shock-driven unsafe action attempt creates a persisted refusal receipt.
2. Safe standing action under the same policy creates an allowed receipt for contrast.
3. Receipt detail/history exposes policy hash, calldata hash, reason code, shock snapshot, owner/session fields, and proof hash.

## Required Output

Produce exactly these sections.

### 1. Detailed PRD

Use the 14 sections:

1. Project background
2. Problem definition
3. Target users
4. User pain points
5. Core requirements & priority
6. Solution overview
7. User flows
8. User Cases
9. Demo critical path & Hero Moment
10. Pages / modules plan
11. Visual direction & UI principles
12. Technical constraints
13. Success metrics
14. Risks & cut list

Make the PRD buildable. The PRD must explicitly explain why the failed action is the product, why RWA standing actions matter, and why Arbitrum/Robinhood Chain context is necessary.

### 2. Detailed UIUX Interaction Plan

Include:

- Screen map with route, screen, primary user action, system response, state changed, proof shown.
- First-run flow for 0-10s, 10-30s, 30-60s, 2-3min, 5min/Q&A.
- For every P0 screen: default, loading, empty, error, success, keyboard/touch behavior, accessibility note, state transition, proof artifact, and test selectors.
- Demo choreography: judge input, live consequence, proof artifact, fallback, big-screen staging, and mobile QR behavior.
- Implementation notes: components, data/API dependencies, storage/state dependencies, external integrations, and Playwright coverage.

### 3. Scope Discipline

- Exactly 2-3 P0 demo must-haves.
- P1/P2 only if time remains.
- Explicit non-goals and cut list.
- Risk mitigation and fallback plan.

### 4. Traceability

Map each P0 requirement to route/API/data/state/test/deploy evidence.

Block coding if any P0 interaction lacks state, proof, or test evidence.
