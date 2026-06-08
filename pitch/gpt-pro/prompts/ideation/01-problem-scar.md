# GPT Pro Ideation Window 01 - Problem Scar

你是 HackathonHunter 的外部深度推理顾问。请为以下黑客松生成 exactly 3 个高质量项目 idea。你的视角只从 workflow scar / real user pain / trapped artifact 出发，不要从技术栈或赛道名出发。

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

## Recent winner evidence to use structurally

- AgentMandate: agent can propose trades, but Solidity mandate contract enforces token allowlist, per-swap max, daily limits. Pattern: contract is the authority, not the LLM. Clone trap: "AgentMandate but on Robinhood Chain."
- Omeswap: specialized agents + deterministic risk gate + decision receipts. Pattern: inspectable agent decisions. Clone trap: broad trading terminal.
- Chainlink Convergence 2026 winners: DeFAI systems with risk gates, circuit breakers, verifiable onchain writes, attestations. Pattern: the veto can be more memorable than a successful action.
- Solana Breakout 2025 winners: startup-shaped protocol products across AI, DeFi, payments, privacy, storage, infra. Pattern: concrete product job plus visible protocol primitive.
- DoraHacks-style AI+Web3 winners: specific DeFi payments, identity/reputation, audits, risk/yield products. Pattern: one concrete financial action with proof beats a broad hub.

## Constraints and forbidden shapes

Forbidden:
- AI trading chatbot.
- Portfolio dashboard with AI insights.
- Static APY cards.
- Generic yield optimizer.
- RWA token launchpad.
- Dune dashboard as the product.
- Stylus demo that only proves Rust compilation.
- Any idea where Web3 can be removed without changing the demo consequence.

Prefer:
- Agent proposes; deterministic contract/policy/risk layer decides.
- Robinhood Chain / RWA finance is structurally necessary.
- Real or simulated testnet financial assets with clear labels.
- A 60-second demo that produces a tx hash, event, receipt, attestation, explorer link, or Dune-verifiable state.
- One memorable interaction where the judge changes the outcome.

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

Be severe. If an idea sounds like "AI helps X trade Y", mutate it before returning it.

Start directly with `Idea 1`. Do not write any preamble or acknowledgement sentence.
