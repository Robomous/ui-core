# Migrating to @robomous/ui-core 0.5

0.5 is the first release after 0.2.1 to reach npm: 0.3 and 0.4 were declared in `package.json`
and never published. A consumer on 0.2.1 reads [MIGRATION-0.3.md](MIGRATION-0.3.md) first — the
removed `./gates` export, the `statusTone` exports, the token mirror and the closed colour
namespace are all there — and then this file.

One thing a consumer may depend on is gone: Button's `inline` size. Everything else below changes
what a screen looks like without asking for an edit. Sites are the ones found in
`Robomous/VisionSet` at the time of writing.

## 1. Button `size="inline"`

Removed. A link button inside a sentence or a table cell is the `link` variant with the geometry
written at the call site — no height of its own and no padding:

| Before | After |
| --- | --- |
| `<Button variant="link" size="inline">` | `<Button variant="link" className="h-auto p-0">` |
| `<Button variant="link" size="inline" className="text-xs">` | `<Button variant="link" className="h-auto p-0 text-xs">` |

Without the edit TypeScript rejects the prop; with `size` simply dropped the button takes the
default 32px height and its padding, and a row of prose or a table cell grows to fit it.

Sites (VisionSet, all `variant="link" size="inline"`):

- `frontend/ui-core/src/annotator/AnnotationPage.tsx:2670` (also `className="text-xs"`)
- `frontend/ui-core/src/screens/ProjectScreen.tsx:864`
- `frontend/ui-core/src/screens/ProjectsScreen.tsx:158`
- `frontend/ui-core/src/screens/BatchesScreen.tsx:139`
- `frontend/ui-core/src/screens/ProjectPreLabelDialog.tsx:269`
- `frontend/ui-core/src/screens/PromoteButton.tsx:156`
- `frontend/ui-core/src/screens/OverviewPanel.tsx:412`, `:553`
- `frontend/ui-core/src/screens/BatchLifecycle.tsx:283`
- `frontend/ui-core/src/screens/SchemaForeshadow.tsx:44`
- `frontend/ui-core/src/screens/CorrectionBatch.tsx:288`
- `frontend/ui-core/src/screens/SchemaEditor.tsx:807`, `:840`
- `frontend/app/src/styleguide/Styleguide.tsx:246`

Where a site repeats, a local constant keeps the classes in one place and still lets Tailwind see
them: `const inlineLink = "h-auto p-0";`.

## 2. Destructive is a tint

`--destructive` takes new values and has no surface role: 0.4's `--destructive-surface` (never
published) is gone, and `--destructive-foreground` is new. Every destructive variant or state
wears one recipe — the role over `/10` of itself (`/20` in dark), a `/20` hover (`/30`):

```
bg-destructive/10 text-destructive hover:bg-destructive/20
dark:bg-destructive/20 dark:hover:bg-destructive/30
```

Button, Badge and Alert `destructive`, the menus' destructive items, Attachment's error tile and
the error toast all paint it. A call site that composed its own destructive surface writes the
same classes; `bg-destructive-surface` produces no CSS.

## 3. Visual changes, no edit needed

- **Alert** gains `info`, `success` and `warning`. Info and success announce as `role="status"`,
  warning and destructive as `role="alert"`; a `role` prop still wins. The box is taller: `px-4
  py-3`, a 20px icon lane and a 12px gap.
- **DialogFooter `showCloseButton`** renders Close *before* the call site's actions, so the primary
  one keeps the trailing edge in a row and the top of the stack under `sm`.
- **PopoverAnchor** positions the content against the anchor. Before, the content opened at the
  viewport's top-left corner; a site that worked around it can drop the workaround.
- **Sheet** left and right reach 520px on desktop (was 384px).
- **ToggleGroup** spaces its items 6px apart by default (was 8px); welded items (`spacing={0}`)
  take 12px of padding.
- **AttachmentAction** defaults to `icon-sm` (28px, was 24px).
- **Tabs, Breadcrumb, Pagination, Command, Combobox, Card, Item, Empty, Input, Textarea, Switch,
  Kbd** follow the design file's geometry: small padding, gap and type changes, listed in the
  commit that made them.
- **Dark `--input`** is neutral-200 at 12% (was white at 15%).

## 4. New

- **`TablePagination`**: a `<tfoot>` pager inside the table's frame — a live range, rows per page,
  page *n* of *N*, and first/previous/next/last buttons, with loading and count-only states.
