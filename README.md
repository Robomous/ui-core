<img src="https://cdn.robomous.ai/public-images/robomous-banner.svg" alt="Robomous.ai" width=300 />

-----

# @robomous/ui-core

The Robomous design system: twenty-one React components this package owns outright, over Radix UI
and Base UI behaviour, and the one stylesheet they resolve through. Extracted from
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
```

The stylesheet is the contract. Tailwind v4 reads its `@theme` block, so `bg-primary` in a
component here and `bg-primary` in a consuming app are the same colour by construction. The colour
namespace is closed: every colour is a role (`primary`, `muted`, `success`, `warning`, `info`,
`destructive`, `overlay`, …) and Tailwind's default palette produces nothing. A consumer adds an
`@source` for its own sources after the import, and declares any extension of its own in its own
stylesheet.

## Repository

```text
src/components/   the components, one file each
src/theme/        styles.css, the single visual contract; tokens.ts, its runtime mirror
src/index.ts      the public surface, exported by name
tests/            behaviour tests, the token contract, the packed-consumer test
examples/catalog  manual inspection of every component and state, light and dark
docs/             DESIGN.md, CONTRIBUTING.md, components/, MIGRATION-*.md
```

- [docs/DESIGN.md](docs/DESIGN.md) — the rules and how each one is held.
- [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) — scripts, adding a component or a token, releasing.
- [docs/components/README.md](docs/components/README.md) — what each component is for.
- [docs/MIGRATION-0.3.md](docs/MIGRATION-0.3.md) — moving from 0.2 to 0.3.

## Verification

`pnpm verify` runs format, lint and typecheck, the behaviour tests, the build, the catalog, and a
packed-consumer test that installs the tarball into a throwaway project and compiles it with a real
Tailwind. The release workflow runs the same before it publishes.

## Release

Bump `version` in `package.json`, commit, then tag `vX.Y.Z` and push the tag. CI verifies, then
publishes to npm via trusted publishing (OIDC) with provenance — no tokens. The workflow refuses a
tag that does not match `package.json`.
