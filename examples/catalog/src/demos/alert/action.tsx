import { Alert, AlertAction, AlertDescription, AlertTitle, Button } from "@robomous/ui-core";
import { TriangleAlertIcon } from "@robomous/ui-core/icons";

/** AlertAction sits top-right; the alert gains the padding to clear it on its own. */
export default function Action() {
  return (
    <Alert variant="warning" className="w-full max-w-md">
      <TriangleAlertIcon />
      <AlertTitle>rb-12 “Kestrel” lost its docking signal</AlertTitle>
      <AlertDescription>It has been holding in Aisle 14 for 3 minutes.</AlertDescription>
      <AlertAction>
        <Button variant="outline" size="sm">
          Retry dock
        </Button>
      </AlertAction>
    </Alert>
  );
}
