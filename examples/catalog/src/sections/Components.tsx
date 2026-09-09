import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
  Progress,
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
  Skeleton,
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@robomous/ui-core";

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
      lede="Twenty-one owned components over Radix and Base UI behaviour. Anatomy is composed at the call site; geometry and colour are the component's."
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
    </Section>
  );
}
