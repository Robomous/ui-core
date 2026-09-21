import { Card, CardDescription, CardHeader, CardTitle } from "@robomous/ui-core";

const stats: [string, string][] = [
  ["Frames", "1.2M"],
  ["Batches", "148"],
  ["Open reviews", "23"],
];

/** Cards are the grid unit a dashboard is laid out from; `size="sm"` keeps a stat tile to one compact block. */
export default function StatTile() {
  return (
    <div className="grid w-full grid-cols-3 gap-3">
      {stats.map(([label, value]) => (
        <Card key={label} size="sm">
          <CardHeader>
            <CardDescription>{label}</CardDescription>
            <CardTitle className="text-2xl tabular-nums">{value}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
