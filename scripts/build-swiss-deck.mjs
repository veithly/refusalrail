import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const projectRoot = resolve(new URL("..", import.meta.url).pathname);
const skillRoot = "/Users/rick/.skills-manager/skills/guizang-ppt-skill";
const templatePath = resolve(skillRoot, "assets/template-swiss.html");
const outPath = resolve(projectRoot, "pitch/deck/index.html");
const imagesDir = resolve(projectRoot, "pitch/deck/images");

const artCopies = [
  ["public/art/refusalrail/no-stamp-ledger.png", "generated/no-stamp-ledger.png"],
  ["public/art/refusalrail/chain-lock-map.png", "generated/chain-lock-map.png"],
  ["public/art/refusalrail/wallet-key-proof.png", "generated/wallet-key-proof.png"],
  ["public/art/refusalrail/policy-breaker-device.png", "generated/policy-breaker-device.png"],
  ["public/art/refusalrail/auditor-wall-texture.png", "generated/auditor-wall-texture.png"]
];

function copyArtAssets() {
  mkdirSync(resolve(imagesDir, "generated"), { recursive: true });
  for (const [source, target] of artCopies) {
    const sourcePath = resolve(projectRoot, source);
    if (existsSync(sourcePath)) {
      copyFileSync(sourcePath, resolve(imagesDir, target));
    }
  }
}

const slides = String.raw`
<section class="slide accent" data-layout="SWISS-COVER-ASCII" data-animate="hero">
  <div class="canvas-card">
    <canvas class="ascii-bg" aria-hidden="true"></canvas>
    <div class="chrome-min">
      <div class="l">REFUSALRAIL · ARBITRUM ONLINE BUILDATHON</div>
      <div class="r">01 / 12</div>
    </div>
    <div style="flex:1;padding:0;display:grid;grid-template-columns:minmax(0,1.02fr) minmax(440px,.82fr);gap:3vw;align-items:center">
      <div data-anim="title" style="display:flex;flex-direction:column;gap:3vh;position:relative;z-index:1">
        <div class="t-meta" style="color:rgba(255,255,255,.78);letter-spacing:.2em">FORENSIC RWA AGENT SAFETY</div>
        <h1 style="font-family:var(--sans);font-weight:200;font-size:min(8.4vw,14.2vh);line-height:.92;letter-spacing:-.025em;color:#fff">The trade <span style="font-style:italic;font-weight:300">fails</span>.<br/>The proof ships.</h1>
        <div class="lead" style="max-width:58ch;color:rgba(255,255,255,.86)">A judge picks a shock, the agent attempts an unsafe RWA action, and RefusalRail saves the NO as wallet-bound Arbitrum Sepolia proof.</div>
      </div>
      <div data-anim="image" style="display:grid;gap:1.2vh">
        <div class="frame-img r-16x10" style="border-color:rgba(255,255,255,.28)">
          <img src="images/hero-latest-16x10.png" data-image-slot="cover-proof-16x10" alt="Latest RefusalRail hero screen" style="width:100%;height:100%;object-fit:cover;object-position:left top"/>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.2vh">
          <div class="frame-img r-21x9" style="border-color:rgba(255,255,255,.28)"><img src="images/generated/no-stamp-ledger.png" data-image-slot="cover-proof-21x9" alt="NO stamp ledger" style="width:100%;height:100%;object-fit:cover"/></div>
          <div class="frame-img r-21x9" style="border-color:rgba(255,255,255,.28)"><img src="images/wallet-identity-surface-3x1.png" data-image-slot="cover-wallet-3x1" alt="Wallet identity rail" style="width:100%;height:100%;object-fit:cover;object-position:left center"/></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide light" data-layout="S22" data-animate="image-hero">
  <div class="canvas-card">
    <div class="chrome-min"><div class="l">FIRST VIEW</div><div class="r">02 / 12 · S22</div></div>
    <div style="flex:1;padding:0;display:grid;grid-template-rows:auto 1fr auto;gap:3vh">
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.3vh">
        <div class="t-meta">5 SECONDS</div>
        <h2 class="h-xl" style="font-size:min(5.8vw,10.2vh)">Reject 1 unsafe RWA trade in 60 seconds.</h2>
      </div>
      <div data-anim="image" class="frame-img r-21x9">
        <img src="images/hero-latest-16x10.png" data-image-slot="s22-hero-21x9" alt="Latest hero screen with wallet dock and proof cockpit" style="width:100%;height:100%;object-fit:cover;object-position:center 34%"/>
      </div>
      <div data-anim="stats" class="grid-12">
        <div class="span-4 card-fill" style="padding:var(--sp-6)"><div class="t-cat">Input</div><p>Connect wallet or use test wallet.</p></div>
        <div class="span-4 card-accent" style="padding:var(--sp-6)"><div class="t-cat">Action</div><p>Pick MARKET_HALT and let the agent try.</p></div>
        <div class="span-4 card-fill" style="padding:var(--sp-6)"><div class="t-cat">Artifact</div><p>Open the wallet-linked NO receipt.</p></div>
      </div>
    </div>
  </div>
</section>

<section class="slide dark" data-layout="S08" data-animate="split-statement">
  <div class="canvas-card">
    <div class="chrome-min"><div class="l">CORE CONTRAST</div><div class="r">03 / 12 · S08</div></div>
    <div style="flex:1;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border-subtle);align-self:stretch">
      <div class="card-fill" data-anim="left" style="padding:var(--sp-10);display:flex;flex-direction:column;justify-content:space-between">
        <div>
          <div class="t-meta">OK PATH</div>
          <h2 class="h-xl" style="font-size:min(4.5vw,8.2vh)">Distribution sweep can pass.</h2>
          <p class="lead">The rail is selective. Safe standing actions still write receipts under the same policy hash.</p>
        </div>
        <div class="frame-img r-21x9">
          <img src="images/safe-sweep-16x10.png" data-image-slot="s15-grid-21x9" alt="Allowed safe sweep receipt" style="width:100%;height:100%;object-fit:cover;object-position:center 32%"/>
        </div>
      </div>
      <div class="card-accent" data-anim="right" style="padding:var(--sp-10);display:flex;flex-direction:column;justify-content:space-between">
        <div>
          <div class="t-meta">NO PATH</div>
          <h2 class="h-xl" style="font-size:min(4.5vw,8.2vh);color:var(--accent-on)">Principal sale during shock stops.</h2>
          <p class="lead" style="color:var(--accent-on)">The failed action becomes the product output: a durable refusal receipt.</p>
        </div>
        <div class="frame-img r-21x9">
          <img src="images/workbench-refused-16x10.png" data-image-slot="s15-grid-21x9" alt="Refused workbench state" style="width:100%;height:100%;object-fit:cover;object-position:center 34%"/>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide light" data-layout="S11" data-animate="timeline-walk">
  <div class="canvas-card">
    <div class="chrome-min"><div class="l">DEMO SPINE</div><div class="r">04 / 12 · S11</div></div>
    <div style="flex:1;padding:0;display:grid;grid-template-rows:auto 1fr;gap:5vh">
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.3vh">
        <div class="t-meta">30 SECONDS TO CONSEQUENCE</div>
        <h2 class="h-xl" style="font-size:min(5.7vw,10.1vh)">Judge input creates a visible refusal.</h2>
      </div>
      <div data-anim="timeline" style="display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:var(--border-subtle)">
        <div class="card-fill" style="padding:var(--sp-7)"><div class="t-cat">01</div><h3>Wallet</h3><p>Browser wallet or public test wallet.</p></div>
        <div class="card-fill" style="padding:var(--sp-7)"><div class="t-cat">02</div><h3>Shock</h3><p>MARKET_HALT, STALE_PRICE, or MAX_EXPOSURE.</p></div>
        <div class="card-accent" style="padding:var(--sp-7)"><div class="t-cat">03</div><h3>NO</h3><p>Refused after persistence.</p></div>
        <div class="card-fill" style="padding:var(--sp-7)"><div class="t-cat">04</div><h3>Receipt</h3><p>Policy, calldata, shock, proof hashes.</p></div>
        <div class="card-fill" style="padding:var(--sp-7)"><div class="t-cat">05</div><h3>Chain</h3><p>RefusalHub tx data and explorer binding.</p></div>
      </div>
    </div>
  </div>
</section>

<section class="slide dark" data-layout="S22" data-animate="image-hero">
  <div class="canvas-card">
    <div class="chrome-min"><div class="l">LIVE WORKBENCH</div><div class="r">05 / 12 · S22</div></div>
    <div style="flex:1;padding:0;display:grid;grid-template-rows:auto 1fr auto;gap:3vh">
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.3vh">
        <div class="t-meta">PRODUCT MOMENT</div>
        <h2 class="h-xl" style="font-size:min(5.6vw,9.9vh)">The refusal appears only after the receipt is saved.</h2>
      </div>
      <div data-anim="image" class="frame-img r-21x9">
        <img src="images/workbench-refused-16x10.png" data-image-slot="s22-hero-21x9" alt="Workbench after refused run" style="width:100%;height:100%;object-fit:cover;object-position:center 38%"/>
      </div>
      <div data-anim="stats" class="grid-12">
        <div class="span-4 card-fill" style="padding:var(--sp-6)"><div class="t-cat">Wallet</div><p>0x2eE8...5c66 visible in the workbench.</p></div>
        <div class="span-4 card-accent" style="padding:var(--sp-6)"><div class="t-cat">Verdict</div><p>MARKET_HALT -> ActionRefused.</p></div>
        <div class="span-4 card-fill" style="padding:var(--sp-6)"><div class="t-cat">Next click</div><p>Open receipt, prepare tx data.</p></div>
      </div>
    </div>
  </div>
</section>

<section class="slide light" data-layout="S17" data-animate="system-diagram">
  <div class="canvas-card">
    <div class="chrome-min"><div class="l">RECEIPT ANATOMY</div><div class="r">06 / 12 · S17</div></div>
    <div style="flex:1;padding:0;display:grid;grid-template-columns:4.5fr 7.5fr;gap:3vw;align-items:center">
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.6vh">
        <div class="t-meta">FORENSIC RECORD</div>
        <h2 class="h-xl" style="font-size:min(5.4vw,9.5vh)">NO is a table, not a toast.</h2>
        <p class="lead">Every strong claim maps to a field: wallet, owner, role, action, shock, policy hash, calldata hash, proof hash, tx status.</p>
      </div>
      <div data-anim="grid" class="grid-12">
        <div class="span-6 card-accent" style="padding:var(--sp-7)"><div class="t-cat">status</div><p>REFUSED</p></div>
        <div class="span-6 card-fill" style="padding:var(--sp-7)"><div class="t-cat">wallet</div><p>0x2eE8...5c66</p></div>
        <div class="span-4 card-fill" style="padding:var(--sp-7)"><div class="t-cat">policy</div><p>ce0d367a...</p></div>
        <div class="span-4 card-fill" style="padding:var(--sp-7)"><div class="t-cat">calldata</div><p>540b7fd0...</p></div>
        <div class="span-4 card-fill" style="padding:var(--sp-7)"><div class="t-cat">proof</div><p>002da84b...</p></div>
        <div class="span-12 frame-img r-21x9">
          <img src="images/receipt-detail-refused-16x10.png" data-image-slot="s15-grid-21x9" alt="Receipt detail proof table" style="width:100%;height:100%;object-fit:cover;object-position:center 34%"/>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide dark" data-layout="S21" data-animate="grid-reveal">
  <div class="canvas-card">
    <div class="chrome-min"><div class="l">ARBITRUM BINDING</div><div class="r">07 / 12 · S21</div></div>
    <div style="flex:1;padding:0;display:grid;grid-template-columns:4fr 8fr;gap:3vw;align-items:center">
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.8vh">
        <div class="t-meta">CHAIN PROOF</div>
        <h2 class="h-xl" style="font-size:min(5.3vw,9.4vh)">Receipt binds to Arbitrum Sepolia.</h2>
        <p class="lead">RefusalHub calldata is prepared from the same receipt, then the tx hash is attached back to the record.</p>
      </div>
      <div data-anim="grid" style="display:grid;grid-template-rows:1fr auto;gap:2vh">
        <div class="frame-img r-16x10">
          <img src="images/chain-submitted-16x10.png" data-image-slot="chain-proof-16x10" alt="Chain proof submitted state" style="width:100%;height:100%;object-fit:cover;object-position:center 36%"/>
        </div>
        <div class="grid-12">
          <div class="span-4 card-fill" style="padding:var(--sp-6)"><div class="t-cat">RefusalHub</div><p>0x3540...0Cf8</p></div>
          <div class="span-4 card-fill" style="padding:var(--sp-6)"><div class="t-cat">PolicyRegistry</div><p>0xa9df...23B7</p></div>
          <div class="span-4 card-accent" style="padding:var(--sp-6)"><div class="t-cat">demo tx</div><p>0x0b80...b372</p></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide light" data-layout="S15" data-animate="grid-reveal">
  <div class="canvas-card">
    <div class="chrome-min"><div class="l">PROOF SURFACES</div><div class="r">08 / 12 · S15</div></div>
    <div style="flex:1;padding:0;display:grid;grid-template-rows:auto 1fr auto;gap:3vh">
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.3vh">
        <div class="t-meta">NO SCAVENGER HUNT</div>
        <h2 class="h-xl" style="font-size:min(5.2vw,9.2vh)">Every judge surface points to the same proof path.</h2>
      </div>
      <div data-anim="grid" class="grid-12">
        <div class="span-4 frame-img r-21x9"><img src="images/hero-latest-16x10.png" data-image-slot="s15-grid-21x9" alt="Hero screenshot" style="width:100%;height:100%;object-fit:cover;object-position:center 35%"/></div>
        <div class="span-4 frame-img r-21x9"><img src="images/workbench-refused-16x10.png" data-image-slot="s15-grid-21x9" alt="Refused workbench" style="width:100%;height:100%;object-fit:cover;object-position:center 35%"/></div>
        <div class="span-4 frame-img r-21x9"><img src="images/receipt-detail-refused-16x10.png" data-image-slot="s15-grid-21x9" alt="Receipt detail" style="width:100%;height:100%;object-fit:cover;object-position:center 35%"/></div>
        <div class="span-4 frame-img r-21x9"><img src="images/chain-submitted-16x10.png" data-image-slot="s15-grid-21x9" alt="Chain proof submitted" style="width:100%;height:100%;object-fit:cover;object-position:center 35%"/></div>
        <div class="span-4 frame-img r-21x9"><img src="images/policy-page-16x10.png" data-image-slot="s15-grid-21x9" alt="Policy page" style="width:100%;height:100%;object-fit:cover;object-position:center 35%"/></div>
        <div class="span-4 frame-img r-21x9"><img src="images/auditor-evidence-wall-16x10.png" data-image-slot="s15-grid-21x9" alt="Auditor evidence wall" style="width:100%;height:100%;object-fit:cover;object-position:center 35%"/></div>
      </div>
      <div data-anim="stat" class="num-mega" style="font-size:min(5.8vw,10vh);line-height:.88;color:var(--accent)">1 proof path</div>
    </div>
  </div>
</section>

<section class="slide dark" data-layout="S16" data-animate="grid-reveal">
  <div class="canvas-card">
    <div class="chrome-min"><div class="l">SECOND USER LOOP</div><div class="r">09 / 12 · S16</div></div>
    <div style="flex:1;padding:0;display:grid;grid-template-rows:auto 1fr;gap:3.5vh">
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.3vh">
        <div class="t-meta">AUDITOR CAN ENTER AFTER THE HOLDER</div>
        <h2 class="h-xl" style="font-size:min(5.5vw,9.7vh)">The ledger outlives one run.</h2>
      </div>
      <div data-anim="grid" class="grid-12">
        <div class="span-6 frame-img r-21x9"><img src="images/auditor-evidence-wall-16x10.png" data-image-slot="s16-brief-21x9" alt="Auditor receipt wall" style="width:100%;height:100%;object-fit:cover;object-position:center 35%"/></div>
        <div class="span-6 frame-img r-21x9"><img src="images/build-page-16x10.png" data-image-slot="s16-brief-21x9" alt="Build and contract proof page" style="width:100%;height:100%;object-fit:cover;object-position:center 35%"/></div>
        <div class="span-3 card-fill" style="padding:var(--sp-7)"><div class="t-cat">Holder</div><p>Creates refused and allowed receipts.</p></div>
        <div class="span-3 card-fill" style="padding:var(--sp-7)"><div class="t-cat">Auditor</div><p>Inspects public proof history.</p></div>
        <div class="span-3 card-accent" style="padding:var(--sp-7)"><div class="t-cat">Refresh</div><p>Receipt records remain visible.</p></div>
        <div class="span-3 card-fill" style="padding:var(--sp-7)"><div class="t-cat">Mobile</div><p>Fresh visitor still sees the first action.</p></div>
      </div>
    </div>
  </div>
</section>

<section class="slide light" data-layout="S14" data-animate="system-diagram">
  <div class="canvas-card">
    <div class="chrome-min"><div class="l">MECHANISM</div><div class="r">10 / 12 · S14</div></div>
    <div style="flex:1;padding:0;display:grid;grid-template-columns:4.5fr 7.5fr;gap:3vw;align-items:center">
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.6vh">
        <div class="t-meta">AGENT PROPOSES · POLICY DECIDES · RECEIPT PROVES</div>
        <h2 class="h-xl" style="font-size:min(5.2vw,9.2vh)">Four moving parts, one visible artifact.</h2>
        <p class="lead">The product mechanism collapses if the policy gate, receipt ledger, wallet identity, or chain binding disappears.</p>
      </div>
      <div data-anim="diagram" class="grid-12">
        <div class="span-6 frame-img r-21x9"><img src="images/generated/policy-breaker-device.png" data-image-slot="mechanism-art-21x9" alt="Policy breaker device" style="width:100%;height:100%;object-fit:cover"/></div>
        <div class="span-6 frame-img r-21x9"><img src="images/generated/chain-lock-map.png" data-image-slot="mechanism-art-21x9" alt="Chain lock map" style="width:100%;height:100%;object-fit:cover"/></div>
        <div class="span-3 card-fill" style="padding:var(--sp-7)"><div class="t-cat">01</div><p>Wallet identity</p></div>
        <div class="span-3 card-accent" style="padding:var(--sp-7)"><div class="t-cat">02</div><p>Policy refusal</p></div>
        <div class="span-3 card-fill" style="padding:var(--sp-7)"><div class="t-cat">03</div><p>Receipt ledger</p></div>
        <div class="span-3 card-fill" style="padding:var(--sp-7)"><div class="t-cat">04</div><p>Explorer binding</p></div>
      </div>
    </div>
  </div>
</section>

<section class="slide dark" data-layout="S20" data-animate="bar-grow">
  <div class="canvas-card">
    <div class="chrome-min"><div class="l">SHIP CHECK</div><div class="r">11 / 12 · S20</div></div>
    <div style="flex:1;padding:0;display:grid;grid-template-columns:5fr 7fr;gap:3vw;align-items:center">
      <div data-anim="head" style="display:flex;flex-direction:column;gap:1.6vh">
        <div class="t-meta">HUNTER G6 / G7 READY</div>
        <h2 class="h-xl" style="font-size:min(5.7vw,10vh)">Submitted claims have runtime proof.</h2>
        <p class="lead">Build, unit, E2E, claim matrix, runtime interaction, video manifest, and submission pack all point to the same live path.</p>
      </div>
      <div data-anim="ledger" style="display:grid;gap:1px;background:var(--border-subtle)">
        <div class="card-fill" style="padding:var(--sp-7);display:grid;grid-template-columns:2fr 8fr;gap:2vw"><strong>01</strong><span>build + TypeScript + contracts compile</span></div>
        <div class="card-fill" style="padding:var(--sp-7);display:grid;grid-template-columns:2fr 8fr;gap:2vw"><strong>02</strong><span>unit tests and local E2E cover the hero path</span></div>
        <div class="card-accent" style="padding:var(--sp-7);display:grid;grid-template-columns:2fr 8fr;gap:2vw"><strong>03</strong><span>main video is the full 3-5 minute judge artifact</span></div>
        <div class="card-fill" style="padding:var(--sp-7);display:grid;grid-template-columns:2fr 8fr;gap:2vw"><strong>04</strong><span>HackQuest copy starts with the live product result</span></div>
      </div>
    </div>
  </div>
</section>

<section class="slide split" data-layout="SWISS-CLOSING-ASCII" data-animate="split-statement">
  <div class="canvas-card">
    <div class="split-half">
      <div class="half b-accent" style="padding:5.6vh 3.6vw 4.4vh;justify-content:space-between;position:relative;overflow:hidden">
        <canvas class="ascii-bg" aria-hidden="true"></canvas>
        <div class="chrome-min" style="margin-bottom:0;position:relative;z-index:1"><div class="l">12 / 12</div><div class="r">CLOSING</div></div>
        <div data-anim="manifesto" style="display:flex;flex-direction:column;gap:2vh;position:relative;z-index:1">
          <div class="t-meta" style="color:rgba(255,255,255,.78);letter-spacing:.2em">RETELLABLE HOOK</div>
          <h2 style="font-family:var(--sans);font-size:min(7.2vw,12.6vh);line-height:.94;letter-spacing:-.025em;font-weight:200;color:#fff">The failed tx<br/>is the <span style="font-style:italic;font-weight:300">product</span>.</h2>
          <div style="font-family:var(--sans);font-size:max(16px,1vw);line-height:1.55;color:rgba(255,255,255,.84);font-weight:400;max-width:39ch">Run refusal. Open receipt. Bind proof. Compare safe sweep.</div>
        </div>
        <div data-anim="signature" style="border-top:1px solid rgba(255,255,255,.22);padding-top:2vh;position:relative;z-index:1" class="t-meta">RefusalHub 0x3540...0Cf8 · demo tx 0x0b80...b372</div>
      </div>
      <div class="half" style="padding:5.6vh 3.6vw 4.4vh;justify-content:space-between">
        <div class="chrome-min"><div class="l">TRY IT</div><div class="r">LIVE PROOF</div></div>
        <div data-anim="image" class="frame-img r-16x10">
          <img src="images/chain-submitted-16x10.png" data-image-slot="closing-proof-16x10" alt="Final chain proof screen" style="width:100%;height:100%;object-fit:cover;object-position:center 36%"/>
        </div>
        <div data-anim="rules" style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border-subtle)">
          <div class="card-fill" style="padding:var(--sp-6)"><div class="t-cat">Live app</div><p>refusalrail.veithly.workers.dev</p></div>
          <div class="card-accent" style="padding:var(--sp-6)"><div class="t-cat">Judge action</div><p>Open the receipt proof.</p></div>
        </div>
      </div>
    </div>
  </div>
</section>
`;

function main() {
  copyArtAssets();
  let template = readFileSync(templatePath, "utf8");
  template = template.replace(
    "<title>[必填] 替换为 PPT 标题 · Deck Title</title>",
    "<title>RefusalRail · Swiss Evidence Deck</title>"
  );
  const start = template.indexOf("<!-- ============ 示例:第 1 页");
  const end = template.indexOf("</div>\n\n<div id=\"nav\"></div>");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Could not locate template example slide region.");
  }
  const output = `${template.slice(0, start)}${slides}\n${template.slice(end)}`;
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, output);
  console.log(`wrote ${outPath}`);
}

main();
