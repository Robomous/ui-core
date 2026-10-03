import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@robomous/ui-core";

/** `showCloseButton={false}` removes the corner close affordance entirely. */
export default function NoCloseButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View status</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Retraining queued</DialogTitle>
          <DialogDescription>It starts once ingest finishes.</DialogDescription>
        </DialogHeader>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
          <dt className="text-muted-foreground">Model</dt>
          <dd className="font-medium">org/detector-base</dd>
          <dt className="text-muted-foreground">Dataset</dt>
          <dd className="font-medium">batch-0044</dd>
          <dt className="text-muted-foreground">Status</dt>
          <dd>
            <Badge variant="secondary">Queued</Badge>
          </dd>
        </dl>
        <DialogFooter>
          <Button>Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
