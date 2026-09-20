import { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  Badge,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  Kbd,
  KbdGroup,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
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
  SidebarSeparator,
  Skeleton,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  toast,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@robomous/ui-core";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  CopyIcon,
  FileIcon,
  FolderIcon,
  ImageIcon,
  InboxIcon,
  ItalicIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SettingsIcon,
  TrashIcon,
  UnderlineIcon,
  UserIcon,
  XIcon,
} from "lucide-react";

import { Section, Specimen } from "../App";

const VARIANTS = ["default", "outline", "secondary", "ghost", "destructive", "link"] as const;
const SIZES = ["xs", "sm", "default", "lg"] as const;
const BADGES = [
  "default",
  "secondary",
  "outline",
  "quiet",
  "success",
  "warning",
  "info",
  "destructive",
] as const;
const FRUIT = ["apple", "banana", "cherry", "date", "elderberry"];

export function Components() {
  return (
    <Section
      id="components"
      title="Components"
      lede="Forty owned components over Radix, Base UI, cmdk and vaul behaviour. Anatomy is composed at the call site; geometry and colour are the component's."
    >
      <Specimen
        title="Button"
        note="Six variants, one intent each. A plain Button never submits a form."
      >
        <div className="flex flex-col gap-3">
          {SIZES.map((size) => (
            <div key={size} className="flex flex-wrap items-center gap-2">
              <span className="w-14 font-mono text-xs text-muted-foreground">{size}</span>
              {VARIANTS.map((variant) => (
                <Button key={variant} variant={variant} size={size}>
                  {variant}
                </Button>
              ))}
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span className="w-14 font-mono text-xs text-muted-foreground">icon</span>
            <Button size="icon-xs" aria-label="xs">
              ×
            </Button>
            <Button size="icon-sm" aria-label="sm">
              ×
            </Button>
            <Button size="icon" aria-label="default">
              ×
            </Button>
            <Button size="icon-lg" aria-label="lg">
              ×
            </Button>
            <span className="text-sm">
              An inline{" "}
              <Button variant="link" size="inline">
                link button
              </Button>{" "}
              inside a sentence.
            </span>
          </div>
        </div>
      </Specimen>

      <Specimen title="Badge" note="Status is a soft surface plus ink; it is never a stroke.">
        {BADGES.map((variant) => (
          <Badge key={variant} variant={variant}>
            {variant}
          </Badge>
        ))}
      </Specimen>

      <Specimen
        title="Field, Input, Textarea"
        note="Anatomy from the component; aria wiring from the call site."
      >
        <div className="grid w-full max-w-lg gap-5">
          <Field>
            <FieldLabel htmlFor="c-name">Project name</FieldLabel>
            <Input id="c-name" placeholder="warehouse-cameras" aria-describedby="c-name-hint" />
            <FieldDescription id="c-name-hint">Lowercase, hyphens allowed.</FieldDescription>
          </Field>
          <Field data-invalid>
            <FieldLabel htmlFor="c-key">API key</FieldLabel>
            <Input
              id="c-key"
              defaultValue="rk_live_…"
              aria-invalid
              aria-describedby="c-key-error"
            />
            <FieldError id="c-key-error">This key was revoked.</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="c-notes">Notes</FieldLabel>
            <Textarea id="c-notes" placeholder="What is this dataset for?" />
          </Field>
        </div>
      </Specimen>

      <Specimen title="Select and Combobox">
        <Select defaultValue="tiny">
          <SelectTrigger className="w-56" aria-label="Model">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tiny">org/model-tiny</SelectItem>
            <SelectItem value="base">org/model-base</SelectItem>
            <SelectItem value="large">org/model-large</SelectItem>
          </SelectContent>
        </Select>
        <Combobox items={FRUIT}>
          <ComboboxInput placeholder="Pick a fruit" aria-label="Fruit" className="w-56" />
          <ComboboxContent>
            <ComboboxEmpty>No matches</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Specimen>

      <Specimen
        title="Dialog and Sheet"
        note="Focus trap, Escape and labelling are Radix's; the exit animation stays because the trigger cannot be pressed again immediately."
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete this dataset?</DialogTitle>
              <DialogDescription>
                Eleven batches and their annotations go with it. This cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter showCloseButton>
              <Button variant="destructive">Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Narrow the list to what you are looking for.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </Specimen>

      <Specimen
        title="DropdownMenu and Tooltip"
        note="A menu leaves on the frame it is dismissed — open one, press Escape, open the other."
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Dataset</DropdownMenuLabel>
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Export</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>COCO</DropdownMenuItem>
                <DropdownMenuItem>YOLO</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">More</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Check integrity of this connection</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              Painted foreground-on-background, so it flips with the page.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Specimen>

      <Specimen title="Tabs">
        <Tabs defaultValue="schema" className="w-full">
          <TabsList aria-label="Sections">
            <TabsTrigger value="schema">Schema</TabsTrigger>
            <TabsTrigger value="batches">Batches</TabsTrigger>
            <TabsTrigger value="exports">Exports</TabsTrigger>
          </TabsList>
          <TabsContent value="schema">The classes.</TabsContent>
          <TabsContent value="batches">The batches.</TabsContent>
          <TabsContent value="exports">The exports.</TabsContent>
        </Tabs>
        <Tabs defaultValue="schema" className="w-full">
          <TabsList variant="line" aria-label="Sections, line variant">
            <TabsTrigger value="schema">Schema</TabsTrigger>
            <TabsTrigger value="batches">Batches</TabsTrigger>
          </TabsList>
          <TabsContent value="schema">The classes.</TabsContent>
          <TabsContent value="batches">The batches.</TabsContent>
        </Tabs>
      </Specimen>

      <Specimen title="Table and Card">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Batches</CardTitle>
            <CardDescription>
              Each row carries its state as a Badge, with a word beside the colour.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Frames</TableHead>
                  <TableHead>State</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono">batch-0041</TableCell>
                  <TableCell>1,204</TableCell>
                  <TableCell>
                    <Badge variant="success">completed</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">batch-0042</TableCell>
                  <TableCell>318</TableCell>
                  <TableCell>
                    <Badge variant="warning">review pending</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">batch-0043</TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>
                    <Badge variant="destructive">failed</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Specimen>

      <Specimen
        title="Feedback"
        note="Alert in place; toast for an outcome; Progress carries no polarity."
      >
        <div className="flex w-full flex-col gap-4">
          <Alert>
            <AlertTitle>Ingest paused</AlertTitle>
            <AlertDescription>The bucket is unreachable. Retrying in a minute.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Export failed</AlertTitle>
            <AlertDescription>Two frames reference a class that no longer exists.</AlertDescription>
          </Alert>
          <Separator />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => toast.success("Saved")}>
              toast.success
            </Button>
            <Button variant="outline" onClick={() => toast.warning("Storage almost full")}>
              toast.warning
            </Button>
            <Button variant="outline" onClick={() => toast.info("Export queued")}>
              toast.info
            </Button>
            <Button variant="outline" onClick={() => toast.error("Could not connect")}>
              toast.error
            </Button>
          </div>
          <Separator />
          <div className="flex items-center gap-4">
            <Progress value={42} aria-label="Ingest" className="w-64" />
            <span className="text-sm text-muted-foreground">42% ingested</span>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      </Specimen>
      <Specimen
        title="Sidebar"
        note='Shown as collapsible="none": the offcanvas and icon modes position themselves fixed to the viewport.'
      >
        <SidebarProvider className="min-h-0 w-auto">
          <Sidebar collapsible="none" className="h-[26rem] rounded-lg ring-1 ring-sidebar-border">
            <SidebarHeader>
              <SidebarInput placeholder="Search" aria-label="Search" />
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                <SidebarGroupAction title="Add">
                  <PlusIcon />
                  <span className="sr-only">Add</span>
                </SidebarGroupAction>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>
                        <InboxIcon />
                        <span>Inbox</span>
                      </SidebarMenuButton>
                      <SidebarMenuBadge>12</SidebarMenuBadge>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <FolderIcon />
                        <span>Datasets</span>
                      </SidebarMenuButton>
                      <SidebarMenuAction showOnHover title="More">
                        <MoreHorizontalIcon />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton href="#components" isActive>
                            <span>Training</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton href="#components">
                            <span>Validation</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <SettingsIcon />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator />
              <SidebarGroup>
                <SidebarGroupLabel>Loading</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuSkeleton showIcon />
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuSkeleton showIcon />
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton size="lg">
                    <UserIcon />
                    <span>Signed in</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
        </SidebarProvider>
      </Specimen>

      <Specimen
        title="Avatar"
        note="Three sizes carried as data, so a stack sizes its overflow count to match. A fallback is not optional."
      >
        <Avatar size="sm">
          <AvatarFallback>YA</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>YA</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>YA</AvatarFallback>
          <AvatarBadge />
        </Avatar>
        <AvatarGroup>
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+3</AvatarGroupCount>
        </AvatarGroup>
      </Specimen>

      <Specimen
        title="Kbd and Spinner"
        note="A shortcut is a real <kbd>. A Button has no loading prop: compose a Spinner and disable it."
      >
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <Kbd>Esc</Kbd>
        <Spinner />
        <Button disabled>
          <Spinner data-icon="inline-start" />
          Uploading
        </Button>
        <Button variant="outline" size="sm" disabled>
          <Spinner data-icon="inline-start" />
          Saving
        </Button>
      </Specimen>

      <Specimen
        title="Toggle and ToggleGroup"
        note="aria-pressed is the state. spacing={0} welds a group into one control."
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Toggle aria-label="Bold">
              <BoldIcon />
            </Toggle>
            <Toggle defaultPressed aria-label="Italic">
              <ItalicIcon />
            </Toggle>
            <Toggle variant="outline" aria-label="Underline">
              <UnderlineIcon />
            </Toggle>
            <Toggle disabled aria-label="Disabled">
              <BoldIcon />
            </Toggle>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <ToggleGroup type="single" defaultValue="left" aria-label="Alignment">
              <ToggleGroupItem value="left" aria-label="Left">
                <AlignLeftIcon />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Centre">
                <AlignCenterIcon />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Right">
                <AlignRightIcon />
              </ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup
              type="multiple"
              variant="outline"
              spacing={0}
              defaultValue={["bold"]}
              aria-label="Marks"
            >
              <ToggleGroupItem value="bold" aria-label="Bold">
                <BoldIcon />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Italic">
                <ItalicIcon />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Underline">
                <UnderlineIcon />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </Specimen>

      <Specimen
        title="RadioGroup"
        note="One tab stop; the arrows move the selection, not just the focus."
      >
        <FieldSet>
          <FieldLegend>Visibility</FieldLegend>
          <RadioGroup defaultValue="internal">
            <Field orientation="horizontal">
              <RadioGroupItem id="c-vis-draft" value="draft" />
              <FieldLabel htmlFor="c-vis-draft">Draft</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <RadioGroupItem id="c-vis-internal" value="internal" />
              <FieldLabel htmlFor="c-vis-internal">Internal</FieldLabel>
            </Field>
            <Field orientation="horizontal" data-disabled>
              <RadioGroupItem id="c-vis-public" value="public" disabled />
              <FieldLabel htmlFor="c-vis-public">Public</FieldLabel>
            </Field>
          </RadioGroup>
        </FieldSet>
      </Specimen>

      <Specimen
        title="ButtonGroup"
        note="Segments weld into one control. Every segment carries the data-slot the rounding reads."
      >
        <div className="flex flex-col gap-3">
          <ButtonGroup>
            <ButtonGroupText>https://</ButtonGroupText>
            <Input placeholder="robomous.ai" aria-label="Domain" />
            <Button variant="outline">Check</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline">Publish</Button>
            <ButtonGroupSeparator />
            <Button variant="outline" size="icon" aria-label="More publish options">
              <ChevronDownIcon />
            </Button>
          </ButtonGroup>
          <ButtonGroup orientation="vertical" className="w-32">
            <Button variant="outline">Copy</Button>
            <Button variant="outline">Move</Button>
            <Button variant="outline">Archive</Button>
          </ButtonGroup>
        </div>
      </Specimen>

      <Specimen
        title="Breadcrumb and Pagination"
        note="Two landmarks. The crumb you are on is not a link; every page step is."
      >
        <div className="flex w-full flex-col gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#components">Datasets</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#components">Warehouse</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Batch 12</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#components" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#components" isActive={false}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#components" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#components" isActive={false}>
                  9
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#components" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Specimen>

      <Specimen
        title="Item and Empty"
        note="A row with its own title, description and actions — and the panel for when there are none."
      >
        <div className="flex w-full flex-col gap-6">
          <ItemGroup className="max-w-lg">
            <Item variant="outline">
              <ItemMedia variant="icon">
                <FileIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>batch-12.zip</ItemTitle>
                <ItemDescription>311.9 MB, uploaded today</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="ghost" size="icon-sm" aria-label="Copy link to batch-12.zip">
                  <CopyIcon />
                </Button>
                <Button variant="ghost" size="icon-sm" aria-label="Delete batch-12.zip">
                  <TrashIcon />
                </Button>
              </ItemActions>
            </Item>
            <Item variant="muted" size="sm">
              <ItemMedia variant="icon">
                <FolderIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>archive/</ItemTitle>
                <ItemDescription>48 batches</ItemDescription>
              </ItemContent>
            </Item>
          </ItemGroup>
          <Empty className="max-w-lg border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <InboxIcon />
              </EmptyMedia>
              <EmptyTitle>No batches yet</EmptyTitle>
              <EmptyDescription>
                Upload a batch to start labelling. Nothing is lost while you wait.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button>
                <PlusIcon data-icon="inline-start" />
                Upload a batch
              </Button>
            </EmptyContent>
          </Empty>
        </div>
      </Specimen>

      <Specimen
        title="Attachment"
        note="An uploaded file as a card. Its state is the hook every part styles from."
      >
        <AttachmentGroup>
          <Attachment state="done">
            <AttachmentMedia variant="icon">
              <FileIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>batch-12.zip</AttachmentTitle>
              <AttachmentDescription>311.9 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove batch-12.zip">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment state="uploading">
            <AttachmentMedia variant="icon">
              <Spinner />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>frames-03.tar</AttachmentTitle>
              <AttachmentDescription>1.2 GB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
          <Attachment state="error">
            <AttachmentMedia variant="icon">
              <FileIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>broken.zip</AttachmentTitle>
              <AttachmentDescription>Upload failed</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
          <Attachment state="idle" size="sm">
            <AttachmentMedia variant="icon">
              <ImageIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>Drop an image</AttachmentTitle>
            </AttachmentContent>
          </Attachment>
        </AttachmentGroup>
      </Specimen>

      <Specimen
        title="Popover and HoverCard"
        note="A popover leaves on the frame it is dismissed; a hover card, dismissed by the pointer, keeps its exit."
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Rename batch</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Rename</PopoverTitle>
              <PopoverDescription>Shown wherever this batch is listed.</PopoverDescription>
            </PopoverHeader>
            <Input defaultValue="batch-12" aria-label="Batch name" />
            <Button size="sm">Save</Button>
          </PopoverContent>
        </Popover>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">@robomous</Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex gap-2.5">
              <Avatar>
                <AvatarFallback>RO</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5">
                <span className="font-medium">Robomous</span>
                <span className="text-muted-foreground">Vision tooling. Joined 2026.</span>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </Specimen>

      <Specimen
        title="ContextMenu"
        note="Right-click the panel. Neither the menu nor its submenu animates out, so the next right-click lands."
      >
        <ContextMenu>
          <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
            Right-click here
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>batch-12.zip</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuItem>
                <CopyIcon />
                Copy link
                <ContextMenuShortcut>⌘C</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuCheckboxItem checked>Show hidden frames</ContextMenuCheckboxItem>
              <ContextMenuSub>
                <ContextMenuSubTrigger>Move to</ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuRadioGroup value="archive">
                    <ContextMenuRadioItem value="archive">Archive</ContextMenuRadioItem>
                    <ContextMenuRadioItem value="review">Review</ContextMenuRadioItem>
                  </ContextMenuRadioGroup>
                </ContextMenuSubContent>
              </ContextMenuSub>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive">
              <TrashIcon />
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Specimen>

      <Specimen
        title="Drawer"
        note="The one component over vaul. It is a dialog by every other measure, title included."
      >
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Open filters</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
              <DrawerDescription>Narrow the batches shown.</DrawerDescription>
            </DrawerHeader>
            <div className="px-4">
              <Field>
                <FieldLabel htmlFor="c-drawer-q">Name contains</FieldLabel>
                <Input id="c-drawer-q" placeholder="warehouse" />
              </Field>
            </div>
            <DrawerFooter>
              <Button>Apply</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Specimen>

      <Specimen
        title="Command"
        note="A listbox driven from a field the reader never leaves, inline or in a dialog."
      >
        <Command className="w-72 ring-1 ring-foreground/10">
          <CommandInput placeholder="Search a command" />
          <CommandList>
            <CommandEmpty>Nothing matches.</CommandEmpty>
            <CommandGroup heading="Ingest">
              <CommandItem value="upload">
                <PlusIcon />
                Upload a batch
                <CommandShortcut>⌘U</CommandShortcut>
              </CommandItem>
              <CommandItem value="import">
                <FileIcon />
                Import from URL
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Schema">
              <CommandItem value="classes">
                <SettingsIcon />
                Edit classes
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        <CommandPaletteDemo />
      </Specimen>

      <Specimen title="ScrollArea" note="The viewport is what scrolls, not the root.">
        <ScrollArea className="h-40 w-64 rounded-lg ring-1 ring-foreground/10">
          <div className="flex flex-col p-2">
            {Array.from({ length: 24 }, (_, index) => (
              <div key={index} className="rounded-md px-2 py-1.5 font-mono text-xs">
                frame_{String(index).padStart(4, "0")}.png
              </div>
            ))}
          </div>
        </ScrollArea>
      </Specimen>
    </Section>
  );
}

/**
 * The palette in its dialog. Open state is the only reason this is a component
 * of its own rather than more JSX in the specimen above.
 */
function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open the palette
        <KbdGroup data-icon="inline-end">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} title="Command palette">
        <Command>
          <CommandInput placeholder="Search a command" />
          <CommandList>
            <CommandEmpty>Nothing matches.</CommandEmpty>
            <CommandGroup heading="Ingest">
              <CommandItem value="upload" onSelect={() => setOpen(false)}>
                <PlusIcon />
                Upload a batch
              </CommandItem>
              <CommandItem value="import" onSelect={() => setOpen(false)}>
                <FileIcon />
                Import from URL
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
