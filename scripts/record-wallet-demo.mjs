import { chromium } from "playwright";
import { mkdir, rm, copyFile } from "node:fs/promises";
import { join } from "node:path";

const projectRoot = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const baseUrl = process.env.DEMO_URL || "http://127.0.0.1:4391";
const outDir = join(projectRoot, "pitch", "recording");
const rawDir = join(projectRoot, "pitch", "_raw-recording");
const txHash = `0x${"3".repeat(64)}`;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  await mkdir(outDir, { recursive: true });
  await rm(rawDir, { recursive: true, force: true });
  await mkdir(rawDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1200 },
    deviceScaleFactor: 1,
    recordVideo: { dir: rawDir, size: { width: 1920, height: 1200 } }
  });

  await context.addInitScript((hash) => {
    const account = "0x1111111111111111111111111111111111111111";
    globalThis.ethereum = {
      on() {},
      async request(args) {
        if (args.method === "eth_requestAccounts") return [account];
        if (args.method === "wallet_switchEthereumChain") return null;
        if (args.method === "wallet_addEthereumChain") return null;
        if (args.method === "eth_sendTransaction") return hash;
        return null;
      }
    };
  }, txHash);

  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await wait(1200);

  await page.getByTestId("connect-wallet").click();
  await page.getByText(/Browser wallet connected/i).first().waitFor({ timeout: 10000 });
  await wait(1700);

  await page.goto(`${baseUrl}/app`, { waitUntil: "networkidle" });
  await wait(900);
  await page.getByTestId("use-test-wallet-workbench").click();
  await wait(1000);
  await page.getByRole("radio", { name: /MAX_EXPOSURE/i }).click();
  await wait(700);
  await page.getByTestId("run-refusal").click();
  await page.getByText(/saved for 0x0000...BEEF/i).waitFor({ timeout: 10000 });
  await wait(1800);

  await page.getByTestId("open-latest-receipt").first().click();
  await page.getByRole("rowheader", { name: "walletAddress" }).waitFor({ timeout: 10000 });
  await wait(1800);
  await page.getByTestId("prepare-chain-action").click();
  await page.locator("#chain-action-output").getByText(/RefusalHub|contractMethod|data|to/i).waitFor({ timeout: 10000 });
  await wait(1800);

  await page.getByTestId("send-chain-wallet").click();
  await page.getByRole("heading", { name: "Chain proof submitted" }).waitFor({ timeout: 10000 });
  await wait(2000);

  await page.goto(`${baseUrl}/about`, { waitUntil: "networkidle" });
  await wait(2000);

  const video = page.video();
  await page.close();
  await context.close();
  await browser.close();

  const rawPath = await video.path();
  const target = join(outDir, "wallet-demo.webm");
  await copyFile(rawPath, target);
  console.log(`wrote ${target}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
