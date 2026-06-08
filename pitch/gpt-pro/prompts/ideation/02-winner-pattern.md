# GPT Pro Ideation Window 02 - Winner Pattern Translation

你是 HackathonHunter 的外部深度推理顾问。请为以下黑客松生成 exactly 3 个高质量项目 idea。你的视角是 recent winner pattern translation：从近期获奖项目的结构中抽象机制，但不要复制表面形态。

## Hackathon context

- Hackathon: Arbitrum Open House London: Online Buildathon.
- Required deployment: an Arbitrum chain. Supported submission networks include Arbitrum One, Arbitrum Nova, Robinhood Chain testnet, and Arbitrum Sepolia.
- Prize strategy:
  - Overall prize: 70,000 USDC.
  - Best Agentic Project: 15,000 USDC.
  - Grants: up to 30,000 USDC.
  - HackQuest page notes that at least one top-three project is reserved for Robinhood Chain and at least one for an Arbitrum project.
- Judging: smart contract quality, product-market fit, innovation/creativity, solving a real problem.
- Submission fields require a frontend/demo URL, core protocol/smart contract addresses, optional factory/pool/token addresses, which sponsor technologies were used, and what code was built during the buildathon.
- Sponsor primitives: Robinhood Chain, Dune Analytics, ZeroDev, Fhenix, Alchemy, AWS, OpenZeppelin, GMX.
- Robinhood Chain official positioning: permissionless Ethereum-compatible L2 for onchain financial infrastructure; optimized for tokenized real-world assets including equities, ETFs, private assets, and other financial instruments; supports programmatic trading, self-custody, 24/7 access; built with Arbitrum Chain technology.

## Winner patterns to translate

Use these as structural patterns only:

- AgentMandate: "agent with bounded authority" won attention because unsafe intent reverts at contract level.
- Omeswap: "multi-agent decision + risk veto + receipt" won attention because reasoning became inspectable and durable.
- Chainlink Convergence 2026 winners: "DeFAI orchestration + policy gate + verifiable write" is current taste.
- Solana Breakout 2025: "startup-shaped protocol product" matters more than a technical demo.
- DoraHacks AI+Web3: "one concrete action with proof" beats a wide dashboard.

Your job: produce ideas that a judge who has seen those winners would still call fresh. Avoid "same idea, new chain."

## Required novelty directions

At least one idea should use Robinhood Chain's RWA/retail finance context as more than a deployment target.
At least one idea should make the memorable demo moment a refusal, reversal, or forced rewrite.
At least one idea should expose smart contract quality in the product, not only in the repo.

## Forbidden shapes

- AI trading chatbot.
- Portfolio dashboard with AI insights.
- Static APY cards.
- Generic yield optimizer.
- RWA token launchpad.
- Dune dashboard as the product.
- Stylus demo that only proves Rust compilation.
- Any idea where Web3 can be removed without changing the demo consequence.

## Output requirements

Return exactly 3 ideas. For each idea, use this structure:

1. Name:
2. 5-12 word rumor:
3. Workflow scar:
4. Target user:
5. Winner-pattern basis:
6. Novelty delta versus recent winners:
7. Judge-surprise reason:
8. Clone trap avoided:
9. New primitive:
10. First click:
11. Demo interaction model:
12. Showcase plan:
    - 0-10s hook:
    - 10-30s interaction:
    - 30-60s visible consequence:
    - Judge participation:
    - Visual staging:
    - Fallback if live chain/API/input fails:
13. Proof artifact:
14. Sponsor/domain necessity:
15. One miracle:
16. Boring reliable parts:
17. Cut list:
18. Expected risks:
19. Anti-wrapper score out of 10:

Do not optimize for "reasonable." Optimize for a prize-worthy spike that is still buildable in a short buildathon.

Start directly with `Idea 1`. Do not write any preamble or acknowledgement sentence.
