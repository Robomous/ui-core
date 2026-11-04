import { Alert, AlertAction, AlertDescription, AlertTitle, Button } from "@robomous/ui-core";
import { InfoIcon, XIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

/** A notice the reader can put away: the close button lives in AlertAction, the state in your component. */
export default function Dismissible() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-20 w-full max-w-md flex-col items-center justify-center">
      {open ? (
        <Alert variant="info">
          <InfoIcon />
          <AlertTitle>New in v3.2: per-class thresholds</AlertTitle>
          <AlertDescription>
            Tune confidence for each class from the model's settings page.
          </AlertDescription>
          <AlertAction>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Dismiss"
              onClick={() => setOpen(false)}
            >
              <XIcon />
            </Button>
          </AlertAction>
        </Alert>
      ) : (
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
          Show notice again
        </Button>
      )}
    </div>
  );
}
