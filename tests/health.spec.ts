import { expect, test } from "@playwright/test";

test("health endpoint returns build and storage evidence", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBe(true);
  const data = await response.json();
  expect(data.ok).toBe(true);
  expect(data.storage).toContain("Durable Object");
  expect(data.visualLane).toBe("operational-dashboard");
});
