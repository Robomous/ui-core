<img src="https://cdn.robomous.ai/public-images/robomous-banner.svg" alt="Robomous.ai" width=300 />

-----

# @robomous/ui-core

The Robomous design system, built on top of [shadcn/ui](https://ui.shadcn.com): forty-five React
components this package owns outright, over Radix UI and Base UI behaviour — plus cmdk under
`Command` and vaul under `Drawer` — and the one stylesheet they resolve through. Extracted from
[Robomous/VisionSet](https://github.com/Robomous/VisionSet), where it grew up.

## Install

```
pnpm add @robomous/ui-core
```

Peer dependencies: `react` ≥ 19, `react-dom` ≥ 19, `tailwindcss` ≥ 4.

## Usage

```ts
import "@robomous/ui-core/styles.css";   // once, in the app's entry
import { Button, Card } from "@robomous/ui-core";
import { CheckIcon } from "@robomous/ui-core/icons"; // lucide-react, the set the components use
```

`@robomous/ui-core/icons` re-exports all of lucide-react at the version the components are built
against, so an app draws its own icons from the same set without declaring a second copy. It is a
subpath because five lucide names (`Badge`, `Command`, `Sheet`, `Sidebar`, `Table`) are also
components; prefer the `…Icon` spelling. One imported icon bundles as one icon.

The stylesheet is the contract. Tailwind v4 reads its `@theme` block, so `bg-primary` in a
component here and `bg-primary` in a consuming app are the same colour by construction. Components
paint with roles (`primary`, `muted`, `success`, `warning`, `info`, `destructive`, `overlay`, …).
Underneath, Tailwind's palette is trimmed to eighteen scales — `neutral`, which the grey roles are
spelled from, and seventeen hues for data such as chart series — while `slate`, `gray`, `zinc`,
`stone`, the tinted neutrals, `white` and `black` produce nothing. A consumer adds an
`@source` for its own sources after the import, and declares any extension of its own in its own
stylesheet.

## Built on shadcn/ui

A component enters this package from the shadcn registry and is owned here from then on. It is
not an extension of shadcn: the registry is where a component starts, `components.json` is how it
arrives, and the rules in `docs/DESIGN.md` are what it is adapted to before it is exported.

```
pnpm dlx shadcn@latest add <name>
```

writes `src/components/<name>.tsx` (and a hook under `src/hooks/` if the item brings one) with
`@/` imports that the build resolves. The adaptation checklist follows in DESIGN.md, *Adding a
component*. An existing component is never reinstalled.

shadcn's utility and variant layer — `data-open:`, `data-active:` and the rest, `no-scrollbar`,
`scroll-fade-*`, `shimmer-*` — ships inside the stylesheet as `src/theme/shadcn.css`, a
byte-for-byte copy of `shadcn/tailwind.css` held to the installed package by a test. It is a copy
because the stylesheet ships as source: a package named in it would become a runtime dependency of
every consumer, and `shadcn` is the CLI.

## Repository

```text
src/components/   the components, one file each
src/hooks/        the hooks the components are built on
src/theme/        styles.css, the single visual contract; shadcn.css, shadcn's layer
src/index.ts      the public surface, exported by name
components.json   how the shadcn CLI installs a new component here
tests/            behaviour tests, the token and shadcn-layer contracts, the packed-consumer test
examples/catalog  the documentation site (Astro): a page, live demos and API tables per component
docs/             DESIGN.md, CONTRIBUTING.md, components/, MIGRATION-*.md
```

- [docs/DESIGN.md](docs/DESIGN.md) — the rules and how each one is held.
- [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) — scripts, adding a component or a token, releasing.
- [docs/components/README.md](docs/components/README.md) — what each component is for.
- [docs/MIGRATION-0.3.md](docs/MIGRATION-0.3.md) — moving from 0.2 to 0.3.

## Verification

`pnpm verify` runs format, lint and typecheck, the behaviour tests, the build, the docs site, and a
packed-consumer test that installs the tarball into a throwaway project and compiles it with a real
Tailwind. The release workflow runs the same before it publishes.

## Release

Bump `version` in `package.json`, commit, then tag `vX.Y.Z` and push the tag. CI verifies, then
publishes to npm via trusted publishing (OIDC) with provenance — no tokens. The workflow refuses a
tag that does not match `package.json`.
