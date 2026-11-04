import { Badge, Separator } from "@robomous/ui-core";

const sites = [
  {
    name: "Monterrey DC-2",
    status: "14 robots · 3 charging",
    tone: "success" as const,
    label: "Healthy",
  },
  {
    name: "Querétaro DC-1",
    status: "9 robots · all on mission",
    tone: "success" as const,
    label: "Healthy",
  },
  {
    name: "Guadalajara Hub",
    status: "6 robots · 1 offline",
    tone: "warning" as const,
    label: "Attention",
  },
];

/** A horizontal rule between stacked rows: one Separator between each pair, none after the last. */
export default function Horizontal() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-lg border p-4">
      <span className="text-sm font-medium">Sites</span>
      {sites.map(({ name, status, tone, label }) => (
        <div key={name} className="flex flex-col gap-3">
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="font-medium">{name}</span>
              <span className="text-muted-foreground tabular-nums">{status}</span>
            </div>
            <Badge variant={tone}>{label}</Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
