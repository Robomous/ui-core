import { Textarea, Field, FieldLabel } from "@robomous/ui-core";

/** A labelled textarea sized for a short free-text note. */
export default function Default() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="ta-notes">Notes</FieldLabel>
      <Textarea id="ta-notes" placeholder="What is this dataset for?" />
    </Field>
  );
}
