1. Detailed PRD
1. Project background

Project name: RefusalRail
Seven-word rumor: Reject 1 unsafe RWA trade, stamp NO.
Hero copy: Reject 1 unsafe RWA trade in 60 seconds.

RefusalRail is a Cloudflare-hosted RWA agent workbench for demonstrating bounded agent authority on Arbitrum. The product lets a judge or user authorize a narrow standing-action policy, then watch an agent attempt a tokenized-asset action that violates that policy. Instead of allowing the agent to proceed, the policy rail rejects the unsafe calldata and produces a durable refusal receipt that can be inspected in the browser and linked to deployed contract proof.

The core product insight is that the failed action is the product. In agentic finance, a successful system is not one where the agent always acts. A successful system is one where an agent can be delegated limited authority, tested against real policy constraints, and stopped deterministically when the proposed action is outside its mandate. RefusalRail turns that stop into a judge-readable artifact: reason code, calldata hash, policy hash, shock snapshot, session/owner fields, and proof hash.

This matters specifically for RWA standing actions because tokenized assets are not ordinary demo tokens. They represent a future where user-authorized agents may perform recurring or conditional actions involving tokenized treasuries, equities, funds, invoices, or other real-world-linked assets. In that world, “agent said it was safe” is not enough. The platform must show what authority was granted, what the agent attempted, why the action was rejected or allowed, and what durable proof exists afterward.

Arbitrum and the Robinhood Chain context are necessary because the demo is not trying to prove generic AI chat or UI risk labeling. It is proving an execution rail for agentic RWA activity on an Arbitrum-compatible environment. Arbitrum Sepolia provides the deployed proof network for smart contract evidence, explorer links, transaction hashes, and contract addresses. Robinhood Chain provides the sponsor-aligned RWA story: retail-grade tokenized asset access will need bounded, inspectable, and refusal-capable agent permissions before standing actions can be trusted.

2. Problem definition

Agentic finance demos often optimize for “the agent did something.” That framing is dangerous for RWA use cases. A delegated finance agent must sometimes be unable to act, even when it proposes a transaction that looks syntactically valid.

The problem RefusalRail solves:

A user, auditor, or judge needs a simple way to verify that an RWA agent’s authority is bounded by deterministic policy, not by UI promises or model self-restraint. When an unsafe standing-action trade is attempted, the system must refuse it, preserve evidence, and make that refusal inspectable.

Current bad patterns to avoid:

A chatbot claims it will not trade but has no verifiable enforcement.

A wallet dashboard labels risk but does not block execution.

A portfolio terminal shows analytics but no deterministic refusal.

A mock trading bot executes or simulates trades without a durable policy trail.

A risk score exists, but the exact policy, calldata, and refusal reason are not inspectable.

RefusalRail’s answer:

The user chooses a visible shock condition, the agent attempts an unsafe RWA action, the policy rail refuses it, and the app records a receipt that can be inspected by holder, auditor, or judge.

3. Target users

Primary hackathon judge

The first user is a judge evaluating whether the product is real, testable, and sponsor-aligned. They need to understand the core behavior within 60 seconds without reading a long README first. They should be able to open the live URL, click a shock card, run the unsafe attempt, see “NO,” and inspect the refusal receipt.

RWA product builder

A product builder working on tokenized asset platforms needs a reusable mental model for bounded standing actions. They want to see how delegated agent actions can be constrained by rules such as market halt, stale price, exposure cap, session owner, or policy version.

Compliance/audit reviewer

An auditor or risk reviewer wants to inspect what happened after the fact. They care about reason codes, policy hashes, calldata hashes, proof hashes, transaction links, and whether the refused action was persisted in a tamper-evident way.

Agent developer

An agent developer wants a clear boundary between agent proposal and deterministic execution policy. They need to see that the agent can propose, but the policy rail decides.

4. User pain points

“Agent safety” is often only a claim.
Users cannot tell whether the agent was actually blocked by a policy rail or whether the UI merely displayed a refusal message.

RWA actions need stricter auditability than meme-token actions.
A tokenized asset standing action may involve real-world market hours, stale prices, restricted assets, or exposure limits. The refusal reason must be durable and reviewable.

Failure states are usually hidden.
Most demos show happy paths. RefusalRail makes the failure state the first-class outcome because the ability to say “NO” is the safety primitive.

Judges have limited time.
The first click must happen before wallet connection, registration, or explanation fatigue. The product must be testable in a live browser immediately.

Allowed and refused paths are often separated.
A system that only refuses looks useless. A system that only allows looks unsafe. RefusalRail must show both under the same policy so the judge sees bounded authority rather than refusal theater.

5. Core requirements & priority
P0 demo must-haves

P0.1 — Shock-driven unsafe action attempt creates a persisted refusal receipt.

The /app screen must show shock cards such as MARKET_HALT, STALE_PRICE, and MAX_EXPOSURE. When the judge selects one and runs the unsafe agent attempt, the system must:

Show the attempted RWA standing action.

Refuse the action.

Display a clear “NO” stamp.

Persist a refusal receipt.

Expose receipt ID, policy hash, calldata hash, reason code, shock snapshot, session/owner fields, proof hash, and explorer/deployment evidence where available.

P0.2 — Safe standing action under the same policy creates an allowed receipt for contrast.

The /app screen must also include a safe sweep comparison. The safe path must use the same policy framework but produce an allowed receipt. This proves the agent is bounded, not broken or useless.

P0.3 — Receipt detail/history exposes proof fields for holder and auditor inspection.

The /app/receipts, /app/receipts/:id, and /app/policy screens must make the refusal artifact inspectable. The judge must be able to move from “NO” to a receipt detail table and policy evidence without guessing what happened.

P1 if time remains

Wallet-connected owner mode for live address-based sessions.

Robinhood Chain public testnet toggle when usable.

Additional reason codes such as ASSET_NOT_ALLOWED, SESSION_EXPIRED, or POLICY_VERSION_MISMATCH.

Downloadable receipt JSON.

P2 if time remains

Multi-agent comparison.

Policy template editor.

Attestation export.

Team/admin dashboard.

Public gallery of refusal receipts.

6. Solution overview

RefusalRail is a browser-first workbench with a deterministic refusal rail.

At the product level, the system has five layers:

User-facing demo layer
The judge opens the Cloudflare URL and immediately sees the core claim: “Reject 1 unsafe RWA trade in 60 seconds.” The first CTA takes them to /app.

Shock selection layer
The judge selects a shock condition such as MARKET_HALT, STALE_PRICE, or MAX_EXPOSURE. This creates a concrete failure condition that is easy to understand.

Agent attempt layer
The app presents the agent’s proposed standing action as calldata-like intent. The agent is intentionally trying to act under constrained authority.

Policy/refusal layer
The policy rail checks the proposed action against deterministic policy state. If unsafe, the action is refused. If safe, it is allowed. The refusal is not framed as the model “choosing not to trade”; it is framed as a contract/policy decision.

Receipt/proof layer
The result becomes a persisted receipt. The receipt is visible in history, detail pages, and policy evidence screens. It includes hashes and metadata that a judge can inspect.

The product is intentionally narrow. It does not provide investment advice, execute real securities trades, predict prices, or integrate with live brokerages. It proves one thing well: unsafe agent calldata can become a durable refusal artifact.

7. User flows
Flow A — First-time judge refusal path

Judge opens /.

Judge sees hero copy: “Reject 1 unsafe RWA trade in 60 seconds.”

Judge clicks the primary CTA to enter /app.

Judge selects a shock card, for example MARKET_HALT.

App shows the unsafe agent action preview.

Judge clicks “Run unsafe agent attempt.”

System calls POST /api/runs/refuse.

System returns a refusal result.

UI stamps NO.

UI writes or reads persisted receipt state.

Judge clicks “Inspect receipt.”

Judge lands on /app/receipts/:id.

Judge sees policy hash, calldata hash, reason code, shock snapshot, owner/session fields, proof hash, and relevant explorer/deploy evidence.

Flow B — Safe comparison path

Judge stays on /app.

Judge clicks “Run safe sweep.”

System calls POST /api/runs/safe.

System returns an allowed result under the same policy framework.

UI displays an allowed receipt.

Judge compares refused and allowed receipts in the receipt rail.

Judge understands that the rail is bounded, not universally blocking.

Flow C — Auditor inspection path

Auditor opens /app/receipts.

Auditor toggles role view between holder and auditor.

Auditor selects a receipt.

Receipt detail page shows proof table.

Auditor verifies reason code, hashes, session owner, policy snapshot, and deployed contract references.

Auditor opens /app/policy to inspect the policy matrix and contract evidence.

Flow D — Technical judge proof path

Technical judge opens /about.

Judge reviews architecture and deployment proof.

Judge checks deployed contract addresses:

PolicyRegistry: 0xa9df142D14218CC99f3068CBADC1D1965f7623B7

RefusalReceipt: 0xf6aC320e7C4E865A72c588c89BE23Ff12ca543C3

RefusalHub: 0x3540038833ae8750EfF20e7EfCaE16F206e90Cf8

DemoRWAAsset: 0x320392A010982f8F8F81e9E8aE8aaD083Be69810

Judge checks the refused demo transaction:

0x0b809bc31f75b6ff5947ccb5875dc5df975e1fe379b3a533f8e84454e42bf372

Judge uses /api/health and test evidence to verify the live deployment posture.

8. User Cases
Use Case 1 — Judge validates a refusal in under 60 seconds

Actor: Hackathon judge
Goal: Confirm that unsafe RWA agent calldata is refused and saved.
Trigger: Judge opens the live Cloudflare URL.
Precondition: The app is deployed and API routes are available.
Steps: Open /, click CTA, choose shock, run unsafe attempt, inspect receipt.
Expected result: The app shows a NO stamp and a persisted refusal receipt with proof fields.
Failure handling: If the live chain proof cannot be fetched, the app still shows the persisted Durable Object receipt and static deployed contract evidence.

Use Case 2 — Product judge verifies the agent is useful, not blocked forever

Actor: Product/demo judge
Goal: See both refused and allowed paths under the same policy.
Trigger: Judge runs safe comparison after unsafe attempt.
Precondition: Refusal path has been demonstrated or /app is loaded.
Steps: Click “Run safe sweep,” review allowed receipt, compare to refusal receipt.
Expected result: The safe action is allowed and saved as an allowed receipt.
Failure handling: If the safe API fails, show a retry state and preserve the previous refusal receipt.

Use Case 3 — Technical judge inspects deterministic policy evidence

Actor: Technical judge
Goal: Verify the refusal is not UI-only.
Trigger: Judge opens policy or receipt detail screen.
Precondition: At least one receipt exists or seeded demo receipt is available.
Steps: Open receipt detail, inspect hashes and reason code, open /app/policy, review contract evidence.
Expected result: The app presents policy state, receipt proof fields, deployed addresses, and transaction evidence.
Failure handling: If explorer links are unavailable, show raw addresses and transaction hash as copyable fields.

Use Case 4 — Auditor reviews receipt history

Actor: Auditor
Goal: Review a chronological ledger of refusals and allowed actions.
Trigger: Auditor opens /app/receipts.
Precondition: Durable Object receipt ledger contains seeded or live receipts.
Steps: Toggle auditor role, filter or scan receipt list, open a receipt.
Expected result: Auditor sees clear status labels, reason codes, timestamps, proof hash, and receipt detail.
Failure handling: If no receipts exist, show an empty state with a CTA back to /app to generate a refusal.

9. Demo critical path & Hero Moment
Critical path

The demo must be understandable without wallet setup.

Open https://refusalrail.veithly.workers.dev.

Click the primary CTA.

Select one visible RWA shock condition.

Run the unsafe agent attempt.

Watch the UI stamp NO.

Inspect the persisted refusal receipt.

Hero Moment

The hero moment is the instant the unsafe standing action fails visibly and usefully.

The screen should make three facts obvious at once:

The agent attempted a tokenized-asset standing action.

The policy rail refused it for a named reason.

The refusal became a durable receipt with proof fields.

Recommended hero visual:

A large receipt card slides or locks into place with:

Status: REFUSED

Stamp: NO

Reason: MARKET_HALT, STALE_PRICE, or MAX_EXPOSURE

Policy hash

Calldata hash

Receipt ID

Button: “Inspect proof”

The copy should avoid overexplaining. Suggested UI text:

The agent proposed the trade. The rail said NO. Receipt saved.

Why the failed action is the product

The failure is valuable because it proves the safety boundary. A generic trading agent tries to maximize action. RefusalRail proves delegated authority can be narrow, enforceable, and reviewable. The refusal is not a dead end; it is the audit artifact that makes standing authorization safer.

10. Pages / modules plan
/ — Landing and first CTA

Purpose: Explain the demo in one screen and get the judge to the first click.
Primary CTA: “Run the 60-second refusal.”
Secondary CTA: “View architecture proof.”
Must show:

Hero copy.

“This demo wants the trade to fail.”

Arbitrum Sepolia proof network badge.

Robinhood Chain / RWA standing-action safety framing.

No wallet wall before CTA.

/app — Shock cards, unsafe attempt, safe sweep, receipt rail

Purpose: Main demo workbench.
Primary CTA: “Run unsafe agent attempt.”
Secondary CTA: “Run safe sweep.”
Modules:

Shock card selector:

MARKET_HALT

STALE_PRICE

MAX_EXPOSURE

Agent attempt preview.

Policy decision panel.

NO stamp result.

Safe comparison card.

Recent receipt rail.

Link to receipt detail.

Link to policy matrix.

/app/policy — Policy matrix and contract/policy evidence

Purpose: Prove the refusal is policy-driven.
Modules:

Policy matrix by condition.

Same-policy comparison of refused and allowed paths.

Contract address cards.

Policy hash display.

Refusal reason glossary.

Public explorer proof area.

“Back to demo” CTA.

/app/receipts — Receipt history with holder/auditor role switch

Purpose: Show durable ledger of outcomes.
Modules:

Role switch:

Holder view: plain-language receipt summary.

Auditor view: proof-heavy fields.

Receipt list.

Status chips: REFUSED, ALLOWED.

Reason code.

Timestamp/session.

Receipt ID.

Empty state CTA.

Link to detail page.

/app/receipts/:id — Proof table and receipt detail

Purpose: Inspect one proof artifact.
Modules:

Receipt status header.

Reason code.

Shock snapshot.

Policy hash.

Calldata hash.

Proof hash.

Owner/session fields.

API/contract evidence.

Copy buttons for hash/address fields.

Link back to history.

Link to policy matrix.

/about — Architecture and deployment proof

Purpose: Give technical judges a concise proof map.
Modules:

Architecture diagram in text/card form.

Cloudflare Worker role.

Durable Object SQLite receipt ledger role.

Contract suite:

RefusalHub

PolicyRegistry

RefusalReceipt

DemoRWAAsset

Deployed addresses.

Refused demo transaction.

Limitation section.

Cut list.

Testing evidence summary.

11. Visual direction & UI principles
Visual direction

RefusalRail should look like a safety-critical control rail, not a crypto trading terminal.

Use a crisp, high-contrast interface with:

Strong “NO” stamp motif.

Receipt cards that feel durable and inspectable.

Policy rail language instead of speculative trading language.

Shock cards that feel like test inputs.

Minimal charts; this is not a portfolio dashboard.

Explorer/proof chips that look copyable and verifiable.

UI principles

First click before explanation.
The judge should click into the demo before reading architecture.

Make refusal feel like success.
The refusal state must feel like the primary intended outcome, not an error.

Same policy, two outcomes.
The safe path and unsafe path must sit near each other so the system reads as bounded.

Proof over prose.
Every major claim should have a field, hash, receipt, API route, deployed address, or test selector behind it.

RWA specificity above the fold.
Use “tokenized asset,” “standing action,” “policy rail,” and “receipt” language early. Do not let the app feel like a generic AI bot.

No live-finance ambiguity.
Use clear labels such as “Mock RWA asset,” “No real securities,” and “No financial advice.”

Accessible by default.
All major actions must be keyboard reachable, screen-reader labeled, and usable on mobile.

12. Technical constraints
Existing frontend/backend

Cloudflare Worker rendered HTML.

Custom CSS.

No SPA requirement.

Routes are already defined and should be aligned, not replaced.

Existing state layer

Cloudflare Durable Object.

SQLite-backed storage.

Receipt ledger must persist refused and allowed receipts.

Existing routes

/

/app

/app/policy

/app/receipts

/app/receipts/:id

/about

Existing APIs

POST /api/runs/refuse

POST /api/runs/safe

GET /api/receipts

GET /api/receipts/:id

GET /api/policy

GET /api/health

Existing contracts

RefusalHub

PolicyRegistry

RefusalReceipt

DemoRWAAsset

Current deployed proof network

Arbitrum Sepolia.

Current deployed addresses

PolicyRegistry: 0xa9df142D14218CC99f3068CBADC1D1965f7623B7

RefusalReceipt: 0xf6aC320e7C4E865A72c588c89BE23Ff12ca543C3

RefusalHub: 0x3540038833ae8750EfF20e7EfCaE16F206e90Cf8

DemoRWAAsset: 0x320392A010982f8F8F81e9E8aE8aaD083Be69810

Current refused demo transaction

0x0b809bc31f75b6ff5947ccb5875dc5df975e1fe379b3a533f8e84454e42bf372

Environment constraints

PRIVATE_KEY is for local contract deployment only.

PRIVATE_KEY is read from $HOME/use_key.txt.

PRIVATE_KEY must never be committed.

ARBITRUM_SEPOLIA_RPC_URL is required for contract deployment.

CLOUDFLARE_API_TOKEN or Wrangler login is required for deploy.

Product constraints

No real securities.

No financial advice.

No live brokerage integration.

No price prediction.

No general-purpose trading bot.

No portfolio dashboard.

13. Success metrics
Hackathon demo success

Judge reaches /app from / in one click.

Judge can produce a refused receipt in under 60 seconds.

Judge can produce an allowed receipt under the same policy.

Judge can inspect a receipt detail page with proof fields.

Judge can find deployed addresses and transaction proof.

Judge can explain the product in one sentence: “It refuses unsafe RWA agent calldata and saves a proof receipt.”

Product clarity success

The UI makes clear that the demo wants the unsafe trade to fail.

RWA standing-action framing is visible before the first run.

The refusal does not look like a generic error.

The allowed path makes the system feel useful, not blocked.

Technical credibility success

Receipt history persists across page reloads.

APIs return consistent receipt fields.

Policy page matches receipt detail fields.

Contract addresses are visible and copyable.

/api/health confirms deployment health.

Playwright tests cover refusal, safe run, receipt detail, policy evidence, and no-wallet first click.

14. Risks & cut list
Key risks

Risk: The product feels thin or theatrical.
Mitigation: Make the policy matrix, receipt hashes, deployed contract addresses, and transaction proof visible. Show both refused and allowed paths under the same policy.

Risk: The refusal looks UI-only.
Mitigation: Every refusal must map to persisted receipt state and proof fields. The receipt detail must include policy hash, calldata hash, reason code, shock snapshot, owner/session fields, and proof hash.

Risk: Robinhood Chain / RWA alignment is not obvious.
Mitigation: Put “RWA standing-action safety rail” in the landing page, app header, policy page, and about page. Use DemoRWAAsset and tokenized-asset language throughout. Explain Robinhood Chain as the RWA-aligned destination when public testnet resources are usable, with Arbitrum Sepolia as the current deployed proof network.

Risk: The agent appears useless because it only refuses.
Mitigation: Safe sweep comparison is P0. It must create an allowed receipt under the same policy.

Risk: Live chain or explorer access is flaky during judging.
Mitigation: Persist receipts in Durable Object storage and show raw deployed addresses/transaction hashes as copyable fallback proof.

Risk: Too much explanation slows the demo.
Mitigation: Keep landing short. First CTA must happen before wallet, registration, or architecture reading.

Cut list

Real securities.

Financial advice.

Live brokerage integration.

Portfolio dashboard.

Price prediction.

General-purpose trading bot.

AI trading chatbot.

Static APY cards.

Generic risk score.

Dune dashboard as product.

Wallet dashboard as the main product.

Policy editor unless all P0 flows are complete.

Complex wallet connection unless no-wallet path is already excellent.

2. Detailed UIUX Interaction Plan
Screen map
Route	Screen	Primary user action	System response	State changed	Proof shown
/	Landing	Click “Run the 60-second refusal”	Navigates to /app	None required	Arbitrum Sepolia badge, RWA standing-action framing
/app	Refusal workbench	Select shock card	Marks selected shock and updates agent attempt preview	Local selected shock state	Reason code preview
/app	Refusal workbench	Click “Run unsafe agent attempt”	Calls POST /api/runs/refuse, shows loading, then NO stamp	Durable Object receipt created	Receipt ID, reason code, policy hash, calldata hash, proof hash
/app	Safe comparison	Click “Run safe sweep”	Calls POST /api/runs/safe, shows allowed result	Durable Object allowed receipt created	Allowed receipt fields under same policy
/app	Receipt rail	Click receipt card	Navigates to /app/receipts/:id	None	Receipt summary
/app/policy	Policy matrix	Inspect policy row	Expands or highlights policy evidence	Optional local expanded row state	Policy hash, reason codes, contract addresses
/app/receipts	Receipt history	Toggle holder/auditor role	Switches field density and labels	Local role view state	Holder summary or auditor proof fields
/app/receipts	Receipt history	Open receipt	Navigates to detail page	None	Receipt ID and status
/app/receipts/:id	Receipt detail	Copy hash/address or inspect table	Copies field; keeps proof table visible	Optional copied-field UI state	Full proof table
/about	Architecture proof	Review deployment evidence	Shows architecture and deployed addresses	None	Contract addresses, tx hash, API list, limitations
/api/health	Health endpoint	Technical check	Returns deployment/API health	None	Health status
First-run flow
0-10 seconds

User perception: “This demo wants the trade to fail.”

Landing page opens.

Hero copy is visible.

RWA standing-action safety rail is visible.

Primary CTA is obvious.

No wallet wall, no registration, no dense architecture block.

Required above-the-fold elements:

“Reject 1 unsafe RWA trade in 60 seconds.”

“This demo wants the trade to fail.”

“Mock RWA asset · Arbitrum Sepolia proof · Robinhood Chain-aligned standing actions.”

CTA: “Run the 60-second refusal.”

10-30 seconds

User perception: “I can choose the failure condition.”

Judge is on /app.

Three shock cards are visible:

MARKET_HALT

STALE_PRICE

MAX_EXPOSURE

Selecting a card updates the attempted action preview.

The unsafe run button becomes primary.

Required copy:

Pick the condition the agent must not cross.

30-60 seconds

User perception: “The unsafe action was rejected and saved.”

Judge clicks “Run unsafe agent attempt.”

Loading state shows “Agent proposing calldata… policy rail checking…”

Result panel stamps NO.

Receipt rail receives a new refused receipt.

“Inspect proof” CTA appears.

Required proof fields on success card:

Receipt ID

Status: REFUSED

Reason code

Policy hash

Calldata hash

Proof hash

2-3 minutes

User perception: “The rail is bounded, not useless.”

Judge runs safe sweep.

Allowed receipt appears.

Judge compares refused and allowed paths.

Judge opens /app/policy.

Policy matrix shows why one action was refused and one was allowed.

Required proof:

Same policy hash or policy family shown across both outcomes.

Allowed receipt has status ALLOWED.

Refused receipt has status REFUSED.

5 minutes / Q&A

User perception: “This is not UI-only.”

Judge opens /about.

Judge sees architecture, contract suite, deployed addresses, refused demo tx, API routes, and limitations.

Judge opens receipt detail page.

Judge can copy fields and inspect deployed proof.

Required Q&A answer supported by UI:

No, this is not just a UI refusal. The UI is wired to deterministic policy state, persisted receipts, and deployed Solidity contracts.

P0 screen interaction states
P0 Screen 1 — / Landing
Default state

Hero headline visible.

Subtitle explains RWA standing-action safety rail.

Primary CTA visible.

Secondary architecture link visible.

Arbitrum Sepolia proof network badge visible.

Robinhood Chain / RWA alignment visible.

“No real securities · no financial advice” disclaimer visible but not dominant.

Loading state

Not required for static render. If the page checks /api/health, show a small non-blocking status chip:

Proof API online

Checking proof API…

Proof API fallback mode

The CTA must remain usable even if health check fails.

Empty state

Not applicable.

Error state

If the landing page cannot fetch health/proof metadata:

Do not block demo entry.

Show: “Live proof metadata unavailable. Demo still available with persisted receipt fallback.”

Keep CTA active.

Success state

Successful landing means the judge clicks CTA and reaches /app.

Keyboard/touch behavior

Primary CTA must be first or near-first tab stop after skip link.

Enter/Space activates CTA.

CTA target area should be large enough for mobile touch.

No hover-only explanation.

Accessibility note

Use one clear h1.

CTA has descriptive accessible name.

Badges must not be the only source of meaning.

Disclaimer text must have sufficient contrast.

State transition

/ → /app

No persisted state required.

Proof artifact

Network badge: Arbitrum Sepolia.

RWA/Robinhood Chain alignment copy.

Link to /about.

Test selectors

[data-testid="landing-hero"]

[data-testid="landing-primary-cta"]

[data-testid="network-proof-badge"]

[data-testid="rwa-alignment-copy"]

[data-testid="landing-about-link"]

P0 Screen 2 — /app Refusal workbench
Default state

Header repeats the core demo job.

Shock cards are visible.

One default shock may be preselected, preferably MARKET_HALT, to reduce friction.

Agent attempt preview is visible.

“Run unsafe agent attempt” button is visible.

Safe comparison panel is visible but secondary.

Receipt rail shows latest persisted receipts or seeded demo receipt.

Recommended default copy:

The agent can propose. The rail decides.

Loading state

When user runs unsafe attempt:

Disable only the active run button.

Keep shock cards visible.

Show progress steps:

Agent proposed tokenized-asset calldata

Policy rail checked standing-action bounds

Receipt being saved

Do not show a generic spinner alone.

Empty state

If no receipts exist:

Receipt rail shows: “No receipts yet. Run the unsafe attempt to stamp the first NO.”

CTA remains focused on unsafe attempt.

Error state

If POST /api/runs/refuse fails:

Show inline error in the result panel.

Preserve selected shock.

Show retry button.

Show fallback link to seeded refused demo tx and /about.

Do not create a fake success receipt.

Suggested copy:

Refusal run failed before receipt persistence. Retry, or inspect deployed proof on the About page.

Success state

After POST /api/runs/refuse succeeds:

Large NO stamp appears.

Receipt card is inserted at top of receipt rail.

“Inspect proof” button links to /app/receipts/:id.

Safe sweep CTA becomes more visible.

Required success fields:

Status: REFUSED

Reason code

Shock snapshot

Policy hash

Calldata hash

Proof hash

Receipt ID

Keyboard/touch behavior

Shock cards are radio-like controls.

Arrow keys move between shock cards.

Enter/Space selects a shock.

Run button is reachable after shock selection.

Result card should receive focus after successful run.

Touch cards must be large and separated enough for mobile.

Accessibility note

Shock cards use aria-pressed or radio semantics.

Loading progress uses aria-live="polite".

Final NO result uses aria-live="assertive" or equivalent result announcement.

Hash fields have readable labels, not raw unlabeled strings.

State transition

Default:

selectedShock = MARKET_HALT
runStatus = idle
receipts = fetched from GET /api/receipts

On unsafe run:

runStatus = refusing
POST /api/runs/refuse
runStatus = refused
receiptLedger += refusedReceipt

On safe run:

runStatus = allowing
POST /api/runs/safe
runStatus = allowed
receiptLedger += allowedReceipt

Proof artifact

Refused receipt.

Allowed receipt.

Policy hash.

Calldata hash.

Reason code.

Shock snapshot.

Proof hash.

Link to receipt detail.

Link to policy page.

Test selectors

[data-testid="app-shell"]

[data-testid="shock-card-market-halt"]

[data-testid="shock-card-stale-price"]

[data-testid="shock-card-max-exposure"]

[data-testid="agent-attempt-preview"]

[data-testid="run-refuse-button"]

[data-testid="run-safe-button"]

[data-testid="refusal-loading-steps"]

[data-testid="no-stamp"]

[data-testid="refused-receipt-card"]

[data-testid="allowed-receipt-card"]

[data-testid="receipt-rail"]

[data-testid="inspect-proof-link"]

[data-testid="run-error-panel"]

P0 Screen 3 — /app/policy Policy matrix
Default state

Policy matrix visible.

Reason code glossary visible.

Same-policy refused/allowed explanation visible.

Contract address cards visible.

Current policy hash visible.

Link back to /app visible.

Suggested rows:

Policy condition	Unsafe example	Safe example	Refusal reason
Market state	Trade during halt	Sweep while market open	MARKET_HALT
Price freshness	Use stale oracle snapshot	Use fresh snapshot	STALE_PRICE
Exposure bound	Exceed max exposure	Stay below cap	MAX_EXPOSURE
Loading state

If GET /api/policy is used:

Show skeleton rows for policy matrix.

Keep static contract evidence visible if available.

Do not hide navigation.

Empty state

If API returns no policy data:

Show static fallback policy explanation.

Mark it as fallback.

Link to /about.

Error state

If policy API fails:

Show: “Policy API unavailable. Showing deployed contract evidence and fallback matrix.”

Keep deployed addresses visible.

Keep receipt links active.

Success state

Policy data loaded.

Policy hash visible.

Matrix rows match reason codes used by receipts.

Contract cards show deployed addresses.

Keyboard/touch behavior

Matrix rows are readable without hover.

Expandable rows use Enter/Space.

Copy buttons are keyboard reachable.

On mobile, rows collapse into cards.

Accessibility note

Use semantic table where possible.

If converted to cards on mobile, preserve row/column labels.

Copy buttons must announce copied state.

Hashes should be truncated visually but available through copy/action labels.

State transition

policyStatus = loading
GET /api/policy
policyStatus = success | error
policyMatrix = apiData || fallbackData

Proof artifact

Policy hash.

Reason code definitions.

Deployed contract addresses.

RefusalHub evidence.

PolicyRegistry evidence.

RefusalReceipt evidence.

DemoRWAAsset evidence.

Test selectors

[data-testid="policy-page"]

[data-testid="policy-matrix"]

[data-testid="policy-hash"]

[data-testid="reason-code-market-halt"]

[data-testid="reason-code-stale-price"]

[data-testid="reason-code-max-exposure"]

[data-testid="contract-policy-registry"]

[data-testid="contract-refusal-receipt"]

[data-testid="contract-refusal-hub"]

[data-testid="contract-demo-rwa-asset"]

[data-testid="policy-api-error"]

P0 Screen 4 — /app/receipts Receipt history
Default state

Receipt history list visible.

Holder/auditor role switch visible.

Most recent receipt appears first.

Status chips are visible.

Refused and allowed receipts are visually distinct.

Each receipt links to detail.

Loading state

When fetching GET /api/receipts:

Show skeleton receipt rows.

Keep role switch visible but disabled until data loads.

Keep link back to /app.

Empty state

If no receipts exist:

Show: “No receipts yet.”

CTA: “Run unsafe attempt.”

Explain that the ledger will show refused and allowed standing-action receipts.

Error state

If receipt fetch fails:

Show retry button.

Show link to /app.

Show link to /about for deployed proof fallback.

Do not show stale data as fresh unless clearly labeled.

Success state

Receipt list renders.

Role switch changes field density:

Holder view: status, reason, plain-language summary, timestamp.

Auditor view: status, reason, policy hash, calldata hash, proof hash, session/owner.

Opening a receipt navigates to detail page.

Keyboard/touch behavior

Role switch is keyboard operable.

Receipt cards are links with clear focus states.

Cards have large mobile touch targets.

No horizontal scrolling for critical proof fields on mobile.

Accessibility note

Status chips include text, not color alone.

Role switch has accessible label.

Receipt count is announced or visible.

Empty/error states have clear headings.

State transition

receiptStatus = loading
GET /api/receipts
receiptStatus = success | empty | error
roleView = holder | auditor

Proof artifact

Receipt ID.

Status.

Reason code.

Policy hash in auditor view.

Calldata hash in auditor view.

Proof hash in auditor view.

Link to receipt detail.

Test selectors

[data-testid="receipts-page"]

[data-testid="role-switch-holder"]

[data-testid="role-switch-auditor"]

[data-testid="receipt-list"]

[data-testid="receipt-card"]

[data-testid="receipt-status-refused"]

[data-testid="receipt-status-allowed"]

[data-testid="receipt-empty-state"]

[data-testid="receipt-fetch-error"]

P0 Screen 5 — /app/receipts/:id Receipt detail
Default state

Receipt status header visible.

Proof table visible.

Back links visible.

Copy buttons visible for hashes and addresses.

Plain-language interpretation visible above or beside proof table.

Required fields:

Receipt ID

Status

Reason code

Shock snapshot

Policy hash

Calldata hash

Proof hash

Owner/session fields

Created timestamp

Related contract evidence

Related transaction evidence where available

Loading state

When fetching GET /api/receipts/:id:

Show skeleton proof table.

Keep back link to receipts.

Do not show partial fake values.

Empty state

Not applicable for a specific ID. Use not-found state instead.

Error state

If receipt ID is missing or not found:

Show: “Receipt not found.”

CTA: “View receipt history.”

CTA: “Run a new refusal.”

Do not redirect automatically.

If API fails:

Show retry button.

Preserve the receipt ID in the URL.

Link to /about fallback proof.

Success state

Receipt detail renders.

The status header matches the receipt.

All required proof fields are present.

Copy interactions work.

Links to /app/policy and /about are visible.

Keyboard/touch behavior

Back link first.

Proof table is navigable by screen reader.

Copy buttons are reachable and announce copied state.

Long hashes wrap or truncate safely without breaking layout.

Accessibility note

Use clear field labels.

Do not rely on monospace hash blocks alone.

NO stamp must have text alternative such as “Receipt status refused.”

Success/error notices use appropriate live regions.

State transition

detailStatus = loading
GET /api/receipts/:id
detailStatus = success | notFound | error
copiedField = null | fieldName

Proof artifact

Full proof table.

Receipt ID.

Policy hash.

Calldata hash.

Proof hash.

Reason code.

Shock snapshot.

Session/owner.

Contract evidence.

Transaction hash if applicable.

Test selectors

[data-testid="receipt-detail-page"]

[data-testid="receipt-detail-status"]

[data-testid="receipt-detail-reason"]

[data-testid="receipt-detail-policy-hash"]

[data-testid="receipt-detail-calldata-hash"]

[data-testid="receipt-detail-proof-hash"]

[data-testid="receipt-detail-shock-snapshot"]

[data-testid="receipt-detail-owner-session"]

[data-testid="copy-policy-hash"]

[data-testid="receipt-not-found"]

[data-testid="receipt-detail-error"]

P0 Screen 6 — /about Architecture and deployment proof
Default state

Architecture explanation visible.

Contract suite visible.

Deployed addresses visible.

Refused demo transaction visible.

API route list visible.

Limitations visible.

Cut list visible.

Link back to /app.

Loading state

Not required unless /api/health is checked. If checked:

Show health chip.

Do not block static proof content.

Empty state

Not applicable.

Error state

If health check fails:

Show: “Health check unavailable. Static deployment proof still shown.”

Keep addresses and tx hash visible.

Success state

Health status confirms live service.

Static proof remains visible.

Judge can copy addresses and transaction hash.

Keyboard/touch behavior

Copy buttons are keyboard reachable.

Long addresses wrap on mobile.

Architecture cards stack vertically on small screens.

Accessibility note

Use headings for architecture, contracts, APIs, limitations.

Raw hashes have accessible labels.

Copy confirmation is announced.

State transition

Optional:

healthStatus = loading
GET /api/health
healthStatus = online | fallback

Proof artifact

Contract addresses.

Refused demo transaction.

API route list.

Architecture map.

Limitation section.

Deployment network.

Test selectors

[data-testid="about-page"]

[data-testid="architecture-summary"]

[data-testid="deployed-addresses"]

[data-testid="refused-demo-tx"]

[data-testid="api-route-list"]

[data-testid="limitations-section"]

[data-testid="health-status"]

Demo choreography
Moment	Judge input	Live consequence	Proof artifact	Fallback	Big-screen staging	Mobile QR behavior
Landing	Opens URL	Hero claim appears	Network/RWA badge	Static page still works if health fails	Browser zoom 110-125%; CTA centered	QR points to /
Enter app	Clicks CTA	/app loads	Shock cards and receipt rail	Default shock preselected	Keep app header and cards visible	QR can point directly to /app for short demos
Shock choice	Clicks MARKET_HALT, STALE_PRICE, or MAX_EXPOSURE	Agent preview updates	Reason code preview	Default to MARKET_HALT if no choice	Presenter reads only one sentence	Cards stack vertically
Unsafe run	Clicks run button	Loading steps then NO stamp	Refused receipt	Show retry plus /about proof	Large NO stamp should be visible from back of room	Result card appears above receipt rail
Inspect proof	Clicks receipt	Detail page opens	Full proof table	Receipt history link if ID fails	Increase zoom if hashes are small	Copy buttons remain tappable
Safe contrast	Clicks safe sweep	Allowed receipt appears	Allowed receipt under same policy	Preserve refused receipt if safe call fails	Show refused/allowed side-by-side if width allows	Stack refused then allowed
Q&A proof	Opens /about	Architecture and addresses visible	Contract addresses and tx hash	Static proof content	Use one screen, avoid scrolling through README	QR to /about optional
Implementation notes
Components

LandingHero

ProofNetworkBadge

ShockCardGroup

ShockCard

AgentAttemptPreview

PolicyDecisionPanel

NoStamp

ReceiptCard

ReceiptRail

SafeSweepPanel

PolicyMatrix

ContractEvidenceCard

ReceiptHistoryList

RoleSwitch

ReceiptProofTable

CopyFieldButton

HealthStatusChip

ArchitectureProofPanel

LimitationsPanel

Data/API dependencies
Component	API dependency	Required fields
ShockCardGroup	None or GET /api/policy	reason codes, labels
AgentAttemptPreview	Local selected shock, policy data	action summary, mock asset, calldata preview/hash
PolicyDecisionPanel	POST /api/runs/refuse, POST /api/runs/safe	status, reason, receipt ID, hashes
ReceiptRail	GET /api/receipts	recent receipts
ReceiptHistoryList	GET /api/receipts	receipt list
ReceiptProofTable	GET /api/receipts/:id	full receipt detail
PolicyMatrix	GET /api/policy	policy hash, reason matrix
HealthStatusChip	GET /api/health	health status
ArchitectureProofPanel	Static config plus optional health	addresses, tx hash, network
Storage/state dependencies

The Durable Object SQLite-backed receipt ledger must store or return enough fields to render every P0 proof artifact.

Minimum receipt data model:

Field	Purpose
id	Detail route and receipt identity
status	REFUSED or ALLOWED
reasonCode	Why refused, or safe reason for allowed
shockSnapshot	Judge-selected condition at run time
policyHash	Links result to policy state
calldataHash	Links result to attempted action
proofHash	Durable receipt proof field
owner	Holder/session owner
sessionId	Demo session grouping
asset	Mock RWA asset reference
chain	Arbitrum Sepolia current proof network
contractRefs	Relevant contract addresses
txHash	Refused demo tx or run-specific tx if available
createdAt	Ordering and audit trail
External integrations

Arbitrum Sepolia explorer links for deployed addresses and refused demo transaction.

Robinhood Chain positioning in UI copy as the primary RWA story when public testnet resources are usable.

No live brokerage integration.

No real securities data.

No real trade execution.

No price prediction feed.

Playwright coverage

Required browser tests:

Landing page CTA loads /app.

/app renders shock cards without wallet connection.

Selecting MARKET_HALT updates attempt preview.

Unsafe run calls refusal API and renders NO stamp.

Unsafe run creates visible refused receipt card.

“Inspect proof” opens /app/receipts/:id.

Receipt detail contains policy hash, calldata hash, reason code, shock snapshot, owner/session fields, and proof hash.

Safe sweep creates allowed receipt.

Receipt history shows both refused and allowed statuses.

Policy page shows matrix, policy hash, and deployed contract addresses.

About page shows deployed addresses and refused demo tx.

Error-state mocks show retry/fallback without fake success.

Keyboard navigation can select shock and run refusal.

Mobile viewport preserves CTA, shock cards, NO stamp, and receipt proof access.

3. Scope Discipline
P0 demo must-haves

Exactly three P0 demo must-haves:

Unsafe shock run stamps NO and persists a refusal receipt.
The judge must be able to choose a shock, run the unsafe attempt, see a refusal, and inspect saved proof.

Safe sweep under the same policy creates an allowed receipt.
The judge must see that the agent is bounded, not useless.

Receipt and policy evidence are inspectable in browser.
The judge must be able to inspect history, receipt detail, policy matrix, deployed addresses, and proof fields.

P1 only if time remains

Wallet-connected owner/session mode.

Robinhood Chain public testnet deployment or toggle when usable.

Download receipt JSON.

Additional policy reason codes.

Better explorer deep links.

Receipt filtering by status or reason.

P2 only if time remains

Multi-agent comparison.

Policy editor.

Public receipt gallery.

Attestation export.

Admin dashboard.

Visual architecture diagram beyond simple cards.

Explicit non-goals and cut list

RefusalRail must not become:

A live trading product.

A brokerage integration.

A securities product.

A financial advice app.

A price prediction product.

A portfolio dashboard.

A generic AI trading chatbot.

A generic wallet dashboard.

A static APY card interface.

A Dune dashboard as product.

A broad DeFAI assistant.

A general-purpose trading bot.

Risk mitigation and fallback plan
Risk	Mitigation	Fallback
API refusal run fails during judging	Show retry and preserve selected shock	Link to seeded refused demo tx and /about
Receipt persistence fails	Do not show fake success	Show “receipt not persisted” error and retry
Explorer unavailable	Keep raw addresses and tx hash visible	Copyable fields on /about
Policy API unavailable	Show static fallback matrix	Label fallback clearly
Safe sweep fails	Preserve refused receipt	Retry safe path; explain bounded contrast from policy page
Judge thinks it is UI-only	Route to receipt detail and policy page	Show deployed addresses and proof fields
RWA alignment feels weak	Repeat “mock RWA asset” and “standing-action safety rail” in key screens	Use /about limitation and Robinhood Chain alignment copy
Demo runs long	Default MARKET_HALT selected	Presenter clicks unsafe run immediately
4. Traceability
P0 traceability matrix
P0 requirement	Route	API	Data fields	State changed	Test evidence	Deploy evidence
P0.1 Unsafe shock run creates persisted refusal receipt	/app, /app/receipts/:id	POST /api/runs/refuse, GET /api/receipts/:id	id, status=REFUSED, reasonCode, shockSnapshot, policyHash, calldataHash, proofHash, owner, sessionId, createdAt, contractRefs, txHash	Selected shock becomes persisted refused receipt in Durable Object ledger	Playwright: select shock, run refusal, see NO, open receipt detail, assert proof fields	Arbitrum Sepolia; RefusalHub, PolicyRegistry, RefusalReceipt, DemoRWAAsset; refused demo tx
P0.2 Safe standing action creates allowed receipt under same policy	/app, /app/receipts, /app/receipts/:id	POST /api/runs/safe, GET /api/receipts, GET /api/receipts/:id	id, status=ALLOWED, policyHash, calldataHash, proofHash, owner, sessionId, createdAt, asset, contractRefs	Safe run becomes persisted allowed receipt in Durable Object ledger	Playwright: run safe sweep, assert allowed receipt, compare with refused receipt	Same deployed policy/contract evidence shown on /app/policy and /about
P0.3 Receipt detail/history exposes inspectable proof	/app/receipts, /app/receipts/:id, /app/policy, /about	GET /api/receipts, GET /api/receipts/:id, GET /api/policy, GET /api/health	Receipt list, full receipt proof table, policy matrix, reason codes, deployed addresses, health status	Role view changes local display; no proof mutation	Playwright: receipt history role switch, receipt detail proof fields, policy matrix, about deployed addresses	Cloudflare URL, Durable Object ledger, Arbitrum Sepolia addresses, refused demo tx
Route-level evidence checklist
Route	Required state	Required proof	Required test
/	None	RWA standing-action framing, Arbitrum Sepolia badge, /about link	CTA navigates to /app; no wallet wall
/app	Selected shock, run status, receipt rail	NO stamp, refused receipt, allowed receipt, hashes	Shock selection, refusal run, safe run, receipt link
/app/policy	Policy fetch or fallback matrix	Policy hash, reason code matrix, contract addresses	Matrix renders; policy hash and addresses visible
/app/receipts	Receipt list, role view	Status, reason code, hashes in auditor mode	List renders; role switch works; receipt opens
/app/receipts/:id	Receipt detail fetch state	Full proof table	Required proof fields visible; not-found handled
/about	Optional health status	Architecture, deployed addresses, tx hash, limitations	Addresses and tx hash visible; health fallback handled
API-level evidence checklist
API	Required behavior	Required persistence/proof
POST /api/runs/refuse	Creates a refused run from selected shock	Must persist refused receipt with reason code, shock snapshot, policy hash, calldata hash, proof hash
POST /api/runs/safe	Creates an allowed safe sweep under same policy framework	Must persist allowed receipt with comparable hash/proof fields
GET /api/receipts	Returns receipt history	Must include enough fields for holder/auditor list views
GET /api/receipts/:id	Returns one full receipt	Must include all proof table fields
GET /api/policy	Returns policy matrix/evidence	Must include reason codes and policy hash
GET /api/health	Returns service health	Must support live deployment confidence, but cannot block demo
Contract/deploy evidence checklist
Contract or proof item	Product role	UI location
PolicyRegistry — 0xa9df142D14218CC99f3068CBADC1D1965f7623B7	Stores or represents deterministic policy posture	/app/policy, /about, receipt detail contract refs
RefusalReceipt — 0xf6aC320e7C4E865A72c588c89BE23Ff12ca543C3	Receipt artifact contract	/about, receipt detail
RefusalHub — 0x3540038833ae8750EfF20e7EfCaE16F206e90Cf8	Refusal decision hub	/app/policy, /about
DemoRWAAsset — 0x320392A010982f8F8F81e9E8aE8aaD083Be69810	Mock tokenized asset used for demo	/app, /app/policy, /about
Refused demo tx — 0x0b809bc31f75b6ff5947ccb5875dc5df975e1fe379b3a533f8e84454e42bf372	Public refusal proof	/about, receipt detail fallback
Cloudflare URL — https://refusalrail.veithly.workers.dev	Live browser demo	Submission, /about
Block-coding rule

Do not add or polish non-P0 features until every P0 interaction has all three of the following:

State evidence — the interaction changes or reads defined app/Durable Object state.

Proof evidence — the interaction exposes a receipt, hash, reason code, policy field, contract address, transaction hash, or health proof.

Test evidence — the interaction has a Playwright selector and a browser test assertion.

Any P0 interaction missing state, proof, or test evidence blocks further coding.