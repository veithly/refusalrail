import { expect, test } from "@playwright/test";

test("fresh guest reaches first refusal receipt without signup", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /Reject 1 unsafe RWA agent trade/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Run refused trade/i })).toBeVisible();

  await page.getByRole("link", { name: /Run refused trade/i }).click();
  await expect(page).toHaveURL(/\/app$/);

  await expect(page.getByText(/Choose the shock/i)).toBeVisible();
  await expect(page.getByText(/Receipt rail/i)).toBeVisible();

  await page.getByRole("radio", { name: /MARKET_HALT/i }).click();
  await page.getByTestId("run-refusal").click();

  await expect(page.getByLabel("Refused")).toBeVisible();
  await expect(page.getByText(/Receipt .* saved for .* with proof/i)).toBeVisible();
  await expect(page.getByTestId("open-latest-receipt").first()).toBeVisible();
});
