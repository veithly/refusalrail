# RefusalRail Combined Demo Director Board

## Source Truth

- Hero: `pitch/hero.md`
- PRD: `pitch/project_prd.md`
- UIUX interaction plan: `pitch/uiux_interaction_plan.md`
- Video outline: `pitch/recording/video-outline.md`
- Live URL: `https://refusalrail.veithly.workers.dev`

## Commercial Motion Thesis

The video should feel like a product proof package, not a screen recording. The first beat shows the shipped artifact stack, the middle beat makes the refusal feel like the successful outcome, and the close turns receipts, deployed contracts, tests, and Cloudflare proof into one judge-readable trail.

## Scene Board

| Scene | Time | Judge belief | Screen action | Proof surface | HyperFrames treatment | QA frame |
|---|---:|---|---|---|---|---|
| `01_cold_open` | 0-5s | This is a real shipped package, not a repo script. | Show live app, receipts, policy, contracts, and submission as a floating product bundle. | Live URL, README, receipt, tx, submission cards. | `artifact_stack_3d` with perspective, preserve-3d, parallax push-in. | `pitch/polish-combined/qa/frame-01.png` |
| `02_hero_claim` | 5-14s | The demo has a sharp win condition. | Bring in the hero frame and the seven-word rumor. | `Reject 1 unsafe RWA trade, stamp NO.` | Deck micro-motion, marker sweep, shared-object receipt chip. | `pitch/polish-combined/qa/frame-02.png` |
| `03_shock_to_demo` | 14-25s | The judge can change the result. | Move a shock card from pitch layer into the app screenshot. | Shock card and app workbench. | `shared_object` handoff into live demo plate. | `pitch/polish-combined/qa/frame-03.png` |
| `04_refusal_loop` | 25-45s | The policy rail, not the agent, decides. | Play `tight.mp4` product demo plate. | NO stamp, receipt rail, receipt detail, policy page. | `component-lift` zoom cards over dimmed browser plate. | `pitch/polish-combined/qa/frame-04.png` |
| `05_proof_montage` | 45-58s | The refusal left durable evidence. | Convert outputs into proof cards. | policy hash, calldata hash, proof hash, refused tx. | `proof_montage` with receipt cards and lower thirds. | `pitch/polish-combined/qa/frame-05.png` |
| `06_architecture_reveal` | 58-73s | There is a real mechanism behind the UI. | Reveal Worker, Durable Object ledger, policy contracts, explorer tx. | Cloudflare + Durable Object + Arbitrum Sepolia contracts. | `architecture_reveal` as floating 4-block pipeline with depth. | `pitch/polish-combined/qa/frame-06.png` |
| `07_outro` | 73-80s | The next step is clear. | Lock product name, live URL, and inspectable proof. | live Worker URL and deployed tx. | Brand lockup with proof rail settle. | `pitch/polish-combined/qa/frame-07.png` |

## Judge Attention Pass

| Scene | Judge should think | Rubric / Q&A answered | Proof shown |
|---|---|---|---|
| `01_cold_open` | The team shipped the whole package. | Public URL, repo readiness, deploy confidence. | Artifact cards and live URL. |
| `02_hero_claim` | The project is retellable. | 5-second clarity. | Hero and seven-word rumor. |
| `03_shock_to_demo` | I control the failure condition. | Product/demo interactivity. | Shock card becomes app input. |
| `04_refusal_loop` | The refusal is the product. | Agentic bounded authority. | NO stamp and persisted receipt. |
| `05_proof_montage` | It is not UI-only. | Smart contract quality and proof. | Hashes, tx, contracts. |
| `06_architecture_reveal` | The implementation is real. | Cloudflare, storage, contracts, tests. | Worker, DO ledger, Arbitrum contracts. |
| `07_outro` | I can open and inspect it now. | Submission readiness. | URL, proof path. |

## Focus / Polish Plan

| Scene | Selector or asset source | Overlay type | QA frame path |
|---|---|---|---|
| `02_hero_claim` | `docs/ui-mockups/01-hero-frame.png` | Hero frame lift | `pitch/polish-combined/qa/frame-02.png` |
| `03_shock_to_demo` | `pitch/visual-qa/desktop-app.png` | Shared-object shock card | `pitch/polish-combined/qa/frame-03.png` |
| `04_refusal_loop` | `pitch/recording/tight.mp4` | Component-lift proof card | `pitch/polish-combined/qa/frame-04.png` |
| `05_proof_montage` | deployed address + tx fields | Proof-receipt montage | `pitch/polish-combined/qa/frame-05.png` |
| `06_architecture_reveal` | `wrangler.jsonc`, contracts, deployments | Floating architecture blocks | `pitch/polish-combined/qa/frame-06.png` |

## Audio Plan

- Pitch narration lives under `pitch/polish-combined/assets/pitch-narration-*.mp3`.
- Demo narration lives at `pitch/polish-combined/assets/narration-tight.mp3`.
- The HyperFrames DOM stays visual-only. Audio is muxed once in ffmpeg for `pitch-demo-combined-final.mp4`.
- BGM source: HackathonHunter music assets, mixed quietly under narration.

## Exit Notes

- First 30 seconds include the final package, hero claim, judge shock input, and product demo plate.
- The video uses one active base video plate at a time.
- Proof data is presented as cards and lower thirds, not raw JSON.
