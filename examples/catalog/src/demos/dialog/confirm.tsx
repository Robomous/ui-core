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
          <DialogTitle>Delete warehouse-2024?</DialogTitle>
          <DialogDescription>
            The dataset and everything in it will be removed. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between rounded-lg bg-muted px-3 py-2 text-sm">
          <span className="font-medium">11 batches</span>
          <span className="text-muted-foreground">4,812 annotations</span>
        </div>
        <DialogFooter showCloseButton>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
