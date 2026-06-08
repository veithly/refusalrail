# User Cases

## User case 1 - Judge refuses an unsafe RWA agent action (HERO PATH)

- User: hackathon judge acting as a self-custody tokenized ETF holder.
- Context: user has authorized an agent to claim/sweep distributions but never sell principal under shock conditions.
- Steps:
  1. Open RefusalRail.
  2. Select `MARKET_HALT`, `STALE_PRICE`, or `MAX_EXPOSURE`.
  3. Click "Let the agent try."
  4. Sign/use demo wallet.
  5. See unsafe calldata refused.
  6. Open the refusal receipt and explorer link.
- Success evidence: `ActionRefused` event and refusal receipt with tx hash, calldata hash, policy hash, reason code.

## User case 2 - Safe standing action executes under same policy

- User: RWA holder who wants automation without unlimited trading authority.
- Context: a mock distribution is available for a tokenized ETF.
- Steps:
  1. Choose policy: "claim distribution and sweep proceeds; never sell principal."
  2. Trigger mock distribution.
  3. Let agent execute allowed sweep.
  4. Compare allowed receipt with refused sell attempt.
- Success evidence: `SafeActionExecuted` event, before/after balances, same policy hash used by refusal path.

## User case 3 - Builder audits the safety rail

- User: Arbitrum / Robinhood Chain technical judge.
- Context: judge wants confidence this is not a fake UI.
- Steps:
  1. Open contract addresses.
  2. Inspect `PolicyRegistry` and `RefusalHub`.
  3. Open tests showing blocked unsafe calldata and allowed safe action.
  4. Open Dune/explorer proof.
- Success evidence: contract addresses, test output, explorer events, receipt detail route.
