import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from "@robomous/ui-core";
import { EllipsisIcon } from "@robomous/ui-core/icons";

/** `CardAction` parks a control in the header's second column, aligned to the title however tall the header grows. */
export default function WithAction() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Card>
        <CardHeader>
          <CardTitle>rb-07 Atlas</CardTitle>
          <CardDescription>Docked at bay 3, Monterrey DC-2.</CardDescription>
          <CardAction>
            <Badge variant="success">charging</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <span className="text-muted-foreground">Battery</span>
              <span className="tabular-nums">82%</span>
            </div>
            <Progress value={82} aria-label="Battery level" />
            <p className="text-pretty text-muted-foreground">
              The next mission, a zone B sweep, starts at 90%.
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>pallet-detection</CardTitle>
          <CardDescription>
            18,204 frames across 41 batches. Last export Oct 28, 14:32.
          </CardDescription>
          <CardAction>
            <Button variant="ghost" size="icon-sm" aria-label="Dataset actions">
              <EllipsisIcon />
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}
