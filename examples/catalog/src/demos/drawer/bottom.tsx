import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Field,
  FieldLabel,
  Input,
} from "@robomous/ui-core";

/** The default direction; a drag handle appears above the content, so it can be pulled shut. */
export default function Bottom() {
  return (
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
            <FieldLabel htmlFor="drawer-q">Name contains</FieldLabel>
            <Input id="drawer-q" placeholder="warehouse" />
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
  );
}
