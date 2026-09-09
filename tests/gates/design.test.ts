// @vitest-environment node
import { readFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

import { competingStatusPaletteIn, statusPaletteIn } from "../../src/gates/index.js";

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
    statusPaletteIn(
      "b.tsx",
      `  className="${cls("border", "amber-400")} dark:${cls("border", "amber-300")}"`,
    ),
  ).toEqual([
    `b.tsx:1: className="${cls("border", "amber-400")} dark:${cls("border", "amber-300")}"`,
  ]);
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
  expect(
    statusPaletteIn("g.tsx", `  // never ${cls("bg", "emerald-500")} outside statusTone`),
  ).toEqual([]);
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
  expect(competingStatusPaletteIn("d.tsx", `  className="${cls("bg", "emerald-500")}"`)).toEqual(
    [],
  );
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
  expect(
    tracked.length > 0,
    "the scan found no package sources, so it proves nothing",
  ).toBeTruthy();

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
  expect(
    tracked.length > 0,
    "the scan found no package sources, so it proves nothing",
  ).toBeTruthy();

  const offenders = tracked.flatMap((file) =>
    competingStatusPaletteIn(file, readFileSync(path.join(REPO, file), "utf8")),
  );
  expect(
    offenders,
    `a competing colour family stands in for the status palette:\n${offenders.join("\n")}`,
  ).toEqual([]);
});

/**
 * Every component module is part of the public surface.
 *
 * `src/index.ts` lists its exports one by one rather than re-exporting a
 * directory, which is what keeps the promise auditable — and is also what lets
 * a finished component sit in `src/components/` for months without ever
 * reaching a consumer. `separator.tsx` did exactly that: written, imported by
 * `field.tsx`, never exported, and nothing noticed because every other check
 * here reads the files rather than the surface.
 *
 * A module that is deliberately internal has no home in `src/components/`; move
 * it beside its one caller instead, and this gate stops asking about it.
 */
test("src/index.ts exports every component module in src/components", () => {
  const listed = spawnSync("git", ["ls-files", "-z", "src/components"], {
    cwd: REPO,
    encoding: "utf8",
  });
  expect(listed.status, `git ls-files failed: ${listed.stderr}`).toBe(0);

  const modules = listed.stdout
    .split("\0")
    .filter((name) => name.endsWith(".tsx") && !name.includes(".test."))
    .map((name) => path.basename(name, ".tsx"));
  expect(
    modules.length > 0,
    "no component modules were found, so this proves nothing",
  ).toBeTruthy();

  const surface = read("src/index.ts");
  const missing = modules.filter((name) => !surface.includes(`from "./components/${name}.js"`));
  expect(
    missing,
    "these components exist but no consumer can import them — add an export to src/index.ts, " +
      `or move the module next to its only caller:\n${missing.join("\n")}`,
  ).toEqual([]);
});

/**
 * The stylesheet's `@source` still reaches the components.
 *
 * `styles.css` ships as source and a consumer's Tailwind compiles it. That
 * compiler auto-detects the *consumer's* files and never walks
 * `node_modules`, so `@source` is the only thing that puts this package's
 * class strings in front of it. The directive resolves relative to the
 * stylesheet, so moving the stylesheet moves the target — and pointing it one
 * directory too shallow costs a consumer every utility that only this package
 * writes, with no error anywhere: the CSS compiles, it is simply missing
 * `h-8`, `line-clamp-1` and every variant utility the components rely on.
 *
 * Nothing else here can catch that, because nothing here compiles CSS. This
 * resolves the path and asks whether the components are under it.
 */
test("the stylesheet's @source resolves to a directory that holds the components", () => {
  const stylesheet = read("src/theme/styles.css");
  const directives = [...stylesheet.matchAll(/^\s*@source\s+"([^"]+)"\s*;/gm)].map((m) => m[1]);
  expect(directives.length, "styles.css declares no @source, so it scans nothing").toBeGreaterThan(
    0,
  );

  const stylesheetDir = path.join(REPO, "src", "theme");
  const componentDir = path.join(REPO, "src", "components");

  const reaching = directives.filter((spec) => {
    const target = path.resolve(stylesheetDir, spec);
    // `@source` scans a directory recursively, so it reaches the components
    // when its target is the component directory or an ancestor of it.
    const rel = path.relative(target, componentDir);
    return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
  });

  expect(
    reaching,
    "no @source in src/theme/styles.css reaches src/components, so a consumer's build would " +
      "emit none of this package's own utilities. @source resolves relative to the stylesheet: " +
      `from src/theme/ the components are at "..". Declared: ${directives.join(", ")}`,
  ).not.toEqual([]);
});
