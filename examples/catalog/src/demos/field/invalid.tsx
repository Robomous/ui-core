import { Field, FieldLabel, FieldError, Input } from "@robomous/ui-core";

/** `data-invalid` on Field, `aria-invalid` on the control, and FieldError (`role="alert"`) in place of the description: three attributes, none of them automatic. */
export default function Invalid() {
  return (
    <Field data-invalid className="max-w-sm">
      <FieldLabel htmlFor="f-key">API key</FieldLabel>
      <Input id="f-key" defaultValue="rk_live_..." aria-invalid aria-describedby="f-key-error" />
      <FieldError id="f-key-error">This key was revoked.</FieldError>
    </Field>
  );
}
