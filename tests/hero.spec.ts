import { expect, test } from "@playwright/test";

test("fresh visitor completes the refusal hero path", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: /Reject 1 unsafe RWA agent trade/i })).toBeVisible();

  await page.getByRole("link", { name: /Run refused trade/i }).click();
  await expect(page).toHaveURL(/\/app$/);

  await page.getByRole("radio", { name: /STALE_PRICE/i }).click();
  await page.getByTestId("run-refusal").click();

  await expect(page.getByLabel("Refused")).toBeVisible();
  await expect(page.getByTestId("open-latest-receipt").first()).toBeVisible({ timeout: 20000 });
  await expect(page.getByText(/Receipt .* saved for .* with proof/i)).toBeVisible({ timeout: 20000 });

  await page.getByTestId("open-latest-receipt").first().click();
  await expect(page.getByRole("heading", { name: /STALE_PRICE/i })).toBeVisible();
  await expect(page.getByRole("rowheader", { name: "policyHash" })).toBeVisible();
  await expect(page.getByRole("rowheader", { name: "calldataHash" })).toBeVisible();
  await expect(page.getByTestId("chain-proof-panel")).toBeVisible();
  await page.getByTestId("prepare-chain-action").click();
  await expect(page.locator("#chain-action-output")).toContainText(/pending|deployment|to|data|value/i, { timeout: 20000 });
});

test("safe sweep writes an allowed receipt", async ({ page }) => {
  await page.goto("/app", { waitUntil: "domcontentloaded" });
  await page.getByTestId("run-safe").click();
  await expect(page.getByLabel("Allowed")).toBeVisible();
  await expect(page.getByText(/Allowed. Safe sweep receipt/i)).toBeVisible();
  await expect(page.getByText(/POLICY_PASS/i)).toBeVisible();
});

test("judge can run the full path with the built-in test wallet", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByTestId("use-test-wallet").click();
  await expect(page.getByText(/Test wallet active/i).first()).toBeVisible();

  await page.goto("/app", { waitUntil: "domcontentloaded" });
  await expect(page.getByText(/0x0000...BEEF/i).first()).toBeVisible();
  await page.getByRole("radio", { name: /MAX_EXPOSURE/i }).click();
  await page.getByTestId("run-refusal").click();
  await expect(page.getByText(/saved for 0x0000...BEEF/i)).toBeVisible();

  await page.getByTestId("open-latest-receipt").first().click();
  await expect(page.getByRole("rowheader", { name: "walletAddress" })).toBeVisible();
  const walletRow = page.getByRole("row").filter({ has: page.getByRole("rowheader", { name: "walletAddress" }) });
  await expect(walletRow).toContainText("0x000000000000000000000000000000000000BEEF");
});

test("connected browser wallet can send and bind a chain proof", async ({ page }) => {
  const txHash = `0x${"2".repeat(64)}`;
  await page.addInitScript((hash) => {
    const account = "0x1111111111111111111111111111111111111111";
    const browserWindow = globalThis as unknown as {
      ethereum: {
        on(): void;
        request(args: { method: string }): Promise<string[] | string | null>;
      };
    };
    browserWindow.ethereum = {
      on() {},
      async request(args: { method: string }) {
        if (args.method === "eth_requestAccounts") return [account];
        if (args.method === "wallet_switchEthereumChain") return null;
        if (args.method === "eth_sendTransaction") return hash;
        return null;
      }
    };
  }, txHash);

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByTestId("connect-wallet").click();
  await expect(page.getByText(/Browser wallet connected/i).first()).toBeVisible();

  await page.goto("/app", { waitUntil: "domcontentloaded" });
  await page.getByTestId("run-refusal").click();
  await page.getByTestId("open-latest-receipt").first().click();
  await page.getByTestId("send-chain-wallet").click();

  await expect(page.getByRole("heading", { name: "Chain proof submitted" })).toBeVisible({ timeout: 20000 });
  await expect(page.getByRole("link", { name: "Open explorer tx" })).toHaveAttribute("href", /0x2222/, { timeout: 20000 });
});

test("judge can bind a real tx hash to a receipt when chain proof is available", async ({ page }) => {
  await page.goto("/app", { waitUntil: "domcontentloaded" });
  await page.getByTestId("run-refusal").click();
  await page.getByTestId("open-latest-receipt").first().click();

  const txHash = `0x${"1".repeat(64)}`;
  await page.getByLabel("Explorer tx hash").fill(txHash);
  await page.getByRole("button", { name: "Bind tx hash" }).click();

  await expect(page.getByRole("heading", { name: "Chain proof submitted" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open explorer tx" })).toBeVisible();
});

test("auditor role can inspect public receipts and build page shows contract status", async ({ page }) => {
  await page.goto("/app", { waitUntil: "domcontentloaded" });
  await page.getByTestId("run-refusal").click();
  await page.goto("/app/receipts?role=auditor", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Persisted proof rail" })).toBeVisible();
  await expect(page.getByText("auditor")).toBeVisible();
  await expect(page.getByTestId("open-latest-receipt").first()).toBeVisible();

  await page.goto("/app/policy", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Bounded standing actions" })).toBeVisible();
  await expect(page.getByText("No-sell principal")).toBeVisible();

  await page.goto("/about", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: /Cloudflare Worker/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Contracts pending|Contracts configured/i })).toBeVisible();
});
