import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  Switch,
} from "@robomous/ui-core";

/** `aria-invalid` styles the destructive ring, as on every other control. */
export default function Invalid() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Choose where fleet alerts for Monterrey DC-2 are delivered.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field orientation="horizontal" data-invalid>
          <FieldContent>
            <FieldLabel htmlFor="switch-invalid">Send alerts to Slack</FieldLabel>
            <FieldError id="switch-invalid-error">Connect a Slack workspace first.</FieldError>
          </FieldContent>
          <Switch id="switch-invalid" aria-invalid aria-describedby="switch-invalid-error" />
        </Field>
      </CardContent>
    </Card>
  );
}
