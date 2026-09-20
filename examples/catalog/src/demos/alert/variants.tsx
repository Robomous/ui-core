import { Alert, AlertTitle, AlertDescription } from "@robomous/ui-core";
import { TriangleAlertIcon, CircleAlertIcon } from "lucide-react";

/** Two variants: default recolours nothing extra, destructive recolours its ink, never its border. */
export default function Variants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Alert>
        <TriangleAlertIcon />
        <AlertTitle>Ingest paused</AlertTitle>
        <AlertDescription>The bucket is unreachable. Retrying in a minute.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <CircleAlertIcon />
        <AlertTitle>Export failed</AlertTitle>
        <AlertDescription>Two frames reference a class that no longer exists.</AlertDescription>
      </Alert>
    </div>
  );
}
