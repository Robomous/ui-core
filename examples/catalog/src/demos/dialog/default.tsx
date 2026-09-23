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

/** DialogHeader stacks the title and description; DialogFooter right-aligns the actions. */
export default function Default() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New dataset</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New dataset</DialogTitle>
          <DialogDescription>Frames are grouped into batches as they arrive.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
