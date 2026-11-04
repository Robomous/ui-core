import { Alert, AlertTitle, AlertDescription } from "@robomous/ui-core";
import {
  TriangleAlertIcon,
  CircleAlertIcon,
  InfoIcon,
  CircleCheckIcon,
  CalendarClockIcon,
} from "@robomous/ui-core/icons";

/** A neutral default, then four status roles: each colours its icon and nothing else. */
export default function Variants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Alert>
        <CalendarClockIcon />
        <AlertTitle>Maintenance window on Saturday</AlertTitle>
        <AlertDescription>
          Robots at Monterrey DC-2 return to dock at 02:00 for firmware 4.2.1.
        </AlertDescription>
      </Alert>
      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>detector-v3.2 is serving traffic</AlertTitle>
        <AlertDescription>The previous version stays available for rollback.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CircleCheckIcon />
        <AlertTitle>Export finished</AlertTitle>
        <AlertDescription>4,812 annotations are ready as COCO JSON.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <TriangleAlertIcon />
        <AlertTitle>Battery low on rb-07 "Atlas"</AlertTitle>
        <AlertDescription>
          14% left. The robot will dock after its current mission.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <CircleAlertIcon />
        <AlertTitle>Ingest paused</AlertTitle>
        <AlertDescription>
          The S3 bucket rejected our credentials. Rotate the access key to resume.
        </AlertDescription>
      </Alert>
    </div>
  );
}
