import {
  Button,
  Input,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@robomous/ui-core";
import type { ReactNode } from "react";

const sides: Record<
  "top" | "right" | "bottom" | "left",
  { title: string; description: string; className: string; body: ReactNode }
> = {
  top: {
    title: "Search frames",
    description: "Find a frame by name or camera.",
    className: "",
    body: (
      <div className="mx-auto w-full max-w-md px-4 pb-4">
        <Input aria-label="Search frames" placeholder="warehouse-cam-04" />
      </div>
    ),
  },
  right: {
    title: "batch-0042",
    description: "Ingested 2 hours ago from warehouse-cam-04.",
    className: "data-[side=right]:sm:max-w-sm",
    body: (
      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 px-4 text-sm">
        {[
          ["Frames", "1,248"],
          ["Annotations", "4,812"],
          ["Classes", "3"],
          ["Reviewed", "86%"],
        ].map(([label, value]) => (
          <div key={label} className="flex flex-col gap-0.5">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  bottom: {
    title: "Quick actions",
    description: "For the 3 frames you selected.",
    className: "",
    body: (
      <div className="mx-auto flex w-full max-w-sm flex-col gap-2 px-4 pb-4">
        <Button variant="outline">Send to review</Button>
        <Button variant="outline">Add to batch-0043</Button>
      </div>
    ),
  },
  left: {
    title: "Datasets",
    description: "Switch to another dataset.",
    className: "data-[side=left]:sm:max-w-xs",
    body: (
      <ItemGroup className="gap-1 px-1">
        {[
          ["Warehouse", "11 batches"],
          ["Loading dock", "4 batches"],
          ["Parking lot", "7 batches"],
        ].map(([name, count]) => (
          <Item key={name} asChild size="sm">
            <a href="#">
              <ItemContent>
                <ItemTitle>{name}</ItemTitle>
                <ItemDescription>{count}</ItemDescription>
              </ItemContent>
            </a>
          </Item>
        ))}
      </ItemGroup>
    ),
  },
};

/** `side` picks the edge the panel slides from; right is the default. */
export default function Sides() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {Object.entries(sides).map(([side, { title, description, className, body }]) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline" className="capitalize">
              {side}
            </Button>
          </SheetTrigger>
          <SheetContent side={side as keyof typeof sides} className={className}>
            <SheetHeader>
              <SheetTitle>{title}</SheetTitle>
              <SheetDescription>{description}</SheetDescription>
            </SheetHeader>
            {body}
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
