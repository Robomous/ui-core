import {
  Badge,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ScrollArea,
} from "@robomous/ui-core";

const frames = [
  ["dock", "frame-0417.jpg", "cam-b07 · Dock A", 6],
  ["aisle", "frame-0418.jpg", "cam-a12 · Aisle 14", 2],
  ["conveyor", "frame-0419.jpg", "cam-c03 · Sorting line", 9],
  ["floor", "frame-0420.jpg", "cam-f02 · Bay B11", 4],
  ["aisle-2", "frame-0421.jpg", "cam-a14 · Aisle 14", 3],
  ["yard", "frame-0422.jpg", "cam-y01 · Truck yard", 22],
  ["dock-2", "frame-0423.jpg", "cam-b08 · Dock A", 5],
  ["conveyor-2", "frame-0424.jpg", "cam-c04 · Sorting line", 10],
] as const;

/** A review queue in a card: the card keeps its height, the viewport inside it scrolls the frame rows. */
export default function Overview() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Frames to review</CardTitle>
        <CardDescription>pallet-detection · batch 41</CardDescription>
        <CardAction>
          <Badge variant="info">{frames.length} queued</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-60 rounded-lg border">
          <ul className="flex flex-col p-1">
            {frames.map(([still, name, camera, boxes]) => (
              <li key={name} className="flex items-center gap-3 rounded-md p-1.5">
                <img
                  src={`/assets/frames/${still}.svg`}
                  alt=""
                  width={80}
                  height={48}
                  className="h-12 w-20 shrink-0 rounded-sm object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate font-mono">{name}</span>
                  <span className="truncate text-muted-foreground">{camera}</span>
                </div>
                <span className="text-muted-foreground tabular-nums">{boxes} boxes</span>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
