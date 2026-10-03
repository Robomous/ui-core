import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@robomous/ui-core";

/** A dialog that collects something composes Field anatomy directly inside DialogContent. */
export default function Form() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New camera</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New camera</DialogTitle>
          <DialogDescription>Connects to the ingest pipeline once saved.</DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="dlg-camera-name">Name</FieldLabel>
            <Input
              id="dlg-camera-name"
              placeholder="warehouse-cam-05"
              aria-describedby="dlg-camera-hint"
            />
            <FieldDescription id="dlg-camera-hint">Lowercase, hyphens allowed.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="dlg-camera-site">Location</FieldLabel>
            <Select defaultValue="warehouse">
              <SelectTrigger id="dlg-camera-site" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warehouse">Warehouse</SelectItem>
                <SelectItem value="loading-dock">Loading dock</SelectItem>
                <SelectItem value="parking-lot">Parking lot</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
