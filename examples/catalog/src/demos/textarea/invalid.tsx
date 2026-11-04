import { useState } from "react";
import { Button, Field, FieldError, FieldLabel, Textarea } from "@robomous/ui-core";

/** `aria-invalid` styles the invalid state; the error is tied to the control and clears once the rule is met. */
export default function Invalid() {
  const [reason, setReason] = useState("Need export.");
  const invalid = reason.trim().length < 20;

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Field data-invalid={invalid}>
        <FieldLabel htmlFor="ta-reason">Why do you need forklift-night?</FieldLabel>
        <Textarea
          id="ta-reason"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          aria-invalid={invalid}
          aria-describedby={invalid ? "ta-reason-error" : undefined}
        />
        {invalid && (
          <FieldError id="ta-reason-error">
            Add at least 20 characters so reviewers have context.
          </FieldError>
        )}
      </Field>
      <Button disabled={invalid} className="self-end">
        Request access
      </Button>
    </div>
  );
}
