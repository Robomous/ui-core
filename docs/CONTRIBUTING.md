# Contributing

## Setup

Node 24 (`.nvmrc`) and the pnpm named in `package.json#packageManager`.

```
pnpm install
```

The repository is a pnpm workspace: the package at the root, and the documentation site (Astro) at
`examples/catalog` as a second member that depends on it as `workspace:*`.

## Scripts

| Script | What it does |
| --- | --- |
| `pnpm test` | The behaviour tests and the token contract, under jsdom (vitest project `unit`). |
| `pnpm test:package` | Builds, packs, installs the tarball into a temporary consumer, compiles it with a real Tailwind, imports it under Node and bundles it. Slow; touches the registry. |
| `pnpm lint` | ESLint (including the colour-literal rule) and `tsc --noEmit` over `src` and `tests`. |
| `pnpm format` / `pnpm format:check` | Prettier. Markdown is hand-formatted at 100 columns and excluded. |
| `pnpm build` | Cleans `dist/`, compiles `src/` with declarations, and rewrites the `@/` alias to relative paths (`tsc-alias`). |
| `pnpm docs:dev` | Stops any running dev server, drops Vite's dependency cache, builds the package and serves the docs site on <http://localhost:4321>. Named with the colon because plain `docs` is a pnpm built-in. |
| `pnpm docs:check` | Generates the API tables, runs `astro check` and builds the docs site, as CI does. |
| `pnpm verify` | Everything above in CI order: format, lint, test, build, docs site, package test. |

## Adding or changing a component

A new component usually comes from the shadcn registry:

```
pnpm dlx shadcn@latest add <name>
```

`components.json` tells the CLI to write into `src/components/` and `src/hooks/` with `@/`
imports, which the build resolves. Read the diff, then adapt: the checklist is in
[DESIGN.md](DESIGN.md), *Adding a component*. In short: colour only through the roles, geometry in
the component, `type="button"`, no exit animation on a surface whose trigger can be pressed again on
the next frame, export by name from `src/index.ts`, a behaviour test in `tests/components/`, a
page with demos in the docs site, a row in `docs/components/README.md`. Never reinstall an existing
component.

The CLI pulls in an item's registry dependencies, which for most of the newer components include
`button`, `input`, `dialog` and `input-group` — all of them already here and edited. It asks about
each one, and the prompt is interactive: under `CI=1` or a non-terminal stdin it hangs and the
batch stops half-written. Answer it from stdin and the run finishes:

```
yes n | pnpm dlx shadcn@latest add <names> --yes
```

Then check that the files it offered to overwrite are unchanged before reading the diff.

State styles are written in shadcn's variants — `data-open:`, `data-closed:`, `data-active:`,
`data-disabled:`, `data-horizontal:`, `data-vertical:` — never in the attribute a behaviour library
happens to emit (`data-[state=open]:`, `data-[orientation=vertical]:`). A `data-[…]` bracket is for
the values the layer declares no variant for, and for attributes that are not states; see
DESIGN.md, *State attributes*.

## The docs site

`examples/catalog` is an Astro app that imports the package through the workspace link, so
`pnpm build` runs first. A component page is `src/content/components/<name>.mdx`; its demos are
`src/demos/<name>/<story>.tsx`, one story per file, and the file is the code sample the page shows.
The API tables are generated into `src/generated/api/` (gitignored) by `scripts/extract-api.ts`
from the component sources: `astro dev` and `pnpm docs:check` run it, and
`tests/docs/api-extractor.test.ts` holds its shape and fails once a component has no page.
`.astro` files are formatted by Prettier but not linted; the colour-literal rule covers the `.tsx`
demos and islands.

## Updating the shadcn layer

`src/theme/shadcn.css` is a byte-for-byte copy of `shadcn/dist/tailwind.css`, and
`tests/theme/shadcn.test.ts` fails when the two differ. To take a new version:

```
pnpm up shadcn
cp node_modules/shadcn/dist/tailwind.css src/theme/shadcn.css
git diff src/theme/shadcn.css
```

Read that diff as a change to every consumer's CSS, because it is one. Nothing of ours goes in
that file; a utility we need lives in `styles.css` after the import.

## Adding a token

A token is a role. Declare it in `:root` and `.dark` in `src/theme/styles.css`, expose it in
`@theme inline` as `--color-<role>: var(--<role>)`, add it to `ROLE_NAMES` in
`tests/theme/tokens.test.ts` and to both maps in `src/theme/tokens.ts`, and give it a swatch in
`examples/catalog/src/components/Swatches.astro`. If it is not a role — if the name describes a
pigment rather than a purpose — it does not belong here.

## Tests

Assert what a screen would lose: roles, focus, `aria-*`, what a click or a keypress does. Do not
pin class strings unless the class *is* the documented contract (a menu's `min-w-32` floor is one;
a shade is not). `tests/setup.ts` holds exactly the harness pieces a current test needs, each with
the test that needs it named.

## Releasing

Bump `version` in `package.json`, run `pnpm verify`, commit, tag `vX.Y.Z` and push the tag. The
release workflow runs `pnpm verify` again, refuses a tag that does not match `package.json`, and
publishes to npm through trusted publishing (OIDC) with provenance. No tokens. A change that
removes or renames a public export gets a `docs/MIGRATION-<version>.md` naming every consumer site
found and the edit each one needs.
