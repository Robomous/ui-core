import { Checkbox, Field, FieldContent, FieldError, FieldLabel } from "@robomous/ui-core";

/** `aria-invalid` paints the destructive ring; the message is the call site's, as in any Field. */
export default function Invalid() {
  return (
    <Field orientation="horizontal" data-invalid className="max-w-sm">
      <Checkbox id="consent" aria-invalid aria-describedby="consent-error" />
      <FieldContent>
        <FieldLabel htmlFor="consent">I have the rights to upload these images</FieldLabel>
        <FieldError id="consent-error">Confirm this before uploading.</FieldError>
      </FieldContent>
    </Field>
  );
}
