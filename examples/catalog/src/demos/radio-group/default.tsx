import {
  Card,
  CardContent,
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  RadioGroup,
  RadioGroupItem,
} from "@robomous/ui-core";

/** When each option needs an explanation, give it a `FieldDescription` and tie it to the item with `aria-describedby`; the `FieldSet` legend names the whole question. */
export default function Default() {
  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <FieldSet>
          <FieldLegend variant="label">When rb-07 Atlas is low on battery</FieldLegend>
          <RadioGroup defaultValue="dock">
            <Field orientation="horizontal">
              <RadioGroupItem value="dock" id="low-dock" aria-describedby="low-dock-hint" />
              <FieldContent>
                <FieldLabel htmlFor="low-dock">Return to the nearest dock</FieldLabel>
                <FieldDescription id="low-dock-hint">
                  Recommended. The mission resumes after charging.
                </FieldDescription>
              </FieldContent>
            </Field>
            <Field orientation="horizontal">
              <RadioGroupItem value="finish" id="low-finish" aria-describedby="low-finish-hint" />
              <FieldContent>
                <FieldLabel htmlFor="low-finish">Finish the current mission</FieldLabel>
                <FieldDescription id="low-finish-hint">
                  Docks only below 5% charge.
                </FieldDescription>
              </FieldContent>
            </Field>
            <Field orientation="horizontal">
              <RadioGroupItem value="stop" id="low-stop" aria-describedby="low-stop-hint" />
              <FieldContent>
                <FieldLabel htmlFor="low-stop">Stop in place</FieldLabel>
                <FieldDescription id="low-stop-hint">
                  An operator has to move the robot.
                </FieldDescription>
              </FieldContent>
            </Field>
          </RadioGroup>
        </FieldSet>
      </CardContent>
    </Card>
  );
}
