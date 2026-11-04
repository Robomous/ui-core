import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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
  toast,
} from "@robomous/ui-core";

const photo = "/assets/people/tom-becker.svg";

/** `showCloseButton` on DialogFooter adds a plain Close action ahead of a destructive one. */
export default function Confirm() {
  return (
    <div className="flex w-full max-w-md items-center gap-3 rounded-xl border bg-card px-3 py-2.5">
      <Avatar size="lg">
        <AvatarImage src={photo} alt="" />
        <AvatarFallback>TB</AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium">Tom Becker</span>
        <span className="truncate text-muted-foreground">Fleet technician · Monterrey DC-2</span>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Remove
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Tom Becker from Monterrey DC-2?</DialogTitle>
            <DialogDescription>
              He loses access to the site&apos;s robots and datasets right away. You can invite him
              back at any time.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2.5">
            <Avatar>
              <AvatarImage src={photo} alt="" />
              <AvatarFallback>TB</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate font-medium">Tom Becker</span>
              <span className="truncate text-muted-foreground tabular-nums">
                Last active Oct 28, 14:32
              </span>
            </div>
            <Badge variant="quiet">Technician</Badge>
          </div>
          <DialogFooter showCloseButton>
            <DialogClose asChild>
              <Button variant="destructive" onClick={() => toast("Tom Becker removed")}>
                Remove member
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
