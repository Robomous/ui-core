import { Input, Field, FieldLabel, FieldDescription } from "@robomous/ui-core";

/** A labelled text input in its default resting state. */
export default function Default() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="in-name">Project name</FieldLabel>
      <Input id="in-name" placeholder="warehouse-cameras" aria-describedby="in-name-hint" />
      <FieldDescription id="in-name-hint">Lowercase, hyphens allowed.</FieldDescription>
    </Field>
  );
}
