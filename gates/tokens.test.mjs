/**
 * `DESIGN.md`'s first principle, machine-enforced: **never a colour in a class
 * string.** The helpers live in `./index.mjs` so consumers run the same scans;
 * this file keeps their fabricated-input self-tests and runs the repo gates
 * over this package's own sources.
 */

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

import { brandUsagesIn, colouredClassesIn, retiredDeclarationsIn } from "./index.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SOURCE = /\.(?:ts|tsx|css)$/;

// Fragments for fabricating violating input without this file matching itself.
const HEX = ["#", "[0-9a-fA-F]{3,8}"].join("");
const dash = (...parts) => parts.join("-");

test("the scan finds a colour smuggled into a class, and nothing that merely looks like one", () => {
  assert.deepEqual(colouredClassesIn("a.tsx", `  <div className="bg-[${HEX.slice(0, 1)}eb5a47]" />`), [
    `a.tsx:1: <div className="bg-[#eb5a47]" />`,
  ]);
  assert.deepEqual(colouredClassesIn("b.tsx", `  className="text-[var(--accent)]"`), [
    `b.tsx:1: className="text-[var(--accent)]"`,
  ]);
  assert.deepEqual(colouredClassesIn("c.tsx", `  className="ring-[rgb(0 0 0)]"`), [
    `c.tsx:1: className="ring-[rgb(0 0 0)]"`,
  ]);

  // A token utility is the whole point of the rule and must pass.
  assert.deepEqual(colouredClassesIn("d.tsx", `  className="bg-primary text-primary-foreground"`), []);
  // The accent at 10% is a token with an opacity modifier, not a colour.
  assert.deepEqual(colouredClassesIn("e.tsx", `  className="bg-primary/10 border-primary"`), []);
  // An arbitrary value that is *not* a colour stays legal — the rule is about
  // colour, and a one-off `top-[50%]` is not what v1 got wrong.
  assert.deepEqual(colouredClassesIn("f.tsx", `  className="translate-y-[3px]"`), []);
  // An inline style carrying a schema-supplied colour is the sanctioned road:
  // `classColor` answers with whatever the kernel stored, and Tailwind has never
  // seen it, so no utility could name it.
  assert.deepEqual(
    colouredClassesIn("g.tsx", `  style={{ background: classColor(declared, name) }}`),
    [],
  );
  // A docstring explaining the rule must pass, or the gate forbids its own
  // explanation — the mistake a boundary scan makes when it matches its own prose.
  assert.deepEqual(colouredClassesIn("h.tsx", `   * Never write \`bg-[${"#"}eb5a47]\`.`), []);
  // And a CSS custom property *declaration* is where colours are supposed to live.
  assert.deepEqual(colouredClassesIn("i.css", `  --color-primary: #eb5a47;`), []);
  // A colour-mix of two tokens names no colour of its own — the preset's own
  // Button hover step.
  assert.deepEqual(colouredClassesIn("x.tsx", 'className="hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]"'), []);
  // A colour-mix that mixes in a literal is still a colour smuggled into a class.
  assert.equal(colouredClassesIn("x.tsx", 'className="bg-[color-mix(in_srgb,#fff,var(--x))]"').length, 1);
  // A named CSS colour inside color-mix is still a colour.
  assert.equal(colouredClassesIn("x.tsx", 'className="bg-[color-mix(in_oklch,red,var(--x))]"').length, 1);
  // Whatever order the tokens come in, and whichever colour space, two tokens
  // stay two tokens.
  assert.equal(colouredClassesIn("x.tsx", 'className="bg-[color-mix(in_srgb,var(--a)_40%,var(--b))]"').length, 0);
});

test("the brand scan counts a usage, and not the comment that states the rule", () => {
  // A utility usage on any of the six colour-bearing prefixes is counted.
  assert.deepEqual(brandUsagesIn("a.tsx", `  <span className="text-brand">Robomous</span>`), [
    { file: "a.tsx", at: 1, text: `<span className="text-brand">Robomous</span>` },
  ]);
  assert.deepEqual(brandUsagesIn("b.tsx", `  className="h-full bg-brand transition-transform"`), [
    { file: "b.tsx", at: 1, text: `className="h-full bg-brand transition-transform"` },
  ]);
  // An opacity modifier is still a usage of the brand colour.
  assert.deepEqual(
    brandUsagesIn("c.tsx", `  className="bg-brand/10"`).map((u) => u.at),
    [1],
  );
  // A comment line states the rule rather than applying it.
  assert.deepEqual(brandUsagesIn("d.css", `   * a third \`bg-brand\` is a design decision`), []);
  assert.deepEqual(brandUsagesIn("e.tsx", `  // never add bg-brand here`), []);
  // Another token on the same prefixes is not the brand.
  assert.deepEqual(brandUsagesIn("f.tsx", `  className="bg-primary text-primary-foreground"`), []);
  // The token *name* without a utility prefix is not a usage — tokens.test.ts
  // asserts LIGHT_THEME.brand's value and must not trip the gate.
  assert.deepEqual(brandUsagesIn("g.ts", `  expect(COLOR.brand).toBe("#e85d44");`), []);
});

/** Every tracked source in this repo. */
function repoSources() {
  const listed = spawnSync("git", ["ls-files", "-z"], { cwd: REPO, encoding: "utf8" });
  assert.equal(listed.status, 0, `git ls-files failed: ${listed.stderr}`);
  return listed.stdout.split("\0").filter((name) => SOURCE.test(name));
}

test("no source puts a colour inside a class name", () => {
  const tracked = repoSources();
  assert.ok(tracked.length > 0, "the scan found no sources, so it proves nothing");

  const offenders = tracked.flatMap((file) =>
    colouredClassesIn(file, readFileSync(path.join(REPO, file), "utf8")),
  );
  assert.deepEqual(
    offenders,
    [],
    "colour belongs to the token contract — add a token to " +
      `src/styles.css and name the intent:\n${offenders.join("\n")}`,
  );
});

/**
 * This package has zero brand sites: it declares the `--brand` token and never
 * paints with it. `DESIGN.md` "Where the brand is": brand sites are a consumer
 * decision — two enumerated sites per consuming app (the wordmark and the
 * styleguide swatch that displays the value), gated in the consumer's repo.
 */
const BRAND_SITES = [];

test("the brand colour paints nothing here — brand sites are a consumer decision", () => {
  const tracked = repoSources();
  assert.ok(tracked.length > 0, "the scan found no sources, so it proves nothing");

  const usages = tracked.flatMap((file) =>
    brandUsagesIn(file, readFileSync(path.join(REPO, file), "utf8")),
  );
  assert.deepEqual(
    usages.map((u) => u.file).sort(),
    BRAND_SITES,
    "DESIGN.md 'Where the brand is': this package declares the brand token and never uses it — " +
      "a brand-coloured site belongs to a consuming app (two enumerated sites per app):\n" +
      usages.map((u) => `${u.file}:${u.at}: ${u.text}`).join("\n"),
  );
});

test("the scan finds a retired declaration, and not a comment or a longer name that merely contains it", () => {
  assert.deepEqual(retiredDeclarationsIn(`  ${dash("--color", "disabled")}: oklch(0.9 0 0);`), [
    `1: ${dash("--color", "disabled")}`,
  ]);
  assert.deepEqual(retiredDeclarationsIn(`  ${dash("--text", "meta")}: 0.75rem;`), [
    `1: ${dash("--text", "meta")}`,
  ]);
  // A comment recalling the retired name states history, not a declaration.
  assert.deepEqual(
    retiredDeclarationsIn(`  /* ${dash("--color", "primary", "hover")} no longer exists */`),
    [],
  );
  // A name that merely starts with a retired one is a different declaration —
  // disabled-foreground is its own retired entry, and its presence must not
  // be double-counted as disabled's.
  assert.deepEqual(retiredDeclarationsIn(`  ${dash("--color", "disabled", "foreground")}: red;`), [
    `1: ${dash("--color", "disabled", "foreground")}`,
  ]);
  // A current, kept token is not a retired one.
  assert.deepEqual(retiredDeclarationsIn(`  --brand: white;`), []);
  // success/warning retired alongside the forked primitives that needed them —
  // no longer a kept extension, so this now reports a hit.
  assert.deepEqual(retiredDeclarationsIn(`  --success-foreground: white;`), [
    `1: ${dash("--success", "foreground")}`,
  ]);
});

test("the retired foundation vocabulary is absent from the stylesheet", () => {
  const STYLES_PATH = "src/styles.css";
  const stylesheet = readFileSync(path.join(REPO, STYLES_PATH), "utf8");
  const present = retiredDeclarationsIn(stylesheet);
  assert.deepEqual(
    present,
    [],
    "styles.css still declares a name the original audit retired — " +
      `it has no shadcn analogue and no extension:\n${present.join("\n")}`,
  );
});

/**
 * `components.json` carries the preset properties shadcn's own tools read, and
 * only those: the fields its config schema defines. The schema is **strict** —
 * `rawConfigSchema.safeParse` answers `unrecognized_keys` for anything else — so
 * a decoded preset property the schema has no field for cannot be added here
 * even as documentation. It would not be ignored; it would break every `shadcn`
 * invocation that reads the file.
 *
 * `radius` is the property that keeps inviting the mistake: the preset decodes to
 * `radius: medium`, and the obvious repair for "the config does not say so" is to
 * write it in. The medium step's one home is `styles.css`'s `--radius: 0.625rem`
 * (asserted by `tokens.test.ts`); this test is the other half, refusing the field
 * that would look like a second home while doing nothing. Keys rather than a
 * count, so a failure names what moved.
 */
const CONFIG_PATH = "components.json";
const SCHEMA_SUPPORTED_KEYS = [
  "$schema",
  "aliases",
  "iconLibrary",
  "menuAccent",
  "menuColor",
  "registries",
  "rsc",
  "rtl",
  "style",
  "tailwind",
  "tsx",
];

test("components.json holds the schema-supported preset fields, and no others", () => {
  const config = JSON.parse(readFileSync(path.join(REPO, CONFIG_PATH), "utf8"));
  assert.deepEqual(
    Object.keys(config).sort(),
    SCHEMA_SUPPORTED_KEYS,
    `${CONFIG_PATH} must carry exactly the fields shadcn's strict config schema defines. ` +
      "A decoded preset property with no field here belongs in src/styles.css " +
      "as a value — see DESIGN.md 'Source of Truth'",
  );

  // The preset's own values, where the schema does have a field for them.
  assert.equal(config.style, "radix-nova");
  assert.equal(config.iconLibrary, "lucide");
  assert.equal(config.menuColor, "default");
  assert.equal(config.menuAccent, "subtle");
  assert.equal(config.tailwind.baseColor, "neutral");
  assert.equal(config.tailwind.css, "src/styles.css");
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
  assert.equal(listed.status, 0, `git ls-files failed: ${listed.stderr}`);
  const tracked = listed.stdout.split("\0").filter(Boolean);

  const manifests = tracked.filter((name) => /(?:^|\/)package\.json$/.test(name));
  assert.ok(manifests.length > 0, "no manifests were read, so this proves nothing");
  const declaring = manifests.filter((name) =>
    readFileSync(path.join(REPO, name), "utf8").includes(`"${RETIRED_ICON_PACKAGE}"`),
  );
  assert.deepEqual(
    declaring,
    [],
    `this package draws one icon set, and ${RETIRED_ICON_PACKAGE} is not it. ` +
      `A second one is a decision for DESIGN.md, not a dependency:\n${declaring.join("\n")}`,
  );

  const sources = tracked.filter((name) => SOURCE.test(name));
  assert.ok(sources.length > 0, "no sources were read, so this proves nothing");
  const importing = sources.filter((name) =>
    new RegExp(String.raw`(?:from|require\()\s*["']${RETIRED_ICON_PACKAGE}["']`).test(
      readFileSync(path.join(REPO, name), "utf8"),
    ),
  );
  assert.deepEqual(importing, [], `these draw from the retired icon set:\n${importing.join("\n")}`);
});

test("the tokens have exactly one home, and it is the stylesheet", () => {
  const listed = spawnSync("git", ["ls-files", "-z"], { cwd: REPO, encoding: "utf8" });
  assert.equal(listed.status, 0, `git ls-files failed: ${listed.stderr}`);
  const configs = listed.stdout
    .split("\0")
    .filter((name) => /(?:^|\/)tailwind\.config\.[cm]?[jt]s$/.test(name));
  assert.deepEqual(
    configs,
    [],
    "Tailwind v4 is CSS-first: the tokens live in src/styles.css. " +
      `A config file gives them a second definition that wins for some utilities and not others:\n${configs.join("\n")}`,
  );
});
