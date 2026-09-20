import { Badge } from "@robomous/ui-core";

/** Status badges beside the row they describe, read faster than a sentence would. */
export default function InContext() {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className="flex items-center gap-2">
        <span className="font-mono">batch-0041</span>
        <Badge variant="success">completed</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-mono">batch-0042</span>
        <Badge variant="warning">review pending</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-mono">batch-0043</span>
        <Badge variant="destructive">failed</Badge>
      </div>
    </div>
  );
}
