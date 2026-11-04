import {
  Badge,
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@robomous/ui-core";
import { useState } from "react";

/** `dismissible={false}` turns off dragging, Escape and outside clicks; own `open` and close it from the buttons. */
export default function Required() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex w-full max-w-md items-center gap-3 rounded-xl border bg-card p-2.5 pr-3">
      <img
        src="/assets/robots/atlas.svg"
        alt=""
        loading="lazy"
        className="size-14 shrink-0 rounded-lg object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex items-center gap-2 text-sm font-medium">
          <span className="font-mono">rb-07</span> <Badge variant="warning">Stopped</Badge>
        </span>
        <span className="truncate text-muted-foreground">
          Localisation error in Aisle 14 · low light
        </span>
      </div>
      <Drawer dismissible={false} open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            Resume mission
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto flex w-full max-w-sm flex-col">
            <DrawerHeader>
              <DrawerTitle>rb-07 lost its map</DrawerTitle>
              <DrawerDescription>
                It stopped in Aisle 14 after a localisation error; detections drop in low light.
                Choose how it should continue.
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <img
                  src="/assets/frames/aisle-night.svg"
                  alt="Last infrared camera frame from Aisle 14 before rb-07 stopped: a forklift and a worker at the far end of the aisle"
                  className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute top-[36.2%] left-[51%] h-[15.1%] w-[4.2%] rounded-sm border-2 border-warning">
                  <span className="absolute -top-5 -left-0.5 rounded-xs bg-warning px-1 text-[0.625rem] whitespace-nowrap text-background tabular-nums">
                    forklift 0.41
                  </span>
                </div>
                <div className="absolute top-[40%] left-[56.5%] h-[17.2%] w-[3.9%] rounded-sm border-2 border-info">
                  <span className="absolute top-full -left-0.5 mt-0.5 rounded-xs bg-info px-1 text-[0.625rem] whitespace-nowrap text-background tabular-nums">
                    person 0.83
                  </span>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-lg outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10" />
              </div>
            </div>
            <DrawerFooter>
              <Button onClick={() => setOpen(false)}>Relocalise and resume</Button>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Return to dock
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
