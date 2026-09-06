<img src="https://cdn.robomous.ai/public-images/robomous-banner.svg" alt="Robomous.ai" width=300 />

-----

# @robomous/ui-core

The Robomous design system: twenty-one React components this package owns outright, the design
tokens they resolve through, and the gates that hold the rules the design system is made of.
Extracted from [Robomous/VisionSet](https://github.com/Robomous/VisionSet), where it grew up.

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

## Adding a component

```
pnpm dlx shadcn@latest add <name>
```

The CLI reads `components.json` and writes into `src/components/`. What arrives is a starting
point, not a contract: the file is this repository's from that moment, and editing it is ordinary
work.

## The gates

The rules that keep the design system honest are published alongside it:
`import { ... } from "@robomous/ui-core/gates"` gives a consumer the same eight pure scan helpers
and token facts this repo's own gates run — no colour in a class string, one status palette with
one home, no rival colour family standing in for it, brand as identity only, and the token names
read off the shipped stylesheet so a consumer can prove none of its own extensions shadows one.
The rules themselves, and which gate holds each, are in [DESIGN.md](DESIGN.md).

## Release

Bump `version` in `package.json`, commit, then tag `vX.Y.Z` and push the tag. CI publishes to
npm via trusted publishing (OIDC) — no tokens. The release workflow refuses a tag that does not
match `package.json`.
