import { Field, FieldLabel, FieldDescription, Input } from "@robomous/ui-core";

/** A complete accessible field: the call site wires `htmlFor`, `id` and `aria-describedby` itself. */
export default function Default() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="f-name">Project name</FieldLabel>
      <Input id="f-name" placeholder="warehouse-cameras" aria-describedby="f-name-hint" />
      <FieldDescription id="f-name-hint">Lowercase, hyphens allowed.</FieldDescription>
    </Field>
  );
}
