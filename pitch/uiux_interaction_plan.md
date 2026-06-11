# UIUX Interaction Plan

## Source

- GPT Pro spec response: `pitch/gpt-pro/responses/spec/01-best-prd-uiux-response.md`
- Selected idea: RefusalRail, "Reject 1 unsafe RWA trade and block it with a NO receipt."
- PRD: `pitch/project_prd.md`
- Live product: `https://refusalrail.veithly.workers.dev`

## Screen Map

| Route | Screen | Primary user action | System response | State changed | Proof shown |
|---|---|---|---|---|---|
| `/` | Landing hero | Click "Run refused trade", "Connect wallet", or "Use test wallet" | Navigates to `/app`, connects browser wallet, or activates the test wallet without a private-key import | Wallet mode, optional wallet address | Hero claim, wallet status, Arbitrum Sepolia hub, RWA standing-action framing |
| `/app` | Refusal workbench | Connect wallet or use test wallet; select `MARKET_HALT`, `STALE_PRICE`, or `MAX_EXPOSURE`; click "Let the agent try" | Calls `POST /api/runs/refuse`, stamps `NO`, appends receipt | Wallet address, selected shock, run status, persisted receipt | Receipt id, wallet address, reason code, policy hash, calldata hash, proof hash |
| `/app` | Safe contrast | Click "Run safe sweep" | Calls `POST /api/runs/safe`, appends allowed receipt | Safe run status, persisted allowed receipt | Allowed receipt under same policy hash |
| `/app/policy` | Policy matrix | Inspect reason-code rows and contract cards | Loads policy evidence or static fallback | Optional policy fetch state | Policy hash, reason codes, deployed contract addresses |
| `/app/receipts` | Receipt history | Switch holder/auditor role; open a receipt | Loads public receipt ledger and role-density view | Role view, selected receipt | Status, reason, owner/session, policy/calldata/proof hashes |
| `/app/receipts/:id` | Receipt detail | Copy proof fields or return to history | Loads one receipt proof table | Detail fetch/copy state | Shock snapshot, reason code, policy hash, calldata hash, proof hash, tx/deploy fields |
| `/app/build` | Architecture proof | Inspect deployment and limitation cards | Loads static proof plus optional health status | Optional health status | Cloudflare Worker, Durable Object, contract suite, deployed addresses, refused demo tx |

## First-Run Flow

- 0-10s: Judge opens `/`, reads "Reject 1 unsafe RWA trade in 60 seconds", and clicks the primary CTA.
- 10-30s: Judge lands on `/app`, selects a shock card, and sees the agent attempt preview change.
- 30-60s: Judge clicks "Let the agent try"; the app calls the refusal API, stamps `NO`, and shows a saved refusal receipt.
- 2-3min: Judge clicks into receipt detail, then runs the safe sweep to compare refused and allowed outcomes under the same policy.
- 5min/Q&A: Judge opens `/app/policy` and `/app/build` to inspect policy hash, reason codes, deployed addresses, and the Arbitrum Sepolia refused demo transaction.

## Interaction Details

### `/` Landing Hero

- Default state: Hero copy, RWA safety rail framing, proof badges, and primary CTA are visible.
- Loading state: Not needed for static hero content.
- Empty state: Not applicable.
- Error state: If health status is unavailable, the hero remains usable and proof links still point to `/app/build`.
- Success state: CTA reaches `/app` in one click.
- Keyboard/touch behavior: CTA is focusable, has a visible focus ring, and meets mobile tap target sizing.
- Accessibility note: Hero claim is an `h1`; CTA text names the action.
- State transition: No app state changes before `/app`; the route changes only.
- Proof artifact: Arbitrum Sepolia deployment badge and RWA standing-action copy.
- Test selectors: `[data-testid="hero-headline"]`, `[data-testid="hero-cta"]`, `[data-testid="proof-network-badge"]`.

### `/app` Refusal Workbench

- Default state: Shock cards, agent attempt card, policy decision panel, safe sweep action, and receipt rail are visible.
- Loading state: After "Let the agent try", disable action buttons and show verdict progress without clearing the selected shock.
- Empty state: If the receipt rail is empty, show a short prompt to run the unsafe attempt.
- Error state: If `POST /api/runs/refuse` fails, keep selected shock visible, show retry copy, and do not render a fake receipt.
- Success state: `NO` stamp appears, latest refused receipt card is appended, and "Inspect proof" links to `/app/receipts/:id`.
- Keyboard/touch behavior: Shock cards are button-like controls with selected state; Enter/Space activates run buttons; mobile cards stack without horizontal scroll.
- Accessibility note: Refused/allowed status uses text, not color alone; result notices use an aria-live region.
- State transition: `selectedShock -> runStatus=loading -> runStatus=refused -> latestReceiptId`.
- Proof artifact: Refused receipt id, reason code, shock snapshot, policy hash, calldata hash, proof hash, and tx/deploy references where available.
- Test selectors: `[data-testid="shock-card-market-halt"]`, `[data-testid="shock-card-stale-price"]`, `[data-testid="shock-card-max-exposure"]`, `[data-testid="run-refusal"]`, `[data-testid="run-safe"]`, `[data-testid="no-stamp"]`, `[data-testid="receipt-rail"]`, `[data-testid="open-latest-receipt"]`.

### `/app/policy` Policy Matrix

- Default state: Policy matrix, reason-code glossary, same-policy refused/allowed comparison, and contract address cards are visible.
- Loading state: If `GET /api/policy` is used, skeleton rows may load while static contract proof stays visible.
- Empty state: If no dynamic policy rows return, show the fallback policy matrix and label it clearly.
- Error state: Show "Policy API unavailable. Showing deployed contract evidence and fallback matrix."
- Success state: Policy hash, reason codes, and contract cards render together.
- Keyboard/touch behavior: Matrix rows can collapse into cards on mobile; copy buttons are reachable by keyboard.
- Accessibility note: Use table semantics on desktop and preserve labels when rows become mobile cards.
- State transition: `policyStatus=loading -> success|fallback|error`.
- Proof artifact: Policy hash, `MARKET_HALT`, `STALE_PRICE`, `MAX_EXPOSURE`, `RefusalHub`, `PolicyRegistry`, `RefusalReceipt`, and `DemoRWAAsset`.
- Test selectors: `[data-testid="policy-page"]`, `[data-testid="policy-matrix"]`, `[data-testid="policy-hash"]`, `[data-testid="contract-refusal-hub"]`, `[data-testid="contract-policy-registry"]`, `[data-testid="contract-refusal-receipt"]`, `[data-testid="contract-demo-rwa-asset"]`.

### `/app/receipts` Receipt History

- Default state: Receipt list, holder/auditor role switch, status chips, and newest-first ordering are visible.
- Loading state: Skeleton receipt rows keep the role switch area stable.
- Empty state: Show "No receipts yet" plus a CTA back to `/app`.
- Error state: Show retry and a link back to the workbench; never label stale data as fresh.
- Success state: Holder view shows plain-language receipts; auditor view reveals hashes and owner/session fields.
- Keyboard/touch behavior: Role switch is keyboard operable; receipt cards are full-card links with clear focus state and large touch targets.
- Accessibility note: Status chips include `REFUSED` or `ALLOWED` text; role switch has an accessible label.
- State transition: `receiptStatus=loading -> success|empty|error`; `roleView=holder|auditor`.
- Proof artifact: Receipt id, status, reason code, policy hash, calldata hash, proof hash, owner/session fields, and detail link.
- Test selectors: `[data-testid="receipts-page"]`, `[data-testid="role-holder"]`, `[data-testid="role-auditor"]`, `[data-testid="receipt-list"]`, `[data-testid="receipt-card"]`.

### `/app/receipts/:id` Receipt Detail

- Default state: Receipt status header, plain-language summary, proof table, copy buttons, and links to policy/build proof are visible.
- Loading state: Skeleton proof rows preserve the page structure.
- Empty state: Not applicable; unknown ids use not-found.
- Error state: Show "Receipt not found" or retry copy, preserving the requested id in the URL.
- Success state: Full proof table renders with all required fields.
- Keyboard/touch behavior: Back link appears first; copy buttons announce copied state; long hashes wrap or truncate safely.
- Accessibility note: `NO` stamp has text alternative; proof fields have labels.
- State transition: `detailStatus=loading -> success|notFound|error`; `copiedField=null|fieldName`.
- Proof artifact: Receipt id, status, reason code, shock snapshot, policy hash, calldata hash, proof hash, owner/session fields, contract refs, and tx hash.
- Test selectors: `[data-testid="receipt-detail-page"]`, `[data-testid="receipt-detail-status"]`, `[data-testid="receipt-detail-reason"]`, `[data-testid="receipt-detail-policy-hash"]`, `[data-testid="receipt-detail-calldata-hash"]`, `[data-testid="receipt-detail-proof-hash"]`, `[data-testid="receipt-detail-shock-snapshot"]`.

### `/app/build` Architecture Proof

- Default state: Cloudflare architecture, Durable Object ledger, contract suite, deployed addresses, refused demo tx, API route list, and limitations are visible.
- Loading state: Optional `GET /api/health` chip may show loading without blocking static proof.
- Empty state: Not applicable.
- Error state: If health check fails, show static deployment proof and label health as unavailable.
- Success state: Health chip confirms Worker availability and all proof cards remain visible.
- Keyboard/touch behavior: Copy fields are keyboard reachable; address cards wrap on mobile.
- Accessibility note: Architecture, contracts, APIs, and limitations use clear headings.
- State transition: `healthStatus=loading -> online|fallback`.
- Proof artifact: Cloudflare URL, Durable Object storage, deployed contracts, Arbitrum Sepolia tx, and known limitations.
- Test selectors: `[data-testid="about-page"]`, `[data-testid="architecture-summary"]`, `[data-testid="deployed-addresses"]`, `[data-testid="refused-demo-tx"]`, `[data-testid="api-route-list"]`, `[data-testid="limitations-section"]`, `[data-testid="health-status"]`.

## Demo Choreography

- Judge input: choose a shock card, run the unsafe action, inspect the refusal receipt, run the safe sweep, and open the policy/build proof screens.
- Live consequence: unsafe action flips to `REFUSED`, `NO` stamp lands, receipt persists; safe sweep flips to `ALLOWED` under the same policy.
- Proof artifact: refusal receipt, allowed receipt, policy matrix, deployed contract addresses, refused Arbitrum Sepolia demo tx, Cloudflare public URL.
- Fallback: if API or explorer proof fails, keep Durable Object receipts and `/app/build` static proof visible; label fallback proof instead of pretending it is live.
- Big-screen staging: start at `/`, zoom browser to keep CTA and `NO` stamp readable, use `MARKET_HALT` as default fastest path, then show receipt detail and `/app/build`.
- Mobile QR behavior: QR may open `/app` directly for short demos; the mobile flow is tap shock, tap run, inspect latest receipt, then optional `/app/build`.

## Implementation Notes

- Components: `LandingHero`, `ShockCard`, `ActionCard`, `NoStamp`, `ReceiptRail`, `SafeSweepPanel`, `PolicyMatrix`, `ContractEvidenceCard`, `RoleSwitch`, `ReceiptProofTable`, `CopyFieldButton`, `ArchitectureProofPanel`.
- Data/API dependencies: `POST /api/runs/refuse`, `POST /api/runs/safe`, `GET /api/receipts`, `GET /api/receipts/:id`, `GET /api/policy`, `GET /api/health`.
- Storage/state dependencies: Cloudflare Durable Object SQLite-backed ledger stores `id`, `status`, `reasonCode`, `shockSnapshot`, `policyHash`, `calldataHash`, `proofHash`, `ownerId`, `sessionId`, `roleId`, `walletAddress`, `contractRefs`, `txHash`, and `createdAt`.
- External integrations: Cloudflare Workers, Durable Objects, Arbitrum Sepolia explorer links, deployed Solidity contracts, optional Robinhood Chain framing when public testnet resources are usable.
- Test selectors: selectors listed above are the canonical Playwright handles for hero path, receipt detail, role switch, policy proof, and build proof.
- Mobile QR: the QR target should be the live Worker URL and may use `/app` when demo time is short; all critical controls must remain single-column and tappable at 390px width.
