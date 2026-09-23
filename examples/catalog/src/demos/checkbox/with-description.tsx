import { Checkbox, Field, FieldContent, FieldDescription, FieldLabel } from "@robomous/ui-core";

/** Inside a horizontal `Field`, the box aligns to the first line of a label with a description. */
export default function WithDescription() {
  return (
    <Field orientation="horizontal" className="max-w-sm">
      <Checkbox id="notify" defaultChecked aria-describedby="notify-hint" />
      <FieldContent>
        <FieldLabel htmlFor="notify">Email me when a job finishes</FieldLabel>
        <FieldDescription id="notify-hint">
          One message per job, sent to the address on your profile.
        </FieldDescription>
      </FieldContent>
    </Field>
  );
}
