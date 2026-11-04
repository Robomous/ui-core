import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
  FieldLabel,
  Textarea,
} from "@robomous/ui-core";

/** A free-text note on a record: labelled, with the audience stated underneath and the actions in the footer. */
export default function Overview() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="/assets/people/daniel-okafor.svg" alt="Daniel Okafor" />
          <AvatarFallback>DO</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <CardTitle>run-0419</CardTitle>
          <CardDescription className="tabular-nums">
            detector-v3.2 · 38 epochs · mAP 0.71
          </CardDescription>
        </div>
        <Badge variant="success">Completed</Badge>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel htmlFor="ta-ov-notes">Run notes</FieldLabel>
          <Textarea
            id="ta-ov-notes"
            defaultValue="Learning rate dropped to 1e-4 after epoch 20. Validation loss plateaued at epoch 31, so the best checkpoint is from epoch 29."
            aria-describedby="ta-ov-hint"
          />
          <FieldDescription id="ta-ov-hint">
            Visible to everyone on the team. Last edited Oct 28, 14:32.
          </FieldDescription>
        </Field>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Discard</Button>
        <Button>Save notes</Button>
      </CardFooter>
    </Card>
  );
}
