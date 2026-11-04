import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ErrorMessage,
} from "@robomous/ui-core";

/** `label` adds a visible lead-in, for a page with more than one error on it. */
export default function CustomLabel() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>Two destinations need attention.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <ErrorMessage label="Webhook">
          The endpoint answered 502 on the last three deliveries.
        </ErrorMessage>
        <ErrorMessage label="Storage">The export bucket is read-only.</ErrorMessage>
      </CardContent>
    </Card>
  );
}
