/**
 * The design tokens, as TypeScript.
 *
 * `styles.css` is the one that *runs* — Tailwind reads its `:root`, `.dark`
 * and `@theme inline` blocks and every utility in the package comes out of
 * them. This module exists for the two kinds of caller that cannot read CSS:
 * a `<canvas>`/`<svg>` that needs a colour as a string, and `tokens.test.ts`,
 * which parses the stylesheet and asserts the two agree, declaration for
 * declaration.
 *
 * `LIGHT_THEME`/`DARK_THEME` carry the semantic vocabulary on a neutral base
 * colour and chart palette, plus one name of this package's own: `brand`,
 * Robomous orange, identity only. A consumer's own vocabulary lives in the
 * consumer's stylesheet and token module, never here — DESIGN.md,
 * *Per-consumer extensions*.
 */

export const LIGHT_THEME: Readonly<Record<string, string>> = Object.freeze({
  background: "oklch(1 0 0)",
  foreground: "oklch(0.2 0 0)",
  card: "oklch(1 0 0)",
  "card-foreground": "oklch(0.145 0 0)",
  popover: "oklch(1 0 0)",
  "popover-foreground": "oklch(0.145 0 0)",
  primary: "oklch(0.2 0 0)",
  "primary-foreground": "oklch(0.985 0 0)",
  secondary: "oklch(0.97 0 0)",
  "secondary-foreground": "oklch(0.269 0 0)",
  muted: "oklch(0.97 0 0)",
  "muted-foreground": "oklch(0.556 0 0)",
  accent: "oklch(0.97 0 0)",
  "accent-foreground": "oklch(0.205 0 0)",
  destructive: "oklch(0.577 0.245 27.325)",
  border: "oklch(0.922 0 0)",
  input: "oklch(0.922 0 0)",
  ring: "oklch(0.708 0 0)",
  "chart-1": "oklch(0.87 0 0)",
  "chart-2": "oklch(0.556 0 0)",
  "chart-3": "oklch(0.439 0 0)",
  "chart-4": "oklch(0.371 0 0)",
  "chart-5": "oklch(0.269 0 0)",
  sidebar: "oklch(0.985 0 0)",
  "sidebar-foreground": "oklch(0.145 0 0)",
  "sidebar-primary": "oklch(0.205 0 0)",
  "sidebar-primary-foreground": "oklch(0.985 0 0)",
  "sidebar-accent": "oklch(0.97 0 0)",
  "sidebar-accent-foreground": "oklch(0.205 0 0)",
  "sidebar-border": "oklch(0.922 0 0)",
  "sidebar-ring": "oklch(0.708 0 0)",

  // Robomous orange (#F5580B). Identity only — the wordmark and its styleguide
  // swatch — never a functional-UI colour.
  brand: "oklch(0.663 0.205 39.9)",
});

export const DARK_THEME: Readonly<Record<string, string>> = Object.freeze({
  background: "oklch(0.145 0 0)",
  foreground: "oklch(0.985 0 0)",
  card: "oklch(0.205 0 0)",
  "card-foreground": "oklch(0.985 0 0)",
  popover: "oklch(0.205 0 0)",
  "popover-foreground": "oklch(0.985 0 0)",
  primary: "oklch(0.922 0 0)",
  "primary-foreground": "oklch(0.205 0 0)",
  secondary: "oklch(0.269 0 0)",
  "secondary-foreground": "oklch(0.985 0 0)",
  muted: "oklch(0.269 0 0)",
  "muted-foreground": "oklch(0.708 0 0)",
  accent: "oklch(0.269 0 0)",
  "accent-foreground": "oklch(0.985 0 0)",
  destructive: "oklch(0.704 0.191 22.216)",
  border: "oklch(1 0 0 / 10%)",
  input: "oklch(1 0 0 / 15%)",
  ring: "oklch(0.556 0 0)",
  "chart-1": "oklch(0.87 0 0)",
  "chart-2": "oklch(0.556 0 0)",
  "chart-3": "oklch(0.439 0 0)",
  "chart-4": "oklch(0.371 0 0)",
  "chart-5": "oklch(0.269 0 0)",
  sidebar: "oklch(0.205 0 0)",
  "sidebar-foreground": "oklch(0.985 0 0)",
  "sidebar-primary": "oklch(0.488 0.243 264.376)",
  "sidebar-primary-foreground": "oklch(0.985 0 0)",
  "sidebar-accent": "oklch(0.269 0 0)",
  "sidebar-accent-foreground": "oklch(0.985 0 0)",
  "sidebar-border": "oklch(1 0 0 / 10%)",
  "sidebar-ring": "oklch(0.556 0 0)",

  brand: "oklch(0.663 0.205 39.9)",
});

/** The two provenance facts a colour string alone cannot carry. */
export const THEME = {
  radius: "0.625rem",
  fontSans: "'Geist Variable', sans-serif",
  fontHeading: "var(--font-sans)",
} as const;

/** `cssVar("popover")` → `"var(--popover)"` — for a runtime caller that needs a string. */
export function cssVar(name: string): string {
  return `var(--${name})`;
}
