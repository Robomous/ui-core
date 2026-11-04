import { Field, FieldDescription, FieldGroup, FieldLabel, Input } from "@robomous/ui-core";

/** Disabled keeps the arrow cursor and drops the opacity; nothing will respond to focus or input, so say why nearby. */
export default function Disabled() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Field>
        <FieldLabel htmlFor="in-name">Display name</FieldLabel>
        <Input id="in-name" defaultValue="Aisle 14, north end" />
      </Field>
      <Field data-disabled>
        <FieldLabel htmlFor="in-cam">Camera ID</FieldLabel>
        <Input
          id="in-cam"
          defaultValue="cam-02"
          disabled
          className="font-mono"
          aria-describedby="in-cam-hint"
        />
        <FieldDescription id="in-cam-hint">Assigned when the camera was paired.</FieldDescription>
      </Field>
    </FieldGroup>
  );
}
