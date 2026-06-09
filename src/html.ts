import { POLICY, shortHash } from "./policy";
import type { DeploymentInfo, PolicySnapshot, ReceiptRecord, ShockCode } from "./types";
import { walletIslandCssBase64, walletIslandJsBase64 } from "./generated/wallet-island";

const shockCopy: Record<ShockCode, string> = {
  NONE: "No shock",
  MARKET_HALT: "Market halt",
  STALE_PRICE: "Stale price",
  MAX_EXPOSURE: "Max exposure"
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    };
    return map[char] || char;
  });
}

function scriptSafe(value: string): string {
  return value.replace(/<\/script/gi, "<\\/script");
}

function decodeBase64(value: string): string {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new TextDecoder().decode(bytes);
}

const walletIslandJs = decodeBase64(walletIslandJsBase64);
const walletIslandCss = decodeBase64(walletIslandCssBase64);

function receiptStatusLabel(receipt: ReceiptRecord): string {
  return receipt.status === "refused" ? "NO" : "OK";
}

function receiptCard(receipt: ReceiptRecord): string {
  const tone = receipt.status === "refused" ? "danger" : "success";
  return `
    <article class="receipt-card ${tone}" data-receipt-id="${escapeHtml(receipt.id)}">
      <div class="receipt-top">
        <span class="stamp-mini">${receiptStatusLabel(receipt)}</span>
        <div>
          <strong>${escapeHtml(receipt.reasonCode)}</strong>
          <span>${escapeHtml(shockCopy[receipt.shock])}</span>
        </div>
      </div>
      <dl class="receipt-facts">
        <div><dt>proof</dt><dd>${escapeHtml(shortHash(receipt.proofHash))}</dd></div>
        <div><dt>policy</dt><dd>${escapeHtml(shortHash(receipt.policyHash))}</dd></div>
      </dl>
      <a class="text-link" data-testid="open-latest-receipt" href="/app/receipts/${encodeURIComponent(receipt.id)}">Open receipt</a>
    </article>`;
}

function receiptList(receipts: ReceiptRecord[]): string {
  if (!receipts.length) {
    return emptyState(
      "receipt-empty",
      "No receipts yet",
      "Run the refusal path to create evidence. These examples show the three proof rows a judge can create in under a minute.",
      "/app",
      "Run refusal",
      ["MARKET_HALT", "STALE_PRICE", "MAX_EXPOSURE"]
    );
  }
  return receipts.map(receiptCard).join("");
}

function emptyState(
  name: string,
  title: string,
  body: string,
  ctaHref: string,
  ctaLabel: string,
  examples: string[]
): string {
  return `<div class="empty EmptyState" data-empty-state="${escapeHtml(name)}">
    <strong>${escapeHtml(title)}</strong>
    <p>${escapeHtml(body)}</p>
    <div class="example-row" aria-label="Try these examples">
      ${examples
        .map((example) => `<a href="${escapeHtml(ctaHref)}" data-placeholder-example>${escapeHtml(example)} <span data-demo-badge>(demo)</span></a>`)
        .join("")}
    </div>
    <a class="rr-btn rr-btn-danger" data-empty-cta data-next-step-cta href="${escapeHtml(ctaHref)}">${escapeHtml(ctaLabel)}</a>
  </div>`;
}

function shell(title: string, body: string, options: { composition?: string; path?: string; deployment?: DeploymentInfo } = {}): string {
  const deployment = options.deployment;
  const walletConfig = {
    projectId: deployment?.walletConnectProjectId || "refusalrail-demo-walletconnect",
    rpcUrl: deployment?.publicRpcUrl || "https://sepolia-rollup.arbitrum.io/rpc",
    chainId: Number(deployment?.chainId || "421614")
  };
  return `<!doctype html>
<html lang="en" data-density="comfortable">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="Reject 1 unsafe RWA trade in 60 seconds.">
  <meta property="og:title" content="RefusalRail">
  <meta property="og:description" content="Reject 1 unsafe RWA trade, stamp NO, and save proof.">
  <meta property="og:image" content="/brand/og.svg">
  <link rel="icon" href="/brand/logomark.svg">
  <style>${styles()}${walletIslandCss}</style>
</head>
<body>
  <main class="shell" data-mode="test-mode" data-visual-lane="operational-dashboard" data-hero-composition="${escapeHtml(options.composition || "cockpit-workbench")}">
    <header class="topbar">
      <a class="brand" href="/" aria-label="RefusalRail home">
        <span class="brand-mark"><img src="/brand/logomark.svg" alt="RefusalRail logomark"></span>
        <span>RefusalRail</span>
      </a>
      <nav aria-label="Primary">
        <a ${options.path === "/" ? "aria-current=\"page\"" : ""} href="/">Home</a>
        <a ${options.path === "/app" ? "aria-current=\"page\"" : ""} href="/app">Workbench</a>
        <a ${options.path === "/app/policy" ? "aria-current=\"page\"" : ""} href="/app/policy">Policy</a>
        <a ${options.path === "/app/receipts" ? "aria-current=\"page\"" : ""} href="/app/receipts">Receipts</a>
        <a ${options.path === "/about" ? "aria-current=\"page\"" : ""} href="/about">Build</a>
      </nav>
      <div class="topbar-tools" aria-label="Workbench controls">
        <button class="tool-btn" type="button" data-command-toggle aria-label="Open command palette">Cmd-K</button>
        <button class="tool-btn" type="button" data-density-button="compact">Compact</button>
        <button class="tool-btn active" type="button" data-density-button="comfortable">Comfortable</button>
        <button class="tool-btn active" type="button" data-mode-button="test-mode">TestMode</button>
        <button class="tool-btn" type="button" data-mode-button="live-mode">LiveMode</button>
      </div>
      <div class="wallet-dock" data-wallet-dock aria-label="Wallet controls">
        <div class="rainbowkit-mount" data-rainbowkit-root>
          <span class="wallet-status" data-wallet-status>Loading wallet</span>
        </div>
        <button class="tool-btn wallet-btn" type="button" data-testid="use-test-wallet" data-test-wallet>Use test wallet</button>
      </div>
    </header>
    <div class="command-palette" role="dialog" aria-modal="false" aria-label="CommandPalette" data-command-palette hidden>
      <input type="search" aria-label="Search routes, actions, receipts">
      <a href="/app">Run refused trade</a>
      <a href="/app/policy">Inspect policy</a>
      <a href="/app/receipts">Open receipt history</a>
      <a href="/about">Check deployment</a>
      <a href="/api/health">Open health JSON</a>
    </div>
    <div class="layout-shell">
      <aside class="side-rail" data-collapse-toggle="primary" aria-label="Primary sidebar">
        <a ${options.path === "/" ? "aria-current=\"page\"" : ""} href="/">Home</a>
        <a ${options.path === "/app" ? "aria-current=\"page\"" : ""} href="/app">Workbench</a>
        <a ${options.path === "/app/policy" ? "aria-current=\"page\"" : ""} href="/app/policy">Policy</a>
        <a ${options.path === "/app/receipts" ? "aria-current=\"page\"" : ""} href="/app/receipts">Receipts</a>
        <a ${options.path === "/about" ? "aria-current=\"page\"" : ""} href="/about">Build</a>
      </aside>
      <section class="content-rail">
        ${body}
      </section>
    </div>
  </main>
  <script>window.__RR_WALLET_CONFIG__ = ${scriptSafe(JSON.stringify(walletConfig))};</script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
  <script>${clientScript()}</script>
  <script>${scriptSafe(walletIslandJs)}</script>
</body>
</html>`;
}

export function renderHome(receipts: ReceiptRecord[], deployment?: DeploymentInfo): string {
  const latest = receipts[0];
  return shell(
    "RefusalRail",
    `<section class="hero-chapter" data-gsap="image-scale-fade">
      <div class="hero-copy">
        <h1 data-hero-text>Reject 1 unsafe RWA agent trade in 60 seconds.</h1>
        <p class="lede">Connect a wallet or use the built-in test wallet, choose a shock, and watch the policy rail refuse unsafe calldata while saving a durable receipt.</p>
        <div class="hero-actions">
          <button class="rr-btn rr-btn-danger" data-testid="connect-wallet" data-cta-primary data-wallet-connect type="button">Connect wallet</button>
          <button class="rr-btn rr-btn-secondary" data-test-wallet type="button">Use test wallet</button>
          <a class="rr-btn rr-btn-ghost" href="/app">Run refused trade</a>
        </div>
      </div>
      <section class="hero-console" aria-label="Wallet and refusal preview">
        <div class="wallet-ledger-card">
          <div class="panel-title">
            <span>Execution identity</span>
            <strong data-wallet-status>Guest proof mode</strong>
          </div>
          <div class="wallet-address-line" data-wallet-address>Connect wallet or choose test wallet</div>
          <div class="chain-mini-grid">
            <div><span>chain</span><strong>Arbitrum Sepolia</strong></div>
            <div><span>hub</span><strong>0x3540...0Cf8</strong></div>
          </div>
        </div>
        <div class="action-card refusal-card">
          <div class="action-meta">
            <span class="status-dot danger"></span>
            <span>Agent action</span>
          </div>
          <h2>Sell principal after market halt</h2>
          <p>Policy allows distribution sweep only.</p>
          <div class="refusal-slab" aria-label="Refused">REFUSED</div>
        </div>
        <div class="receipt-strip">
          ${
            latest
              ? receiptCard(latest)
              : emptyState(
                  "home-empty",
                  "Receipt rail is ready",
                  "Use the test wallet if you do not have a browser wallet, then open the durable proof.",
                  "/app",
                  "Create first receipt",
                  ["market halt", "stale price", "exposure breach"]
                )
          }
        </div>
      </section>
    </section>
    <section class="proof-bento" data-gsap="scrub-text" aria-label="Product proof surfaces">
      <article class="bento-card bento-wide">
        <h2>Wallet identity is part of the receipt.</h2>
        <p>Guest, test wallet, and connected wallet flows all write an explicit wallet address into the Durable Object proof record.</p>
      </article>
      <article class="bento-card bento-tall">
        <h3>Send chain tx</h3>
        <p>Receipt detail prepares RefusalHub calldata and can ask the connected wallet to send it on Arbitrum Sepolia.</p>
      </article>
      <article class="bento-card bento-small">
        <h3>Policy first</h3>
        <p>Shock state changes the verdict before value can move.</p>
      </article>
      <article class="bento-card bento-small">
        <h3>Test wallet path</h3>
        <p>Judges can run the whole flow without importing private keys.</p>
      </article>
      <article class="bento-card bento-small">
        <h3>Receipts persist</h3>
        <p>Proof hashes survive refresh in the Cloudflare Durable Object ledger.</p>
      </article>
    </section>
    <section class="marquee-band" aria-label="Proof loop">
      <div class="marquee-track">
        <span>Connect wallet</span><span>Choose shock</span><span>Refuse action</span><span>Save receipt</span><span>Prepare calldata</span><span>Send tx</span>
        <span>Connect wallet</span><span>Choose shock</span><span>Refuse action</span><span>Save receipt</span><span>Prepare calldata</span><span>Send tx</span>
      </div>
    </section>
    <section class="final-cta">
      <h2>Run the refusal path with a wallet in the loop.</h2>
      <a class="rr-btn rr-btn-danger" href="/app">Open workbench</a>
    </section>`,
    { composition: "cockpit-workbench", path: "/", deployment }
  );
}

export function renderApp(
  receipts: ReceiptRecord[],
  deployment: DeploymentInfo,
  selectedShock: ShockCode = "MARKET_HALT"
): string {
  return shell(
    "RefusalRail Workbench",
    `<section class="workbench">
      <aside class="panel shock-panel" aria-label="Shock cards">
        <div class="section-head">
          <p class="kicker">Judge input</p>
          <h1>Choose the shock</h1>
        </div>
        <div class="shock-grid" role="radiogroup" aria-label="Shock code">
          ${(["MARKET_HALT", "STALE_PRICE", "MAX_EXPOSURE"] as ShockCode[])
            .map(
              (shock) => `<button class="shock-card ${selectedShock === shock ? "selected" : ""}" type="button" role="radio" aria-checked="${selectedShock === shock}" data-shock="${shock}">
                <span>${shock}</span>
                <small>${shockCopy[shock]}</small>
              </button>`
            )
            .join("")}
        </div>
      </aside>
      <section class="panel action-panel">
        <div class="section-head">
          <p class="kicker">Agent action</p>
          <h2>The trade should fail before principal moves.</h2>
          <p>Policy: claim distribution and sweep proceeds; never sell principal during shock conditions.</p>
        </div>
        <div class="wallet-workbench" data-empty-state="wallet-state">
          <div>
            <span>Execution wallet</span>
            <strong data-wallet-status>Guest proof mode</strong>
            <code data-wallet-address>Connect wallet or choose test wallet</code>
          </div>
          <div class="wallet-actions">
            <button class="rr-btn rr-btn-secondary" type="button" data-testid="connect-wallet-workbench" data-wallet-connect>Connect wallet</button>
            <button class="rr-btn rr-btn-secondary" type="button" data-testid="use-test-wallet-workbench" data-test-wallet>Use test wallet</button>
          </div>
        </div>
        <div class="chain-banner ${deployment.status === "configured" ? "success" : "pending"}">
          <strong>${deployment.status === "configured" ? "Chain proof ready" : "Chain proof pending"}</strong>
          <span>${
            deployment.status === "configured"
              ? `RefusalHub ${escapeHtml(shortHash(deployment.refusalHub))} on ${escapeHtml(deployment.chainName)}`
              : "The full product flow works now. Add contract env vars after deployment to enable wallet transaction preparation."
          }</span>
        </div>
        <div class="calldata-card" data-empty-state="calldata-preview">
          <span>Attempted calldata</span>
          <strong id="calldata-label">sell_principal(tokenized_etf, shock=${selectedShock})</strong>
          <small>Policy executes before the agent can move principal.</small>
          <div class="example-row" aria-label="Shock examples">
            <button type="button" data-placeholder-example data-shock="MARKET_HALT">MARKET_HALT <span data-demo-badge>(demo)</span></button>
            <button type="button" data-placeholder-example data-shock="STALE_PRICE">STALE_PRICE <span data-demo-badge>(demo)</span></button>
            <button type="button" data-placeholder-example data-shock="MAX_EXPOSURE">MAX_EXPOSURE <span data-demo-badge>(demo)</span></button>
          </div>
        </div>
        <div id="stamp-target" class="stamp-target" aria-live="polite"></div>
        <div class="button-row">
          <button class="rr-btn rr-btn-danger" data-testid="run-refusal" data-next-step-cta type="button">Let the agent try</button>
          <button class="rr-btn rr-btn-success" data-testid="run-safe" type="button">Run safe sweep</button>
        </div>
        <p id="run-status" class="run-status" role="status">Connect a wallet, use the test wallet, or continue as a guest. Then run the unsafe attempt.</p>
      </section>
      <aside class="panel receipt-panel">
        <div class="section-head">
          <p class="kicker">Flight recorder</p>
          <h2>Receipt rail</h2>
        </div>
        <div id="receipt-list" class="receipt-list">${receiptList(receipts.slice(0, 4))}</div>
      </aside>
    </section>`,
    { composition: "policy-flight-recorder", path: "/app", deployment }
  );
}

export function renderPolicy(policy: PolicySnapshot, deployment?: DeploymentInfo): string {
  return shell(
    "RefusalRail Policy",
    `<section class="page-grid">
      <div class="panel wide">
        <p class="kicker">Policy matrix</p>
        <h1>Bounded standing actions</h1>
        <p class="lede small">The same policy refuses unsafe principal sale and allows narrow distribution sweep.</p>
        <table class="policy-table">
          <tbody>
            <tr><th>Policy id</th><td>${escapeHtml(policy.id)}</td></tr>
            <tr><th>No-sell principal</th><td>${policy.noSellPrincipal ? "enforced" : "off"}</td></tr>
            <tr><th>Distribution sweep</th><td>${policy.allowDistributionSweep ? "allowed" : "blocked"}</td></tr>
            <tr><th>Max exposure</th><td>${policy.maxExposureBps / 100}%</td></tr>
            <tr><th>Stale price limit</th><td>${policy.stalePriceSeconds}s</td></tr>
            <tr><th>Policy hash</th><td><code>${escapeHtml(policy.policyHash)}</code></td></tr>
          </tbody>
        </table>
      </div>
      <div class="panel">
        <p class="kicker">Calldata preview</p>
        <h2>Unsafe path</h2>
        <pre class="code-block">actionType: SELL_PRINCIPAL
shock: MARKET_HALT
expected: ActionRefused</pre>
        <a class="rr-btn rr-btn-danger" href="/app">Run refusal</a>
        <p class="policy-note" contenteditable="true" data-inline-edit="policy-note">Reviewer note: distribution sweeps can pass; principal sales are refused during shocks.</p>
      </div>
    </section>`,
    { composition: "policy-flight-recorder", path: "/app/policy", deployment }
  );
}

export function renderReceipts(receipts: ReceiptRecord[], roleId: string, deployment?: DeploymentInfo): string {
  return shell(
    "RefusalRail Receipts",
    `<section class="page-grid">
      <div class="panel wide">
        <div class="section-head inline">
          <div>
            <p class="kicker">Receipt history</p>
            <h1>Persisted proof rail</h1>
          </div>
          <div class="role-switch" data-empty-state="role-state">
            <a class="${roleId === "holder" ? "active" : ""}" href="/app/receipts?role=holder">holder</a>
            <a class="${roleId === "auditor" ? "active" : ""}" href="/app/receipts?role=auditor">auditor</a>
          </div>
        </div>
        <div class="receipt-list grid">${receiptList(receipts)}</div>
      </div>
    </section>`,
    { composition: "policy-flight-recorder", path: "/app/receipts", deployment }
  );
}

export function renderReceiptDetail(receipt: ReceiptRecord | null, deployment: DeploymentInfo): string {
  if (!receipt) {
    return shell(
      "Receipt not found",
      `<section class="panel"><h1>Receipt not found</h1><p>The proof id is not in this ledger.</p>${emptyState(
        "receipt-detail-empty",
        "Try a known proof path",
        "Open receipt history or create a new refused action. Detail pages are generated only after the Durable Object saves a receipt.",
        "/app/receipts",
        "Back to receipts",
        ["latest refused receipt", "prepared chain proof", "JSON export"]
      )}</section>`,
      { composition: "policy-flight-recorder", path: "/app/receipts", deployment }
    );
  }
  const rows = [
    ["status", receipt.status],
    ["reason", receipt.reasonCode],
    ["action", receipt.actionType],
    ["shock", receipt.shock],
    ["ownerId", receipt.ownerId],
    ["roleId", receipt.roleId],
    ["walletAddress", receipt.walletAddress],
    ["policyHash", receipt.policyHash],
    ["calldataHash", receipt.calldataHash],
    ["shockHash", receipt.shockHash],
    ["proofHash", receipt.proofHash],
    ["fallbackRoute", receipt.fallbackRoute],
    ["chainProofStatus", receipt.chainProofStatus],
    ["chainTxHash", receipt.chainTxHash || "pending live chain deployment"],
    ["explorerUrl", receipt.explorerUrl || "pending live chain deployment"]
  ];
  const chainPanel =
    receipt.chainTxHash && receipt.explorerUrl
      ? `<div class="chain-panel success">
          <h2>Chain proof submitted</h2>
          <p>The receipt is linked to an explorer transaction.</p>
          <a class="rr-btn rr-btn-success" href="${escapeHtml(receipt.explorerUrl)}" target="_blank" rel="noreferrer">Open explorer tx</a>
        </div>`
      : `<div class="chain-panel ${deployment.status === "configured" ? "success" : "pending"}" data-testid="chain-proof-panel">
          <h2>${deployment.status === "configured" ? "Prepare chain proof" : "Chain proof pending"}</h2>
          <p>${
            deployment.status === "configured"
              ? "Contract addresses are configured. Prepare the RefusalHub transaction, send it with a wallet or script, then bind the tx hash here."
              : "No contract addresses are configured yet. The receipt is complete as a Cloudflare proof, and this panel becomes actionable after deployment env vars are set."
          }</p>
          <div class="button-row">
            <button class="rr-btn rr-btn-secondary" type="button" data-testid="prepare-chain-action" data-receipt-id="${escapeHtml(receipt.id)}">Prepare tx data</button>
            <button class="rr-btn rr-btn-danger" type="button" data-testid="send-chain-wallet" data-receipt-id="${escapeHtml(receipt.id)}">Send with connected wallet</button>
          </div>
          <pre class="code-block" id="chain-action-output" aria-live="polite">RefusalHub: ${escapeHtml(deployment.refusalHub || "pending")}</pre>
          <form class="tx-bind-form" data-testid="bind-chain-form" data-receipt-id="${escapeHtml(receipt.id)}">
            <label for="chainTxHash">Explorer tx hash</label>
            <input id="chainTxHash" name="chainTxHash" autocomplete="off" inputmode="text" />
            <button class="rr-btn rr-btn-danger" type="submit">Bind tx hash</button>
          </form>
          <p class="run-status" id="chain-bind-status"></p>
        </div>`;
  return shell(
    `Receipt ${receipt.id}`,
    `<section class="receipt-detail">
      <div class="panel receipt-hero ${receipt.status === "refused" ? "danger" : "success"}">
        <span class="stamp-big">${receiptStatusLabel(receipt)}</span>
        <div>
          <p class="kicker">Receipt ${escapeHtml(receipt.id)}</p>
          <h1>${escapeHtml(receipt.reasonCode)}</h1>
          <p>Created ${escapeHtml(receipt.createdAt)}. This proof survives refresh because it is stored by the RefusalLedger Durable Object.</p>
        </div>
      </div>
      <div class="panel wide">
        <h2>Proof table</h2>
        <table class="policy-table proof-table">
          <tbody>${rows
            .map(([key, value]) => `<tr><th>${escapeHtml(key)}</th><td><code>${escapeHtml(String(value))}</code></td></tr>`)
            .join("")}</tbody>
        </table>
        <details>
          <summary>JSON export</summary>
          <pre class="code-block">${escapeHtml(JSON.stringify(receipt, null, 2))}</pre>
        </details>
      </div>
      ${chainPanel}
    </section>`,
    { composition: "policy-flight-recorder", path: "/app/receipts", deployment }
  );
}

export function renderAbout(deployment: DeploymentInfo): string {
  return shell(
    "RefusalRail Build",
    `<section class="page-grid">
      <div class="panel wide">
        <p class="kicker">Architecture</p>
        <h1>Cloudflare Worker, Durable Object ledger, Solidity policy contracts.</h1>
        <p class="lede small">The hero path is deployable on Cloudflare without private keys. Contract deployment can be added once the target chain wallet is funded.</p>
        <div class="architecture-grid">
          <div><strong>Worker</strong><span>HTML, API, session, health</span></div>
          <div><strong>Durable Object</strong><span>SQLite-backed receipt ledger</span></div>
          <div><strong>Contracts</strong><span>RefusalHub, PolicyRegistry, RefusalReceipt</span></div>
          <div><strong>Tests</strong><span>policy, hero path, receipt detail</span></div>
        </div>
      </div>
      <div class="panel">
        <p class="kicker">Chain deployment</p>
        <h2>${deployment.status === "configured" ? "Contracts configured" : "Contracts pending"}</h2>
        <table class="policy-table compact">
          <tbody>
            <tr><th>chain</th><td>${escapeHtml(deployment.chainName)} (${escapeHtml(deployment.chainId)})</td></tr>
            <tr><th>RefusalHub</th><td><code>${escapeHtml(deployment.refusalHub || "pending")}</code></td></tr>
            <tr><th>PolicyRegistry</th><td><code>${escapeHtml(deployment.policyRegistry || "pending")}</code></td></tr>
            <tr><th>RefusalReceipt</th><td><code>${escapeHtml(deployment.refusalReceipt || "pending")}</code></td></tr>
            <tr><th>DemoRWAAsset</th><td><code>${escapeHtml(deployment.demoRwaAsset || "pending")}</code></td></tr>
          </tbody>
        </table>
      </div>
      <div class="panel">
        <p class="kicker">Commands</p>
        <pre class="code-block">npm run build
npm test
npm run deploy:dry
npm run contracts:deploy</pre>
        <a class="rr-btn rr-btn-secondary" href="/api/health">Open health JSON</a>
      </div>
    </section>`,
    { composition: "policy-flight-recorder", path: "/about", deployment }
  );
}

export function renderAsset(pathname: string): Response | null {
  const svgHeaders = { "content-type": "image/svg+xml; charset=utf-8", "cache-control": "public, max-age=86400" };
  if (pathname === "/brand/logomark.svg") {
    return new Response(`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="RefusalRail logomark"><rect width="100" height="100" rx="14" fill="#0b1019"/><g fill="none" stroke="#f4f7fb" stroke-linecap="round" stroke-linejoin="round"><path d="M24 22v56" stroke-width="5"/><path d="M40 22v56" stroke-width="5"/><path d="M26 34h46" stroke-width="5"/><path d="M26 50h34" stroke-width="5"/><path d="M26 66h46" stroke-width="5"/><circle cx="72" cy="50" r="15" stroke-width="5"/><path d="M63 41l18 18" stroke="#c52a24" stroke-width="5"/></g></svg>`, { headers: svgHeaders });
  }
  if (pathname === "/brand/wordmark.svg") {
    return new Response(`<svg viewBox="0 0 560 120" xmlns="http://www.w3.org/2000/svg" aria-label="RefusalRail wordmark"><g transform="translate(0 10)"><rect width="100" height="100" rx="14" fill="#0b1019"/><g fill="none" stroke="#f4f7fb" stroke-linecap="round" stroke-linejoin="round"><path d="M24 22v56" stroke-width="5"/><path d="M40 22v56" stroke-width="5"/><path d="M26 34h46" stroke-width="5"/><path d="M26 50h34" stroke-width="5"/><path d="M26 66h46" stroke-width="5"/><circle cx="72" cy="50" r="15" stroke-width="5"/><path d="M63 41l18 18" stroke="#c52a24" stroke-width="5"/></g></g><text x="124" y="72" fill="#f4f7fb" font-family="Geist, Arial, sans-serif" font-size="48" font-weight="800">RefusalRail</text><text x="126" y="98" fill="#9ba9bd" font-family="Geist Mono, Menlo, monospace" font-size="16">policy flight recorder</text></svg>`, { headers: svgHeaders });
  }
  if (pathname === "/brand/og.svg") {
    return new Response(`<svg viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" aria-label="RefusalRail social preview"><rect width="1200" height="630" fill="#0b1019"/><circle cx="980" cy="90" r="300" fill="#c52a24" opacity=".22"/><circle cx="120" cy="560" r="260" fill="#33885c" opacity=".16"/><g transform="translate(96 94)"><rect width="112" height="112" rx="16" fill="#f4f7fb"/><g fill="none" stroke="#0b1019" stroke-linecap="round" stroke-linejoin="round" transform="translate(6 6)"><path d="M24 22v56" stroke-width="5"/><path d="M40 22v56" stroke-width="5"/><path d="M26 34h46" stroke-width="5"/><path d="M26 50h34" stroke-width="5"/><path d="M26 66h46" stroke-width="5"/><circle cx="72" cy="50" r="15" stroke-width="5"/><path d="M63 41l18 18" stroke="#c52a24" stroke-width="5"/></g></g><text x="96" y="284" fill="#f4f7fb" font-family="Geist, Arial, sans-serif" font-size="82" font-weight="850">Reject 1 unsafe RWA trade.</text><text x="100" y="354" fill="#b5becc" font-family="Geist, Arial, sans-serif" font-size="34">Connect a wallet, run the shock, stamp NO, save proof.</text><text x="100" y="512" fill="#f4f7fb" font-family="Geist Mono, Menlo, monospace" font-size="24">Arbitrum Sepolia · Cloudflare Worker · Durable receipts</text></svg>`, { headers: svgHeaders });
  }
  return null;
}

function styles(): string {
  return `
:root {
  color-scheme: dark;
  --bg: rgb(11, 16, 25);
  --surface: rgb(25, 34, 48);
  --surface-2: rgb(35, 47, 64);
  --ink: rgb(245, 247, 251);
  --muted: rgb(181, 190, 204);
  --danger: rgb(184, 38, 32);
  --danger-soft: rgb(68, 26, 27);
  --success: rgb(51, 136, 92);
  --success-soft: rgb(27, 67, 48);
  --line: rgb(74, 87, 110);
  --focus: rgb(109, 214, 152);
  --space-1: 8px;
  --row-h: 44px;
}
:root[data-density="compact"] {
  --space-1: 4px;
  --row-h: 30px;
}
:root[data-density="comfortable"] {
  --space-1: 8px;
  --row-h: 44px;
}
* { box-sizing: border-box; }
html { min-height: 100%; background: var(--bg); }
body { margin: 0; min-height: 100%; color: var(--ink); font-family: Geist, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; letter-spacing: 0; overflow-x: hidden; }
a { color: inherit; }
.shell { min-height: 100vh; width: 100%; max-width: 100%; overflow-x: hidden; padding: 18px; background: radial-gradient(circle at 78% 14%, rgba(184, 38, 32, 0.22), transparent 34rem), radial-gradient(circle at 10% 80%, rgba(51, 136, 92, 0.16), transparent 28rem), var(--bg); }
.topbar { position: sticky; top: 12px; z-index: 40; display: flex; align-items: center; justify-content: space-between; gap: 12px; margin: 0 auto 22px; max-width: 1500px; flex-wrap: wrap; padding: 10px; border: 1px solid var(--line); background: rgba(11, 16, 25, 0.88); backdrop-filter: blur(14px); }
.brand { display: inline-flex; min-height: 44px; align-items: center; gap: 10px; text-decoration: none; font-weight: 800; }
.brand-mark { display: inline-grid; place-items: center; width: 34px; height: 34px; border: 1px solid var(--line); background: oklch(0.16 0.03 250); color: var(--ink); font-size: 13px; overflow: hidden; }
.brand-mark img { width: 100%; height: 100%; display: block; object-fit: cover; }
nav { display: flex; gap: 8px; flex-wrap: wrap; }
nav a { display: inline-flex; min-height: 44px; align-items: center; padding: 9px 12px; color: var(--muted); text-decoration: none; border: 1px solid transparent; }
nav a[aria-current="page"], nav a:hover { color: var(--ink); border-color: var(--line); background: var(--surface); }
.topbar-tools { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }
.tool-btn { min-height: 44px; min-width: 44px; border: 1px solid var(--line); background: transparent; color: var(--muted); padding: 0 10px; font-weight: 750; cursor: pointer; }
.tool-btn.active, .tool-btn:hover { color: var(--ink); background: var(--surface); }
.wallet-dock { display: flex; min-height: 44px; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }
.rainbowkit-mount { min-height: 44px; display: flex; align-items: center; justify-content: flex-end; }
.rr-rainbow-shell { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }
.rainbowkit-mount [data-rk] button { min-height: 44px !important; border-radius: 6px !important; font-weight: 850 !important; box-shadow: none !important; }
.rainbowkit-mount [data-rk] button div { font-weight: 850 !important; }
.rr-wallet-connect { min-height: 44px; min-width: 44px; border: 1px solid transparent; background: var(--danger); color: white; padding: 0 12px; font-weight: 850; cursor: pointer; }
.rr-wallet-connect:hover { filter: brightness(1.08); }
.rr-chain-switch { min-height: 40px; border: 1px solid oklch(0.62 0.1 75); background: oklch(0.18 0.04 75 / 0.72); color: var(--ink); padding: 0 10px; font-weight: 850; cursor: pointer; }
.rr-chain-switch:disabled { opacity: 0.65; cursor: wait; }
.wallet-status { display: inline-flex; min-height: 38px; align-items: center; border: 1px solid var(--line); background: var(--surface); color: var(--ink); padding: 0 10px; font-weight: 800; }
.wallet-btn { color: var(--ink); }
.wallet-btn[data-wallet-connect] { background: var(--danger); border-color: transparent; color: white; }
.command-palette { position: fixed; z-index: 50; top: 78px; left: 50%; transform: translateX(-50%); width: min(560px, calc(100vw - 32px)); padding: 12px; border: 1px solid var(--line); background: oklch(0.1 0.018 250); box-shadow: 0 24px 70px oklch(0 0 0 / 0.45); }
.command-palette input { width: 100%; min-height: 48px; padding: 0 14px; border: 1px solid var(--line); background: oklch(0.08 0.01 250); color: var(--ink); font: inherit; }
.command-palette a { display: flex; min-height: 44px; align-items: center; padding: 10px 12px; text-decoration: none; color: var(--ink); border-bottom: 1px solid var(--line); }
.layout-shell { max-width: 1500px; margin: 0 auto; display: grid; grid-template-columns: 164px minmax(0, 1fr); gap: 18px; align-items: start; }
.side-rail { position: sticky; top: 16px; display: grid; gap: 6px; border: 1px solid var(--line); background: oklch(0.12 0.02 250 / 0.88); padding: 10px; }
.side-rail a { display: flex; min-height: 44px; align-items: center; padding: 0 10px; text-decoration: none; color: var(--muted); border: 1px solid transparent; }
.side-rail a[aria-current="page"], .side-rail a:hover { color: var(--ink); border-color: var(--line); background: var(--surface); }
.content-rail { min-width: 0; }
.hero-grid, .hero-chapter, .proof-bento, .marquee-band, .final-cta, .workbench, .page-grid, .receipt-detail { max-width: 1500px; margin: 0 auto; }
.receipt-detail { display: grid; gap: 18px; }
.hero-grid { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(560px, 1.1fr); gap: 28px; align-items: stretch; }
.hero-chapter { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) minmax(420px, 0.78fr); gap: 48px; align-items: center; padding: 92px 0 120px; }
.hero-chapter::before { content: ""; position: absolute; inset: 52px -18px auto auto; width: min(42vw, 620px); height: 380px; background-image: url("https://picsum.photos/seed/refusalrail-rwa-custody/1200/800"); background-size: cover; background-position: center; filter: grayscale(1) contrast(1.15) brightness(0.58); opacity: 0.34; z-index: 0; }
.hero-copy { position: relative; z-index: 1; padding: 52px 0 36px; }
.kicker { margin: 0 0 12px; color: var(--muted); font-size: 0.86rem; font-weight: 750; letter-spacing: 0; }
h1, h2, h3, p { text-wrap: pretty; }
h1 { margin: 0; font-size: 4.5rem; line-height: 0.95; letter-spacing: 0; max-width: 11ch; }
.hero-chapter h1 { max-width: min(1120px, 100%); font-size: clamp(3rem, 5vw, 5.5rem); line-height: 0.98; text-wrap: balance; }
h2 { margin: 0; font-size: 1.75rem; line-height: 1.1; }
.lede { margin: 24px 0 0; max-width: 64ch; color: var(--muted); font-size: 1.18rem; line-height: 1.65; }
.lede.small { font-size: 1rem; }
.hero-actions, .button-row { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; margin-top: 32px; }
.rr-btn { display: inline-flex; min-height: 48px; align-items: center; justify-content: center; padding: 0 18px; border: 1px solid var(--line); background: var(--surface-2); color: var(--ink); text-decoration: none; font-weight: 800; cursor: pointer; font-size: 0.96rem; }
.rr-btn:focus-visible, button:focus-visible, a:focus-visible { outline: 3px solid var(--focus); outline-offset: 3px; }
.rr-btn-danger, .rr-btn-primary { border-color: transparent; background: var(--danger); color: white; }
.rr-btn-success { border-color: transparent; background: var(--success-soft); color: oklch(0.91 0.07 150); }
.rr-btn-secondary { background: transparent; }
.rr-btn-ghost { background: rgb(245, 247, 251); color: rgb(11, 16, 25); border-color: transparent; }
.hero-card, .panel { border: 1px solid var(--line); background: oklch(0.13 0.025 250 / 0.9); overflow: hidden; }
.hero-console { position: relative; z-index: 1; display: grid; gap: 14px; }
.hero-card { min-height: 700px; padding: 28px; display: grid; grid-template-rows: 1fr auto; gap: 18px; }
.action-card { position: relative; min-height: 430px; padding: 32px; border: 1px solid var(--line); background: oklch(0.1 0.018 250); overflow: hidden; }
.wallet-ledger-card { display: grid; gap: 16px; padding: 18px; border: 1px solid var(--line); background: rgba(25, 34, 48, 0.92); }
.panel-title { display: flex; gap: 12px; align-items: center; justify-content: space-between; }
.panel-title span, .wallet-ledger-card span { color: var(--muted); }
.wallet-address-line { min-height: 44px; display: flex; align-items: center; padding: 0 12px; border: 1px solid var(--line); background: rgb(11, 16, 25); color: var(--ink); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; overflow-wrap: anywhere; }
.chain-mini-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.chain-mini-grid div { padding: 12px; background: var(--surface-2); border: 1px solid var(--line); }
.chain-mini-grid strong, .chain-mini-grid span { display: block; }
.action-meta { display: flex; align-items: center; gap: 9px; color: var(--muted); font-weight: 700; }
.status-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--muted); }
.status-dot.danger { background: var(--danger); }
.action-card h2 { margin-top: 56px; font-size: 2.4rem; max-width: 12ch; }
.action-card p { color: var(--muted); font-size: 1.05rem; }
.stamp-big { display: inline-grid; place-items: center; width: 210px; height: 100px; border: 8px solid var(--danger); color: var(--danger); font-weight: 950; font-size: 4rem; transform: rotate(-10deg); margin-top: 34px; }
.refusal-slab { display: inline-grid; place-items: center; margin-top: 34px; width: min(100%, 360px); min-height: 96px; border: 2px solid var(--danger); background: var(--danger-soft); color: rgb(255, 241, 240); font-size: 2.2rem; font-weight: 950; }
.receipt-strip { display: grid; grid-template-columns: 1fr; gap: 12px; }
.proof-bento { display: grid; grid-template-columns: repeat(12, 1fr); grid-auto-flow: dense; gap: 12px; padding: 48px 0 118px; }
.bento-card { min-height: 190px; display: grid; align-content: end; gap: 12px; padding: 22px; border: 1px solid var(--line); background: rgba(25, 34, 48, 0.86); overflow: hidden; transition: transform 180ms ease-out, border-color 180ms ease-out; }
.bento-card:hover { transform: translateY(-3px); border-color: var(--focus); }
.bento-wide { grid-column: span 7; }
.bento-tall { grid-column: span 5; min-height: 392px; background-image: linear-gradient(rgba(11,16,25,0.48), rgba(11,16,25,0.94)), url("https://picsum.photos/seed/refusalrail-wallet-proof/960/1280"); background-size: cover; background-position: center; }
.bento-small { grid-column: span 4; }
.bento-card h2, .bento-card h3, .bento-card p { margin: 0; }
.bento-card h2 { max-width: 16ch; font-size: 2.15rem; }
.bento-card p { color: var(--muted); line-height: 1.55; }
.marquee-band { overflow: hidden; border-block: 1px solid var(--line); padding: 18px 0; }
.marquee-track { display: grid; grid-template-columns: repeat(auto-fit, minmax(168px, 1fr)); gap: 10px; color: var(--muted); font-weight: 850; }
.marquee-track span { display: inline-flex; min-height: 46px; align-items: center; justify-content: center; padding: 0 12px; border: 1px solid var(--line); background: rgba(25, 34, 48, 0.72); text-align: center; white-space: normal; }
.final-cta { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 94px 0 36px; }
.final-cta h2 { max-width: 720px; font-size: 2.8rem; }
.workbench { display: grid; grid-template-columns: 300px minmax(0, 1fr) 360px; gap: 18px; }
.panel { padding: 24px; min-width: 0; }
.wide { grid-column: span 2; }
.section-head { margin-bottom: 24px; }
.section-head.inline { display: flex; justify-content: space-between; gap: 16px; align-items: start; }
.shock-grid { display: grid; gap: 14px; }
.shock-card { min-height: 94px; padding: 18px; border: 1px solid var(--line); background: var(--surface-2); color: var(--ink); text-align: left; cursor: pointer; }
.shock-card span { display: block; font-weight: 900; font-size: 1rem; }
.shock-card small { display: block; margin-top: 10px; color: var(--muted); }
.shock-card.selected { background: var(--danger); border-color: transparent; color: white; }
.shock-card.selected small { color: oklch(0.94 0.03 24); }
.action-panel { position: relative; overflow: hidden; min-height: 620px; }
.calldata-card { padding: 22px; border: 1px solid var(--line); background: oklch(0.09 0.015 250); margin: 28px 0; }
.chain-banner { display: grid; gap: 6px; padding: 14px 16px; border: 1px solid var(--line); margin: 20px 0; }
.chain-banner span { color: var(--muted); }
.chain-banner.pending, .chain-panel.pending { border-color: oklch(0.62 0.1 75); background: oklch(0.18 0.04 75 / 0.35); }
.chain-banner.success, .chain-panel.success { border-color: var(--success); background: var(--success-soft); }
.wallet-workbench { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px; border: 1px solid var(--line); background: rgb(11, 16, 25); }
.wallet-workbench span, .wallet-workbench code { display: block; }
.wallet-workbench span { color: var(--muted); margin-bottom: 5px; }
.wallet-workbench code { margin-top: 7px; color: var(--ink); overflow-wrap: anywhere; }
.wallet-actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }
.calldata-card span, .calldata-card small { display: block; color: var(--muted); }
.calldata-card strong { display: block; margin: 10px 0; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; overflow-wrap: anywhere; }
.example-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px; }
.example-row a, .example-row button { display: inline-flex; min-height: 48px; align-items: center; gap: 5px; border: 1px solid var(--line); background: var(--surface-2); color: var(--ink); padding: 0 12px; text-decoration: none; font-weight: 800; cursor: pointer; }
[data-demo-badge] { color: var(--muted); font-size: 0.78rem; font-weight: 800; }
.stamp-target { min-height: 118px; }
.stamp-target .stamp-big { animation: stampIn 220ms ease-out both; }
.run-status { color: var(--muted); min-height: 24px; }
.receipt-list { display: grid; gap: 12px; }
.receipt-list.grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
.receipt-card { display: grid; gap: 12px; padding: 16px; border: 1px solid var(--line); background: oklch(0.1 0.018 250); }
.receipt-card.danger { border-color: var(--danger); background: var(--danger-soft); }
.receipt-card.success { border-color: var(--success); background: var(--success-soft); }
.receipt-top { display: flex; gap: 12px; align-items: center; }
.receipt-top span:not(.stamp-mini) { display: block; color: var(--muted); font-size: 0.86rem; }
.stamp-mini { display: inline-grid; place-items: center; width: 42px; height: 32px; border: 2px solid currentColor; font-weight: 950; color: var(--danger); transform: rotate(-8deg); }
.receipt-card.success .stamp-mini { color: var(--success); transform: none; }
.receipt-facts { display: grid; gap: 8px; margin: 0; }
.receipt-facts div { display: flex; justify-content: space-between; gap: 12px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.8rem; }
dt { color: var(--muted); }
dd { margin: 0; color: var(--ink); overflow-wrap: anywhere; }
.text-link { color: var(--ink); font-weight: 800; }
.empty { display: grid; gap: 12px; padding: 18px; border: 1px dashed var(--line); color: var(--muted); }
.empty strong { color: var(--ink); }
.empty p { margin: 0; line-height: 1.55; }
.page-grid { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(320px, 0.7fr); gap: 18px; }
.policy-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
.policy-table th, .policy-table td { padding: var(--space-1) 12px; min-height: var(--row-h); border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
.policy-table th { color: var(--muted); width: 220px; font-weight: 750; }
.policy-table code { overflow-wrap: anywhere; word-break: break-word; }
code, .code-block { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
.code-block { white-space: pre-wrap; overflow-x: auto; padding: 16px; background: oklch(0.08 0.01 250); border: 1px solid var(--line); color: var(--ink); }
.role-switch { display: inline-flex; border: 1px solid var(--line); }
.role-switch a { display: inline-flex; min-height: 44px; align-items: center; padding: 0 12px; text-decoration: none; color: var(--muted); }
.role-switch a.active { background: var(--surface-2); color: var(--ink); }
.policy-note { margin: 18px 0 0; padding: 14px; border: 1px dashed var(--line); color: var(--muted); outline: none; }
.policy-note:focus { border-color: var(--focus); color: var(--ink); }
.receipt-hero { display: flex; gap: 28px; align-items: center; margin-bottom: 18px; }
.receipt-hero.danger { border-color: var(--danger); }
.receipt-hero.success { border-color: var(--success); }
.chain-panel { padding: 24px; border: 1px solid var(--line); background: oklch(0.1 0.018 250); min-width: 0; overflow: hidden; }
.chain-panel p { overflow-wrap: anywhere; }
.tx-bind-form { display: grid; gap: 10px; margin-top: 14px; min-width: 0; }
.tx-bind-form input { width: 100%; min-width: 0; min-height: 44px; padding: 0 12px; border: 1px solid var(--line); background: oklch(0.08 0.01 250); color: var(--ink); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; overflow-wrap: anywhere; }
.architecture-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-top: 24px; }
.architecture-grid div { padding: 18px; border: 1px solid var(--line); background: oklch(0.1 0.018 250); }
.architecture-grid strong, .architecture-grid span { display: block; }
.architecture-grid span { color: var(--muted); margin-top: 8px; }
@keyframes stampIn {
  from { opacity: 0; transform: translateY(-12px) rotate(-14deg) scale(1.08); }
  to { opacity: 1; transform: translateY(0) rotate(-10deg) scale(1); }
}
@media (max-width: 980px) {
  .shell { padding: 16px; }
  .topbar { align-items: flex-start; }
  nav { justify-content: flex-end; }
  .layout-shell { display: block; }
  .side-rail { display: none; }
  .hero-grid, .hero-chapter, .workbench, .page-grid { grid-template-columns: 1fr; }
  .hero-chapter { padding: 42px 0 80px; }
  .hero-chapter::before { width: 100%; height: 300px; inset: auto 0 40px; }
  .proof-bento { grid-template-columns: 1fr; padding-bottom: 70px; }
  .bento-card, .bento-wide, .bento-tall, .bento-small { grid-column: auto; min-height: 180px; }
  .final-cta { display: grid; padding-top: 60px; }
  .wide { grid-column: auto; }
  h1 { font-size: 3rem; max-width: 12ch; }
  .hero-chapter h1 { max-width: 100%; }
  .hero-card { min-height: auto; }
}
@media (max-width: 560px) {
  .topbar { display: grid; }
  .wallet-dock { justify-content: start; }
  .topbar-tools { justify-content: start; }
  nav a { min-height: 48px; padding: 8px 10px; font-size: 0.9rem; }
  h1 { font-size: 2.35rem; }
  .hero-chapter h1 { font-size: 3rem; }
  .chain-mini-grid { grid-template-columns: 1fr; }
  .wallet-workbench { display: grid; }
  .wallet-actions { justify-content: stretch; }
  .wallet-actions .rr-btn { width: 100%; }
  .panel, .hero-card { padding: 18px; }
  .button-row, .hero-actions { display: grid; }
  .rr-btn { width: 100%; }
  .section-head.inline { display: grid; }
  .receipt-hero { display: grid; }
  .policy-table th { width: 120px; }
  .policy-table th, .policy-table td { padding: 12px 8px; }
  .stamp-big { width: 170px; height: 82px; font-size: 3.2rem; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 1ms !important; transition-duration: 1ms !important; scroll-behavior: auto !important; }
}`;
}

function clientScript(): string {
  return `
(() => {
  const TEST_WALLET = "0x000000000000000000000000000000000000BEEF";
  const ARBITRUM_SEPOLIA = {
    chainId: "0x66eee",
    chainName: "Arbitrum Sepolia",
    rpcUrls: ["https://sepolia-rollup.arbitrum.io/rpc"],
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    blockExplorerUrls: ["https://sepolia.arbiscan.io"]
  };
  const state = {
    shock: "MARKET_HALT",
    walletAddress: localStorage.getItem("rr_wallet_address") || "",
    walletMode: localStorage.getItem("rr_wallet_mode") || "guest"
  };
  const shell = document.querySelector(".shell");
  const palette = document.querySelector("[data-command-palette]");
  const paletteInput = palette ? palette.querySelector("input[type='search']") : null;
  const commandToggle = document.querySelector("[data-command-toggle]");
  function setPalette(open) {
    if (!palette) return;
    palette.hidden = !open;
    if (open && paletteInput && "focus" in paletteInput) paletteInput.focus();
  }
  if (commandToggle) commandToggle.addEventListener("click", () => setPalette(palette ? palette.hidden : true));
  const walletStatusEls = Array.from(document.querySelectorAll("[data-wallet-status]"));
  const walletAddressEls = Array.from(document.querySelectorAll("[data-wallet-address]"));
  function compactAddress(address) {
    return address && address.startsWith("0x") ? address.slice(0, 6) + "..." + address.slice(-4) : address;
  }
  function setWallet(mode, address) {
    state.walletMode = mode;
    state.walletAddress = address || "";
    localStorage.setItem("rr_wallet_mode", mode);
    if (address) localStorage.setItem("rr_wallet_address", address);
    else localStorage.removeItem("rr_wallet_address");
    const statusText = mode === "browser" ? "Browser wallet connected" : mode === "test" ? "Test wallet active" : "Guest proof mode";
    const addressText = address ? compactAddress(address) : "Connect wallet or choose test wallet";
    walletStatusEls.forEach((el) => { el.textContent = statusText; });
    walletAddressEls.forEach((el) => { el.textContent = addressText; });
    if (shell) shell.setAttribute("data-wallet-mode", mode);
  }
  window.addEventListener("rr:rainbowkit-account", (event) => {
    const detail = event && event.detail ? event.detail : {};
    if (detail.connected && detail.address) {
      setWallet("browser", detail.address);
      return;
    }
    if (state.walletMode === "browser" && !window.ethereum) setWallet("guest", "");
  });
  async function ensureArbitrumSepolia(provider) {
    try {
      await provider.request({ method: "wallet_switchEthereumChain", params: [{ chainId: ARBITRUM_SEPOLIA.chainId }] });
    } catch (error) {
      if (error && typeof error === "object" && error.code === 4902) {
        await provider.request({ method: "wallet_addEthereumChain", params: [ARBITRUM_SEPOLIA] });
      }
    }
  }
  async function connectWallet() {
    const provider = window.ethereum;
    if (!provider || typeof provider.request !== "function") {
      if (typeof window.__RR_OPEN_WALLET__ === "function") {
        window.__RR_OPEN_WALLET__();
        const runStatus = document.querySelector("#run-status");
        if (runStatus) runStatus.textContent = "Choose a wallet in RainbowKit, or use the test wallet to keep the judge path moving.";
        return;
      }
      setWallet("guest", "");
      const runStatus = document.querySelector("#run-status");
      if (runStatus) runStatus.textContent = "No browser wallet detected. Use the test wallet to run the full judge path without private keys.";
      return;
    }
    const accounts = await provider.request({ method: "eth_requestAccounts" });
    await ensureArbitrumSepolia(provider);
    setWallet("browser", accounts && accounts[0] ? accounts[0] : "");
  }
  function useTestWallet() {
    setWallet("test", TEST_WALLET);
  }
  document.querySelectorAll("[data-wallet-connect]").forEach((button) => {
    button.addEventListener("click", () => connectWallet().catch((error) => {
      setWallet("guest", "");
      const message = error instanceof Error ? error.message : "Wallet connection failed.";
      const runStatus = document.querySelector("#run-status");
      if (runStatus) runStatus.textContent = message;
    }));
  });
  document.querySelectorAll("[data-test-wallet]").forEach((button) => button.addEventListener("click", useTestWallet));
  setWallet(state.walletMode, state.walletAddress);
  if (window.ethereum && typeof window.ethereum.on === "function") {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts && accounts[0]) setWallet("browser", accounts[0]);
      else setWallet("guest", "");
    });
  }
  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      setPalette(palette ? palette.hidden : true);
    }
    if (event.key === "Escape") setPalette(false);
  });
  const savedDensity = localStorage.getItem("rr_density") || "comfortable";
  document.documentElement.dataset.density = savedDensity;
  document.querySelectorAll("[data-density-button]").forEach((button) => {
    const density = button.getAttribute("data-density-button");
    button.classList.toggle("active", density === savedDensity);
    button.addEventListener("click", () => {
      document.documentElement.dataset.density = density || "comfortable";
      localStorage.setItem("rr_density", density || "comfortable");
      document.querySelectorAll("[data-density-button]").forEach((item) => item.classList.toggle("active", item === button));
    });
  });
  document.querySelectorAll("[data-mode-button]").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.getAttribute("data-mode-button") || "test-mode";
      if (shell) shell.setAttribute("data-mode", mode);
      document.querySelectorAll("[data-mode-button]").forEach((item) => item.classList.toggle("active", item === button));
    });
  });
  const note = document.querySelector("[data-inline-edit='policy-note']");
  if (note) {
    const savedNote = localStorage.getItem("rr_policy_note");
    if (savedNote) note.textContent = savedNote;
    note.addEventListener("blur", () => localStorage.setItem("rr_policy_note", note.textContent || ""));
  }
  const shockButtons = Array.from(document.querySelectorAll("[data-shock]"));
  const status = document.querySelector("#run-status");
  const receiptListEl = document.querySelector("#receipt-list");
  const stampTarget = document.querySelector("#stamp-target");
  const calldataLabel = document.querySelector("#calldata-label");
  function setStatus(message) { if (status) status.textContent = message; }
  function setShock(shock) {
    state.shock = shock;
    shockButtons.forEach((button) => {
      const selected = button.getAttribute("data-shock") === shock;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-checked", String(selected));
    });
    if (calldataLabel) calldataLabel.textContent = "sell_principal(tokenized_etf, shock=" + shock + ")";
  }
  shockButtons.forEach((button) => button.addEventListener("click", () => setShock(button.getAttribute("data-shock"))));
  function escapeText(value) {
    return String(value).replace(/[&<>"']/g, (char) => {
      if (char === "&") return "&amp;";
      if (char === "<") return "&lt;";
      if (char === ">") return "&gt;";
      if (char === '"') return "&quot;";
      if (char === "'") return "&#39;";
      return char;
    });
  }
  function shortHash(hash) { return hash ? hash.slice(0, 10) + "..." + hash.slice(-8) : ""; }
  function renderReceipt(receipt) {
    const tone = receipt.status === "refused" ? "danger" : "success";
    const label = receipt.status === "refused" ? "NO" : "OK";
    return '<article class="receipt-card ' + tone + '">' +
      '<div class="receipt-top"><span class="stamp-mini">' + label + '</span><div><strong>' + escapeText(receipt.reasonCode) + '</strong><span>' + escapeText(receipt.shock) + '</span></div></div>' +
      '<dl class="receipt-facts"><div><dt>proof</dt><dd>' + escapeText(shortHash(receipt.proofHash)) + '</dd></div><div><dt>policy</dt><dd>' + escapeText(shortHash(receipt.policyHash)) + '</dd></div></dl>' +
      '<a class="text-link" data-testid="open-latest-receipt" href="/app/receipts/' + encodeURIComponent(receipt.id) + '">Open receipt</a>' +
      '</article>';
  }
  async function run(path, body) {
    setStatus("Writing receipt to the RefusalLedger...");
    const response = await fetch(path, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Request failed");
    }
    return response.json();
  }
  const refusalButton = document.querySelector("[data-testid='run-refusal']");
  if (refusalButton) refusalButton.addEventListener("click", async () => {
    try {
      if (stampTarget) stampTarget.innerHTML = '<div class="stamp-big" aria-label="Refused">NO</div>';
      const result = await run("/api/runs/refuse", { shock: state.shock, roleId: "holder", walletAddress: state.walletAddress || "guest-wallet" });
      if (receiptListEl) receiptListEl.insertAdjacentHTML("afterbegin", renderReceipt(result.receipt));
      setStatus("Refused. Receipt " + result.receipt.id + " saved for " + compactAddress(result.receipt.walletAddress) + " with proof " + shortHash(result.receipt.proofHash) + ".");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Refusal run failed.");
    }
  });
  const safeButton = document.querySelector("[data-testid='run-safe']");
  if (safeButton) safeButton.addEventListener("click", async () => {
    try {
      if (stampTarget) stampTarget.innerHTML = '<div class="stamp-big" style="color: var(--success); border-color: var(--success); transform:none" aria-label="Allowed">OK</div>';
      const result = await run("/api/runs/safe", { roleId: "holder", walletAddress: state.walletAddress || "guest-wallet" });
      if (receiptListEl) receiptListEl.insertAdjacentHTML("afterbegin", renderReceipt(result.receipt));
      setStatus("Allowed. Safe sweep receipt " + result.receipt.id + " saved for " + compactAddress(result.receipt.walletAddress) + ".");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Safe sweep failed.");
    }
  });
  const prepareButton = document.querySelector("[data-testid='prepare-chain-action']");
  if (prepareButton) prepareButton.addEventListener("click", async () => {
    const output = document.querySelector("#chain-action-output");
    const bindStatus = document.querySelector("#chain-bind-status");
    const receiptId = prepareButton.getAttribute("data-receipt-id");
    try {
      const response = await fetch("/api/receipts/" + encodeURIComponent(receiptId || "") + "/chain-action");
      const data = await response.json();
      if (!response.ok) {
        if (output) output.textContent = JSON.stringify(data, null, 2);
        return;
      }
      const payload = JSON.stringify(data.action, null, 2);
      if (output) output.textContent = payload;
      if (bindStatus) bindStatus.textContent = "Transaction payload prepared.";
      if (navigator.clipboard && data.action) {
        navigator.clipboard.writeText(payload)
          .then(() => { if (bindStatus) bindStatus.textContent = "Transaction payload prepared and copied."; })
          .catch(() => { if (bindStatus) bindStatus.textContent = "Transaction payload prepared. Copy from the panel if clipboard access is blocked."; });
      }
    } catch (error) {
      if (output) output.textContent = error instanceof Error ? error.message : "Could not prepare chain action.";
    }
  });
  const sendWalletButton = document.querySelector("[data-testid='send-chain-wallet']");
  if (sendWalletButton) sendWalletButton.addEventListener("click", async () => {
    const output = document.querySelector("#chain-action-output");
    const bindStatus = document.querySelector("#chain-bind-status");
    const receiptId = sendWalletButton.getAttribute("data-receipt-id");
    try {
      const response = await fetch("/api/receipts/" + encodeURIComponent(receiptId || "") + "/chain-action");
      const data = await response.json();
      if (!response.ok || !data.action) throw new Error(data.error || "Could not prepare wallet transaction.");
      let txHash = "";
      let rainbowKitError = null;
      if (typeof window.__RR_SEND_WALLET_TX__ === "function") {
        try {
          txHash = await window.__RR_SEND_WALLET_TX__(data.action);
        } catch (error) {
          rainbowKitError = error;
        }
      }
      if (!txHash) {
        const provider = window.ethereum;
        if (!provider || typeof provider.request !== "function") {
          throw rainbowKitError instanceof Error
            ? rainbowKitError
            : new Error("Connect a browser wallet before sending the chain transaction. Test wallet mode prepares proof but cannot sign.");
        }
        const accounts = await provider.request({ method: "eth_requestAccounts" });
        await ensureArbitrumSepolia(provider);
        if (accounts && accounts[0]) setWallet("browser", accounts[0]);
        txHash = await provider.request({
          method: "eth_sendTransaction",
          params: [{
            from: accounts && accounts[0] ? accounts[0] : undefined,
            to: data.action.to,
            data: data.action.data,
            value: data.action.value,
            chainId: data.action.chainId
          }]
        });
      }
      if (output) output.textContent = JSON.stringify({ sent: true, txHash, action: data.action }, null, 2);
      if (bindStatus) bindStatus.textContent = "Wallet submitted tx " + txHash + ". Binding proof...";
      const bindResponse = await fetch("/api/receipts/" + encodeURIComponent(receiptId || "") + "/chain", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chainTxHash: txHash })
      });
      const bindData = await bindResponse.json();
      if (!bindResponse.ok) throw new Error(bindData.error || "Transaction sent, but binding failed.");
      if (bindStatus) bindStatus.textContent = "Bound wallet tx " + bindData.receipt.chainTxHash + ". Refreshing...";
      window.location.reload();
    } catch (error) {
      if (bindStatus) bindStatus.textContent = error instanceof Error ? error.message : "Wallet transaction failed.";
      if (output && error instanceof Error) output.textContent = error.message;
    }
  });
  const bindForm = document.querySelector("[data-testid='bind-chain-form']");
  if (bindForm) bindForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = document.querySelector("#chain-bind-status");
    const receiptId = bindForm.getAttribute("data-receipt-id");
    const input = bindForm.querySelector("input[name='chainTxHash']");
    const chainTxHash = input && "value" in input ? input.value : "";
    try {
      const response = await fetch("/api/receipts/" + encodeURIComponent(receiptId || "") + "/chain", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chainTxHash })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not bind tx hash.");
      if (status) status.textContent = "Bound chain tx " + data.receipt.chainTxHash + ". Refreshing...";
      window.location.reload();
    } catch (error) {
      if (status) status.textContent = error instanceof Error ? error.message : "Could not bind tx hash.";
    }
  });
  if (window.gsap && window.ScrollTrigger && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    window.gsap.utils.toArray("[data-gsap='image-scale-fade']").forEach((el) => {
      window.gsap.fromTo(el, { opacity: 0.86, scale: 0.985 }, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 20%", scrub: true }
      });
    });
    window.gsap.utils.toArray(".bento-card").forEach((el) => {
      window.gsap.fromTo(el, { opacity: 0.72, y: 28 }, {
        opacity: 1,
        y: 0,
        scrollTrigger: { trigger: el, start: "top 88%", end: "top 58%", scrub: true }
      });
    });
  }
})();`;
}
