import {
  Checkbox,
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
} from "@robomous/ui-core";
import { useId } from "react";

/** `aria-invalid` paints the control, `data-invalid` the field, and a FieldError says what to do: the colour is never alone. */
export default function Invalid() {
  const id = useId();
  return (
    <FieldGroup className="w-full max-w-sm gap-5">
      <Field>
        <FieldLabel htmlFor={`${id}-name`}>Dataset name</FieldLabel>
        <Input id={`${id}-name`} defaultValue="Shelf inspection 2026" />
      </Field>
      <Field data-invalid>
        <FieldLabel htmlFor={`${id}-slug`}>Slug</FieldLabel>
        <Input
          id={`${id}-slug`}
          defaultValue="Shelf Inspection 2026"
          aria-invalid
          aria-describedby={`${id}-slug-error`}
          className="font-mono"
        />
        <FieldError id={`${id}-slug-error`}>
          Use lowercase letters, numbers and dashes, like shelf-inspection-2026.
        </FieldError>
      </Field>
      <Field data-invalid orientation="horizontal">
        <Checkbox id={`${id}-terms`} aria-invalid aria-describedby={`${id}-terms-error`} />
        <FieldContent>
          <FieldLabel htmlFor={`${id}-terms`}>Frames contain no personal data</FieldLabel>
          <FieldError id={`${id}-terms-error`}>Confirm this before publishing.</FieldError>
        </FieldContent>
      </Field>
    </FieldGroup>
  );
}
