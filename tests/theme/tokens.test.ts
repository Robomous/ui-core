/**
 * @vitest-environment node
 *
 * The token contract. `styles.css` is the one home of the tokens, so this
 * suite parses it structurally and asserts that both themes declare every role
 * and nothing else, that the colour namespace is closed, and that the few
 * stylesheet-level rules the components depend on are still there.
 *
 * Parsed rather than imported: nothing here evaluates `@theme`, and the
 * packed-consumer test is where a real Tailwind compiles this file.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const STYLESHEET = readFileSync(
  fileURLToPath(new URL("../../src/theme/styles.css", import.meta.url)),
  "utf8",
);

/** Whitespace and quote style are presentation, not value. */
function normalize(value: string): string {
  return value.replace(/\s+/g, " ").replace(/"/g, "'").trim();
}

/** The `{ … }` body of the block whose header appears first, matched by brace depth. */
function blockBody(css: string, header: string): string {
  const headerAt = css.indexOf(header);
  expect(headerAt, `styles.css has no ${JSON.stringify(header)} block`).toBeGreaterThan(-1);
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
function rawDeclarations(block: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const match of block.matchAll(/(--[\w-]+):\s*([^;]+);/g)) {
    map.set(match[1], normalize(match[2]));
  }
  return map;
}

/** The same, keyed WITHOUT the leading `--`, which is how a role is named. */
function declarations(block: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const [name, value] of rawDeclarations(block)) {
    map.set(name.slice(2), value);
  }
  return map;
}

// The vocabulary, written out rather than parsed out of the stylesheet, so a
// role deleted there fails here instead of quietly shrinking the expectation.
const ROLE_NAMES = [
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
  "success",
  "warning",
  "info",
  "destructive",
  "border",
  "input",
  "ring",
  "overlay",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
];

// Declared as a variable in both themes, exposed as no utility.
const VARIABLE_ONLY = ["brand"];

describe(":root", () => {
  const root = declarations(blockBody(STYLESHEET, ":root {"));

  it("declares every role, the brand variable and --radius, and nothing else", () => {
    expect([...root.keys()].sort()).toEqual([...ROLE_NAMES, ...VARIABLE_ONLY, "radius"].sort());
  });

  it("gives every role a value, and pins --radius", () => {
    for (const [name, value] of root) {
      expect(value, `--${name} is declared empty`).not.toBe("");
    }
    expect(root.get("radius")).toBe("0.625rem");
  });
});

describe(".dark", () => {
  const dark = declarations(blockBody(STYLESHEET, ".dark {"));

  it("declares every role and the brand variable, and nothing else", () => {
    expect([...dark.keys()].sort()).toEqual([...ROLE_NAMES, ...VARIABLE_ONLY].sort());
  });

  /**
   * A role that repeats its light value is the bug this catches: the dark
   * theme is a counterpart, not a copy. `background` and `foreground` swap
   * ends of the scale, so those two are the cheapest thing to pin.
   */
  it("repoints the roles rather than restating them", () => {
    const light = declarations(blockBody(STYLESHEET, ":root {"));
    expect(dark.get("background")).not.toBe(light.get("background"));
    expect(dark.get("foreground")).not.toBe(light.get("foreground"));
  });
});

describe("@theme", () => {
  const inline = rawDeclarations(blockBody(STYLESHEET, "@theme inline {"));

  it("closes Tailwind's default palette before declaring its own", () => {
    const reset = STYLESHEET.indexOf("--color-*: initial;");
    expect(reset, "styles.css does not reset --color-*").toBeGreaterThan(-1);
    expect(reset).toBeLessThan(STYLESHEET.indexOf("@theme inline {"));
  });

  it("exposes --color-<role>: var(--<role>) for every role", () => {
    for (const name of ROLE_NAMES) {
      expect(inline.get(`--color-${name}`), `missing --color-${name}`).toBe(`var(--${name})`);
    }
  });

  it("exposes no utility for the brand or for anything outside the roles", () => {
    const colours = [...inline.keys()].filter((key) => key.startsWith("--color-"));
    expect(colours.sort()).toEqual(ROLE_NAMES.map((name) => `--color-${name}`).sort());
  });

  it("declares the two font variables", () => {
    expect(inline.get("--font-sans")).toBe("'Geist Variable', sans-serif");
    expect(inline.get("--font-heading")).toBe("var(--font-sans)");
  });

  it("derives every radius step from --radius", () => {
    expect(inline.get("--radius-sm")).toBe("calc(var(--radius) * 0.6)");
    expect(inline.get("--radius-md")).toBe("calc(var(--radius) * 0.8)");
    expect(inline.get("--radius-lg")).toBe("var(--radius)");
    expect(inline.get("--radius-xl")).toBe("calc(var(--radius) * 1.4)");
    expect(inline.get("--radius-2xl")).toBe("calc(var(--radius) * 1.8)");
    expect(inline.get("--radius-3xl")).toBe("calc(var(--radius) * 2.2)");
    expect(inline.get("--radius-4xl")).toBe("calc(var(--radius) * 2.6)");
  });
});

describe("base layer", () => {
  it("keys dark mode off the .dark class", () => {
    expect(STYLESHEET).toContain("@custom-variant dark (&:is(.dark *));");
  });

  it("names the border and outline colour on every element", () => {
    expect(/\*\s*\{\s*@apply border-border outline-ring\/50;\s*\}/.test(STYLESHEET)).toBe(true);
  });

  /**
   * Focus geometry belongs to the components. A stylesheet-level
   * `:focus-visible` rule would override every component's ring at once, which
   * is how thirteen rings were once lost together.
   */
  it("declares no focus geometry", () => {
    const rules = STYLESHEET.replace(/\/\*[\s\S]*?\*\//g, "");
    expect(rules).not.toContain(":focus-visible");
  });

  it("applies the heading font at the semantic-HTML level", () => {
    expect(/h1,\s*h2,\s*h3,\s*h4\s*\{\s*@apply font-heading;\s*\}/.test(STYLESHEET)).toBe(true);
  });
});
