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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@robomous/ui-core";

/** `showCloseButton={false}` — the call site owns dismissal, here via the footer's own buttons. */
export default function NoCloseButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Export dataset</Button>
      </SheetTrigger>
      <SheetContent showCloseButton={false} className="data-[side=right]:sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>Export dataset</SheetTitle>
          <SheetDescription>4,812 annotations across 11 batches.</SheetDescription>
        </SheetHeader>
        <FieldGroup className="px-4">
          <Field>
            <FieldLabel htmlFor="sheet-export-format">Format</FieldLabel>
            <Select defaultValue="coco">
              <SelectTrigger id="sheet-export-format" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coco">COCO JSON</SelectItem>
                <SelectItem value="yolo">YOLO</SelectItem>
                <SelectItem value="voc">Pascal VOC</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="sheet-export-annotated" defaultChecked />
            <FieldLabel htmlFor="sheet-export-annotated" className="font-normal">
              Only annotated frames
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="sheet-export-split" />
            <FieldLabel htmlFor="sheet-export-split" className="font-normal">
              Split into train and validation sets
            </FieldLabel>
          </Field>
        </FieldGroup>
        <SheetFooter className="flex-row justify-end border-t">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Export</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
