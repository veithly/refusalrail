# Visual Build Contract: RefusalRail

## Source inputs

- PRD: `pitch/project_prd.md` sections 9-11.
- UIUX plan: `pitch/uiux_interaction_plan.md`.
- Hero spine: `pitch/hero.md`.
- GPT Pro design response: `pitch/gpt-pro/responses/design/02-redesign-deck-assets-response.md`.
- Mockup trace: `docs/ui-mockups/01-hero-frame.png` -> `/` proof cockpit, `docs/ui-mockups/02-app-frame.png` -> `/app` flight recorder, `docs/ui-mockups/03-mobile-first-run.png` -> mobile first-run stepper, and `pitch/_qa/redesign-gptpro-input/*.png` -> final redesign QA captures.
- gpt-taste pass: installed skill loaded from `/Users/rick/.codex/skills/gpt-taste/SKILL.md`.
- impeccable pass: installed skill loaded from `/Users/rick/.skills-manager/skills/impeccable/SKILL.md`; product register loaded.
- guizang-ppt-skill pass: installed skill loaded from `/Users/rick/.skills-manager/skills/guizang-ppt-skill/SKILL.md`; Swiss / IKB deck selected.

```txt
<design_plan>
Python RNG Execution:
seed = len(user_redesign_prompt) % 997 = 318
hero_layout = Cinematic Center + Operable Proof Cockpit
font = Geist; components = Proof Accordions + Receipt Rail + Verdict Card Stack
gsap = Scrubbed Proof Reveal + Card Stacking

AIDA Check:
Navigation: sticky brand, route links, RainbowKit wallet, and Execution Identity Rail.
Attention: two-line refusal headline plus operable proof cockpit.
Interest: wallet identity, shock buttons, policy rule, contract chips, and latest receipt.
Desire: receipt persistence, safe-sweep contrast, auditor evidence wall, and chain binding.
Action: Connect wallet, Use test wallet, Run refused trade, Open receipt.

Hero Math Verification:
H1 uses max-width min(1120px, 100%) and explicit line break after "trade".
Desktop font is fixed by breakpoint rather than viewport-scaled; line count stays at 2 desktop and <=3 tablet/mobile.
No stamp icons, badges, hash tags, or spam tags are attached to the H1.

Bento Density Verification:
Landing proof bento is 12 columns with row 1 = 7 + 5 and row 2 = 4 + 4 + 4.
Workbench cockpit is 12 columns with 3 + 6 + 3 plus a 12-column proof rail.
grid-auto-flow: dense is applied and there are no dead grid cells.

Label Sweep & Button Check:
No cheap labels such as QUESTION 05, SECTION 01, or repeated numbered eyebrows.
Danger buttons use refusal red with white text; ghost buttons use dark ink with white text; focus rings are visible.
</design_plan>
```

## Visual lane

- Lane: operational-dashboard.
- Visible signature: Forensic Flight Recorder / Swiss Evidence Workbench.
- Why this fits: the product is a safety instrument for agentic RWA actions. It should feel like a financial black box after an unsafe attempt, not a trading terminal or AI copilot.
- Design anchor: black/white/red evidence board, ledger rails, receipt-paper cells, mono hash tape, NO stamp, and contract proof chips.
- Four positioning answers:
  - Narrative role: proof tool first, pitch surface second.
  - Viewing distance: laptop judge review, mobile QR path, README screenshot, demo video crop.
  - Visual temperature: authoritative, forensic, low-glare, direct.
  - Capacity check: first viewport shows wallet/test wallet, shock, attempted action, verdict, and latest receipt without relying on narration.
- Non-Tailwind visual signature: persistent Execution Identity Rail, refusal stamp tied to receipt persistence, receipt rail, policy circuit breaker map, evidence wall, and chain-binding system map.
- Forbidden defaults: generic DeFi dashboard, APY cards, purple AI gradient, chat assistant, fake portfolio terminal, decorative glass panels, fake tx success.

## Component-system lock

- Primary wallet library: RainbowKit + Wagmi.
- Primary UI system: custom Worker-rendered HTML/CSS product primitives.
- Supporting system: Swiss evidence diagrams and screenshot-derived image assets.
- Components used on screen: ExecutionIdentityRail, ProofCockpit, ShockLane, VerdictCardStack, ReceiptRail, PolicyCircuitBreaker, EvidenceWall, ChainProofPanel.
- Official docs checked: local package APIs for RainbowKit/Wagmi, Cloudflare Worker/Wrangler docs already captured in stack plan, guizang Swiss template/layout docs.
- Tailwind role: none. The Worker app uses custom tokens and CSS.
- Rejection note: this is not a Tailwind-only or shadcn-only surface. The signature is the proof instrument itself.

## Public proof constants

These values may be displayed and shortened in public UI. Do not invent replacements.

- Test wallet: `0x2eE81C112CA5A5Fd7123644f4c18262a05175c66`
- Chain: Arbitrum Sepolia, chain id `421614`
- RefusalHub: `0x3540038833ae8750EfF20e7EfCaE16F206e90Cf8`
- PolicyRegistry: `0xa9df142D14218CC99f3068CBADC1D1965f7623B7`
- RefusalReceipt: `0xf6aC320e7C4E865A72c588c89BE23Ff12ca543C3`
- DemoRWAAsset: `0x320392A010982f8F8F81e9E8aE8aaD083Be69810`
- Demo tx: `0x0b809bc31f75b6ff5947ccb5875dc5df975e1fe379b3a533f8e84454e42bf372`

## Route and component map

| Route | Hero/user-case beat | Components | Source marker |
|---|---|---|---|
| `/` | Judge understands and starts the failure game in 5-30 seconds | `ProofHero`, `ExecutionIdentityRail`, `ProofCockpit`, `ProofBento` | `data-visual-lane="operational-dashboard" data-hero-composition="forensic-proof-cockpit"` |
| `/app` | Pick shock, run refusal, open receipt | `ShockLane`, `VerdictCardStack`, `ReceiptRail`, `ProofRail` | `data-hero-composition="policy-flight-recorder"` |
| `/app/policy` | Show why SELL_PRINCIPAL + shock becomes ActionRefused | `PolicyCircuitBreaker`, `ContractCards`, `CalldataPreview` | `data-visual-lane="operational-dashboard"` |
| `/app/receipts` | Auditor/history loop | `EvidenceWall`, `RoleSwitch`, `ReceiptGrid`, `ProofFilters` | `data-visual-lane="operational-dashboard"` |
| `/app/receipts/[id]` | Durable forensic artifact | `ReceiptHero`, `ProofTimeline`, `ProofTable`, `ChainProofPanel` | `data-visual-lane="operational-dashboard"` |
| `/app/build` | System proof and deployment status | `SystemMap`, `ArchitectureGrid`, `ContractTable` | `data-visual-lane="operational-dashboard"` |

## Image asset plan

Generated image assets are accepted as product/deck texture plates, not fake product state. Raw accepted files live in `public/art/raw/`; app-ready files live in `public/art/refusalrail/`; deck-scannable copies live in `pitch/images/`. Generated cutout asset command: `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/cutout_assets.mjs public/art/raw --out public/art/cutouts --brief-dir public/art/briefs --usage "RefusalRail app hero and proof cockpit" --auto-key --trim --report public/art/cutouts/cutout-manifest.json`. Cutout manifest path: `public/art/cutouts/cutout-manifest.json`. The current UI uses rectangular evidence textures directly because they are background/proof plates; no raw generation is used as a fake screenshot, wallet, tx, or receipt.

| File | Source | Ratio | Usage |
|---|---|---:|---|
| `pitch/deck/images/hero-latest-16x10.png` | Latest browser-wallet `/` screenshot captured at 1920x1200 | 16:10 | README, deck slides 1-2, video opener |
| `pitch/deck/images/workbench-initial-16x10.png` | `/app` before the refusal run | 16:10 | Demo setup and contrast |
| `pitch/deck/images/workbench-refused-16x10.png` | `/app` after `MARKET_HALT` refusal | 16:10 | Deck slides 3, 5, 8 and video proof cards |
| `pitch/deck/images/receipt-detail-refused-16x10.png` | Receipt detail after refused run | 16:10 | Receipt anatomy and claim proof |
| `pitch/deck/images/chain-prepared-16x10.png` | Receipt detail after preparing RefusalHub calldata | 16:10 | Chain path explanation |
| `pitch/deck/images/chain-submitted-16x10.png` | Receipt detail after explorer tx binding | 16:10 | Deck slides 7, 12 and HackQuest proof |
| `pitch/deck/images/safe-sweep-16x10.png` | `/app` after safe sweep | 16:10 | OK/NO contrast |
| `pitch/deck/images/policy-page-16x10.png` | `/app/policy` current policy surface | 16:10 | Mechanism and safe contrast |
| `pitch/deck/images/auditor-evidence-wall-16x10.png` | `/app/receipts?role=auditor` | 16:10 | Second user/history surface |
| `pitch/deck/images/build-page-16x10.png` | `/app/build` current live-app/ledger/contracts proof page | 16:10 | Runtime proof slide |
| `pitch/deck/images/mobile-first-run.png` | Mobile `/app` full-page capture at 393x852 | mobile | Mobile first-run QA |
| `pitch/deck/images/wallet-identity-surface-3x1.png` | Crop Execution Identity Rail | 3:1 | Deck evidence footer and video lower-third |
| `pitch/deck/images/no-stamp-receipt-detail-4x3.png` | Screenshot after refusal run | 4:3 | Deck slides 5 and 7 |
| `pitch/deck/images/policy-circuit-breaker-map-16x9.svg` | Programmatic Swiss diagram from GPT Pro brief | 16:9 | Policy page and deck slide 6 |
| `pitch/deck/images/chain-binding-system-map-16x9.svg` | Programmatic Swiss diagram from GPT Pro brief | 16:9 | Build page and deck slide 8 |

## Desktop and mobile compositions

- Desktop 1440-1600 wide: 12-column product cockpit. Left 3 columns shock/input, center 6 columns verdict stack, right 3 columns receipt rail, lower proof rail across all columns.
- Desktop first viewport: sticky topbar, visible wallet identity, two-line H1, proof cockpit, and evidence cells above the fold.
- Mobile 390x844: stepper shape: Wallet, Shock, Attempt, Receipt. Wallet/test-wallet stays visible near the top. Hashes collapse into readable proof cells and detail pages.
- Touch path: use test wallet, choose shock, run refusal, open receipt in two taps from `/app`.
- Desktop parity: desktop exposes policy, proof, and chain state together; mobile preserves the hero path before density.

## Layout and motion math

- Hero math: explicit line break after "trade"; H1 width uses max width min(1120px, 100%); fixed rem sizes by breakpoint; line-limit target is 2 lines on desktop and <=3 on tablet/mobile; letter spacing is 0.
- Landing bento math: 12 columns, `7 + 5` then `4 + 4 + 4`, `grid-auto-flow: dense`.
- Workbench math: 12 columns, `3 + 6 + 3`, proof rail spans all 12.
- AIDA coverage for `/`: navigation/wallet, attention hero, interest proof cockpit, desire proof bento/card stack, action CTA.
- CTA contrast check: refusal/action CTAs use red or dark ink against white text with visible focus rings; secondary links use high-contrast ink on pale panels and never rely on color alone.
- Cheap-label sweep: no `SECTION 01`, `QUESTION 05`, repeated eyebrow numbers, AI copilot badges, or fake finance status chips appear on the product or deck screenshots.
- Motion: no page-load theater. GSAP scrubs the proof strip and stacks verdict cards only when motion is allowed. State motion is used for saved receipts and stamps.
- Reduced motion: all proof content visible by default and animations reduced to 1ms.
- Success visual rule: the NO stamp appears only after `/api/runs/refuse` returns a saved receipt.

## V0 anchor and critique

- V0 anchor artefact: GPT Pro response plus existing screenshots in `pitch/_qa/redesign-gptpro-input/`.
- Five-dimension target: philosophy 9/10, hierarchy 9/10, craft 8/10, functionality 9/10, originality 8/10.
- Previous score: 7.6/10. Reason: visible product loop existed, but the receipt and wallet proof were visually subordinate.
- Fixes required before final recording: Execution Identity Rail, stronger first viewport, receipt-as-artifact, policy circuit breaker, evidence wall, Swiss deck.

## Implementation checks

- Top shell has `data-visual-lane="operational-dashboard"`.
- First viewport has `data-hero-composition="forensic-proof-cockpit"`.
- Wallet/test-wallet controls are visible in topbar and first viewport.
- No reviewer-visible fake tx, fake wallet, fake receipt, fake success, or "mock" label.
- Public proof constants are centralized in code and docs.
- Deck uses Swiss IKB theme and registered `S01-S22` / explicit cover/closing layouts.
- `node /Users/rick/.skills-manager/skills/guizang-ppt-skill/scripts/validate-swiss-deck.mjs pitch/deck/index.html` must pass.
- `npm run build`, `npm test`, and `PORT=4393 npm run test:e2e` must pass before redeploying.
