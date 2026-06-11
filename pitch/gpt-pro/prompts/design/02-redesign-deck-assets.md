You are acting as a senior product design director, demo-day pitch editor, and Web3 hackathon judge.

Project: RefusalRail
Live product primitive: an agentic RWA safety rail. A judge can connect a browser wallet or use the funded Arbitrum Sepolia test wallet, choose a market shock, let an agent attempt an unsafe principal sale, receive a durable NO receipt, inspect walletAddress/proof hashes, prepare RefusalHub calldata, bind a real testnet tx, compare an OK safe sweep, and inspect auditor history.

Current public spine:
- Hero: "Reject 1 unsafe RWA agent trade in 60 seconds."
- Rumor: "Reject 1 unsafe RWA trade, stamp NO."
- Real test wallet shown in product: 0x2eE8...5c66
- Chain: Arbitrum Sepolia
- RefusalHub: 0x3540...0Cf8
- PolicyRegistry: 0xa9df...23B7
- Real demo tx: 0x0b80...b372

The current frontend and pitch video/deck feel too generic and not prize-level. The user specifically wants:
1. A stronger frontend redesign following a gpt-taste-like premium AIDA structure, with a visible real wallet connection/test wallet surface.
2. More image assets and richer proof visuals, not a plain dark dashboard.
3. A rebuilt web deck using a Swiss international style: high-contrast grids, data hero pages, evidence walls, system diagrams, and product screenshots.
4. A demo video script that sells "how judges play" and the product value, without narrating tooling, Playwright, or long hashes.

Constraints:
- Do not propose fake wallet addresses, fake tx hashes, or mock success states.
- Do not hide the wallet surface. The topbar and first viewport must make wallet identity obvious.
- Keep the app deployable as a Cloudflare Worker-rendered HTML app with inline CSS/JS, RainbowKit/Wagmi wallet island, and Durable Object ledger.
- Avoid generic DeFi dashboards, purple AI copilot gradients, or chat UI. The product should feel like a forensic policy flight recorder for RWA agents.
- The first viewport must still be operable: a judge should know where to click in 30 seconds.
- Avoid writing any private key or secret.

Attached screenshots show the current product and current video/deck. Please critique them and return a concrete build spec.

Return exactly these sections:

## 1. Judge-First Diagnosis
List the top 7 reasons the current frontend/deck feels weak, each with a concrete fix.

## 2. Frontend Redesign Direction
Give a precise art direction for the app. Include:
- visual lane name
- hero composition
- typography recommendation
- color system
- image/texture system
- first viewport structure
- wallet surface treatment
- workbench structure
- receipt detail structure
- mobile behavior

## 3. gpt-taste Design Plan Inputs
Provide the exact choices the implementer should use for:
- hero architecture
- font stack
- 3 component architectures
- 2 GSAP paradigms
- bento grid math
- H1 line-length rule

## 4. Image Asset Plan
List 6 image assets to create or derive. For each include:
- filename
- target route/slide
- ratio
- prompt for GPT image generation or screenshot framing
- how it should be used in the UI/deck

## 5. Swiss Web Deck
Build a 12-slide deck outline for a guizang-ppt-skill Swiss Style single HTML deck. For each slide include:
- slide number
- theme class: hero dark, hero light, dark, or light
- Swiss layout id from S01-S22 or SWISS-COVER-ASCII/SWISS-CLOSING-ASCII
- headline
- 1-3 body bullets
- image slot if any
- on-screen proof element

## 6. Video Narrative
Write a 3:20 to 4:00 combined pitch+demo structure with timecodes. It must emphasize product value and how to use the product, not implementation tooling.

## 7. Implementation Priorities
Give a strict ordered list of 10 implementation tasks. Mark which are blocker vs polish.
