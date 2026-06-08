# Demo Interaction Plan

## Selected concept

RefusalRail: a Robinhood Chain / Arbitrum safety rail for RWA standing-action agents. Users authorize narrow actions such as claiming a distribution, sweeping proceeds, or routing a tokenized ETF action. When the agent tries unsafe calldata under a halt, stale price, exposure, or "never sell principal" rule, the contract refuses and mints a public receipt.

## 0-10s Hook

- Screen opens on a tokenized ETF action card: "Agent wants to sell principal after a market shock."
- Header copy: "This demo only wins if the trade fails."
- The judge sees three shock cards: `MARKET_HALT`, `STALE_PRICE`, `MAX_EXPOSURE`.

## 10-30s Interaction

- Judge selects one shock card.
- Judge clicks "Let the agent try."
- The app submits a real testnet transaction through a demo wallet/session key.
- `RefusalHub` checks `PolicyRegistry` and the oracle/shock fixture.

## 30-60s Visible Consequence

- The unsafe action is refused.
- A red `NO` stamp lands on the action card.
- `RefusalReceipt` appears with:
  - tx hash,
  - attempted calldata hash,
  - policy hash,
  - refusal code,
  - oracle/shock snapshot,
  - fallback route.
- Optional second beat: a safe distribution claim/sweep executes under the same policy so judges see the difference between refused and allowed agent actions.

## 60-90s Proof Close

- Open receipt detail.
- Show event log / explorer link.
- Show contract addresses: `RefusalHub`, `PolicyRegistry`, `RefusalReceipt`, `MockRWAAsset`.
- Show one invariant test: unsafe calldata cannot execute without a refusal event.

## Judge Participation

- Judge chooses the shock condition.
- Judge signs or uses the built-in demo wallet to authorize the agent attempt.
- Judge can switch policy from "never sell principal" to "allow sweep only" and rerun the action.

## Visual Staging

- Product surface: compact RWA action workbench, not a portfolio dashboard.
- Hero component: action card duplicated into a focused zoom layer during the refusal.
- Visual metaphor: red compliance stamp and financial flight-recorder receipt.
- Avoid: generic dark trading terminal, APY cards, chat bubbles, abstract network diagrams.

## Fallback

- If Robinhood Chain testnet/RPC is unstable, deploy on Arbitrum Sepolia and label Robinhood Chain deployment as the primary target.
- If live tx fails, replay seeded tx hashes/events from `.hunter/seed-manifest.json`.
- If oracle/shock input fails, use local fixture toggles that still produce real contract checks.

## Proof Artifact

- `RefusalReceipt` NFT/SBT or receipt record.
- `ActionRefused(bytes32 calldataHash, bytes32 policyHash, uint8 reasonCode, bytes32 shockHash)`.
- Receipt detail route with explorer link.
- Dune query as evidence layer only, not the product.
