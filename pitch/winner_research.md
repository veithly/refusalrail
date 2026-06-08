# Winner Research

## Search Log

| Query / URL | Why inspected | Result | Used? |
|---|---|---|---|
| https://www.hackquest.io/en/hackathons/Arbitrum-Open-House-London-Online-Buildathon | Current hackathon rules, prizes, rubric, deadlines, resources | Requires deployment on an Arbitrum chain; Overall 70k USDC, Agentic 15k USDC, grants 30k USDC; rubric emphasizes smart contract quality, PMF, innovation, real problem solving; Robinhood Chain and Arbitrum reserved-prize notes. | Yes |
| https://docs.robinhood.com/chain/ | Sponsor/domain primitive | Robinhood Chain is an Ethereum-compatible L2 for onchain financial infrastructure, tokenized RWAs, equities, ETFs, private assets, programmatic trading, self-custody, 24/7 access, built with Arbitrum Chain tech. | Yes |
| https://ethglobal.com/showcase/agentmandate-u1g6j | Recent agentic trading pattern | Strong pattern: agent can trade only inside onchain mandate bounds; violations revert at Solidity level. | Yes |
| https://ethglobal.com/showcase/omeswap-1ge2q | Recent agentic trading / demo surface pattern | Strong pattern: multiple agents vote, a deterministic risk gate can veto, and every major decision becomes a durable receipt. | Yes |
| https://blog.chain.link/convergence-hackathon-winners/ | Very recent DeFAI / risk / compliance winners | 2026 winners reward orchestration + risk gates + verifiable onchain writes, not isolated smart contracts or text-only agents. | Yes |
| https://blog.colosseum.com/announcing-the-winners-of-the-solana-breakout-hackathon/ | Recent Web3 winner calibration outside EVM | Startup-shaped winners in AI, DeFi, stablecoins, infra; AI track included payment middleware, non-custodial trading terminal, agent deploy apps. | Yes |
| https://staging.tophacker.com/hackathon/ai-buidl-lab-rootstock/winner | DoraHacks-style AI + Web3 winner scan | DoraHacks-style winners show concrete DeFi payments, identity/reputation, audits, and risk/yield products with reproducible project cards. | Yes |

## Current Hackathon Brief

- Hackathon: Arbitrum Open House London: Online Buildathon.
- Schedule: registration closes Jun 12, 2026 22:59; submission closes Jun 14, 2026 22:59; rewards announced Jun 17, 2026 22:59.
- Prize pool: 115,000 USDC total shown by HackQuest: 70,000 USDC Overall, 15,000 USDC Best Agentic Project, 30,000 USDC milestone grants.
- Overall prizes: 40,000 / 20,000 / 10,000 USDC.
- Agentic prizes: 7,000 / 5,000 / 3,000 USDC.
- Hard qualification: project must deploy on an Arbitrum chain, examples include Arbitrum Sepolia, Arbitrum One, Robinhood Chain.
- Judging criteria: smart contract quality, product-market fit, innovation/creativity, real problem solving.
- Strategic note: at least one of the top three prizes is reserved for a Robinhood Chain project; at least one is reserved for an Arbitrum project.
- Suggested tech: Solidity, Rust, Stylus, Arbitrum resources, Robinhood Chain resources, ZeroDev, OpenZeppelin, Dune, Alchemy, Fhenix, GMX, AWS.

## Comparable Events

| Event | Platform | Why comparable | Winners/gallery URL | Portable lesson |
|---|---|---|---|---|
| ETHGlobal Open Agents | ETHGlobal | Agentic Web3, trading agents, wallet control | https://ethglobal.com/showcase/agentmandate-u1g6j | "Bound the agent, not the keys" is a strong mechanism, but it is now a clone trap unless advanced with richer financial policy, receipts, or RWA-specific rules. |
| ETHGlobal Open Agents | ETHGlobal | Agentic trading UX and receipts | https://ethglobal.com/showcase/omeswap-1ge2q | Multi-agent analysis is only credible when a deterministic risk gate can veto and a decision receipt records why. |
| Chainlink Convergence 2026 | Official sponsor blog | Recent DeFAI / tokenization / compliance / autonomous agents | https://blog.chain.link/convergence-hackathon-winners/ | Winning DeFAI systems combine offchain data/computation with secure onchain execution, policy gates, and attestations. |
| Solana Breakout 2025 | Colosseum official blog | Large recent Web3 startup-shaped hackathon | https://blog.colosseum.com/announcing-the-winners-of-the-solana-breakout-hackathon/ | Winners feel like companies: payments, storage, trading, privacy, infra, stablecoins, AI agent monetization. |
| DoraHacks AI BUIDL Lab Rootstock 2025 | DoraHacks / TopHacker | AI + Web3, DeFi payments, identity, audits | https://staging.tophacker.com/hackathon/ai-buidl-lab-rootstock/winner | DoraHacks winners need clear category fit, practical Web3 use, and reproducible proof, not vague AI wrappers. |

## Winner Autopsies

### Autopsy 1: AgentMandate
Winner autopsy:
- Project: AgentMandate.
- Source: https://ethglobal.com/showcase/agentmandate-u1g6j
- Event date: Open Agents, visible on ETHGlobal in 2026 context.
- Recency class: primary.
- Why still relevant: directly maps to agentic trading and smart-contract enforced bounds.
- Mechanism: user deposits into a contract; agent gets separate wallet; contract enforces allowed tokens, per-swap max, daily limits; violation reverts.
- Portable pattern: onchain mandate beats "AI trading bot" because the contract, not the LLM, is the authority.
- What not to copy: simple max-swap / daily-limit wrapper on Uniswap; that shape is now obvious for agentic trading.

### Autopsy 2: Omeswap
Winner autopsy:
- Project: Omeswap.
- Source: https://ethglobal.com/showcase/omeswap-1ge2q
- Event date: Open Agents, visible on ETHGlobal in 2026 context.
- Recency class: primary.
- Why still relevant: it shows the agentic finance pattern judges already recognize: orchestration, risk gate, modes, receipts.
- Mechanism: specialized components produce signals; a risk gate can veto; structured Decision Receipts explain what happened.
- Portable pattern: make AI decisions inspectable and durable; do not hide behind one model response.
- What not to copy: broad trading terminal with many surfaces; for this buildathon, a tighter Robinhood Chain RWA policy primitive is stronger.

### Autopsy 3: Chainlink Convergence - CRE Risk Router / SentinelCRE / FlowVault
Winner autopsy:
- Project set: CRE Risk Router, SentinelCRE, FlowVault.
- Source: https://blog.chain.link/convergence-hackathon-winners/
- Event date: Apr 6, 2026.
- Recency class: primary.
- Why still relevant: current DeFAI winners reward policy gates, circuit breakers, risk checks, and onchain attestations.
- Mechanism: autonomous systems propose or monitor; deterministic workflows check confidence, market conditions, oracle health, sizing, and write approval/rejection onchain.
- Portable pattern: the "veto" is more memorable than another successful trade because it proves safety under adversarial conditions.
- What not to copy: CRE-specific implementation; this hackathon needs Arbitrum/Robinhood Chain contracts as the proof surface.

### Autopsy 4: Solana Breakout 2025
Winner autopsy:
- Project set: Latinum, Agent Arc, Daiko, Synto, CargoBill, Vanish, TapeDrive.
- Source: https://blog.colosseum.com/announcing-the-winners-of-the-solana-breakout-hackathon/
- Event date: Jul 2, 2025.
- Recency class: primary.
- Why still relevant: large Web3 hackathons are rewarding startup-shaped primitives across AI, DeFi, payments, storage, and privacy.
- Mechanism: concrete product job plus protocol primitive: get paid, trade non-custodially, settle supply-chain payments, store data, preserve privacy.
- Portable pattern: turn the chain into a user-visible ability, not a stack badge.
- What not to copy: Solana-specific speed/mobile story; for Robinhood Chain, RWA policy, self-custody, and Arbitrum proof matter more.

### Autopsy 5: DoraHacks AI BUIDL Lab Rootstock
Winner autopsy:
- Project set: ProtectedPay, AIFi, HireStamp, AgenticID, AuditFi, RSK Smart Yield Engine.
- Source: https://staging.tophacker.com/hackathon/ai-buidl-lab-rootstock/winner
- Event date: Apr 2025.
- Recency class: primary.
- Why still relevant: AI + Web3 winners are category-specific: refundable payments, verifiable hiring, reputation, audit, risk/yield.
- Mechanism: AI helps perceive or evaluate, while chain handles refund, credential, proof, subscription, audit, or yield action.
- Portable pattern: one concrete financial action with a proof beats a broad "AI DeFi hub."
- What not to copy: broad DeFi hub, generic yield optimizer, address reputation dashboard.

## Novelty Brief

- New constraints or technologies since older examples:
  - Robinhood Chain testnet is open and explicitly optimized for tokenized RWAs, equities, ETFs, private assets, 24/7 programmatic trading, and self-custody.
  - Arbitrum Stylus allows Rust-based contracts while remaining EVM-compatible, creating a credible path for a richer risk/policy kernel.
  - Agentic finance winners have already established "agent with limits"; a new project must go beyond token allowlists and max swaps.
- User behavior shifts:
  - Retail users want automation but do not want to hand over keys or trust black-box trade agents.
  - Tokenized assets make market-hours, stale-price, halt, corporate-action, exposure, and suitability constraints newly important.
- Sponsor/platform primitives newly possible:
  - Robinhood Chain: RWA finance context and 24/7 self-custodied trading.
  - Arbitrum/Stylus: cheap/fast policy checks and high-quality contract proof.
  - ZeroDev: session-key style UX for bounded agents.
  - Dune: public proof/analytics after the demo.
  - OpenZeppelin: high-quality contract modules and security posture.
- Tired winner shapes to avoid:
  - AI trading chatbot.
  - Wallet dashboard.
  - Static APY cards.
  - Generic risk score.
  - Agent with a hidden server key.
  - Uniswap clone with chat input.
- Fresh demo surfaces available now:
  - Onchain veto receipt.
  - Judge-controlled market shock / halt switch.
  - Risk policy card compiled into executable contract rules.
  - Transaction proof where unsafe agent action reverts and safe rewritten action executes.

## Portable Patterns

1. Agent proposes; deterministic contract decides.
2. The most memorable demo event can be a refusal, not a success.
3. Every agentic financial action needs a durable receipt: policy hash, input state, verdict, tx hash, and reason code.
4. RWA/tokenized asset demos should expose market-structure constraints: halt, stale price, market hours, exposure, max loss, daily volume, suitability.
5. Use the sponsor chain as the product mechanism: Robinhood Chain should make RWA-style self-custodied policy execution visible.
6. Show a second state surface after the transaction: receipt history, Dune query, explorer link, contract addresses, invariant tests.
7. Build one hard contract primitive and keep all other surfaces boring: wallet, mock assets, oracle fixture, history table, demo mode.

## Clone Traps

- "AI trading bot for Robinhood Chain."
- "AgentMandate but on Robinhood Chain."
- "Multi-agent investment committee terminal."
- "Portfolio dashboard with AI insights."
- "RWA token launchpad."
- "Generic yield optimizer."
- "Dune dashboard as the product."
- "Stylus demo that only proves Rust compilation."

## Inputs For Idea Tournament

- Winner patterns to feed:
  - Onchain mandate / risk gate / veto receipt / decision receipt / startup-shaped financial primitive.
- Sponsor/domain primitives to feed:
  - Robinhood Chain RWA finance, Arbitrum chain deployment, Stylus/Rust policy kernel, ZeroDev session keys, Dune proof, OpenZeppelin contract quality.
- Project shapes to forbid:
  - Chatbot, dashboard, static portfolio optimizer, wrapper around a swap API, generic "AI helps trade" app.
- Evidence gaps:
  - Exact live Robinhood Chain available asset contracts on testnet were not found during this scan; safest build plan uses deployed mock RWA/ERC20 demo assets and clearly labels them as testnet simulation.
  - GPT Pro was initially blocked by a disconnected Kimi WebBridge extension, then restored through daemon upgrade/reconnect before the idea tournament.
