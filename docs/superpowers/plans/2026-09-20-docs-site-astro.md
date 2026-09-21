# ui-core: turn `examples/catalog` into the Astro documentation site

## Context

`examples/catalog` is today a Vite 8 + React app for manual inspection: one long page with 24
hand-written `<Specimen>` blocks (`src/sections/Components.tsx`, 1085 lines), token swatches
(`Foundations.tsx`) and a `States.tsx` section. It imports the real package through the workspace
link and the exports map, and it is wired into `pnpm verify`, CI, the release gate, ESLint and six
doc files. It is not a reference: no per-component page, no usage code, no API tables, no search.

The user wants it replaced, in the same folder, by a real documentation site for the design
system, built on `astro@latest`, laid out like the reference screenshot (shadcn/radix-style docs):

- Top nav: wordmark, Home / Docs / Components, "Search documentation…" box, GitHub link, theme
  toggle.
- Left sidebar: **Sections** (Introduction, Installation, Theming, States, Components) and
  **Components** (all 40, alphabetical), current page highlighted.
- Main column per component: H1 + lede; a "built on Radix / Base UI / cmdk / vaul" callout bar
  with Docs + API Reference links; a hero preview card with the live demo and a collapsible
  "View Code" panel; **Usage** (import + JSX); **Composition** (ASCII anatomy tree); one section
  per variant/state (preview + code); **API Reference** (one Prop | Type | Default table per
  exported part); Previous / Next footer.
- Right column: "On This Page" TOC.

Decisions already taken by the user (do not re-open):

1. Custom Astro, not Starlight. `@astrojs/react` islands + Tailwind v4. The site dogfoods
   ui-core: Sidebar, Sheet, Command, Kbd, Button, Badge, Table, Tooltip… are the docs UI.
2. Scope: everything this session. Shell, section pages, all 40 component pages, catalog code
   removed, verify/CI/docs updated.
3. API tables are generated at build time from `src/components/*.tsx` with the TypeScript
   compiler API.
4. Folder stays `examples/catalog`. No deploy workflow yet; CI only builds the site.

## Verified versions (registry, 2026-09-20)

| Package | Version | Note |
| --- | --- | --- |
| `astro` | 7.3.3 | Node ≥ 22.12 (`.nvmrc` = 24 ✓), Vite 8, Shiki 4, Rust compiler (strict HTML) |
| `@astrojs/react` | 6.0.6 | peers react/react-dom ^19 |
| `@astrojs/mdx` | 8.0.1 | md/mdx rendered by Astro 7's built-in pipeline; Shiki fences via `markdown.shikiConfig` |
| `@astrojs/check` | 0.9.10 | peer `typescript ^5 || ^6` ✓ (repo has 6.0.3) |
| `@tailwindcss/vite` | 4.3.3 | same as the catalog today; official Tailwind v4 path for Astro |
| `prettier-plugin-astro` | 1.0.1 | peer prettier ^3.5.3 ✓ |

Astro facts that shape the design:

- Content collections: `src/content.config.ts`, `defineCollection({ loader: glob(...), schema })`,
  `z` from `astro/zod`, `render(entry)` → `{ Content, headings }` (headings feed the TOC).
- **Dynamic tags cannot carry `client:*` directives.** Each MDX page must statically import the
  demo components it hydrates. Raw source, by contrast, can be resolved dynamically with
  `import.meta.glob(..., { query: "?raw", import: "default" })`.
- `<Code>` from `astro:components` accepts `themes={{ light, dark }}` + `defaultColor={false}`;
  dark needs the documented `.dark .astro-code { color: var(--shiki-dark) }` CSS.
- A React component rendered in `.astro` **without** a `client:*` directive is static HTML with
  zero client JS. Badge, Table, Button-as-link, Separator, Breadcrumb are used that way.

Repo facts verified:

- One React instance today: root devDep `react ^19.2.8` and catalog dep `react ^19.2.8` resolve
  to the same store copy. Keep the ranges identical and add `vite.resolve.dedupe`.
- No component touches `window`/`document` at module scope; `tests/package/consumer.test.ts`
  already `renderToStaticMarkup`s `dist/index.js` under Node. SSR of demos at build is safe.
- `.design-sync/build-css.mjs:49-58` resolves `@tailwindcss/node|oxide` through
  `examples/catalog/package.json` → `@tailwindcss/vite`. Folder and that devDependency survive.
- `@robomous/ui-core/styles.css` carries `@source "../components"` relative to its real path, so
  the package's own class strings compile in the docs build (same mechanism the catalog uses).

## Target file tree (`examples/catalog`)

```
examples/catalog/
  package.json                @robomous/ui-core-docs (private)
  astro.config.ts             react(), mdx(), vite.plugins [tailwindcss()], dedupe react, shiki dual theme
  tsconfig.json               extends astro/tsconfigs/strict; jsx react-jsx; paths @/* -> ./src/*
  scripts/extract-api.ts      TS compiler API extractor (Node 24 runs erasable-syntax .ts natively)
  public/favicon.svg
  src/
    content.config.ts         collections: sections, components
    content/
      sections/  introduction.mdx  installation.mdx  theming.mdx  states.mdx
      components/  alert.mdx … tooltip.mdx   (40; id = slug = src/components/<slug>.tsx; sonner.mdx titled "Sonner")
    demos/<slug>/<story>.tsx  one story per file: `export default function Story()` + one-line JSDoc
    generated/api/<slug>.json GITIGNORED, produced by scripts/extract-api.ts
    layouts/  Base.astro (html, theme bootstrap, global.css, Toaster)  Docs.astro (header + sidebar + main + toc + prev/next)
    components/
      Header.astro  Sidebar.tsx  MobileNav.tsx  SearchCommand.tsx  ThemeToggle.tsx  Toc.astro
      BuiltOn.astro  Preview.astro  CodePanel.astro  CopyButton.tsx  ApiReference.astro  PrevNext.astro
      Swatches.astro (theming page; ports Foundations.tsx SURFACES/STATUS/STRUCTURE/RADII/TYPE/Focus)
    lib/  nav.ts (ordered sections + alphabetical components, prev/next)  demo-source.ts (?raw glob + stripDoc)
          api.ts (eager glob of generated JSON; clear error if empty)  site.ts (repo URL, package name/version)
    pages/
      index.astro                    landing: hero, install snippet, three cards
      docs/[...slug].astro           section pages
      components/index.astro         grid of the 40 components
      components/[slug].astro        component page template
      search.json.ts                 static endpoint for the palette
    styles/global.css                @import "@robomous/ui-core/styles.css"; @source "../"; shiki dark rules; prose
```

Deleted: `index.html`, `vite.config.ts`, `src/App.tsx`, `src/main.tsx`, `src/catalog.css`,
`src/sections/*`.

`package.json` (docs):

- dependencies: `@robomous/ui-core workspace:*`, `react ^19.2.8`, `react-dom ^19.2.8`,
  `lucide-react ^1.37.0`
- devDependencies: `astro ^7.3.3`, `@astrojs/react ^6.0.6`, `@astrojs/mdx ^8.0.1`,
  `@astrojs/check ^0.9.10`, `@tailwindcss/vite ^4.3.3`, `tailwindcss ^4.3.3`,
  `typescript ^6.0.3`, `@types/react ^19.2.18`, `@types/react-dom ^19.2.4`
- scripts: `dev: astro dev`, `build: astro build`, `check: astro sync && astro check`,
  `preview: astro preview`, `api: node scripts/extract-api.ts`, `predev: node scripts/extract-api.ts`
- dropped: `vite`, `@vitejs/plugin-react` (Astro brings both)

## Content model

`src/content.config.ts`:

```ts
sections:   glob("*.mdx", "./src/content/sections"); schema { title, description, order: number }
components: glob("*.mdx", "./src/content/components"); schema {
  title: string,                       // "Sheet"
  description: string,                 // lede, from docs/components/README.md Notes/Behaviour
  builtOn: [{ name, docsUrl, apiUrl? }] // "none" behaviour -> [{ name: "native HTML", docsUrl: MDN }]
  related: string[] = []
}
```

Component page skeleton (every page follows it; H2s are the TOC):

```mdx
---
title: Sheet
description: A Radix Dialog anchored to an edge of the viewport.
builtOn: [{ name: Radix Dialog, docsUrl: https://www.radix-ui.com/primitives/docs/components/dialog, apiUrl: https://www.radix-ui.com/primitives/docs/components/dialog#api-reference }]
---
import Default from "@/demos/sheet/default";
import FromTheLeft from "@/demos/sheet/from-the-left";

<Preview demo="sheet/default"><Default client:load /></Preview>

## Usage
```tsx
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@robomous/ui-core";
```
```tsx
<Sheet>…</Sheet>
```

## Composition
```text
Sheet
├─ SheetTrigger (asChild → Button)
└─ SheetContent side="right" showCloseButton
   ├─ SheetHeader › SheetTitle, SheetDescription
   └─ SheetFooter
```

## From the left
<Preview demo="sheet/from-the-left"><FromTheLeft client:load /></Preview>
```

The template `components/[slug].astro` wraps `<Content components={{ Preview }} />` with H1 +
lede, `<BuiltOn>`, then appends `## API Reference` (`<ApiReference slug>`) and `<PrevNext>`.
`Toc.astro` merges `headings` (depth 2–3) with the fixed "API Reference" entry. If Astro's MDX
does not resolve `Preview` from the `components` map, each page adds one import line
`import Preview from "@/components/Preview.astro"`; decide in Phase A step 5 with the exemplar.

## Demo registry

- `src/demos/<slug>/<story>.tsx`: `export default function <Story>()`, one-line JSDoc, imports
  only from `@robomous/ui-core`, `react`, `lucide-react`. Stateful demos keep `useState` inside.
- Sources: the 24 specimens in `examples/catalog/src/sections/Components.tsx` and the 138
  stories in `.design-sync/previews/*.tsx` (already this shape, e.g.
  `.design-sync/previews/Button.tsx` → Variants, Sizes, IconAndInline, WithLabelAndIcon,
  Disabled). Descriptions/builtOn: the table in `docs/components/README.md:13-52`.
- `Preview.astro` props `demo="sheet/from-the-left"` (path under `src/demos`, no extension).
  Renders the card (`rounded-xl bg-card ring-1 ring-foreground/10 p-6 min-h-40`), the `<slot/>`
  island, and `<CodePanel code={demoSource(demo)} />`. `lib/demo-source.ts` globs
  `/src/demos/**/*.tsx` as `?raw`, strips the leading JSDoc, throws at build if missing.
- Hydration: `client:load` by default. `client:only="react"` (with a `Skeleton` fallback) for
  demos whose SSR output is empty or misleading: Toaster, Drawer (vaul measures the viewport),
  and any demo forcing a portal `open`.
- Scales to parallel authoring: a page touches only `content/components/<slug>.mdx` and
  `demos/<slug>/*`. Nav, search index, prev/next and API tables are derived; no shared file is
  edited per page.

## Layout pieces

| Piece | Kind | Notes |
| --- | --- | --- |
| `Base.astro`, `Docs.astro`, `Header.astro` | Astro | header links styled with `buttonVariants({variant:"ghost",size:"sm"})` at build time |
| theme bootstrap | `<script is:inline>` in head | `localStorage.theme ?? prefers-color-scheme` → `.dark` on `<html>` before paint |
| `ThemeToggle.tsx` | island `client:load` | ui-core Button icon-sm ghost, Sun/Moon, `aria-pressed`, writes localStorage |
| `Sidebar.tsx` | island `client:load` | `SidebarProvider` + `Sidebar collapsible="none"` + `SidebarGroup/Label/Menu/MenuButton asChild isActive`; props `{ sections, components, current }`. `collapsible="none"` renders a plain div, no cookie/offcanvas path. Fallback if hydration cost bites: plain Astro `<nav>` on `bg-sidebar` tokens |
| `MobileNav.tsx` | island `client:load`, `md:hidden` | `Sheet side="left"` + same link list |
| `SearchCommand.tsx` | island `client:idle` | Button "Search documentation…" + `KbdGroup` ⌘K; `CommandDialog` + `Command*`; fetches `/search.json` on first open. Pagefind rejected: extra post-build binary, stale index in dev, own UI; ~45 pages fit a JSON index |
| `Toc.astro` | Astro + `<script>` | from `headings`; IntersectionObserver sets `aria-current` |
| `BuiltOn.astro` | Astro | static `Badge` + Docs / API Reference links |
| `Preview.astro`, `CodePanel.astro` | Astro | `<details><summary class={buttonVariants(...)}>View Code</summary>` + `<Code lang="tsx" themes defaultColor={false} wrap />` |
| `CopyButton.tsx` | island `client:visible` | Button + clipboard + Tooltip "Copied" |
| `ApiReference.astro` | Astro | static ui-core `Table*`, one per part, in `src/index.ts` export order; footer line "Also accepts every prop of `<extends>`" |
| `PrevNext.astro` | Astro | static `Button asChild variant="outline"` |
| `Toaster` | island `client:only="react"` in `Base.astro` | mounted once |

## API extractor (`scripts/extract-api.ts`)

Input: root `tsconfig.json` via `ts.getParsedCommandLineOfConfigFile` (gets `@/*`), program over
`../../src/components/*.tsx` + `../../src/index.ts`. Export `extractAll()`; CLI entry guarded so
the test can import the function. Keep to erasable TS syntax (no enums/namespaces).

Per component file:

1. Exported PascalCase names whose declaration is a `FunctionDeclaration` or a `const` arrow
   function (Toaster, `sonner.tsx:35`) are parts. Others (`buttonVariants`, `useSidebar`,
   `useComboboxAnchor`) are `helpers`.
2. First parameter binding pattern → `prop → default text` for elements with initializers
   (`side = "right"`, `showCloseButton = true`, `spacing = 2`).
3. Flatten the type annotation's intersection members:
   - `VariantProps<typeof X>`: resolve `X` with the checker (follows the import in
     `toggle-group.tsx:8`), find its `cva(base, { variants, defaultVariants })`, emit one prop
     per variant key: type = union of quoted keys in source order, default = `defaultVariants`
     key, else the binding default (`attachment.tsx:27-30`), else empty.
   - `TypeLiteral`: each property → name, `type.getText()`, optional, JSDoc description
     (`select.tsx:35-39` has one), default from step 2.
   - Anything else (`React.ComponentProps<…>`, `Omit<…>`, `ToasterProps`) → `extends[]`.
4. Step-2 names not yet covered (Tabs `orientation`, Separator `decorative`, Tooltip
   `delayDuration`, `sideOffset`): look the property up on the parameter's resolved type and
   `typeToString` it with `undefined` stripped.
5. Append `className: string` when the resolved type has it; never list `children`.

Output `src/generated/api/<slug>.json`:
`{ slug, source, parts: [{ name, extends: [], props: [{ name, type, default, required, description }] }], helpers: [] }`
plus `index.json { generatedAt, components, exportsCovered }`.

Test `tests/docs/api-extractor.test.ts` (root vitest `unit` project, node environment, one
program for the suite): Button `variant` six values in order + default `"default"`, `size`
includes `"icon-xs"` and `"inline"`; SheetContent `side` default `"right"`, `showCloseButton`
default `true`; Attachment `size` default `"default"` without `defaultVariants`, `state` five
values; ToggleGroupItem gets `variant`/`size` through the imported cva; Tabs `orientation`
default `"horizontal"`; SelectTrigger `multiline` has a description; Toaster is a part;
coverage: every PascalCase export of `src/index.ts` appears in exactly one JSON, and every
`content/components/*.mdx` id has a JSON. This is the "new component without docs" guard.

## Root configuration and docs

- `package.json`: `catalog` → `docs` (`pnpm build && pnpm --filter @robomous/ui-core-docs dev`),
  `catalog:check` → `docs:check` (`pnpm --filter @robomous/ui-core-docs api && … check && … build`,
  explicit chain, not relying on `pre*` hooks); `verify` (line 30) calls `docs:check`. Add
  `prettier-plugin-astro ^1.0.1`.
- `pnpm-workspace.yaml`: member unchanged; rewrite the comment.
- `.github/workflows/ci.yml:26` → `pnpm docs:check`; comment lines 19-21; add
  `ASTRO_TELEMETRY_DISABLED: 1`. `release.yml` unchanged.
- `.gitignore`: keep `examples/catalog/dist/`; add `examples/catalog/.astro/`,
  `examples/catalog/src/generated/`.
- `eslint.config.js`: `ignores` add the two folders above. The `examples/**/*.{ts,tsx}` block
  (line 38) already lints demos, islands and the extractor with the colour-literal rule.
  `.astro` files are not linted (`eslint-plugin-astro` out of scope; note in CONTRIBUTING).
- Prettier: `plugins: ["prettier-plugin-astro"]`, override `*.astro` → parser astro.
  `.prettierignore`: add `*.mdx` (same rationale as `*.md`), `examples/catalog/.astro/`,
  `examples/catalog/src/generated/`.
- Docs: `README.md:63,74-76`; `docs/DESIGN.md:35,290-291,320-322` (checklist step 9 → "a page
  under `examples/catalog/src/content/components/` and demos under `src/demos/<slug>/`");
  `docs/CONTRIBUTING.md:11-12,23-25,40,79` (swatch now in `Swatches.astro`);
  `docs/components/README.md:8-9`; `.design-sync/NOTES.md:9,267`. `docs/superpowers/` untouched.
- Save this plan as `docs/superpowers/plans/2026-09-20-docs-site-astro.md` (repo convention,
  see `docs/superpowers/plans/2026-09-08-ui-core-simplification.md`).

## Task order

**Phase A — foundation, sequential, inline (nothing fans out before A5 is green)**

1. Rewrite `examples/catalog/package.json`, delete the old files, write `astro.config.ts`,
   `tsconfig.json`, `styles/global.css`, `layouts/Base.astro`; root Prettier plugin + ignores;
   `pnpm install` (commit the lockfile).
2. Smoke: `pages/index.astro` with one `<Button client:load>` island → `astro build` green.
   This is where duplicate-React or SSR import failures would surface; verify `pnpm why react`.
3. `content.config.ts`, `lib/nav.ts`, `lib/site.ts`, `Docs.astro`, `Header.astro`,
   `Sidebar.tsx`, `MobileNav.tsx`, `ThemeToggle.tsx`, `Toc.astro`, `PrevNext.astro`,
   `BuiltOn.astro`, page templates, `components/index.astro`.
4. `Preview.astro`, `CodePanel.astro`, `CopyButton.tsx`, `lib/demo-source.ts`, Shiki dark CSS.
5. `scripts/extract-api.ts`, `lib/api.ts`, `ApiReference.astro`, the root test (TDD: test first
   against Button/Sheet/Attachment). Write the exemplar page `button.mdx` + `demos/button/*`
   end to end; it is the template the fan-out copies.

**Phase B — fan-out, parallel subagents, no shared files**
(subagent-driven-development; implementers `sonnet`, spec reviewer `haiku`, quality reviewer
`sonnet` per the user's model table)

- 39 component pages in batches of ~8: each subagent gets the exemplar, its README row, its
  catalog specimen line range and its `.design-sync/previews/*.tsx` files.
- Section pages: `introduction.mdx`, `installation.mdx` (from README install + `styles.css`
  header: import CSS, add `@source`, `.dark` on `<html>`), `theming.mdx` + `Swatches.astro`
  (port `Foundations.tsx`), `states.mdx` (port `States.tsx`; stays its own page: it documents
  cross-cutting behaviour, not tokens).
- `SearchCommand.tsx` + `pages/search.json.ts`.
- Root config and docs edits listed above.

**Phase C — integration, sequential**: `pnpm install`, `pnpm format`, `pnpm lint`, `pnpm test`,
`pnpm build`, `pnpm docs:check`; browser pass in light and dark over Button, Sidebar, Drawer,
Command, Sonner, Theming; fix `astro check` findings; commit.

## Risks

1. **Duplicate React** → invalid hook call. Keep identical ranges in both manifests,
   `vite.resolve.dedupe: ["react","react-dom"]`, verify `pnpm why react` after install.
2. **SSR of portals/vaul at build**: use `client:only="react"` for those demos; Rolldown may warn
   about `'use client'` in `dist/**` (cosmetic; silence via `onwarn` if noisy).
3. **Tailwind scanning**: docs classes must be literal (see `Foundations.tsx:5-6`); `@source "../"`
   from `global.css` covers `.astro`, `.mdx`, `.tsx`. Palette colours produce nothing: grep the
   built CSS for `--color-red` as a check.
4. **Dynamic demo hydration impossible**: hence static imports per page; `Preview.astro` throws
   on a missing source file.
5. **`astro check` speed**: acceptable at ~45 pages; fallback `astro sync && tsc --noEmit`.
6. **Astro 7 strict HTML**: keep `.astro` markup well-formed.
7. **Extractor edge cases**: `InputGroupButton` (`Omit<…> & VariantProps<…>`) → `Omit` in
   `extends`, `size` from cva; unexported contexts ignored.

## Verification

```
pnpm install
pnpm format:check
pnpm lint                      # eslint over examples/**, root tsc pulls the extractor via the new test
pnpm test                      # unit project incl. tests/docs/api-extractor.test.ts
pnpm build                     # dist/ must exist before the docs build
pnpm docs:check                # api → astro sync + check → astro build
pnpm test:package              # unchanged
pnpm docs                      # open http://localhost:4321: theme toggle, ⌘K search, 4+ pages
node .design-sync/build-css.mjs --measure   # still resolves Tailwind via the catalog anchor
```

Acceptance: 40 component pages + 4 section pages + landing + components index build; every
component page has at least one live demo and an API table with at least one part;
`search.json` lists every page; `pnpm why react` shows one version; code blocks flip with
`.dark`; all existing tests stay green.

Out of scope this session: deploy workflow, "Copy Page" button, full-text search (Pagefind),
`eslint-plugin-astro`, changelog page.
