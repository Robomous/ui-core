import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ErrorMessage,
} from "@robomous/ui-core";
import { RefreshCwIcon } from "@robomous/ui-core/icons";

/** A panel that couldn't load: say what failed, in place, and give the way to try again. */
export default function Overview() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Fleet telemetry</CardTitle>
        <CardDescription>Monterrey DC-2 · 8 robots</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-3">
        <ErrorMessage>Couldn't load telemetry. The fleet gateway didn't respond.</ErrorMessage>
        <Button variant="outline" size="sm">
          <RefreshCwIcon data-icon="inline-start" />
          Try again
        </Button>
      </CardContent>
    </Card>
  );
}
