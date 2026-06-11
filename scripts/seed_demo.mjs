#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const baseUrl = process.env.SEED_BASE_URL || process.env.PLAYWRIGHT_BASE_URL || "http://localhost:4387";
const manifestPath = resolve(".hunter/seed-manifest.json");
const demoTestWallet = "0x2eE81C112CA5A5Fd7123644f4c18262a05175c66";
let cookie = "";

const scenarios = [
  {
    label: "demo-market-halt",
    path: "/api/runs/refuse",
    body: { shock: "MARKET_HALT", walletAddress: demoTestWallet, roleId: "holder" }
  },
  {
    label: "demo-stale-price",
    path: "/api/runs/refuse",
    body: { shock: "STALE_PRICE", walletAddress: demoTestWallet, roleId: "holder" }
  },
  {
    label: "demo-safe-sweep",
    path: "/api/runs/safe",
    body: { walletAddress: demoTestWallet, roleId: "holder" }
  }
];

async function postScenario(scenario) {
  const response = await fetch(new URL(scenario.path, baseUrl), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(cookie ? { cookie } : {})
    },
    body: JSON.stringify(scenario.body)
  });
  const setCookie = response.headers.get("set-cookie");
  if (setCookie) cookie = setCookie.split(";")[0];
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`${scenario.label} failed with ${response.status}: ${JSON.stringify(data)}`);
  }
  return {
    label: scenario.label,
    route: scenario.path,
    receiptId: data.receipt?.id || null,
    status: data.receipt?.status || null,
    shock: data.receipt?.shock || scenario.body.shock || "NONE",
    reasonCode: data.receipt?.reasonCode || null,
    proofHash: data.receipt?.proofHash || null,
    walletAddress: scenario.body.walletAddress
  };
}

const records = [];
for (const scenario of scenarios) {
  records.push(await postScenario(scenario));
}

await mkdir(resolve(".hunter"), { recursive: true });
await writeFile(
  manifestPath,
  `${JSON.stringify(
    {
      rows: records.length,
      source: "scripts/seed_demo.mjs",
      base_url: baseUrl,
      mode: "explicit-demo-seed",
      records,
      reviewer_note:
        "Normal guest receipts are created live. Optional seed rows use the funded Arbitrum Sepolia test wallet and are marked as demo-only evidence."
    },
    null,
    2
  )}\n`
);

console.log(`Seeded ${records.length} demo receipts at ${baseUrl}`);
console.log(`Updated ${manifestPath}`);
