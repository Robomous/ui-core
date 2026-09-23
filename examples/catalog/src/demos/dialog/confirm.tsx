import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@robomous/ui-core";

/** `showCloseButton` on DialogFooter adds a plain Close action ahead of a destructive one. */
export default function Confirm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete dataset</Button>
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
  );
}
