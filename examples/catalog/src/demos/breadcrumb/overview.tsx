import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
} from "@robomous/ui-core";
import { CheckIcon } from "@robomous/ui-core/icons";

const frames = [
  { id: "0401", src: "/assets/frames/dock.svg", alt: "Loading dock A with staged pallets" },
  { id: "0402", src: "/assets/frames/dock-2.svg", alt: "Dock A from the side, with a pallet jack" },
  { id: "0403", src: "/assets/frames/floor.svg", alt: "Storage bays from above, with a forklift" },
  { id: "0404", src: "/assets/frames/aisle-3.svg", alt: "A racking aisle with a worker up close" },
];

/** A page header: the trail says where you are, the title says what this is, the action is last. */
export default function Overview() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4 rounded-lg border p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/datasets">Datasets</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/datasets/pallet-detection">pallet-detection</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Batch 0412</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-base font-medium">Batch 0412</span>
            <Badge variant="warning">In review</Badge>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Avatar size="sm">
              <AvatarImage src="/assets/people/sofia-brennan.svg" alt="" />
              <AvatarFallback>SB</AvatarFallback>
            </Avatar>
            <span className="tabular-nums">Sofia Brennan · 1,240 frames · updated 12 min ago</span>
          </div>
        </div>
        <Button size="sm">
          <CheckIcon data-icon="inline-start" />
          Approve batch
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {frames.map(({ id, src, alt }) => (
          <img
            key={id}
            src={src}
            alt={`Frame ${id}: ${alt}`}
            className="aspect-[8/5] w-full rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
          />
        ))}
      </div>
    </div>
  );
}
