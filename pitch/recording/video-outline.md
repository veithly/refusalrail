# Video Outline

Actual runtime: 3:30. The video must sell how a judge plays the product, not how the recording was made. Do not narrate Playwright, local tooling, helper vendors, deployment plumbing, or full-length hashes.

| Timecode | Segment | Screen action | Voiceover direction |
|---|---|---|---|
| 0:00-0:10 | Hook | Open redesigned hero. Wallet/test-wallet rail is visible immediately. | "The win condition is a NO receipt that survives refresh, names the wallet, and points to chain evidence." |
| 0:10-0:28 | Problem | Show holder wallet -> bounded agent -> policy rail diagram. | "A standing RWA agent can claim a distribution, but during a market halt it must not sell principal." |
| 0:28-0:45 | Judge setup | Highlight Connect wallet, Use test wallet, chain, RefusalHub, PolicyRegistry. | "A judge can use a browser wallet or the funded Arbitrum Sepolia test wallet. That address becomes the execution identity." |
| 0:45-1:04 | Wallet path | Navigate to workbench with wallet state preserved. | "The wallet entry is real product surface; the no-login test path keeps first-run judging open." |
| 1:04-1:22 | Refusal moment | Select `MARKET_HALT`, click `Let the agent try`, show red NO and appended receipt. | "The agent asks. The policy rail decides. The product succeeds by refusing the action." |
| 1:22-1:40 | Durable proof | Open latest receipt. Point to wallet address, reason code, policy hash, calldata hash, proof hash. | "The refusal becomes a receipt with the fields a reviewer needs." |
| 1:40-1:59 | Chain binding | Show calldata panel and real tx binding field. | "The receipt prepares RefusalHub calldata and binds a real Arbitrum Sepolia transaction." |
| 1:59-2:15 | Safe contrast | Run safe sweep. Show OK receipt next to NO receipt. | "The same policy is selective: safe sweep passes, unsafe principal sale fails." |
| 2:15-2:35 | Auditor view | Open receipt history. Toggle holder/auditor. | "The auditor view proves this is not a one-run screen." |
| 2:35-3:08 | Mechanism proof | Show policy page, build proof, contracts, tests, and live path. | "Live app/API, receipt ledger, Solidity contracts, and explorer proof all point to the same receipt path." |
| 3:08-3:30 | Close | Return to receipt/detail proof and limitation frame. | "RefusalRail makes the failed transaction the product: reject one unsafe RWA agent trade, block it with a NO receipt, and keep the proof." |

## Recording Rules

- Use the redesigned UI and the real public test wallet address `0x2eE8...5c66`.
- Show wallet/test-wallet rail before the first click.
- Show the NO stamp only after receipt persistence.
- Do not read full tx hashes aloud; show shortened labels and copyable fields.
- Avoid "mock", "fake", "Playwright", "recording script", helper vendors, and deployment-provider details in spoken pitch copy unless the submission form asks for it.
