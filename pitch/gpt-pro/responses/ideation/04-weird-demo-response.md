Idea 1

Name: Refusal Theater

5-12 word rumor: The contract stamps NO on a live trade.

Workflow scar: RWA / tokenized-stock workflows often treat “blocked trade” as a backend log or compliance afterthought. The scar: when an agent attempts something unsafe under a halt, stale price, or exposure shock, nobody gets a portable, onchain “why this did not happen” artifact.

Target user: Robinhood Chain / Arbitrum RWA apps, self-custody broker UX teams, agent operators, and compliance engineers who need pre-trade refusal to be provable rather than merely simulated.

Winner-pattern basis: The HackQuest page shows the prize mix rewards both overall product quality and agentic projects, so the basis is: make the agentic moment dramatic, but make the contract quality and RWA relevance obvious. 
arbitrum-london.hackquest.io

Novelty delta versus recent winners: Recent winners already do “agent with limits.” This is not a safer agent; it is a public refusal machine where the failed action is the product. The artifact is not “the trade was prevented,” but “the protocol can prove the exact unsafe calldata it rejected.”

Judge-surprise reason: The demo’s hero moment is a reverted-looking action that still produces a collectible, readable, onchain refusal receipt. The judge tries to force a bad trade, and the system celebrates saying no.

Clone trap avoided: A Web2 clone can show a red toast. It cannot create a non-repudiable refusal object tied to intended calldata, policy hash, oracle snapshot, and fallback route on an Arbitrum chain.

New primitive: RefusalReceipt: an ERC-721 / SBT-style receipt minted only when an attempted action is blocked by a verifiable rule. It stores intended calldata hash, policy version, shock source, refusal code, and fallback action hash.

First click: “Try to buy the halted stock token.”

Demo interaction model: The frontend shows a fake agent hand hovering over a live RWA order ticket. The judge chooses one poison card: Market Halt, Stale Price, or Exposure Shock. The agent submits the order. The RefusalHub contract refuses it, emits a Rejected(reasonCode) event, mints a red receipt, and rewrites the route into “escrow / wait / notify” instead of buy.

Showcase plan:

0-10s hook: Show a green “BUY” path and say: “This demo only wins if the trade fails.”

10-30s interaction: Judge taps a physical-looking red card: HALT, STALE_PRICE, or MAX_EXPOSURE.

30-60s visible consequence: The order slams into an onchain red stamp: NO: MARKET_HALTED. A receipt appears with tx hash, calldata hash, policy hash, and fallback route.

Judge participation: Judge chooses the shock and signs the bad attempt from a smart account.

Visual staging: Courtroom stamp animation, red carbon-copy receipt, explorer link, and a tiny “agent caught on camera” panel.

Fallback if live chain/API/input fails: Use pre-seeded Arbitrum Sepolia transactions and a local oracle toggle; the receipt UI can replay the same tx hash and event log.

Proof artifact: A RefusalReceipt NFT/SBT plus a one-page “financial flight recorder” view: attempted asset, intended action hash, policy version, refusal reason, oracle timestamp, and fallback calldata.

Sponsor/domain necessity: Robinhood’s own announcement says stock tokens initially issue on Arbitrum and that Robinhood’s Arbitrum-based L2 is intended for tokenized RWAs, 24/7 trading, bridging, and self-custody, which makes refusal receipts feel native to the sponsor domain rather than bolted on. OpenZeppelin’s Pausable / ReentrancyGuard patterns support the emergency-stop story, and ZeroDev’s session keys make the “agent attempted action” real without building a chatbot. 
Robinhood
+2
OpenZeppelin Docs
+2

One miracle: The rejection animation and receipt must feel like a product, not an error page.

Boring reliable parts: Mock RWA ERC-20s, mock price oracle, three hard-coded rule predicates, Foundry tests, Next.js frontend, OpenZeppelin roles, Arbitrum Sepolia deployment.

Cut list: No real securities, no real brokerage claims, no LLM trading logic, no portfolio dashboard, no generic compliance dashboard, no cross-chain bridge.

Expected risks: It may be mistaken for a normal policy gate. The mitigation is to make the refusal receipt the central primitive and demo the failed action as the win condition.

Anti-wrapper score out of 10: 9.2/10 — removing Web3 removes the public, transferable, tamper-evident proof that the trade was refused for a specific rule at a specific chain state.

Idea 2

Name: T+60 Ghost Order

5-12 word rumor: A future trade can be haunted and reversed.

Workflow scar: Agents and automation often act immediately or not at all. The scar: in real finance, new facts arrive after intent creation but before execution — stale oracle, policy edit, volatility shock, venue halt — and signed future actions are hard to challenge without trusting a centralized service.

Target user: Self-custody trading apps, treasury bots, RWA routing systems, and protocols that want delayed automation with a public challenge window.

Winner-pattern basis: It keeps the agentic theme but moves the intelligence out of the chatbot and into a contestable execution primitive: commit now, challenge before execution, then either execute or produce a flight recorder.

Novelty delta versus recent winners: Instead of “agent has limits,” this is “agent actions have due process.” The agent can schedule a future action, but judges / monitors / counterparties can haunt it with a valid challenge packet before it fires.

Judge-surprise reason: A countdown order is visibly alive on screen. The judge injects a shock during the countdown, and the future transaction mutates from “armed” to “challenged” to “rewritten” in front of them.

Clone trap avoided: A Web2 cron job can be canceled by an admin. This creates an onchain, bond-backed challenge window where anyone can prove why the pending action must not execute.

New primitive: ChallengeableIntent: a delayed user operation with a bond, expiry, calldata commitment, policy hash, and challenge() function. Successful challenges mint a FlightRecorderReceipt.

First click: “Arm the agent for 60 seconds.”

Demo interaction model: The user arms a future order: “Buy mock RWA token or hedge on GMX if condition X is true.” A visible timer starts. The judge injects STALE_ORACLE or POLICY_CHANGED. The challenge contract verifies the packet, cancels or rewrites the intent, rewards the challenger bond, and mints a black-box receipt.

Showcase plan:

0-10s hook: Show a glowing order inside a glass coffin: “This trade will execute in 60 seconds unless someone proves it should not.”

10-30s interaction: Judge presses “make oracle stale” or edits a policy card from maxStale=30s to maxStale=5s.

30-60s visible consequence: Timer turns purple, order becomes HAUNTED, old calldata is invalidated, a new safe route appears, and the flight recorder receipt prints.

Judge participation: Judge chooses the challenge packet and decides whether to save or kill the future action.

Visual staging: Countdown clock, ghost overlay, before/after route, receipt like an airplane black box.

Fallback if live chain/API/input fails: Use two deterministic challenge packets and pre-funded intents; if a sponsor API fails, replay event logs from a seeded deployment.

Proof artifact: FlightRecorderReceipt containing original intent hash, scheduled execution block/time, challenge packet hash, challenger address, old policy hash, new policy hash, final state, and a replay button.

Sponsor/domain necessity: ZeroDev explicitly supports automation with session keys, which fits scheduled agent actions; Dune’s API can retrieve query results programmatically, making it useful for replaying flight-recorder evidence without becoming the product; and GMX gives a recognizable Arbitrum-native high-volatility trading context for the “challenge before execution” story. 
ZeroDev
+2
Dune Docs
+2

One miracle: The countdown must sync with the onchain state well enough that the judge feels they personally changed the fate of the transaction.

Boring reliable parts: Intent escrow, challenge bond, mock oracle timestamp, policy version registry, event decoder, receipt minting, two challenge types, Foundry tests.

Cut list: No autonomous portfolio manager, no real liquidation engine, no full DEX aggregator, no generalized optimistic oracle, no agent chat UI.

Expected risks: Challenge logic can become too complex. Keep one airtight challenge type for demo, such as stale oracle proof, and make policy-change challenge a second optional path.

Anti-wrapper score out of 10: 9.4/10 — without onchain escrow, bonds, public challenge windows, and immutable receipts, it becomes a normal cancelable scheduled task.

Idea 3

Name: Black-Bar Broker

5-12 word rumor: The contract enforces a secret red line.

Workflow scar: Users may have sensitive financial constraints: employer blackout tickers, concentration limits, restricted sectors, fund mandates, or personal taboos. The scar: revealing the constraint leaks strategy or identity, but hiding it makes enforcement unverifiable.

Target user: Employee trading apps, private wealth tools, DAO treasuries with confidential mandates, RWA allocation apps, and agentic trading systems that must obey hidden user constraints.

Winner-pattern basis: It solves a real RWA suitability problem while giving judges a strange interaction: they write a private rule on screen, the screen censors it, and the public contract still enforces it.

Novelty delta versus recent winners: Recent policy-gated agents usually reveal the policy or store ordinary limits. This uses encrypted constraints: the route proposer sees only public assets and public calldata, while the contract checks a hidden red line.

Judge-surprise reason: The judge types a forbidden ticker or max exposure, it becomes black bars, then the agent proposes a route that accidentally violates it. The contract rejects with PRIVATE_RULE_MATCH without revealing the rule.

Clone trap avoided: A Web2 app can hide a rule from the audience, but the server still sees it. The point here is public verifiability plus private evaluation: the protocol proves a secret constraint affected execution.

New primitive: SealedSuitabilityPredicate: encrypted user constraint + public route hash + redacted allow/deny receipt. Optional judge-only reveal can decrypt the reason after the demo.

First click: “Seal a private taboo.”

Demo interaction model: Judge enters a hidden rule such as “do not buy ticker X” or “max 17% in tech basket.” The frontend encrypts it and submits it to the policy contract. The agent proposes a route using mock RWA tokens. The contract checks the encrypted predicate and returns a public ALLOW or DENY_PRIVATE, minting a black-bar receipt.

Showcase plan:

0-10s hook: Show a giant input box: “Write a rule you do not want the room to know.”

10-30s interaction: Judge types the secret; the UI immediately turns it into ███████ and stores an encrypted policy commitment.

30-60s visible consequence: Agent route appears. If it violates the secret, the contract refuses and mints a redacted receipt: Denied by private rule #7.

Judge participation: Judge chooses the secret rule and can optionally reveal it only on their own device after the denial.

Visual staging: Black-bar censorship, sealed envelope animation, public receipt with missing words, private judge-only reveal panel.

Fallback if live chain/API/input fails: Precompute two encrypted policies and two routes: one passing, one failing. If FHE calls are slow, use Fhenix mock contracts locally and show the submitted Arbitrum Sepolia policy registry tx separately.

Proof artifact: Redacted receipt with policy commitment hash, ciphertext handle, route hash, allow/deny event, timestamp, and optional judge-only reveal proof.

Sponsor/domain necessity: Fhenix CoFHE docs list Arbitrum Sepolia support and provide encrypted-input patterns for confidential smart contracts, making this more than a privacy-themed UI. Robinhood’s RWA positioning gives the right asset context: tokenized stocks and ETFs are exactly where private constraints like employer blackout or concentration limits become meaningful. 
Fhenix Documentation
+2
Fhenix Documentation
+2

One miracle: Make exactly one encrypted predicate work end to end: forbidden issuer or hidden max exposure. Do not attempt a full compliance engine.

Boring reliable parts: Mock RWA tokens, encrypted policy setter, route hash checker, redacted receipt NFT, local CoFHE tests, Arbitrum Sepolia policy registry, Next.js frontend.

Cut list: No KYC product, no legal suitability claims, no real broker integration, no general AI advice, no portfolio insights, no private order book.

Expected risks: FHE integration can be brittle in a hackathon. The safety plan is to build with Fhenix mocks first, deploy the surrounding registry / receipts on Arbitrum Sepolia, and make one live encrypted check the stretch goal.

Anti-wrapper score out of 10: 9.6/10 — if Web3 is removed, the platform either sees the user’s secret or cannot publicly prove the hidden rule was enforced.