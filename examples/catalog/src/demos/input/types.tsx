import { Field, FieldDescription, FieldLabel, Input } from "@robomous/ui-core";

/** The native `type` decides the on-screen keyboard, the built-in validation and the autofill, so pick the one that matches the data. */
export default function Types() {
  return (
    <div className="grid w-full max-w-xl gap-x-6 gap-y-5 sm:grid-cols-2">
      <Field>
        <FieldLabel htmlFor="in-ty-email">Work email</FieldLabel>
        <Input
          id="in-ty-email"
          type="email"
          autoComplete="email"
          placeholder="maria.lopez@robomous.ai"
          aria-describedby="in-ty-email-type"
        />
        <FieldDescription id="in-ty-email-type" className="font-mono">
          type="email"
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="in-ty-url">Webhook URL</FieldLabel>
        <Input
          id="in-ty-url"
          type="url"
          placeholder="https://hooks.robomous.ai/alerts"
          aria-describedby="in-ty-url-type"
        />
        <FieldDescription id="in-ty-url-type" className="font-mono">
          type="url"
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="in-ty-conf">Confidence threshold</FieldLabel>
        <Input
          id="in-ty-conf"
          type="number"
          inputMode="decimal"
          min={0}
          max={1}
          step={0.05}
          defaultValue={0.5}
          className="tabular-nums"
          aria-describedby="in-ty-conf-type"
        />
        <FieldDescription id="in-ty-conf-type" className="font-mono">
          type="number"
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="in-ty-pass">Password</FieldLabel>
        <Input
          id="in-ty-pass"
          type="password"
          autoComplete="new-password"
          defaultValue="correct-horse"
          aria-describedby="in-ty-pass-type"
        />
        <FieldDescription id="in-ty-pass-type" className="font-mono">
          type="password"
        </FieldDescription>
      </Field>
    </div>
  );
}
