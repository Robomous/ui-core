import { Field, FieldError, FieldGroup, FieldLabel, Input } from "@robomous/ui-core";

/** `data-invalid` on Field, `aria-invalid` on the control, and a FieldError (`role="alert"`) tied back with `aria-describedby`: three attributes, none of them automatic. Only the invalid field changes. */
export default function Invalid() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Field>
        <FieldLabel htmlFor="f-member">Teammate name</FieldLabel>
        <Input id="f-member" defaultValue="Lucas Moreau" />
      </Field>
      <Field data-invalid>
        <FieldLabel htmlFor="f-email">Teammate email</FieldLabel>
        <Input
          id="f-email"
          defaultValue="lucas.moreau@robomous"
          aria-invalid
          aria-describedby="f-email-error"
        />
        <FieldError id="f-email-error">
          Enter a full address, like lucas.moreau@robomous.ai.
        </FieldError>
      </Field>
    </FieldGroup>
  );
}
