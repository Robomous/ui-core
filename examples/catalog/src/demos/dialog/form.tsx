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
  FieldLabel,
  Input,
} from "@robomous/ui-core";

/** A dialog that collects something composes Field anatomy directly inside DialogContent. */
export default function Form() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New camera</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New camera</DialogTitle>
          <DialogDescription>Connects to the ingest pipeline once saved.</DialogDescription>
        </DialogHeader>
        <Field>
          <FieldLabel htmlFor="dlg-camera-name">Name</FieldLabel>
          <Input
            id="dlg-camera-name"
            placeholder="warehouse-cam-05"
            aria-describedby="dlg-camera-hint"
          />
          <FieldDescription id="dlg-camera-hint">Lowercase, hyphens allowed.</FieldDescription>
        </Field>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
