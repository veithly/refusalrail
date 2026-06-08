import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const projectRoot = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const baseUrl = process.env.DEMO_URL || "http://127.0.0.1:4391";
const assetsDir = join(projectRoot, "pitch", "polish-combined", "assets");

async function screenshot(page, path, fileName) {
  await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: join(assetsDir, fileName), fullPage: false });
}

async function main() {
  await mkdir(assetsDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1200 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();

  await screenshot(page, "/", "hero-frame.png");
  await screenshot(page, "/app", "desktop-app.png");
  await screenshot(page, "/app/policy", "desktop-policy.png");
  await screenshot(page, "/app/receipts", "desktop-receipts.png");
  await screenshot(page, "/about", "desktop-about.png");

  await page.setViewportSize({ width: 393, height: 852 });
  await screenshot(page, "/app", "mobile-first-run.png");

  await browser.close();
  console.log(`captured clean assets in ${assetsDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
