import { Field, FieldLabel, Input } from "@robomous/ui-core";

/** `orientation="horizontal"` places the label beside the control instead of above it. */
export default function Horizontal() {
  return (
    <Field orientation="horizontal" className="max-w-sm">
      <FieldLabel htmlFor="f-fps">Capture rate</FieldLabel>
      <Input id="f-fps" defaultValue="30 fps" className="max-w-28" />
    </Field>
  );
}
