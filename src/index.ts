import {
  renderAbout,
  renderApp,
  renderAsset,
  renderHome,
  renderPolicy,
  renderReceiptDetail,
  renderReceipts
} from "./html";
import { getDeploymentInfo, prepareChainAction } from "./onchain";
import { currentPolicy, evaluateAction } from "./policy";
import type { Env, ReceiptRecord, ShockCode } from "./types";

type LedgerStorage = DurableObjectStorage & {
  sql?: {
    exec(query: string, ...bindings: unknown[]): unknown;
  };
};

interface SessionInfo {
  sessionId: string;
  userId: string;
  ownerId: string;
  roleId: string;
  cookie: string | null;
}

const SESSION_COOKIE = "rr_session";

function textResponse(body: string, init: ResponseInit = {}): Response {
  return new Response(body, {
    ...init,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      ...init.headers
    }
  });
}

function htmlResponse(body: string, session: SessionInfo): Response {
  const headers = new Headers({
    "content-type": "text/html; charset=utf-8",
    "cache-control": "no-store"
  });
  if (session.cookie) headers.append("set-cookie", session.cookie);
  return new Response(body, { headers });
}

function jsonResponse(data: unknown, session?: SessionInfo, init: ResponseInit = {}): Response {
  const headers = new Headers({
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  if (session?.cookie) headers.append("set-cookie", session.cookie);
  return new Response(JSON.stringify(data), { ...init, headers });
}

function parseCookies(request: Request): Map<string, string> {
  const raw = request.headers.get("cookie") || "";
  const pairs = raw
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const index = part.indexOf("=");
      return index === -1 ? [part, ""] : [part.slice(0, index), part.slice(index + 1)];
    });
  return new Map(pairs.map(([key, value]) => [key, decodeURIComponent(value)]));
}

function ensureSession(request: Request, url: URL): SessionInfo {
  const cookies = parseCookies(request);
  let sessionId = cookies.get(SESSION_COOKIE) || "";
  let cookie: string | null = null;
  if (!/^[a-z0-9-]{16,80}$/i.test(sessionId)) {
    sessionId = crypto.randomUUID();
    cookie = `${SESSION_COOKIE}=${encodeURIComponent(sessionId)}; Path=/; Max-Age=604800; HttpOnly; SameSite=Lax`;
  }
  const roleParam = url.searchParams.get("role");
  const roleId = roleParam === "auditor" ? "auditor" : "holder";
  const short = sessionId.replace(/-/g, "").slice(0, 12);
  return {
    sessionId,
    userId: `user-${short}`,
    ownerId: `owner-${short}`,
    roleId,
    cookie
  };
}

async function ledgerFetch(env: Env, path: string, init: RequestInit = {}): Promise<Response> {
  const id = env.LEDGER.idFromName("global-refusal-ledger");
  const stub = env.LEDGER.get(id);
  return stub.fetch(new Request(`https://ledger.internal${path}`, init));
}

async function readJson<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    return {} as T;
  }
}

async function getReceipts(env: Env, session: SessionInfo, scope = "mine"): Promise<ReceiptRecord[]> {
  const response = await ledgerFetch(
    env,
    `/receipts?ownerId=${encodeURIComponent(session.ownerId)}&scope=${encodeURIComponent(scope)}`
  );
  if (!response.ok) return [];
  const data = (await response.json()) as { receipts: ReceiptRecord[] };
  return data.receipts.filter((receipt) => !isPlaceholderReceipt(receipt));
}

function isPlaceholderReceipt(receipt: ReceiptRecord): boolean {
  const walletAddress = receipt.walletAddress.toLowerCase();
  const chainTxHash = (receipt.chainTxHash || "").toLowerCase();
  return (
    /^0x1{40}$/.test(walletAddress) ||
    /^0x0{36}beef$/.test(walletAddress) ||
    /^0x([1-4])\1{63}$/.test(chainTxHash)
  );
}

async function handleApi(request: Request, env: Env, session: SessionInfo, url: URL): Promise<Response> {
  if (request.method === "GET" && url.pathname === "/api/health") {
    const deployment = getDeploymentInfo(env);
    return jsonResponse(
      {
        ok: true,
        service: "refusalrail",
        buildId: env.BUILD_ID || "local-dev",
        storage: "Durable Object SQLite-backed ledger",
        visualLane: "operational-dashboard",
        chainStatus: deployment.status,
        refusalHub: deployment.refusalHub || null,
        time: new Date().toISOString()
      },
      session
    );
  }

  if (request.method === "GET" && url.pathname === "/api/deployment") {
    return jsonResponse({ deployment: getDeploymentInfo(env) }, session);
  }

  if (request.method === "GET" && url.pathname === "/api/policy") {
    return jsonResponse({ policy: await currentPolicy() }, session);
  }

  if (request.method === "GET" && url.pathname === "/api/receipts") {
    const scope = url.searchParams.get("scope") || (session.roleId === "auditor" ? "public" : "mine");
    const receipts = await getReceipts(env, session, scope);
    return jsonResponse({ receipts }, session);
  }

  const detailMatch = url.pathname.match(/^\/api\/receipts\/([^/]+)$/);
  if (request.method === "GET" && detailMatch) {
    const response = await ledgerFetch(env, `/receipts/${encodeURIComponent(detailMatch[1])}`);
    return new Response(response.body, {
      status: response.status,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store"
      }
    });
  }

  const chainActionMatch = url.pathname.match(/^\/api\/receipts\/([^/]+)\/chain-action$/);
  if (request.method === "GET" && chainActionMatch) {
    const response = await ledgerFetch(env, `/receipts/${encodeURIComponent(chainActionMatch[1])}`);
    if (!response.ok) return jsonResponse({ error: "Receipt not found" }, session, { status: 404 });
    const data = (await response.json()) as { receipt: ReceiptRecord | null };
    if (!data.receipt) return jsonResponse({ error: "Receipt not found" }, session, { status: 404 });
    const deployment = getDeploymentInfo(env);
    const action = prepareChainAction(data.receipt, deployment);
    return jsonResponse({ deployment, action }, session, { status: action ? 200 : 409 });
  }

  const chainBindMatch = url.pathname.match(/^\/api\/receipts\/([^/]+)\/chain$/);
  if (request.method === "POST" && chainBindMatch) {
    const body = await readJson<{ chainTxHash?: string }>(request);
    const deployment = getDeploymentInfo(env);
    const txHash = String(body.chainTxHash || "").trim();
    if (!/^0x[a-fA-F0-9]{64}$/.test(txHash)) {
      return jsonResponse({ error: "Expected a 32-byte EVM transaction hash." }, session, { status: 400 });
    }
    const explorerUrl = `${deployment.explorerBaseUrl.replace(/\/$/, "")}/tx/${txHash}`;
    const response = await ledgerFetch(env, `/receipts/${encodeURIComponent(chainBindMatch[1])}/chain`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chainTxHash: txHash, explorerUrl })
    });
    const data = await response.json();
    return jsonResponse(data, session, { status: response.status });
  }

  if (request.method === "POST" && url.pathname === "/api/runs/refuse") {
    const body = await readJson<{ shock?: ShockCode; walletAddress?: string; roleId?: string }>(request);
    const shock = body.shock && body.shock !== "NONE" ? body.shock : "MARKET_HALT";
    const evaluated = await evaluateAction({
      actionType: "SELL_PRINCIPAL",
      shock,
      ownerId: session.ownerId,
      userId: session.userId,
      sessionId: session.sessionId,
      roleId: body.roleId || session.roleId,
      walletAddress: body.walletAddress
    });
    const response = await ledgerFetch(env, "/receipts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(evaluated)
    });
    const data = await response.json();
    return jsonResponse(data, session, { status: response.status });
  }

  if (request.method === "POST" && url.pathname === "/api/runs/safe") {
    const body = await readJson<{ walletAddress?: string; roleId?: string }>(request);
    const evaluated = await evaluateAction({
      actionType: "CLAIM_DISTRIBUTION",
      shock: "NONE",
      ownerId: session.ownerId,
      userId: session.userId,
      sessionId: session.sessionId,
      roleId: body.roleId || session.roleId,
      walletAddress: body.walletAddress
    });
    const response = await ledgerFetch(env, "/receipts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(evaluated)
    });
    const data = await response.json();
    return jsonResponse(data, session, { status: response.status });
  }

  return jsonResponse({ error: "Unknown API route" }, session, { status: 404 });
}

async function handlePage(request: Request, env: Env, session: SessionInfo, url: URL): Promise<Response> {
  const asset = renderAsset(url.pathname);
  if (asset) return asset;
  const deployment = getDeploymentInfo(env);

  if (url.pathname === "/policy") {
    return Response.redirect(`${url.origin}/app/policy`, 301);
  }

  if (url.pathname === "/receipts") {
    return Response.redirect(`${url.origin}/app/receipts`, 301);
  }

  if (url.pathname === "/") {
    const receipts = await getReceipts(env, session);
    return htmlResponse(renderHome(receipts, deployment), session);
  }

  if (url.pathname === "/app") {
    const receipts = await getReceipts(env, session);
    return htmlResponse(renderApp(receipts, deployment), session);
  }

  if (url.pathname === "/app/policy") {
    return htmlResponse(renderPolicy(await currentPolicy(), deployment), session);
  }

  if (url.pathname === "/app/receipts") {
    const scope = session.roleId === "auditor" ? "public" : "mine";
    const receipts = await getReceipts(env, session, scope);
    return htmlResponse(renderReceipts(receipts, session.roleId, deployment), session);
  }

  const receiptMatch = url.pathname.match(/^\/app\/receipts\/([^/]+)$/);
  if (receiptMatch) {
    const response = await ledgerFetch(env, `/receipts/${encodeURIComponent(receiptMatch[1])}`);
    const data = response.ok ? ((await response.json()) as { receipt: ReceiptRecord | null }) : { receipt: null };
    return htmlResponse(renderReceiptDetail(data.receipt, deployment), session);
  }

  if (url.pathname === "/about") {
    return Response.redirect(`${url.origin}/app/build`, 301);
  }

  if (url.pathname === "/app/build") {
    return htmlResponse(renderAbout(deployment), session);
  }

  return textResponse("Not found", { status: 404 });
}

export class RefusalLedger {
  private initialized = false;

  constructor(private readonly state: DurableObjectState, private readonly env: Env) {}

  async fetch(request: Request): Promise<Response> {
    await this.initialize();
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/receipts") {
      const ownerId = url.searchParams.get("ownerId") || "";
      const scope = url.searchParams.get("scope") || "mine";
      const receipts = await this.listReceipts(ownerId, scope === "public");
      return jsonResponse({ receipts });
    }

    const detailMatch = url.pathname.match(/^\/receipts\/([^/]+)$/);
    if (request.method === "GET" && detailMatch) {
      const receipt = await this.getReceipt(detailMatch[1]);
      return jsonResponse({ receipt }, undefined, { status: receipt ? 200 : 404 });
    }

    if (request.method === "POST" && url.pathname === "/receipts") {
      const input = await readJson<Omit<ReceiptRecord, "id" | "createdAt">>(request);
      const receipt: ReceiptRecord = {
        ...input,
        id: `rr_${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}`,
        createdAt: new Date().toISOString()
      };
      await this.insertReceipt(receipt);
      return jsonResponse({ receipt }, undefined, { status: 201 });
    }

    const chainMatch = url.pathname.match(/^\/receipts\/([^/]+)\/chain$/);
    if (request.method === "POST" && chainMatch) {
      const body = await readJson<{ chainTxHash?: string; explorerUrl?: string }>(request);
      const receipt = await this.updateChainProof(chainMatch[1], String(body.chainTxHash || ""), String(body.explorerUrl || ""));
      return jsonResponse({ receipt }, undefined, { status: receipt ? 200 : 404 });
    }

    return jsonResponse({ error: "Unknown ledger route" }, undefined, { status: 404 });
  }

  private async initialize(): Promise<void> {
    if (this.initialized) return;
    const sqliteStorage = (this.state.storage as LedgerStorage).sql;
    if (sqliteStorage) {
      sqliteStorage.exec(
        `CREATE TABLE IF NOT EXISTS receipts (
          id TEXT PRIMARY KEY,
          ownerId TEXT NOT NULL,
          userId TEXT NOT NULL,
          sessionId TEXT NOT NULL,
          roleId TEXT NOT NULL,
          status TEXT NOT NULL,
          actionType TEXT NOT NULL,
          shock TEXT NOT NULL,
          reasonCode TEXT NOT NULL,
          policyHash TEXT NOT NULL,
          calldataHash TEXT NOT NULL,
          shockHash TEXT NOT NULL,
          proofHash TEXT NOT NULL,
          fallbackRoute TEXT NOT NULL,
          walletAddress TEXT NOT NULL,
          balanceBefore INTEGER NOT NULL,
          balanceAfter INTEGER NOT NULL,
          chainTxHash TEXT,
          explorerUrl TEXT,
          createdAt TEXT NOT NULL,
          payload TEXT NOT NULL
        )`
      );
    } else {
      const current = await this.state.storage.get<ReceiptRecord[]>("receipts");
      if (!current) await this.state.storage.put("receipts", []);
    }
    this.initialized = true;
  }

  private async insertReceipt(receipt: ReceiptRecord): Promise<void> {
    const sqliteStorage = (this.state.storage as LedgerStorage).sql;
    if (sqliteStorage) {
      sqliteStorage.exec(
        `INSERT INTO receipts (
          id, ownerId, userId, sessionId, roleId, status, actionType, shock, reasonCode,
          policyHash, calldataHash, shockHash, proofHash, fallbackRoute, walletAddress,
          balanceBefore, balanceAfter, chainTxHash, explorerUrl, createdAt, payload
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        receipt.id,
        receipt.ownerId,
        receipt.userId,
        receipt.sessionId,
        receipt.roleId,
        receipt.status,
        receipt.actionType,
        receipt.shock,
        receipt.reasonCode,
        receipt.policyHash,
        receipt.calldataHash,
        receipt.shockHash,
        receipt.proofHash,
        receipt.fallbackRoute,
        receipt.walletAddress,
        receipt.balanceBefore,
        receipt.balanceAfter,
        receipt.chainTxHash,
        receipt.explorerUrl,
        receipt.createdAt,
        JSON.stringify(receipt)
      );
      return;
    }
    const receipts = (await this.state.storage.get<ReceiptRecord[]>("receipts")) || [];
    receipts.unshift(receipt);
    await this.state.storage.put("receipts", receipts.slice(0, 100));
  }

  private async updateChainProof(id: string, chainTxHash: string, explorerUrl: string): Promise<ReceiptRecord | null> {
    const receipt = await this.getReceipt(id);
    if (!receipt) return null;
    const updated: ReceiptRecord = {
      ...receipt,
      chainTxHash,
      explorerUrl,
      chainProofStatus: "submitted"
    };
    const sqliteStorage = (this.state.storage as LedgerStorage).sql;
    if (sqliteStorage) {
      sqliteStorage.exec(
        "UPDATE receipts SET chainTxHash = ?, explorerUrl = ?, payload = ? WHERE id = ?",
        updated.chainTxHash,
        updated.explorerUrl,
        JSON.stringify(updated),
        updated.id
      );
      return updated;
    }
    const receipts = (await this.state.storage.get<ReceiptRecord[]>("receipts")) || [];
    const next = receipts.map((item) => (item.id === id ? updated : item));
    await this.state.storage.put("receipts", next);
    return updated;
  }

  private async listReceipts(ownerId: string, publicScope: boolean): Promise<ReceiptRecord[]> {
    const sqliteStorage = (this.state.storage as LedgerStorage).sql;
    if (sqliteStorage) {
      const cursor = publicScope
        ? sqliteStorage.exec("SELECT payload FROM receipts ORDER BY createdAt DESC LIMIT 50")
        : sqliteStorage.exec("SELECT payload FROM receipts WHERE ownerId = ? ORDER BY createdAt DESC LIMIT 50", ownerId);
      return cursorRows(cursor).map((row) => JSON.parse(String(row.payload)) as ReceiptRecord);
    }
    const receipts = (await this.state.storage.get<ReceiptRecord[]>("receipts")) || [];
    return receipts.filter((receipt) => publicScope || receipt.ownerId === ownerId).slice(0, 50);
  }

  private async getReceipt(id: string): Promise<ReceiptRecord | null> {
    const sqliteStorage = (this.state.storage as LedgerStorage).sql;
    if (sqliteStorage) {
      const cursor = sqliteStorage.exec("SELECT payload FROM receipts WHERE id = ? LIMIT 1", id);
      const first = cursorRows(cursor)[0];
      return first ? (JSON.parse(String(first.payload)) as ReceiptRecord) : null;
    }
    const receipts = (await this.state.storage.get<ReceiptRecord[]>("receipts")) || [];
    return receipts.find((receipt) => receipt.id === id) || null;
  }
}

function cursorRows(cursor: unknown): Array<Record<string, unknown>> {
  if (!cursor) return [];
  if (typeof (cursor as { toArray?: unknown }).toArray === "function") {
    return (cursor as { toArray(): Array<Record<string, unknown>> }).toArray();
  }
  if (typeof (cursor as { [Symbol.iterator]?: unknown })[Symbol.iterator] === "function") {
    return Array.from(cursor as Iterable<Record<string, unknown>>);
  }
  return [];
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const session = ensureSession(request, url);
    if (url.pathname.startsWith("/api/")) {
      return handleApi(request, env, session, url);
    }
    return handlePage(request, env, session, url);
  }
} satisfies ExportedHandler<Env>;
