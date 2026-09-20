import {
  Field,
  FieldSet,
  FieldLegend,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  Input,
} from "@robomous/ui-core";

/** FieldSet and FieldLegend give a group of fields a real `<fieldset>`/`<legend>`; FieldGroup only spaces the fields inside it. */
export default function FieldSetComposition() {
  return (
    <FieldSet className="max-w-sm">
      <FieldLegend>Camera settings</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fs-id">Camera ID</FieldLabel>
          <Input id="fs-id" placeholder="cam-004" />
        </Field>
        <Field>
          <FieldLabel htmlFor="fs-rate">Sample rate</FieldLabel>
          <Input id="fs-rate" defaultValue="10 Hz" aria-describedby="fs-rate-hint" />
          <FieldDescription id="fs-rate-hint">Frames captured per second.</FieldDescription>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
