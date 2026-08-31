import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

import {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  FOUNDATION_BADGE,
  OFFICIAL_BADGE,
  competingStatusPaletteIn,
  legacyVocabularyIn,
  menuSurfaceGapsIn,
  statusPaletteIn,
  statusTokenUtilitiesIn,
  variantClasses,
  variantKeys,
} from "./index.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(path.join(REPO, rel), "utf8");

const SOURCE = /\.(?:ts|tsx|css)$/;
const SHADCN_SNAPSHOT = /^shadcn\//;

/** Every tracked package file matching `SOURCE`. */
function packageSources({ includeSnapshots } = {}) {
  const listed = spawnSync("git", ["ls-files", "-z", "src", "shadcn"], { cwd: REPO, encoding: "utf8" });
  assert.equal(listed.status, 0, `git ls-files failed: ${listed.stderr}`);
  return listed.stdout
    .split("\0")
    .filter((name) => SOURCE.test(name) && (includeSnapshots || !SHADCN_SNAPSHOT.test(name)));
}

test("variantKeys reads quoted and bare keys and ignores class text", () => {
  assert.deepEqual(
    variantKeys(`x({ variants: { variant: { default: "a: b", "icon-xs": "c" }, size: { sm: "d" } } })`),
    ["default", "icon-xs"],
  );
  assert.deepEqual(variantKeys(`variants: { variant: { a: "" }, size: { sm: "x", lg: "y" } }`, "size"), ["sm", "lg"]);
});

const BUTTON = "src/primitives/button.tsx";
test("Button carries shadcn's variants and sizes, and nothing else", () => {
  const src = read(BUTTON);
  assert.deepEqual(variantKeys(src, "variant"), BUTTON_VARIANTS);
  assert.deepEqual(variantKeys(src, "size"), BUTTON_SIZES);
});

const BADGE = "src/primitives/badge.tsx";

test("Badge keeps shadcn's variants and adds exactly the four foundation status variants", () => {
  const keys = variantKeys(read(BADGE), "variant");
  for (const k of OFFICIAL_BADGE) assert.ok(keys.includes(k), `official Badge variant ${k} missing`);
  assert.deepEqual(keys.filter((k) => !OFFICIAL_BADGE.includes(k)).sort(), [...FOUNDATION_BADGE].sort());
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

test("legacyVocabularyIn flags v1's shapes and stays silent on the shadcn contract", () => {
  assert.deepEqual(legacyVocabularyIn("a.tsx", `<Button variant="primary">Go</Button>`), [
    `a.tsx:1: <Button variant="primary">`,
  ]);
  assert.deepEqual(legacyVocabularyIn("b.tsx", `<Button size="md">Go</Button>`), [`b.tsx:1: <Button size="md">`]);
  assert.deepEqual(legacyVocabularyIn("c.tsx", `<Badge variant="neutral">Draft</Badge>`), [
    `c.tsx:1: <Badge variant="neutral">`,
  ]);
  assert.deepEqual(legacyVocabularyIn("d.tsx", `<Progress value={40} variant="thin" />`), [
    `d.tsx:1: <Progress value={40} variant="thin" />`,
  ]);
  assert.deepEqual(legacyVocabularyIn("e.tsx", `<SelectItem value="a" meta="12 items">A</SelectItem>`), [
    `e.tsx:1: <SelectItem value="a" meta="12 items">`,
  ]);
  assert.deepEqual(legacyVocabularyIn("f.tsx", `<Alert title="Heads up">…</Alert>`), [
    `f.tsx:1: <Alert title="Heads up">`,
  ]);
  // An outline Badge hand-rounded with a className utility is the `quiet`
  // shape built by hand — forbidden regardless of attribute order.
  assert.deepEqual(
    legacyVocabularyIn("f2.tsx", `<Badge variant="outline" className="rounded-md">Chip</Badge>`),
    [`f2.tsx:1: <Badge variant="outline" className="rounded-md">`],
  );
  assert.deepEqual(
    legacyVocabularyIn("f3.tsx", `<Badge className="rounded-full" variant="outline">Chip</Badge>`),
    [`f3.tsx:1: <Badge className="rounded-full" variant="outline">`],
  );
  // A multi-line tag is still one tag.
  assert.deepEqual(
    legacyVocabularyIn("g.tsx", `<Button\n  variant="primary"\n  onClick={go}\n>\n  Go\n</Button>`),
    [`g.tsx:1: <Button`],
  );
  // An arrow function's own `>` does not end the tag before the real attribute.
  assert.deepEqual(
    legacyVocabularyIn("g2.tsx", `<Button onClick={() => setOpen(true)} variant="primary">Go</Button>`),
    [`g2.tsx:1: <Button onClick={() => setOpen(true)} variant="primary">`],
  );
  // Nor does a `>` comparison inside the expression.
  assert.deepEqual(
    legacyVocabularyIn("g3.tsx", `<Progress value={count > 0 ? count : 0} variant="thin" />`),
    [`g3.tsx:1: <Progress value={count > 0 ? count : 0} variant="thin" />`],
  );
  // The same tricky arrow function with no forbidden attribute stays silent.
  assert.deepEqual(legacyVocabularyIn("g4.tsx", `<Button onClick={() => go()}>ok</Button>`), []);
  // Nor does a `>` quoted inside a string inside braces — the tag still
  // extends to its real close, past the attribute that follows the string.
  assert.deepEqual(
    legacyVocabularyIn("g5.tsx", `<Alert data-note={"a > b"} title="Heads up">Body</Alert>`),
    [`g5.tsx:1: <Alert data-note={"a > b"} title="Heads up">`],
  );
  assert.deepEqual(legacyVocabularyIn("h.tsx", `<FieldHint>Optional</FieldHint>`), [
    `h.tsx:1: <FieldHint>Optional</FieldHint>`,
  ]);
  assert.deepEqual(legacyVocabularyIn("i.tsx", `<TableEmpty>No rows</TableEmpty>`), [
    `i.tsx:1: <TableEmpty>No rows</TableEmpty>`,
  ]);
  assert.deepEqual(legacyVocabularyIn("j.ts", `import { Badge } from "../primitives/Badge.js";`), [
    `j.ts:1: import { Badge } from "../primitives/Badge.js";`,
  ]);
  assert.deepEqual(legacyVocabularyIn("k.tsx", `import { useTheme } from "next-themes";`), [
    `k.tsx:1: import { useTheme } from "next-themes";`,
  ]);

  // The shadcn contract itself must pass clean.
  assert.deepEqual(legacyVocabularyIn("l.tsx", `<Button variant="outline" size="sm">Go</Button>`), []);
  assert.deepEqual(legacyVocabularyIn("m.tsx", `<AlertTitle title="not this one">x</AlertTitle>`), []);
  assert.deepEqual(legacyVocabularyIn("n.tsx", `<Badge variant="secondary">Draft</Badge>`), []);
  // The `quiet` variant is the shape itself, not the hand-rolled shape.
  assert.deepEqual(legacyVocabularyIn("n2.tsx", `<Badge variant="quiet">Chip</Badge>`), []);
  // Only one of the two attributes is not yet the forbidden shape.
  assert.deepEqual(legacyVocabularyIn("n3.tsx", `<Badge variant="outline">Chip</Badge>`), []);
  assert.deepEqual(legacyVocabularyIn("n4.tsx", `<Badge className="rounded-md">Chip</Badge>`), []);
  assert.deepEqual(legacyVocabularyIn("o.ts", `import { Badge } from "../primitives/badge.js";`), []);
  // A comment recalling the retired shape states history, not a usage.
  assert.deepEqual(legacyVocabularyIn("p.tsx", `  // <Button variant="primary">Go</Button>`), []);
  assert.deepEqual(legacyVocabularyIn("q.tsx", `// reads next-themes for the mounted flag`), []);

  // The same vocabulary as a test reads it back, the wrapped call included —
  // the shape TAG_ATTRIBUTE_RULES cannot see.
  assert.deepEqual(
    legacyVocabularyIn("r.ts", `await expect(go).toHaveAttribute(\n  "data-variant",\n  "primary",\n);`),
    [`r.ts:2: "data-variant", "primary"`],
  );
  assert.deepEqual(legacyVocabularyIn("r2.ts", `page.locator('[data-variant="primary"]')`), [
    `r2.ts:1: [data-variant="primary"]`,
  ]);
  assert.deepEqual(
    legacyVocabularyIn("r3.tsx", `expect(el.getAttribute("data-variant")).toBe("accent");`),
    [`r3.tsx:1: getAttribute("data-variant")).toBe("accent"`],
  );
  assert.deepEqual(legacyVocabularyIn("r4.tsx", `expect(el.dataset.size).toBe("md");`), [
    `r4.tsx:1: dataset.size).toBe("md"`,
  ]);
  // A variant that still exists is a question about the call site, not the vocabulary.
  assert.deepEqual(legacyVocabularyIn("s.ts", `toHaveAttribute("data-variant", "outline")`), []);
  assert.deepEqual(
    legacyVocabularyIn("s2.tsx", `expect(b.getAttribute("data-variant")).toBe("success");`),
    [],
  );
});

test("no package source reaches for a name the extension contract retired", () => {
  const tracked = packageSources();
  assert.ok(tracked.length > 0, "the scan found no package sources, so it proves nothing");

  const offenders = tracked.flatMap((file) => legacyVocabularyIn(file, readFileSync(path.join(REPO, file), "utf8")));
  assert.deepEqual(
    offenders,
    [],
    "a source still reaches for a name the extension contract retired:\n" + offenders.join("\n"),
  );
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
    "src/primitives/badge.tsx",
    "src/statusTone.ts",
    "src/statusTone.test.ts",
  ];
  const tracked = packageSources({ includeSnapshots: true });
  assert.ok(tracked.length > 0, "the scan found no package sources, so it proves nothing");

  const offenders = tracked
    .filter((file) => !ALLOWED_PALETTE_FILES.includes(file))
    .flatMap((file) => statusPaletteIn(file, readFileSync(path.join(REPO, file), "utf8")));
  assert.deepEqual(
    offenders,
    [],
    "the status palette has exactly one home outside Badge and statusTone — read the tone from " +
      `src/statusTone.ts instead:\n${offenders.join("\n")}`,
  );
});

test("no competing colour family stands in for the status palette anywhere in the package", () => {
  const tracked = packageSources({ includeSnapshots: true });
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

test("statusTokenUtilitiesIn finds the retired success/warning utility, and not the emerald/amber tokens that replaced it", () => {
  assert.deepEqual(statusTokenUtilitiesIn("a.tsx", `  className="bg-success"`), [`a.tsx:1: className="bg-success"`]);
  assert.deepEqual(statusTokenUtilitiesIn("b.tsx", `  className="text-warning-foreground"`), [
    `b.tsx:1: className="text-warning-foreground"`,
  ]);
  assert.deepEqual(statusTokenUtilitiesIn("c.tsx", `  className="border-success"`), [
    `c.tsx:1: className="border-success"`,
  ]);
  assert.deepEqual(statusTokenUtilitiesIn("d.tsx", `  className="ring-warning"`), [
    `d.tsx:1: className="ring-warning"`,
  ]);
  assert.deepEqual(statusTokenUtilitiesIn("e.tsx", `  className="bg-emerald-500 text-emerald-700"`), []);
  assert.deepEqual(statusTokenUtilitiesIn("f.tsx", `  className="bg-destructive"`), []);
  assert.deepEqual(statusTokenUtilitiesIn("g.tsx", `  // bg-success no longer exists`), []);
});

test("no package source reaches for the retired success/warning token utility", () => {
  const tracked = packageSources({ includeSnapshots: true });
  assert.ok(tracked.length > 0, "the scan found no package sources, so it proves nothing");

  const offenders = tracked.flatMap((file) =>
    statusTokenUtilitiesIn(file, readFileSync(path.join(REPO, file), "utf8")),
  );
  assert.deepEqual(
    offenders,
    [],
    `a source reaches for the retired success/warning token utility:\n${offenders.join("\n")}`,
  );
});

/**
 * The public surface `index.ts` promises: every canonical primitive
 * re-exported, the retired pattern-layer `Combobox` gone now that it is a
 * primitive, and no `*Variants` beyond the three shadcn's own `cva` calls
 * produce.
 */
const INDEX_PATH = "src/index.ts";
const PUBLIC_PRIMITIVES = [
  "badge",
  "button",
  "alert",
  "field",
  "dialog",
  "sheet",
  "combobox",
  "input-group",
  "select",
  "dropdown-menu",
  "tooltip",
  "progress",
  "skeleton",
  "sonner",
  "table",
  "tabs",
  "card",
  "input",
  "textarea",
  "label",
];

test("index.ts exports every canonical primitive, drops the retired pattern Combobox, and adds no *Variants beyond shadcn's own three", () => {
  const source = read(INDEX_PATH);

  for (const name of PUBLIC_PRIMITIVES) {
    const exported = new RegExp(String.raw`export\s*\{[^;]*\}\s*from\s*"\./primitives/${name}\.js"`).test(source);
    assert.ok(exported, `${INDEX_PATH} does not export from ./primitives/${name}.js`);
  }

  assert.ok(
    !source.includes('from "./patterns/Combobox.js"'),
    `${INDEX_PATH} must not export the retired ./patterns/Combobox.js — Combobox is a primitive now`,
  );

  const variantsExports = [...new Set([...source.matchAll(/\b[a-zA-Z]*Variants\b/g)].map((m) => m[0]))].sort();
  assert.deepEqual(
    variantsExports,
    ["badgeVariants", "buttonVariants", "tabsListVariants"],
    `${INDEX_PATH} exports a *Variants beyond shadcn's own three:\n${variantsExports.join(", ")}`,
  );
});

test("menuSurfaceGapsIn flags a DropdownMenuContent missing menuSurface, and stays silent when it carries it", () => {
  assert.deepEqual(
    menuSurfaceGapsIn("a.tsx", `<DropdownMenuContent align="end">x</DropdownMenuContent>`),
    [`a.tsx:1: <DropdownMenuContent align="end">`],
  );
  assert.deepEqual(
    menuSurfaceGapsIn(
      "b.tsx",
      `<DropdownMenuContent align="end" className={menuSurface}>x</DropdownMenuContent>`,
    ),
    [],
  );
  assert.deepEqual(
    menuSurfaceGapsIn(
      "c.tsx",
      `<DropdownMenuContent className={cn(menuSurface, "w-64")}>x</DropdownMenuContent>`,
    ),
    [],
  );
});

test("every DropdownMenuContent call site outside the shadcn snapshot carries menuSurface", () => {
  const tracked = packageSources();
  assert.ok(tracked.length > 0, "the scan found no package sources, so it proves nothing");

  const offenders = tracked.flatMap((file) =>
    menuSurfaceGapsIn(file, readFileSync(path.join(REPO, file), "utf8")),
  );
  assert.deepEqual(
    offenders,
    [],
    `a DropdownMenuContent call site is missing lib/menu.ts's menuSurface:\n${offenders.join("\n")}`,
  );
});
