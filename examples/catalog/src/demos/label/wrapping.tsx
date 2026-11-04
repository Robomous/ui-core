import { Card, CardContent, Checkbox, Input, Label, Separator } from "@robomous/ui-core";

/** A label can also wrap its control: no `id` or `htmlFor` to keep in step, and the whole block is the click target. */
export default function Wrapping() {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="flex flex-col gap-4">
        <Label className="flex-col items-start gap-2">
          Capture rate (fps)
          <Input type="number" defaultValue={30} min={1} max={120} className="tabular-nums" />
        </Label>
        <Separator />
        <div className="flex flex-col gap-3">
          <Label>
            <Checkbox defaultChecked />
            Alert when a robot goes offline
          </Label>
          <Label>
            <Checkbox defaultChecked />
            Alert when a training run fails
          </Label>
          <Label>
            <Checkbox />
            Weekly fleet summary by email
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}
