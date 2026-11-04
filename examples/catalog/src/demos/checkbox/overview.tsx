import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@robomous/ui-core";

/** An export dialog's options: each choice waits for the Export button, so each one is a checkbox. */
export default function Overview() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <img
            src="/assets/frames/dock-2.svg"
            alt=""
            className="size-14 shrink-0 rounded-lg object-cover outline outline-1 -outline-offset-1 outline-foreground/10"
          />
          <div className="flex min-w-0 flex-col gap-0.5">
            <CardTitle>Export pallet-detection</CardTitle>
            <p className="text-muted-foreground tabular-nums">18,204 frames · 41 batches</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field orientation="horizontal">
            <Checkbox
              id="export-annotations"
              defaultChecked
              aria-describedby="export-annotations-hint"
            />
            <FieldContent>
              <FieldLabel htmlFor="export-annotations">Include annotations</FieldLabel>
              <FieldDescription id="export-annotations-hint">
                Boxes and polygons, in COCO JSON.
              </FieldDescription>
            </FieldContent>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="export-unreviewed" aria-describedby="export-unreviewed-hint" />
            <FieldContent>
              <FieldLabel htmlFor="export-unreviewed">Include unreviewed frames</FieldLabel>
              <FieldDescription id="export-unreviewed-hint">
                Adds 1,204 frames nobody has signed off yet.
              </FieldDescription>
            </FieldContent>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="export-split" defaultChecked />
            <FieldLabel htmlFor="export-split">Split into train, val and test</FieldLabel>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Export</Button>
      </CardFooter>
    </Card>
  );
}
