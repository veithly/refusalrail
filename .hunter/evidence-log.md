# Evidence Log

## G1 Concept Lock

- `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/audit_idea_tournament.mjs /Users/rick/Documents/Project/Hackathon/RefusalRail` passed with 47/47 mandatory checks.

## G2 PRD + Stack Lock

- Created `pitch/project_prd.md`.
- Created `.hunter/implementation-matrix.json`.
- Created `stack.lock.json`.
- Recorded implementation override: Cloudflare Worker + Durable Object storage instead of Next/OpenNext for deploy confidence.
- `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/audit_project.mjs /Users/rick/Documents/Project/Hackathon/RefusalRail --phase prd` passed.
- `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/audit_project.mjs /Users/rick/Documents/Project/Hackathon/RefusalRail --phase delivery-mode` passed.

## G3 Visual + First Run

- Created `pitch/visual-build-contract.md`.
- Created UI mockup sources and PNG frames under `docs/ui-mockups/`.
- Recorded `$gpt-taste` design-plan pass and `$impeccable` product-register pass in `pitch/visual-build-contract.md`.
- `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/audit_project.mjs /Users/rick/Documents/Project/Hackathon/RefusalRail --phase ui-libs` passed.

## G4 Product Loop Realness

- Created `pitch/project_build_plan.md` with B0-B9 build rows, references, evidence, and verification checks.
- Implemented Cloudflare Worker routes, Durable Object ledger, policy engine, receipt pages, and optional wallet export code path.
- Implemented Solidity contracts and compile script.
- Added wallet connection UI, built-in test wallet path, `walletAddress` receipt evidence, and EIP-1193 `eth_sendTransaction` binding.
- `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/audit_project.mjs /Users/rick/Documents/Project/Hackathon/RefusalRail --phase build-plan` passed.
- `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/audit_project.mjs /Users/rick/Documents/Project/Hackathon/RefusalRail --phase feature-density` passed.
- `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/audit_project.mjs /Users/rick/Documents/Project/Hackathon/RefusalRail --phase realness` passed.

## G5 Cloudflare Smoke

- `npm run build` passed.
- `npm test` passed.
- `PLAYWRIGHT_BASE_URL=http://127.0.0.1:4392 npm run test:e2e` passed locally with 16 tests and 2 deployed-only skips after the wallet-path update.
- `npm run deploy:dry` passed with Wrangler 4.98.0.
- `npm run deploy` published `https://refusalrail.veithly.workers.dev` as Worker version `07ec3378-01eb-4df1-ab1c-c9ad9e40038e`.
- `curl -fsS https://refusalrail.veithly.workers.dev/api/health` returned `buildId=wallet-rainbowkit-mimo-2026-06-09T150658Z` and `chainStatus=configured`.
- `DEPLOYED_URL=https://refusalrail.veithly.workers.dev PLAYWRIGHT_BASE_URL=https://refusalrail.veithly.workers.dev npm run test:e2e` passed with 18 tests after the wallet-path redeploy.
- `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/visual_qa_scan.mjs . --url https://refusalrail.veithly.workers.dev --fail-on warning` passed with 0 errors and 0 warnings.

## G6 Pitch / Video / Repo Sync

- Re-recorded wallet demo with the injected browser-wallet path and built-in test wallet path.
- Regenerated narration from `artifacts/narration.json`.
- Re-recorded `pitch/recording/wallet-demo.webm` with the RainbowKit browser-wallet path and test-wallet path.
- Rendered `pitch/recording/pitch-demo-preview-final.mp4` as the 1:36 quick-preview cut.
- Verified quick-preview MP4: 96 seconds, 1920x1200, H.264 High, AAC mono, mean volume -17.3 dB, max volume -1.2 dB.
- Recorded the full product loop plate through the public Worker: injected browser-wallet path, built-in test wallet, refusal receipt, RefusalHub calldata, tx-hash binding, safe sweep, policy page, auditor receipts, and deployment page.
- Generated full-length narration from `artifacts/full/narration.json`, plus `artifacts/full/captions.srt`; the mechanism chapter was rewritten after the public copy sweep to say live app/API and receipt ledger.
- Rebuilt `pitch/deck/index.html` with guizang-ppt-skill Swiss style and refreshed the deck QA contact sheet from the latest stateful product screenshots.
- Rendered `pitch/recording/pitch-demo-combined-final.mp4` as the main judge demo.
- Verified full judge MP4: 3:30, 1920x1200, H.264, AAC mono.
- `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/audit_hero.mjs .` passed.
- `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/audit_project.mjs . --phase video` passed.

## G7 Submission Pack

- Updated `README.md`, `SUBMISSION.md`, `docs/DEPLOYMENT.md`, `.hunter/gates/G5-public-smoke.report.json`, `.hunter/submission-manifest.json`, `.hunter/claim-matrix.json`, `.hunter/submission-pack.md`, `pitch/submission-copy-board.md`, and `pitch/judge-red-team.md`.
- Upgraded the judge-facing video package from a 1:36 quick preview to a 3:30 full pitch/demo, while keeping the short video as a quick-preview asset.
- HackQuest project page should use the 3:30 full demo URL as the main Demo Video when the editor exposes a video URL or upload control.
