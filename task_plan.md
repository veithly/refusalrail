# Task Plan: RefusalRail HackathonHunter Build

## Goal
Run the HackathonHunter pipeline from the first incomplete gate through a Cloudflare-ready, compileable RefusalRail app with PRD, implementation evidence, tests, and submission packaging.

## Phases
- [x] Phase 1: Locate HackathonHunter skill, inspect current project evidence, and identify the first incomplete gate.
- [x] Phase 2: Build G2 PRD + Stack Lock evidence.
- [x] Phase 3: Build G3 Visual + First-Run Contract evidence.
- [x] Phase 4: Implement the G4 product loop as a Cloudflare-ready app.
- [x] Phase 5: Run local build, tests, Wrangler validation, and browser smoke.
- [x] Phase 6: Produce README, submission pack, and final gate evidence.

## Key Questions
1. What exact product loop should a judge complete in 60 seconds?
2. Which stateful backbones can be real without waiting on external secrets?
3. What Cloudflare target gives the highest deploy confidence for this deadline?

## Decisions Made
- Current gate: G2 PRD + Stack Lock, because the project already has G1 concept/pitch evidence but lacks `pitch/project_prd.md`, `.hunter/implementation-matrix.json`, and `stack.lock.json`.
- Deployment target: Cloudflare Workers through Wrangler. If full Next.js introduces adapter risk, build as a static/edge-friendly app that Wrangler can compile and dry-run.
- User-visible language: English, because the existing project artifacts and hackathon-facing names are English.
- Stack lock: Cloudflare Worker + Durable Object SQLite-backed storage, replacing the default Next/OpenNext path to maximize Cloudflare compile/deploy confidence for this turn.

## Errors Encountered
- `impeccable` project-local context script was missing at `.agents/skills/impeccable/scripts/context.mjs`; reran the installed skill script at `/Users/rick/.skills-manager/skills/impeccable/scripts/context.mjs`, received `NO_PRODUCT_MD`, and created `PRODUCT.md` from existing project evidence.
- G1 audit initially failed because `pitch/judge_magnet.md` was missing and `pitch/idea_tournament.md` lacked recent/freshness/mutation/Judge-Magnet evidence. Added `pitch/judge_magnet.md` and patched the selected-winner evidence.
- G2 PRD audit initially failed because `pitch/user_cases.md` headings did not start with `## User case`; patched headings without changing case semantics.
- `gpt-taste` skill was not installed under `/Users/rick/.skills-manager/skills` or `/Users/rick/.codex/skills`; visual contract records the gap and uses `frontend-design` plus `impeccable` constraints.
- Playwright dev server initially failed because Wrangler rejected `compatibility_date=2026-06-06` as a future date from the CLI's UTC perspective; changed it to `2026-06-05`.

## Status
**Complete except human Cloudflare authentication** - Build, tests, local browser smoke, Hunter gates, and Wrangler dry-run are green. Live Cloudflare publish requires `wrangler login`.
