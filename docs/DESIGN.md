# Robomous design foundations

## Purpose and ownership

`@robomous/ui-core` is forty-five React components this repository owns outright, over behaviour from
Radix UI and Base UI — plus cmdk under `Command` and vaul under `Drawer` — and the one stylesheet
they resolve through. The package is **built on top of shadcn/ui**: a component starts as an item
of the shadcn registry, installed through `components.json`, and from that moment it is ordinary
source here — edited with a reason, a test and a review like any other file, never regenerated and
never compared back to upstream. It is not an extension of shadcn. shadcn supplies the starting
point and the utility and variant layer the stylesheet vendors; Radix, Base UI, cmdk and vaul
supply focus management, keyboard interaction, dismissal, `aria-*` relationships and the `data-*`
state attributes; Robomous owns the API, the styling, the semantic variants, the geometry and the
public contract.

The package is product-agnostic. Shells, navigation, domain cards, model selectors, user menus,
billing screens and the like stay in the product that needs them until the *same composition* is
shared by at least two products. A pattern that earns that gets its own package; nothing here is
reserved for it in advance.

This document states the rules the package holds itself to and how each one is held. A component's
anatomy and variants are read from `src/components/`, where they live; `docs/components/` indexes
them.

## The shape of the package

```text
src/components/*.tsx   the components, one file each, exported by name from src/index.ts
src/hooks/*.tsx        the hooks the components are built on (useIsMobile)
src/icons.ts           lucide-react re-exported whole, the ./icons subpath
src/theme/styles.css   the one visual contract: tokens, the trimmed Tailwind palette, base layer
src/theme/shadcn.css   shadcn's utility and variant layer, vendored byte for byte, never edited
components.json        the shadcn CLI's configuration: style, stylesheet, aliases
tests/                 behaviour tests (jsdom), token and shadcn-layer contracts, consumer test
examples/catalog/      the documentation site (Astro), importing the real package
```

Internal imports are written against the `@/` alias `components.json` declares (`@/components/…`,
`@/hooks/…`), which is what the CLI writes. `tsconfig.json` resolves it, `tsc-alias` rewrites it
to relative paths with extensions in `dist/`, and `vitest.config.ts` resolves it for the tests. The
older components import relatively; both forms are fine, and neither is rewritten to the other.

A consumer imports two things, and a third when it draws icons of its own:

```ts
import "@robomous/ui-core/styles.css"; // once, in the app's entry
import { Button, Card } from "@robomous/ui-core";
import { CheckIcon } from "@robomous/ui-core/icons";
```

`@robomous/ui-core/icons` is lucide-react, re-exported whole (`src/icons.ts`), so an app's icons
and the components' come from one set at one version. It is the one `export *` in the package, and
a subpath rather than part of the main entry: five lucide names — `Badge`, `Command`, `Sheet`,
`Sidebar`, `Table` — are components here, and the main entry is meant to be read name by name.
The `…Icon` spelling is the one to use. lucide-react has no side effects, so one icon imported is
one icon bundled.

There is no policy engine. The invariants below are held by CSS, by TypeScript, by ESLint, by the
component API, or by a test that observes behaviour — never by a scanner of our own.

## Tokens

**The tokens have one home: [`src/theme/styles.css`](../src/theme/styles.css).** Tailwind v4 is
CSS-first, so the stylesheet is not a mirror of a config; it *is* the config. There is no
`tailwind.config.js` in this repository and there must not be one.

Both themes are declared in full — a value in `:root`, a counterpart in `.dark` — and exposed to
Tailwind through `@theme inline` as `--color-<role>: var(--<role>)`. Every rule below is written
against a **role**, never a light-mode value: "the page" resolves per theme and is never asserted
to be white.

**The colour vocabulary is two layers.** The roles below are what components and screens paint
with. Underneath them is Tailwind's own palette, trimmed to eighteen scales (*The palette*,
below); everything else Tailwind ships — `slate`, `gray`, `zinc`, `stone`, the tinted neutrals,
`bg-white`, `bg-black` — compiles to nothing, in this package and in every consumer. The roles
are exactly:

| Family | Roles |
| --- | --- |
| Surfaces | `background`, `card`, `popover`, `muted`, each with a `-foreground` |
| Emphasis | `primary`, `secondary`, `accent`, each with a `-foreground` |
| Status | `success`, `warning`, `info`, `destructive` |
| Structure | `border`, `input`, `ring`, `overlay` |
| Shell | `sidebar` and its seven companions, kept because two product shells paint with them |

`primary` is the one high-emphasis colour; `accent` is the interactive hover/focus surface a row
or a menu item lights up with, never what a button fills with. `overlay` is the scrim behind a
Dialog or a Sheet: a purpose, not a pigment.

**Never a colour inside a class string.** Outside the roles and the kept scales, the one road left
for a literal is an arbitrary value — `bg-[#eb5a47]`, `ring-[var(--x)]`. ESLint refuses it
(`no-restricted-syntax` in [`eslint.config.js`](../eslint.config.js)); a consumer copies the two
selectors. The Button's hover step, a `color-mix` of two roles, names no colour of its own and
stays legal.

There is no TypeScript copy of these values. A caller that needs one as a string reads it from the
document with `getComputedStyle(element).getPropertyValue("--foreground")`, or writes
`var(--foreground)` and lets CSS resolve it. A second copy in TypeScript is a second thing to keep
true, and the stylesheet is the only one that paints.

### The palette

The scales come from Tailwind, at Tailwind's values, and are never restated here. The `@theme`
block in `styles.css` keeps eighteen and closes the rest with `--color-<family>-*: initial`:

| Kept | Closed |
| --- | --- |
| `neutral` · `red` · `orange` · `amber` · `yellow` · `lime` · `green` · `emerald` · `teal` · `cyan` · `sky` · `blue` · `indigo` · `violet` · `purple` · `fuchsia` · `pink` · `rose` | `slate` · `gray` · `zinc` · `stone` · `mauve` · `olive` · `mist` · `taupe` · `black` · `white` |

**`neutral` is the base every grey role is spelled from.** `--muted-foreground` is
`var(--color-neutral-500)` in light and `var(--color-neutral-400)` in dark, so the themes repoint
roles to different steps instead of carrying two sets of literals. A role that needs a grey takes
the nearest step; it does not add a loose `oklch(L 0 0)` beside the scale, and
`tests/theme/tokens.test.ts` fails if one appears. Three values stay literal because they are
not steps: pure white (`background`, `card`, `popover` in light), the translucent white strokes
of the dark theme (`border`, `input`, `sidebar-border`), and the black scrim `overlay`.

**The seventeen hues are for data, not for controls** — a chart series, the colour a user picks
for an annotation class — which is where a role has nothing to say. They compile as utilities
(`bg-red-500`, `text-emerald-700`) in every consumer. A component in this package never uses
one: it paints with the role, so a status is `text-destructive`, never `text-red-600`.

Tailwind emits a scale's variable only when something uses it, so `--color-neutral-*` reaches
every consumer's `:root` through the roles, and `--color-rose-500` appears once a class or a
`var()` names it.

### Where the brand is

Robomous orange — `oklch(0.663 0.205 39.9)`, `#F5580B` — is identity: a wordmark, a styleguide
swatch. It is declared as `--brand` in both themes and **exposed as no utility**. There is no
`bg-brand`; identity UI reads `var(--brand)` directly. At 3.34:1 on `background` it clears 3:1 for
large marks and misses 4.5:1 for body copy, which is one more reason it paints no control.

### Radius

`--radius: 0.625rem` lives in the stylesheet and every step derives from it in `@theme inline`
(`radius-sm` at × 0.6 through `radius-4xl` at × 2.6). Components take their radius from that scale.
The arbitrary values that remain in `src/components/` are geometry, not radius or type: a
`max-w-[calc(100%-2rem)]`, a `translate-y-[calc(-50%_-_2px)]`, a `p-[3px]` on a tab list. Each is
a one-off measurement with no scale to belong to.

## Status vocabulary

Four statuses — `success`, `warning`, `info`, `destructive` — each a pair of roles spelled from
Tailwind's palette: the **ink** and the **surface** it sits on.

| Status | Ink (light / dark) | Surface (light / dark) |
| --- | --- | --- |
| `success` | `green-700` / `green-300` | `green-50` / `green-950` |
| `warning` | `amber-700` / `amber-300` | `amber-50` / `amber-950` |
| `info` | `blue-700` / `blue-300` | `blue-50` / `blue-950` |
| `destructive` | `red-700` / `red-300` | `red-50` / `red-950` |

Ink on its surface clears 4.5:1 in both themes (green in light is the tightest, 4.72:1). One way
to use each:

| Need | Write |
| --- | --- |
| A chip | `<Badge variant="success">` |
| A soft panel or state surface | `bg-success-surface text-success` |
| A solid mark — a dot, a timeline cell | `bg-success` |
| An icon or a run of inline text | `text-success` |
| A stroke, where the stroke is the whole mark | `border-success` |

The role's value flips between themes on its own, so no `dark:` restatement is needed at a call
site. After this migration application code does not know that success happens to be green; it
knows the word.

**Colour is never the only signal.** Every status carries a redundant channel — a word, an icon, a
shape — and status is never a stroke on a container: a status `Badge` and a destructive `Alert`
keep `border-transparent` and say it with the surface and the ink.

Every component with a status state wears the same pair: the Badge's status variants, the
destructive `Button` and `Alert`, a destructive menu item under focus, a failed `Attachment`'s
media, and the Toaster's typed toasts (`toast.success`, `toast.error`…).

### The Badge's status variants

`success`, `warning`, `info` and `destructive` share one recipe: the status's surface role, its ink
role, a focus ring at matching opacity, and a `/15` step of the ink for the anchor hover. `quiet`
is `muted` — a state that exists without asking for attention. Geometry is untouched by every
variant.

## Action hierarchy

Six Button variants, one intent each: `default` (the one dominant action in a view), `outline`,
`secondary`, `ghost`, `destructive` (the action that ends something), `link`. Sizes are `default`,
`xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg` and `inline` — the last one `h-auto p-0`
for a link button inside a sentence.

**A Button does not submit a form unless asked.** A native `<button>` renders `type="button"` by
default; `<Button type="submit">` is the explicit opt-in. With `asChild` the child keeps its own
semantics and no `type` is forced onto it. `tests/components/button.test.tsx` holds all three.

**A status is not a step in the action hierarchy.** There is no `success` Button; a saved form
reports itself with a toast or a Badge while its button stays `default`.

## Status and feedback

- **Badge** — a state belonging to a row, a card or a heading, that stays on screen.
- **Alert** — a condition about the surface the reader is looking at, in place. `default` and
  `destructive`; no informational or settled Alert.
- **Toaster** and `toast` — the outcome of something the reader just did.
- **Progress** — how much of a known quantity is done. No polarity, no variant; it forwards its
  `value` to the Radix root so `aria-valuenow` is announced with nothing asked of the caller.

## Surfaces, borders and focus

`background` is the page; `card` holds content that sits in place; `popover` holds anything that
floats and closes; `muted` recesses. Elevation is a ring plus a resting shadow, never a coloured
border. A menu, select or combobox paints on `popover` and follows the page from light to dark;
the tooltip is `bg-foreground text-background`, which flips by construction.

The base layer applies `border-border` and `outline-ring/50` to every element — the outline's
**colour only**. Focus geometry belongs to the component: each focusable one carries its own
`focus-visible:ring-3 focus-visible:ring-ring/50`, and the stylesheet declares no `:focus-visible`
rule, because one blanket declaration is how thirteen components' rings were once overridden at
once. `tests/theme/tokens.test.ts` asserts that absence.

## Typography

One family for prose, Geist, through `--font-sans`, bundled offline through
`@fontsource-variable/geist`. `font-heading` resolves to the same face and survives as a hook on
`h1`–`h4`.

`font-mono` is Geist Mono, declared as `--font-mono: "Geist Mono Variable", monospace` and bundled
the same way through `@fontsource-variable/geist-mono`. It marks machine-shaped content —
identifiers, hashes, measurements, a path, a commit — and prose never wears it. Applying it stays a
call-site decision: no base rule puts it on `code` or `pre`, because a `<code>` inside a sentence
is often prose about code rather than code.

Sizes come from Tailwind's scale; there is no custom type-scale token.

## State attributes

Radix sets `data-state="open|closed|active|…"` and `data-orientation="horizontal|vertical"`. Base
UI sets bare `data-open`, `data-closed`, `data-highlighted`, `data-empty`. Both set a bare
`data-disabled`. Two libraries, two spellings for one state — and a component here writes neither.

**shadcn's variant layer sits under all of it**, vendored in `src/theme/shadcn.css`. It declares
`data-open`, `data-closed`, `data-checked`, `data-unchecked`, `data-selected`, `data-disabled`,
`data-active`, `data-horizontal` and `data-vertical` so that each matches *both* spellings —
`[data-state="open"]` and a bare `[data-open]` — and excludes an explicit `"false"`. That last
clause is why the layer is load-bearing rather than convenient: `SidebarMenuButton` renders
`data-active="false"` for an inactive item, Tailwind's built-in `data-active:` variant matches on
presence alone, and without the layer every item would be styled active.

**Those variants are the spelling.** `data-open:`, never `data-[state=open]:`; `data-horizontal:`,
never `data-[orientation=horizontal]:`; `group-data-disabled/field:`, never
`group-data-[disabled=true]/field:`. One name covers the Radix surface and the Base UI one, so
Dialog and Combobox read alike and a component that changes libraries changes no class. A bracket
survives in exactly two places: a state the layer declares no variant for — Tooltip's
`data-[state=delayed-open]:`, Table's `data-[state=selected]:`, Sidebar's `data-[state=collapsed]:`
— and an attribute that is not a state at all, `data-[slot=…]`, `data-[variant=…]`, `data-[size=…]`,
`data-[side=…]`, `data-[collapsible=…]`.

The breadth is bought with specificity. `:where()` carries none, so `data-open:bg-accent` weighs a
single class where `data-[state=open]:bg-accent` weighed a class and an attribute. It still wins
over an unqualified utility, which Tailwind emits earlier in the layer, and it still loses to a
`group-`/`peer-` qualified rule. What changes is that `hover:`, `focus-visible:` and `disabled:`
now win on a property they share with it — which is the order a control wants: the pointer and the
focus ring are about the here and now, and the state is the background they play against.

`shadcn.css` is never edited. Anything of ours — `cn-rtl-flip`, which the registry's components
name and shadcn defines nowhere — is declared in `styles.css` after the import.
`tests/theme/shadcn.test.ts` holds the copy identical to the installed package.
## Motion

An **enter** animation is free to play: the surface it introduces did not exist a frame ago. An
**exit** animation is not, and the difference is not taste. While an exit animation runs, Radix
keeps the closed surface mounted and its dismissable layer with it, so a press meant to open the
next menu is read as an interaction outside the closing one and swallowed.

**A surface whose trigger can be pressed again on the next frame leaves on the frame it is
dismissed.** That is `DropdownMenuContent` and `DropdownMenuSubContent`, `ContextMenuContent` and
`ContextMenuSubContent`, and `PopoverContent`: none of them carries an exit animation. The test for
each one gives any exit-animation utility a real `animation-name` and a live `getComputedStyle`, so
a surface that lingers fails the way it does in a browser — the next press does not land — and each
file first proves the fixture bites on that component before reading its absence as a pass.

A surface whose trigger *cannot* be pressed again straight away keeps its exit animation: a
dialog's, a sheet's, a drawer's, a tooltip's, a hover card's. The reader has to move a pointer or
find the trigger again, and the frames the animation costs are frames nobody was waiting on.
`TooltipProvider` defaults `delayDuration` to `0`.

`prefers-reduced-motion` sits above all of this: the base layer collapses every animation and
transition to a single frame under that query, so no component opts in.

## Accessibility

- **Semantic HTML.** Real `<button>`/`<a>`, native controls, one `<h1>` and a hierarchy under it.
- **Keyboard parity.** Everything a pointer can do, the keyboard can do; arrow keys move inside
  composite widgets. Radix and Base UI guarantee it; the tests exercise it.
- **Focus is always visible**, per *Surfaces, borders and focus*.
- **No colour-only communication.**
- **A component announces its own state.** `Progress` forwards `value`; Dialog and Sheet are
  labelled by their title and described by their description through Radix's own ids.
- **Field is anatomy, not wiring.** `Field`, `FieldLabel`, `FieldDescription`, `FieldError` and
  the rest give a control its structure and layout. The relationships are the call site's, written
  explicitly:

  ```tsx
  <Field data-invalid>
    <FieldLabel htmlFor="name">Name</FieldLabel>
    <Input id="name" aria-describedby="name-hint name-error" aria-invalid />
    <FieldDescription id="name-hint">Shown on your profile.</FieldDescription>
    <FieldError id="name-error">Required</FieldError>
  </Field>
  ```

  `FieldError` renders `role="alert"`; `Field` renders `role="group"` and styles
  `data-invalid`. Nothing generates `aria-describedby` or `aria-invalid` for you. A form library
  integration that does is a higher-level pattern for a product to write, and to promote here only
  when two products share it.

## Adding a component

**From the registry**, which is the usual road:

```
pnpm dlx shadcn@latest add <name>
```

The CLI reads `components.json`, writes `src/components/<name>.tsx` with `@/` imports, brings any
hook the item depends on into `src/hooks/`, and may write into `src/theme/styles.css` if the item
carries `cssVars`. Read the whole diff before anything else: the stylesheet is the token contract,
and a variable the CLI adds there is a role to be declared properly in `:root`, `.dark` and
`@theme inline` — or removed. An existing component is **never reinstalled**; the CLI's overwrite
prompt is answered no.

Then the component is adapted, whichever road it came by:

1. **Behaviour comes from Radix or Base UI**, wrapped. Hand-rolling a floating surface from a
   `<div>` will be wrong in ways that only show up on a keyboard or a screen reader.
2. **Spell colour only through the roles.** A component never names a palette step; a closed
   scale produces nothing, and a literal in a class fails lint. A registry item that names a Tailwind palette colour
   is rewritten to a role.
3. **Put the geometry in the component**, on the radius scale and Tailwind's spacing scale.
4. **Draw from `lucide-react`**, sized by the component that contains the icon. A component
   imports lucide directly; `@robomous/ui-core/icons` is the consumer's door to the same set.
5. **Give it `data-slot`**, and a `className` that merges last through `cn`.
6. **Hold it to the rules above**: a button renders `type="button"` unless asked (*Action
   hierarchy*), a menu surface carries no exit animation (*Motion*), status is never a stroke on a
   container (*Status vocabulary*).
7. **Export it by name from [`src/index.ts`](../src/index.ts).** The surface is one file, read top
   to bottom; `export *` is not used.
8. **Test the behaviour a screen would silently lose**, in `tests/components/`: roles, focus,
   `aria-*`, the form or pointer outcome. Not the class string.
9. **Give it a page in the docs site**: `examples/catalog/src/content/components/<name>.mdx` with
   a demo per state under `examples/catalog/src/demos/<name>/`, and a row in
   `docs/components/README.md`. The API table is generated from the source; the extractor test
   fails until the page exists.

If a caller wants something the component does not offer, the answer is a prop or a variant *in
the component*, never a class string spread onto it from the call site.

## Per-consumer extensions

A consumer that needs its own role declares it in its own stylesheet after
`@import "@robomous/ui-core/styles.css";` — a value in `:root`, a counterpart in `.dark`, exposure
through `@theme inline` — and never shadows a name declared here. A consumer may not reach past
its own layer to restyle a component here, and a component here may not encode a product's
decision. An extension that turns out to be universal is a PR against this repository with the
justification written into this file.

## Verification

| What | Where |
| --- | --- |
| No literal colour in a class | `eslint.config.js`, `pnpm lint` |
| Both themes declare every role and nothing else, and `.dark` repoints rather than repeats; the palette keeps its eighteen scales and closes the rest; the grey roles resolve through `neutral`; the fonts and every radius step are declared; no `:focus-visible` rule | `tests/theme/tokens.test.ts` |
| The vendored shadcn layer is identical to the installed package, committed, imported, and a dev dependency only | `tests/theme/shadcn.test.ts` |
| Button type, Dialog/Sheet/Drawer focus and dismissal, Field's explicit contract, menu and popover dismissal, Tabs, Select, Progress, Combobox, Command, RadioGroup and ToggleGroup selection, Checkbox and Switch state, Slider thumbs and their names, Accordion and Collapsible disclosure, Breadcrumb and Pagination landmarks, Toaster theme, Sidebar toggling and its mobile Sheet | `tests/components/*.test.tsx` |
| The packed tarball installs, its stylesheet compiles under a real Tailwind with the components' utilities, shadcn's layer and no physical palette, its entry imports and renders (Sidebar included, through the rewritten alias), `dist/` carries no `@/` import, `shadcn` is not a runtime dependency, a Button-only bundle stays small, `./icons` re-exports lucide and one icon bundles as one | `tests/package/consumer.test.ts` |
| The harness itself | `tests/harness.test.tsx` |

`pnpm verify` runs format, lint, typecheck, the behaviour tests, the build, the docs site, and the
packed-consumer test, in that order; the release workflow refuses to publish anything that has not
passed it.
