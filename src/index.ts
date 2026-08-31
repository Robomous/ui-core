/**
 * `@robomous/ui-core` — the Robomous design system.
 *
 * Extracted from Robomous/VisionSet. UI primitives: Radix behaviour under
 * shadcn Nova styling, iconed with lucide; the foundation design tokens; and
 * the status-tone vocabulary. A consumer imports exactly:
 *
 * ```ts
 * import "@robomous/ui-core/styles.css";   // once, in the app's entry
 * import { Button, Card } from "@robomous/ui-core";
 * ```
 *
 * The public surface is listed explicitly rather than `export *`, so what this
 * package promises stays auditable. The gates that keep the primitives
 * canonical are published too: `import { ... } from "@robomous/ui-core/gates"`.
 */

// The design tokens, and their prose contract in DESIGN.md.
export { cssVar, DARK_THEME, LIGHT_THEME, THEME } from "./tokens.js";

export { inlineLink } from "./lib/button.js";
export { cn } from "./lib/cn.js";
export { menuSurface } from "./lib/menu.js";
export { twoLineTrigger } from "./lib/select.js";
export { progressAria } from "./lib/progress.js";

// The one home for status colour outside the Badge.
export { STATUS_INK, TONE_BORDER, TONE_FILL, type StatusTone } from "./statusTone.js";

// Primitives — Radix behaviour under shadcn Nova styling, iconed with lucide.
export { Button, buttonVariants } from "./primitives/button.js";
export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./primitives/card.js";
export { Input } from "./primitives/input.js";
export { Textarea } from "./primitives/textarea.js";
export { Label } from "./primitives/label.js";
export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "./primitives/field.js";
export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "./primitives/input-group.js";
export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from "./primitives/combobox.js";
export { Badge, badgeVariants } from "./primitives/badge.js";
export { Alert, AlertAction, AlertDescription, AlertTitle } from "./primitives/alert.js";
export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "./primitives/dialog.js";
export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./primitives/sheet.js";
export { Tabs, TabsContent, TabsList, tabsListVariants, TabsTrigger } from "./primitives/tabs.js";
export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue } from "./primitives/select.js";
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./primitives/dropdown-menu.js";
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./primitives/tooltip.js";
export { Progress } from "./primitives/progress.js";
export { Skeleton } from "./primitives/skeleton.js";
export { Toaster } from "./primitives/sonner.js";
export { toast } from "sonner";
export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./primitives/table.js";
