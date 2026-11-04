import {
  Badge,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  ScrollArea,
  ScrollBar,
} from "@robomous/ui-core";

const cameras = [
  ["dock", "cam-b07", "Dock A", true],
  ["aisle", "cam-a12", "Aisle 14", true],
  ["conveyor", "cam-c03", "Sorting line", true],
  ["yard", "cam-y01", "Truck yard", true],
  ["floor", "cam-f02", "Bay B11", false],
  ["aisle-night", "cam-a09", "Aisle 9, infrared", true],
] as const;

/** A horizontal ScrollBar tracks the viewport's x-axis; children must not shrink or they will wrap instead of overflowing. */
export default function Horizontal() {
  return (
    <Card className="w-full max-w-md gap-3">
      <CardHeader>
        <CardTitle>Camera feeds</CardTitle>
        <CardDescription>{cameras.length} cameras on Monterrey DC-2</CardDescription>
      </CardHeader>
      <ScrollArea fade="x" className="mx-4 whitespace-nowrap">
        <div className="flex gap-3 pb-3">
          {cameras.map(([still, name, place, online]) => (
            <figure key={name} className="flex w-40 shrink-0 flex-col gap-1.5">
              <div className="relative">
                <img
                  src={`/assets/frames/${still}.svg`}
                  alt={`${online ? "Live" : "Last"} frame from ${name}, ${place}`}
                  loading="lazy"
                  className={`aspect-video w-full rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10 ${online ? "" : "opacity-50 grayscale"}`}
                />
                <Badge
                  variant={online ? "success" : "warning"}
                  className="absolute top-1.5 left-1.5"
                >
                  {online ? "live" : "offline"}
                </Badge>
              </div>
              <figcaption className="flex items-baseline justify-between gap-2">
                <span className="font-mono">{name}</span>
                <span className="text-muted-foreground">{place}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Card>
  );
}
