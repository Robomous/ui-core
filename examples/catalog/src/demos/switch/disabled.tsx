import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Switch,
} from "@robomous/ui-core";

/** Disabled, on and off; the label and description dim with the switch. */
export default function Disabled() {
  return (
    <FieldGroup className="w-full max-w-sm gap-4 rounded-xl border p-5">
      <Field orientation="horizontal" data-disabled>
        <FieldContent>
          <FieldLabel htmlFor="switch-disabled-off">Public dataset sharing</FieldLabel>
          <FieldDescription id="switch-disabled-off-hint">
            Turned off by your organization.
          </FieldDescription>
        </FieldContent>
        <Switch id="switch-disabled-off" disabled aria-describedby="switch-disabled-off-hint" />
      </Field>
      <Field orientation="horizontal" data-disabled>
        <FieldContent>
          <FieldLabel htmlFor="switch-disabled-on">Audit log</FieldLabel>
          <FieldDescription id="switch-disabled-on-hint">
            Always on for the Team plan.
          </FieldDescription>
        </FieldContent>
        <Switch
          id="switch-disabled-on"
          disabled
          defaultChecked
          aria-describedby="switch-disabled-on-hint"
        />
      </Field>
    </FieldGroup>
  );
}
