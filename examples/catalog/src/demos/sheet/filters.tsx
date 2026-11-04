import {
  Badge,
  Button,
  Checkbox,
  Field,
  FieldGroup,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Slider,
  ToggleGroup,
  ToggleGroupItem,
} from "@robomous/ui-core";
import { ListFilterIcon } from "@robomous/ui-core/icons";

const runs = [
  { id: "run-0419", model: "detector-v3.2", map: "0.71", status: "Running", tone: "info" },
  { id: "run-0412", model: "detector-v3.2", map: "0.69", status: "Finished", tone: "success" },
  { id: "run-0408", model: "segmenter-v1.4", map: "0.58", status: "Failed", tone: "destructive" },
] as const;

/** Header and footer frame the panel; the body between them is free-form, and Apply closes it. */
export default function Filters() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex flex-col">
          <span className="text-sm font-medium">Training runs</span>
          <span className="text-muted-foreground tabular-nums">128 runs · 9 shown</span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <ListFilterIcon data-icon="inline-start" />
              Filters
              <Badge variant="quiet" className="tabular-nums">
                3
              </Badge>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Narrow the training runs shown.</SheetDescription>
            </SheetHeader>
            <FieldGroup className="px-6">
              <Field>
                <FieldLabel>Status</FieldLabel>
                <ToggleGroup
                  type="multiple"
                  variant="outline"
                  defaultValue={["running"]}
                  aria-label="Status"
                >
                  <ToggleGroupItem value="running">Running</ToggleGroupItem>
                  <ToggleGroupItem value="finished">Finished</ToggleGroupItem>
                  <ToggleGroupItem value="failed">Failed</ToggleGroupItem>
                </ToggleGroup>
              </Field>
              <Field>
                <FieldLabel htmlFor="sheet-filters-model">Model</FieldLabel>
                <Select defaultValue="detector-v3.2">
                  <SelectTrigger id="sheet-filters-model" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All models</SelectItem>
                    <SelectItem value="detector-v3.2">detector-v3.2</SelectItem>
                    <SelectItem value="detector-v3.1">detector-v3.1</SelectItem>
                    <SelectItem value="segmenter-v1.4">segmenter-v1.4</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>GPU node</FieldLabel>
                <div className="flex flex-col gap-2">
                  {["gpu-a100-01", "gpu-a100-02", "gpu-l4-01"].map((name) => (
                    <Field key={name} orientation="horizontal">
                      <Checkbox
                        id={`sheet-filters-${name}`}
                        defaultChecked={name !== "gpu-l4-01"}
                      />
                      <FieldLabel
                        htmlFor={`sheet-filters-${name}`}
                        className="font-mono font-normal"
                      >
                        {name}
                      </FieldLabel>
                    </Field>
                  ))}
                </div>
              </Field>
              <Field>
                <FieldLabel>Minimum mAP</FieldLabel>
                <Slider aria-label="Minimum mAP" defaultValue={[60]} step={5} />
              </Field>
            </FieldGroup>
            <SheetFooter className="flex-row justify-end border-t">
              <Button variant="outline">Reset</Button>
              <SheetClose asChild>
                <Button>Apply</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <ul className="divide-y border-t">
        {runs.map((run) => (
          <li key={run.id} className="flex items-center gap-3 px-4 py-2">
            <span className="font-mono font-medium">{run.id}</span>
            <span className="flex-1 truncate text-muted-foreground">{run.model}</span>
            <span className="text-muted-foreground tabular-nums">mAP {run.map}</span>
            <Badge variant={run.tone} className="w-16">
              {run.status}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}
