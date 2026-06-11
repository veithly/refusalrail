# Judge Red-Team: RefusalRail

## Inputs

- Live URL: `https://refusalrail.veithly.workers.dev`
- README: `README.md`
- Video: `pitch/recording/pitch-demo-combined-final.mp4`
- Deck: `pitch/deck/index.html`
- SUBMISSION.md: `SUBMISSION.md`
- Claim matrix: `.hunter/claim-matrix.json`

## Scores

| Category | Score / 10 | Evidence | Fix if < 8 |
|---|---:|---|---|
| 5s clarity | 9 | Hero and tagline say the product rejects one unsafe RWA agent trade and stamps a NO receipt. | Keep current hero copy. |
| 30s click desire | 8 | The live app gives `Run refused trade`, a test wallet path, and visible shock options before setup. | Keep the test-wallet path visible. |
| Product realness | 9 | Receipt persistence, safe sweep, auditor history, wallet identity, and chain proof are covered in `tests/hero.spec.ts`. | Keep receipt detail proof above secondary explanation. |
| Sponsor necessity | 8 | Arbitrum Sepolia contracts turn the refusal from a web log into on-chain-ready proof. | Keep tx and contract addresses in the submission body. |
| Memorability | 9 | "Reject 1 unsafe RWA trade and block it with a NO receipt" is short enough and tied to the red receipt moment. | Keep NO receipt language consistent. |
| Proof confidence | 9 | Live URL, repo, deployed contracts, refused tx, public smoke report, and claim matrix are listed. | Keep exact proof links in the first screenful. |

## Verdict

- Total score: 52 / 60
- Lowest category: 30s click desire = 8 / 10
- Pass rule: total >= 45 and no category < 7
- Decision: PASS

## Red-Team Objections

- Objection 1: The refusal might be only UI theater -> answer/proof: `tests/hero.spec.ts`, receipt detail rows, and the Arbitrum Sepolia tx prove the record path.
- Objection 2: The RWA angle may be too narrow -> answer/proof: policy reasons map to market halt, stale price, exposure, and no-sell-principal standing actions.
- Objection 3: Judges may not want to connect a wallet -> answer/proof: the live app supports a built-in test wallet, while browser-wallet send and tx binding remain test-covered.
- Objection 4: The video slot may still show the old preview until the repo update lands -> answer/proof: the full 3:30 main demo now lives at `pitch/recording/pitch-demo-combined-final.mp4`, the same path HackQuest already references.

## Required Fixes Before Submit

- Update HackQuest visible text to point judges to the 3:30 main demo and the Arbitrum Sepolia tx.
- Fill the X/Twitter field from the submitter profile if HackQuest accepts it.
- If HackQuest does not expose a video URL editor, keep the 1:36 preview in the platform video slot and put the 3:30 main demo URL in Description and Project Link evidence.
