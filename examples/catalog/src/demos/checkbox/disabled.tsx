import {
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@robomous/ui-core";

/** Disabled, checked and unchecked; the label and description dim with the box. */
export default function Disabled() {
  return (
    <FieldGroup className="w-full max-w-sm gap-4 rounded-xl border p-5">
      <Field orientation="horizontal" data-disabled>
        <Checkbox id="record-audio" disabled aria-describedby="record-audio-hint" />
        <FieldContent>
          <FieldLabel htmlFor="record-audio">Record audio on this stream</FieldLabel>
          <FieldDescription id="record-audio-hint">
            Not available on cam-b07 (Dock A): it has no microphone.
          </FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal" data-disabled>
        <Checkbox
          id="motion-detection"
          disabled
          defaultChecked
          aria-describedby="motion-detection-hint"
        />
        <FieldContent>
          <FieldLabel htmlFor="motion-detection">Motion detection</FieldLabel>
          <FieldDescription id="motion-detection-hint">
            Required by site policy at Monterrey DC-2. Ask an admin to change it.
          </FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  );
}
