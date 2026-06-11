import { chromium } from "playwright";
import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const projectRoot = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const baseUrl = process.env.DEMO_URL || "http://127.0.0.1:4391";
const videoAssetsDir = join(projectRoot, "pitch", "polish-combined", "assets");
const deckImagesDir = join(projectRoot, "pitch", "deck", "images");
const demoWallet = "0x2eE81C112CA5A5Fd7123644f4c18262a05175c66";
const demoTxHash = "0x0b809bc31f75b6ff5947ccb5875dc5df975e1fe379b3a533f8e84454e42bf372";

async function ensureDirs() {
  await mkdir(videoAssetsDir, { recursive: true });
  await mkdir(deckImagesDir, { recursive: true });
  await mkdir(join(deckImagesDir, "generated"), { recursive: true });
}

async function saveViewport(page, fileName, { deckName = fileName } = {}) {
  const videoPath = join(videoAssetsDir, fileName);
  await page.screenshot({ path: videoPath, fullPage: false });
  await copyFile(videoPath, join(deckImagesDir, deckName));
}

async function saveLocator(page, selector, fileName) {
  const path = join(deckImagesDir, fileName);
  await page.locator(selector).first().screenshot({ path });
}

async function waitForApp(page) {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(700);
}

async function goto(page, path) {
  await page.goto(`${baseUrl}${path}`, { waitUntil: "domcontentloaded" });
  await waitForApp(page);
}

async function main() {
  await ensureDirs();

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1200 },
    deviceScaleFactor: 1
  });

  await context.addInitScript(
    ({ account, txHash }) => {
      globalThis.ethereum = {
        on() {},
        async request(args) {
          if (args.method === "eth_requestAccounts") return [account];
          if (args.method === "wallet_switchEthereumChain") return null;
          if (args.method === "wallet_addEthereumChain") return null;
          if (args.method === "eth_sendTransaction") return txHash;
          return null;
        }
      };
    },
    { account: demoWallet, txHash: demoTxHash }
  );

  const page = await context.newPage();

  await goto(page, "/");
  await page.getByTestId("connect-wallet").click();
  await page.getByText(/Browser wallet connected/i).first().waitFor({ timeout: 10000 });
  await page.waitForTimeout(900);
  await saveViewport(page, "hero-frame.png", { deckName: "hero-latest-16x10.png" });
  await saveLocator(page, ".topbar .identity-rail", "wallet-identity-surface-3x1.png");
  await saveViewport(page, "hero-frame.png", { deckName: "hero-proof-cockpit-16x10.png" });

  await goto(page, "/app");
  await page.getByText(/Browser wallet connected/i).first().waitFor({ timeout: 10000 });
  await saveViewport(page, "desktop-app-initial.png", { deckName: "workbench-initial-16x10.png" });

  await page.getByRole("radio", { name: /MARKET_HALT/i }).click();
  await page.getByTestId("run-refusal").click();
  await page.getByText(/Receipt .* saved for .* with proof/i).waitFor({ timeout: 15000 });
  await page.waitForTimeout(900);
  await saveViewport(page, "desktop-app.png", { deckName: "workbench-refused-16x10.png" });

  await page.getByTestId("open-latest-receipt").first().click();
  await page.getByRole("rowheader", { name: "walletAddress" }).waitFor({ timeout: 10000 });
  await page.waitForTimeout(700);
  await saveViewport(page, "receipt-detail.png", { deckName: "receipt-detail-refused-16x10.png" });
  await saveViewport(page, "receipt-detail.png", { deckName: "no-stamp-receipt-detail-4x3.png" });

  await page.getByTestId("prepare-chain-action").click();
  await page.locator("#chain-action-output").getByText(/to|data|RefusalHub|contractMethod/i).waitFor({ timeout: 10000 });
  await page.waitForTimeout(700);
  await saveViewport(page, "chain-prepared.png", { deckName: "chain-prepared-16x10.png" });

  await page.getByTestId("send-chain-wallet").click();
  await page.getByRole("heading", { name: "Chain proof submitted" }).waitFor({ timeout: 15000 });
  await page.waitForTimeout(900);
  await saveViewport(page, "chain-submitted.png", { deckName: "chain-submitted-16x10.png" });

  await goto(page, "/app");
  await page.getByTestId("run-safe").click();
  await page.getByText(/Allowed\. Safe sweep receipt/i).waitFor({ timeout: 12000 });
  await page.waitForTimeout(900);
  await saveViewport(page, "safe-sweep.png", { deckName: "safe-sweep-16x10.png" });

  await goto(page, "/app/policy");
  await saveViewport(page, "desktop-policy.png", { deckName: "policy-page-16x10.png" });

  await goto(page, "/app/receipts?role=auditor");
  await saveViewport(page, "desktop-receipts.png", { deckName: "auditor-evidence-wall-16x10.png" });

  await goto(page, "/app/build");
  await saveViewport(page, "desktop-about.png", { deckName: "build-page-16x10.png" });

  await page.setViewportSize({ width: 393, height: 852 });
  await goto(page, "/app");
  await page.screenshot({ path: join(videoAssetsDir, "mobile-first-run.png"), fullPage: true });
  await copyFile(join(videoAssetsDir, "mobile-first-run.png"), join(deckImagesDir, "mobile-first-run.png"));

  await browser.close();
  console.log(`captured latest demo assets from ${baseUrl}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
