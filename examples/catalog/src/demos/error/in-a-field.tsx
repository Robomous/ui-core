import { ErrorMessage, Field, FieldLabel, Input } from "@robomous/ui-core";

/** Under a control, tied to it with `aria-describedby` so the input announces it on focus. */
export default function InAField() {
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="bucket">Export bucket</FieldLabel>
      <Input
        id="bucket"
        defaultValue="s3://vision-exports-old"
        aria-invalid
        aria-describedby="bucket-error"
        className="font-mono"
      />
      <ErrorMessage id="bucket-error">
        Couldn't write to this bucket. Check its policy.
      </ErrorMessage>
    </Field>
  );
}
