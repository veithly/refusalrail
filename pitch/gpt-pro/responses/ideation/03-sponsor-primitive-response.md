Idea 1

Name: MandateRail

5-12 word rumor: A payroll mandate that cannot overspend itself.

Workflow scar: 自托管用户想做“每月自动买 tokenized ETF / equity”，但又不愿把钱包交给 AI bot。现实痛点不是缺少建议，而是缺少一个能替用户执行、但永远不能越权的金融自动化轨道。

Target user: Robinhood Chain 上的 RWA / ETF / equity token 用户；想做工资定投、现金扫入、家庭账户自动配置，但不想每次手签，也不想让 agent 拿无限 approval 的用户。

Winner-pattern basis:
AgentMandate 的核心是“mandate beats bot”；Omeswap 和 DeFAI winners 的核心是 risk gates + receipts。MandateRail 把这个模式压到一个更 PMF 的场景：不是让 AI 选资产，而是让合约执行一个用户签过的、可审计的 RWA 现金流 mandate。

Novelty delta versus recent winners:
最近 winners 多数证明“agent 可以被合约限制”。MandateRail 进一步证明“金融自动化产品可以被合约限制”：它不是一次 swap 的 guard，而是一个长期 mandate lifecycle，包括 session key、预算、资产白名单、冷却时间、失败收据、熔断与 Dune 可复验。

Judge-surprise reason:
现场让 judge 授权一个 session key，然后故意让 agent 尝试超额买入。交易不会 silent fail，而是链上触发 PolicyRejected；再输入合规金额，交易立即执行并 mint receipt。judge 会看到“agent 有钥匙，但没有权力”。

Clone trap avoided:
不是 AI trading chatbot；没有预测收益；没有 portfolio insight dashboard。核心不是“推荐买什么”，而是“agent 在链上只能做 mandate 允许的事”。

New primitive:
Self-custodial RWA spending mandate：一个用户签名生成的、session-key 可执行的 onchain policy envelope。它把“自动投资”拆成三个可验证对象：policyHash、sessionKeyScope、executionReceipt。

First click:
Create a £50 weekly ETF mandate。用户选择 mock rSPY / rBND / rCASH，设置每周上限、最低现金余额、最大单次滑点、失效日期，然后点击 “Install bounded session key”。

Demo interaction model:

用户用 ZeroDev smart account 创建 mandate。

RwaMandateFactory 部署个人 MandateVault。

前端展示一个 agent queue：Buy 20 rSPY、Buy 90 rSPY、Buy 10 rBND。

judge 点击 “Run bad action”：90 rSPY 被 StylusPolicyKernel 拒绝。

judge 点击 “Run valid action”：20 rSPY 成功，receipt 出现在 explorer 和 Dune proof feed。

关闭 mandate 后，session key 再调用也失败。

Showcase plan:

0-10s hook: “This agent has a wallet key. Watch it still fail.”

10-30s interaction: judge 亲自安装 bounded session key，并点击一个越权 order。

30-60s visible consequence: explorer 显示 PolicyRejected，随后合规 order 触发 RwaOrderExecuted 和 ReceiptMinted。

Judge participation: judge 选择 budget 上限和 forbidden asset；agent 立即被这个选择约束。

Visual staging: 左侧是 human mandate；中间是 agent queue；右侧是 live explorer event stream + Dune proof counter。

Fallback if live chain/API/input fails: 使用已部署合约的预录 tx hashes；前端切到 “replay mode”，仍展示同一组链上 events、policy hash 和 Dune query result。

Proof artifact:
Core contracts:

RwaMandateFactory

MandateVault

StylusPolicyKernel

SessionKeyScopeRegistry

MandateReceipt1155

Key events:

MandateCreated(address user, address vault, bytes32 policyHash)

SessionKeyInstalled(address key, bytes32 policyHash, uint64 expiresAt)

AgentActionSubmitted(bytes32 intentHash, address asset, uint256 amount)

PolicyRejected(bytes32 intentHash, uint8 reasonCode)

RwaOrderExecuted(bytes32 intentHash, address asset, uint256 amount, uint256 price)

CircuitBreakerTripped(bytes32 policyHash, uint8 metric)

ReceiptMinted(address user, bytes32 intentHash, uint256 receiptId)

Explorer proof shows the same session key attempting both rejected and accepted actions. Dune proof shows every RwaOrderExecuted grouped by policyHash, with no order above mandate limit; Dune is proof-after-demo, not the product. Dune’s API/docs support programmatic query execution and retrieval, which fits this proof layer. 
Dune Docs

Sponsor/domain necessity:

Robinhood Chain is necessary: the product only matters if the assets are tokenized equities / ETFs / RWAs in a self-custodial, programmable, 24/7 environment; replacing this with random ERC-20s collapses the demo into a toy DCA bot. Robinhood Chain’s docs position it around tokenized RWAs, including equities, ETFs, private assets, self-custody, programmatic trading, and 24/7 access. 
Robinhood

ZeroDev is necessary: without bounded session keys, the user must manually sign every recurring action or give an unsafe hot key. ZeroDev’s docs explicitly cover smart accounts, batching, gasless UX, and session keys for automated transactions. 
ZeroDev

Arbitrum / Stylus is necessary: the risk kernel is not a Rust vanity demo; it is the deterministic policy engine that blocks overspend, cooldown violations, and disallowed assets. Stylus enables EVM-compatible contracts written in Rust/WASM. 
Arbitrum Docs

OpenZeppelin is necessary: use OZ ERC-1155, AccessControl, Pausable, ReentrancyGuard-style patterns so judges see production posture, not hackathon-only custody code; OZ documents these security primitives for access control and emergency response. 
OpenZeppelin Docs
+1

One miracle:
Robinhood Chain testnet has usable mock or faucet RWA assets; otherwise deploy clearly labeled mock rSPY, rBND, rCASH with Robinhood-style metadata and keep the primitive focused on mandate enforcement.

Boring reliable parts:
Next.js frontend, wagmi/viem, ZeroDev smart account integration, OZ contracts, Foundry tests, one deterministic price adapter, one Dune query, one explorer link per event.

Cut list:
No LLM advice, no “best ETF” ranking, no leverage, no cross-chain bridging, no real yield claims, no complex tax logic, no portfolio analytics beyond proof.

Expected risks:
Session-key scope mismatch; judges confusing it with a DCA app; Robinhood Chain asset availability; Stylus integration time. Mitigation: make the bad-action rejection the hero moment and keep the asset set tiny.

Anti-wrapper score out of 10:
9.1/10 — without Robinhood-style RWA assets and ZeroDev bounded execution, there is no product consequence, only a frontend scheduler.

Idea 2

Name: HedgeCovenant

5-12 word rumor: A no-sell seatbelt for tokenized equity exposure.

Workflow scar: 用户持有 tokenized equity / ETF / private asset exposure，但不想卖掉：可能有税务、锁定、信念、治理或流动性原因。问题不是“我要 alpha”，而是“我需要一个不能变成赌场的 downside hedge”。

Target user: RWA-heavy wallets、DAO treasuries、founders holding tokenized private assets、Robinhood Chain power users、Arbitrum DeFi users who want bounded hedging instead of discretionary trading.

Winner-pattern basis:
继承 AgentMandate 的“contract controls authority”，Omeswap 的“risk gate + receipt”，以及 Convergence-style circuit breakers。区别是这里的 agent 不是交易员，而是 hedge maintainer；它只能把风险降到 covenant 允许的区间，不能追逐收益。

Novelty delta versus recent winners:
过去的 agentic projects 多数围绕“执行一次动作”。HedgeCovenant 做的是资产负债表级别的 covenant：RWA exposure 在一个 vault 里，GMX hedge 在另一个 venue 里，合约持续证明 hedge ratio、margin cap、loss cap 没被突破。

Judge-surprise reason:
judge 存入 mock rNVDA / rSPY，设置 “max hedge 35%, max daily loss 1%, no leverage above 0.4x”。agent 尝试开 1.2x short，会被拒；随后按 0.25x hedge 成功提交 GMX order。视觉上像“DeFi airbag”。

Clone trap avoided:
不是 generic yield optimizer，也不是 perp trading bot。它不寻找收益最高策略；它只执行一个用户先定义的 hedge covenant，并且每次 hedge 都有链上 reason code。

New primitive:
Onchain hedge covenant for non-sellable RWA exposure：把 RWA holding、perp hedge、margin budget 和 circuit breaker 绑定成一个可证明状态机。

First click:
Protect this rSPY position。用户选择 exposure token、hedge market、maximum hedge ratio、maximum margin spend、unwind threshold，然后点击 “Arm covenant”。

Demo interaction model:

用户把 mock rSPY 存入 ExposureVault。

HedgeCovenantKernel 计算允许 hedge band。

ZeroDev session key 授权 agent 只能调用 rebalanceHedge()。

agent 第一次尝试过度 short：HedgeRejected.

agent 第二次按 covenant 调用 GMXOrderAdapter：提交 hedge order，记录 GMX order key。

price adapter 模拟 RWA 下跌，合约显示 protection ratio 上升；触达 loss cap 时触发 MarginCapHit 或 HedgePaused。

Showcase plan:

0-10s hook: “The agent wants to short more. The contract says no.”

10-30s interaction: judge 设置 hedge ratio cap，并亲自触发一次 malicious rebalance。

30-60s visible consequence: explorer 显示 HedgeRejected，然后显示 HedgeOrderSubmitted、GmxOrderKeyRecorded、ProtectionReceiptMinted。

Judge participation: judge 调整 hedge cap，从 20% 改到 35%，看下一次 allowed amount 变化。

Visual staging: 上方是 RWA exposure meter；下方是 GMX hedge meter；中间是 covenant band，越界 order 会变红并链上失败。

Fallback if live chain/API/input fails: 使用 Arbitrum One fork 或预录 GMX order tx hash；本地 mock IGMXRouter 保持相同 ABI，现场仍能展示 covenant reject / accept / receipt events。

Proof artifact:
Core contracts:

ExposureVault

HedgeCovenantKernel

GMXOrderAdapter

HedgeReceiptLedger

LiquidationBrake

Key events:

ExposureDeposited(address user, address rwaAsset, uint256 amount)

CovenantArmed(address user, bytes32 covenantHash, uint16 maxHedgeBps)

HedgeRejected(bytes32 rebalanceId, uint8 reasonCode, uint256 requestedBps, uint256 maxBps)

HedgeOrderSubmitted(bytes32 rebalanceId, bytes32 gmxOrderKey, uint256 hedgeNotional)

HedgeAdjusted(bytes32 rebalanceId, int256 deltaNotional)

MarginCapHit(bytes32 covenantHash, uint256 marginUsed, uint256 marginCap)

ProtectionReceiptMinted(address user, bytes32 rebalanceId)

Explorer proof shows GMXOrderAdapter calling the hedge venue only after HedgeCovenantKernel passes. Dune proof shows hedgeNotional / rwaExposure <= maxHedgeBps across all receipts, plus every failed over-hedge attempt. GMX is not decorative: the order adapter is the visible consequence.

Sponsor/domain necessity:

GMX is necessary: without a real Arbitrum-native perp venue, this becomes a simulation. GMX is documented as a decentralized spot and perpetual exchange on Arbitrum supporting leveraged perps and swaps, which is exactly the hedge sink. 
GMX Docs

Robinhood Chain is necessary: the thing being protected is tokenized RWA / equity / ETF exposure; if replaced by generic crypto collateral, the product becomes another perp risk bot. Robinhood Chain’s RWA/equity/ETF positioning is the domain reason. 
Robinhood

Arbitrum / Stylus is necessary: cheap execution lets small hedge adjustments be economical, and Stylus makes the risk kernel feel like a real policy engine rather than a Solidity toy. 
Arbitrum Docs

ZeroDev is necessary: hedge maintenance needs recurring bounded execution; user should not sign every hedge rebalance and should not give full wallet authority. 
ZeroDev

OpenZeppelin is necessary: Pausable, role-gated adapters, reentrancy protection, and conservative upgrade/admin boundaries are part of the judging story, not polish. 
OpenZeppelin Docs

One miracle:
A tiny live GMX integration works cleanly during demo. If not, the miracle is reduced to ABI-faithful fork replay with a real historical GMX order hash.

Boring reliable parts:
One exposure token, one hedge market, one mock price move, one GMX adapter path, one front-end slider, one Dune query, strong Foundry tests for reject cases.

Cut list:
No multi-asset optimizer, no AI market prediction, no liquidation strategy game, no cross-margin complexity, no yield farming, no options, no private-key automation outside ZeroDev.

Expected risks:
GMX integration complexity; judging misunderstanding it as a trading bot; mock RWA price credibility; hedge ratio math edge cases. Mitigation: demo starts with a rejected over-hedge so the product identity is “seatbelt,” not “alpha”.

Anti-wrapper score out of 10:
9.3/10 — removing GMX removes the hedge consequence; removing Robinhood-style RWA removes the exposure problem; removing the covenant contract turns it into a dangerous trading bot.

Idea 3

Name: BlackoutProof

5-12 word rumor: Prove compliance without doxxing your holdings.

Workflow scar: 员工、基金、DAO treasury 或 private-asset holder 经常要证明“我没有买 restricted name / 没有违反 blackout / 没有超过单一资产上限”。传统流程是发 brokerage statement 给合规人员；onchain 流程更糟，因为规则和 holdings 都可能公开。

Target user: 持有 tokenized equities / ETFs / private assets 的员工、创始人、基金 LP、DAO treasury signers、Robinhood Chain RWA users who need compliance without public portfolio disclosure.

Winner-pattern basis:
使用 recent winners 的“action + proof + reproducibility”模式，但把透明 risk gates 升级为 confidential risk gates。它仍然不是 offchain attestation：交易是否能发生，由合约判定。

Novelty delta versus recent winners:
AgentMandate 类项目通常把 policy 放在明文里。BlackoutProof 的 delta 是：policy 和部分 portfolio constraints 可以加密，但 allow / deny 的结果、policy commitment、receipt 公开可验证。

Judge-surprise reason:
judge 作为 compliance officer 输入一个 encrypted restricted list；另一个 judge 尝试购买一个被禁 token。前端不显示禁用名单，但交易被链上拒绝。然后购买 broad ETF，被允许并 mint BlackoutPass。现场能看到“规则没公开，但规则真的控制了钱”。

Clone trap avoided:
不是 RWA token launchpad，不是 dashboard，不是 KYC badge。它是一个 transfer / order guard：没有合规通过，资产动作不会执行。

New primitive:
Confidential compliance gate for tokenized finance：一个把 encrypted policy、public commitment、onchain allow/deny 和 transferable action 绑定的 primitive。

First click:
Create encrypted blackout rule。合规方选择 restricted asset、max single-name exposure、expiry time，前端加密后提交 policy commitment；用户只看到 policyId 和过期时间。

Demo interaction model:

合规方调用 ConfidentialPolicyRegistry.commitEncryptedPolicy()。

用户通过 ComplianceRouter.requestTrade() 尝试买入 mock rXYZ。

ConfidentialCheckAdapter 使用 Fhenix-style encrypted computation 判断是否违反 policy。

若违反，TradeBlocked 事件只暴露 blind reason code，不暴露 restricted ticker。

若合规，TradeAllowed，router 执行 RWA transfer / swap，并 mint non-transferable BlackoutPass.

Showcase plan:

0-10s hook: “The judge will make a rule I cannot see.”

10-30s interaction: judge 输入 hidden restricted asset；另一个 judge 点击 buy。

30-60s visible consequence: restricted buy 链上失败；allowed ETF buy 成功；Dune proof 显示 commitments、allow/deny counts、receipt ids，但没有暴露规则内容。

Judge participation: 一位 judge 当 compliance issuer，另一位 judge 当 employee wallet。

Visual staging: 左屏是 encrypted policy safe；中屏是 attempted trade；右屏是 public proof stream，故意不显示 restricted list。

Fallback if live chain/API/input fails: 使用预生成 encrypted policy 和预录 tx hashes；本地演示同一 inputs 的 FHE check transcript，同时链上展示 policy commitment 与 receipt events。

Proof artifact:
Core contracts:

ConfidentialPolicyRegistry

ComplianceRouter

ConfidentialCheckAdapter

BlackoutPass1155

PolicyIssuerAccessControl

Key events:

PolicyCommitted(bytes32 policyId, bytes32 policyHash, address issuer, uint64 expiresAt)

EncryptedCheckRequested(bytes32 checkId, bytes32 policyId, address user)

TradeBlocked(bytes32 checkId, bytes32 policyId, uint8 blindReasonCode)

TradeAllowed(bytes32 checkId, bytes32 policyId, bytes32 actionHash)

BlackoutPassMinted(address user, bytes32 policyId, uint256 passId)

PolicyRevoked(bytes32 policyId)

Explorer proof shows the trade cannot bypass ComplianceRouter. Dune proof shows policy commitments, blocked/allowed trades, pass minting, and zero plaintext restricted tickers. The artifact is the audit trail, not a dashboard product.

Sponsor/domain necessity:

Fhenix is necessary: without confidential computation, either the restricted list / holdings become public, or the compliance decision moves offchain and loses enforceability. Fhenix positions confidential smart contracts around encrypted computation on EVM-compatible systems; FHEVM-style docs describe encrypted data types and encrypted onchain computation. 
Fhenix
+1

Robinhood Chain is necessary: compliance around tokenized equities, ETFs, and private assets is the domain; using meme tokens would erase the reason for blackout rules. Robinhood Chain is explicitly built for tokenized financial assets and programmatic self-custody. 
Robinhood

Dune is necessary as proof infrastructure: the product is the transfer gate, but judges need an external reproducible proof that blocked and allowed actions happened without leaked rule contents. Dune’s API/docs support executing and retrieving onchain analytics queries programmatically. 
Dune Docs

OpenZeppelin is necessary: policy issuers, revocation, pausing, and non-transferable pass issuance need conservative access control and emergency mechanisms, not custom hackathon auth. 
OpenZeppelin Docs
+1

One miracle:
Fhenix confidential check works smoothly enough for one hidden restricted-list rule during live demo.

Boring reliable parts:
One issuer role, one encrypted restricted asset rule, two mock RWA tokens, one compliance router, one non-transferable receipt token, one Dune query, deterministic fallback transcript.

Cut list:
No full KYC, no legal claims, no multi-jurisdiction compliance engine, no identity marketplace, no portfolio dashboard, no token launchpad, no broad privacy wallet.

Expected risks:
FHE tooling complexity; latency in encrypted check; judges asking whether this is legally binding; accidental leakage through frontend labels. Mitigation: frame it as a technical primitive for private policy enforcement, not a complete compliance product.

Anti-wrapper score out of 10:
9.0/10 — remove Fhenix and the demo must reveal the rule; remove Robinhood-style RWA and blackout compliance becomes artificial; remove the router contract and compliance no longer controls the financial action.