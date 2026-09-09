import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/", "examples/catalog/dist/"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // The Rules of Hooks everywhere a component can be written: the package,
    // its tests, and the catalog.
    files: ["src/**/*.{ts,tsx}", "tests/**/*.{ts,tsx}", "examples/**/*.{ts,tsx}"],
    plugins: { "react-hooks": reactHooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  },
);
