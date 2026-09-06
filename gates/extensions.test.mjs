import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

import { competingStatusPaletteIn, statusPaletteIn } from "./index.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(path.join(REPO, rel), "utf8");

const SOURCE = /\.(?:ts|tsx|css)$/;

/** Every tracked package file matching `SOURCE`. */
function packageSources() {
  const listed = spawnSync("git", ["ls-files", "-z", "src"], { cwd: REPO, encoding: "utf8" });
  assert.equal(listed.status, 0, `git ls-files failed: ${listed.stderr}`);
  return listed.stdout.split("\0").filter((name) => SOURCE.test(name));
}

const FOUNDATION_BADGE = ["success", "warning", "info", "quiet"];

/** The class string of one variant line in a cva source. */
function variantClasses(source, key) {
  const m = source.match(new RegExp(String.raw`^\s*"?${key}"?:\s*\n?\s*"([^"]*)"`, "m"));
  assert.ok(m, `no variant ${key}`);
  return m[1];
}

const BADGE = "src/components/badge.tsx";

test("Badge's status vocabulary is exactly the four owned names", () => {
  const source = read("src/components/badge.tsx");
  for (const name of FOUNDATION_BADGE) {
    assert.ok(source.includes(`${name}:`), `badge.tsx is missing the ${name} variant`);
  }
});

test("a status Badge paints a soft surface and readable ink, never a coloured stroke", () => {
  const src = read(BADGE);
  const stroke = /\bborder-(?:emerald|amber|sky|success|warning|destructive|primary)\b/;
  for (const k of [...FOUNDATION_BADGE, "destructive"]) {
    assert.doesNotMatch(variantClasses(src, k), stroke, `${k} adds a coloured border`);
  }
  assert.match(variantClasses(src, "success"), /\bbg-emerald-500\/10\b/);
  assert.match(variantClasses(src, "success"), /\btext-emerald-700\b/);
  assert.match(variantClasses(src, "warning"), /\bbg-amber-500\/10\b/);
  assert.match(variantClasses(src, "warning"), /\btext-amber-700\b/);
  assert.match(variantClasses(src, "info"), /\bbg-sky-500\/10\b/);
  assert.match(variantClasses(src, "info"), /\btext-sky-700\b/);
  assert.match(variantClasses(src, "quiet"), /\bbg-muted\b/);
  assert.match(variantClasses(src, "quiet"), /\btext-muted-foreground\b/);
  // Official destructive stays on the semantic token, never red-*.
  assert.match(variantClasses(src, "destructive"), /\bbg-destructive\/10\b/);
  assert.doesNotMatch(src, /\b(?:bg|text)-red-\d/);
});

test("statusPaletteIn finds the emerald/amber/sky family, and not a token or a comment", () => {
  assert.deepEqual(statusPaletteIn("a.tsx", `  className="bg-emerald-500/10"`), [
    `a.tsx:1: className="bg-emerald-500/10"`,
  ]);
  assert.deepEqual(statusPaletteIn("b.tsx", `  className="border-amber-400 dark:border-amber-300"`), [
    `b.tsx:1: className="border-amber-400 dark:border-amber-300"`,
  ]);
  assert.deepEqual(statusPaletteIn("c.tsx", `  className="ring-sky-500"`), [`c.tsx:1: className="ring-sky-500"`]);
  assert.deepEqual(statusPaletteIn("d.tsx", `  className="shadow-emerald-500/20"`), [
    `d.tsx:1: className="shadow-emerald-500/20"`,
  ]);
  // A token, not the palette.
  assert.deepEqual(statusPaletteIn("e.tsx", `  className="bg-primary text-primary-foreground"`), []);
  // The family name without a shade is not yet a colour.
  assert.deepEqual(statusPaletteIn("f.tsx", `  className="bg-emerald"`), []);
  // A comment recalling the palette states history, not a usage.
  assert.deepEqual(statusPaletteIn("g.tsx", `  // never bg-emerald-500 outside statusTone`), []);
});

test("competingStatusPaletteIn finds a rival colour family, and not the status palette itself", () => {
  assert.deepEqual(competingStatusPaletteIn("a.tsx", `  className="bg-green-500"`), [
    `a.tsx:1: className="bg-green-500"`,
  ]);
  assert.deepEqual(competingStatusPaletteIn("b.tsx", `  className="text-yellow-700"`), [
    `b.tsx:1: className="text-yellow-700"`,
  ]);
  assert.deepEqual(competingStatusPaletteIn("c.tsx", `  className="border-blue-400"`), [
    `c.tsx:1: className="border-blue-400"`,
  ]);
  assert.deepEqual(competingStatusPaletteIn("d.tsx", `  className="bg-emerald-500"`), []);
  assert.deepEqual(competingStatusPaletteIn("e.tsx", `  // never bg-red-500 for a destructive state`), []);
});

test("the status palette lives in exactly Badge and statusTone, nowhere else", () => {
  const ALLOWED_PALETTE_FILES = [
    "src/components/badge.tsx",
    "src/theme/statusTone.ts",
    "src/theme/statusTone.test.ts",
  ];
  const tracked = packageSources();
  assert.ok(tracked.length > 0, "the scan found no package sources, so it proves nothing");

  const offenders = tracked
    .filter((file) => !ALLOWED_PALETTE_FILES.includes(file))
    .flatMap((file) => statusPaletteIn(file, readFileSync(path.join(REPO, file), "utf8")));
  assert.deepEqual(
    offenders,
    [],
    "the status palette has exactly one home outside Badge and statusTone — read the tone from " +
      `src/theme/statusTone.ts instead:\n${offenders.join("\n")}`,
  );
});

test("no competing colour family stands in for the status palette anywhere in the package", () => {
  const tracked = packageSources();
  assert.ok(tracked.length > 0, "the scan found no package sources, so it proves nothing");

  const offenders = tracked.flatMap((file) =>
    competingStatusPaletteIn(file, readFileSync(path.join(REPO, file), "utf8")),
  );
  assert.deepEqual(
    offenders,
    [],
    `a competing colour family stands in for the status palette:\n${offenders.join("\n")}`,
  );
});

