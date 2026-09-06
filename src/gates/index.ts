/**
 * @robomous/ui-core/gates — the pure helpers and token facts that keep the
 * design system honest, published so every consumer repo can run the same
 * gates over its own sources with its own extensions registry.
 *
 * Eight exports: four scanners over one file's text, three readers for a
 * stylesheet's blocks and declarations, and the token names read off the
 * stylesheet that ships. DESIGN.md names the rule each one holds.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PKG = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

const COMMENT = /^\s*(?:\/\/|\/\*|\*|#)/;

// ---- status palette discipline ----

/**
 * The status palette's one Tailwind family: emerald/amber/sky, across every
 * prefix that can carry a colour. `Badge` and `statusTone.ts` are its one
 * home — see `statusTone.ts`'s own docstring — so a third place naming the
 * family is a fork of the palette, not a use of it.
 */
const STATUS_PALETTE = /\b(?:bg|text|border|ring|fill|stroke|from|to|via|outline|decoration|shadow)-(?:emerald|amber|sky)-\d/;

/** Every `file:line` in `text` painting with the status palette, outside a comment. */
export function statusPaletteIn(file: string, text: string): string[] {
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
export function competingStatusPaletteIn(file: string, text: string): string[] {
  return text
    .split("\n")
    .map((line, index) => ({ line, at: index + 1 }))
    .filter(({ line }) => !COMMENT.test(line) && COMPETING_PALETTE.test(line))
    .map(({ line, at }) => `${file}:${at}: ${line.trim()}`);
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
export function colouredClassesIn(file: string, text: string): string[] {
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
export function brandUsagesIn(
  file: string,
  text: string,
): { file: string; at: number; text: string }[] {
  return text
    .split("\n")
    .map((line, index) => ({ line, at: index + 1 }))
    .filter(({ line }) => !COMMENT.test(line) && BRAND_UTILITY.test(line))
    .map(({ line, at }) => ({ file, at, text: line.trim() }));
}

// ---- stylesheet parsing (from src/theme/tokens.test.ts, translated TS→JS) ----

/** Whitespace is presentation; a value that wraps is the same value — used internally by `rawDeclarations`. */
function normalize(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

/**
 * The `{ … }` body belonging to the block whose header (e.g. `:root {` or
 * `.dark {`) appears first in the file, matched by brace depth rather than by
 * the next `\n}` so a nested `calc(...)` or `color-mix(...)` cannot fool it.
 */
export function blockBody(css: string, header: string): string {
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
export function rawDeclarations(block: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const match of block.matchAll(/(--[\w-]+):\s*([^;]+);/g)) {
    map.set(match[1], normalize(match[2]));
  }
  return map;
}

/** The same, keyed WITHOUT the leading `--` — the shape `LIGHT_THEME` uses. */
export function declarations(block: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const [name, value] of rawDeclarations(block)) {
    map.set(name.slice(2), value);
  }
  return map;
}

// ---- foundation facts ----

/**
 * The foundation token names, read off the shipped stylesheet's `:root` so
 * they can never drift from what actually runs. `radius` is a geometry
 * setting, not a colour token, and is excluded — it matches LIGHT_THEME's keys.
 */
export function foundationTokenNames(): string[] {
  const css = readFileSync(path.join(PKG, "src/theme/styles.css"), "utf8");
  return [...declarations(blockBody(css, ":root {")).keys()].filter((n) => n !== "radius");
}
