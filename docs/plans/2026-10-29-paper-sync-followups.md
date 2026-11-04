# Follow-ups after the Paper ↔ ui-core (radix-mira) sync

Date: 2026-10-29 · Paper file `visionset` (01M2Y0A0Z3W6SQZ2D726T4SBRT) · ui-core 0.5.0 + uncommitted preset b1D0dv73

Source: 229 findings logged while syncing every page of the Paper file, then challenged by two adversarial
reviews (one against the library source, one against product/UX intent). Raw findings and per-page adoption
decisions live in the session scratchpad (`findings-*.md`, `all-findings.md`); this plan is the surviving,
deduplicated set.

Owner legend: **code** = ui-core `src/`, **docs** = `examples/catalog`, **Paper** = the design file,
**product** = needs a decision from you before anyone builds it.

---

## Phase 0 — Correct the sync itself (Paper, ~1 day)

These are mistakes in the sync, not improvements. Fix them first so the file mirrors the library.

1. **DestructiveActionModal was drawn where the library can't render it.** `verificationPhrase` is a required
   prop (`destructive-action-modal.tsx:58`); the sync brief wrongly called the typed field optional. Every DAM
   drawn without the typed field — 04.2 "Discard Project", 04.7 V5 / 04.7c Current 4 & A 4 "Leave Without
   Saving", 04.5 "Delete Batch", 04.6 61 — is not buildable. The Dialog/DAM docs also say "don't use DAM for
   discarding a draft". → Redraw leave/discard as a plain **Dialog** ("Discard changes" / "Keep editing" as the
   safe default). Deletes wait on Q2 (tiering) below.
2. **"Not saved · N changes" became an ErrorMessage** (04.7 V2/V3, 04.7c, page 03 AnnotatorHeader). It is a
   persistent status, ErrorMessage is `role="alert"` (re-announces on every change) and its link opens a new
   tab. → Status line (polite) + ghost "Save now"/"Details" button; keep LoadingDots for "Saving".
3. **Persistent annotator hints drawn as dark Tooltip pills** (04.7 T1–T4; T5/T6 still light). Tooltips are
   hover/focus labels. → One popover-token pill (ring hairline, 12px, inline Kbd) on T1–T6.
4. **LoadingDots next to measurable progress** (ImportStrip "Importing… 62%", JobsTable "Running 41%", 04.9
   export strip). Progress/LoadingDots docs: measurable → Progress bar + label, no dots. Dots only for
   indeterminate sentences ("Saving", "Verifying", "Looking at that").
5. **Coverage bar recoloured success-green** (page 03 → 04.8). Progress doc: don't colour for outcome. Revert to
   neutral/primary.
6. **"Try again" as destructive tint** (04.3, page 03). Retry ends nothing → outline (default when it is the
   only action). Also settles 04.7c/Empty/F3-G10.
7. **Empty used for a failure** (04.7 V6, 04.7c A5). Empty doc forbids it → Alert-style panel or ErrorMessage +
   action.
8. **ErrorMessage icon doubling** with a row's own error icon (04.4 52, 05 M7, page 03 ActivityItem) → one icon;
   put the ErrorMessage under the row.
9. **Status filter dropped** on 04.4 15.D when moving to FilterParamsBar → add it back as a filter option.
10. **QA leftovers**: verify the six 04.4 headers an agent mis-targeted and reset (20.1, 20.2, 21, 21b, 52,
    15.A–C — spot-checked 15, 21, 15.A: fine); screenshot 04.7 S0/T6/F4–F6, 04.8 34.2; re-run one "same rules"
    pass over 04.7 + 04.7c together (hint pills, keycap fonts "/" "↵", cloud-off vs AlertCircle, A5 copy).

## Phase 1 — Product decisions (you)

- **Q1** Typed-name confirmation for deleting a project — keep? Also for dataset and release?
- **Q2** Confirmation tiers. Proposal: (a) cheap/reversible (recipe, empty class, connection row) → act +
  Toast with Undo; (b) real but recoverable loss (class with labels, connection) → plain Dialog with the count;
  (c) irreversible/high blast (project, dataset, batch with data, release) → DAM with typed gate. Today
  "Delete recipe" (04.8 74), "Remove class" (04.6 28), "Remove connection" (04.1 detail footer) delete with
  **no confirmation**, and "Delete batch" drops 125 jobs + labels on 84,568 assets.
- **Q3** Releases: deletable or not? Publish dialog says "can't be edited or deleted later"; the kebab offers
  "Delete release" and no confirmation exists. Remove the item (archive/hide instead) or keep delete + fix copy.
- **Q4** "Annotate" SplitButton: how many alternate batches, and what's the default? >4 → Button + batch picker.
  Also one primary per view (04.3 14.5 "Import assets" flips to primary).
- **Q5** Persistent annotator alerts (model offline, save failed): docked banner between header and stage, or
  Toast? Today they float opaque over the image; the real Alert is translucent (`bg-destructive/10`).
- **Q6** Copy case: sentence case for plain Dialogs, Title Case only for DAM (as the docs show today)?
- **Q7** Annotator rail/rows: rail settled at 32 (04.7 now uniform); rows 32 vs the 28 control grid — keep?
- **Q8** Must phones support annotation, or only review/triage? Decides how urgent touch sizes (Phase 2 #9) are.
  The sync shrank mobile nav buttons 44 → 28 to match the library; that is a real regression on a phone.
- **Q9** Contrast tokens (see Phase 2 #1): you previously chose `text-destructive` on the 10% tint over the
  25%-foreground ink mix; it measures **4.01:1** (fails AA for 10–12px). Darken `--destructive`, or bring back
  the mixed ink?

## Phase 2 — Library code (ui-core)

Verified against source by the code review (`pnpm test`: 184 passing). Add two invariant tests first so the
fixes can't regress: **T-contrast** (`tests/theme/contrast.test.ts`, parses styles.css) and **T-focus**
(`tests/components/focus-geometry.test.tsx`, every focusable part has a focus-visible ring; no `ring-3`,
`ring-[3px]`, `ring-ring/50` left).

| # | Sev | Where | Change |
|---|---|---|---|
| 1 | HIGH | `styles.css` `--muted-foreground` (light) | neutral-500 on `--muted` = 4.34:1 (Kbd, quiet Badge at 10px) → ≈ `oklch(0.53 0 0)` (4.84:1). T-contrast. |
| 2 | HIGH | `styles.css` `--ring`, `--sidebar-ring` (light) | neutral-400 = 2.59:1, `/30` halo ≈1.3:1 → neutral-500 (4.73:1). T-contrast. |
| 3 | HIGH | `styles.css` `--destructive` (light) | 4.01:1 on its 10% tint → ≈ `oklch(0.53 0.23 39)` or mixed ink — **Q9**. |
| 4 | HIGH | `accordion.tsx:41` | Trigger lost its focus style in the mira diff (root is `overflow-hidden`) → `focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring`. |
| 5 | HIGH | `toast.tsx:109` | Typed toasts force muted description (3.96:1 on error) → per-type ink. Also `:107` `basis-full` wraps the icon → `basis-[calc(100%-1.75rem)]`; `:112-113` lone action alignment; consider `font-medium` title. Browser-verify. |
| 6 | MED | badge, item, toggle, tabs (+`outline-1`), table scroll, radio-group (+`aria-invalid:ring-3`), scroll-area | Ring migration → `ring-2 ring-ring/30`; update `states.mdx:27`, `styles.css:270` comment, catalog demos `drawer/picker.tsx:61`, `hover-card/timing.tsx:34`, breadcrumb demo. |
| 7 | MED | `tabs.tsx:72` TabsContent | `outline-none` on a `tabIndex=0` panel → add focus ring. |
| 8 | MED | `input.tsx:11`, `textarea.tsx:10`, `command.tsx:69` | 14px below md re-introduces iOS focus zoom (HEAD had `text-base`) → `text-base md:text-xs/relaxed`. |
| 9 | MED | `button.tsx:26,28`, `input-group.tsx:68` | xs/icon-xs 20px < WCAG 2.5.8 24px; no `pointer-coarse` anywhere → `after:-inset-1` hit slop; touch size per **Q8**. |
| 10 | MED | `select.tsx:75` | SelectContent has no padding (items touch edge, separator `-mx-1` overflows) → `p-1`. |
| 11 | MED | `switch.tsx:17` + control stroke | Off thumb/track 1.26:1 (1.4.11); Checkbox/Radio `border-input` same → `data-unchecked:border-ring` or a control-stroke token. |
| 12 | MED | `field.tsx:98` | Choice card lost `has-data-checked:border-primary/30` in the restyle (checked = 5% tint only) → restore (`border-primary`, dark `/60`). |
| 13 | MED | `alert.tsx:9,64` | AlertAction absolute + `pr-18` overlaps long actions → action in grid flow, drop `pr-18`. |
| 14 | MED | `dialog.tsx:58-62`, `sheet.tsx:74-78,87` | Absolute close X overlaps long titles → reserve `pr` on header when a close button exists. |
| 15 | LOW | Dialog/Sheet widths | Many screens need 448–640: add `size` (Dialog sm 384 / md 448 / lg 560; Sheet sm 384 / lg 512; CommandDialog 640). Long forms (04.4 20/20.1) → Sheet. |
| 16 | LOW | polish | Toggle icon 16→14 (`toggle.tsx:9`); Spinner default `size-3.5`; TablePagination `text-xs` (`table.tsx:223,243`); EmptyTitle 18 → 14/500; Breadcrumb separator `size-4`/14; ErrorMessage sm 11px → 10 or accept; DAM `p-5`/`h-8`/hand-rolled error → align with Dialog, use ErrorMessage; Attachment `ring-1` → 2; unused `--destructive-foreground`; add `--destructive-surface` token (Paper can't render two-var color-mix); Badge `dot`; Drawer close X. |
| 17 | — | DAM | Make the typed gate optional or ship a sibling `ConfirmDialog` — depends on **Q2**. |

## Phase 3 — Catalog docs

Confirm-tier guideline (Q2); status-segment rule — mutually exclusive views with counts = **ToggleGroup single**
(04.1 Models, 04.5 galleries, 04.7 quick filters), additive refinements = **FilterParamsBar**, page sections =
Tabs; type rule — page-level ledes 14, component copy 12 (kills the "ledes 14 vs 12" findings); widths (#15);
touch size; `TypeScale.astro:96-100` says Kbd is `font-mono text-xs` — real Kbd is `font-sans` 10px/500;
`states.mdx` focus text; annotator chrome exception (ghost icon buttons in tool chrome, outline in app chrome).

## Phase 4 — Paper re-sync to the new code

Redraw the confirmation dialogs by tier; segments as ToggleGroup; dialog/sheet widths with the new sizes;
CollectionToolbar rows 1–2 still use a "Filter" button while row 3 uses FilterParamsBar — unify; missing
states (04.2 name error / creating / empty classes / picker failure, DAM error + loading, AnnotatorHeader
"Retrying", mobile Dialog/Toast frames, mobile filter, scrimmed CommandDialog, Field choice card); mobile
hit-area annotations; Finish-job / Frame-gallery scrims cover only stage + panel (and J5 double-scrims) —
cover inset-0, one scrim; ClassPicker check → right; one selected-row treatment; rebuild duplicated underlays
from a single base screen (04.5 has four copies) and re-pin prototype links/comments whose node ids changed.

## Parked (noise or intentional)

Radius 3xl/4xl unused; `--card-spacing` rows; layer-name typos; doc-note 14px body; cover title 40px; tooltip
arrow offsets; Sidebar MenuButton 32 (intentional); notification-dot offsets; Item vs ReleaseItem 72px rows;
AlertTitle/Avatar 14 (the shared title register — refuted as a defect); "Toast has no offset API" (refuted —
`offset` passes through); DAM has no Esc (refuted — Esc closes unless loading).
