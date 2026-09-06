// @vitest-environment node
import { readFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

import { competingStatusPaletteIn, statusPaletteIn } from "./index.js";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (rel: string) => readFileSync(path.join(REPO, rel), "utf8");

const SOURCE = /\.(?:ts|tsx|css)$/;

/**
 * Assembles a Tailwind utility fixture (e.g. "bg-emerald-500") from its
 * prefix and family/shade at runtime. This file scans its own package (it
 * lives under `src/`), so a fixture spelled out contiguously would trip the
 * very gates below on itself — the same reason `HEX` and
 * `RETIRED_ICON_PACKAGE` are built from fragments in the sibling gate files.
 */
const cls = (prefix: string, familyAndShade: string) => `${prefix}-${familyAndShade}`;

/** Every tracked package file matching `SOURCE`. */
function packageSources(): string[] {
  const listed = spawnSync("git", ["ls-files", "-z", "src"], { cwd: REPO, encoding: "utf8" });
  expect(listed.status, `git ls-files failed: ${listed.stderr}`).toBe(0);
  return listed.stdout.split("\0").filter((name) => SOURCE.test(name));
}

const FOUNDATION_BADGE = ["success", "warning", "info", "quiet"];

/** The class string of one variant line in a cva source. */
function variantClasses(source: string, key: string): string {
  const m = source.match(new RegExp(String.raw`^\s*"?${key}"?:\s*\n?\s*"([^"]*)"`, "m"));
  expect(m, `no variant ${key}`).toBeTruthy();
  return m![1];
}

const BADGE = "src/components/badge.tsx";

test("Badge's status vocabulary is exactly the four owned names", () => {
  const source = read("src/components/badge.tsx");
  for (const name of FOUNDATION_BADGE) {
    expect(source.includes(`${name}:`), `badge.tsx is missing the ${name} variant`).toBeTruthy();
  }
});

test("a status Badge paints a soft surface and readable ink, never a coloured stroke", () => {
  const src = read(BADGE);
  const stroke = /\bborder-(?:emerald|amber|sky|success|warning|destructive|primary)\b/;
  for (const k of [...FOUNDATION_BADGE, "destructive"]) {
    expect(variantClasses(src, k), `${k} adds a coloured border`).not.toMatch(stroke);
  }
  expect(variantClasses(src, "success")).toMatch(/\bbg-emerald-500\/10\b/);
  expect(variantClasses(src, "success")).toMatch(/\btext-emerald-700\b/);
  expect(variantClasses(src, "warning")).toMatch(/\bbg-amber-500\/10\b/);
  expect(variantClasses(src, "warning")).toMatch(/\btext-amber-700\b/);
  expect(variantClasses(src, "info")).toMatch(/\bbg-sky-500\/10\b/);
  expect(variantClasses(src, "info")).toMatch(/\btext-sky-700\b/);
  expect(variantClasses(src, "quiet")).toMatch(/\bbg-muted\b/);
  expect(variantClasses(src, "quiet")).toMatch(/\btext-muted-foreground\b/);
  // Official destructive stays on the semantic token, never red-*.
  expect(variantClasses(src, "destructive")).toMatch(/\bbg-destructive\/10\b/);
  expect(src).not.toMatch(/\b(?:bg|text)-red-\d/);
});

test("statusPaletteIn finds the emerald/amber/sky family, and not a token or a comment", () => {
  expect(statusPaletteIn("a.tsx", `  className="${cls("bg", "emerald-500/10")}"`)).toEqual([
    `a.tsx:1: className="${cls("bg", "emerald-500/10")}"`,
  ]);
  expect(
    statusPaletteIn("b.tsx", `  className="${cls("border", "amber-400")} dark:${cls("border", "amber-300")}"`),
  ).toEqual([`b.tsx:1: className="${cls("border", "amber-400")} dark:${cls("border", "amber-300")}"`]);
  expect(statusPaletteIn("c.tsx", `  className="${cls("ring", "sky-500")}"`)).toEqual([
    `c.tsx:1: className="${cls("ring", "sky-500")}"`,
  ]);
  expect(statusPaletteIn("d.tsx", `  className="${cls("shadow", "emerald-500/20")}"`)).toEqual([
    `d.tsx:1: className="${cls("shadow", "emerald-500/20")}"`,
  ]);
  // A token, not the palette.
  expect(statusPaletteIn("e.tsx", `  className="bg-primary text-primary-foreground"`)).toEqual([]);
  // The family name without a shade is not yet a colour.
  expect(statusPaletteIn("f.tsx", `  className="bg-emerald"`)).toEqual([]);
  // A comment recalling the palette states history, not a usage.
  expect(statusPaletteIn("g.tsx", `  // never ${cls("bg", "emerald-500")} outside statusTone`)).toEqual([]);
});

test("competingStatusPaletteIn finds a rival colour family, and not the status palette itself", () => {
  expect(competingStatusPaletteIn("a.tsx", `  className="${cls("bg", "green-500")}"`)).toEqual([
    `a.tsx:1: className="${cls("bg", "green-500")}"`,
  ]);
  expect(competingStatusPaletteIn("b.tsx", `  className="${cls("text", "yellow-700")}"`)).toEqual([
    `b.tsx:1: className="${cls("text", "yellow-700")}"`,
  ]);
  expect(competingStatusPaletteIn("c.tsx", `  className="${cls("border", "blue-400")}"`)).toEqual([
    `c.tsx:1: className="${cls("border", "blue-400")}"`,
  ]);
  expect(competingStatusPaletteIn("d.tsx", `  className="${cls("bg", "emerald-500")}"`)).toEqual([]);
  expect(
    competingStatusPaletteIn("e.tsx", `  // never ${cls("bg", "red-500")} for a destructive state`),
  ).toEqual([]);
});

test("the status palette lives in exactly Badge and statusTone, nowhere else", () => {
  const ALLOWED_PALETTE_FILES = [
    "src/components/badge.tsx",
    "src/theme/statusTone.ts",
    "src/theme/statusTone.test.ts",
  ];
  const tracked = packageSources();
  expect(tracked.length > 0, "the scan found no package sources, so it proves nothing").toBeTruthy();

  const offenders = tracked
    .filter((file) => !ALLOWED_PALETTE_FILES.includes(file))
    .flatMap((file) => statusPaletteIn(file, readFileSync(path.join(REPO, file), "utf8")));
  expect(
    offenders,
    "the status palette has exactly one home outside Badge and statusTone — read the tone from " +
      `src/theme/statusTone.ts instead:\n${offenders.join("\n")}`,
  ).toEqual([]);
});

test("no competing colour family stands in for the status palette anywhere in the package", () => {
  const tracked = packageSources();
  expect(tracked.length > 0, "the scan found no package sources, so it proves nothing").toBeTruthy();

  const offenders = tracked.flatMap((file) =>
    competingStatusPaletteIn(file, readFileSync(path.join(REPO, file), "utf8")),
  );
  expect(
    offenders,
    `a competing colour family stands in for the status palette:\n${offenders.join("\n")}`,
  ).toEqual([]);
});
