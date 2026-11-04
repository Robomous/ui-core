import { Alert, AlertDescription, AlertTitle } from "@robomous/ui-core";
import { TriangleAlertIcon } from "@robomous/ui-core/icons";

/** A description can hold paragraphs and links; the alert spaces the paragraphs and underlines the links. */
export default function Details() {
  return (
    <Alert variant="warning" className="w-full max-w-md">
      <TriangleAlertIcon />
      <AlertTitle>Your API key expires in 3 days</AlertTitle>
      <AlertDescription>
        <p>
          Requests signed with <code className="font-mono">rk_live_4f2a</code> will start failing on
          Nov 1.
        </p>
        <p>
          Create a new key, update your deployments, then revoke this one.{" "}
          <a href="#keys">Manage API keys</a>
        </p>
      </AlertDescription>
    </Alert>
  );
}
