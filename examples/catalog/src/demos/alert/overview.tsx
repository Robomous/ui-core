import { Alert, AlertDescription, AlertTitle } from "@robomous/ui-core";
import { CircleAlertIcon } from "@robomous/ui-core/icons";

/** A failed rollout at the top of a deployment page: what happened, why, and where to look. */
export default function Overview() {
  return (
    <Alert variant="destructive" className="w-full max-w-lg">
      <CircleAlertIcon />
      <AlertTitle>Rollout to Monterrey DC-2 stopped</AlertTitle>
      <AlertDescription>
        detector-v3.2 failed its health check on 3 of 8 robots, so traffic stays on v3.1.{" "}
        <a href="#rollout-log">Read the rollout log</a>
      </AlertDescription>
    </Alert>
  );
}
