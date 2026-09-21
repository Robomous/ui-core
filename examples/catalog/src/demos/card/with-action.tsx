import {
  Badge,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@robomous/ui-core";

/** `CardAction` parks a control in the header's second column, aligned to the title however tall the header grows. */
export default function WithAction() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Batch 0412</CardTitle>
        <CardDescription>9,812 frames, ingested 2 hours ago.</CardDescription>
        <CardAction>
          <Badge variant="success">ready</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Every frame passed the sharpness gate. Annotation can start.
        </p>
      </CardContent>
    </Card>
  );
}
