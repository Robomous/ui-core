import path from "node:path";

import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

/**
 * A Tailwind arbitrary value whose content is a colour: `bg-[#fff]`,
 * `text-[rgb(0 0 0)]`, `ring-[var(--x)]`. The colour namespace is closed in
 * `src/theme/styles.css`, so a named palette utility already produces nothing;
 * this is the one road left for a literal to enter a class string, and it is
 * held by the linter rather than by a scanner of our own. A consumer that wants
 * the same rule copies these two selectors.
 */
const COLOUR_IN_CLASS = String.raw`-\[\s*(?:#|rgba?\(|hsla?\(|oklch\(|var\(--)`;
const COLOUR_MESSAGE =
  "Colour belongs to the token contract: add a role to src/theme/styles.css and use its " +
  "utility (bg-primary, text-warning), never a literal inside a class.";

export default tseslint.config(
  // Whatever the repository already ignores, the linter ignores: build output and
  // local tooling are not ours to hold to these rules, and naming them twice is how
  // the two lists drift. `.gitignore` is the one list.
  includeIgnoreFile(path.resolve(import.meta.dirname, ".gitignore")),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Everywhere a component can be written: the package, its tests, the catalog.
    files: ["src/**/*.{ts,tsx}", "tests/**/*.{ts,tsx}", "examples/**/*.{ts,tsx}"],
    plugins: { "react-hooks": reactHooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "no-restricted-syntax": [
        "error",
        { selector: `Literal[value=/${COLOUR_IN_CLASS}/]`, message: COLOUR_MESSAGE },
        { selector: `TemplateElement[value.raw=/${COLOUR_IN_CLASS}/]`, message: COLOUR_MESSAGE },
      ],
    },
  },
);
