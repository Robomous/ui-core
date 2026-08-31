import { readFileSync, writeFileSync } from "node:fs";

// The `.js` extensions are not optional: the package ships `dist/` as ESM,
// and Node's resolver — which consumers' test runners use for node_modules —
// requires explicit extensions on relative imports.
const RULES = [
  [/from "@\/lib\/cn"/g, 'from "../lib/cn.js"'],
  [/from "@\/primitives\/([a-z-]+)"/g, 'from "./$1.js"'],
];

export function relativize(source) {
  return RULES.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), source);
}

if (process.argv[1] === new URL(import.meta.url).pathname || process.argv[1].endsWith("shadcn_relativize.mjs")) {
  for (const file of process.argv.slice(2)) {
    writeFileSync(file, relativize(readFileSync(file, "utf8")));
  }
}
