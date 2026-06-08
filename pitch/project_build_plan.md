# Project Build Plan: RefusalRail

## Goal

Build and verify the G4 product loop so RefusalRail is a real policy workbench, not a single CTA demo. A first-time judge must connect a browser wallet or choose the test wallet, run an unsafe RWA standing-action attempt, see it refused, inspect a durable receipt, and optionally bind a chain transaction proof on Arbitrum Sepolia.

## Inputs Already Approved

- Hero spine: `pitch/hero.md`
- PRD: `pitch/project_prd.md`
- UIUX plan: `pitch/uiux_interaction_plan.md`
- Visual contract: `pitch/visual-build-contract.md`
- Stack: `stack.lock.json`
- Implementation matrix: `.hunter/implementation-matrix.json`
- Acceptance matrix: `.hunter/acceptance-matrix.json`
- Wiring matrix: `.hunter/wiring-matrix.json`

## Current Gate

- Gate: G4 Product Loop Realness
- Status: COMPLETED_AND_REVERIFIED_FOR_G5_G6_G7
- Last plan read: 2026-06-08T19:45:00Z
- Active row: B9

## Build Rows

| ID | Status | Step | Read Before Starting | Actions | Evidence To Produce | Verification |
|---|---|---|---|---|---|---|
| B0 | DONE | G3 evidence review | `references/00-orchestration.md`, `pitch/visual-build-contract.md`, `pitch/project_prd.md`, `pitch/uiux_interaction_plan.md`, `.hunter/implementation-matrix.json`, `stack.lock.json`, `docs/ui-mockups/mockup-manifest.md` | Confirm operational-dashboard lane, cockpit workbench composition, Web3 branch, Cloudflare Worker delivery, Durable Object ledger, and required env rows. | `pitch/project_build_plan.md`, decisions below, `stack.lock.json.frontend`, `stack.lock.json.web3` | `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/audit_project.mjs . --phase prd,delivery-mode,ui-libs` |
| B1 | DONE | Scaffold and runtime shape | `references/03-project-build.md`, `stack.lock.json`, `wrangler.jsonc`, `package.json`, `src/index.ts` | Use Cloudflare Worker rendered HTML instead of OpenNext, keep runtime minimal, wire TypeScript, Wrangler, Vitest, Playwright, and Solidity compile scripts. | `package.json`, `wrangler.jsonc`, `src/index.ts`, `src/html.ts`, `src/types.ts` | `npm run build` |
| B2 | DONE | Layout and providers | `references/03-project-build.md`, `references/20-interaction.md`, `src/html.ts`, `src/app/interaction-contract.css`, `src/components/ui/SidebarInteractionContract.tsx` | Replace starter output with product shell, top wallet dock, sidebar contract, density modes, Cmd-K palette markers, and no signup wall. | `src/html.ts`, `src/app/page.tsx`, `src/app/interaction-contract.css`, `src/components/ui/*` | `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/audit_interaction.mjs .` |
| B3 | DONE | Hero page and first click | `references/03-project-build.md`, `references/14-hero.md`, `pitch/hero.md`, `pitch/visual-build-contract.md`, `docs/ui-mockups/01-hero-frame.png` | Implement `/` with the 5-second claim, operational cockpit workbench, connect-wallet CTA, test-wallet CTA, and path into `/app`. | `src/html.ts`, `src/app/page.tsx`, `README.md`, `pitch/polish-combined/index.html` | `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/audit_hero.mjs .` |
| B4 | DONE | Brand, assets, and recording plates | `references/03-project-build.md`, `references/13-creative-production-flow.md`, `pitch/visual-build-contract.md`, `docs/ui-mockups/01-hero-frame.png`, `docs/ui-mockups/02-app-frame.png`, `docs/ui-mockups/03-mobile-first-run.png` | Use hand-authored brand SVGs and captured product screenshots. Avoid generated cutouts because the proof workbench should feel forensic. | `public/brand/*`, `docs/ui-mockups/*`, `pitch/polish-combined/assets/*`, `pitch/visual-qa/*` | `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/visual_qa_scan.mjs . --url http://127.0.0.1:4391 --fail-on error` |
| B5 | DONE | Product loop shell | `references/03-project-build.md`, `references/04b-feature-density.md`, `references/15-onboarding.md`, `references/20-interaction.md`, `pitch/user_cases.md`, `.hunter/acceptance-matrix.json`, `.hunter/wiring-matrix.json` | Build `/app`, `/app/policy`, `/app/receipts`, and `/app/receipts/[id]`; wire shock selection, refusal run, safe run, receipt history, role switch, proof table, empty states, and next-step CTAs. | `src/html.ts`, `src/index.ts`, `.hunter/acceptance-matrix.json`, `.hunter/wiring-matrix.json`, `.hunter/capabilities.json` | `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/audit_project.mjs . --phase feature-density` and `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/audit_onboarding.mjs .` |
| B6 | DONE | Real Web3 and storage backbones | `references/02b-web3-stack.md`, `references/06-web3-implementation.md`, `stack.lock.json`, `contracts/RefusalHub.sol`, `contracts/PolicyRegistry.sol`, `contracts/RefusalReceipt.sol`, `contracts/DemoRWAAsset.sol`, `scripts/deploy-contracts.mjs`, `src/onchain.ts` | Compile and deploy contracts on Arbitrum Sepolia, expose deployed addresses in Worker vars, persist receipts in Durable Object SQLite, include walletAddress ownership, and support EIP-1193 `eth_sendTransaction` binding. | `artifacts/contracts/*`, `wrangler.jsonc`, `src/onchain.ts`, `src/policy.ts`, `src/index.ts`, `contracts/*`, `.hunter/seed-manifest.json` | `npm run contracts:compile`, `npm run contracts:deploy`, `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/audit_project.mjs . --phase realness` |
| B7 | DONE | Env and secrets | `stack.lock.json.required_env`, `docs/DEPLOYMENT.md`, `wrangler.jsonc`, `references/06-web3-implementation.md`, `references/08-documentation.md` | Record `PRIVATE_KEY`, `ARBITRUM_SEPOLIA_RPC_URL`, and Cloudflare auth requirements without exposing secret values. Keep runtime signing out of the public Worker; judges use browser wallet or test-wallet proof mode. | `stack.lock.json.required_env`, `docs/DEPLOYMENT.md`, `.env.example`, `wrangler.jsonc` | `npm run deploy:dry` and public health smoke check shows `chainStatus=configured` |
| B8 | DONE | Tests, visual QA, and audit gate | `references/07-browser-testing.md`, `references/03-project-build.md`, `references/04b-feature-density.md`, `references/15-onboarding.md`, `references/20-interaction.md`, `tests/hero.spec.ts`, `tests/onboard.spec.ts`, `tests/deployed-smoke.spec.ts` | Cover guest refusal, safe receipt, built-in test wallet, browser wallet mock, chain-action prep, tx hash binding, auditor role, health, desktop, and mobile. | `tests/*.spec.ts`, `pitch/visual-qa/report.json`, `test-results/`, `.hunter/gates/G5-public-smoke.report.json` | `npm test`, `PORT=4391 npm run test:e2e`, `DEPLOYED_URL=https://refusalrail.veithly.workers.dev PLAYWRIGHT_BASE_URL=https://refusalrail.veithly.workers.dev npm run test:e2e`, `visual_qa_scan.mjs` |
| B9 | DONE | Handoff to G5, G6, and G7 | `references/00-orchestration.md`, `references/08-documentation.md`, `references/10-demo-recording.md`, `references/11-video-editing.md`, `references/12-submission.md`, `references/12-pitch-demo-combined.md`, `references/checklist.md` | Deploy public Worker, record final wallet demo, render combined pitch/demo video, update README, submission pack, manifest, and stop before final submit for human confirmation. | `README.md`, `SUBMISSION.md`, `.hunter/submission-manifest.json`, `.hunter/evidence-log.md`, `pitch/recording/pitch-demo-combined-final.mp4` | `npm run deploy`, `audit_project.mjs --phase cloudflare,video`, `audit_hero.mjs`, public E2E, public visual QA |

## Decisions

- Cloudflare Worker rendered HTML over OpenNext: chosen because the hackathon gate values a dependable public Worker URL and Durable Object storage more than framework novelty. Source: `stack.lock.json.frontend.framework_override_reason`.
- Operational-dashboard lane over marketing hero: chosen because the product is a financial proof workbench. Source: `PRODUCT.md`, `pitch/visual-build-contract.md`, `$impeccable` product register.
- `$gpt-taste` applied as an anti-generic design pressure, then narrowed by `$impeccable` product rules: keep the first viewport strong and wallet-visible, but avoid gratuitous landing-page choreography in the task surface. Source: `pitch/visual-build-contract.md`.
- Browser wallet plus built-in test wallet: chosen so judges can experience wallet connection while still completing the hero path without private keys or faucet setup. Source: `references/06-web3-implementation.md`, `tests/hero.spec.ts`.
- Arbitrum Sepolia as primary chain: chosen because the hackathon is Arbitrum-specific and the contracts are deployed with explorer-resolvable addresses. Source: `stack.lock.json.web3`, `wrangler.jsonc`.
- Durable Object SQLite ledger: chosen to persist receipts, ownership fields, wallet address, proof hash, and role inspection in the same Cloudflare deployment. Source: `src/index.ts`, `.hunter/wiring-matrix.json`.

## Blockers

- Public repo URL: pending user-provided GitHub repository or permission to initialize/publish one. This blocks a complete external submission link set but does not block local build, public app, or video verification.
- Public video URL: final MP4 exists at `pitch/recording/pitch-demo-combined-final.mp4`; upload target is still pending. This blocks the final form's video URL field.
- Final submit click: intentionally blocked until the user explicitly confirms the filled form.

## Errors Encountered

- Missing `pitch/project_build_plan.md`: `audit_project.mjs --phase build-plan` failed on 2026-06-08. Resolution: create this build plan with B0-B9 rows, concrete references, evidence outputs, and verification commands.
- Stale G5 metadata: previous reports referenced Worker Version ID `eff2c714-65de-4848-bb4f-98290be36511`. Resolution: redeployed version `2097af97-31b8-4248-8748-7fc91f493340` and update reports.
- Local `.agents/skills/impeccable/scripts/context.mjs` missing: resolved by running the installed skill script at `/Users/rick/.skills-manager/skills/impeccable/scripts/context.mjs`.
