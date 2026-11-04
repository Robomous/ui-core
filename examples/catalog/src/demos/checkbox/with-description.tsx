import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@robomous/ui-core";

/** Inside a horizontal `Field`, the box aligns to the first line of a label with a description. */
export default function WithDescription() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Email notifications</CardTitle>
        <CardDescription>Sent to maria.lopez@robomous.ai.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="gap-4">
          <Field orientation="horizontal">
            <Checkbox id="notify-run" defaultChecked aria-describedby="notify-run-hint" />
            <FieldContent>
              <FieldLabel htmlFor="notify-run">Training run finishes</FieldLabel>
              <FieldDescription id="notify-run-hint">
                One message per run, with final mAP and loss.
              </FieldDescription>
            </FieldContent>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="notify-drift" defaultChecked aria-describedby="notify-drift-hint" />
            <FieldContent>
              <FieldLabel htmlFor="notify-drift">Model drift detected</FieldLabel>
              <FieldDescription id="notify-drift-hint">
                When a deployed model's confidence drops 10% below its baseline.
              </FieldDescription>
            </FieldContent>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="notify-digest" />
            <FieldLabel htmlFor="notify-digest">Weekly digest</FieldLabel>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
