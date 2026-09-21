/**
 * The design tokens, as TypeScript — a compatibility mirror, not a source.
 *
 * `styles.css` is authoritative: Tailwind reads its `:root`, `.dark` and
 * `@theme` blocks and every utility comes out of them. This module exists for
 * the runtime caller that cannot read CSS — a `<canvas>` or an `<svg>` that
 * needs a colour as a string, or a styleguide printing a value beside a swatch.
 * Prefer `var(--foreground)` or
 * `getComputedStyle(element).getPropertyValue("--foreground")` where the DOM
 * is available; reach for these maps only when it is not.
 *
 * `tests/theme/tokens.test.ts` parses the stylesheet and asserts the two agree
 * declaration for declaration, so the mirror cannot drift silently.
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
  success: "oklch(0.508 0.118 165.612)",
  warning: "oklch(0.555 0.163 48.998)",
  info: "oklch(0.5 0.134 242.749)",
  destructive: "oklch(0.577 0.245 27.325)",
  border: "oklch(0.922 0 0)",
  input: "oklch(0.922 0 0)",
  ring: "oklch(0.708 0 0)",
  overlay: "oklch(0 0 0 / 10%)",
  sidebar: "oklch(0.985 0 0)",
  "sidebar-foreground": "oklch(0.145 0 0)",
  "sidebar-primary": "oklch(0.205 0 0)",
  "sidebar-primary-foreground": "oklch(0.985 0 0)",
  "sidebar-accent": "oklch(0.97 0 0)",
  "sidebar-accent-foreground": "oklch(0.205 0 0)",
  "sidebar-border": "oklch(0.922 0 0)",
  "sidebar-ring": "oklch(0.708 0 0)",

  // Robomous orange (#F5580B). Identity only; a CSS variable, never a utility.
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
  success: "oklch(0.765 0.177 163.223)",
  warning: "oklch(0.828 0.189 84.429)",
  info: "oklch(0.746 0.16 232.661)",
  destructive: "oklch(0.704 0.191 22.216)",
  border: "oklch(1 0 0 / 10%)",
  input: "oklch(1 0 0 / 15%)",
  ring: "oklch(0.556 0 0)",
  overlay: "oklch(0 0 0 / 10%)",
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
