import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { relativize } from "../scripts/shadcn_relativize.mjs";

import {
  ADAPTER_REMOVED_LINES,
  additiveOnly,
  checkAdapter,
  withoutLines,
} from "./index.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PRIMITIVES = path.join(REPO, "src/primitives");
const SNAPSHOTS = path.join(REPO, "shadcn");

test("additiveOnly accepts an added line and refuses a changed one", () => {
  assert.equal(additiveOnly("a\nb\n", "a\nx\nb\n").ok, true);
  assert.equal(additiveOnly("a\nb\n", "a\nB\n").ok, false);
  assert.equal(additiveOnly("a\nb\n", "b\na\n").ok, false);
  assert.equal(additiveOnly("a\n\nb\n", "a\nb\n").ok, false);
  assert.equal(additiveOnly("a\r\nb  \r\n", "a\nb\n").ok, true);
});

test("checkAdapter refuses an unlisted file carrying the marker", () => {
  const result = checkAdapter("unlisted.tsx", "// SHADCN FRAMEWORK ADAPTER\nconst x = 1\n");
  assert.equal(result.ok, false);
});

test("checkAdapter accepts a listed file carrying the marker", () => {
  const result = checkAdapter("sonner.tsx", "// SHADCN FRAMEWORK ADAPTER\nconst x = 1\n");
  assert.deepEqual(result, { ok: true, isAdapter: true });
});

test("checkAdapter ignores a file with no marker even if unlisted", () => {
  const result = checkAdapter("unlisted.tsx", "const x = 1\n");
  assert.deepEqual(result, { ok: true, isAdapter: false });
});

test("a listed adapter passes when only the two next-themes lines are removed", () => {
  const snapshot = 'import { useTheme } from "next-themes"\nconst x = 1\n  const { theme = "system" } = useTheme()\nconst y = 2\n';
  const actual = "// SHADCN FRAMEWORK ADAPTER\nconst x = 1\nconst y = 2\n";
  const result = additiveOnly(withoutLines(relativize(snapshot), ADAPTER_REMOVED_LINES), actual);
  assert.equal(result.ok, true);
});

test("a listed adapter that also drops a different snapshot line still fails", () => {
  const snapshot = 'import { useTheme } from "next-themes"\nconst x = 1\n  const { theme = "system" } = useTheme()\nconst y = 2\n';
  const actual = "// SHADCN FRAMEWORK ADAPTER\nconst y = 2\n"; // "const x = 1" went missing too
  const result = additiveOnly(withoutLines(relativize(snapshot), ADAPTER_REMOVED_LINES), actual);
  assert.equal(result.ok, false);
});

const primitives = readdirSync(PRIMITIVES).filter((f) => f.endsWith(".tsx") && !f.endsWith(".test.tsx"));

for (const file of primitives) {
  test(`${file} is shadcn's canonical file plus added lines only`, () => {
    const snapshot = path.join(SNAPSHOTS, file);
    assert.ok(existsSync(snapshot), `${file} has no snapshot in shadcn/ — install it with pnpm shadcn:add`);
    const snapshotText = relativize(readFileSync(snapshot, "utf8"));
    const actualText = readFileSync(path.join(PRIMITIVES, file), "utf8");
    const adapter = checkAdapter(file, actualText);
    assert.ok(adapter.ok, adapter.reason);
    const result = adapter.isAdapter
      ? additiveOnly(withoutLines(snapshotText, ADAPTER_REMOVED_LINES), actualText)
      : additiveOnly(snapshotText, actualText);
    assert.ok(result.ok, `${file} diverges from its snapshot at: ${result.missing}`);
  });
}
