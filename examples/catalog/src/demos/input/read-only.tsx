import { Field, FieldDescription, FieldGroup, FieldLabel, Input } from "@robomous/ui-core";

/** `readOnly` stays focusable and selectable, so the value can be copied; `disabled` can't be. */
export default function ReadOnly() {
  return (
    <FieldGroup className="w-full max-w-md">
      <Field>
        <FieldLabel htmlFor="in-endpoint">Inference endpoint</FieldLabel>
        <Input
          id="in-endpoint"
          readOnly
          value="https://api.robomous.ai/v1/detector-prod/predict"
          className="font-mono"
          aria-describedby="in-endpoint-hint"
        />
        <FieldDescription id="in-endpoint-hint">
          Select the text to copy it. Changing the URL means creating a new endpoint.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="in-deployed">Serving model</FieldLabel>
        <Input id="in-deployed" readOnly value="detector-v3.2 (mAP 0.71)" className="font-mono" />
      </Field>
    </FieldGroup>
  );
}
