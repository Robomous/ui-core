# @robomous/ui-core

The Robomous design system: shadcn Nova primitives under Radix behaviour, the foundation design
tokens, and the gates that keep them canonical. Extracted from
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

The stylesheet is the contract: Tailwind v4 reads its `@theme` block, so `bg-primary` in a
component here and `bg-primary` in a consuming app are the same colour by construction. A
consumer adds its own extensions in its own stylesheet after importing this one.

## The gates

The rules that keep the design system honest are published alongside it:
`import { ... } from "@robomous/ui-core/gates"` gives a consumer the same pure scan helpers and
foundation facts this repo's own gate tests run — canonical-plus-additive primitives, one status
palette with one home, no colour in a class string, brand as identity only. The governance, and
what each gate holds, is [DESIGN.md](DESIGN.md).

## Release

Bump `version` in `package.json`, commit, then tag `vX.Y.Z` and push the tag. CI publishes to
npm via trusted publishing (OIDC) — no tokens. The release workflow refuses a tag that does not
match `package.json`.
