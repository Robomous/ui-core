# Contributing

## Setup

Node 24 (`.nvmrc`) and the pnpm named in `package.json#packageManager`.

```
pnpm install
```

The repository is a pnpm workspace: the package at the root, and `examples/catalog` as a second
member that depends on it as `workspace:*`.

## Scripts

| Script | What it does |
| --- | --- |
| `pnpm test` | The behaviour tests and the token contract, under jsdom (vitest project `unit`). |
| `pnpm test:package` | Builds, packs, installs the tarball into a temporary consumer, compiles it with a real Tailwind, imports it under Node and bundles it. Slow; touches the registry. |
| `pnpm lint` | ESLint (including the colour-literal rule) and `tsc --noEmit` over `src` and `tests`. |
| `pnpm format` / `pnpm format:check` | Prettier. Markdown is hand-formatted at 100 columns and excluded. |
| `pnpm build` | Cleans `dist/` and compiles `src/` with declarations. |
| `pnpm catalog` | Builds the package and serves the catalog with Vite. |
| `pnpm catalog:check` | Typechecks and builds the catalog, as CI does. |
| `pnpm verify` | Everything above in CI order: format, lint, test, build, catalog, package test. |

## Adding or changing a component

The checklist is in [DESIGN.md](DESIGN.md), *Adding a component*. In short: wrap Radix or Base UI
behaviour, spell colour only through the roles, keep geometry in the component, export by name
from `src/index.ts`, test the behaviour in `tests/components/`, and add it to the catalog.

State styles use the attributes the behaviour library emits: `data-[state=open]:` for Radix, bare
`data-open:` for Base UI. There is no custom variant layer.

## Adding a token

A token is a role. Declare it in `:root` and `.dark` in `src/theme/styles.css`, expose it in
`@theme inline` as `--color-<role>: var(--<role>)`, add it to `ROLE_NAMES` in
`tests/theme/tokens.test.ts` and to both maps in `src/theme/tokens.ts`, and give it a swatch in
`examples/catalog/src/sections/Foundations.tsx`. If it is not a role — if the name describes a
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
