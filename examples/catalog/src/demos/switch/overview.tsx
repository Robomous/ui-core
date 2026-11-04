import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Switch,
} from "@robomous/ui-core";

/** Each row applies the moment it is flipped, so there is no Save button and each one is a switch. */
export default function Overview() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Fleet alerts</CardTitle>
        <CardDescription>Monterrey DC-2. Changes apply to everyone on the team.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor="alert-offline">Robot goes offline</FieldLabel>
              <FieldDescription id="alert-offline-hint">
                After 2 minutes without a heartbeat.
              </FieldDescription>
            </FieldContent>
            <Switch id="alert-offline" defaultChecked aria-describedby="alert-offline-hint" />
          </Field>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor="alert-battery">Low battery</FieldLabel>
              <FieldDescription id="alert-battery-hint">
                Below 20% while on a mission.
              </FieldDescription>
            </FieldContent>
            <Switch id="alert-battery" defaultChecked aria-describedby="alert-battery-hint" />
          </Field>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor="alert-drift">Model drift</FieldLabel>
              <FieldDescription id="alert-drift-hint">
                When mAP drops 5% below the deployed baseline of 0.71.
              </FieldDescription>
            </FieldContent>
            <Switch id="alert-drift" aria-describedby="alert-drift-hint" />
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
