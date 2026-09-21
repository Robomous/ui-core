import { Progress } from "@robomous/ui-core";

/** A single bar with a real width and a label reporting the value; Progress has no label of its own. */
export default function Value() {
  return (
    <div className="flex items-center gap-4">
      <Progress value={42} aria-label="Ingest" className="w-64" />
      <span className="text-sm text-muted-foreground">42% ingested</span>
    </div>
  );
}
