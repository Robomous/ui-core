import {
  Badge,
  Button,
  Progress,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@robomous/ui-core";
import { useState } from "react";

const robots = [
  {
    id: "rb-07",
    image: "/assets/robots/atlas.svg",
    name: "Atlas",
    kind: "AMR",
    status: "On mission",
    tone: "success",
    battery: 82,
    zone: "Aisle 14",
    firmware: "4.2.1",
    missions: 17,
    uptime: "99.2%",
    still: "aisle",
    view: "Aisle 14: racking with cartons on pallets, a forklift and a worker in a yellow vest",
  },
  {
    id: "rb-12",
    image: "/assets/robots/kestrel.svg",
    name: "Kestrel",
    kind: "Tugger",
    status: "Charging",
    tone: "info",
    battery: 34,
    zone: "Dock B",
    firmware: "4.2.1",
    missions: 9,
    uptime: "97.8%",
    still: "dock-2",
    view: "Dock B: roll-up doors, a pallet jack and a worker",
  },
  {
    id: "rb-19",
    image: "/assets/robots/orca.svg",
    name: "Orca",
    kind: "Pallet mover",
    status: "Needs attention",
    tone: "warning",
    battery: 9,
    zone: "Charging bay",
    firmware: "4.1.8",
    missions: 3,
    uptime: "91.4%",
    still: "floor",
    view: "The charging bay seen from above, with a yellow forklift in the travel lane",
  },
] as const;

/** A list row opens a detail sheet: the reader keeps the fleet in view and loses nothing by closing it. */
export default function Overview() {
  const [open, setOpen] = useState(false);
  const [robot, setRobot] = useState<(typeof robots)[number]>(robots[0]);

  return (
    <div className="w-full max-w-md">
      <ul className="divide-y overflow-hidden rounded-xl border bg-card">
        {robots.map((r) => (
          <li key={r.id}>
            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-3 px-3 py-2.5 text-left transition-colors outline-none hover:bg-muted/60 focus-visible:bg-muted/60"
              onClick={() => {
                setRobot(r);
                setOpen(true);
              }}
            >
              <img
                src={r.image}
                alt=""
                className="size-10 shrink-0 rounded-lg object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
              />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-medium">
                  <span className="font-mono">{r.id}</span> {r.name}
                </span>
                <span className="truncate text-muted-foreground">
                  {r.zone} · <span className="tabular-nums">{r.battery}%</span> battery
                </span>
              </span>
              <Badge variant={r.tone}>{r.status}</Badge>
            </button>
          </li>
        ))}
      </ul>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2.5">
              <img
                src={robot.image}
                alt=""
                className="size-8 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
              />
              <span>
                <span className="font-mono">{robot.id}</span> {robot.name}
              </span>
            </SheetTitle>
            <SheetDescription>
              {robot.kind} · Monterrey DC-2 · {robot.status.toLowerCase()}
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-5 px-6">
            <img
              src={`/assets/frames/${robot.still}.svg`}
              alt={`Latest camera frame near ${robot.name}. ${robot.view}`}
              className="aspect-[2/1] w-full rounded-lg object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
            />
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Battery</span>
                <span className="font-medium tabular-nums">{robot.battery}%</span>
              </div>
              <Progress value={robot.battery} aria-label="Battery" />
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {[
                ["Zone", robot.zone],
                ["Firmware", robot.firmware],
                ["Missions today", String(robot.missions)],
                ["Uptime, 30 days", robot.uptime],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="font-medium tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <SheetFooter className="flex-row justify-end border-t">
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
            <Button>Return to dock</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
