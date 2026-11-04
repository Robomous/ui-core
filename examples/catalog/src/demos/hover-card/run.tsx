import { Badge, Button, HoverCard, HoverCardContent, HoverCardTrigger } from "@robomous/ui-core";

const runs = [
  { id: "run-0188", model: "detector-v3.2", status: "Running", tone: "success", map: "0.71" },
  { id: "run-0187", model: "detector-v3.1", status: "Finished", tone: "quiet", map: "0.68" },
  { id: "run-0186", model: "detector-v3.1", status: "Failed", tone: "destructive", map: "0.12" },
] as const;

const config = [
  ["Learning rate", "3e-4"],
  ["Batch size", "64"],
  ["Epochs", "100"],
  ["GPU", "gpu-a100-01"],
];

/** In a table the id is the trigger and the card holds the config, so the row stays one line tall. */
export default function Run() {
  return (
    <ul className="w-full max-w-lg divide-y rounded-lg border text-sm">
      {runs.map((run) => (
        <li key={run.id} className="flex items-center gap-4 py-1.5 pr-4 pl-1.5">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost" size="sm" className="font-mono">
                {run.id}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent align="start" className="w-64">
              <div className="flex flex-col gap-2">
                <span className="font-medium">{run.model} config</span>
                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 tabular-nums">
                  {config.map(([label, value]) => (
                    <div key={label} className="col-span-2 grid grid-cols-subgrid">
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="text-right font-mono">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </HoverCardContent>
          </HoverCard>
          <span className="flex-1 font-mono text-muted-foreground">{run.model}</span>
          <Badge variant={run.tone}>{run.status}</Badge>
          <span className="w-10 text-right tabular-nums">{run.map}</span>
        </li>
      ))}
    </ul>
  );
}
