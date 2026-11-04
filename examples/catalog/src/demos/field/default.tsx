import { Field, FieldDescription, FieldGroup, FieldLabel, Input } from "@robomous/ui-core";

/** Label, control and description: the call site writes `htmlFor`, `id` and `aria-describedby` itself. */
export default function Default() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Field>
        <FieldLabel htmlFor="f-endpoint">Endpoint name</FieldLabel>
        <Input
          id="f-endpoint"
          placeholder="detector-prod"
          autoComplete="off"
          aria-describedby="f-endpoint-hint"
        />
        <FieldDescription id="f-endpoint-hint">
          Appears in the inference URL and can't be changed later.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="f-region">Region</FieldLabel>
        <Input
          id="f-region"
          defaultValue="us-east-2"
          autoComplete="off"
          className="font-mono"
          aria-describedby="f-region-hint"
        />
        <FieldDescription id="f-region-hint">
          Pick the region closest to your cameras.
        </FieldDescription>
      </Field>
    </FieldGroup>
  );
}
