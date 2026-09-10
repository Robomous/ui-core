// @vitest-environment node
/**
 * The shadcn layer is vendored, and this is what keeps the copy honest.
 *
 * `src/theme/styles.css` imports `./shadcn.css`, a byte-for-byte copy of
 * `shadcn/dist/tailwind.css`: the `data-*` variants the registry's components
 * qualify their state styles on, plus `no-scrollbar`, `scroll-fade-*` and
 * `shimmer-*`. It is a copy rather than an `@import "shadcn/tailwind.css"`
 * because the stylesheet ships as source, so a package named in it becomes a
 * runtime dependency of every consumer — and `shadcn` is the CLI, thirty-odd
 * dependencies deep. The price of copying is drift, and drift is what this file
 * refuses: the copy has to match the installed package, has to be committed
 * (`files: ["src"]` publishes the working tree, so an untracked sibling packs
 * fine here and is missing from the clone CI publishes from), and the package
 * that provides it has to stay a development dependency.
 */

import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const VENDORED = path.join(REPO, "src", "theme", "shadcn.css");
const UPSTREAM = path.join(REPO, "node_modules", "shadcn", "dist", "tailwind.css");

/** Line endings are the checkout's business, not the file's. */
const text = (file: string) => readFileSync(file, "utf8").replaceAll("\r\n", "\n");

describe("src/theme/shadcn.css", () => {
  it("is the installed shadcn's tailwind.css, byte for byte", () => {
    expect(
      text(VENDORED),
      "shadcn changed its stylesheet: copy node_modules/shadcn/dist/tailwind.css over " +
        "src/theme/shadcn.css and review the diff before committing",
    ).toBe(text(UPSTREAM));
  });

  it("is imported by the stylesheet, after Tailwind and before anything of ours", () => {
    const styles = text(path.join(REPO, "src", "theme", "styles.css"));
    const imports = [...styles.matchAll(/^@import\s+"([^"]+)";/gm)].map((m) => m[1]);
    expect(imports.indexOf("./shadcn.css")).toBeGreaterThan(imports.indexOf("tailwindcss"));
    expect(styles.indexOf('@import "./shadcn.css"')).toBeLessThan(styles.indexOf("@utility"));
  });

  it("is tracked by git, so the published package carries it", () => {
    const tracked = spawnSync("git", ["ls-files", "--error-unmatch", VENDORED], {
      cwd: REPO,
      encoding: "utf8",
    });
    expect(tracked.status, "src/theme/shadcn.css exists but is not committed").toBe(0);
  });

  it("comes from a development dependency, never a runtime one", () => {
    const manifest = JSON.parse(readFileSync(path.join(REPO, "package.json"), "utf8")) as {
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
    };
    expect(manifest.devDependencies).toHaveProperty("shadcn");
    expect(manifest.dependencies).not.toHaveProperty("shadcn");
  });
});
