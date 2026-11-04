import { useState } from "react";
import { Button, Field, FieldError, FieldGroup, FieldLabel, Input } from "@robomous/ui-core";

/** Pass `errors` (anything shaped like `{ message }`, as form libraries produce) and FieldError drops duplicates, then renders one message as text and several as a list. */
export default function Errors() {
  const [password, setPassword] = useState("atlas");

  const errors = [
    password.length < 12 ? { message: "Use at least 12 characters." } : undefined,
    /\d/.test(password) ? undefined : { message: "Include at least one number." },
  ].filter((error) => error !== undefined);
  const invalid = errors.length > 0;

  return (
    <FieldGroup className="w-full max-w-sm">
      <Field data-invalid={invalid}>
        <FieldLabel htmlFor="f-password">New password</FieldLabel>
        <Input
          id="f-password"
          type="text"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-invalid={invalid}
          aria-describedby={invalid ? "f-password-errors" : undefined}
        />
        <FieldError id="f-password-errors" errors={errors} />
      </Field>
      <Button disabled={invalid} className="self-end">
        Update password
      </Button>
    </FieldGroup>
  );
}
