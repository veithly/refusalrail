import { expect, test } from "@playwright/test";

test.skip(!process.env.DEPLOYED_URL, "Set DEPLOYED_URL to run public Cloudflare smoke.");

test("deployed hero opens and exposes the workbench CTA", async ({ page }) => {
  await page.goto(process.env.DEPLOYED_URL || "/");
  await expect(page.getByRole("heading", { name: /Reject 1 unsafe RWA agent trade/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Run refused trade/i })).toBeVisible();
});
