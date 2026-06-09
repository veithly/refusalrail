import { build } from "esbuild";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, "dist-wallet");
const generatedDir = join(root, "src", "generated");
const jsOut = join(outDir, "wallet-island.js");
const cssOut = join(outDir, "wallet-island.css");
const generatedOut = join(generatedDir, "wallet-island.ts");

await mkdir(outDir, { recursive: true });
await mkdir(generatedDir, { recursive: true });

await build({
  entryPoints: [join(root, "src", "wallet-island.tsx")],
  outfile: jsOut,
  bundle: true,
  minify: process.env.WALLET_ISLAND_DEBUG !== "1",
  sourcemap: false,
  platform: "browser",
  format: "iife",
  globalName: "RefusalRailWalletIsland",
  target: ["es2022"],
  jsx: "automatic",
  define: {
    "process.env.NODE_ENV": "\"production\"",
    global: "globalThis"
  },
  legalComments: "none"
});

const js = await readFile(jsOut, "utf8");
const css = await readFile(cssOut, "utf8").catch(() => "");
const jsBase64 = Buffer.from(js, "utf8").toString("base64");
const cssBase64 = Buffer.from(css, "utf8").toString("base64");

await writeFile(
  generatedOut,
  [
    "export const walletIslandJsBase64 = ",
    JSON.stringify(jsBase64),
    ";\nexport const walletIslandCssBase64 = ",
    JSON.stringify(cssBase64),
    ";\n"
  ].join("")
);

console.log(`built wallet island: ${js.length} js bytes, ${css.length} css bytes`);
