# RefusalRail PRD

> English-first source-of-truth PRD for implementation, Cloudflare deployment, demo, README, and submission packaging.

## 1. Project background

- Hackathon: Arbitrum Open House London: Online Buildathon.
- Track / bounty: Overall, Best Agentic Project, Robinhood Chain / Arbitrum RWA alignment.
- Submission deadline: 2026-06-14 22:59.
- Why this idea now: tokenized RWA workflows make self-custody standing actions plausible, but delegated agents need visible limits before users trust them with financial actions.
- Cross-track bonus eligibility: Arbitrum-compatible chain deployment, Robinhood Chain RWA story, agentic execution, contract quality.
- Source evidence: `pitch/winner_research.md`, `pitch/idea_tournament.md`, `pitch/concept_lock.md`, and `pitch/judge_magnet.md`.

## 2. Problem definition

- Core problem: self-custody RWA users need bounded automation, but unsafe agent attempts are either silently blocked offchain or allowed with too much authority.
- Quantified pain: a first-time user or judge should see the authority conflict in one minute: an agent can claim or sweep a distribution, but it must not sell principal under market halt, stale price, or max exposure conditions.
- Current alternative 1: wallet approvals and bot permissions with broad authority.
- Current alternative 2: compliance logs or policy documents that are not executable.
- Why current alternatives are not enough: the user cannot inspect why a dangerous attempt was refused, and a judge cannot distinguish a real policy rail from a UI warning.
- Personal/customer scar: delegated finance agents are either powerless or overpowered; unsafe attempts vanish into backend logs instead of becoming proof.
- What a judge should believe after the first screen action: the contract or policy engine, not the agent, decides whether unsafe RWA calldata can execute.

## 3. Target users

### Primary user

- Persona: hackathon judge acting as a self-custody tokenized ETF holder.
- Situation: wants to automate narrow standing actions, but a market shock makes a principal sale unsafe.
- Goal: see one unsafe action refused and inspect the receipt within 60 seconds.
- Constraints: no financial advice, no real securities, no private key exposure, no registration before value.

### Secondary user

- Persona: RWA app or agentic wallet builder.
- Situation: needs a reusable safety rail for delegated RWA actions.
- Goal: prove policy predicates, refusal events, and safe-action contrast.
- Constraints: must keep the action domain narrow enough for a hackathon judge to audit.

### Anti-user

- Day-trading users seeking alpha signals or portfolio optimization.
- Brokerage integrations that need live securities access.
- Generic chatbot users who only want a text recommendation.

## 4. User pain points (ranked)

1. **P1 - delegated authority is unclear.** Users cannot tell what a finance agent is allowed to do when market conditions change.
2. **P2 - failed safety checks are not inspectable.** A backend denial or UI alert is not a durable proof artifact.
3. **P3 - RWA constraints are richer than token allowlists.** Halts, stale prices, principal-sale rules, exposure caps, and fallback routes matter.
4. Pain we explicitly ignore: live brokerage integration and portfolio optimization, because they would weaken the refusal primitive and add regulatory risk.

## 5. Core requirements & priority

### P0 demo must-haves (exactly 2-3)

1. Shock-driven unsafe action attempt creates a persisted refusal receipt.
2. Safe standing action under the same policy creates an allowed receipt for contrast.
3. Receipt detail/history exposes policy hash, calldata hash, reason code, shock snapshot, owner, and proof hash.

### Good-to-have (P1)

1. Browser wallet export path that prepares calldata and supports `sendTransaction` when contract env values are configured.
2. Contract compile output for `RefusalHub`, `PolicyRegistry`, `RefusalReceipt`, and `DemoRWAAsset`.
3. Multi-role proof where a holder creates receipts and an auditor can inspect public evidence.

### Delight / wow layer (P2)

1. A red `NO` compliance stamp animation that lands only after the policy verdict is saved.

### Explicitly out of scope

1. Real securities or financial advice.
2. Live brokerage integration.
3. Full trading terminal, portfolio dashboard, price prediction, yield optimization, or general-purpose agent marketplace.

## 6. Solution overview

- One-sentence solution: RefusalRail is a Cloudflare-hosted RWA agent workbench that refuses unsafe standing actions and records durable refusal receipts.
- Why this beats the current alternative: it turns the failed action into evidence instead of hiding it in logs.
- Why this hits the bounty rubric: it has a smart-contract-shaped policy kernel, a product-visible RWA safety problem, a memorable refusal primitive, and a deployable public app.

### Recent Web3 winner pattern

- Winner family: agentic finance mandate / DeFAI risk gate / decision receipt.
- Chain primitive: contract-enforced policy check and refusal receipt.
- User action improved: bounded RWA standing action can run without giving the agent unlimited sell authority.
- Public proof surface: receipt detail, contract source, test output, optional explorer transaction after chain deployment.
- Second actor / repeated loop: holder creates the action, auditor or judge inspects the proof.
- Boring dApp clone avoided: not a wallet dashboard, token list, APY card, explorer skin, or crypto chatbot.

### Recent idea pattern

- recentIdeaFamily: agentic finance mandate plus durable decision receipt.
- freshnessDelta: makes the refused unsafe action the primary product artifact.
- mutationOperator: `agent with limits` -> `RWA standing-action safety rail with public refusal artifact`.
- 2026 clone trap avoided: generic assistant, upload-summary, wallet dashboard, token allowlist wrapper, static portfolio terminal.
- non-chat host surface: policy workbench and receipt flight recorder.
- visible 60-second consequence: judge-selected shock changes a run from pending to refused and saves receipt evidence.
- durable proof artifact: Cloudflare Durable Object receipt now, explorer tx after chain deployment.
- deterministic layer: policy predicates run in `src/policy.ts` and equivalent Solidity contracts under `contracts/`.
- secret/public-page risk: no private keys in the public app; optional deployment keys are environment values only.

### Three-line elevator pitch

> RefusalRail lets a judge try to force a bad RWA agent trade.
> The policy rail refuses the unsafe action and stamps a receipt.
> The proof survives refresh, audit, and deployment.

## 7. User flows

### Flow A - Primary user, hero path

1. Open `/` and click "Try a refused trade".
2. Land on `/app` with a guest session already created.
3. Choose `MARKET_HALT`, `STALE_PRICE`, or `MAX_EXPOSURE`.
4. Click "Let the agent try".
5. See the red NO stamp, persisted receipt id, and receipt detail link.

### Flow B - Secondary user, safe action contrast

1. Open `/app/policy`.
2. Confirm the policy allows distribution claim and sweep but blocks principal sale.
3. Return to `/app` and click "Run safe sweep".
4. Compare allowed receipt against refused receipt.

### Flow C - Edge case / failure path

1. Try submitting an unsafe action without a selected shock.
2. The app disables the run button and explains which selection is required.
3. If a Cloudflare storage call fails, the app shows an error state and keeps the last visible receipt list readable.

## 8. User Cases (>= 2)

### User case 1 - Judge refuses an unsafe RWA agent action (HERO PATH)

- User: hackathon judge acting as a self-custody tokenized ETF holder.
- Situation: a bounded agent tries to sell principal after a shock.
- Pain: the judge needs proof that the product blocks the action for a deterministic reason.
- Trigger: judge selects a shock card and clicks "Let the agent try".
- Desired outcome: unsafe action is refused, and the proof can be inspected.
- Product response: receipt is saved with ownerId, policy hash, calldata hash, refusal code, shock snapshot, fallback route, and proof hash.
- Demo-visible moment: red NO stamp lands on the action card and receipt drawer opens.

### User case 2 - Safe standing action executes under same policy

- User: RWA holder who wants automation without unlimited trading authority.
- Situation: a distribution is available for a tokenized ETF.
- Pain: user wants automation to continue when the action is safe.
- Trigger: user clicks "Run safe sweep".
- Desired outcome: allowed receipt proves the same policy can permit narrow actions.
- Product response: safe receipt is saved with `SafeActionExecuted` status and before/after balance snapshot.
- Demo-visible moment: allowed receipt appears next to refused receipt.

### User case 3 - Builder audits the safety rail

- User: Arbitrum / Robinhood Chain technical judge.
- Situation: judge wants evidence this is not only a UI.
- Pain: thin demos often hide missing contracts and tests.
- Trigger: judge opens receipt detail, `/app/policy`, and `/about`.
- Desired outcome: proof paths are visible and reproducible.
- Product response: app shows contracts, compile command, Worker deployment path, and receipt schema.
- Demo-visible moment: detail route shows policy source, proof hash, and deployment readiness.

## 9. Demo critical path & Hero Moment

### Primary demo path (<= 90 s of screen time)

1. `/` hero: "Reject 1 unsafe RWA agent trade in 60 seconds."
2. Click "Run refused trade", "Connect wallet", or "Use test wallet".
3. On `/app`, choose a shock card.
4. Click "Let the agent try".
5. Open the receipt detail and compare with "Run safe sweep".

### Hero Moment (5 s)

```txt
0:00 - action card says the agent wants to sell principal.
0:01 - judge selects MARKET_HALT.
0:03 - NO stamp lands on the action.
0:05 - receipt id and proof hash appear.
```

### Demo interaction/showcase plan

- Source: `pitch/demo_interaction_plan.md`
- 0-10s hook: "This demo only wins if the trade fails."
- 10-30s interaction: judge picks a shock and clicks the attempt button.
- 30-60s visible consequence: unsafe action is refused and saved.
- Judge participation: judge chooses the failure condition.
- Visual staging: policy workbench, red compliance stamp, receipt flight recorder.
- Live-demo fallback: if live chain RPC is unavailable, Cloudflare proof mode remains active and chain fields are clearly labeled pending.

### Judge magnet

- Source: `pitch/judge_magnet.md`
- First-pass survival risks avoided: public app builds, no wallet wall, no exposed secrets, direct proof path, cut list named.
- Attention ladder:
  - 0-10s: judge knows the demo wants a refusal.
  - 10-30s: judge controls the shock.
  - 30-60s: receipt saves and becomes inspectable.
  - 2-3min: safe action contrast, policy workbench, and contract compile proof.
  - 5min / Q&A: README, tests, stack lock, and deployment commands.
- Weakest rubric line: live Arbitrum deployment depends on a funded wallet and final network choice; mitigation is contract compile plus optional deploy script.
- Q&A proof: receipt detail, contract source, and `SUBMISSION.md` limitation section.
- Retellable aha moment: "Contract stamps NO on unsafe RWA trades."

### Secondary visible beat

- Safe distribution sweep uses the same policy hash and records an allowed receipt.

### What the reviewer should remember 10 minutes later

- The failed transaction was not a bug. It was the product.

## 10. Pages / modules plan (>= 3 interactive surfaces)

| Route | Surface name | Responsibility | Components used |
|---|---|---|---|
| `/` | Landing | Sell the idea in 5 seconds and route to the hero path | Wordmark, hero action card, proof rail |
| `/app` | Refusal workbench | Select shock, run unsafe attempt, run safe sweep | Shock cards, action card, stamp layer, receipt drawer |
| `/app/policy` | Policy editor | Show bounded standing-action rules and allow threshold toggles | Policy matrix, rule toggles, calldata preview |
| `/app/receipts` | Receipt history | Inspect persisted refusal and allowed receipts | Timeline, filters, role switch, receipt rows |
| `/app/receipts/[id]` | Receipt detail | Show one proof artifact with hash, policy, owner, and replay data | Flight-recorder detail, proof table, JSON export |
| `/about` | Architecture + deployment | Show stack, contracts, Cloudflare deployment, and limitations | Architecture bands, command list, cut list |

## 11. Visual direction & UI principles

- Mood: forensic financial control room, low-glare, decisive, built for a judge scanning evidence.
- Visual style lane: operational-dashboard
- Why this lane fits the PRD/UIUX: the product is a workbench for policy state, receipt evidence, and execution status.
- Primary UI library: shadcn-inspired primitives.
- Supporting UI library: custom Cloudflare Worker HTML/CSS components with Radix-like state semantics.
- Non-Tailwind visual signature: policy flight-recorder HUD with red NO stamp, ledger rails, and evidence cells.
- Hero composition: cockpit workbench with one action card, three shock switches, and a receipt rail visible above the fold.
- Visual differentiation note: avoids generic dark trading terminals by centering refusal evidence, not charts or APY metrics.
- Forbidden lookalikes: Robinhood brokerage clone, DeFi yield dashboard, purple AI copilot, wallet dashboard, static compliance PDF.
- QR mobile access plan: QR opens `/app`; mobile shows shock picker, one run button, and latest receipt first.
- Mobile primary flow: choose shock, tap "Let the agent try", open receipt in two taps.
- Desktop parity plan: 16:10 layout shows policy, action, receipt history, and proof hash at once.
- Palette:
  - Accent: `oklch(0.55 0.19 24)` for refusal red.
  - Background: `oklch(0.09 0.01 250)` for low-glare control room.
  - Text: `oklch(0.94 0.01 250)` for readable evidence labels.
- Typography:
  - Display: system-ui, high-weight, no decorative finance font.
  - Body: system-ui with dense product scale.
  - Mono: ui-monospace for hashes, policy ids, and proof cells.
- Motion vocabulary: subtle premium, 160-240 ms, state-change only, reduced-motion safe.

### Visual system and component libraries

- Primary UI library: shadcn-inspired primitives.
- Supporting UI library: custom Worker-rendered components.
- Official docs checked: Cloudflare Workers, Wrangler config, Durable Objects, and HackathonHunter visual references.
- Install commands: `npm install -D wrangler typescript @cloudflare/workers-types @playwright/test vitest solc`.
- Tailwind role: none in the runtime; visual system is hand-authored CSS to keep the Worker deploy small.
- Tailwind/shadcn rejection note: this is not Tailwind-only or shadcn-only; the visible system is the refusal stamp, ledger rail, policy proof table, chain proof panel, and RainbowKit wallet dock inside a low-glare flight-recorder layout.
- gpt-taste design_plan: seed 42 selected Cinematic Center, Geist, Inline Typography Images, Horizontal Accordions, Infinite Marquee, Scrubbing Text Reveals, and Card Stacking; applied with product restraint.
- impeccable register/color strategy/audit notes: setup read `PRODUCT.md`, register is `product`, scene is a low-glare financial flight recorder for a judge under time pressure, color strategy is restrained with refusal red as the only saturated action color.

| Library | Component / block | Where it lives | Why it fits the lane |
|---|---|---|---|
| shadcn-inspired primitives | Button, field, segmented control, status pill | `/`, `/app` | familiar product affordances without turning the app into generic card UI |
| RainbowKit + Wagmi | wallet dock, injected wallet connection, wallet transaction bridge | `/`, `/app/receipts/[id]` | judges see a real wallet connection pattern while the test wallet keeps the no-secret demo path available |
| custom CSS HUD | NO stamp, ledger rail, evidence cells | `/app`, `/app/receipts/[id]` | product-specific silhouette |
| native HTML dialog/details | proof export and architecture disclosure | `/app/receipts/[id]`, `/about` | accessible without heavy client dependencies |

### Asset sources

- Logo source: logo-generator style pack represented by hand-authored SVG files under `public/brand/`.
- Avatar source: no avatars used; roles are shown as `holder`, `agent`, and `auditor` labels.
- Generated image/cutout assets: not used for the app; product credibility depends on rendered HTML state. Cutout asset plan is recorded as not used in `pitch/visual-build-contract.md`.
  - Raw prompt paths: not used.
  - Raw PNG paths: not used.
  - Cutout output paths: not used.
  - Cutout command: `node hackathonhunter/scripts/cutout_assets.mjs public/art/raw --out public/art/cutouts --brief-dir public/art/briefs --usage "not used for RefusalRail app shell" --auto-key --trim`
  - Cutout QA notes: no generated art in reviewer-visible app surfaces.

### Screenshot-worthy states

- Shock selected, unsafe action pending.
- NO stamp with persisted refusal receipt.
- Receipt detail with policy hash, calldata hash, proof hash, and optional explorer field.

## 12. Technical constraints

- Required stack:
  - Frontend: Cloudflare Worker-rendered HTML/CSS/JS. Override reason: a single Worker with Durable Object state gives the highest compile/deploy confidence for Cloudflare in this hackathon turn.
  - Backend: Cloudflare Worker route handlers.
  - Web3 chain / SDK: Solidity contracts plus optional browser EIP-1193 `sendTransaction`; Arbitrum Sepolia or Robinhood Chain target after a funded wallet is available.
  - Storage: Durable Object SQLite-backed storage for receipts and session-owned run history.
- Product backbone:
  - Identity/session model: guest cookie `rr_session` plus role switch for holder/auditor proof.
  - Database/storage schema: receipts table inside Durable Object storage.
  - Ownership fields: `userId`, `ownerId`, `roleId`, `walletAddress`, and `sessionId`.
  - Multi-user or multi-role proof path: holder creates receipts; auditor role sees public receipt history.
  - Stateless exception reason: none.
- Forbidden patterns:
  - No reviewer-visible fake transaction hashes.
  - No localStorage-only database substitute.
  - No wallet connection gate before the hero moment.
  - No AI chat surface.
  - No financial advice.
- External dependencies:
  - Wrangler for Cloudflare build/deploy.
  - TypeScript and Cloudflare Worker types.
  - Playwright for hero path and deployed smoke.
  - Vitest for policy engine tests.
  - solc for contract compilation.

## 13. Success metrics

### Product success metrics

- Judge-understands-in-10s: reviewer says, "It refuses unsafe RWA agent trades and records why."
- First-use wow moment: red NO stamp plus receipt id after the judge-selected shock.
- Demo completion: hero path completes from fresh session in under 60 seconds.
- Bounty-fit signal: "smart contract quality + real problem solving" is visible through policy logic, contract source, and proof receipts.

### Judge success metrics

- First-pass survival: live URL, repo, README, contract/test output, and submission prose open without scavenger hunt.
- Rubric coverage: every criterion maps to a screen, source file, test, or command.
- Q&A readiness: strongest likely question, "Is this only UI?", has a one-line answer plus receipt/contract proof.
- After-hack credibility: next-use loop is turning the refusal policy into a reusable RWA agent safety rail.

## 14. Risks & Cut list

### Risks

1. Live chain deployment needs a funded wallet and final network endpoint.
2. Robinhood Chain testnet asset contracts may not be publicly available in time.
3. Browser wallet flows can distract from the 60-second refusal proof.

### Cut list

1. Real securities and brokerage integration.
2. Dune dashboard as primary product.
3. General trading bot.
4. Portfolio dashboard.
5. Generated hero art.

### Prototype cut

- 2-3 P0 features that stay: unsafe refusal receipt, safe action contrast, receipt detail/history.
- Features deliberately cut: real asset trading, live brokerage, alpha generation, portfolio analytics.
- Why the cut strengthens the demo: it keeps the one miracle, durable refusal proof, unmistakable.

## PRD coverage matrix and implementation evidence

| Requirement | Priority | User case | Route/component | API/server action | Real data source | Contract/state | Playwright test | Deployment evidence | Status |
|---|---|---|---|---|---|---|---|---|---|
| `REQ-001` | P0 | HERO PATH | `/app` + shock cards | `POST /api/runs/refuse` | Durable Object receipt storage | `Receipt.status=refused`, `ownerId`, `policyHash` | `tests/hero.spec.ts` | Cloudflare Worker URL + dry-run report | planned |
| `REQ-002` | P0 | Safe action | `/app` + safe sweep button | `POST /api/runs/safe` | Durable Object receipt storage | `Receipt.status=allowed`, balance snapshot | `tests/hero.spec.ts` | Cloudflare Worker URL + dry-run report | planned |
| `REQ-003` | P0 | Audit proof | `/app/receipts/[id]` | `GET /api/receipts/:id` | Durable Object receipt storage | proof hash, calldata hash, shock snapshot | `tests/receipt.spec.ts` | live detail URL smoke | planned |
| `REQ-004` | P1 | Policy audit | `/app/policy` | `GET /api/policy` | policy engine constants + contract source | `PolicySnapshot` and Solidity compile output | `tests/policy.spec.ts` | README contract compile output | planned |
| `REQ-005` | P1 | Multi-role proof | `/app/receipts` role switch | `GET /api/receipts?scope=public` | Durable Object receipt storage | `roleId`, `ownerId`, public receipt visibility | `tests/roles.spec.ts` | smoke report with second context | planned |
| `REQ-006` | P1 | Deployment proof | `/about` | `GET /api/health` | Wrangler Worker runtime | build id, compatibility date, binding status | `tests/health.spec.ts` | `wrangler deploy --dry-run` | planned |
| `REQ-007` | P2 | Optional chain path | receipt detail export | browser `sendTransaction` when env configured | connected EIP-1193 wallet | compiled contracts, optional explorer tx | manual wallet smoke | chain tx/explorer after wallet funding | planned |
