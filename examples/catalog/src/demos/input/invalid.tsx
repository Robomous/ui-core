import { useState } from "react";
import { Button, Field, FieldError, FieldLabel, Input } from "@robomous/ui-core";

/** `aria-invalid` styles the invalid state, the error is tied back with `aria-describedby`, and it all clears as soon as the value is valid. */
export default function Invalid() {
  const [url, setUrl] = useState("http://hooks.robomous.ai/fleet-alerts");
  const invalid = url !== "" && !url.startsWith("https://");

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Field data-invalid={invalid}>
        <FieldLabel htmlFor="in-webhook">Alert webhook URL</FieldLabel>
        <Input
          id="in-webhook"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          aria-invalid={invalid}
          aria-describedby={invalid ? "in-webhook-error" : undefined}
          className="font-mono"
        />
        {invalid && (
          <FieldError id="in-webhook-error">Webhook URLs must start with https://.</FieldError>
        )}
      </Field>
      <Button disabled={invalid || url === ""} className="self-end">
        Save webhook
      </Button>
    </div>
  );
}
