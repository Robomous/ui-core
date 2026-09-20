# Migrating to @robomous/ui-core 0.3

0.3 makes the design system's invariants structural and removes the machinery that used to
enforce them. Five things a consumer may have depended on are gone: the `./gates` export, the
`statusTone` exports, the `chart-*` tokens, the `bg-brand` family of utilities, and the token
mirror `LIGHT_THEME` / `DARK_THEME` / `THEME` / `cssVar`. One thing is
new and may break a screen that leaned on Tailwind's default palette: the colour namespace is
closed. Each change is listed with the sites found in the two consumers at the time of writing —
`Robomous/VisionSet` and `Robomous/robomous-cloud` — and the exact edit.

## 1. Status colour: `STATUS_INK`, `TONE_FILL`, `TONE_BORDER`, `StatusTone`

Removed. `success`, `warning` and `info` are roles in the stylesheet now, with light and dark
values, so the class name is the API:

| Before | After |
| --- | --- |
| `STATUS_INK.success` | `"text-success"` |
| `STATUS_INK.warning` | `"text-warning"` |
| `STATUS_INK.info` | `"text-info"` |
| `TONE_FILL.success` / `.warning` | `"bg-success"` / `"bg-warning"` |
| `TONE_FILL.neutral` / `.accent` / `.destructive` | `"bg-muted-foreground"` / `"bg-primary"` / `"bg-destructive"` |
| `TONE_BORDER.success` / `.warning` | `"border-success"` / `"border-warning"` |
| `TONE_BORDER.neutral` / `.accent` / `.destructive` | `"border-border"` / `"border-primary"` / `"border-destructive"` |
| `import { type StatusTone }` | declare the union locally: `type StatusTone = "neutral" \| "accent" \| "success" \| "warning" \| "destructive"` |

No `dark:` counterpart is needed: the role flips with the theme.

Sites:

- VisionSet `frontend/ui-core/src/screens/batchState.ts` (`TONE_FILL`, `TONE_BORDER`,
  `StatusTone`), `screens/OverviewPanel.tsx` and `screens/IngestScreen.tsx` (`STATUS_INK.warning`).
- robomous-cloud `web/src/platform/billing/Notice.tsx` (`TONE_BORDER[tone]`, `STATUS_INK[tone]`,
  `STATUS_INK.info`), `web/src/platform/billing/Billing.tsx` (`STATUS_INK.success`),
  `web/src/platform/storage/UsageBar.tsx` (`STATUS_INK.warning`),
  `admin/src/platform/support/SupportBanner.tsx` (`TONE_BORDER.warning`, `STATUS_INK.warning`).

For a lookup keyed on a tone, write the map out with whole class names, so Tailwind sees them:

```ts
const INK = { success: "text-success", warning: "text-warning", info: "text-info" } as const;
```

## 2. `@robomous/ui-core/gates`

Removed. The rules those scanners held are now held elsewhere or no longer need holding:

| Gate | What replaces it |
| --- | --- |
| `statusPaletteIn`, `competingStatusPaletteIn` | Nothing to hold: with the palette closed, `bg-emerald-500` or `text-red-700` produces no CSS. Delete the tests. |
| `brandUsagesIn` | Nothing to hold: `bg-brand` produces no CSS. Delete the tests and the `BRAND_SITES` lists. |
| `colouredClassesIn` | ESLint. Copy the `no-restricted-syntax` entry from this repository's `eslint.config.js` (two selectors, one regex) into the consumer's flat config. |
| `foundationTokenNames`, `blockBody`, `declarations`, `rawDeclarations` | Keep locally if the extension-mirror test is still wanted; the parsers are thirty lines and live in `tests/theme/tokens.test.ts` here. The foundation names are the `ROLE_NAMES` list in that file. |

Sites: VisionSet `tests/scripts/design_tokens.test.mjs`, `tests/scripts/design_system.test.mjs`,
`frontend/ui-core/src/tokens.test.ts`; robomous-cloud `web/tests/gates.test.ts`,
`admin/tests/gates.test.ts`.

## 3. The closed colour namespace

`@theme { --color-*: initial }` removes Tailwind's default palette from every consumer's build.
Any `bg-white`, `text-neutral-800`, `bg-black/50` or `border-gray-200` in a consumer now compiles
to nothing — silently. Grep for the default family names and rewrite each site to a role:

| Before | After |
| --- | --- |
| `bg-white text-neutral-800` | `bg-background text-foreground` (or `bg-card text-card-foreground`) |
| `bg-black/10` as a scrim | `bg-overlay` |
| `text-gray-500` | `text-muted-foreground` |
| `border-gray-200` | `border-border` (or just `border`) |

Site found: robomous-cloud `web/src/platform/billing/CardBrand.tsx` (`bg-white text-neutral-800`
on a card-network mark). If that mark must stay white regardless of theme, an inline style is the
honest spelling: `style={{ background: "white" }}`. `transparent`, `current` and `inherit` are
keywords, not palette entries, and keep working.

## 4. `bg-brand` and friends

`--brand` is still declared in both themes; `--color-brand` is no longer exposed, so `bg-brand`,
`text-brand`, `border-brand`, `ring-brand`, `fill-brand` and `stroke-brand` produce nothing.
Identity UI reads the variable:

```tsx
<div className="size-8 rounded-md" style={{ backgroundColor: "var(--brand)" }} />
```

Sites: VisionSet `frontend/app/src/styleguide/Styleguide.tsx` (the swatch); robomous-cloud
`web/src/styleguide/Styleguide.tsx` (the swatch). Wordmarks in both products arrive as images and
need nothing.

## 5. `chart-1` … `chart-5`

Removed from the stylesheet and from `LIGHT_THEME`/`DARK_THEME`. No consumer painted with them. A
product that charts declares its own series colours as an extension.

## 6. `LIGHT_THEME`, `DARK_THEME`, `THEME`, `cssVar`

Removed, along with `src/theme/tokens.ts`. They were a TypeScript copy of the values in
`styles.css`, kept for a caller that could not read CSS, and held in step by a test. No consumer
imported them, and a second copy of the palette is a second thing that can go stale.

The stylesheet is now the only copy. Where a value is genuinely needed as a string, read it from
the document, which has the further advantage of answering for the theme the reader is in:

```ts
const ink = getComputedStyle(document.documentElement).getPropertyValue("--foreground");
```

Everywhere else write `var(--foreground)`. `cssVar("popover")` returned `"var(--popover)"` and was
three lines; inline the template string if a call site really wants it.

Sites: none found in either consumer.

## Unchanged

- Every component and subcomponent export. The `sidebar-*` roles.
- `toast` and `Toaster`; `cn`.
- `import "@robomous/ui-core/styles.css"` and a consumer `@source` for its own sources.

## Behaviour changes worth a glance

- **`Button` renders `type="button"` by default.** A Button that was submitting a form only because
  it sat inside one needs `type="submit"`.
- **`DropdownMenuSubContent` no longer animates out**, matching `DropdownMenuContent`.
- Small buttons and the small Select trigger take `rounded-md` instead of a `min()` expression;
  identical at the default radius. The `sm` Button is `text-sm` rather than `0.8rem`.
