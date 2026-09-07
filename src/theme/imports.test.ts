// @vitest-environment node
/**
 * Everything `styles.css` imports really resolves — packages and siblings both.
 *
 * The stylesheet ships as **source**: `exports["./styles.css"]` hands a consumer
 * the file itself, and the consumer's Tailwind build is what resolves the
 * `@import`s in it. So a package named there is a genuine runtime dependency of
 * this one, and a sibling named there is a file that has to be published. Get
 * either wrong and every consumer breaks while `pnpm lint`, `pnpm build` and
 * `pnpm test` all stay green — nothing in this repository compiles CSS, so
 * nothing here would otherwise notice. A rule nothing checks is a preference;
 * this is the check.
 *
 * Both halves matter, and they fail differently. A missing **package** is a
 * dependency that was dropped from `package.json` because a grep for
 * `from "..."` never sees a CSS `@import`. A missing **sibling** is a file that
 * exists on the author's disk but was never committed, or was left out of
 * `files` — so it resolves here and nowhere else.
 *
 * Package resolution goes through the package's own `exports` map with the
 * `style` condition first, because that is the condition a CSS bundler asks for
 * and some packages expose their stylesheet under no other — Node's own
 * `import.meta.resolve` asks for `import`/`require` and would report a
 * correctly installed package as missing.
 */

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { expect, test } from "vitest";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const MODULES = path.join(REPO, "node_modules");
const STYLESHEET_DIR = path.join(REPO, "src/theme");
const STYLESHEET = readFileSync(path.join(STYLESHEET_DIR, "styles.css"), "utf8");

/** The conditions a CSS bundler offers, most specific first. */
const CONDITIONS = ["style", "default", "import", "require"];

/** Every `@import` specifier in the stylesheet, in source order. */
function importsIn(css: string): string[] {
  return [...css.matchAll(/^\s*@import\s+["']([^"']+)["']/gm)].map((match) => match[1]);
}

/** A URL needs no filesystem, so it is not this gate's business. */
const isRemote = (spec: string) => /^https?:/.test(spec);

/** `"./tailwind.css"`, `"../a/b.css"` — resolved against the stylesheet itself. */
const isRelative = (spec: string) => /^\.{1,2}\//.test(spec);

/** `"@scope/pkg/a/b"` → `["@scope/pkg", "./a/b"]`; `"pkg"` → `["pkg", "."]`. */
function splitSpecifier(spec: string): [name: string, subpath: string] {
  const segments = spec.split("/");
  const name = spec.startsWith("@") ? segments.slice(0, 2).join("/") : segments[0];
  const rest = spec.slice(name.length);
  return [name, rest === "" ? "." : `.${rest}`];
}

/** The first branch of a conditional export any of `CONDITIONS` selects. */
function pickCondition(node: unknown): string | null {
  if (typeof node === "string") return node;
  if (node === null || typeof node !== "object") return null;
  const branches = node as Record<string, unknown>;
  for (const condition of CONDITIONS) {
    if (condition in branches) {
      const picked = pickCondition(branches[condition]);
      if (picked !== null) return picked;
    }
  }
  return null;
}

/** Where a package's `exports` (or its legacy fields) send one subpath. */
function targetOf(manifest: Record<string, unknown>, subpath: string): string | null {
  const map = manifest.exports;
  if (map === undefined) {
    // No exports map: "." is the package's own stylesheet field, and any other
    // subpath is a plain path inside the package.
    if (subpath !== ".") return subpath;
    return (manifest.style as string) ?? (manifest.main as string) ?? null;
  }
  if (typeof map === "string") return subpath === "." ? map : null;
  const entries = map as Record<string, unknown>;
  if (subpath in entries) return pickCondition(entries[subpath]);
  // An exports map that is conditions all the way down is shorthand for ".".
  if (subpath === "." && !Object.keys(entries).some((key) => key.startsWith("."))) {
    return pickCondition(entries);
  }
  return null;
}

/** The file a specifier lands on, or why it lands nowhere. */
function resolveStyleImport(spec: string): { file: string } | { reason: string } {
  const [name, subpath] = splitSpecifier(spec);
  const root = path.join(MODULES, ...name.split("/"));
  const manifestPath = path.join(root, "package.json");
  if (!existsSync(manifestPath)) {
    return { reason: `${name} is not installed — it is missing from package.json dependencies` };
  }
  const target = targetOf(JSON.parse(readFileSync(manifestPath, "utf8")), subpath);
  if (target === null) {
    return { reason: `${name} declares no export for ${subpath}` };
  }
  const file = path.join(root, target);
  if (!existsSync(file)) {
    return { reason: `${name} exports ${subpath} as ${target}, which does not exist` };
  }
  return { file };
}

test("every package the stylesheet imports is installed and exports the file it names", () => {
  const specs = importsIn(STYLESHEET).filter((spec) => !isRemote(spec) && !isRelative(spec));
  expect(specs.length > 0, "the stylesheet named no packages, so this proves nothing").toBe(true);

  const broken = specs
    .map((spec) => ({ spec, result: resolveStyleImport(spec) }))
    .filter((entry) => "reason" in entry.result)
    .map((entry) => `@import "${entry.spec}": ${(entry.result as { reason: string }).reason}`);

  expect(
    broken,
    "styles.css ships as source and the consumer's Tailwind build resolves these, so an " +
      "unresolvable @import breaks every consumer and nothing in this repository compiles " +
      `CSS to catch it:\n${broken.join("\n")}`,
  ).toEqual([]);
});

test("every sibling the stylesheet imports exists and is committed", () => {
  const specs = importsIn(STYLESHEET).filter(isRelative);
  expect(specs.length > 0, "the stylesheet named no siblings, so this proves nothing").toBe(true);

  const broken = specs.flatMap((spec) => {
    const file = path.resolve(STYLESHEET_DIR, spec);
    if (!existsSync(file)) {
      return [`@import "${spec}": ${path.relative(REPO, file)} does not exist`];
    }
    // On disk is not enough. `files: ["src"]` publishes what the working tree
    // holds, so an uncommitted sibling packs fine here and is absent from the
    // clone CI builds and publishes from — the failure lands on consumers only.
    const tracked = spawnSync("git", ["ls-files", "--error-unmatch", file], {
      cwd: REPO,
      encoding: "utf8",
    });
    if (tracked.status !== 0) {
      return [
        `@import "${spec}": ${path.relative(REPO, file)} exists but is not tracked by git — ` +
          "commit it, or the published package will not carry it",
      ];
    }
    return [];
  });

  expect(
    broken,
    "styles.css ships as source, so a sibling it imports has to reach the consumer with it:\n" +
      broken.join("\n"),
  ).toEqual([]);
});
