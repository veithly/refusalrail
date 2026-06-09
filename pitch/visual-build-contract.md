# Visual Build Contract: RefusalRail

## Source inputs

- PRD: `pitch/project_prd.md` § 9-11.
- Mockups: `docs/ui-mockups/01-hero-frame.png`, `docs/ui-mockups/02-app-frame.png`, `docs/ui-mockups/03-mobile-first-run.png`.
- Mockup trace: every PNG maps to PRD § 9, PRD § 10, a HERO PATH beat, and operational-dashboard lane in `docs/ui-mockups/mockup-manifest.md`.
- gpt-taste pass: loaded from `/Users/rick/.codex/skills/gpt-taste/SKILL.md`. Deterministic design-plan pressure: cinematic center attention, Geist-like utility typography, proof accordions, receipt rail, card stack, scrubbed proof reveals. Applied selectively because this is product UI, not a campaign page.
- impeccable pass: loaded from `/Users/rick/.skills-manager/skills/impeccable/SKILL.md`; product register; scene sentence is "a low-glare financial flight recorder used by a judge under time pressure"; color strategy is restrained with refusal red as the only high-saturation action color.

```txt
<design_plan>
Python RNG Execution:
seed = len("wallet proof workbench") % 997 = 22
hero_layout = Cinematic Center; font = Geist; components = proof accordions + receipt rail + card stack; gsap = scrubbed proof reveal + card stacking
AIDA Check:
Navigation, Attention hero, Interest policy/proof bento, Desire recorded proof motion, and Action submit/demo CTAs are present.
Hero Math Verification:
H1 remains in a wide cockpit surface, with no stamp icons or spam tags attached to the headline.
Bento Density Verification:
The app uses a dense four-region cockpit layout; no empty repeated-card wall is used.
Label Sweep & Button Check:
No cheap section markers; connect-wallet and test-wallet buttons have high-contrast text.
</design_plan>
```

## Visual lane

- Lane: operational-dashboard
- Why this lane fits: the product is a policy workbench and proof ledger, not a brand campaign.
- Design anchor / recipe: financial flight recorder HUD; low-glare control room; receipt evidence first.
- Four positioning answers:
  - Narrative role: tool and proof surface.
  - Viewing distance: laptop and README screenshot, with mobile QR backup.
  - Visual temperature: authoritative, forensic, restrained.
  - Capacity check: desktop keeps four regions visible; mobile collapses to shock selector, run button, latest receipt.
- Non-Tailwind visual signature: policy flight-recorder HUD with red NO stamp, ledger rails, and evidence cells.
- Visual signature: policy flight-recorder HUD with red NO stamp, ledger rails, and evidence cells.
- Hero composition: cockpit workbench with action card, shock switches, and receipt rail.
- Visual differentiation note: centers refusal evidence instead of price charts, APY cards, chat bubbles, or wallet dashboards.
- Forbidden lookalikes: Robinhood brokerage clone, generic DeFi dashboard, purple AI copilot, static compliance PDF.
- Forbidden defaults: default starter page, generic Tailwind SaaS cards, unmodified shadcn dashboard, unrelated premium gradients.

## Generated cutout assets

- Raw prompts: not used.
- Raw generations: not used.
- Cutout command: `node hackathonhunter/scripts/cutout_assets.mjs public/art/raw --out public/art/cutouts --brief-dir public/art/briefs --usage "not used for RefusalRail app shell" --auto-key --trim`.
- Cutout manifest: `public/art/cutouts/cutout-manifest.json`.
- UI usage map: no cutout assets in reviewer-visible app; all visuals are rendered HTML/CSS state.
- Cutout plan reason: generated art would weaken credibility for a proof workbench.

## Libraries

- Primary UI library: shadcn-inspired primitives.
- Supporting UI library: custom Cloudflare Worker HTML/CSS components.
- Official docs checked: Cloudflare Workers, Wrangler, Durable Objects, HackathonHunter visual references.
- Install commands: `npm install -D wrangler typescript @cloudflare/workers-types @playwright/test vitest solc`.

## Component-system lock

- Primary UI library: RainbowKit + Wagmi for wallet identity and transaction actions; shadcn-inspired primitives for product controls.
- Supporting UI library: custom Cloudflare Worker HTML/CSS components for the policy workbench, receipt rail, proof table, density controls, and command palette.
- Why this library fits the lane: RainbowKit gives the wallet connection a familiar Web3 affordance, while the rest of the app stays in the restrained operational-dashboard lane instead of becoming a generic wallet landing page.
- Components used on screen: `ConnectButton`, `WagmiProvider`, `RainbowKitProvider`, `ShockCard`, `ReceiptCard`, `PolicyTable`, `ChainProofPanel`.
- Official docs checked: RainbowKit/Wagmi installed package APIs, Cloudflare Workers/Wrangler local docs, Durable Object binding docs, HackathonHunter G3/G4 references.
- Install commands: `npm install react react-dom @rainbow-me/rainbowkit wagmi viem @tanstack/react-query` and `npm install -D esbuild @types/react @types/react-dom`.
- Tailwind role: no Tailwind dependency in the Worker app; custom CSS tokens and media queries are the visual substrate.
- Tailwind/shadcn rejection note: this is not Tailwind-only or shadcn-only. The visible signature is the refusal stamp, ledger rail, policy table, chain proof panel, RainbowKit wallet dock, and low-glare flight-recorder layout.

## Route and component map

| Route | Mockup source | Hero/user-case beat | Components | Source marker |
|---|---|---|---|---|
| `/` | `docs/ui-mockups/01-hero-frame.png` | 5-second hero and CTA | `Wordmark`, `HeroActionCard`, `ReceiptRailPreview` | `data-visual-lane="operational-dashboard" data-hero-composition="cockpit-workbench"` |
| `/app` | `docs/ui-mockups/02-app-frame.png` | shock selection and refusal receipt | `ShockCard`, `ActionCard`, `NoStamp`, `ReceiptRail` | `data-visual-lane="operational-dashboard" data-hero-composition="policy-flight-recorder"` |
| `/app/policy` | `docs/ui-mockups/02-app-frame.png` | policy review and safe action contrast | `PolicyMatrix`, `RuleToggle`, `CalldataPreview` | `data-visual-lane="operational-dashboard"` |
| `/app/receipts` | `docs/ui-mockups/02-app-frame.png` | persisted receipt history and role switch | `ReceiptTimeline`, `RoleSwitch`, `ProofCell` | `data-visual-lane="operational-dashboard"` |
| `/app/receipts/[id]` | `docs/ui-mockups/02-app-frame.png` | durable proof artifact | `ReceiptDetail`, `ProofTable`, `JsonExport` | `data-visual-lane="operational-dashboard"` |
| mobile QR | `docs/ui-mockups/03-mobile-first-run.png` | two taps to refusal | `MobileShockPicker`, `MobileRunButton`, `LatestReceipt` | `data-visual-lane="operational-dashboard"` |

## Desktop and mobile compositions

- Desktop 1920x1200: left shock cards, center action card, right receipt drawer, lower proof rail; all critical proof state visible without scrolling.
- Mobile 390x844: header, shock selector, primary run button, latest receipt; hashes are shortened with detail page for full proof.
- QR mobile access plan: QR opens `/app` directly on the live Worker URL.
- Mobile primary flow: select shock, tap "Let the agent try", open the latest receipt in two taps.
- Touch-first action path: shock cards have large hit targets and no hover-only affordances.
- Desktop parity plan: desktop keeps policy matrix, action state, receipt history, and proof hash visible together.

## Layout and motion math

- H1 width and line-limit check: `/` uses `max-width: min(1120px, 100%)` on `.hero-chapter h1` with `font-size: clamp(3rem, 5vw, 5.5rem)`, keeping the hero claim to 2-3 lines without overflow.
- Bento grid math, if used: `.proof-bento` is a 12-column dense grid; first row is 7 + 5, second row is 4 + 4 + 4, with `grid-auto-flow: dense` and no empty grid corner.
- AIDA coverage for `/`: navigation and wallet dock, Attention hero with refusal preview, Interest proof bento, Desire scroll-revealed evidence/marquee proof loop, Action final workbench CTA.
- GSAP / motion implementation: image scale/fade on the hero chapter and scrubbed bento reveals; state motion is used for stamps and proof cards rather than decorative page-load choreography.
- Reduced-motion fallback: `@media (prefers-reduced-motion: reduce)` forces 1ms animation/transition duration and disables smooth scrolling.
- CTA contrast check: danger CTA uses refusal red with white text; ghost CTA uses white surface with near-black text; focus ring uses green `--focus` with visible 3px outline.
- Cheap-label sweep: no `SECTION 01`, `QUESTION 05`, or repeated numbered eyebrows; remaining compact labels such as "Judge input" and "Flight recorder" are task labels inside the product UI.

## V0 anchor and critique

- V0 anchor artefact: `docs/ui-mockups/02-app-frame.png`.
- Five-dimension critique: philosophy 8/10, hierarchy 8/10, craft 7/10, functionality 8/10, originality 7/10.
- Overall score: 7.6/10.
- Fixes applied before full build: reduce empty vertical space, make receipt detail denser, add actual proof hash and role state, replace static mockup labels with real stored receipt data.

## Implementation checks

- Top product shell has `data-visual-lane="operational-dashboard"`.
- Top hero/app surface has `data-hero-composition="cockpit-workbench"` or `data-hero-composition="policy-flight-recorder"`.
- Default starter copy/assets are not present.
- Brand pack appears in nav, favicon-like SVG, OG PNG, README, and demo lower-third.
- Mockup-to-build mapping is recorded in this file and `docs/ui-mockups/mockup-manifest.md`.
- `node /Users/rick/Documents/MySkill/hackathonhunter-skill/scripts/audit_project.mjs /Users/rick/Documents/Project/Hackathon/RefusalRail --phase ui-libs` must pass before final feature-density claim.
