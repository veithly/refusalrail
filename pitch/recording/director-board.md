# RefusalRail Video Director Board

This board is for the main HackQuest judge artifact: `pitch/recording/pitch-demo-combined-final.mp4`, a 3:30 full product proof cut rendered from `pitch/polish-full/index.html`, `pitch/recording/full-demo.mp4`, refreshed product screenshots, and `artifacts/full/narration.json`.

The shorter `pitch/recording/pitch-demo-preview-final.mp4` remains a 1:36 preview only. It is not the primary submission video.

## Source Truth

- Hero: `pitch/hero.md`
- PRD: `pitch/project_prd.md`
- UIUX interaction plan: `pitch/uiux_interaction_plan.md`
- Video outline: `pitch/recording/video-outline.md`
- Swiss deck: `pitch/deck/index.html`
- Live URL: `https://refusalrail.veithly.workers.dev`

## Commercial Motion Thesis

The video makes failure feel like the product. The opening frames name the rule, the middle shows a judge-controlled unsafe action failing, and the close ties the receipt to Arbitrum Sepolia contracts, the public app, and a plain limitation statement.

## Scene Board

| Scene | Time | Judge belief | Screen action | Proof surface | HyperFrames treatment | QA frame |
|---|---:|---|---|---|---|---|
| `01_hook` | 0:00-0:15 | The winning action is the blocked trade. | Hero claim plus current product screenshot. | `NO` receipt thesis, receipt action, Arbitrum Sepolia path. | Product-launch opener with proof card stack. | `pitch/polish-full/snapshots/frame-00-at-4.0s.png` |
| `02_stakes` | 0:15-0:32 | RWA agents need a brake that creates evidence. | Shock/normal/audit card stack. | Market halt, distribution sweep, audit result. | Deck-style card reveal with dark launch background. | `pitch/polish-full/snapshots/frame-01-at-32.0s.png` |
| `03_judge_path` | 0:32-0:54 | Judges can run it without wallet setup blocking first value. | Connect wallet, test wallet, receipt identity. | Test wallet `0x2eE8...5c66`. | Three-card path reveal. | `pitch/polish-full/snapshots/frame-02-at-54.0s.png` |
| `04_wallet_entry` | 0:54-1:04 | Wallet identity follows into the workbench. | Live product plate starts with wallet rail. | Browser wallet/test wallet state. | Single active demo plate, no duplicate video. | `pitch/polish-full/snapshots/frame-03-at-72.0s.png` |
| `05_live_refusal` | 1:04-1:22 | The policy rail decides before execution. | Choose `MARKET_HALT`, let the agent try, show `NO`. | Saved refusal receipt and latest proof artifact. | Component-lift card over dimmed browser plate. | `pitch/polish-full/snapshots/frame-04-at-92.0s.png` |
| `06_receipt_detail` | 1:22-1:40 | The refusal is inspectable after refresh. | Open latest receipt. | walletAddress, policyHash, calldataHash, shockHash, proofHash. | Receipt detail lift and lower-third. | `pitch/polish-full/snapshots/frame-05-at-112.0s.png` |
| `07_chain_path` | 1:40-1:59 | The receipt can bind Arbitrum Sepolia proof. | Prepare/send RefusalHub calldata and bind explorer tx. | RefusalHub, PolicyRegistry, demo tx. | Evidence-card matrix. | `pitch/polish-full/snapshots/frame-06-at-128.0s.png` |
| `08_safe_contrast` | 1:59-2:15 | Safety is selective. | Run safe sweep and compare OK/NO. | Policy page and allowed receipt. | Policy contrast card. | `pitch/polish-full/snapshots/frame-06-at-128.0s.png` |
| `09_auditor_view` | 2:15-2:35 | The ledger outlives one run. | Open auditor receipt history. | Persisted proof rail with NO and OK rows. | Four-block pipeline reveal. | `pitch/polish-full/snapshots/frame-07-at-166.0s.png` |
| `10_mechanism` | 2:35-3:08 | The mechanism is small and real. | Show live app/API, receipt ledger, Solidity contracts, explorer proof. | Runtime proof, contract suite, public tx. | Floating proof checks. | `pitch/polish-full/snapshots/frame-08-at-190.0s.png` |
| `11_limits_next` | 3:08-3:30 | The boundary is honest and judge action is clear. | Final lockup with URL and limitations. | No real securities, no brokerage integration, no price prediction. | Brand lockup with URL. | `pitch/polish-full/snapshots/frame-09-at-205.0s.png` |

## Focus / Polish Plan

| Scene | Source | Overlay type | QA frame path |
|---|---|---|---|
| `01_hook` | `pitch/deck/images/hero-latest-16x10.png` | Hero proof card | `pitch/polish-full/snapshots/frame-00-at-4.0s.png` |
| `05_live_refusal` | `pitch/recording/full-demo.mp4` plus `pitch/deck/images/workbench-refused-16x10.png` | Component-lift refusal card | `pitch/polish-full/snapshots/frame-04-at-92.0s.png` |
| `06_receipt_detail` | `pitch/deck/images/receipt-detail-refused-16x10.png` | Receipt lift and lower-third | `pitch/polish-full/snapshots/frame-05-at-112.0s.png` |
| `07_chain_path` | `pitch/deck/images/chain-submitted-16x10.png` | Proof matrix | `pitch/polish-full/snapshots/frame-06-at-128.0s.png` |
| `09_auditor_view` | `pitch/deck/images/auditor-evidence-wall-16x10.png` | Proof-history pipeline | `pitch/polish-full/snapshots/frame-07-at-166.0s.png` |
| `10_mechanism` | `pitch/deck/images/build-page-16x10.png` | Runtime proof cards | `pitch/polish-full/snapshots/frame-08-at-190.0s.png` |

## Audio Plan

- Full narration source: `artifacts/full/narration.json`.
- Full narration bus: `artifacts/full/vo.wav`.
- Captions source: `artifacts/full/captions.srt`.
- HyperFrames DOM stays visual-only; final audio is muxed once with ffmpeg.
- The public mechanism chapter says `live app/API`, `receipt ledger`, `Solidity contracts`, and `explorer proof`; helper vendors and deployment-provider details stay out of the spoken pitch.

## Exit Notes

- The first 30 seconds include the product thesis and user stake.
- The live demo plate shows one active base video at a time.
- Proof data appears as receipts, proof cards, and readable tables, not raw JSON as the main surface.
- The final frame leaves one action: open the live app and inspect the receipt proof.
