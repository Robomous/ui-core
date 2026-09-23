import { Alert, AlertTitle, AlertDescription, AlertAction, Button } from "@robomous/ui-core";
import { TriangleAlertIcon } from "@robomous/ui-core/icons";

/** AlertAction sits top-right; the alert gains the padding to clear it on its own. */
export default function WithAction() {
  return (
    <Alert className="max-w-md">
      <TriangleAlertIcon />
      <AlertTitle>Ingest paused</AlertTitle>
      <AlertDescription>The bucket is unreachable. Retrying in a minute.</AlertDescription>
      <AlertAction>
        <Button variant="outline" size="sm">
          Retry now
        </Button>
      </AlertAction>
    </Alert>
  );
}
