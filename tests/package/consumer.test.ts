// @vitest-environment node
/**
 * The package as a consumer meets it.
 *
 * Everything else in this repository reads source files. This test builds the
 * package, packs it the way `npm publish` would, installs the tarball into a
 * throwaway consumer and asks the tools a consumer actually runs: does a real
 * Tailwind CSS 4 compile the stylesheet and emit the components' utilities; does
 * Node import the entry; does a bundler keep a Button-only import small. It is
 * the check that would have caught 0.2.0, whose `@source` pointed one directory
 * too shallow while every source-level check stayed green.
 *
 * Slow and network-bound (the consumer installs from the registry), so it runs
 * as its own vitest project: `pnpm test:package`.
 */

import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const manifest = JSON.parse(readFileSync(path.join(REPO, "package.json"), "utf8")) as {
  name: string;
  devDependencies: Record<string, string>;
};

/** Run a command, failing the test with its full output if it exits non-zero. */
function run(command: string, args: string[], cwd: string): string {
  // On Windows `pnpm` is a .cmd shim, which Node refuses to spawn without a shell.
  const shell = process.platform === "win32";
  const quoted = shell ? args.map((arg) => (/\s/.test(arg) ? `"${arg}"` : arg)) : args;
  const result = spawnSync(command, quoted, {
    cwd,
    encoding: "utf8",
    shell,
    env: { ...process.env, CI: "1", NO_COLOR: "1" },
    maxBuffer: 64 * 1024 * 1024,
  });
  expect(
    result.status,
    `${command} ${args.join(" ")} (in ${cwd}) exited ${result.status}\n${result.stdout}\n${result.stderr}`,
  ).toBe(0);
  return result.stdout;
}

/** Every file under `dir`, as paths relative to it with forward slashes. */
function filesUnder(dir: string): string[] {
  return readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) =>
      path.relative(dir, path.join(entry.parentPath, entry.name)).replaceAll("\\", "/"),
    );
}

const consumer = mkdtempSync(path.join(os.tmpdir(), "ui-core-consumer-"));
let css = "";
let installed = "";

beforeAll(() => {
  run("pnpm", ["build"], REPO);
  run("pnpm", ["pack", "--pack-destination", consumer], REPO);
  const tarball = readdirSync(consumer).find((name) => name.endsWith(".tgz"));
  expect(tarball, "pnpm pack produced no tarball").toBeTruthy();
  copyFileSync(path.join(consumer, tarball!), path.join(consumer, "ui-core.tgz"));

  const dev = manifest.devDependencies;
  writeFileSync(
    path.join(consumer, "package.json"),
    JSON.stringify(
      {
        name: "ui-core-consumer",
        private: true,
        type: "module",
        dependencies: {
          [manifest.name]: "file:./ui-core.tgz",
          react: dev.react,
          "react-dom": dev["react-dom"],
        },
        devDependencies: {
          tailwindcss: dev.tailwindcss,
          "@tailwindcss/cli": dev.tailwindcss,
          vite: "^8.0.0",
        },
      },
      null,
      2,
    ),
  );

  mkdirSync(path.join(consumer, "src"));
  // The consumer's stylesheet: import ours, scan its own sources. Nothing else.
  writeFileSync(
    path.join(consumer, "src", "app.css"),
    `@import "${manifest.name}/styles.css";\n@source "./";\n`,
  );
  // Its one screen. The wrapper names three utilities the design system does
  // not have — a physical palette colour twice and the brand — and the
  // compiled CSS must contain none of them.
  writeFileSync(
    path.join(consumer, "src", "App.tsx"),
    [
      `import { Badge, Button } from "${manifest.name}";`,
      "export function App() {",
      "  return (",
      '    <div className="bg-red-500 text-emerald-700 bg-brand p-4">',
      "      <Button>Go</Button>",
      '      <Badge variant="success">ok</Badge>',
      "    </div>",
      "  );",
      "}",
      "",
    ].join("\n"),
  );
  writeFileSync(
    path.join(consumer, "src", "entry.ts"),
    `export { Button } from "${manifest.name}";\n`,
  );
  writeFileSync(
    path.join(consumer, "render.mjs"),
    [
      'import { createElement } from "react";',
      'import { renderToStaticMarkup } from "react-dom/server";',
      `import { Badge, Button } from "${manifest.name}";`,
      'console.log(renderToStaticMarkup(createElement(Button, null, "Go")));',
      'console.log(renderToStaticMarkup(createElement(Badge, { variant: "success" }, "ok")));',
      "",
    ].join("\n"),
  );
  writeFileSync(
    path.join(consumer, "bundle.mjs"),
    [
      'import { build } from "vite";',
      "const result = await build({",
      "  root: process.cwd(),",
      "  configFile: false,",
      '  logLevel: "silent",',
      "  build: {",
      "    write: false,",
      "    minify: false,",
      '    lib: { entry: "src/entry.ts", formats: ["es"], fileName: "entry" },',
      "    rollupOptions: { external: [/^react(\\/|$)/, /^react-dom(\\/|$)/] },",
      "  },",
      "});",
      "const outputs = Array.isArray(result) ? result : [result];",
      "const ids = outputs.flatMap((o) => o.output.flatMap((c) => c.moduleIds ?? []));",
      "console.log(JSON.stringify(ids));",
      "",
    ].join("\n"),
  );

  run("pnpm", ["install", "--ignore-scripts"], consumer);
  run("pnpm", ["exec", "tailwindcss", "-i", "src/app.css", "-o", "dist/app.css"], consumer);
  css = readFileSync(path.join(consumer, "dist", "app.css"), "utf8");
  installed = realpathSync(path.join(consumer, "node_modules", ...manifest.name.split("/")));
});

afterAll(() => {
  try {
    rmSync(consumer, { recursive: true, force: true, maxRetries: 3 });
  } catch {
    // A Windows handle can outlive the process that held it; a leftover temp
    // directory is not a failure of the package.
  }
});

describe("the published files", () => {
  it("ship the entry, the stylesheet and the component sources, and nothing repository-only", () => {
    const files = filesUnder(installed);
    expect(files).toContain("dist/index.js");
    expect(files).toContain("dist/index.d.ts");
    expect(files).toContain("src/theme/styles.css");
    expect(files).toContain("src/components/button.tsx");
    const stray = files.filter((file) =>
      /\.test\.|^tests\/|\/gates\/|^docs\/|^examples\//.test(file),
    );
    expect(stray).toEqual([]);
  });

  it("mark only CSS as a side effect, so a JavaScript import tree-shakes", () => {
    const shipped = JSON.parse(readFileSync(path.join(installed, "package.json"), "utf8"));
    expect(shipped.sideEffects).toEqual(["**/*.css"]);
    expect(shipped.exports["./styles.css"]).toBe("./src/theme/styles.css");
  });
});

describe("a real Tailwind compile of the consumer's stylesheet", () => {
  it("emits the components' own utilities, which only @source can have found", () => {
    // Dropdown's floor, Table's caption, Textarea's sizing, Button's height:
    // none appear in the consumer's sources, so each one proves the components
    // were scanned.
    expect(css).toContain(".min-w-32");
    expect(css).toContain(".caption-bottom");
    expect(css).toContain(".field-sizing-content");
    expect(css).toContain(".h-8");
    expect(css).toContain("line-clamp-1");
    // The Radix and Base UI state variants, each in its library's own spelling.
    expect(css).toMatch(/\.data-\\\[state\\=open\\\]\\:animate-in/);
    expect(css).toMatch(/\.data-open\\:animate-in/);
    // And the consumer's own class still compiles.
    expect(css).toContain(".p-4");
  });

  it("carries the semantic roles, in light and dark, and resolves utilities through them", () => {
    // `@theme inline` writes the role straight into the utility rather than
    // emitting a --color-* variable, so what to look for is the role variable in
    // both theme blocks and a utility that reads it.
    const root = css.match(/:root\s*\{[^}]*\}/)?.[0] ?? "";
    const dark = css.match(/\.dark\s*\{[^}]*\}/)?.[0] ?? "";
    for (const role of ["success", "warning", "info", "overlay"]) {
      expect(root, `:root lacks --${role}`).toContain(`--${role}:`);
      expect(dark, `.dark lacks --${role}`).toContain(`--${role}:`);
    }
    expect(css).toMatch(/\.bg-success\\\/10\s*\{[^}]*var\(--success\)/);
    expect(css).toMatch(/\.text-success\s*\{[^}]*var\(--success\)/);
    expect(css).toMatch(/\.bg-overlay\s*\{[^}]*var\(--overlay\)/);
  });

  it("knows no physical palette and no brand utility", () => {
    expect(css).not.toContain(".bg-red-500");
    expect(css).not.toContain("--color-red-500");
    expect(css).not.toContain(".text-emerald-700");
    expect(css).not.toContain(".bg-brand");
    expect(css).not.toContain("--color-brand");
    // The variable itself is there for identity UI to read.
    expect(css).toContain("--brand:");
  });

  it("bundles the Geist face", () => {
    expect(css).toContain("Geist Variable");
  });
});

describe("the JavaScript entry", () => {
  it("imports under Node and renders a Button that cannot submit by accident", () => {
    const out = run("node", ["render.mjs"], consumer);
    expect(out).toContain('type="button"');
    expect(out).toContain('data-slot="button"');
    expect(out).toContain('data-variant="success"');
  });

  it("tree-shakes: a Button-only import pulls in neither sonner nor Base UI", () => {
    const ids = JSON.parse(
      run("node", ["bundle.mjs"], consumer).trim().split("\n").at(-1)!,
    ) as string[];
    expect(ids.length).toBeGreaterThan(0);
    const heavy = ids.filter((id) => /[\\/](sonner|@base-ui|lucide-react)[\\/]/.test(id));
    expect(heavy, `a Button-only bundle carried:\n${heavy.join("\n")}`).toEqual([]);
  });
});
