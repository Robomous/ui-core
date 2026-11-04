# Migrating to @robomous/ui-core 0.6

No export, prop or variant key was removed or renamed, and no default variant changed: 0.5 code
still type-checks. What 0.6 changes is how the kit looks — it moves to Inter and a denser,
12px-first scale — and a few defaults a screen may lean on. Section 1 lists the ones that can
need an edit; section 2 is what changes without one.

## 1. Check these

### Inter replaces Geist as the sans face

`@fontsource-variable/geist` is no longer a dependency; `@fontsource-variable/inter` is.
`--font-sans` (and `--font-heading`, which aliases it) is `"Inter Variable", sans-serif`.
`--font-mono` is still Geist Mono.

An app that imports `@fontsource-variable/geist` itself, or writes `font-family: "Geist
Variable"`, now has to depend on the package on its own. Text meant to follow the kit uses
`font-sans` or `var(--font-sans)`.

### SidebarProvider restores its last state

`defaultOpen` no longer defaults to `true`. With neither `defaultOpen` nor `open`, the provider
reads the `sidebar_state` cookie it has always written, so a returning user can land on a
collapsed sidebar. To keep the old behaviour, pass `defaultOpen`. `persist={false}` stops the
cookie, and `keyboardShortcut` (`"b"` by default, `false` to drop) is new.

### Table has a card around its scroller

The border, radius, `bg-card` and focus ring moved from `div[data-slot=table-container]` to a new
`div[data-slot=table-card]` around it; the container only scrolls, and is focusable only while it
overflows. CSS that styled `table-container` targets `table-card`. Column rules are gone: a site
that wants them writes `border-r` on its cells.

### CardFooter no longer paints itself

It was `border-t bg-muted` and the card dropped its bottom padding for it. Now it is a plain row
and the card keeps its padding. A footer that should keep the band writes
`className="border-t bg-muted"`.

### Alert is one quiet box

`info`, `success`, `warning` and `destructive` keep their keys and roles, but only the icon takes
the status colour; the box, title and description no longer tint. `AlertAction` is a grid cell
at the trailing edge instead of `absolute top-2 right-2`, so a site that positioned its own action
drops those classes.

### Toasts are a neutral card

The Toaster no longer sets `richColors` or the `--success-bg`-style variables, so overriding them
does nothing. Status is an 18px filled icon on a neutral 400px card. `closeButton` is on by
default; a toast with its own `cancel` hides the X.

### Accordion draws its own frame

`Accordion` is `rounded-md border overflow-hidden` and an open item takes `bg-muted/50`. A site
that wrapped it in its own border now shows two.

### Textarea no longer resizes

It wears `resize-none` and grows with its content. For a manual handle: `className="resize-y"`.

### Smaller edges

- `Sheet` left and right are back to 384px (`sm:max-w-sm`), undoing 0.5's 520px.
- `Label`, `FieldTitle`, `FieldLabel` and `InputGroupAddon` dim on `data-disabled="true"`. React's
  `data-disabled={true}` renders that; a hand-written bare `data-disabled=""` no longer dims.
- `Progress` clamps to 0–100 and takes `max` (default 100).

## 2. Visual changes, no edit needed

- **Scale.** Most components move from `text-sm` to `text-xs/relaxed` and from `rounded-lg` to
  `rounded-md`. Controls are 4px shorter: Button 28px by default (xs 20, sm 24, lg 32), Input,
  Select and InputGroup 28px, Toggle 28px.
- **Focus.** Controls ring at `ring-2 ring-ring/30`.
- **Overlay.** `--overlay` is `oklch(0.145 0 0 / 40%)` in light and `oklch(0 0 0 / 60%)` in dark;
  scrims are several times darker.
- **Menus.** DropdownMenu, ContextMenu, Select and Combobox contents are dark in both themes, with
  28px items and 12px text.
- **Dialog** is 448px wide, `rounded-2xl`, `p-5`, with a layered shadow and a 200ms rise; under
  reduced motion it only fades. **Drawer** floats as an inset card.
- **Table** text is 13px, heads 40px with an optional leading icon, cells `py-3`; TablePagination's
  pager is a welded ButtonGroup.
- **Scroll fades** on ScrollArea (new `fade` prop, `"y"` by default), Table, Select, Combobox,
  Command, Sidebar, AttachmentGroup and the new Snippet only apply where the browser supports
  `animation-timeline: scroll()`; elsewhere edges are hard.
- **Switch** is 28×16.6px; unchecked Checkbox and Radio borders are `muted-foreground/80`.
  Skeleton is `bg-foreground/10`. Badge text is 10px.
- **Item** inside `ItemGroup` announces as `role="listitem"`. **ToggleGroup** passes
  `orientation` to Radix, so vertical groups navigate with up and down arrows.

## 3. New

- **`SplitButton`**: a primary action welded to a menu of related ones.
- **`SearchInput`**: a search field with clear, Escape-to-clear, a ⌘K shortcut and a loading state.
- **`FilterParamsBar`** and **`useFilterParams`**: filter pills with an "Add filter" popover, kept
  in the URL's query.
- **`LoadingDots`**: three animated dots after a label.
- **`ErrorMessage`**: an inline destructive sentence that announces as an alert.
- **`Snippet`**: a shell command with a copy button that never copies the prompt.
- **`CodeBlock`**: a code figure with line numbers, highlighted, added and removed lines, a
  language switcher and copy.
- **`ShowMore`**: a region clipped to a height that expands in place and stays in the DOM.
- **`DestructiveActionModal`**: a dialog that confirms an irreversible action by typing a phrase.
- **`TableFrame`**, **`TableFrameHeader`**, **`TableFrameTitle`**: a muted tray around a Table whose
  title names it.
