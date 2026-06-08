Idea 1 — TenderLock

5-12 word rumor: “Tokenized equity holders can tender without trusting a broker queue.”

Winner-pattern basis: AgentMandate becomes constrained intent authority; Omeswap becomes multi-check durable receipts; Chainlink Convergence becomes visible policy gates before a verifiable write; Solana/DoraHacks becomes one financial action: lock eligible tokenized shares into a tender/offer escrow.

Novelty delta: Not an AI trader or dashboard. It is a Robinhood Chain-native tender-offer escrow where an agent can only execute a narrowly scoped corporate-action instruction after eligibility, timing, price-band, and revocation gates pass on-chain.

Judge-surprise reason: The demo makes “tokenized equities” feel like programmable market plumbing, not just wrapped stocks.

New primitive: Mandated Corporate-Action Escrow — a contract-level instruction envelope for tendering, opting in, revoking, or expiring tokenized asset actions.

First click: “Create tender mandate for 25 tokenized shares if offer price ≥ $X before deadline.”

Demo plan:
0-10s hook: Show a mock tender offer: “Buy 100 tokenized shares at fixed price until 4pm.”
10-30s judge interaction: Judge signs a limited mandate: asset, max quantity, minimum price, expiry, revocation window.
30-60s visible consequence: A policy agent checks gates, escrows shares, emits a receipt showing mandate hash, gate results, fill status, and revocation rights.

Proof artifact: On-chain Tender Receipt NFT/SBT with mandate hash, policy checks, escrow address, deadline, and execution event.

Sponsor/domain necessity: Needs Robinhood Chain because the product only matters where tokenized equities/RWAs, self-custody, 24/7 access, and broker-like actions meet programmable contracts.

One miracle: Judges believe corporate actions are the killer wedge for tokenized equities, not another trading UX.

Cut list: No chat interface, no price prediction, no portfolio page, no secondary market, no real issuer integrations beyond mocked offer registry.

Expected risk: Tender offers may require real-world legal/broker workflows; demo must frame itself as programmable escrow infrastructure, not production brokerage.

Anti-wrapper score /10: 9.2

Idea 2 — CovenantFuse

5-12 word rumor: “Private-credit agents can release capital only after covenant proof.”

Winner-pattern basis: AgentMandate becomes scoped drawdown authority; Omeswap becomes risk committee receipts; Chainlink Convergence becomes visible policy gates and verified writes; Solana/DoraHacks becomes one concrete financial action: release a loan draw.

Novelty delta: Instead of launching RWAs, CovenantFuse governs post-issuance money movement. Borrowers request a draw; agents can approve only if covenant, collateral, invoice, and exposure checks pass. The result is not advice, it is an executable capital release.

Judge-surprise reason: Most RWA projects stop at tokenization. This turns the boring middle office — covenants, drawdowns, and exceptions — into a composable on-chain primitive.

New primitive: Covenant-Gated Drawdown Vault — a vault where capital movement requires durable risk receipts from multiple independent agents.

First click: “Request $50,000 draw against approved receivable batch.”

Demo plan:
0-10s hook: A borrower has approved credit but cannot draw until covenants clear.
10-30s judge interaction: Judge uploads/selects a receivable batch and clicks “Request draw.” Three agents evaluate: concentration limit, stale invoice risk, borrower exposure.
30-60s visible consequence: If gates pass, USDC releases on Arbitrum One/Sepolia; if one gate fails, funds stay locked and the failure receipt is visible.

Proof artifact: Risk-Gate Receipt containing agent signatures, input commitments, covenant thresholds, pass/fail matrix, and final vault transaction hash.

Sponsor/domain necessity: Needs Arbitrum because low-cost contract execution and mature DeFi liquidity matter for credit vaults; Chainlink-style proof/write visibility matters because capital movement requires auditability.

One miracle: The team makes the policy engine simple enough that judges instantly understand why a bank, credit fund, or DAO treasury would use it.

Cut list: No RWA marketplace, no borrower CRM, no yield optimizer, no credit score oracle, no undercollateralized real lending in demo.

Expected risk: Too enterprise-looking for a hackathon unless the demo makes the drawdown action visceral and fast.

Anti-wrapper score /10: 9.0

Idea 3 — RecallRail

5-12 word rumor: “Funds can claw back mistaken RWA payments without custodial panic.”

Winner-pattern basis: AgentMandate becomes bounded recovery authority; Omeswap becomes multi-agent dispute receipts; Chainlink Convergence becomes visible policy gates before state changes; Solana/DoraHacks becomes one concrete financial action: recall, freeze, or release a mistaken payment.

Novelty delta: Not compliance theater and not a dashboard. RecallRail creates a programmable post-payment recovery rail for tokenized asset settlements: a sender can attach a limited recall clause, but recovery executes only if pre-agreed evidence and time gates pass.

Judge-surprise reason: It tackles a real institutional blocker for self-custody: irreversible settlement is great until an operations team sends $500k to the wrong counterparty.

New primitive: Time-Boxed Settlement Recall Right — a transferable payment receipt with embedded, expiring dispute authority.

First click: “Send settlement with 30-minute recall right for wrong-recipient evidence.”

Demo plan:
0-10s hook: Show a simulated RWA settlement sent to the wrong address.
10-30s judge interaction: Judge triggers a recall claim and chooses evidence type: wrong address, duplicate payment, failed KYC attestation, or invoice mismatch.
30-60s visible consequence: Multi-agent policy checks run; funds move from pending to returned, frozen, or finalized, with every gate and signature displayed.

Proof artifact: Settlement Rail Receipt showing payment ID, recall window, allowed claims, agent attestations, counterparty response status, and final state transition.

Sponsor/domain necessity: Needs Robinhood Chain or Arbitrum because tokenized assets and 24/7 settlement need programmable safety rails that still preserve self-custody instead of reverting to centralized broker control.

One miracle: Judges see recall rights as a new institutional settlement primitive, not a chargeback clone.

Cut list: No fraud scoring black box, no bank integration, no generic compliance dashboard, no account abstraction detour, no AI negotiator.

Expected risk: Must avoid looking anti-crypto by proving recall authority is opt-in, time-boxed, transparent, and impossible after finality.

Anti-wrapper score /10: 9.4