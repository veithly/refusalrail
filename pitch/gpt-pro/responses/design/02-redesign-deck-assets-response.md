1. Judge-First Diagnosis

The first viewport says the right sentence, but it does not stage the judge’s game.
Current: hero copy is memorable, but the screen still feels like a generic landing page with a demo card.
Fix: make the first viewport an operable “try to force the bad trade” cockpit: wallet identity dock, shock picker, unsafe action preview, red NO verdict surface, and latest receipt preview all above the fold. The PRD’s core path is clear: judge opens the app, picks a shock, lets the agent try, sees NO, then opens proof.

project_prd

Wallet identity is present but not dominant enough.
Current: topbar has wallet buttons, and the product panel mentions guest/test mode, but identity does not feel like part of the proof artifact.
Fix: create a persistent Execution Identity Rail in the topbar and first viewport: mode, walletAddress, chain, RefusalHub, PolicyRegistry, and tx binding. Use the supplied real surfaces only: test wallet 0x2eE8...5c66, Arbitrum Sepolia, RefusalHub 0x3540...0Cf8, PolicyRegistry 0xa9df...23B7, and real demo tx 0x0b80...b372. Never invent a second address or fake tx.

The proof is visually subordinate to the dashboard shell.
Current: the workbench screenshot shows a central dark action card, but the receipt rail reads like a side panel instead of the product’s main artifact.

app


Fix: reframe the app around a flight-recorder sequence: wallet identity → agent attempt → policy verdict → receipt saved → calldata/tx binding. The receipt should become a large object, not a small card.

The current visual language is too safe for a prize demo.
Current: light grid background, default-ish cards, dark center panel, and simple red buttons. It is legible, but it does not yet feel like a forensic RWA safety primitive.
Fix: move into Swiss forensic evidence board: black/white/red contrast, ruler grids, receipt-paper cells, stamped verdicts, hash tape, indexed proof rows, and screenshot-led composition. Keep the official lane as operational-dashboard, but make the signature a policy flight recorder with ledger rails and evidence cells.

visual-build-contract

The policy page has evidence, but not enough drama or hierarchy.
Current: “Bounded standing actions” and the policy matrix are useful, but the page has too much blank space and reads like documentation.

policy


Fix: rebuild it as a policy circuit breaker map: left side “allowed standing action,” right side “blocked principal sale,” center rule matrix, bottom contract proof cards. Show SELL_PRINCIPAL + MARKET_HALT → ActionRefused as the hero cell.

The receipts page looks like a receipt dump, not an auditor wall.
Current: many small cards create proof density, but the eye has no anchor.
Fix: convert it into an Evidence Wall: latest receipt as a large lead artifact, role switch as “holder/auditor lens,” filters for NO, OK, MARKET_HALT, and a compact receipt grid below. Auditor mode reveals wallet, owner/session, policy hash, calldata hash, proof hash, and tx hash fields. The UIUX plan already defines this holder/auditor distinction.

uiux_interaction_plan

The video/deck currently feels like atmosphere, not proof.
Current: the video/deck frame is an abstract grid with a caption, so it does not sell the actual product primitive.

current-video-deck


Fix: rebuild the narrative around judge participation: “choose shock → agent fails → NO receipt persists → safe sweep passes → auditor inspects.” The deck should be a Swiss evidence deck with product screenshots, data heroes, proof anatomy, and a system diagram.

2. Frontend Redesign Direction

Visual lane name:
Forensic Flight Recorder / Swiss Evidence Workbench. Keep the product in the operational-dashboard lane, but elevate it from “dashboard” to “audit instrument.” The design should feel like a judge is looking at a financial black box after an unsafe RWA agent attempt.

Hero composition:
Use the existing public spine headline, but stage it as a product action:

Reject 1 unsafe RWA agent trade
in 60 seconds.

Desktop hero should use a 12-column grid. Left 6 columns: headline, one-sentence explanation, three numbered judge steps, and primary CTAs. Right 6 columns: live proof cockpit with wallet identity, shock selector, attempted action, policy verdict, and receipt preview. Bottom band: three evidence cells — Wallet identity, Policy verdict, Receipt proof.

Typography recommendation:
Use Geist or a Geist-like stack. Heavy display, dense body, and monospace evidence cells.

CSS
--font-display: "Geist", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
--font-body: "Geist", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
--font-mono: "Geist Mono", "SFMono-Regular", ui-monospace, Menlo, Consolas, monospace;

Display text should be brutal and high-weight. Body copy should be short. Hashes, reason codes, calldata labels, chain IDs, and addresses should be mono.

Color system:
Use a restrained forensic palette.

CSS
--paper: #f3f6f8;
--paper-2: #e9eef3;
--ink: #0b111c;
--ink-2: #151d2b;
--rail: #090d14;
--line: #c8d2df;
--line-dark: #293344;
--muted: #66758a;
--text-on-dark: #f4f7fb;
--refusal-red: oklch(0.55 0.19 24);
--refusal-red-dark: #7f1d1d;
--ok-green: #14875a;
--warning-amber: #b7791f;
--focus: #22c55e;

The red should be used for verdict/action only: NO stamp, unsafe CTA, refusal border, and failed path. Green should only mark allowed receipts. Avoid purple, AI gradients, APY green, and brokerage-style stock colors.

Image/texture system:
Use rendered proof surfaces, screenshots, and derived textures rather than generic AI art. The product credibility depends on rendered HTML state and screenshots of real proof fields, not decorative finance images. Add subtle textures: ledger paper, hash tape, stamp ink, scanline grid, and chain-binding diagrams. Keep all data values real, supplied, or clearly labeled pending.

First viewport structure:
The first viewport must be immediately playable:

Sticky nav with logo, route links, and visible wallet identity.

Hero headline and one-sentence value prop.

Three action steps: 01 Connect/use test wallet, 02 Choose shock, 03 Stamp NO.

Operable proof cockpit: shock buttons, unsafe attempt preview, refusal CTA, safe sweep contrast.

Wallet/chain dock visible without scrolling.

Latest receipt preview, even in empty state: “No receipt yet — run refusal to create proof.”

This aligns with the required first-run flow: the judge reads the hero, lands in the workbench, selects a shock, runs the refusal, then inspects the saved receipt.

uiux_interaction_plan

Wallet surface treatment:
Create a persistent Execution Identity Rail:

Execution identity
mode: Connected wallet | Test wallet | Guest proof mode
walletAddress: 0x2eE8...5c66 or connected wallet
chain: Arbitrum Sepolia
RefusalHub: 0x3540...0Cf8
PolicyRegistry: 0xa9df...23B7
tx binding: pending | 0x0b80...b372

The wallet rail should appear in the topbar, hero cockpit, workbench, and receipt detail. It should never be hidden behind a dropdown. Full values should be copyable in detail views; shortened values are fine in the first viewport.

Workbench structure:
Use a 3-lane cockpit:

Left lane: Judge input
- Wallet mode
- Shock selector: MARKET_HALT, STALE_PRICE, MAX_EXPOSURE
- Action buttons

Center lane: Agent attempt black box
- Attempted action: sell principal after shock
- Policy rule: no principal sale during shock
- Verdict animation: REFUSED / OK
- Same-policy safe sweep contrast

Right lane: Receipt rail
- Latest receipt
- Status
- Wallet
- Reason code
- Proof hash
- Open proof

Under the cockpit, add a full-width proof rail: walletAddress, reasonCode, policyHash, calldataHash, proofHash, contractRefs, txHash.

Receipt detail structure:
Receipt detail should feel like a forensic record, not a modal.

Top:
NO / OK stamp, plain-language verdict, wallet identity, created time, shock.

Middle:
Two-column layout. Left column: “What happened” timeline. Right column: proof table.

Bottom:
Policy evidence, calldata preview, chain binding, copy proof bundle, and explorer link only when a real tx exists. Unknown or pending tx fields must be labeled pending, not successful.

The receipt detail must expose the fields specified in the PRD: policy hash, calldata hash, reason code, shock snapshot, owner, and proof hash.

project_prd

Mobile behavior:
Mobile should not mimic the desktop dashboard. Use a stepper:

1. Wallet
2. Shock
3. Attempt
4. Receipt

Sticky top: wallet/test-wallet surface.
Primary screen: shock cards and one red “Let the agent try” button.
After run: NO stamp and latest receipt card.
Hashes collapse into labeled accordions with copy buttons.
Target width: 390px. The mobile contract already calls for header, shock selector, run button, and latest receipt first.

visual-build-contract

3. gpt-taste Design Plan Inputs

Hero architecture:
Cinematic Center + Operable Proof Cockpit.
Use AIDA explicitly:

Attention: Giant refusal headline + visible NO proof cockpit.
Interest: Wallet identity, shock buttons, policy rule, chain/hub chips.
Desire: Receipt persists, proof hash appears, safe sweep comparison.
Action: Run refused trade / Use test wallet / Connect wallet / Open workbench.

Font stack:

CSS
font-family: "Geist", "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
font-family-mono: "Geist Mono", "SFMono-Regular", ui-monospace, Menlo, Monaco, Consolas, "Liberation Mono", monospace;

Use font-weight: 780–860 for H1, 640–760 for labels/buttons, and 500–560 for dense body copy.

3 component architectures:

Proof Accordions
Wallet identity, policy verdict, calldata preview, chain binding. Default open on desktop; collapsed on mobile.

Receipt Rail
Latest receipt hero, persistent history, role lens, copy proof bundle, and empty state. The rail should show proof progress before and after a run.

Verdict Card Stack
Layer 1: agent attempt.
Layer 2: policy rule.
Layer 3: NO/OK verdict.
Layer 4: durable receipt.
Layer 5: chain binding.

2 GSAP paradigms:

Scrubbed proof reveal
On landing page scroll, reveal wallet → shock → refusal → receipt → chain tx as a horizontal proof strip. Reduced-motion fallback: all cards visible, no scroll animation.

Card stacking
The attempted action card, policy card, NO stamp, and receipt card stack into one proof artifact. Use only for state explanation, not decorative page-load choreography.

Bento grid math:

Landing proof bento:
12 columns
Row 1: 7 + 5
Row 2: 4 + 4 + 4
grid-auto-flow: dense

Workbench cockpit:
12 columns
Left shock lane: 3
Center agent/verdict lane: 6
Right receipt lane: 3
Lower proof rail: 12

H1 line-length rule:
Keep the hero claim to 2 lines on desktop, 3 lines max on tablet/mobile. Use the known sizing rule:

CSS
.hero h1 {
  max-width: min(1120px, 100%);
  font-size: clamp(3rem, 5vw, 5.5rem);
  line-height: 0.94;
  letter-spacing: -0.065em;
}

Manual line break after “trade”:

Reject 1 unsafe RWA agent trade
in 60 seconds.

No stamp icons, badges, or hash tags inside the H1. The visual build contract already identifies the selected gpt-taste inputs: cinematic center, Geist-like utility typography, proof accordions, receipt rail, card stack, scrubbed proof reveal, and card stacking.

visual-build-contract

4. Image Asset Plan

hero-proof-cockpit-16x10.png
Target route/slide: /, deck slides 1–2
Ratio: 16:10
Prompt / screenshot framing: Screenshot the redesigned home viewport at 1440×900. Frame the left headline, right proof cockpit, top wallet rail, and bottom evidence cells. The wallet/test-wallet surface must be visible.
Use: Primary hero image, README image, deck cover proof background.

wallet-identity-surface-3x1.png
Target route/slide: /, /app, slide 3 or 8
Ratio: 3:1
Prompt / screenshot framing: Crop only the execution identity rail: mode, wallet address, Arbitrum Sepolia, RefusalHub 0x3540...0Cf8, PolicyRegistry 0xa9df...23B7, tx binding state. Use existing real values only.
Use: Repeated proof strip in UI, video lower-third, deck evidence footer.

no-stamp-receipt-detail-4x3.png
Target route/slide: /app, /app/receipts/:id, slides 5 and 7
Ratio: 4:3
Prompt / screenshot framing: After a real refusal run, crop the center verdict card and latest receipt card together. The frame should show REFUSED, selected shock, wallet mode/address, receipt id, and proof hash label.
Use: Hero moment still, deck “NO is the product” slide, video thumbnail.

policy-circuit-breaker-map-16x9.svg
Target route/slide: /app/policy, slides 4 and 6
Ratio: 16:9
Prompt for GPT image generation / diagram generation: “Swiss international style technical diagram, high contrast black white red, no fake financial charts, showing a bounded RWA policy matrix: allowed distribution sweep on one side, blocked sell principal during MARKET_HALT / STALE_PRICE / MAX_EXPOSURE on the other, central policy hash row, RefusalHub and PolicyRegistry contract chips, forensic ledger grid background.”
Use: Policy page hero diagram, deck system explanation.

chain-binding-system-map-16x9.svg
Target route/slide: /about, slide 8
Ratio: 16:9
Prompt for GPT image generation / diagram generation: “Swiss technical system map for RefusalRail: holder wallet or test wallet → RWA agent attempt → policy engine → RefusalHub → Durable Object receipt ledger → Arbitrum Sepolia transaction binding. Use black, white, refusal red, thin grid lines, mono labels, no fake addresses, no token price charts.”
Use: Architecture proof page and chain-binding deck slide.

auditor-evidence-wall-16x10.png
Target route/slide: /app/receipts, slide 9
Ratio: 16:10
Prompt / screenshot framing: Screenshot auditor view with role switch visible, latest refused receipt enlarged, receipt grid below, and proof fields visible in compact mono labels. Avoid an undifferentiated card wall.
Use: Auditor history slide, product proof section, README “proof persists” image.

5. Swiss Web Deck
Slide	Theme class	Swiss layout id	Headline	Body bullets	Image slot	On-screen proof element
1	hero dark	SWISS-COVER-ASCII	This demo only wins if the trade fails.	Judge chooses a shock. Agent tries the unsafe action. RefusalRail stamps NO and saves proof.	hero-proof-cockpit-16x10.png full bleed with grid overlay	Wallet rail: 0x2eE8...5c66, Arbitrum Sepolia
2	hero light	S01	Reject 1 unsafe RWA agent trade in 60 seconds.	Connect wallet or use test wallet. Pick shock. Open durable receipt.	First viewport product screenshot	RefusalHub 0x3540...0Cf8
3	dark	S07	Delegated RWA agents need hard limits.	Wallet approvals are broad. Backend denials vanish. RWA shocks require reasoned refusal.	No image; type/data hero	Three rule chips: MARKET_HALT, STALE_PRICE, MAX_EXPOSURE
4	light	S11	The judge controls the failure condition.	Choose market halt, stale price, or exposure breach. The product is understandable before any code explanation.	Workbench screenshot with shock lane	Selected shock card: MARKET_HALT
5	dark	S05	The NO is the product.	Unsafe principal sale is refused. Receipt is saved after verdict. Proof becomes inspectable.	no-stamp-receipt-detail-4x3.png	Large red NO stamp + receipt id field
6	light	S14	Same policy, two outcomes.	Principal sale during shock: refused. Distribution sweep: allowed. Same policy hash anchors both.	Split screenshot: refused vs safe sweep	Same-policy hash chip
7	dark	S17	Receipt anatomy.	Wallet address. Reason code. Shock snapshot. Policy hash. Calldata hash. Proof hash.	Receipt detail macro	Proof table with copy buttons
8	light	S18	Chain binding without hiding the wallet.	Prepare calldata. Bind real testnet tx when available. Label pending states honestly.	chain-binding-system-map-16x9.svg	Demo tx 0x0b80...b372
9	dark	S12	Auditor history is the second product loop.	Holder creates receipts. Auditor inspects public evidence. Refusals persist after refresh.	auditor-evidence-wall-16x10.png	Role switch: holder / auditor
10	light	S16	Architecture that survives refresh.	Cloudflare Worker app. Durable Object ledger. Solidity policy contracts.	System diagram: Worker + DO + contracts	Ledger fields: walletAddress, proofHash, txHash
11	dark	S20	Not a dashboard. A safety rail.	No portfolio terminal. No AI chat. No fake success states. The failed action is the artifact.	Evidence bars / anti-pattern strike-throughs	Badges: not chat, not APY, not fake tx
12	hero dark	SWISS-CLOSING-ASCII	The failed transaction was not a bug. It was the product.	Run refusal. Open receipt. Compare safe sweep.	Hero cockpit screenshot + QR slot	Test wallet, RefusalHub, PolicyRegistry, demo tx strip
6. Video Narrative
Timecode	Segment	Screen action	Voiceover direction
0:00–0:12	Hook	Open on redesigned hero. Wallet/test-wallet rail is visible immediately.	“This demo only wins if the trade fails. RefusalRail is a safety rail for RWA agents: let the agent try something unsafe, then prove it was refused.”
0:12–0:30	Problem	Show simple diagram: holder wallet → bounded agent → policy rail.	“A self-custody RWA holder may want automation for narrow standing actions, like a distribution sweep. But during a market halt, stale price, or exposure breach, the agent must not sell principal.”
0:30–0:48	Judge setup	Highlight Connect wallet, Use test wallet, chain, RefusalHub, PolicyRegistry.	“A judge can use a browser wallet or the funded test wallet. The wallet identity is part of the receipt, not a hidden setup step.”
0:48–1:12	Judge plays	Navigate to workbench. Select MARKET_HALT.	“Now the judge picks the shock. I’ll choose market halt. The attempted action is intentionally bad: sell principal after the shock.”
1:12–1:35	Refusal moment	Click “Let the agent try.” Show pending → red NO → receipt appended.	“The agent is allowed to ask. The policy rail decides. Here, the product succeeds by refusing the action.”
1:35–1:58	Durable proof	Open latest receipt. Point to wallet address, reason code, policy hash, calldata hash, proof hash.	“The refusal does not disappear into a backend log. It becomes a receipt: wallet identity, shock snapshot, reason code, policy hash, calldata hash, and proof hash.”
1:58–2:25	Chain binding	Show calldata panel and real tx binding field. Do not read long hashes aloud.	“For the chain path, the receipt can prepare RefusalHub calldata and bind a real Arbitrum Sepolia transaction. Long hashes are visible and copyable; the video does not need to recite them.”
2:25–2:50	Safe contrast	Run safe sweep. Show OK receipt next to NO receipt.	“The same policy is not a blanket block. A narrow distribution sweep can pass, while the unsafe principal sale fails.”
2:50–3:12	Auditor view	Open receipt history. Toggle holder/auditor.	“The second user is the auditor. They can inspect the persisted proof rail: statuses, reasons, owners, wallet fields, and hashes.”
3:12–3:35	Value proof	Show policy page and architecture diagram.	“The value is not another trading terminal. It is a reusable refusal primitive for agentic RWA workflows: bounded action, deterministic policy, durable proof.”
3:35–3:50	Close	Return to hero or receipt detail with NO stamp and wallet rail.	“RefusalRail makes the failed transaction the product: reject one unsafe RWA agent trade in 60 seconds, stamp NO, and keep the proof.”

Target runtime: 3:45–3:50. Avoid narrating Playwright, build tooling, implementation commands, or full-length hashes. The PRD’s desired demo ladder is exactly this: judge sees refusal quickly, then inspects receipt, safe contrast, policy, and contract proof.

project_prd

7. Implementation Priorities

[BLOCKER] Lock public proof constants and no-fake-state rules.
Create one public config object for supplied chain/proof values: Arbitrum Sepolia, test wallet 0x2eE8...5c66, RefusalHub 0x3540...0Cf8, PolicyRegistry 0xa9df...23B7, demo tx 0x0b80...b372. Display shortened values, copy full values only where available. Never generate fake wallet addresses, fake tx hashes, or fake success labels.

[BLOCKER] Rebuild the app shell around the persistent Execution Identity Rail.
Topbar and first viewport must show wallet mode, wallet address, chain, hub, registry, and tx binding. Keep RainbowKit/Wagmi as the wallet island, with the funded test-wallet path visible beside it.

[BLOCKER] Rebuild / as the AIDA proof cockpit.
Implement the 12-column hero, operable CTA path, wallet surface, live refusal preview, proof bento, and final workbench CTA in Worker-rendered HTML with inline CSS/JS.

[BLOCKER] Rebuild /app as the 3-lane refusal workbench.
Left shock lane, center agent/verdict lane, right receipt rail, lower proof rail. Ensure the judge can complete the core path in 30–60 seconds: choose shock → run refusal → open receipt.

[BLOCKER] Make the NO stamp land only after receipt persistence.
State flow should be: selectedShock → loading → Durable Object receipt saved → NO stamp → latest receipt appended. No receipt save, no success visual.

[BLOCKER] Harden the Durable Object ledger and API proof fields.
Store and return id, status, reasonCode, shockSnapshot, policyHash, calldataHash, proofHash, ownerId, sessionId, roleId, walletAddress, contractRefs, txHash, and createdAt, matching the interaction plan.

uiux_interaction_plan

[BLOCKER] Rebuild /app/receipts/:id as the forensic receipt detail.
Add status header, wallet surface, plain-language summary, proof table, copy buttons, policy link, calldata preview, chain binding panel, and honest pending/error states.

[BLOCKER] Rebuild /app/policy and /app/receipts into evidence pages.
Policy becomes circuit-breaker matrix plus contract cards. Receipts becomes auditor evidence wall with latest receipt hero, role switch, filters, and dense proof fields.

[POLISH] Produce the screenshot/image asset pack.
Capture the six assets above after the new UI is working. Use screenshots for product proof and generated/diagram assets only for system maps or textures.

[BLOCKER] Build the Swiss HTML deck and record the 3:45 demo.
Use the 12-slide outline, product screenshots, visible wallet identity, and the video narrative. Final QA: fresh-session refusal under 60 seconds, mobile 390px path, reduced-motion fallback, accessible focus states, no hidden wallet surface, no fake tx state.