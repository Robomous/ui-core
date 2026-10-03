import {
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

/** SheetHeader and SheetFooter frame the panel; the body between them is free-form. */
export default function Filters() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Filters</Button>
      </SheetTrigger>
      <SheetContent className="data-[side=right]:sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Narrow the frames in batch-0042.</SheetDescription>
        </SheetHeader>
        <FieldGroup className="px-4">
          <Field>
            <FieldLabel>Review status</FieldLabel>
            <ToggleGroup
              type="multiple"
              variant="outline"
              defaultValue={["pending"]}
              aria-label="Review status"
            >
              <ToggleGroupItem value="pending">Pending</ToggleGroupItem>
              <ToggleGroupItem value="approved">Approved</ToggleGroupItem>
              <ToggleGroupItem value="rejected">Rejected</ToggleGroupItem>
            </ToggleGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="sheet-filters-camera">Camera</FieldLabel>
            <Select defaultValue="warehouse-cam-04">
              <SelectTrigger id="sheet-filters-camera" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All cameras</SelectItem>
                <SelectItem value="warehouse-cam-03">warehouse-cam-03</SelectItem>
                <SelectItem value="warehouse-cam-04">warehouse-cam-04</SelectItem>
                <SelectItem value="dock-cam-01">dock-cam-01</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel>Classes</FieldLabel>
            <div className="flex flex-col gap-2">
              {["Vehicle", "Pedestrian", "Cyclist"].map((name) => (
                <Field key={name} orientation="horizontal">
                  <Checkbox id={`sheet-filters-${name}`} defaultChecked={name !== "Cyclist"} />
                  <FieldLabel htmlFor={`sheet-filters-${name}`} className="font-normal">
                    {name}
                  </FieldLabel>
                </Field>
              ))}
            </div>
          </Field>
          <Field>
            <FieldLabel>Minimum confidence</FieldLabel>
            <Slider aria-label="Minimum confidence" defaultValue={[60]} step={5} />
          </Field>
        </FieldGroup>
        <SheetFooter className="flex-row justify-end border-t">
          <Button variant="outline">Reset</Button>
          <Button>Apply</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
