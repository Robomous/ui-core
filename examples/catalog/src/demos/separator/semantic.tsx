import { Badge, Separator } from "@robomous/ui-core";

/** `decorative={false}` exposes the rule as `role="separator"`: use it when it is the only thing marking the boundary. */
export default function Semantic() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-lg border p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">Training split</span>
          <span className="text-muted-foreground tabular-nums">8,420 images</span>
        </div>
        <Badge variant="secondary" className="tabular-nums">
          89%
        </Badge>
      </div>
      <Separator decorative={false} aria-label="Between splits" />
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">Validation split</span>
          <span className="text-muted-foreground tabular-nums">1,052 images</span>
        </div>
        <Badge variant="secondary" className="tabular-nums">
          11%
        </Badge>
      </div>
    </div>
  );
}
