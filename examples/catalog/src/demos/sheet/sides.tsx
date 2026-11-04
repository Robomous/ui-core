import {
  Badge,
  Button,
  Input,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  cn,
} from "@robomous/ui-core";
import { SearchIcon } from "@robomous/ui-core/icons";
import type { ReactNode } from "react";

const frames = ["aisle", "dock", "conveyor"];

const sites = [
  { name: "Monterrey DC-2", robots: "14 robots online", active: true },
  { name: "Guadalajara DC-1", robots: "6 robots online", active: false },
  { name: "Laredo Cross-dock", robots: "9 robots online", active: false },
  { name: "Querétaro Hub", robots: "3 robots online", active: false },
];

const sides: Record<
  "top" | "right" | "bottom" | "left",
  { title: ReactNode; description: ReactNode; body: ReactNode }
> = {
  top: {
    title: "Search frames",
    description: "Find a frame by name or camera.",
    body: (
      <div className="mx-auto flex w-full max-w-md flex-col gap-3 px-6 pb-6">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            aria-label="Search frames"
            placeholder="frame-0184 or cam-a12"
            className="pl-8 font-mono"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["cam-b07", "cam-a12", "cam-c03", "forklift"].map((tag) => (
            <Badge key={tag} variant="quiet" className="font-mono">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    ),
  },
  right: {
    title: (
      <span className="flex items-center gap-2.5">
        <img
          src="/assets/robots/atlas.svg"
          alt=""
          className="size-8 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        rb-07 Atlas
      </span>
    ),
    description: "Monterrey DC-2, last seen 12 s ago.",
    body: (
      <div className="flex flex-col gap-5 px-6">
        <img
          src="/assets/frames/aisle.svg"
          alt="Latest camera frame of Aisle 14, where Atlas is working"
          className="aspect-[2/1] w-full rounded-lg object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          {[
            ["Battery", "82%"],
            ["Zone", "Aisle 14"],
            ["Firmware", "4.2.1"],
            ["Missions today", "17"],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col gap-0.5">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="font-medium tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    ),
  },
  bottom: {
    title: "Quick actions",
    description: "For the 3 frames you selected.",
    body: (
      <div className="mx-auto flex w-full max-w-sm flex-col gap-3 px-6 pb-6">
        <div className="grid grid-cols-3 gap-2">
          {frames.map((still) => (
            <img
              key={still}
              src={`/assets/frames/${still}.svg`}
              alt=""
              className="aspect-[3/2] w-full rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
            />
          ))}
        </div>
        <Button variant="outline">Send to review</Button>
        <Button variant="outline">Add to batch-0043</Button>
      </div>
    ),
  },
  left: {
    title: "Sites",
    description: "Switch to another site.",
    body: (
      <ul className="flex flex-col gap-1 px-3">
        {sites.map((site) => (
          <li key={site.name}>
            <a
              href="#"
              aria-current={site.active ? "page" : undefined}
              className={cn(
                "flex flex-col gap-0.5 rounded-md px-3 py-2 transition-colors hover:bg-muted",
                site.active && "bg-muted",
              )}
            >
              <span className="text-sm font-medium">{site.name}</span>
              <span className="text-muted-foreground tabular-nums">{site.robots}</span>
            </a>
          </li>
        ))}
      </ul>
    ),
  },
};

const placement: Record<keyof typeof sides, string> = {
  top: "col-start-2 row-start-1",
  left: "col-start-1 row-start-2",
  right: "col-start-3 row-start-2",
  bottom: "col-start-2 row-start-3",
};

/** `side` picks the edge the panel slides from; right is the default. */
export default function Sides() {
  return (
    <div className="relative isolate w-full max-w-sm overflow-hidden rounded-xl border">
      <img
        src="/assets/frames/yard.svg"
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-background/60 backdrop-blur-[1px]" />
      <div className="grid h-52 grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto] place-items-center gap-2 p-3">
        <span className="col-start-2 row-start-2 rounded-full bg-background/90 px-3 py-1 text-xs font-medium shadow-sm">
          Fleet overview
        </span>
        {(Object.keys(sides) as (keyof typeof sides)[]).map((side) => (
          <Sheet key={side}>
            <SheetTrigger asChild>
              <Button variant="secondary" size="sm" className={`${placement[side]} capitalize`}>
                {side}
              </Button>
            </SheetTrigger>
            <SheetContent side={side}>
              <SheetHeader>
                <SheetTitle>{sides[side].title}</SheetTitle>
                <SheetDescription>{sides[side].description}</SheetDescription>
              </SheetHeader>
              {sides[side].body}
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  );
}
