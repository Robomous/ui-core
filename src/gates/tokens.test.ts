// @vitest-environment node
/**
 * `DESIGN.md`'s first principle, machine-enforced: **never a colour in a class
 * string.** The helpers live in `./index.ts` so consumers run the same scans;
 * this file keeps their fabricated-input self-tests and runs the repo gates
 * over this package's own sources.
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

import { brandUsagesIn, colouredClassesIn } from "./index.js";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

const SOURCE = /\.(?:ts|tsx|css)$/;

// Fragment for fabricating violating input without this file matching itself.
const HEX = ["#", "[0-9a-fA-F]{3,8}"].join("");

/**
 * Assembles a bracketed Tailwind arbitrary-value utility (e.g.
 * `text-[var(--accent)]`) from its prefix and bracket contents at runtime, for
 * the same reason `HEX` above is built from fragments: this file scans its
 * own package, so a fixture spelled out contiguously would trip the very gate
 * it exists to exercise.
 */
const bracket = (prefix: string, inner: string) => `${prefix}-[${inner}]`;

/**
 * Assembles a `<prefix>-brand<suffix>` utility fixture at runtime, for the
 * same self-matching reason as `bracket` above.
 */
const brand = (prefix: string, suffix = "") => `${prefix}-brand${suffix}`;

test("the scan finds a colour smuggled into a class, and nothing that merely looks like one", () => {
  expect(colouredClassesIn("a.tsx", `  <div className="bg-[${HEX.slice(0, 1)}eb5a47]" />`)).toEqual(
    [`a.tsx:1: <div className="bg-[${HEX.slice(0, 1)}eb5a47]" />`],
  );
  expect(colouredClassesIn("b.tsx", `  className="${bracket("text", "var(--accent)")}"`)).toEqual([
    `b.tsx:1: className="${bracket("text", "var(--accent)")}"`,
  ]);
  expect(colouredClassesIn("c.tsx", `  className="${bracket("ring", "rgb(0 0 0)")}"`)).toEqual([
    `c.tsx:1: className="${bracket("ring", "rgb(0 0 0)")}"`,
  ]);

  // A token utility is the whole point of the rule and must pass.
  expect(colouredClassesIn("d.tsx", `  className="bg-primary text-primary-foreground"`)).toEqual(
    [],
  );
  // The accent at 10% is a token with an opacity modifier, not a colour.
  expect(colouredClassesIn("e.tsx", `  className="bg-primary/10 border-primary"`)).toEqual([]);
  // An arbitrary value that is *not* a colour stays legal — the rule is about
  // colour, and a one-off `top-[50%]` is not what v1 got wrong.
  expect(colouredClassesIn("f.tsx", `  className="translate-y-[3px]"`)).toEqual([]);
  // An inline style carrying a schema-supplied colour is the sanctioned road:
  // `classColor` answers with whatever the kernel stored, and Tailwind has never
  // seen it, so no utility could name it.
  expect(
    colouredClassesIn("g.tsx", `  style={{ background: classColor(declared, name) }}`),
  ).toEqual([]);
  // A docstring explaining the rule must pass, or the gate forbids its own
  // explanation — the mistake a boundary scan makes when it matches its own prose.
  expect(colouredClassesIn("h.tsx", `   * Never write \`bg-[${"#"}eb5a47]\`.`)).toEqual([]);
  // And a CSS custom property *declaration* is where colours are supposed to live.
  expect(colouredClassesIn("i.css", `  --color-primary: #eb5a47;`)).toEqual([]);
  // A colour-mix of two tokens names no colour of its own — the preset's own
  // Button hover step.
  expect(
    colouredClassesIn(
      "x.tsx",
      'className="hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]"',
    ),
  ).toEqual([]);
  // A colour-mix that mixes in a literal is still a colour smuggled into a class.
  expect(
    colouredClassesIn("x.tsx", `className="${bracket("bg", "color-mix(in_srgb,#fff,var(--x))")}"`)
      .length,
  ).toBe(1);
  // A named CSS colour inside color-mix is still a colour.
  expect(
    colouredClassesIn("x.tsx", `className="${bracket("bg", "color-mix(in_oklch,red,var(--x))")}"`)
      .length,
  ).toBe(1);
  // Whatever order the tokens come in, and whichever colour space, two tokens
  // stay two tokens.
  expect(
    colouredClassesIn("x.tsx", 'className="bg-[color-mix(in_srgb,var(--a)_40%,var(--b))]"').length,
  ).toBe(0);
});

test("the brand scan counts a usage, and not the comment that states the rule", () => {
  // A utility usage on any of the six colour-bearing prefixes is counted.
  expect(brandUsagesIn("a.tsx", `  <span className="${brand("text")}">Robomous</span>`)).toEqual([
    { file: "a.tsx", at: 1, text: `<span className="${brand("text")}">Robomous</span>` },
  ]);
  expect(
    brandUsagesIn("b.tsx", `  className="h-full ${brand("bg")} transition-transform"`),
  ).toEqual([
    { file: "b.tsx", at: 1, text: `className="h-full ${brand("bg")} transition-transform"` },
  ]);
  // An opacity modifier is still a usage of the brand colour.
  expect(brandUsagesIn("c.tsx", `  className="${brand("bg", "/10")}"`).map((u) => u.at)).toEqual([
    1,
  ]);
  // A comment line states the rule rather than applying it.
  expect(brandUsagesIn("d.css", `   * a third \`${brand("bg")}\` is a design decision`)).toEqual(
    [],
  );
  expect(brandUsagesIn("e.tsx", `  // never add ${brand("bg")} here`)).toEqual([]);
  // Another token on the same prefixes is not the brand.
  expect(brandUsagesIn("f.tsx", `  className="bg-primary text-primary-foreground"`)).toEqual([]);
  // The token *name* without a utility prefix is not a usage — tokens.test.ts
  // asserts LIGHT_THEME.brand's value and must not trip the gate.
  expect(brandUsagesIn("g.ts", `  expect(COLOR.brand).toBe("#e85d44");`)).toEqual([]);
});

/** Every tracked source in this repo. */
function repoSources(): string[] {
  const listed = spawnSync("git", ["ls-files", "-z"], { cwd: REPO, encoding: "utf8" });
  expect(listed.status, `git ls-files failed: ${listed.stderr}`).toBe(0);
  return listed.stdout.split("\0").filter((name) => SOURCE.test(name));
}

test("no source puts a colour inside a class name", () => {
  const tracked = repoSources();
  expect(tracked.length > 0, "the scan found no sources, so it proves nothing").toBeTruthy();

  const offenders = tracked.flatMap((file) =>
    colouredClassesIn(file, readFileSync(path.join(REPO, file), "utf8")),
  );
  expect(
    offenders,
    "colour belongs to the token contract — add a token to " +
      `src/theme/styles.css and name the intent:\n${offenders.join("\n")}`,
  ).toEqual([]);
});

/**
 * This package has zero brand sites: it declares the `--brand` token and never
 * paints with it. `DESIGN.md` "Where the brand is": brand sites are a consumer
 * decision — two enumerated sites per consuming app (the wordmark and the
 * styleguide swatch that displays the value), gated in the consumer's repo.
 */
const BRAND_SITES: string[] = [];

test("the brand colour paints nothing here — brand sites are a consumer decision", () => {
  const tracked = repoSources();
  expect(tracked.length > 0, "the scan found no sources, so it proves nothing").toBeTruthy();

  const usages = tracked.flatMap((file) =>
    brandUsagesIn(file, readFileSync(path.join(REPO, file), "utf8")),
  );
  expect(
    usages.map((u) => u.file).sort(),
    "DESIGN.md 'Where the brand is': this package declares the brand token and never uses it — " +
      "a brand-coloured site belongs to a consuming app (two enumerated sites per app):\n" +
      usages.map((u) => `${u.file}:${u.at}: ${u.text}`).join("\n"),
  ).toEqual(BRAND_SITES);
});

/**
 * Lucide is the icon set, and the only one.
 *
 * The rule is "one icon library", not "this particular library". So this
 * guards whichever set is currently *not* in use, and the value below is the
 * whole of what changes when that decision changes.
 *
 * Assembled from fragments so this file never holds the package's name as a
 * contiguous string, and a repository-wide sweep for it never mistakes its own
 * guard for a lingering usage.
 */
const RETIRED_ICON_PACKAGE = ["@tabler", "icons-react"].join("/");

test("no package declares a second icon set, and no source imports one", () => {
  const listed = spawnSync("git", ["ls-files", "-z"], { cwd: REPO, encoding: "utf8" });
  expect(listed.status, `git ls-files failed: ${listed.stderr}`).toBe(0);
  const tracked = listed.stdout.split("\0").filter(Boolean);

  const manifests = tracked.filter((name) => /(?:^|\/)package\.json$/.test(name));
  expect(manifests.length > 0, "no manifests were read, so this proves nothing").toBeTruthy();
  const declaring = manifests.filter((name) =>
    readFileSync(path.join(REPO, name), "utf8").includes(`"${RETIRED_ICON_PACKAGE}"`),
  );
  expect(
    declaring,
    `this package draws one icon set, and ${RETIRED_ICON_PACKAGE} is not it. ` +
      `A second one is a decision for DESIGN.md, not a dependency:\n${declaring.join("\n")}`,
  ).toEqual([]);

  const sources = tracked.filter((name) => SOURCE.test(name));
  expect(sources.length > 0, "no sources were read, so this proves nothing").toBeTruthy();
  const importing = sources.filter((name) =>
    new RegExp(String.raw`(?:from|require\()\s*["']${RETIRED_ICON_PACKAGE}["']`).test(
      readFileSync(path.join(REPO, name), "utf8"),
    ),
  );
  expect(importing, `these draw from the retired icon set:\n${importing.join("\n")}`).toEqual([]);
});

test("the tokens have exactly one home, and it is the stylesheet", () => {
  const listed = spawnSync("git", ["ls-files", "-z"], { cwd: REPO, encoding: "utf8" });
  expect(listed.status, `git ls-files failed: ${listed.stderr}`).toBe(0);
  const configs = listed.stdout
    .split("\0")
    .filter((name) => /(?:^|\/)tailwind\.config\.[cm]?[jt]s$/.test(name));
  expect(
    configs,
    "Tailwind v4 is CSS-first: the tokens live in src/theme/styles.css. " +
      `A config file gives them a second definition that wins for some utilities and not others:\n${configs.join("\n")}`,
  ).toEqual([]);
});
