import {
  Badge,
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@robomous/ui-core";

const directions = ["top", "right", "bottom", "left"] as const;

const placement = {
  top: "col-start-2 row-start-1",
  left: "col-start-1 row-start-2",
  right: "col-start-3 row-start-2",
  bottom: "col-start-2 row-start-3",
} as const;

const runs = [
  { id: "run-0419", detail: "detector-v3.2 · epoch 42 of 100", status: "Running", tone: "info" },
  { id: "run-0412", detail: "detector-v3.2 · mAP 0.71", status: "Finished", tone: "success" },
  {
    id: "run-0408",
    detail: "segmenter-v1.4 · diverged at epoch 9",
    status: "Failed",
    tone: "destructive",
  },
] as const;

/** `direction` picks the edge the drawer opens from; only the bottom direction gets a drag handle. */
export default function Directions() {
  return (
    <div className="relative isolate w-full max-w-sm overflow-hidden rounded-xl border">
      <img
        src="/assets/frames/dock.svg"
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-background/60 backdrop-blur-[1px]" />
      <div className="grid h-52 grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto] place-items-center gap-2 p-3">
        <span className="col-start-2 row-start-2 rounded-full bg-background/90 px-3 py-1 text-xs font-medium shadow-sm">
          Training runs
        </span>
        {directions.map((direction) => (
          <Drawer key={direction} direction={direction}>
            <DrawerTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className={`${placement[direction]} capitalize`}
              >
                {direction}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Recent training runs</DrawerTitle>
                <DrawerDescription>Opens from the {direction} edge.</DrawerDescription>
              </DrawerHeader>
              <ul className="mx-auto flex w-full max-w-md flex-col gap-1 px-2 pb-4">
                {runs.map((run) => (
                  <li key={run.id} className="flex items-center gap-3 rounded-md px-2 py-2">
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="font-mono font-medium">{run.id}</span>
                      <span className="truncate text-muted-foreground tabular-nums">
                        {run.detail}
                      </span>
                    </span>
                    <Badge variant={run.tone}>{run.status}</Badge>
                  </li>
                ))}
              </ul>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </div>
  );
}
