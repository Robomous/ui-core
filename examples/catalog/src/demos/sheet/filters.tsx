import {
  Button,
  Field,
  FieldLabel,
  Input,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@robomous/ui-core";

/** SheetHeader and SheetFooter frame the panel; the body between them is free-form. */
export default function Filters() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Filters</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Narrow the list to what you are looking for.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4">
          <Field>
            <FieldLabel htmlFor="sheet-camera">Camera</FieldLabel>
            <Input id="sheet-camera" placeholder="warehouse-cam-04" />
          </Field>
        </div>
        <SheetFooter>
          <Button>Apply filters</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
