import { chromium } from "playwright";
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(projectRoot, "pitch/hackquest-assets");

const shots = {
  hero: resolve(projectRoot, "pitch/deck/images/hero-latest-16x10.png"),
  workbench: resolve(projectRoot, "pitch/deck/images/workbench-refused-16x10.png"),
  receipt: resolve(projectRoot, "pitch/deck/images/receipt-detail-refused-16x10.png"),
  chain: resolve(projectRoot, "pitch/deck/images/chain-submitted-16x10.png")
};

const outputImages = [
  { source: shots.hero, out: "01-live-url-hero.png", cropY: 0 },
  { source: shots.workbench, out: "02-refusal-workbench.png", cropY: 0 },
  { source: shots.receipt, out: "03-receipt-detail.png", cropY: 0 },
  { source: shots.chain, out: "04-chain-proof.png", cropY: 120 }
];

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    stdio: "inherit"
  });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}`);
  }
}

function dataUri(file) {
  const ext = extname(file).toLowerCase();
  const mime = ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png";
  return `data:${mime};base64,${readFileSync(file).toString("base64")}`;
}

function coverHtml({ compact = false } = {}) {
  const hero = dataUri(shots.hero);
  const workbench = dataUri(shots.workbench);
  const receipt = dataUri(shots.receipt);
  const h1Size = compact ? 76 : 84;
  const frameScale = compact ? 0.87 : 1;

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; width: 100%; height: 100%; overflow: hidden; }
  body {
    font-family: Inter, Helvetica, Arial, sans-serif;
    color: #f8fbff;
    background:
      radial-gradient(circle at 84% 20%, rgba(255, 120, 72, 0.24), transparent 360px),
      linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px),
      linear-gradient(0deg, rgba(255,255,255,0.09) 1px, transparent 1px),
      #0037ff;
    background-size: auto, 72px 72px, 72px 72px, auto;
  }
  .stage {
    width: 100vw;
    height: 100vh;
    padding: ${compact ? 46 : 54}px ${compact ? 58 : 66}px;
    position: relative;
  }
  .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: ${compact ? 13 : 14}px;
    text-transform: uppercase;
    letter-spacing: 0;
    color: rgba(248, 251, 255, 0.72);
  }
  .grid {
    display: grid;
    grid-template-columns: 0.94fr 1.06fr;
    gap: ${compact ? 30 : 38}px;
    height: calc(100% - 34px);
    align-items: center;
  }
  h1 {
    margin: 0;
    max-width: 590px;
    font-size: ${h1Size}px;
    line-height: 0.93;
    font-weight: 860;
    letter-spacing: 0;
  }
  h1 em {
    font-style: italic;
    font-weight: 520;
  }
  .sub {
    max-width: 520px;
    margin: ${compact ? 22 : 28}px 0 0;
    font-size: ${compact ? 21 : 23}px;
    line-height: 1.25;
    color: rgba(248, 251, 255, 0.84);
  }
  .tags {
    display: flex;
    gap: 10px;
    margin-top: ${compact ? 30 : 38}px;
    flex-wrap: wrap;
  }
  .tag {
    border: 1px solid rgba(248, 251, 255, 0.58);
    padding: 10px 12px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 14px;
    background: rgba(0, 0, 0, 0.12);
  }
  .proof {
    position: relative;
    height: ${compact ? 428 : 470}px;
    transform: scale(${frameScale});
    transform-origin: center right;
  }
  .shot {
    position: absolute;
    overflow: hidden;
    border: 10px solid #f8fbff;
    background: #f8fbff;
    box-shadow: 0 28px 80px rgba(0,0,0,.34);
  }
  .shot img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .shot.hero { right: 82px; top: 6px; width: 454px; height: 284px; }
  .shot.workbench { right: 0; top: 168px; width: 508px; height: 318px; }
  .shot.receipt { left: 0; bottom: 14px; width: 360px; height: 226px; }
  .stamp {
    position: absolute;
    right: 314px;
    top: 294px;
    transform: rotate(-9deg);
    border: 9px solid #ff4a42;
    color: #ff4a42;
    font-size: 66px;
    font-weight: 900;
    padding: 8px 24px 10px;
    line-height: 1;
    background: rgba(0, 0, 0, .54);
  }
  .footer {
    position: absolute;
    left: ${compact ? 58 : 66}px;
    right: ${compact ? 58 : 66}px;
    bottom: ${compact ? 28 : 32}px;
    display: flex;
    justify-content: space-between;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 13px;
    color: rgba(248, 251, 255, 0.64);
  }
</style>
</head>
<body>
  <main class="stage">
    <div class="meta"><span>RefusalRail</span><span>HackQuest submission cover</span></div>
    <section class="grid">
      <div>
        <h1>The trade <em>fails.</em><br>The proof ships.</h1>
        <p class="sub">A judge connects a wallet, lets an unsafe RWA agent action fail, and opens a durable NO receipt on Arbitrum Sepolia.</p>
        <div class="tags">
          <span class="tag">wallet-linked receipt</span>
          <span class="tag">policy hash</span>
          <span class="tag">calldata hash</span>
          <span class="tag">explorer proof</span>
        </div>
      </div>
      <div class="proof" aria-hidden="true">
        <div class="shot hero"><img src="${hero}" alt=""></div>
        <div class="shot workbench"><img src="${workbench}" alt=""></div>
        <div class="shot receipt"><img src="${receipt}" alt=""></div>
        <div class="stamp">NO</div>
      </div>
    </section>
    <div class="footer"><span>Reject 1 unsafe RWA trade in 60 seconds.</span><span>Live URL · demo video · deck · repo</span></div>
  </main>
</body>
</html>`;
}

async function renderCover(path, width, height, compact = false) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.setContent(coverHtml({ compact }), { waitUntil: "load" });
  await page.screenshot({ path, type: "png" });
  await browser.close();
}

async function main() {
  mkdirSync(outDir, { recursive: true });

  await renderCover(resolve(outDir, "cover.png"), 1280, 720, false);
  await renderCover(resolve(projectRoot, "public/brand/og.png"), 1200, 630, true);

  for (const image of outputImages) {
    run("ffmpeg", [
      "-y",
      "-i", image.source,
      "-vf", `crop=1920:1080:0:${image.cropY},scale=1280:720:flags=lanczos`,
      "-frames:v", "1",
      "-compression_level", "8",
      resolve(outDir, image.out)
    ]);
  }

  console.log(`wrote HackQuest assets to ${outDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
