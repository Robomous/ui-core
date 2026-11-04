import {
  Card,
  CardContent,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  Input,
} from "@robomous/ui-core";

/** `FieldSet` and `FieldLegend` are a real `<fieldset>` and `<legend>`; `FieldGroup` spaces what is inside, and `FieldSeparator` splits it into parts. */
export default function FieldSetComposition() {
  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <FieldSet>
          <FieldLegend>Site retention</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="fs-site">Site</FieldLabel>
              <Input id="fs-site" defaultValue="Monterrey DC-2" />
            </Field>
            <Field>
              <FieldLabel htmlFor="fs-days">Keep footage for (days)</FieldLabel>
              <Input
                id="fs-days"
                type="number"
                defaultValue={30}
                className="tabular-nums"
                aria-describedby="fs-days-hint"
              />
              <FieldDescription id="fs-days-hint">
                Older footage is deleted from all streams at this site.
              </FieldDescription>
            </Field>
            <FieldSeparator>Exports</FieldSeparator>
            <Field>
              <FieldLabel htmlFor="fs-bucket">Archive bucket</FieldLabel>
              <Input
                id="fs-bucket"
                placeholder="s3://robomous-mty/archive"
                autoComplete="off"
                className="font-mono"
              />
            </Field>
          </FieldGroup>
        </FieldSet>
      </CardContent>
    </Card>
  );
}
