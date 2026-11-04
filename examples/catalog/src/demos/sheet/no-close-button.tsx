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
import { DownloadIcon } from "@robomous/ui-core/icons";

/** `showCloseButton={false}`: the footer's own buttons are the only way out besides Escape. */
export default function NoCloseButton() {
  return (
    <div className="flex w-full max-w-md items-center gap-3 rounded-xl border bg-card p-2.5 pr-3">
      <img
        src="/assets/frames/floor-2.svg"
        alt=""
        loading="lazy"
        className="size-14 shrink-0 rounded-lg object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate font-mono text-sm font-medium">shelf-inspection-2026</span>
        <span className="text-muted-foreground tabular-nums">4,812 annotations · 11 batches</span>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">
            <DownloadIcon data-icon="inline-start" />
            Export
          </Button>
        </SheetTrigger>
        <SheetContent showCloseButton={false}>
          <SheetHeader>
            <SheetTitle>Export dataset</SheetTitle>
            <SheetDescription>
              <span className="font-mono">shelf-inspection-2026</span> · 4,812 annotations across 11
              batches.
            </SheetDescription>
          </SheetHeader>
          <FieldGroup className="px-6">
            <Field>
              <FieldLabel htmlFor="sheet-export-format">Format</FieldLabel>
              <Select defaultValue="coco">
                <SelectTrigger id="sheet-export-format" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coco">COCO JSON</SelectItem>
                  <SelectItem value="yolo">YOLO TXT</SelectItem>
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
            <SheetClose asChild>
              <Button>Export</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
