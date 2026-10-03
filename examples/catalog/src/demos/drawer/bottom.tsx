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
  FieldGroup,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@robomous/ui-core";

/** The default direction; a drag handle appears above the content, so it can be pulled shut. */
export default function Bottom() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open filters</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto flex w-full max-w-sm flex-col">
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
            <DrawerDescription>Narrow the batches shown.</DrawerDescription>
          </DrawerHeader>
          <FieldGroup className="px-4">
            <Field>
              <FieldLabel htmlFor="drawer-bottom-q">Name contains</FieldLabel>
              <Input id="drawer-bottom-q" placeholder="warehouse" />
            </Field>
            <Field>
              <FieldLabel htmlFor="drawer-bottom-status">Status</FieldLabel>
              <Select defaultValue="all">
                <SelectTrigger id="drawer-bottom-status" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All batches</SelectItem>
                  <SelectItem value="pending">Pending review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
          <DrawerFooter>
            <Button>Apply</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
