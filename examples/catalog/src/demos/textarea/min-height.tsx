import { Field, FieldDescription, FieldLabel, Textarea } from "@robomous/ui-core";

/** The `min-h-16` floor is a default: raise it with `className` when the answer is expected to be a paragraph. */
export default function MinHeight() {
  return (
    <div className="grid w-full max-w-xl items-start gap-4 sm:grid-cols-2">
      <div className="rounded-lg border p-4">
        <Field>
          <FieldLabel htmlFor="ta-short">Handover note</FieldLabel>
          <Textarea
            id="ta-short"
            placeholder="What should the next shift know?"
            aria-describedby="ta-short-hint"
          />
          <FieldDescription id="ta-short-hint" className="font-mono">
            min-h-16 (default)
          </FieldDescription>
        </Field>
      </div>
      <div className="rounded-lg border p-4">
        <Field>
          <FieldLabel htmlFor="ta-incident">Incident description</FieldLabel>
          <Textarea
            id="ta-incident"
            className="min-h-32"
            placeholder="What happened, where, and what the robot was doing at the time."
            aria-describedby="ta-incident-hint"
          />
          <FieldDescription id="ta-incident-hint" className="font-mono">
            min-h-32
          </FieldDescription>
        </Field>
      </div>
    </div>
  );
}
