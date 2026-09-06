/**
 * `@robomous/ui-core` — the Robomous design system.
 *
 * Twenty-one React components this package owns outright, the design tokens
 * they resolve through, and the status-tone vocabulary. A consumer imports
 * exactly:
 *
 * ```ts
 * import "@robomous/ui-core/styles.css";   // once, in the app's entry
 * import { Button, Card } from "@robomous/ui-core";
 * ```
 *
 * The public surface is listed explicitly rather than `export *`, so what this
 * package promises stays auditable. The scanners behind this repository's own
 * design rules are published too, for a consumer to run over its own sources:
 * `import { ... } from "@robomous/ui-core/gates"`. DESIGN.md names each rule
 * and the gate that holds it.
 */

// The design tokens, and their prose contract in DESIGN.md.
export { cssVar, DARK_THEME, LIGHT_THEME, THEME } from "./theme/tokens.js";

export { cn } from "cn";

// The one home for status colour outside the Badge.
export { STATUS_INK, TONE_BORDER, TONE_FILL, type StatusTone } from "./theme/statusTone.js";

// The components — Radix and Base UI behaviour, iconed with lucide.
export { Button, buttonVariants } from "./components/button.js";
export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/card.js";
export { Input } from "./components/input.js";
export { Textarea } from "./components/textarea.js";
export { Label } from "./components/label.js";
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
} from "./components/field.js";
export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "./components/input-group.js";
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
} from "./components/combobox.js";
export { Badge, badgeVariants } from "./components/badge.js";
export { Alert, AlertAction, AlertDescription, AlertTitle } from "./components/alert.js";
export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "./components/dialog.js";
export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./components/sheet.js";
export { Tabs, TabsContent, TabsList, tabsListVariants, TabsTrigger } from "./components/tabs.js";
export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue } from "./components/select.js";
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
} from "./components/dropdown-menu.js";
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/tooltip.js";
export { Progress } from "./components/progress.js";
export { Skeleton } from "./components/skeleton.js";
export { Toaster } from "./components/sonner.js";
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
} from "./components/table.js";
