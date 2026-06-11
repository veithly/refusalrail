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
- `PLAYWRIGHT_BASE_URL=http://127.0.0.1:4395 npm run test:e2e` passed locally with 16 tests and 2 deployed-only skips after the wallet-path update.
- `npm run deploy:dry` passed with Wrangler 4.98.0.
- `npm run deploy` published `https://refusalrail.veithly.workers.dev` as Worker version `29b87c4d-a444-4381-8d9e-3b4b579b3fae` after the HackQuest media and OG-cover refresh.
- `DEPLOYED_URL=https://refusalrail.veithly.workers.dev PLAYWRIGHT_BASE_URL=https://refusalrail.veithly.workers.dev npm run test:e2e` passed with 18 tests against the refreshed deployment.
- `curl -fsS https://refusalrail.veithly.workers.dev/api/health` returned `buildId=forensic-swiss-2026-06-11T143834Z` and `chainStatus=configured`.
- `DEPLOYED_URL=https://refusalrail.veithly.workers.dev PLAYWRIGHT_BASE_URL=https://refusalrail.veithly.workers.dev npm run test:e2e` passed with 18 tests after the wallet-path redeploy.
- `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/visual_qa_scan.mjs . --url https://refusalrail.veithly.workers.dev --fail-on warning` passed with 0 errors and 0 warnings.

## G6 Pitch / Video / Repo Sync

- Re-recorded wallet demo with the injected browser-wallet path and built-in test wallet path.
- Regenerated narration from `artifacts/narration.json`.
- Re-recorded `pitch/recording/wallet-demo.webm` with the RainbowKit browser-wallet path and test-wallet path.
- Rendered `pitch/recording/pitch-demo-preview-final.mp4` as the 1:36 quick-preview cut.
- Re-mixed `pitch/recording/pitch-demo-preview-final.mp4` through Hunter `mix_audio.sh` with real BGM from `/Users/rick/Documents/MySkill/hackathonhunter-skill/assets/music/Future Forward_no-watermark.mp3`.
- Verified quick-preview MP4: 96 seconds, 1920x1200, H.264 High, AAC stereo, mean volume -17.2 dB, max volume -1.3 dB, stereo-diff mean -36.0 dB.
- Recorded the full product loop plate through the public Worker: injected browser-wallet path, built-in test wallet, refusal receipt, RefusalHub calldata, tx-hash binding, safe sweep, policy page, auditor receipts, and deployment page.
- Generated full-length narration from `artifacts/full/narration.json`, plus `artifacts/full/captions.srt`; the mechanism chapter was rewritten after the public copy sweep to say live app/API and receipt ledger.
- Rebuilt `pitch/deck/index.html` with guizang-ppt-skill Swiss style and refreshed the deck QA contact sheet from the latest stateful product screenshots.
- Rendered `pitch/recording/pitch-demo-combined-final.mp4` as the main judge demo.
- Re-mixed `pitch/recording/pitch-demo-combined-final.mp4` and `pitch/recording/pitch-demo-full-final.mp4` through Hunter `mix_audio.sh` with two sequential, non-overlapping real BGM beds: `Future Forward_no-watermark.mp3` and `Future Forward_no-watermark (2).mp3`.
- Verified full judge MP4: 3:30, 1920x1200, H.264, AAC stereo, mean volume -17.0 dB, max volume -1.2 dB, stereo-diff mean -38.7 dB.
- `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/audit_hero.mjs .` passed.
- `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/audit_project.mjs . --phase video` passed.

## G7 Submission Pack

- Updated `README.md`, `SUBMISSION.md`, `docs/DEPLOYMENT.md`, `.hunter/gates/G5-public-smoke.report.json`, `.hunter/submission-manifest.json`, `.hunter/claim-matrix.json`, `.hunter/submission-pack.md`, `pitch/submission-copy-board.md`, and `pitch/judge-red-team.md`.
- Upgraded the judge-facing video package from a 1:36 quick preview to a 3:30 full pitch/demo, while keeping the short video as a quick-preview asset.
- Generated the HackQuest cover plus four 1280x720 project images from the latest guizang Swiss deck and stateful product screenshots under `pitch/hackquest-assets/`.
- HackQuest project page should use the 3:30 full demo URL as the main Demo Video when the editor exposes a video URL or upload control.
- Added missing Hunter G0/G1 evidence files for final-copy grounding: `pitch/prize_thesis.md`, `.hunter/sponsor-centrality.json`, `.hunter/track-calibration.json`, `pitch/winner_slot.md`, `pitch/gallery-saturation-audit.md`, `pitch/judge_recall_test.md`, and `pitch/killer_artifact.md`.
- Rewrote HackQuest `Project Intro`, `Description`, and `Progress During Hackathon` with the proof phrase `1 NO receipt names wallet and hashes`, a product-scene first paragraph, Arbitrum Sepolia contract proof, live judge path, media links, and plain testnet limitations.
- Kimi WebBridge public readback on 2026-06-12 confirmed `hasNewIntro=true`, `hasNewDesc=true`, `hasNewProgress=true`, HackQuest-hosted demo video `qL2qsogCADKn1XVlzr4Gd.mp4` duration `209.625`, and four project images at 1280x720.
- Public media screenshot evidence: `pitch/hackquest-assets/hackquest-public-media-after.png` shows the HackQuest-hosted 3:29 video plus the new cover/workbench/receipt/chain-proof project images.
- `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/audit_project.mjs . --phase prize-thesis` passed after adding the winner-slot evidence.
- `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/audit_project.mjs . --phase submission` passed after the rewrite.
- `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/audit_hero.mjs .` passed with README, narration, slide, and submission sync.
