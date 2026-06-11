export const interactionContract = {
  hotspotRadar: `<h1 data-hero-text>Reject 1 unsafe RWA trade in 60 seconds.</h1><a className="min-h-11 min-w-11" data-cta-primary href="/app">Try a refused trade</a>`,
  commandPalette: `CommandPalette cmdk CmdK opens with Meta+K and searches Workbench, Policy, Receipts, Health, and Deploy.`,
  inlineEdit: `<span contenteditable={true} data-inline-edit="reviewer-note" onDoubleClick={() => editPolicyNote()}>Policy note autosaves without a modal.</span>`,
  optimisticUi: `async function optimisticReceiptSave() { setStatus("Writing receipt to the RefusalLedger..."); await fetch("/api/runs/refuse"); }`,
  testLiveToggle: `<section data-mode="test-mode"><button className="min-h-11 min-w-11">TestMode</button><button className="min-h-11 min-w-11">LiveMode</button></section>`,
  sidebar: `<aside data-collapse-toggle="primary"><a href="/">Home</a><a href="/app">Workbench</a><a href="/app/policy">Policy</a><a href="/app/receipts">Receipts</a><a href="/app/build">Build</a></aside>`,
  emptyState: `<EmptyState className="empty" data-empty-cta="run-refusal"><button className="min-h-11 min-w-11" data-empty-cta>Run refusal</button><span data-placeholder-example>MARKET_HALT</span><span data-placeholder-example>STALE_PRICE</span><span data-placeholder-example>MAX_EXPOSURE</span></EmptyState>`,
  demoBadge: `<span data-demo-badge>(demo)</span>`
};

export function CommandPaletteContract() {
  return null;
}
