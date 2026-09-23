# ui-core 0.3.0 Simplification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce `@robomous/ui-core` to components + one stylesheet, make its invariants structural (semantic status tokens, closed Tailwind colour namespace) instead of scanner-enforced, fix the Button/Field/DropdownMenu defects, move tests out of `src/`, and verify the package as a real installed artifact.

**Architecture:** `src/components/*.tsx` (owned Radix/Base UI wrappers) + `src/theme/styles.css` (the single visual contract; `@theme` closes `--color-*` and exposes only semantic roles) + `src/index.ts` (explicit exports). `tests/` holds behaviour tests (jsdom), the token contract, and one packed-consumer integration test that builds, packs, installs and Tailwind-compiles the package. `examples/catalog/` is a Vite workspace app that imports the real package for manual inspection. `src/gates`, `src/theme/statusTone.ts` and `src/theme/tailwind.css` are deleted.

**Tech Stack:** React 19, Tailwind CSS 4.3 (CSS-first), radix-ui 1.6, @base-ui/react 1.7, vitest 4 (two projects: `unit` jsdom, `package` node), pnpm 11 workspace, Vite 8 for the catalog, GitHub Actions with npm OIDC trusted publishing.

**Spec:** the task brief given in-session (sections 1–34). Consumer facts below were audited from `Robomous/VisionSet` (local checkout, `main`, still on `@robomous/ui-core ^0.1.0`) and `Robomous/robomous-cloud` (shallow clone, `web/` and `admin/` on `0.2.1`).

## Global Constraints

- Node 24 (`.nvmrc`), pnpm 11, TypeScript 6, `"type": "module"`, imports inside `src/` use `.js` suffixes.
- Prettier: `printWidth: 100`, `semi: true`; Markdown is hand-formatted at 100 columns and ignored by Prettier.
- Peer deps stay `react >=19`, `react-dom >=19`, `tailwindcss >=4`. No new runtime dependency. Dev dependencies may be added only for the catalog (Vite, @tailwindcss/vite, @vitejs/plugin-react) and are scoped to `examples/catalog/package.json`.
- Version becomes `0.3.0` (breaking: `./gates` export, `statusTone` exports, `chart-*` tokens and `--color-brand` utilities removed).
- `src/` must contain only shipped source after this plan: `components/`, `theme/styles.css`, `index.ts`.
- Every public component and subcomponent stays explicitly exported from `src/index.ts`; no `export *`.

## Consumer audit (drives the migration doc in Task 10)

| API | VisionSet | robomous-cloud | Migration |
| --- | --- | --- | --- |
| `@robomous/ui-core/gates` (`colouredClassesIn`, `brandUsagesIn`, `statusPaletteIn`, `competingStatusPaletteIn`, `foundationTokenNames`, `blockBody`, `declarations`, `rawDeclarations`) | `tests/scripts/design_tokens.test.mjs`, `tests/scripts/design_system.test.mjs`, `frontend/ui-core/src/tokens.test.ts` | `web/tests/gates.test.ts`, `admin/tests/gates.test.ts` | Delete the status-palette and brand scans (structural now). Replace `colouredClassesIn` with the ESLint `no-restricted-syntax` rule from this repo's `eslint.config.js`. Keep the ~30-line CSS parsers locally if the extension-mirror test is still wanted. |
| `STATUS_INK`, `TONE_FILL`, `TONE_BORDER`, `StatusTone` | `screens/batchState.ts`, `screens/OverviewPanel.tsx`, `screens/IngestScreen.tsx` | `web/.../billing/Notice.tsx`, `billing/Billing.tsx`, `storage/UsageBar.tsx`, `admin/.../SupportBanner.tsx` | `STATUS_INK.x` → `"text-x"`, `TONE_FILL.x` → `"bg-x"`, `TONE_BORDER.x` → `"border-x"` for `success`/`warning`/`info`; `neutral`/`accent`/`destructive` map to `bg-muted-foreground`/`bg-primary`/`bg-destructive` etc. Define the `StatusTone` union locally. |
| `bg-brand` utility | `frontend/app/src/styleguide/Styleguide.tsx` swatch | `web/src/styleguide/Styleguide.tsx` swatch | `style={{ backgroundColor: "var(--brand)" }}`. The wordmark already arrives as an image. |
| `LIGHT_THEME`, `DARK_THEME`, `THEME`, `cssVar` | `Styleguide.tsx`, `demo/theme.ts` | none | Kept as a documented runtime mirror; `chart-*` keys removed. |
| `sidebar-*` tokens | `AppShell.tsx` | `AppShell.tsx` | Kept (shared by two products). |
| `chart-1…5` tokens | none | none | Removed. |
| Physical palette utilities | none | `web/.../billing/CardBrand.tsx` (`bg-white text-neutral-800`) | `bg-background text-foreground` (or an inline style if the card mark must stay white on brand). |
| `toast` re-export | via `export *` | none | Kept if the tree-shaking check passes (Task 7 decides). |

---

### Task 1: Move tests out of `src/`, trim the harness, split vitest into projects

**Files:**
- Move: `src/components/components.test.tsx` → `tests/components/components.test.tsx`
- Move: `src/components/combobox.test.tsx` → `tests/components/combobox.test.tsx`
- Move: `src/components/sonner.test.tsx` → `tests/components/sonner.test.tsx`
- Move: `src/harness.test.tsx` → `tests/harness.test.tsx`
- Move: `src/theme/tokens.test.ts` → `tests/theme/tokens.test.ts`
- Move: `src/theme/imports.test.ts` → `tests/theme/imports.test.ts`
- Move: `src/theme/statusTone.test.ts` → `tests/theme/statusTone.test.ts` (deleted in Task 3)
- Move: `src/gates/design.test.ts`, `src/gates/tokens.test.ts`, `src/gates/index.test.ts` → `tests/gates/` (deleted in Task 3)
- Move: `vitest.setup.ts` → `tests/setup.ts` (trimmed)
- Modify: `vitest.config.ts`, `tsconfig.json`, `tsconfig.build.json`, `eslint.config.js`, `package.json` scripts

- [ ] **Step 1: `git mv` every test file** to the paths above. Fix imports: component tests import from `../../src/components/<name>` (extensionless, as today); `harness.test.tsx` imports `../src/components/dialog`; theme tests import `../../src/theme/tokens` and read the stylesheet with `new URL("../../src/theme/styles.css", import.meta.url)`; gates tests import `../../src/gates/index.js` and keep `REPO = path.resolve(dirname, "..", "..")` (same depth).

- [ ] **Step 2: Trim `tests/setup.ts`** to exactly: the `afterEach(cleanup + drained macrotask)` (proved by `tests/harness.test.tsx`), `afterEach(toast.dismiss)` (needed by `sonner.test.tsx`), and the four `Element.prototype` stubs (`hasPointerCapture`, `setPointerCapture`, `releasePointerCapture`, `scrollIntoView`, needed by Select/DropdownMenu tests). Delete the `FormData`, `URL.createObjectURL/revokeObjectURL` and `localStorage` blocks: no test or component in this repository touches them (they came from VisionSet application code).

- [ ] **Step 3: Rewrite `vitest.config.ts`** with two projects:

```ts
import { availableParallelism } from "node:os";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const MAX_WORKERS = Math.max(2, Math.floor(availableParallelism() / 4));

export default defineConfig({
  test: {
    globals: false,
    maxWorkers: MAX_WORKERS,
    projects: [
      {
        plugins: [react()],
        test: {
          name: "unit",
          environment: "jsdom",
          include: ["tests/**/*.test.{ts,tsx}"],
          exclude: ["tests/package/**"],
          setupFiles: ["./tests/setup.ts"],
          testTimeout: 15_000,
        },
      },
      {
        test: {
          name: "package",
          environment: "node",
          include: ["tests/package/**/*.test.ts"],
          testTimeout: 600_000,
          hookTimeout: 600_000,
        },
      },
    ],
  },
});
```

- [ ] **Step 4: Config updates.** `tsconfig.json`: `include: ["src", "tests"]`, drop `declaration`, `outDir`, `rootDir` (they move to the build config), keep `types: ["node"]`. `tsconfig.build.json`: `extends`, `compilerOptions: { declaration: true, outDir: "dist", rootDir: "src" }`, `include: ["src"]`, no `exclude` needed. `eslint.config.js`: ignores `dist/`, `examples/catalog/dist/`; hooks rules over `src/**`, `tests/**`, `examples/**`. `package.json` scripts: `"test": "vitest run --project unit"`, `"test:package": "vitest run --project package"`, `"lint": "eslint . && pnpm run typecheck"`.

- [ ] **Step 5: Run** `pnpm lint && pnpm test`. Expected: all 76 tests pass from their new locations. Commit: `refactor: move tests out of src and trim the harness`.

---

### Task 2: Semantic status + overlay tokens, closed colour namespace

**Files:**
- Modify: `src/theme/styles.css`, `src/theme/tokens.ts`, `src/components/badge.tsx`, `src/components/dialog.tsx`, `src/components/sheet.tsx`
- Modify: `tests/theme/tokens.test.ts`, `tests/components/components.test.tsx`, `tests/gates/design.test.ts` (interim only)

- [ ] **Step 1: Failing tests first.** In `tests/theme/tokens.test.ts` replace the name lists: `BASE_SEMANTIC_NAMES` gains `"success"`, `"warning"`, `"info"`, `"overlay"`; delete `CHART_NAMES` and `NEUTRAL_CHART`; `SEMANTIC_NAMES = [...BASE_SEMANTIC_NAMES, ...SIDEBAR_NAMES]`. Add to the `@theme` describe: `it("closes the default palette", () => expect(STYLESHEET).toMatch(/--color-\*:\s*initial;/))` and `it("exposes no --color-brand utility", () => expect(inline.has("--color-brand")).toBe(false))`. Keep `EXTENSION_NAMES = ["brand"]` for `:root`/`.dark` (the variable stays; the utility goes). In `tests/components/components.test.tsx` change the Badge `it.each` to assert `className` matches `/\bbg-(success|warning|info|muted)\b|\/10\b/` and not `/emerald|amber|sky/`.

- [ ] **Step 2: `styles.css` token blocks.** Add to `:root`:

```css
  /* Status roles. The value is a detail; the name is the contract. */
  --success: oklch(0.508 0.118 165.612);
  --warning: oklch(0.555 0.163 48.998);
  --info: oklch(0.5 0.134 242.749);
  /* The scrim behind a Dialog or Sheet. Purpose, not pigment. */
  --overlay: oklch(0 0 0 / 10%);
```

and to `.dark`:

```css
  --success: oklch(0.765 0.177 163.223);
  --warning: oklch(0.828 0.189 84.429);
  --info: oklch(0.746 0.16 232.661);
  --overlay: oklch(0 0 0 / 10%);
```

Delete the five `--chart-*` lines in both blocks. Replace the `@theme inline` block with:

```css
@theme {
  /* Close Tailwind's default palette: `bg-red-500` is not a word here. */
  --color-*: initial;
}

@theme inline {
  --font-sans: "Geist Variable", sans-serif;
  --font-heading: var(--font-sans);

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-info: var(--info);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-overlay: var(--overlay);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}
```

No `--color-brand`. Update the header comment to describe the closed namespace.

- [ ] **Step 3: `tokens.ts`.** Add `success`, `warning`, `info`, `overlay` to both maps with the values above; delete the `chart-*` keys. Header comment: "a compatibility/runtime mirror for callers that cannot read CSS; CSS is authoritative".

- [ ] **Step 4: Components.** `badge.tsx`: `success: "bg-success/10 text-success focus-visible:ring-success/20 dark:focus-visible:ring-success/40 [a]:hover:bg-success/20"`, same shape for `warning` and `info`. `dialog.tsx` and `sheet.tsx`: `bg-black/10` → `bg-overlay`.

- [ ] **Step 5: Interim gate fixups** so the suite is green until Task 3 deletes them: in `tests/gates/design.test.ts` update the Badge assertions to `bg-success/10`, `text-success`, etc.

- [ ] **Step 6: Run** `pnpm test`. Commit: `feat(theme): semantic status and overlay tokens; close the colour namespace`.

---

### Task 3: Delete the policy engine (gates, statusTone, brand utility) and add the ESLint colour rule

**Files:**
- Delete: `src/gates/`, `tests/gates/`, `src/theme/statusTone.ts`, `tests/theme/statusTone.test.ts`
- Modify: `src/index.ts`, `package.json` (`exports`, `description`), `eslint.config.js`

- [ ] **Step 1: Delete** the files above. Remove the `STATUS_INK`/`TONE_*`/`StatusTone` export line from `src/index.ts`. Remove `"./gates"` from `package.json#exports`.

- [ ] **Step 2: ESLint rule** in `eslint.config.js` (applies to `src/**`, `tests/**`, `examples/**`):

```js
{
  files: ["src/**/*.{ts,tsx}", "tests/**/*.{ts,tsx}", "examples/**/*.{ts,tsx}"],
  rules: {
    "no-restricted-syntax": [
      "error",
      {
        selector: "Literal[value=/-\\[\\s*(?:#|rgba?\\(|hsla?\\(|oklch\\(|var\\(--)/]",
        message: "Colour belongs to the token contract: add a role to src/theme/styles.css and use its utility (bg-primary, text-warning), never a literal inside a class.",
      },
      {
        selector: "TemplateElement[value.raw=/-\\[\\s*(?:#|rgba?\\(|hsla?\\(|oklch\\(|var\\(--)/]",
        message: "Colour belongs to the token contract: add a role to src/theme/styles.css and use its utility, never a literal inside a class.",
      },
    ],
  },
}
```

- [ ] **Step 3: Prove the rule bites.** Temporarily add `const x = "bg-[#fff]";` to `src/components/skeleton.tsx`, run `pnpm exec eslint src`, expect one error, revert.

- [ ] **Step 4: Run** `pnpm lint && pnpm test`. Commit: `refactor: remove gates and statusTone; the invariants are structural now`.

---

### Task 4: One state dialect per behaviour library; delete `tailwind.css`

**Files:**
- Delete: `src/theme/tailwind.css`
- Modify: `src/theme/styles.css` (drop the `@import "./tailwind.css"`), every component listed below, `tests/theme/tokens.test.ts` (structure anchors), `tests/theme/imports.test.ts` (drop the sibling half)

Radix emits `data-state="open|closed|active|inactive|checked|delayed-open"`, `data-orientation="horizontal|vertical"`, bare `data-disabled`, bare `data-highlighted`. Base UI emits bare `data-open`, `data-closed`, `data-highlighted`, `data-selected`, `data-disabled`, `data-empty`, `data-pressed`. Tailwind's built-in `data-foo:` variant means `[data-foo]`, so Base UI needs nothing custom and Radix needs `data-[state=…]`.

- [ ] **Step 1: Replace in Radix components** (`dialog.tsx`, `sheet.tsx`, `dropdown-menu.tsx`, `select.tsx`, `tooltip.tsx`, `tabs.tsx`, `separator.tsx`):
  - `data-open:` → `data-[state=open]:`; `data-closed:` → `data-[state=closed]:`
  - `data-active:` → `data-[state=active]:` (tabs, including `group-data-[variant=…]/tabs-list:data-active:` forms)
  - `data-horizontal:` → `data-[orientation=horizontal]:`; `data-vertical:` → `data-[orientation=vertical]:`; `group-data-horizontal/tabs:` → `group-data-[orientation=horizontal]/tabs:` (and vertical)
  - `data-disabled:` stays (bare attribute, built-in variant matches)
  - `tooltip.tsx`: keep `data-[state=delayed-open]:` and the `data-[state=open]:`/`data-[state=closed]:` pair
- [ ] **Step 2: Base UI (`combobox.tsx`)**: `data-open:`, `data-closed:`, `data-highlighted:`, `data-disabled:`, `data-empty:` stay as written (built-in). Replace `no-scrollbar` with `[scrollbar-width:none] [&::-webkit-scrollbar]:hidden`.
- [ ] **Step 3: `field.tsx`**: `group-has-data-horizontal/field:` → `group-data-[orientation=horizontal]/field:` (Field sets `data-orientation` itself). `has-data-checked:` stays (built-in; matches a Base UI-style `data-checked` control a consumer nests).
- [ ] **Step 4: `styles.css`**: remove the `@import "./tailwind.css";` line and the header paragraph about it. `tests/theme/tokens.test.ts` structure anchors become `["tailwindcss", "tw-animate-css", "@fontsource-variable/geist"]` imports then `@custom-variant dark`. `tests/theme/imports.test.ts`: delete the sibling test (no siblings remain); keep the package-resolution test until Task 8 replaces it.
- [ ] **Step 5: Run** `pnpm lint && pnpm test` (Tabs keyboard/aria tests and the Select viewport test still pass; they never depended on CSS). Commit: `refactor(theme): use each library's own state attributes; delete tailwind.css`.

---

### Task 5: Behavioural fixes and tests (Button type, DropdownMenu exit policy, Dialog, Field, Progress)

**Files:**
- Modify: `src/components/button.tsx`, `src/components/dropdown-menu.tsx`
- Create: `tests/components/button.test.tsx`, `tests/components/dropdown-menu.test.tsx`, `tests/components/dialog.test.tsx`, `tests/components/field.test.tsx`
- Modify: `tests/components/components.test.tsx` (remove the Button/Dialog/DropdownMenu describes that move; drop the `fill.className` exact-string assertion in Progress)

- [ ] **Step 1: Button tests** (`tests/components/button.test.tsx`):

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../../src/components/button";

describe("Button", () => {
  it("defaults a native button to type=button so it cannot submit a form by accident", async () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <Button>Cancel</Button>
      </form>,
    );
    const button = screen.getByRole("button", { name: "Cancel" });
    expect(button.getAttribute("type")).toBe("button");
    await userEvent.click(button);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits when asked to", async () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <Button type="submit">Save</Button>
      </form>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("does not force a type onto an asChild anchor", () => {
    render(
      <Button asChild>
        <a href="/docs">Docs</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link.tagName).toBe("A");
    expect(link.hasAttribute("type")).toBe(false);
    expect(link.className).toContain("bg-primary");
  });

  it("is inert when disabled", async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Nope</Button>);
    const button = screen.getByRole("button", { name: "Nope" });
    expect(button).toHaveProperty("disabled", true);
    await userEvent.click(button).catch(() => undefined);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("lets a caller's className win a conflicting utility", () => {
    render(<Button className="px-6">Wide</Button>);
    const classes = screen.getByRole("button", { name: "Wide" }).className.split(" ");
    expect(classes).toContain("px-6");
    expect(classes).not.toContain("px-2.5");
  });
});
```

Move the remaining Button assertions from `components.test.tsx` (link variant, inline size) into this file.

- [ ] **Step 2: Button implementation**: destructure `type`, render `<Comp type={asChild ? type : (type ?? "button")} …>`. Comment: a `<button>` inside a `<form>` submits by default; a design-system button is an action first, so submit is opt-in.

- [ ] **Step 3: DropdownMenu tests** (`tests/components/dropdown-menu.test.tsx`). The file injects a stylesheet that gives any element carrying an exit-animation utility a real `animation-name`, which is what Radix's `Presence` reads through `getComputedStyle` before deciding whether to keep a closed surface mounted. jsdom resolves `animation-name` from a `<style>` sheet (verified), so an exit-animated menu stays mounted after `Escape`, `document.body` keeps `pointer-events: none`, and user-event refuses the next click — the exact production race.

```tsx
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../../src/components/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub,
  DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
} from "../../src/components/dropdown-menu";

const EXIT_ANIMATIONS = `
  [data-state="closed"][class*="data-[state=closed]:animate-out"],
  [data-closed][class*="data-closed:animate-out"] {
    animation-name: exit; animation-duration: 150ms;
  }`;
let sheet: HTMLStyleElement;
beforeAll(() => { sheet = document.createElement("style"); sheet.textContent = EXIT_ANIMATIONS; document.head.append(sheet); });
afterAll(() => sheet.remove());

it("the harness models an exit animation: a Dialog stays mounted until animationend", async () => {
  const user = userEvent.setup();
  render(<Dialog><DialogTrigger>Open</DialogTrigger><DialogContent><DialogTitle>T</DialogTitle></DialogContent></Dialog>);
  await user.click(screen.getByRole("button", { name: "Open" }));
  await screen.findByRole("dialog");
  await user.keyboard("{Escape}");
  expect(document.querySelector("[data-slot=dialog-content]")?.getAttribute("data-state")).toBe("closed");
});

function TwoMenus() { /* First/Second triggers, items "One"/"Two", First has a Sub with "More" → "Nested" */ }

describe("DropdownMenu", () => {
  it("leaves on the frame it is dismissed, so the press that opens the next menu lands", async () => { /* open First, Escape, expect no menu, click Second, expect menuitem Two */ });
  it("closing a submenu leaves no surface behind", async () => { /* open First, ArrowDown to More, ArrowRight opens sub (2 menus), ArrowLeft closes it → exactly 1 menu, then ArrowDown reaches "One" */ });
  it("moves through items with the keyboard and dismisses on Escape", async () => { /* ArrowDown twice, activeElement is the item, Escape returns focus to trigger */ });
});
```

Write the bodies in full (the sketch above names every step).

- [ ] **Step 4: DropdownMenu implementation**: in `DropdownMenuSubContent` remove `data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95` (already `data-[state=…]` after Task 4) and add `data-[state=closed]:overflow-hidden` to match the root content. Update the comment to state the policy once for both surfaces.

- [ ] **Step 5: Dialog tests** (`tests/components/dialog.test.tsx`): opens from its trigger; `Escape` closes and returns focus to the trigger (`waitFor`); the accessible close control is a real button named "Close" and closes; `role="dialog"` is labelled by `DialogTitle` and described by `DialogDescription` (move the two `aria-describedby` tests here). Also a Sheet variant of the open/close test.

- [ ] **Step 6: Field tests** (`tests/components/field.test.tsx`): the explicit contract —

```tsx
render(
  <Field data-invalid>
    <FieldLabel htmlFor="name">Name</FieldLabel>
    <Input id="name" aria-describedby="name-hint name-error" aria-invalid />
    <FieldDescription id="name-hint">Shown on your profile.</FieldDescription>
    <FieldError id="name-error">Required</FieldError>
  </Field>,
);
```

assert `getByLabelText("Name")` has `aria-invalid="true"`, its `aria-describedby` ids resolve to the two texts, `FieldError` has `role="alert"`, `Field` has `role="group"` and `data-invalid`. Also `FieldError` with `errors=[{message:"a"},{message:"a"},{message:"b"}]` renders two list items, and renders nothing with no errors.

- [ ] **Step 7: Progress**: replace the exact class-string assertion with `expect(fill.className).toContain("bg-primary")`.
- [ ] **Step 8: Run** `pnpm lint && pnpm test`. Commit: `fix: Button defaults to type=button; submenus leave on dismissal; behavioural tests`.

---

### Task 6: Radius and typography cleanup

**Files:** `src/components/button.tsx`, `badge.tsx`, `tabs.tsx`, `input-group.tsx`, `select.tsx`, `tooltip.tsx`

- [ ] `button.tsx`: `rounded-[min(var(--radius-md),10px)]` and `rounded-[min(var(--radius-md),12px)]` → `rounded-md` (identical at the default radius: `radius-md` is 8px); `text-[0.8rem]` → `text-sm`; drop every `in-data-[slot=button-group]:rounded-lg` (no ButtonGroup exists).
- [ ] `badge.tsx`, `tabs.tsx`: `focus-visible:ring-[3px]` → `focus-visible:ring-3`.
- [ ] `input-group.tsx`: `[&>kbd]:rounded-[calc(var(--radius)-5px)]` → `[&>kbd]:rounded-sm`; `rounded-[calc(var(--radius)-3px)]` → `rounded-md` (both sites).
- [ ] `select.tsx`: `data-[size=sm]:rounded-[min(var(--radius-md),10px)]` → `data-[size=sm]:rounded-md`.
- [ ] `tooltip.tsx`: arrow `rounded-[2px]` → `rounded-xs` (Tailwind's `xs` step is 2px).
- [ ] Run `pnpm lint && pnpm test`. Commit: `refactor: scale radii and type sizes instead of arbitrary values`.

---

### Task 7: Package metadata and `@source`

**Files:** `package.json`, `src/theme/styles.css`

- [ ] `package.json`: `version: 0.3.0`; description "Robomous design system: owned React components over Radix and Base UI, and the one stylesheet they resolve through."; `sideEffects: ["**/*.css"]`; `files: ["dist", "src"]` (src is clean now); scripts add `"verify": "pnpm format:check && pnpm lint && pnpm test && pnpm build && pnpm --filter @robomous/ui-core-catalog typecheck && pnpm --filter @robomous/ui-core-catalog build && pnpm test:package"` (catalog filter lands in Task 9; add it there).
- [ ] `styles.css`: `@source "..";` → `@source "../components";` with a short comment (relative to this file; scanning only the components).
- [ ] Commit: `chore: 0.3.0 metadata, sideEffects, narrow @source`.

---

### Task 8: Packed-consumer integration test; retire the simulations

**Files:**
- Create: `tests/package/consumer.test.ts`
- Delete: `tests/theme/imports.test.ts`
- Modify: `tests/theme/tokens.test.ts` (drop the `@source` structural test and the import-order anchors; keep the mirror, radius derivation, closed palette, no `:focus-visible`)

- [ ] **Step 1: Write the test.** Node environment. Helpers: `run(cmd, args, cwd)` via `spawnSync` with `shell: process.platform === "win32"`, failing with stdout+stderr on non-zero. Steps inside one `describe` with `beforeAll`:
  1. `pnpm build` in the repo.
  2. `pnpm pack --pack-destination <tmp>`; locate the single `.tgz`, copy to `<consumer>/ui-core.tgz`.
  3. Write `<consumer>/package.json` with `dependencies: { "@robomous/ui-core": "file:./ui-core.tgz", react, react-dom }` (versions copied from the repo's devDependencies) and `devDependencies: { tailwindcss, "@tailwindcss/cli": <same>, vite: "^8.0.0" }`.
  4. `pnpm install --ignore-scripts` in `<consumer>`.
  5. Write `src/app.css` = `@import "@robomous/ui-core/styles.css";\n@source "./";` and `src/App.tsx` that imports `Button`, `Badge` and writes `className="bg-red-500 text-emerald-700 bg-brand p-4"` on a wrapper.
  6. `pnpm exec tailwindcss -i src/app.css -o dist/app.css`.
  7. Write `render.mjs` (react-dom/server `renderToStaticMarkup(createElement(Button, null, "Go"))`) and `bundle.mjs` (vite `build` with `write: false`, lib entry `export { Button } from "@robomous/ui-core"`, external `/^react/`, print JSON of module ids).
- [ ] **Step 2: Assertions.**
  - CSS contains: `.h-8`, `.min-w-32`, `.bg-success\/10`, `--color-success:`, `.bg-overlay`, `.data-\[state\=open\]\:animate-in`, `.data-open\:animate-in`, `Geist Variable`.
  - CSS lacks: `.bg-red-500`, `--color-red-500`, `.text-emerald-700`, `.bg-brand`, `--color-brand`.
  - Installed package: `node_modules/@robomous/ui-core/package.json#sideEffects` equals `["**/*.css"]`; the installed tree has no path matching `/\.test\.|[\\/]tests[\\/]|[\\/]gates[\\/]/` and has `dist/index.js`, `src/theme/styles.css`, `src/components/button.tsx`.
  - SSR output contains `type="button"` and `data-slot="button"`.
  - Bundle module ids: none match `/[\\/]sonner[\\/]/` or `/@base-ui/`. If the `toast` re-export drags sonner in, decide: remove `export { toast } from "sonner"` from `src/index.ts` and document `import { toast } from "sonner"` (record in MIGRATION); otherwise keep.
- [ ] **Step 3: Delete `tests/theme/imports.test.ts`** and the `@source`/import-order tests in `tokens.test.ts` (the consumer test proves those directly).
- [ ] **Step 4: Run** `pnpm test:package` (expect several minutes on first run). Commit: `test: verify the packed package as a real Tailwind consumer`.

---

### Task 9: Catalog workspace app

**Files:**
- Create: `pnpm-workspace.yaml` (`packages: ["examples/catalog"]`), `examples/catalog/package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/catalog.css`, `src/App.tsx`, `src/sections/{Foundations,Components,States}.tsx`
- Modify: root `package.json` scripts (`"catalog": "pnpm build && pnpm --filter @robomous/ui-core-catalog dev"`, extend `verify`), `.gitignore` (`examples/catalog/dist/`), `.prettierignore` (nothing new)

- [ ] `examples/catalog/package.json`: `name: "@robomous/ui-core-catalog"`, private, `dependencies: { "@robomous/ui-core": "workspace:*", react, react-dom }`, `devDependencies: { vite, @vitejs/plugin-react, @tailwindcss/vite, tailwindcss, typescript, @types/react, @types/react-dom }`, scripts `dev`, `build`, `typecheck: "tsc --noEmit"`.
- [ ] `src/catalog.css`: `@import "@robomous/ui-core/styles.css";\n@source "./";`
- [ ] `src/App.tsx`: a `<header>` with a light/dark toggle (toggles `dark` on `<html>`), then the three sections. Foundations: swatches for every semantic role rendered as `bg-<role>` tiles with the role name; typography (`text-xs`…`text-2xl`), radius steps, a focused Button/Input showing the ring. Components: Button (all variants × sizes), Badge (all variants), Field+Input+Textarea (default/invalid/disabled), Select, Combobox, Dialog, Sheet, DropdownMenu (with submenu), Tabs (default/line), Table, Alert, Progress, Skeleton, Toaster with a button firing `toast`. States: a matrix row per state (default, hover hint text, focus, disabled, invalid, success, warning, info, destructive) using Button/Badge/Input.
- [ ] `pnpm install` (updates the lockfile with the workspace); `pnpm build && pnpm --filter @robomous/ui-core-catalog typecheck && pnpm --filter @robomous/ui-core-catalog build`. Commit: `docs: visual catalog under examples/catalog`.

---

### Task 10: CI, release, documentation, migration guide

**Files:** `.github/workflows/ci.yml`, `.github/workflows/release.yml`, `docs/DESIGN.md` (moved from root), `docs/CONTRIBUTING.md`, `docs/MIGRATION-0.3.md`, `docs/components/README.md`, `README.md`

- [ ] `ci.yml` steps: install → `pnpm format:check` → `pnpm lint` → `pnpm test` → `pnpm build` → catalog typecheck + build → `pnpm test:package`. `release.yml`: after install run `pnpm verify`, then the tag check, then `npm publish --access public --provenance` (keep `id-token: write`, no `registry-url`).
- [ ] `docs/DESIGN.md`: rewrite against the implementation. Sections: Purpose/ownership; Tokens (closed namespace, roles incl. status + overlay, sidebar kept for shells, brand as a CSS variable only); Status vocabulary (semantic utilities, Badge variants); Action hierarchy; Feedback; Surfaces/borders/focus; Typography; Radius (scale only; the remaining arbitrary geometry is listed as exceptions); Motion (menus and submenus have no exit animation, why, and the test that holds it); Accessibility (Field is anatomy; wiring is explicit — show the snippet from Task 5); Adding a component; Verification (ESLint rule, behaviour tests, token mirror test, consumer test). Delete every reference to gates, scanners, `statusTone`, chart tokens.
- [ ] `docs/MIGRATION-0.3.md`: the consumer-audit table above, expanded with before/after snippets per file.
- [ ] `docs/CONTRIBUTING.md`: setup, scripts, how to add a component, how to run the catalog, release steps. `docs/components/README.md`: one table row per component (anatomy, behaviour library, notes). `README.md`: drop the gates section, point at docs.
- [ ] Run `pnpm verify`. Commit: `docs: DESIGN.md matches the implementation; migration guide; CI runs the full pipeline`.

---

## Self-review

- Spec coverage: §1–5 Tasks 1,3,7,10; §6–9 Task 2; §10–11 Task 3; §12–14 Task 5; §15–16 Task 4; §17–18 Task 1; §19–21 Tasks 7–8; §22 Task 2 (mirror kept); §23 Task 10; §24 Task 6; §25 Tasks 7–8; §26 Task 10; §27 Task 9; §28 Task 5; §29 no new runtime deps; §31 audit table.
- Deliberate deviations: no `components.json` (it only serves the shadcn CLI, which this package retired); no `utilities.css` (the one custom utility is inlined at its single call site); no `--success-foreground` family (nothing consumes it; add when a solid status surface carries text); `--overlay` keeps the same value in both themes to preserve current rendering.
