# Robomous design foundations

## Purpose and Ownership

This package owns its components. Not a copy of them, not a styled wrapper around something it
must leave intact — the twenty-one files in `src/components/` are this repository's to edit, and
a change to one of them needs a reason, a test and a review, which is the same thing every other
file here needs. A component here is **written, not generated**: it is ordinary source, and the
only thing that separates it from a screen's own component is the set of rules below.

This document is not a component catalogue. A component's anatomy, its variants and its class
strings are read from `src/components/`, where they live, rather than transcribed here where they
would go stale. What this document governs is the smaller and more durable thing: **the rules
this package holds itself to** — where a colour may be spelled, where a token may live, what the
brand paints, which vocabulary a status speaks. Where a rule is machine-checked the gate is
named, because a rule nothing checks is a preference.

**This package owns its components; consumers own their extensions.** A consumer's domain
components, screens, navigation and product behaviour are the consumer's own, governed in the
consumer's repository — see *Per-consumer extensions*, which is the contract two downstream
repositories run on today.

## The Rules, and the Gate That Holds Each

Seven rules, and each one has a gate that holds it. The gates are ordinary vitest files under
`src/gates/`, so `pnpm test` runs them with everything else; there is no second test command.

| Rule | Held by |
| --- | --- |
| Never a colour inside a class string | `colouredClassesIn`, run by [`src/gates/tokens.test.ts`](src/gates/tokens.test.ts) over every tracked `.ts`, `.tsx` and `.css` |
| The brand colour is identity; it paints nothing here | `brandUsagesIn`, same file, asserted against an empty list of sites |
| The tokens have exactly one home, the stylesheet | Same file refuses a `tailwind.config.*` anywhere in the tree; [`src/theme/tokens.test.ts`](src/theme/tokens.test.ts) holds the TypeScript mirror to it declaration for declaration |
| One icon set, and only one | Same file, over every manifest and every import |
| The status palette lives in `Badge` and `statusTone`, nowhere else | `statusPaletteIn`, run by [`src/gates/design.test.ts`](src/gates/design.test.ts) over the package's own sources |
| No rival colour family stands in for the status palette | `competingStatusPaletteIn`, same file |
| Every component module is part of the public surface | Same file, comparing `src/components/` against the exports in `src/index.ts` |

Each scanner is a pure function over one file's text, so its own test proves it twice: once on
fabricated input that must be caught, once on input that merely resembles a violation and must
pass. A gate that cannot be shown to fail is not evidence.

**The scanners are published**, because the rules do not stop at this package's edge. A consumer
imports them and runs the same scans over its own sources, with its own extension registry:

```ts
import { colouredClassesIn, foundationTokenNames } from "@robomous/ui-core/gates";
```

`@robomous/ui-core/gates` exports exactly eight things — the four scanners above, three CSS
readers (`blockBody`, `rawDeclarations`, `declarations`) that a consumer needs to parse its own
stylesheet the way this package parses its own, and `foundationTokenNames()`, which reads the
token names off the shipped stylesheet so a consumer can assert that none of its extensions
shadows one.

A rule stated in this document that no gate holds is a rule under review, not an exemption.

## Tokens

**The tokens have one home: [`src/theme/styles.css`](src/theme/styles.css).** Tailwind v4 is
CSS-first, so the stylesheet is not a mirror of a config — it *is* the config, and every utility
in this package and in every consuming app resolves through it. There is no `tailwind.config.js`
in this repository and there must not be one: a second file declaring the same names would win
for some utilities and not others, and the failure would read as a styling bug rather than as
two sources of truth.

[`src/theme/tokens.ts`](src/theme/tokens.ts) is that stylesheet as TypeScript, for the two kinds
of caller that cannot read CSS — a `<canvas>` or `<svg>` that needs a colour as a string, and a
test. It is a mirror, never a second definition: `src/theme/tokens.test.ts` parses the
stylesheet's `:root`, `.dark` and `@theme inline` blocks and asserts the two agree declaration
for declaration, in both directions, so a value added to one and forgotten in the other fails.

Both themes are declared in full, which is what makes switching theme a variable swap rather
than a cascade. Every rule in this document is therefore written against a **role** rather than
a light-mode value: "the page" resolves per theme and is never asserted to be white.

**Radius is a value, not a setting.** `--radius: 0.625rem` lives in the stylesheet, and every
step derives from it in `@theme inline` (`radius-sm` at `× 0.6` through `radius-4xl` at `× 2.6`).
No arbitrary radius appears outside that scale. A design value belongs where it runs: written in
the stylesheet it is one declaration every utility resolves through, and written anywhere else it
is documentation that drifts from the thing it describes.

**The variant layer.** [`src/theme/tailwind.css`](src/theme/tailwind.css), imported by the
stylesheet ahead of the token blocks, declares the `data-*` variants the components' state styles
qualify on — `data-open`, `data-closed`, `data-active`, `data-disabled` and the rest. Each matches
both the `data-state="open"` attribute the behaviour libraries set and the bare `[data-open]`
form, which is the reason it is declared rather than left to Tailwind's own shorthand: the
shorthand covers only the bare attribute, so it would emit a rule for every state style in the
package and match none of them. That failure is silent — the CSS compiles and the components stop
reacting — so `src/theme/imports.test.ts` asserts the file both exists and is committed.

## Color and Theme

The semantic names are the only vocabulary. There is no second layer (`surface`, `error`,
`foreground-secondary`) and no alias renaming what a token already means — `destructive` stays
`destructive`. Two roles are worth restating because they are the two that get confused:
`primary` is the one high-emphasis colour, and `accent` is the interactive hover/focus surface,
the token a row or a menu item lights up with and never what a button fills with.
`chart-1`…`chart-5` identify a series, never a status.

**Never a colour inside a class string.** `bg-[#eb5a47]`, `text-[rgb(...)]`,
`ring-[var(--something)]` — all of them put a colour where the token contract cannot see it, and
`colouredClassesIn` refuses them across the whole tree. An arbitrary value that is *not* a colour
stays legal, because the rule is about colour: a one-off `translate-y-[3px]` is geometry. The one
sanctioned exception is a `color-mix` whose arguments are all tokens — the Button's own hover
step is one — because mixing two tokens names no colour of its own.

**The one name** beyond that vocabulary is `brand`: Robomous orange, identity only.

### Where the brand is

Robomous orange — `oklch(0.663 0.205 39.9)`, `#F5580B` — is identity: a wordmark, and the
styleguide swatch that shows the value off. It is not a functional-UI colour, and a control
reaching for it is a semantic-colour violation however many other sites already use it correctly.

It measures 3.34:1 against `background`, which clears 3:1 for large text and non-text marks and
misses 4.5:1 for body copy. A wordmark is exempt from that threshold; a button label would not
be, which is the contrast argument for the rule the paragraph above states on other grounds.

**This package has zero brand sites.** It declares the `--brand` token and never paints with it;
`brandUsagesIn` is asserted against an empty list, so the first `bg-brand` written here fails.
Brand sites are a consuming app's decision, enumerated and gated in that app's own repository.

### Menus and the page's palette

A menu, select or combobox surface paints on the same `popover` tokens as the page around it,
and follows that page from light to dark. The alternative — giving each floating surface the
literal `dark` class — makes a panel the dark theme's `popover` whatever the page is doing, and
in a light application it arrives as a black rectangle that reads as a different product. The
tooltip is not a counterexample: it is painted `bg-foreground text-background`, which flips by
construction, because one line of text has no palette of its own to keep in step. Menu items
highlight with `accent`, the token every other hover state uses.

## Status Vocabulary

**Four names, and one place each of them is spelled.**

`Badge` carries the four status variants — `success`, `warning`, `info`, `quiet` — and
[`src/theme/statusTone.ts`](src/theme/statusTone.ts) carries the tones for everything that is not
a chip. Those two files are the entire vocabulary. A third file naming the same colour family is
not a use of the palette; it is a fork of it, which is why `statusPaletteIn` scans for the family
and allows exactly `badge.tsx`, `statusTone.ts` and `statusTone.test.ts`.

The reason is not tidiness. A status hue spelled in two places drifts, and it drifts silently:
the second spelling looks correct in isolation and only reads as wrong beside the first, on a
screen neither author was looking at. Held to one place, "warning" is a name, and its value is a
detail.

### The Badge's four status variants

| Variant | Reads as |
| --- | --- |
| `success` | emerald — settled |
| `warning` | amber — waiting on a person |
| `info` | sky — informational |
| `quiet` | muted — a state that exists without asking for attention |

Each hue is the `destructive` recipe on another family: a `/10` surface, ink at `700` (`400` in
dark), a focus ring at matching opacity, a hover step for the anchor case. `quiet` is the one
that is not a hue — the absence of one. **Geometry is untouched**: every status variant keeps the
base string's height, padding, type size, radius and transparent hairline, and names no size, no
radius and no border colour. `src/gates/design.test.ts` asserts each of the four paints a soft
surface and readable ink and never a coloured stroke.

### The status palette

One family, five roles: **emerald** settled, **amber** waiting on a person, **sky**
informational, **muted** no signal, **destructive** failed. Those three hues are the only colour
families outside the semantic tokens, and the treatment is always **soft surface plus moderate
ink**, so a chip carries a hue without competing with `primary`. **No rival family** — `green`,
`lime`, `teal`, `yellow`, `orange`, `blue`, `cyan`, `red` — appears anywhere;
`competingStatusPaletteIn` holds that half, because a rule with one allowed spelling is only
enforceable if the near-misses are refused too.

**Screen authors never pick a shade.** A status takes a Badge variant, or reads its colour from
`statusTone.ts`, whose utilities are written out whole rather than assembled — Tailwind scans
source *text*, so a class built at runtime is a rule the build never emitted, and the failure is
silent:

| Export | Values | Use |
| --- | --- | --- |
| `StatusTone` | `neutral · accent · success · warning · destructive` | The type every tone-taking prop speaks |
| `TONE_BORDER` | `border-emerald-500 dark:border-emerald-400`, `border-amber-500 dark:border-amber-400`, `border-border`, `border-primary`, `border-destructive` | A tone's stroke, where the stroke is the mark |
| `TONE_FILL` | `bg-emerald-500 dark:bg-emerald-400`, `bg-amber-500 dark:bg-amber-400`, `bg-muted-foreground`, `bg-primary`, `bg-destructive` | A solid mark — a dot, a timeline cell — where a `/10` surface would vanish at 4px |
| `STATUS_INK` | `text-emerald-700 dark:text-emerald-400`, `text-amber-700 dark:text-amber-400`, `text-sky-700 dark:text-sky-400` | An icon or a run of inline text carrying a status |

There is **no `info` token** and no `success`/`warning` token. A status hue is a Badge variant or
a `statusTone` entry, so it is spelled once; adding a token for one is a design decision to make
here first. Status Badge contrast is measured against page and card surfaces — on a full
`bg-muted` panel the warning ink measures ~4.3:1, so a status Badge is not placed on a muted
panel without a re-check.

## Action Hierarchy

Six Button variants, one intent each:

| Variant | Intent |
| --- | --- |
| `default` | The one dominant action in the view |
| `outline` | A supporting action that still reads as a control |
| `secondary` | A filled second weight, quieter than `default` |
| `ghost` | An action inside dense chrome — toolbars, rows, icon-only controls |
| `destructive` | The action that ends something |
| `link` | Navigation wearing a control's affordance |

Sizes are `default`, `xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`, and `inline`.
`inline` is the odd one and earns its place: `h-auto p-0`, for a `link` button that lives inside
a sentence or a table cell, where a control's height and padding would push the line apart.

**One dominant action per view**; which action that is on which screen is a consumer's product
behaviour.

**A status is not a step in the action hierarchy.** `success` describes an outcome, never a
control's emphasis, and there is no Button variant for it — a saved form reports itself with a
toast or a Badge while its button stays `default`.

## Status and Feedback

- **Badge** — a state belonging to a row, a card or a heading, that stays on screen.
- **Alert** — a condition about the surface the reader is looking at, in place.
- **Sonner** (`Toaster`, mounted `position="bottom-right"`) — the outcome of something the
  reader just did, which does not need to persist.
- **Progress** — how much of a known quantity is done. It carries **no polarity**: there is no
  variant, and a failing job is not a red bar. The words beside it say what happened.

**Colour is never the only signal.** Every status carries a redundant channel — a word, an icon,
a shape.

## Alerts

The anatomy, and only it: `Alert`, `AlertTitle`, `AlertDescription`, `AlertAction` — a title is a
child, never a prop. Variants are `default` and `destructive`; there is no informational or
settled Alert, because a condition worth interrupting the page for is either neutral or bad.

An Alert's border is **structural**: `default` takes the card surface, and `destructive` keeps
that same surface, recolouring only the ink. No saturated surface, no coloured stroke. An Alert
that needs to shout is a copy problem.

## Surfaces, Borders, and Elevation

`background` is the page; `card` holds content that sits in place; `popover` holds anything that
floats and closes; `muted` recesses. A component picks one — it does not compose a fill.
Elevation is a ring plus a resting shadow, never a coloured border and never a gradient.

**Borders are structural**: a hairline separates or contains. **Status is not a stroke** — no
status is communicated by recolouring a border, which is why every status Badge keeps
`border-transparent`, and why `TONE_BORDER` exists only for marks whose whole body *is* the
stroke. `outline` on its own, Badge or Button, takes `border-border`, because `outline` means
"bounded", not "notable".

### Borders and focus

The base layer applies `border-border` and `outline-ring/50` to every element, naming the
outline's **colour only**. Focus *geometry* belongs to the component: one blanket
`:focus-visible` declaration in the stylesheet overrides every component's ring at once and wins
on layer order, so each focusable component carries its own `focus-visible:ring-3
focus-visible:ring-ring/50` instead. `src/theme/tokens.test.ts` asserts that absence, because the
absence is the point — a single global rule is how thirteen components' rings got overridden at
once. Focus is never removed and never colour-only.

## Typography

- **One family: Geist**, through `--font-sans`, bundled offline through
  `@fontsource-variable/geist`. No runtime fetch to a font host, ever.
- **`font-heading` survives as a hook, not a difference.** It resolves to `--font-sans`, so a
  heading is the same face at another size and weight; `h1`–`h4` carry it in the base layer, so a
  later decision to split the families again lands in one declaration.
- **One justified technical role: `font-mono`**, on Tailwind's default stack. It marks
  machine-shaped content — identifiers, hashes, model references, measurements. Prose never
  wears it.
- Size and weight come from the component, or from Tailwind's ordinary scale. There is no custom
  type-scale token, and `src/theme/tokens.test.ts` keeps the retired ones retired.

## Density, Spacing, and Radius

Two scales answer two questions, and conflating them is the anti-pattern this section exists to
prevent. **Component geometry belongs to the component**: a control's height, padding and
internal gaps are set once in `src/components/`, not per screen, and this document does not
restate them. **Page and layout rhythm is the consumer's own composition**, on Tailwind's
ordinary spacing scale: `p-6`, `gap-4`, `space-y-8`. Dense where the content is plural — data
surfaces show more of the thing the reader came for; generous where prose and forms are read one
thing at a time.

Radius derives from `--radius`, per *Tokens*.

## Icons

`lucide-react` is the set, and the only one. No manifest declares a second icon library and no
source imports one; `src/gates/tokens.test.ts` refuses one that reappears in either place. The
rule is *one* set rather than one particular set — what costs a reader is two of them on a
screen, where the same idea arrives at two weights and two grids. Changing which one is a
decision to make here, not a dependency to add. Icon size comes from the component that contains
the icon; a call site does not resize an icon to fit a control it did not measure.

## Motion

Motion orients or confirms, and never stands between somebody and their next action. An
**enter** animation is free to play: the surface it introduces did not exist a frame ago, so
nothing is waiting on it. An **exit** animation is not, and the difference is not taste.

**A menu leaves on the frame it is dismissed.** While an exit animation runs the content stays
mounted and the dismissable layer with it, so a press meant to open the next menu is read twice —
as the open, and as an interaction outside the closing surface — and the two cancel. At a 100ms
exit that window covers the gap between an `Escape` and the click after it, which a fast hand
meets routinely. `DropdownMenuContent` therefore has no exit animation, in its own base classes,
as its default. A surface whose trigger cannot be pressed again straight away — a dialog's, a
tooltip's — keeps its exit animation. `TooltipProvider` defaults `delayDuration` to `0`; a screen
wanting the debounce sets it on the provider.

`prefers-reduced-motion` sits above all of this: the base layer collapses every animation and
transition to a single frame under that query, so no component opts in.

## Accessibility

- **Semantic HTML.** Real `<button>`/`<a>`, native controls, lists as lists, one `<h1>` and a
  meaningful hierarchy under it.
- **Keyboard parity.** Everything a pointer can do, the keyboard can do — logical tab order,
  arrow-key movement inside composite widgets.
- **Focus is always visible**, per *Borders and focus*: never removed, never colour-only.
- **No colour-only communication.** Status, selection, validity and provenance each carry a
  redundant channel.
- **A component announces its own state.** `Progress` forwards its `value` to the underlying
  Radix root, so `aria-valuenow` is emitted from `<Progress value={42} />` with nothing asked of
  the caller. The general form of that rule is in *Why the Patch Layer Is Gone*, and it is the
  sharpest argument in this document.
- **Field anatomy carries the wiring.** `Field`, `FieldLabel`, `FieldDescription`, `FieldError`,
  `FieldGroup`, `FieldSet`, `FieldLegend`, `FieldContent`, `FieldTitle`, `FieldSeparator`: a
  description and an error are subcomponents, so `aria-describedby` and `aria-invalid` come from
  the component rather than from a screen remembering.
- **Dialog and Sheet keep their full anatomy** — trigger, overlay, content, header, title,
  description, footer, close. Focus trap and return, `Escape`, and the labelled-by relationships
  are Radix's guarantees, which is why nothing here is hand-rolled from a `<div>`.

## Adding a Component

A component is a file in `src/components/`, written here. There is no generator to run and
nothing to reconcile against: the work is designing the API and then holding it to the rules
above.

1. **Take behaviour from Radix or Base UI**, and wrap it. Focus trap and return, `Escape`, arrow
   movement, the `aria-*` relationships and the `data-state` attributes the variant layer keys
   off are theirs to guarantee. A floating surface, a menu or a composite widget hand-rolled from
   a `<div>` will be wrong in ways that only show up on a keyboard or a screen reader.
2. **Spell colour only through the tokens** — `bg-primary`, `text-muted-foreground`. Never a
   literal in a class string, never a second name for something the vocabulary already covers.
3. **Put the geometry in the component.** Height, padding, gaps and radius are decided once,
   here, on the radius scale — not passed in by a screen.
4. **Draw from `lucide-react`,** and size the icon from the component that contains it.
5. **Give it `data-slot`,** the hook a parent uses to reach a child's layout without knowing its
   internals, and a `className` that merges last through `cn` so a consumer can adjust without
   fighting specificity.
6. **Export it from [`src/index.ts`](src/index.ts).** The surface is listed name by name rather
   than re-exported wholesale, which is what keeps the promise auditable — and is also how a
   finished component can sit in the directory reaching nobody. `src/gates/design.test.ts`
   compares the two and fails naming what it cannot import.
7. **Test the behaviour a screen would silently lose**, in
   [`src/components/components.test.tsx`](src/components/components.test.tsx): the `className`
   merge, `asChild`, the announced error, the state a consumer reads. Appearance is not what
   these tests are for; the behaviour a caller depends on is.

**Where a decision goes.** If a caller wants something the component does not offer, the answer is
a prop or a variant *in the component* — never a class string spread onto it from the call site.
The reasoning is in *Why the Patch Layer Is Gone*, and it is the same either way: if the addition
reads as a decision the caller is making, it is a prop; if it reads as a limitation, it is a
defect, and the component is right here to fix.

## Why the Patch Layer Is Gone

Four helper modules used to live in `src/lib/`, and they are worth a section because they are the
clearest evidence for everything above.

| Helper | What a caller spread onto a component | Why it existed |
| --- | --- | --- |
| `menuSurface` | class overrides on every `DropdownMenuContent` | the component's base classes were not editable |
| `twoLineTrigger` | class overrides on a `SelectTrigger` | a variant could not be added to `SelectTrigger` |
| `inlineLink` | class overrides on a `Button` | a size could not be added to `Button` |
| `progressAria` | `aria-*` attributes on a `Progress` | `Progress` could not be fixed |

**None of the four described a decision the caller was making. All four described a limitation.**
That is the tell, and it is a general one: a helper whose name answers "what did the author
decide?" is a real abstraction, and a helper whose name answers "what could the author not reach?"
is a workaround wearing an abstraction's clothes. The second kind spreads — every call site has to
know about it, no call site is reminded to, and the module's existence looks like design rather
than like a bill coming due.

Once ownership was real, all four evaporated into the components they had been patching from
outside:

- `menuSurface` became `DropdownMenuContent`'s base classes. A menu sizes to its items rather
  than to its trigger, and does not animate on the way out. Both are now the default, so there is
  nothing to remember and nothing to forget.
- `twoLineTrigger` became `<SelectTrigger multiline>`. A boolean prop, orthogonal to size,
  because "let the value wrap" is a decision the caller genuinely makes.
- `inlineLink` became `<Button variant="link" size="inline">`. It was always a size; it just could
  not be written where sizes live.
- `progressAria` became a one-line fix: `Progress` now passes `value` through to the Radix root.

**`progressAria` is the sharpest case, and it was not a styling workaround.** `Progress`
destructured `value` out of its props to compute the indicator's `translateX` and then never
forwarded it — and the Radix root is what derives `aria-valuenow` from `value`. The component
therefore announced nothing to assistive technology. The helper made every caller repeat the
number by hand, and **no gate existed to catch a caller who forgot**: accessibility was opt-in,
per call site, silently. A defect in a component that could not be edited became a chore
distributed to everyone who used it.

`src/lib/` no longer exists. The rule this leaves behind: **when a call site is patching a
component from the outside, the fix belongs in the component.** If the patch reads as a decision
the caller is making, give it a prop or a variant. If it reads as a limitation, it is a defect,
and the component is right here.

## Per-consumer extensions

This package's `:root` carries the semantic vocabulary plus `brand`, and nothing else. A
consumer that needs its own vocabulary extends in its own repository, never here:

1. Declare the variable in the consumer's stylesheet, after
   `@import "@robomous/ui-core/styles.css";` — a value in `:root`, a dark counterpart in `.dark`,
   exposure through `@theme inline`, the same three steps every name here takes.
2. Mirror it in the consumer's token module and register it in the consumer's extensions list.
3. Gate it: import the parsers and `foundationTokenNames()` from `@robomous/ui-core/gates` and
   assert (a) the consumer's stylesheet and token module agree declaration-for-declaration, and
   (b) no extension name shadows one of this package's.

A consumer may not reach past its own layer to restyle a component here, and a component here may
not encode a screen's decision. An extension that turns out to be universal is a candidate to move
into this package — that is a design decision and a PR against this repository, with the
justification written into this file.

## Verification

One command, `pnpm test`, runs everything: the component behaviour tests, the token contract, and
the gates.

| File | Holds |
| --- | --- |
| [`src/gates/tokens.test.ts`](src/gates/tokens.test.ts) | No colour in a class string; the brand paints nothing here; the tokens have one home; one icon set |
| [`src/gates/design.test.ts`](src/gates/design.test.ts) | The status palette lives only in `Badge` and `statusTone`; no rival colour family; each status Badge variant is a soft surface and readable ink, never a stroke; every component module is exported |
| [`src/theme/tokens.test.ts`](src/theme/tokens.test.ts) | `styles.css` and `tokens.ts` agree declaration for declaration; the radius scale derives; no retired token has returned; no stylesheet-level focus geometry |
| [`src/theme/imports.test.ts`](src/theme/imports.test.ts) | Everything `styles.css` imports resolves: each package is installed and exports the file it names, each sibling exists and is committed |
| [`src/components/components.test.tsx`](src/components/components.test.tsx) | The behaviours a screen would silently lose — the `className` merge, `asChild`, the announced error, and the four components whose API this restructure changed |

Consumers run the same vocabulary scans over their own sources with the helpers published at
`@robomous/ui-core/gates`.
