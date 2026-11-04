import { Field, FieldDescription, FieldGroup, FieldLabel, Input } from "@robomous/ui-core";

/** A visible label and a description tied to the control with `aria-describedby`; the rule sits where the reader looks before typing. */
export default function Default() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Field>
        <FieldLabel htmlFor="in-model">Model name</FieldLabel>
        <Input
          id="in-model"
          placeholder="segmenter-v1.5"
          autoComplete="off"
          aria-describedby="in-model-hint"
        />
        <FieldDescription id="in-model-hint">
          Shown in the registry and in every deployment that uses it.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="in-tag">Version tag</FieldLabel>
        <Input
          id="in-tag"
          placeholder="2026.10-rc1"
          autoComplete="off"
          className="font-mono"
          aria-describedby="in-tag-hint"
        />
        <FieldDescription id="in-tag-hint">Letters, numbers, dots and hyphens.</FieldDescription>
      </Field>
    </FieldGroup>
  );
}
