import { Badge } from "@robomous/ui-core";
import { CircleCheckIcon, ClockIcon, TriangleAlertIcon } from "@robomous/ui-core/icons";

/** An icon backs the colour with a shape; `data-icon` tells the badge which side to pad. */
export default function WithIcon() {
  return (
    <ul className="flex w-full max-w-xs flex-col divide-y rounded-lg border text-sm">
      <li className="flex items-center justify-between gap-3 px-3 py-2.5">
        <div className="flex flex-col">
          <span className="font-mono">cam-b07</span>
          <span className="text-muted-foreground">Dock A</span>
        </div>
        <Badge variant="success">
          <CircleCheckIcon data-icon="inline-start" />
          Calibrated
        </Badge>
      </li>
      <li className="flex items-center justify-between gap-3 px-3 py-2.5">
        <div className="flex flex-col">
          <span className="font-mono">cam-02</span>
          <span className="text-muted-foreground">Aisle 14</span>
        </div>
        <Badge variant="warning">
          <TriangleAlertIcon data-icon="inline-start" />
          Drifting
        </Badge>
      </li>
      <li className="flex items-center justify-between gap-3 px-3 py-2.5">
        <div className="flex flex-col">
          <span className="font-mono">cam-11</span>
          <span className="text-muted-foreground">Loading bay</span>
        </div>
        <Badge variant="quiet">
          <ClockIcon data-icon="inline-start" />
          Queued
        </Badge>
      </li>
    </ul>
  );
}
