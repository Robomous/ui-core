# Components

Forty-five components, one file each in `src/components/`, exported by name from `src/index.ts`.
The package is built on top of shadcn/ui: a component enters from the shadcn registry through
`components.json` (`pnpm dlx shadcn@latest add <name>`), is adapted to the rules in
[DESIGN.md](../DESIGN.md), and is owned here from then on.
The file is the reference for anatomy, variants and class strings; this table says what each one
is for and where its behaviour comes from. Every one of them has a page, with live demos and a
generated API table, in the docs site under `examples/catalog/` (`pnpm docs:dev`).

| Component | Anatomy exported | Behaviour | Notes |
| --- | --- | --- | --- |
| Accordion | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` | Radix Accordion | `type`: `single` (with `collapsible`) or `multiple`. Each trigger is a button in an `h3`; the arrows, Home and End move between them. The height animation plays both ways: a region in the flow has no dismissable layer. |
| Alert | `Alert`, `AlertTitle`, `AlertDescription`, `AlertAction` | none (`role="alert"`) | `default`, `destructive`. `destructive` wears `bg-destructive-surface text-destructive` with a transparent border. |
| Attachment | `Attachment`, `AttachmentGroup`, `AttachmentMedia`, `AttachmentContent`, `AttachmentTitle`, `AttachmentDescription`, `AttachmentActions`, `AttachmentAction`, `AttachmentTrigger` | Radix Slot (`asChild` on the trigger) | An uploaded file as a card. `state`: `idle`, `uploading`, `processing`, `error`, `done` — every part styles off it. `size`, `orientation`. `AttachmentTrigger` covers the card and renders `type="button"`. |
| Avatar | `Avatar`, `AvatarImage`, `AvatarFallback`, `AvatarBadge`, `AvatarGroup`, `AvatarGroupCount` | Radix Avatar | `size`: `sm`, `default`, `lg`, carried as `data-size` so a group sizes its overflow count to match. A fallback is not optional. |
| Badge | `Badge`, `badgeVariants` | Radix Slot (`asChild`) | `default`, `secondary`, `destructive`, `success`, `warning`, `info`, `quiet`, `outline`, `ghost`, `link`. The four statuses are `bg-<status>-surface text-<status>`: a Tailwind 50/950 surface under a 700/300 ink. |
| Breadcrumb | `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis` | Radix Slot (`asChild` on the link) | `nav[aria-label="breadcrumb"]`. The last crumb is a `BreadcrumbPage` (`aria-current="page"`), not a link; separators are `aria-hidden`. |
| Button | `Button`, `buttonVariants` | Radix Slot (`asChild`) | `type="button"` by default. Six variants; sizes incl. `icon-*` and `inline`. |
| ButtonGroup | `ButtonGroup`, `ButtonGroupText`, `ButtonGroupSeparator`, `buttonGroupVariants` | Radix Slot (`asChild` on the text segment) | `role="group"`; `orientation`. Rounds the first and last child that carry a `data-slot`, so every segment has one. |
| Card | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` | none | `size="sm"` tightens `--card-spacing`. |
| Checkbox | `Checkbox` | Radix Checkbox | `aria-checked`, incl. `mixed` for `checked="indeterminate"`, drawn filled with a dash rather than a tick. `type="button"`; inside a form a hidden native input posts `name`. `aria-invalid` styles the invalid state. |
| Collapsible | `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` | Radix Collapsible | Unstyled. The trigger carries `aria-expanded` and `aria-controls`; give it a real control through `asChild`. |
| Combobox | `Combobox`, `ComboboxInput`, `ComboboxContent`, `ComboboxList`, `ComboboxItem`, `ComboboxGroup`, `ComboboxLabel`, `ComboboxCollection`, `ComboboxEmpty`, `ComboboxSeparator`, `ComboboxChips`, `ComboboxChip`, `ComboboxChipsInput`, `ComboboxTrigger`, `ComboboxValue`, `useComboboxAnchor` | Base UI Combobox | Bare `data-open` / `data-highlighted` state attributes. |
| Command | `Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandSeparator`, `CommandShortcut` | cmdk; `CommandDialog` adds Radix Dialog | A listbox driven from a field the reader never leaves. `CommandDialog`'s title and description are `sr-only` *inside* the dialog, which is what names it. |
| ContextMenu | `ContextMenu`, `ContextMenuTrigger`, `ContextMenuPortal`, `ContextMenuContent`, `ContextMenuGroup`, `ContextMenuLabel`, `ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioGroup`, `ContextMenuRadioItem`, `ContextMenuSeparator`, `ContextMenuShortcut`, `ContextMenuSub`, `ContextMenuSubTrigger`, `ContextMenuSubContent` | Radix ContextMenu | No exit animation on either surface, for DropdownMenu's reason. `variant="destructive"` and `inset` on an item. |
| Dialog | `Dialog`, `DialogTrigger`, `DialogPortal`, `DialogOverlay`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose` | Radix Dialog | `showCloseButton` on Content and Footer. Overlay paints `bg-overlay`. Keeps its exit animation. |
| Drawer | `Drawer`, `DrawerTrigger`, `DrawerPortal`, `DrawerOverlay`, `DrawerContent`, `DrawerHeader`, `DrawerFooter`, `DrawerTitle`, `DrawerDescription`, `DrawerClose` | vaul | The one component whose behaviour is neither Radix nor Base UI. `direction`; a drag handle on the bottom drawer. Overlay paints `bg-overlay`. Keeps its exit animation, as a Dialog does. |
| DropdownMenu | `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuPortal`, `DropdownMenuContent`, `DropdownMenuGroup`, `DropdownMenuLabel`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent` | Radix DropdownMenu | Sizes to its items (`min-w-32` floor). No exit animation on either surface. `variant="destructive"` on an item. |
| Empty | `Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription`, `EmptyContent` | none | The panel that says what is missing and what to do about it. `EmptyMedia` `variant`: `default`, `icon`. |
| Field | `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldSet`, `FieldLegend`, `FieldContent`, `FieldTitle`, `FieldSeparator` | none (`Field` is `role="group"`, `FieldError` is `role="alert"`) | Anatomy only: `htmlFor`, `id`, `aria-describedby`, `aria-invalid` are the call site's. `orientation` and `data-invalid` on `Field`. |
| HoverCard | `HoverCard`, `HoverCardTrigger`, `HoverCardContent` | Radix HoverCard | Pointer-only preview, so it is never the sole route to anything. Keeps its exit animation: nothing is waiting on the frame after. |
| Input | `Input` | native | `aria-invalid` styles the invalid state. |
| InputGroup | `InputGroup`, `InputGroupAddon`, `InputGroupButton`, `InputGroupInput`, `InputGroupText`, `InputGroupTextarea` | none | Addon `align`: `inline-start`, `inline-end`, `block-start`, `block-end`. |
| Item | `Item`, `ItemGroup`, `ItemSeparator`, `ItemMedia`, `ItemContent`, `ItemTitle`, `ItemDescription`, `ItemActions`, `ItemHeader`, `ItemFooter` | Radix Slot (`asChild`) | A row with a title, a description and its own actions. `variant`: `default`, `outline`, `muted`; `size`: `default`, `sm`, `xs`. `ItemGroup` is `role="list"`. |
| Kbd | `Kbd`, `KbdGroup` | none | A real `<kbd>`. `KbdGroup` holds a chord. |
| Label | `Label` | Radix Label | |
| Pagination | `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis` | Button (Radix Slot) under each link | `nav[aria-label="pagination"]`; every step is a real anchor. `isActive` renders `aria-current="page"` and `data-active`, styled through shadcn's variant layer. |
| Popover | `Popover`, `PopoverTrigger`, `PopoverAnchor`, `PopoverContent`, `PopoverHeader`, `PopoverTitle`, `PopoverDescription` | Radix Popover | No exit animation: its trigger is a button the reader can press again on the next frame. |
| Progress | `Progress` | Radix Progress | Forwards `value`; `aria-valuenow` announced. No variant. |
| RadioGroup | `RadioGroup`, `RadioGroupItem` | Radix RadioGroup | One tab stop; the arrows move the selection, not just the focus. `aria-invalid` styles the invalid state. |
| ScrollArea | `ScrollArea`, `ScrollBar` | Radix ScrollArea | The viewport is the scroll container, not the root. `ScrollBar` `orientation`. |
| Select | `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectGroup`, `SelectLabel`, `SelectItem`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton` | Radix Select | `SelectTrigger` `size` (`sm`, `default`) and `multiline`. |
| Separator | `Separator` | Radix Separator | `orientation`, `decorative`. |
| Sheet | `Sheet`, `SheetTrigger`, `SheetClose`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription` | Radix Dialog | `side`: `top`, `right`, `bottom`, `left`. |
| Sidebar | `SidebarProvider`, `Sidebar`, `SidebarTrigger`, `SidebarRail`, `SidebarInset`, `SidebarInput`, `SidebarHeader`, `SidebarFooter`, `SidebarSeparator`, `SidebarContent`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarGroupAction`, `SidebarGroupContent`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarMenuAction`, `SidebarMenuBadge`, `SidebarMenuSkeleton`, `SidebarMenuSub`, `SidebarMenuSubItem`, `SidebarMenuSubButton`, `useSidebar` | Radix Slot (`asChild`); a Sheet (Radix Dialog) under 768px; Tooltip on a collapsed `SidebarMenuButton` | `side`, `variant` (`sidebar`, `floating`, `inset`), `collapsible` (`offcanvas`, `icon`, `none`). `⌘/Ctrl+B` toggles; state persists in the `sidebar_state` cookie. `isActive` renders `data-active`, styled through shadcn's variant layer. |
| Skeleton | `Skeleton` | none | |
| Slider | `Slider` | Radix Slider | The value is an array; one thumb per value, `[min]` when none is given. `aria-label` / `aria-labelledby` land on each thumb, the element with `role="slider"`. `orientation`. |
| Sonner | `Toaster`, `toast` | sonner | `Toaster` follows the `dark` class on `<html>`; icons from lucide. `richColors` is on: typed toasts wear the status surface and ink roles (`richColors={false}` for neutral ones). |
| Spinner | `Spinner` | none (`role="status"`) | A lucide glyph that announces itself as `Loading`. Compose it into a Button with `data-icon` and `disabled`; there is no `isPending` prop. |
| Switch | `Switch` | Radix Switch | `role="switch"` with `aria-checked`, for a setting that applies at once; not a Toggle (`aria-pressed`). `size`: `sm`, `default`. |
| Table | `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption` | native | A `rounded-xl border` frame that is also the `overflow-x-auto` scroller. Header on `bg-muted/50` in muted ink; 52px rows; a vertical rule per column (none on the last); the caption closes the frame as a bordered band. |
| Tabs | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, `tabsListVariants` | Radix Tabs | `TabsList` `variant`: `default`, `line`. Horizontal and vertical. |
| Textarea | `Textarea` | native | `field-sizing-content`. |
| Toggle | `Toggle`, `toggleVariants` | Radix Toggle | `aria-pressed` is the state. `variant`: `default`, `outline`; `size`: `sm`, `default`, `lg`. |
| ToggleGroup | `ToggleGroup`, `ToggleGroupItem` | Radix ToggleGroup | `type`: `single` (radios) or `multiple` (pressed buttons). `spacing={0}` welds the segments into one control; `orientation`. Items inherit the group's `variant` and `size`. |
| Tooltip | `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent` | Radix Tooltip | `delayDuration` defaults to `0`. Painted `bg-foreground text-background`. |

Also exported: `cn`, and the `useIsMobile` hook the Sidebar decides its mode with. The tokens
themselves are not exported: they live in `src/theme/styles.css` and are reached as `var(--role)`.
