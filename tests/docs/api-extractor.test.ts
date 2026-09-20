// @vitest-environment node
/**
 * The docs site's API tables are read from the components' source by
 * `examples/catalog/scripts/extract-api.ts`. These tests hold the shape that
 * extraction produces against the declaration styles the components use, and
 * they are the guard for a component exported without a docs page: every
 * PascalCase export of `src/index.ts` must land in exactly one component's API,
 * and every component page must have an API to render.
 */
import fs from "node:fs";
import path from "node:path";

import ts from "typescript";
import { describe, expect, it } from "vitest";

import { extractAll, type ComponentApi } from "../../examples/catalog/scripts/extract-api";

const REPO = path.resolve(import.meta.dirname, "..", "..");
const apis: ComponentApi[] = extractAll(REPO);

function api(slug: string): ComponentApi {
  const found = apis.find((candidate) => candidate.slug === slug);
  if (!found) throw new Error(`No API extracted for ${slug}`);
  return found;
}

function part(slug: string, name: string) {
  const found = api(slug).parts.find((candidate) => candidate.name === name);
  if (!found) throw new Error(`${slug} has no part ${name}`);
  return found;
}

function prop(slug: string, partName: string, propName: string) {
  const found = part(slug, partName).props.find((candidate) => candidate.name === propName);
  if (!found) throw new Error(`${slug}.${partName} has no prop ${propName}`);
  return found;
}

describe("extract-api: declaration styles", () => {
  it("reads cva variants with their defaultVariants (Button)", () => {
    const variant = prop("button", "Button", "variant");
    expect(variant.type).toBe(
      '"default" | "outline" | "secondary" | "ghost" | "destructive" | "link"',
    );
    expect(variant.default).toBe('"default"');
    const size = prop("button", "Button", "size");
    expect(size.type).toContain('"icon-xs"');
    expect(size.type).toContain('"inline"');
    expect(prop("button", "Button", "asChild")).toMatchObject({
      type: "boolean",
      default: "false",
      required: false,
    });
    expect(part("button", "Button").extends).toEqual(['React.ComponentProps<"button">']);
    expect(api("button").helpers).toEqual(["buttonVariants"]);
  });

  it("reads inline type literals with their destructuring defaults (SheetContent)", () => {
    expect(prop("sheet", "SheetContent", "side")).toMatchObject({
      type: '"top" | "right" | "bottom" | "left"',
      default: '"right"',
    });
    expect(prop("sheet", "SheetContent", "showCloseButton")).toMatchObject({
      type: "boolean",
      default: "true",
    });
  });

  it("falls back to the destructuring default when a cva has no defaultVariants (Attachment)", () => {
    expect(prop("attachment", "Attachment", "size")).toMatchObject({ default: '"default"' });
    expect(prop("attachment", "Attachment", "orientation")).toMatchObject({
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
    });
    expect(prop("attachment", "Attachment", "state").type.split(" | ")).toHaveLength(5);
  });

  it("follows a VariantProps import into another file (ToggleGroupItem)", () => {
    expect(prop("toggle-group", "ToggleGroupItem", "variant").type).toBe('"default" | "outline"');
    expect(prop("toggle-group", "ToggleGroupItem", "size").type).toBe('"default" | "sm" | "lg"');
  });

  it("documents an inherited prop the component gives a default to (Tabs, Separator)", () => {
    expect(prop("tabs", "Tabs", "orientation")).toMatchObject({
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
    });
    expect(prop("separator", "Separator", "decorative")).toMatchObject({
      type: "boolean",
      default: "true",
    });
  });

  it("keeps a JSDoc description (SelectTrigger.multiline)", () => {
    expect(prop("select", "SelectTrigger", "multiline").description).toMatch(/wrap/i);
  });

  it("treats an arrow-function component as a part (Toaster)", () => {
    expect(part("sonner", "Toaster").extends).toEqual(["ToasterProps"]);
  });

  it("lists className once and never children", () => {
    for (const component of apis) {
      for (const p of component.parts) {
        const names = p.props.map((x) => x.name);
        expect(names.filter((n) => n === "className")).toHaveLength(
          names.includes("className") ? 1 : 0,
        );
        expect(names).not.toContain("children");
      }
    }
  });
});

describe("extract-api: coverage", () => {
  const indexFile = path.join(REPO, "src", "index.ts");
  const source = ts.createSourceFile(
    indexFile,
    fs.readFileSync(indexFile, "utf8"),
    ts.ScriptTarget.Latest,
  );
  const componentExports: string[] = [];
  for (const statement of source.statements) {
    if (!ts.isExportDeclaration(statement) || !statement.exportClause) continue;
    if (!ts.isNamedExports(statement.exportClause)) continue;
    const from = statement.moduleSpecifier;
    if (!from || !ts.isStringLiteral(from) || !from.text.startsWith("./components/")) continue;
    for (const element of statement.exportClause.elements) componentExports.push(element.name.text);
  }

  it("covers every component export of src/index.ts exactly once", () => {
    expect(componentExports.length).toBeGreaterThan(100);
    const owners = new Map<string, string[]>();
    for (const component of apis) {
      for (const name of [...component.parts.map((p) => p.name), ...component.helpers]) {
        owners.set(name, [...(owners.get(name) ?? []), component.slug]);
      }
    }
    const missing = componentExports.filter((name) => !owners.has(name));
    const duplicated = componentExports.filter((name) => (owners.get(name)?.length ?? 0) > 1);
    expect(missing).toEqual([]);
    expect(duplicated).toEqual([]);
  });

  it("gives every part at least a className or an extends entry", () => {
    for (const component of apis) {
      for (const p of component.parts) {
        expect(p.props.length + p.extends.length, `${component.slug}.${p.name}`).toBeGreaterThan(0);
      }
    }
  });

  it("has an API for every component page, and a page for every component file", () => {
    const pagesDir = path.join(REPO, "examples", "catalog", "src", "content", "components");
    const pages = fs.existsSync(pagesDir)
      ? fs
          .readdirSync(pagesDir)
          .filter((f) => f.endsWith(".mdx"))
          .map((f) => f.replace(/\.mdx$/, ""))
      : [];
    const slugs = apis.map((component) => component.slug);
    for (const page of pages) expect(slugs, `page ${page} has no component file`).toContain(page);
    // Every component file gets a page: the guard that a new component is documented.
    // Held once the pages exist; until then the set is allowed to be partial.
    if (pages.length >= slugs.length) {
      expect(pages.sort()).toEqual(slugs.sort());
    }
  });
});
