import { Field, FieldGroup, FieldLabel, Input } from "@robomous/ui-core";

/** `orientation="responsive"` stacks the label above the control while its FieldGroup is narrow, then moves it alongside once the group itself crosses a container breakpoint — a container query, not a media query, so it answers to the group's width, not the viewport's. */
export default function Responsive() {
  return (
    <div className="flex flex-col gap-6">
      <FieldGroup className="max-w-56">
        <Field orientation="responsive">
          <FieldLabel htmlFor="f-narrow">Camera ID</FieldLabel>
          <Input id="f-narrow" placeholder="cam-004" />
        </Field>
      </FieldGroup>
      <FieldGroup className="max-w-lg">
        <Field orientation="responsive">
          <FieldLabel htmlFor="f-wide">Camera ID</FieldLabel>
          <Input id="f-wide" placeholder="cam-004" />
        </Field>
      </FieldGroup>
    </div>
  );
}
