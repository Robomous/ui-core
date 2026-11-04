import {
  Badge,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@robomous/ui-core";
import { ArrowRightIcon } from "@robomous/ui-core/icons";

/** `showCloseButton={false}` drops the corner X; the footer action is now the way out. */
export default function NoCloseButton() {
  return (
    <div className="flex w-full max-w-md items-center gap-3 rounded-xl border bg-card p-2.5 pr-3">
      <img
        src="/assets/frames/aisle.svg"
        alt=""
        loading="lazy"
        className="size-14 shrink-0 rounded-lg object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex items-center gap-2 text-sm font-medium">
          Mission 0413 <Badge variant="quiet">queued</Badge>
        </span>
        <span className="truncate text-muted-foreground">
          <span className="font-mono">rb-07</span> · aisle 14 to dock B
        </span>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            View mission
          </Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Mission queued</DialogTitle>
            <DialogDescription>It starts once rb-07 leaves its charging dock.</DialogDescription>
          </DialogHeader>
          <dl className="grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-2.5 rounded-lg bg-muted/60 px-3 py-3">
            <dt className="text-muted-foreground">Robot</dt>
            <dd className="flex items-center gap-2 font-medium">
              <img
                src="/assets/robots/atlas.svg"
                alt=""
                className="size-6 rounded-sm object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
              />
              <span>
                <span className="font-mono">rb-07</span> “Atlas”
              </span>
            </dd>
            <dt className="text-muted-foreground">Route</dt>
            <dd className="flex items-center gap-1.5 font-medium">
              Aisle 14
              <ArrowRightIcon className="size-3 text-muted-foreground" />
              Dock B
            </dd>
            <dt className="text-muted-foreground">Estimated start</dt>
            <dd className="font-medium tabular-nums">Oct 28, 14:40</dd>
            <dt className="text-muted-foreground">Status</dt>
            <dd>
              <Badge variant="quiet">queued</Badge>
            </dd>
          </dl>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Got it</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
