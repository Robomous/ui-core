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

/** `showCloseButton={false}` on DialogContent removes the corner close affordance entirely. */
export default function NoCloseButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View status</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Retraining queued</DialogTitle>
          <DialogDescription>
            org/model-base will retrain against batch-0044 once ingest finishes.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
