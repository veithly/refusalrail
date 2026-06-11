# Sponsor Depth: RefusalRail

sponsor_track: "Arbitrum Open House London: Online Buildathon"
required_tooling: "Arbitrum Sepolia chain, Solidity contracts, RefusalHub transaction proof, and Arbiscan explorer links."
why_core_not_decorative: "The product promise is not only to warn about an unsafe RWA agent action; it saves a refusal receipt that can be prepared and bound to an Arbitrum Sepolia contract path."
user_visible_dependency: "On /app/receipts/[id], the reviewer sees RefusalHub calldata, contract addresses, tx binding controls, and the Arbitrum Sepolia explorer link."
fallback_if_unavailable: "If testnet RPC or wallet signing is unavailable, the UI keeps the local refusal receipt and shows that the chain binding is pending rather than faking a transaction."
what_breaks_without_it: "Without Arbitrum/Solidity, the product collapses into an off-chain receipt ledger and cannot prove that the refusal maps to a sponsor-chain policy contract."
screenshots_or_logs: "deployments/arbitrum-sepolia.json, tests/hero.spec.ts, .hunter/runtime-interaction.report.json, and https://sepolia.arbiscan.io/tx/0x0b809bc31f75b6ff5947ccb5875dc5df975e1fe379b3a533f8e84454e42bf372"
submission_answer_draft: "RefusalRail uses Arbitrum Sepolia as the proof layer for the refusal receipt: the live app saves the NO receipt, prepares RefusalHub calldata, and binds the receipt to an explorer-visible tx."

## Not Applicable Override

not_applicable_reason: ""
