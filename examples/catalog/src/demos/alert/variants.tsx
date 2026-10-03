import { Alert, AlertTitle, AlertDescription } from "@robomous/ui-core";
import {
  TriangleAlertIcon,
  CircleAlertIcon,
  InfoIcon,
  CircleCheckIcon,
} from "@robomous/ui-core/icons";

/** Default on card, then four tonal roles: each paints its surface and its ink, never its border. */
export default function Variants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Alert>
        <TriangleAlertIcon />
        <AlertTitle>Ingest paused</AlertTitle>
        <AlertDescription>The bucket is unreachable. Retrying in a minute.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>Inference is running locally</AlertTitle>
        <AlertDescription>No frame leaves this machine.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CircleCheckIcon />
        <AlertTitle>Release v0.6 is verified</AlertTitle>
        <AlertDescription>All assets match the manifest.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <TriangleAlertIcon />
        <AlertTitle>Local suggestions are off</AlertTitle>
        <AlertDescription>Install the runtime, then restart the server.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <CircleAlertIcon />
        <AlertTitle>Export failed</AlertTitle>
        <AlertDescription>Two frames reference a class that no longer exists.</AlertDescription>
      </Alert>
    </div>
  );
}
