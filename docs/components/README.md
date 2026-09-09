# Components

Twenty-one components, one file each in `src/components/`, exported by name from `src/index.ts`.
The file is the reference for anatomy, variants and class strings; this table says what each one
is for and where its behaviour comes from. Every one of them is shown in every state it has in
`examples/catalog/` (`pnpm catalog`).

| Component | Anatomy exported | Behaviour | Notes |
| --- | --- | --- | --- |
| Alert | `Alert`, `AlertTitle`, `AlertDescription`, `AlertAction` | none (`role="alert"`) | `default`, `destructive`. Ink recolours; the border does not. |
| Badge | `Badge`, `badgeVariants` | Radix Slot (`asChild`) | `default`, `secondary`, `destructive`, `success`, `warning`, `info`, `quiet`, `outline`, `ghost`, `link`. |
| Button | `Button`, `buttonVariants` | Radix Slot (`asChild`) | `type="button"` by default. Six variants; sizes incl. `icon-*` and `inline`. |
| Card | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` | none | `size="sm"` tightens `--card-spacing`. |
| Combobox | `Combobox`, `ComboboxInput`, `ComboboxContent`, `ComboboxList`, `ComboboxItem`, `ComboboxGroup`, `ComboboxLabel`, `ComboboxCollection`, `ComboboxEmpty`, `ComboboxSeparator`, `ComboboxChips`, `ComboboxChip`, `ComboboxChipsInput`, `ComboboxTrigger`, `ComboboxValue`, `useComboboxAnchor` | Base UI Combobox | Bare `data-open` / `data-highlighted` state attributes. |
| Dialog | `Dialog`, `DialogTrigger`, `DialogPortal`, `DialogOverlay`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose` | Radix Dialog | `showCloseButton` on Content and Footer. Overlay paints `bg-overlay`. Keeps its exit animation. |
| DropdownMenu | `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuPortal`, `DropdownMenuContent`, `DropdownMenuGroup`, `DropdownMenuLabel`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent` | Radix DropdownMenu | Sizes to its items (`min-w-32` floor). No exit animation on either surface. `variant="destructive"` on an item. |
| Field | `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldSet`, `FieldLegend`, `FieldContent`, `FieldTitle`, `FieldSeparator` | none (`Field` is `role="group"`, `FieldError` is `role="alert"`) | Anatomy only: `htmlFor`, `id`, `aria-describedby`, `aria-invalid` are the call site's. `orientation` and `data-invalid` on `Field`. |
| Input | `Input` | native | `aria-invalid` styles the invalid state. |
| InputGroup | `InputGroup`, `InputGroupAddon`, `InputGroupButton`, `InputGroupInput`, `InputGroupText`, `InputGroupTextarea` | none | Addon `align`: `inline-start`, `inline-end`, `block-start`, `block-end`. |
| Label | `Label` | Radix Label | |
| Progress | `Progress` | Radix Progress | Forwards `value`; `aria-valuenow` announced. No variant. |
| Select | `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectGroup`, `SelectLabel`, `SelectItem`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton` | Radix Select | `SelectTrigger` `size` (`sm`, `default`) and `multiline`. |
| Separator | `Separator` | Radix Separator | `orientation`, `decorative`. |
| Sheet | `Sheet`, `SheetTrigger`, `SheetClose`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription` | Radix Dialog | `side`: `top`, `right`, `bottom`, `left`. |
| Skeleton | `Skeleton` | none | |
| Sonner | `Toaster`, `toast` | sonner | `Toaster` follows the `dark` class on `<html>`; icons from lucide. |
| Table | `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption` | native | `Table` wraps itself in an `overflow-x-auto` container. |
| Tabs | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, `tabsListVariants` | Radix Tabs | `TabsList` `variant`: `default`, `line`. Horizontal and vertical. |
| Textarea | `Textarea` | native | `field-sizing-content`. |
| Tooltip | `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent` | Radix Tooltip | `delayDuration` defaults to `0`. Painted `bg-foreground text-background`. |

Also exported: `cn`, and the token mirror `LIGHT_THEME`, `DARK_THEME`, `THEME`, `cssVar`.
