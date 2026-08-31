/**
 * @robomous/ui-core/gates — the pure helpers and foundation facts that keep
 * the design system honest, published so every consumer repo can run the
 * same gates over its own sources with its own extensions registry.
 * Lifted from VisionSet's original repo-root gate tests.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PKG = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const COMMENT = /^\s*(?:\/\/|\/\*|\*|#)/;

// ---- canonical (from tests/scripts/shadcn_canonical.test.mjs) ----

const lines = (text) => text.split(/\r?\n/).map((l) => l.trimEnd());

// Every snapshot line must appear in the primitive, in order. Added lines are
// the only permitted difference — that is the whole of the "do not modify
// shadcn's code" rule, in a form a machine can check.
export function additiveOnly(snapshot, actual) {
  const want = lines(snapshot);
  const have = lines(actual);
  let cursor = 0;
  for (const line of want) {
    const at = have.indexOf(line, cursor);
    if (at === -1) return { ok: false, missing: line };
    cursor = at + 1;
  }
  return { ok: true };
}

// A primitive may replace a framework-specific hook (shadcn's Next.js
// integrations) with a thin adapter that reads the one theme source
// instead — never a shortcut for divergence in general. `FRAMEWORK_ADAPTERS`
// is the explicit allow-list; the marker comment `SHADCN FRAMEWORK ADAPTER`
// is how a primitive claims the exemption, and it must be on the list to
// claim it. `ADAPTER_REMOVED_LINES` are exactly the snapshot lines the
// adapter is permitted to drop — every other snapshot line must still appear,
// in order, same as any other primitive.
export const FRAMEWORK_ADAPTERS = ["sonner.tsx"];
export const ADAPTER_REMOVED_LINES = ['import { useTheme } from "next-themes"', '  const { theme = "system" } = useTheme()'];

export function withoutLines(text, removed) {
  const removedTrimmed = new Set(removed.map((l) => l.trimEnd()));
  return lines(text)
    .filter((line) => !removedTrimmed.has(line))
    .join("\n");
}

// Decides which comparison a primitive gets. Returns { ok: false, reason }
// when the marker is present on a file that isn't allow-listed; otherwise
// { ok: true, isAdapter } says whether the adapter-adjusted snapshot applies.
export function checkAdapter(file, actualText) {
  if (!actualText.includes("SHADCN FRAMEWORK ADAPTER")) return { ok: true, isAdapter: false };
  if (!FRAMEWORK_ADAPTERS.includes(file)) {
    return { ok: false, reason: `${file} carries the SHADCN FRAMEWORK ADAPTER marker but is not in FRAMEWORK_ADAPTERS` };
  }
  return { ok: true, isAdapter: true };
}

// ---- rosters and vocabulary (from tests/scripts/shadcn_extensions.test.mjs) ----

/** The variant keys of the first `variant: { … }` block in a cva source. */
export function variantKeys(source, block = "variant") {
  const start = source.indexOf(`${block}: {`);
  assert.notEqual(start, -1, `no "${block}" block`);
  let depth = 0, i = start + block.length + 3;
  const begin = i;
  for (; i < source.length; i++) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}") { if (depth === 0) break; depth--; }
  }
  const body = source.slice(begin, i);
  return [...body.matchAll(/(?:^|,)\s*"?([a-z][a-z0-9-]*)"?:\s/g)].map((m) => m[1]);
}

/** The class string of one variant line in a cva source. */
export function variantClasses(source, key) {
  const m = source.match(new RegExp(String.raw`^\s*"?${key}"?:\s*\n?\s*"([^"]*)"`, "m"));
  assert.ok(m, `no variant ${key}`);
  return m[1];
}

export const OFFICIAL_BADGE = ["default", "secondary", "destructive", "outline", "ghost", "link"];
export const FOUNDATION_BADGE = ["success", "warning", "info", "quiet"];
export const BUTTON_VARIANTS = ["default", "outline", "secondary", "ghost", "destructive", "link"];
export const BUTTON_SIZES = ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"];

/**
 * v1's vocabulary the extension contract retired: prop names and shapes no
 * shadcn primitive carries, and the PascalCase import paths and framework
 * package v1 read them from.
 *
 * Every forbidden token is assembled from fragments — the trick
 * `RETIRED_DECLARATIONS` below uses too — so none of them sits contiguously
 * anywhere in this file's own source.
 */
const NEXT_THEMES = ["next", "themes"].join("-");
const FIELD_HINT = ["Field", "Hint"].join("");
const TABLE_EMPTY = ["Table", "Empty"].join("");
const LEGACY_PRIMITIVES = [
  "Badge",
  "Button",
  "Card",
  "Combobox",
  "Dialog",
  "Feedback",
  "Input",
  "Menu",
  "Select",
  "Table",
  "Tabs",
];

/**
 * `Badge`'s `quiet` variant is the shape for a soft, borderless status chip —
 * an `outline` Badge hand-rounded with a `rounded-*` utility on `className`
 * is that same shape built by hand, so it is forbidden wherever both
 * attributes land on the one tag (in either order).
 */
const BADGE_OUTLINE_ROUNDED = /(?=[\s\S]*\bvariant="outline")(?=[\s\S]*\bclassName="[^"]*\brounded-)/;

const TAG_ATTRIBUTE_RULES = [
  { tag: "Button", attribute: /variant="(?:primary|success)"|size="(?:md)"/ },
  { tag: "Badge", attribute: /variant="(?:neutral|accent)"/ },
  { tag: "Badge", attribute: BADGE_OUTLINE_ROUNDED },
  { tag: "Progress", attribute: /\bvariant=/ },
  { tag: "SelectItem", attribute: /\bmeta=/ },
  { tag: "Alert", attribute: /\btitle=/ },
];
const LEGACY_IMPORT = new RegExp(
  String.raw`from\s+["'][^"']*/primitives/(?:${LEGACY_PRIMITIVES.join("|")})(?:\.js)?["']`,
);
const NEXT_THEMES_IMPORT = new RegExp(String.raw`from\s+["']${NEXT_THEMES}["']`);
const BARE_LEGACY_NAME = new RegExp(String.raw`\b(?:${FIELD_HINT}|${TABLE_EMPTY})\b`);

/**
 * The same retired names, written the way a test reads them back off the DOM
 * rather than the way a component spells them. `TAG_ATTRIBUTE_RULES` walks JSX
 * opening tags only, so a spec asserting v1's vocabulary sails straight past
 * it — which is how `cycle.spec.ts` kept `"primary"` through the whole
 * realignment, with CI the only thing that ever caught it.
 *
 * Listed here are the values **no** primitive carries any more, so naming one
 * is wrong wherever it lands: `primary` belongs to no variant block at all,
 * `Badge` dropped `neutral` and `accent`, and `Button`'s `md` is the official
 * `default`. `secondary` and `success` are deliberately absent — both are
 * still real variants, so an assertion naming one asks a question about its
 * own call site that no vocabulary sweep can answer.
 */
const RETIRED_ATTRIBUTE_VALUES = { variant: ["primary", "neutral", "accent"], size: ["md"] };

/**
 * Three shapes per attribute, because a spec has three ways to say the one
 * thing: `toHaveAttribute("data-variant", "primary")`, a
 * `[data-variant="primary"]` selector, and `getAttribute("data-variant")` or
 * `dataset.variant` compared with `toBe`/`toEqual`. The first crosses newlines
 * on purpose — prettier puts the two arguments on their own lines once the
 * call runs long, and that wrapped form is exactly the one that got through.
 */
const RETIRED_ATTRIBUTE_ASSERTIONS = Object.entries(RETIRED_ATTRIBUTE_VALUES).flatMap(
  ([name, values]) => {
    const value = `(?:${values.join("|")})`;
    return [
      new RegExp(String.raw`"data-${name}"\s*,\s*"${value}"`, "g"),
      new RegExp(String.raw`\[data-${name}="${value}"\]`, "g"),
      new RegExp(
        String.raw`(?:getAttribute\("data-${name}"\)|dataset\.${name})[^\n]*?\.to(?:Be|Equal)\(\s*"${value}"`,
        "g",
      ),
    ];
  },
);

/** The 1-based line of `text` that character offset `index` falls on. */
function lineAt(text, index) {
  return text.slice(0, index).split("\n").length;
}

/**
 * The index just past a JSX opening tag's real closing `>`, starting the scan
 * at `start` (the tag's own `<`). A `[^>]*?` regex is fooled by any literal
 * `>` — an arrow function, a `count > 0` comparison, a `>` inside a quoted
 * string — so this instead walks the text tracking `{}` depth (a `>` only
 * ends the tag at depth zero) and skips over `"…"`/`'…'`/`` `…` `` bodies
 * wholesale, wherever they appear, so a `>` quoted inside one is never read
 * as the tag's own.
 */
function openTagEnd(text, start) {
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"' || ch === "'" || ch === "`") {
      const quote = ch;
      i++;
      while (i < text.length && text[i] !== quote) {
        if (text[i] === "\\") i++;
        i++;
      }
      continue;
    }
    if (ch === "{") depth++;
    else if (ch === "}") depth--;
    else if (ch === ">" && depth === 0) return i + 1;
  }
  return text.length;
}

/** Every `<Tag …>` opening tag in `text`, as `{ at, tag }` in source order. */
export function openTagsIn(text, tagName) {
  const starts = new RegExp(String.raw`<${tagName}\b`, "g");
  return [...text.matchAll(starts)].map((m) => ({
    at: m.index,
    tag: text.slice(m.index, openTagEnd(text, m.index)),
  }));
}

/** Every `file:line` in `text` reaching for a name the extension contract retired. */
export function legacyVocabularyIn(file, text) {
  const scrubbed = text
    .split("\n")
    .map((line) => (COMMENT.test(line) ? "" : line))
    .join("\n");
  const hits = [];

  for (const { tag, attribute } of TAG_ATTRIBUTE_RULES) {
    for (const { at, tag: tagText } of openTagsIn(scrubbed, tag)) {
      if (attribute.test(tagText)) hits.push({ at: lineAt(scrubbed, at), text: tagText.split("\n")[0].trim() });
    }
  }

  for (const matcher of RETIRED_ATTRIBUTE_ASSERTIONS) {
    for (const { 0: found, index } of scrubbed.matchAll(matcher)) {
      hits.push({ at: lineAt(scrubbed, index), text: found.replace(/\s+/g, " ").trim() });
    }
  }

  scrubbed.split("\n").forEach((line, index) => {
    if (BARE_LEGACY_NAME.test(line) || LEGACY_IMPORT.test(line) || NEXT_THEMES_IMPORT.test(line)) {
      hits.push({ at: index + 1, text: line.trim() });
    }
  });

  return hits
    .sort((a, b) => a.at - b.at)
    .map(({ at, text: t }) => `${file}:${at}: ${t}`);
}

/**
 * The status palette's one Tailwind family: emerald/amber/sky, across every
 * prefix that can carry a colour. `Badge` and `statusTone.ts` are its one
 * home — see `statusTone.ts`'s own docstring — so a third place naming the
 * family is a fork of the palette, not a use of it.
 */
const STATUS_PALETTE = /\b(?:bg|text|border|ring|fill|stroke|from|to|via|outline|decoration|shadow)-(?:emerald|amber|sky)-\d/;

/** Every `file:line` in `text` painting with the status palette, outside a comment. */
export function statusPaletteIn(file, text) {
  return text
    .split("\n")
    .map((line, index) => ({ line, at: index + 1 }))
    .filter(({ line }) => !COMMENT.test(line) && STATUS_PALETTE.test(line))
    .map(({ line, at }) => `${file}:${at}: ${line.trim()}`);
}

/**
 * A colour family that competes with the status palette for the same job —
 * "a warning", "a success" — and so could stand in for it undetected. Unlike
 * the palette itself these have no allowed home anywhere in a consumer.
 */
const COMPETING_PALETTE = /\b(?:bg|text|border)-(?:green|lime|teal|yellow|orange|blue|cyan|red)-\d/;

/** Every `file:line` in `text` reaching for a colour family that competes with the status palette. */
export function competingStatusPaletteIn(file, text) {
  return text
    .split("\n")
    .map((line, index) => ({ line, at: index + 1 }))
    .filter(({ line }) => !COMMENT.test(line) && COMPETING_PALETTE.test(line))
    .map(({ line, at }) => `${file}:${at}: ${line.trim()}`);
}

/**
 * `--success`/`--warning` and their `-foreground` companions are retired
 * declarations (`retiredDeclarationsIn` guards the stylesheet itself); this is
 * the other half — no consumer may reach for the *utility* either, on any of
 * the four prefixes that could carry one.
 */
const STATUS_TOKEN_UTILITY = /\b(?:bg|text|border|ring)-(?:success|warning)(?:-foreground)?\b/;

/** Every `file:line` in `text` reaching for the retired status token utility, outside a comment. */
export function statusTokenUtilitiesIn(file, text) {
  return text
    .split("\n")
    .map((line, index) => ({ line, at: index + 1 }))
    .filter(({ line }) => !COMMENT.test(line) && STATUS_TOKEN_UTILITY.test(line))
    .map(({ line, at }) => `${file}:${at}: ${line.trim()}`);
}

/**
 * Every `DropdownMenuContent` call site owns `lib/menu.ts`'s `menuSurface` —
 * the constant that carries the canonical surface classes plus the exit-
 * animation and sizing fixes documented there. A call site that drops it
 * silently reverts to the bare Radix surface.
 */

/** Every `file:line` in `text` opening a `DropdownMenuContent` without `menuSurface` on it. */
export function menuSurfaceGapsIn(file, text) {
  return openTagsIn(text, "DropdownMenuContent")
    .filter(({ tag }) => !tag.includes("menuSurface"))
    .map(({ at, tag }) => `${file}:${lineAt(text, at)}: ${tag.split("\n")[0].trim()}`);
}

// ---- colour discipline (from tests/scripts/design_tokens.test.mjs) ----

/**
 * A Tailwind arbitrary value whose content is a colour.
 *
 * Assembled from fragments so this file does not match itself. The `-` before
 * the bracket is what makes it a *utility* rather than an array index or a
 * TypeScript tuple type.
 */
const HEX = ["#", "[0-9a-fA-F]{3,8}"].join("");
const LITERAL = String.raw`(?:${HEX}|rgba?\(|hsla?\(|oklch\()`;
// A raw colour right inside the bracket…
const ARBITRARY_COLOUR = new RegExp(String.raw`-\[\s*(?:${LITERAL}|var\(\s*--)`);
// The one colour-mix the preset writes mixes tokens only:
// `color-mix(in_oklch,var(--secondary),var(--foreground)_5%)`. Any other
// argument shape — a literal, a named colour, a bare number — is a colour.
const TOKEN_MIX = String.raw`color-mix\(in_[a-z0-9-]+(?:,var\(--[a-z0-9-]+\)(?:_\d+(?:\.\d+)?%)?)+\)`;
const BRACKET_MIX = new RegExp(String.raw`-\[\s*color-mix\([^\]]*\]`);
const ALLOWED_MIX = new RegExp(String.raw`-\[\s*${TOKEN_MIX}\]`);

/** Every `file:line` in `text` that puts a colour inside a Tailwind class. */
export function colouredClassesIn(file, text) {
  return text
    .split("\n")
    .map((line, index) => ({ line, at: index + 1 }))
    .filter(
      ({ line }) =>
        !COMMENT.test(line) &&
        (ARBITRARY_COLOUR.test(line) || (BRACKET_MIX.test(line) && !ALLOWED_MIX.test(line))),
    )
    .map(({ line, at }) => `${file}:${at}: ${line.trim()}`);
}

/**
 * `DESIGN.md` "Where the brand is": coral is identity, not a functional-UI
 * colour — the wordmark and the styleguide swatch that shows it off, nothing
 * a person acts on. This is not a headcount: the gate does not exist to hold
 * a count of sites, it exists so brand can never migrate onto a control (a
 * button, a progress fill, anything with a function) instead of staying the
 * one place it is allowed to just be seen. A pure function over one file's
 * text, so the gate is provable with fabricated input, and `COMMENT` keeps
 * the styles.css line that *states* the rule from counting as a usage of it.
 */
const BRAND_UTILITY = /\b(?:bg|text|border|ring|fill|stroke)-brand\b/;

/** Every line in `text` that paints with the brand colour. */
export function brandUsagesIn(file, text) {
  return text
    .split("\n")
    .map((line, index) => ({ line, at: index + 1 }))
    .filter(({ line }) => !COMMENT.test(line) && BRAND_UTILITY.test(line))
    .map(({ line, at }) => ({ file, at, text: line.trim() }));
}

/**
 * The names the original audit retired outright — no shadcn analogue, no
 * extension, no idiom left to fall back to. `tokens.test.ts` already guards
 * this structurally, parsed against `styles.css`'s own `:root`/`.dark`
 * blocks; this is the same guard by a different method, on purpose — a
 * plain-text scan that keeps working even if that vitest suite is ever
 * refactored or its parser changes shape.
 *
 * Assembled from fragments — the trick `HEX` above already uses — so none of
 * these names is a contiguous string anywhere in this file's own source, and
 * a repo-wide sweep for one of them never mistakes this guard for a
 * lingering usage.
 */
const dash = (...parts) => parts.join("-");
const RETIRED_DECLARATIONS = [
  dash("--color", "primary", "hover"),
  dash("--color", "disabled"),
  dash("--color", "disabled", "foreground"),
  dash("--color", "success", "hover"),
  dash("--color", "destructive", "foreground"),
  dash("--color", "sidebar", "strong"),
  dash("--color", "sidebar", "muted"),
  dash("--text", "meta"),
  dash("--text", "body"),
  dash("--text", "section"),
  dash("--text", "page"),
  dash("--spacing", "sidebar", "mobile"),
  dash("--success"),
  dash("--success", "foreground"),
  dash("--warning"),
  dash("--warning", "foreground"),
  dash("--color", "success"),
  dash("--color", "success", "foreground"),
  dash("--color", "warning"),
  dash("--color", "warning", "foreground"),
];

/** Every retired name in `text` declared as a custom property, not merely mentioned. */
export function retiredDeclarationsIn(text) {
  return text
    .split("\n")
    .map((line, index) => ({ line, at: index + 1 }))
    .filter(({ line }) => !COMMENT.test(line))
    .flatMap(({ line, at }) =>
      RETIRED_DECLARATIONS.filter((name) => line.includes(`${name}:`)).map((name) => `${at}: ${name}`),
    );
}

// ---- stylesheet parsing (from src/tokens.test.ts, translated TS→JS) ----

/** Whitespace is presentation; a value that wraps is the same value. */
export function normalize(value) {
  return value.replace(/\s+/g, " ").trim();
}

/**
 * The `{ … }` body belonging to the block whose header (e.g. `:root {` or
 * `.dark {`) appears first in the file, matched by brace depth rather than by
 * the next `\n}` so a nested `calc(...)` or `color-mix(...)` cannot fool it.
 */
export function blockBody(css, header) {
  const headerAt = css.indexOf(header);
  if (headerAt === -1) throw new Error(`stylesheet has no ${JSON.stringify(header)} block`);
  const braceAt = css.indexOf("{", headerAt);
  let depth = 1;
  let i = braceAt + 1;
  while (depth > 0 && i < css.length) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}") depth--;
    i++;
  }
  return css.slice(braceAt + 1, i - 1);
}

/** Every `--name: value;` declaration in a block, keyed WITH the leading `--`. */
export function rawDeclarations(block) {
  const map = new Map();
  for (const match of block.matchAll(/(--[\w-]+):\s*([^;]+);/g)) {
    map.set(match[1], normalize(match[2]));
  }
  return map;
}

/** The same, keyed WITHOUT the leading `--` — the shape `LIGHT_THEME` uses. */
export function declarations(block) {
  const map = new Map();
  for (const [name, value] of rawDeclarations(block)) {
    map.set(name.slice(2), value);
  }
  return map;
}

// The shadcn standard vocabulary, exactly as the CLI scratch emitted it —
// not derived from `tokens.ts`, so a mistake in the mirror cannot also
// erase the thing it was supposed to mirror.
export const SEMANTIC_NAMES = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
];

// ---- foundation facts ----

/** Absolute path to the canonical shadcn snapshots shipped in this package. */
export function snapshotsDir() {
  return path.join(PKG, "shadcn");
}

/**
 * The foundation token names, read off the shipped stylesheet's `:root` so
 * they can never drift from what actually runs. `radius` is a geometry
 * setting, not a colour token, and is excluded — it matches LIGHT_THEME's keys.
 */
export function foundationTokenNames() {
  const css = readFileSync(path.join(PKG, "src/styles.css"), "utf8");
  return [...declarations(blockBody(css, ":root {")).keys()].filter((n) => n !== "radius");
}
