/**
 * The API tables of the docs, read from the components' source.
 *
 * For every `src/components/<slug>.tsx`, each exported PascalCase function is a
 * part with a table of the props it declares itself: the keys of a `cva`
 * variants object (with `defaultVariants` or the destructuring default), the
 * members of an inline `{ … }` type, and any inherited prop the component
 * gives a default to. Everything else it accepts is named in `extends`.
 *
 * Output: `src/generated/api/<slug>.json`, gitignored, written before `astro dev`
 * and by `docs:check`. `tests/docs/api-extractor.test.ts` holds the shape.
 *
 * Runs under Node's type stripping (`node scripts/extract-api.ts`), so only
 * erasable syntax is used here: no enums, no parameter properties.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import ts from "typescript";

export interface ApiProp {
  name: string;
  type: string;
  default: string;
  required: boolean;
  description: string;
}

export interface ApiPart {
  name: string;
  extends: string[];
  props: ApiProp[];
}

export interface ComponentApi {
  slug: string;
  source: string;
  parts: ApiPart[];
  helpers: string[];
}

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "..", "..", "..");
const OUT = path.join(HERE, "..", "src", "generated", "api");

/** Every component file's API, in file-name order. */
export function extractAll(repo: string = REPO): ComponentApi[] {
  const configPath = path.join(repo, "tsconfig.json");
  const parsed = ts.getParsedCommandLineOfConfigFile(
    configPath,
    {},
    {
      ...ts.sys,
      onUnRecoverableConfigFileDiagnostic(diagnostic) {
        throw new Error(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
      },
    },
  );
  if (!parsed) throw new Error(`Could not read ${configPath}`);
  const dir = path.join(repo, "src", "components");
  const files = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".tsx"))
    .sort()
    .map((file) => path.join(dir, file));
  const program = ts.createProgram(files, { ...parsed.options, noEmit: true });
  const checker = program.getTypeChecker();
  return files.map((file) => {
    const sourceFile = program.getSourceFile(file);
    if (!sourceFile) throw new Error(`Program lost ${file}`);
    return extractFile(sourceFile, checker);
  });
}

/** Writes one JSON per component plus an index, replacing what was there. */
export function writeAll(apis: ComponentApi[], out: string = OUT): void {
  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });
  for (const api of apis) {
    fs.writeFileSync(path.join(out, `${api.slug}.json`), JSON.stringify(api, null, 2) + "\n");
  }
  const index = {
    generatedAt: new Date().toISOString(),
    components: apis.map((api) => api.slug),
    exportsCovered: apis.flatMap((api) => [...api.parts.map((part) => part.name), ...api.helpers]),
  };
  fs.writeFileSync(path.join(out, "index.json"), JSON.stringify(index, null, 2) + "\n");
}

function extractFile(sourceFile: ts.SourceFile, checker: ts.TypeChecker): ComponentApi {
  const slug = path.basename(sourceFile.fileName, ".tsx");
  const parts: ApiPart[] = [];
  const helpers: string[] = [];
  for (const name of exportedNames(sourceFile)) {
    const fn = functionDeclaration(sourceFile, name);
    if (fn && /^[A-Z]/.test(name)) parts.push(extractPart(name, fn, sourceFile, checker));
    else helpers.push(name);
  }
  return { slug, source: `src/components/${slug}.tsx`, parts, helpers };
}

/** Names in `export { … }` lists and on `export function` / `export const`, in order. */
function exportedNames(sourceFile: ts.SourceFile): string[] {
  const names: string[] = [];
  for (const statement of sourceFile.statements) {
    if (ts.isExportDeclaration(statement) && statement.exportClause) {
      if (ts.isNamedExports(statement.exportClause)) {
        for (const element of statement.exportClause.elements) names.push(element.name.text);
      }
    } else if (hasExportModifier(statement)) {
      if (ts.isFunctionDeclaration(statement) && statement.name) names.push(statement.name.text);
      if (ts.isVariableStatement(statement)) {
        for (const declaration of statement.declarationList.declarations) {
          if (ts.isIdentifier(declaration.name)) names.push(declaration.name.text);
        }
      }
    }
  }
  return names;
}

function hasExportModifier(node: ts.Node): boolean {
  return (
    ts.canHaveModifiers(node) &&
    (ts.getModifiers(node) ?? []).some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
  );
}

type FunctionLike = ts.FunctionDeclaration | ts.ArrowFunction | ts.FunctionExpression;

/** The function a name is declared as, whether `function X` or `const X = (…) =>`. */
function functionDeclaration(sourceFile: ts.SourceFile, name: string): FunctionLike | undefined {
  for (const statement of sourceFile.statements) {
    if (ts.isFunctionDeclaration(statement) && statement.name?.text === name) return statement;
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name) || declaration.name.text !== name) continue;
        const init = declaration.initializer;
        if (init && (ts.isArrowFunction(init) || ts.isFunctionExpression(init))) return init;
      }
    }
  }
  return undefined;
}

function extractPart(
  name: string,
  fn: FunctionLike,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
): ApiPart {
  const param = fn.parameters[0];
  if (!param) return { name, extends: [], props: [] };

  const defaults = bindingDefaults(param, sourceFile);
  const props: ApiProp[] = [];
  const extended: string[] = [];
  const seen = new Set<string>(["children"]);
  const add = (prop: ApiProp) => {
    if (seen.has(prop.name)) return;
    seen.add(prop.name);
    props.push(prop);
  };

  for (const member of flattenType(param.type)) {
    if (ts.isTypeReferenceNode(member) && member.typeName.getText(sourceFile) === "VariantProps") {
      for (const prop of variantProps(member, defaults, sourceFile, checker)) add(prop);
    } else if (ts.isTypeLiteralNode(member)) {
      for (const signature of member.members) {
        if (!ts.isPropertySignature(signature) || !signature.type) continue;
        const propName = signature.name.getText(sourceFile);
        add({
          name: propName,
          type: text(signature.type, sourceFile),
          default: defaults.get(propName) ?? "",
          required: signature.questionToken === undefined && !defaults.has(propName),
          description: docComment(signature),
        });
      }
    } else {
      extended.push(text(member, sourceFile));
    }
  }

  // A default on a prop the component inherits documents it as well as a
  // declaration would: Tabs' `orientation`, Separator's `decorative`.
  const paramType = checker.getTypeAtLocation(param);
  for (const [propName, value] of defaults) {
    if (seen.has(propName) || propName === "className") continue;
    const symbol = paramType.getProperty(propName);
    if (!symbol) continue;
    const propType = checker.getNonNullableType(checker.getTypeOfSymbolAtLocation(symbol, param));
    add({
      name: propName,
      type: checker.typeToString(propType, param, ts.TypeFormatFlags.NoTruncation),
      default: value,
      required: false,
      description: docComment(symbol.valueDeclaration),
    });
  }

  if (!seen.has("className") && paramType.getProperty("className")) {
    add({ name: "className", type: "string", default: "", required: false, description: "" });
  }
  return { name, extends: extended, props };
}

/** `{ side = "right", open: openProp, …rest }` → side → `"right"`. */
function bindingDefaults(param: ts.ParameterDeclaration, sourceFile: ts.SourceFile) {
  const defaults = new Map<string, string>();
  if (!ts.isObjectBindingPattern(param.name)) return defaults;
  for (const element of param.name.elements) {
    if (element.dotDotDotToken || !element.initializer) continue;
    const key = element.propertyName ?? element.name;
    defaults.set(key.getText(sourceFile), text(element.initializer, sourceFile));
  }
  return defaults;
}

function flattenType(type: ts.TypeNode | undefined): ts.TypeNode[] {
  if (!type) return [];
  if (ts.isParenthesizedTypeNode(type)) return flattenType(type.type);
  if (ts.isIntersectionTypeNode(type)) return type.types.flatMap((t) => flattenType(t));
  return [type];
}

/** The variant keys of the `cva(…)` call a `VariantProps<typeof x>` points at. */
function variantProps(
  reference: ts.TypeReferenceNode,
  defaults: Map<string, string>,
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
): ApiProp[] {
  const argument = reference.typeArguments?.[0];
  if (!argument || !ts.isTypeQueryNode(argument)) return [];
  let symbol = checker.getSymbolAtLocation(argument.exprName);
  if (symbol && symbol.flags & ts.SymbolFlags.Alias) symbol = checker.getAliasedSymbol(symbol);
  const declaration = symbol?.valueDeclaration;
  if (!declaration || !ts.isVariableDeclaration(declaration)) return [];
  const call = declaration.initializer;
  if (!call || !ts.isCallExpression(call)) return [];
  const config = call.arguments[1];
  if (!config || !ts.isObjectLiteralExpression(config)) return [];
  const declaredIn = declaration.getSourceFile();

  const variants = objectProperty(config, "variants");
  const defaultVariants = objectProperty(config, "defaultVariants");
  if (!variants) return [];
  const props: ApiProp[] = [];
  for (const property of variants.properties) {
    if (!ts.isPropertyAssignment(property) || !ts.isObjectLiteralExpression(property.initializer)) {
      continue;
    }
    const key = propertyKey(property, declaredIn);
    const values = property.initializer.properties
      .filter(ts.isPropertyAssignment)
      .map((value) => JSON.stringify(propertyKey(value, declaredIn)));
    const fromCva = defaultVariants?.properties.find(
      (p): p is ts.PropertyAssignment =>
        ts.isPropertyAssignment(p) && propertyKey(p, declaredIn) === key,
    );
    props.push({
      name: key,
      type: values.join(" | "),
      default: fromCva ? text(fromCva.initializer, declaredIn) : (defaults.get(key) ?? ""),
      required: false,
      description: "",
    });
  }
  // The same props a call site reads from `VariantProps`, wherever the cva lives.
  void sourceFile;
  return props;
}

function objectProperty(object: ts.ObjectLiteralExpression, name: string) {
  const property = object.properties.find(
    (p) => ts.isPropertyAssignment(p) && propertyKey(p, object.getSourceFile()) === name,
  );
  if (
    property &&
    ts.isPropertyAssignment(property) &&
    ts.isObjectLiteralExpression(property.initializer)
  ) {
    return property.initializer;
  }
  return undefined;
}

/** `default:` and `"icon-xs":` both name a key; the quotes are not part of it. */
function propertyKey(property: ts.PropertyAssignment, sourceFile: ts.SourceFile): string {
  const name = property.name;
  if (ts.isStringLiteral(name) || ts.isIdentifier(name) || ts.isNumericLiteral(name))
    return name.text;
  return name.getText(sourceFile);
}

function docComment(node: ts.Node | undefined): string {
  if (!node) return "";
  return ts
    .getJSDocCommentsAndTags(node)
    .filter(ts.isJSDoc)
    .map((doc) => ts.getTextOfJSDocComment(doc.comment) ?? "")
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function text(node: ts.Node, sourceFile: ts.SourceFile): string {
  return node.getText(sourceFile).replace(/\s+/g, " ").trim();
}

const invokedDirectly =
  process.argv[1] !== undefined &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (invokedDirectly) {
  const apis = extractAll();
  writeAll(apis);
  const parts = apis.reduce((sum, api) => sum + api.parts.length, 0);
  console.log(
    `API extracted: ${apis.length} components, ${parts} parts → ${path.relative(process.cwd(), OUT)}`,
  );
}
