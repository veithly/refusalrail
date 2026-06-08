import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import solc from "solc";

const root = new URL("..", import.meta.url).pathname;
const contractDir = join(root, "contracts");
const outDir = join(root, "artifacts", "contracts");
const files = ["PolicyRegistry.sol", "RefusalReceipt.sol", "RefusalHub.sol", "DemoRWAAsset.sol"];

const sources = {};
for (const file of files) {
  sources[file] = { content: await readFile(join(contractDir, file), "utf8") };
}

const input = {
  language: "Solidity",
  sources,
  settings: {
    optimizer: { enabled: true, runs: 200 },
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode.object", "evm.deployedBytecode.object"]
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const failures = (output.errors || []).filter((item) => item.severity === "error");
if (failures.length) {
  for (const failure of failures) console.error(failure.formattedMessage);
  process.exit(1);
}

await mkdir(outDir, { recursive: true });
for (const [file, contracts] of Object.entries(output.contracts || {})) {
  for (const [name, artifact] of Object.entries(contracts)) {
    const bytecode = artifact.evm?.bytecode?.object || "";
    await writeFile(
      join(outDir, `${name}.json`),
      JSON.stringify(
        {
          contractName: name,
          sourceName: basename(file),
          abi: artifact.abi,
          bytecode,
          deployedBytecode: artifact.evm?.deployedBytecode?.object || ""
        },
        null,
        2
      )
    );
    console.log(`${name}: ${bytecode.length / 2} bytes`);
  }
}
