import { Badge, Field, FieldDescription, FieldLabel, Textarea } from "@robomous/ui-core";

/** Disabled keeps the arrow cursor; nothing will respond to focus or input. */
export default function Disabled() {
  return (
    <Field data-disabled className="w-full max-w-sm">
      <FieldLabel htmlFor="ta-release" className="w-full justify-between">
        Release notes
        <Badge variant="secondary">In production</Badge>
      </FieldLabel>
      <Textarea
        id="ta-release"
        defaultValue="Promoted to production on Oct 12, 09:20. Serving 6 sites from detector-v3.2."
        disabled
        aria-describedby="ta-release-hint"
      />
      <FieldDescription id="ta-release-hint">
        Notes are locked once a version is live. Publish a new version to change them.
      </FieldDescription>
    </Field>
  );
}
