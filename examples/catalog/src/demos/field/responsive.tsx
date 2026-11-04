import { Field, FieldGroup, FieldLabel, Input } from "@robomous/ui-core";

/** `orientation="responsive"` stacks while its FieldGroup is narrow and goes side by side once the group itself is wide enough: a container query, so it answers to the group's width, not the viewport's. */
export default function Responsive() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground">Narrow group, 14rem: stacked</p>
        <div className="w-fit rounded-lg border border-dashed p-3">
          <FieldGroup className="w-56">
            <Field orientation="responsive">
              <FieldLabel htmlFor="f-narrow">Site code</FieldLabel>
              <Input id="f-narrow" placeholder="mty-dc2" className="font-mono" />
            </Field>
          </FieldGroup>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground">Wide group: side by side</p>
        <div className="rounded-lg border border-dashed p-3">
          <FieldGroup>
            <Field orientation="responsive">
              <FieldLabel htmlFor="f-wide">Site code</FieldLabel>
              <Input id="f-wide" placeholder="mty-dc2" className="font-mono" />
            </Field>
          </FieldGroup>
        </div>
      </div>
    </div>
  );
}
