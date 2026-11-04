import { Badge, Kbd } from "@robomous/ui-core";
import { PentagonIcon } from "@robomous/ui-core/icons";

/** A real <kbd>, sized to sit inline with body text rather than as a boxed control. */
export default function Single() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-lg border p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium">Polygon tool · frame-0417.jpg</span>
        <Badge variant="secondary">
          <PentagonIcon data-icon="inline-start" />
          <span className="tabular-nums">4 points</span>
        </Badge>
      </div>
      <p className="text-muted-foreground">
        Click to add a point. Press <Kbd>Enter</Kbd> to close the polygon, <Kbd>Backspace</Kbd> to
        drop the last point, or <Kbd>Esc</Kbd> to cancel the shape.
      </p>
    </div>
  );
}
