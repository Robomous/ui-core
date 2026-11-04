import { Badge, Card, CardAction, CardDescription, CardHeader, CardTitle } from "@robomous/ui-core";

const stats: {
  label: string;
  value: string;
  note: string;
  variant: "success" | "destructive" | "quiet";
}[] = [
  { label: "Streams online", value: "46", note: "of 48", variant: "success" },
  { label: "Streams offline", value: "2", note: "dock C", variant: "destructive" },
  { label: "Retention", value: "30 d", note: "default", variant: "quiet" },
];

/** Cards are the grid unit a dashboard is laid out from; `size="sm"` keeps a stat tile to one compact block. */
export default function StatTile() {
  return (
    <div className="grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
      {stats.map(({ label, value, note, variant }) => (
        <Card key={label} size="sm">
          <CardHeader>
            <CardDescription>{label}</CardDescription>
            <CardTitle className="text-2xl tabular-nums">{value}</CardTitle>
            <CardAction>
              <Badge variant={variant}>{note}</Badge>
            </CardAction>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
