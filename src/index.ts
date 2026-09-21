/**
 * `@robomous/ui-core` — the Robomous design system, built on top of shadcn/ui.
 *
 * Twenty-two React components this package owns outright, over Radix and Base
 * UI behaviour, and the one stylesheet they resolve through. A consumer imports
 * exactly:
 *
 * ```ts
 * import "@robomous/ui-core/styles.css";   // once, in the app's entry
 * import { Button, Card } from "@robomous/ui-core";
 * ```
 *
 * The public surface is listed explicitly rather than `export *`, so what this
 * package promises can be read off this one file. Status colour is a semantic
 * utility (`bg-success`, `text-warning`, `border-info`), not an export.
 */

// The runtime mirror of the stylesheet's tokens, for a caller that cannot read CSS.
export { cssVar, DARK_THEME, LIGHT_THEME, THEME } from "./theme/tokens.js";

export { cn } from "cn";

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
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./components/dialog.js";
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./components/sheet.js";
export { Tabs, TabsContent, TabsList, tabsListVariants, TabsTrigger } from "./components/tabs.js";
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./components/select.js";
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
export { Separator } from "./components/separator.js";
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
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "./components/sidebar.js";

// The hooks the components are built on, for a shell that needs the same answer.
export { useIsMobile } from "./hooks/use-mobile.js";
