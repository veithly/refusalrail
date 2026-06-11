# Judge/User Spine: RefusalRail

## Five seconds

### Judge
- What they see: a forensic RWA safety rail with the promise "Reject 1 unsafe RWA trade in 60 seconds."
- What they do: scan the wallet rail and click Workbench or Run refused trade.
- What proves value: the first viewport already shows the refusal cockpit, proof cells, and recent receipt rail.
- What can go wrong: the judge may think it is only a dashboard; the visible CTA, NO stamp surface, and proof rail fix that.
- What state appears next: the /app workbench with shock selector, test wallet, refusal button, and receipt rail.

### User
- What they see: a plain standing-action policy for an RWA agent.
- What they do: use the test wallet without signup and choose a market shock.
- What proves value: the UI shows the policy before the agent can move principal.
- What can go wrong: no previous receipts exist; the empty state gives shock examples and a Run refusal CTA.
- What state appears next: the workbench is ready for the first refusal run.

## Thirty seconds

### Judge
- What they see: wallet identity, selected shock, policy gate, and attempted SELL_PRINCIPAL action.
- What they do: click Let the agent try.
- What proves value: the app calls /api/runs/refuse and prepares a saved receipt instead of printing a static warning.
- What can go wrong: the request or ledger may fail; the UI keeps the retry path and never shows unsupported success.
- What state appears next: a red NO receipt appears in the rail.

### User
- What they see: the reason code, policy hash, calldata hash, shock hash, proof hash, and wallet address.
- What they do: open the latest receipt.
- What proves value: the receipt is concrete, traceable, and persisted after refresh.
- What can go wrong: a stale receipt id can return a not-found state; the page routes back to receipt history.
- What state appears next: receipt detail with proof table and chain-action controls.

## Sixty seconds

### Judge
- What they see: the receipt detail page and the Arbitrum Sepolia RefusalHub path.
- What they do: prepare tx data or bind the known demo tx hash.
- What proves value: a refusal record now links policy proof, receipt ledger proof, and chain proof.
- What can go wrong: malformed tx hash is rejected; the user can retry with a valid 32-byte EVM hash.
- What state appears next: the receipt shows an explorer link and can be reopened from history.

### User
- What they see: a safe sweep can pass under the same policy while unsafe principal sale is blocked.
- What they do: run Safe sweep and compare OK versus NO receipts.
- What proves value: the policy is not a blanket kill switch; it preserves safe standing actions.
- What can go wrong: chain proof may be unavailable on testnet; the local receipt still tells that truth.
- What state appears next: receipt history contains both refused and allowed records.

## Five minutes

### Judge
- What they see: /app/receipts?role=auditor, /app/policy, and /app/build prove this is more than one demo screen.
- What they do: refresh, switch role, inspect policy, and reopen saved receipt detail.
- What proves value: ownership/session fields, Durable Object storage, tests, and Arbitrum deployment proof align.
- What can go wrong: the project does not execute real securities trades; the limitation is stated in docs and UI copy.
- What state appears next: an ongoing proof workspace for repeated RWA agent-action reviews.

### User
- What they see: a returnable library of refusal receipts and policy evidence.
- What they do: compare receipts, review policy rules, and share the explorer/proof link.
- What proves value: persistence, owner/session fields, role lens, and public proof keep the record usable on return.
- What can go wrong: public demo abuse is bounded to testnet actions and guest sessions.
- What state appears next: the user can run another shock, review the history, or inspect the build page.
