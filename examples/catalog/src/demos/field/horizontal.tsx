import {
  Card,
  CardContent,
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Input,
  Switch,
} from "@robomous/ui-core";

/** `orientation="horizontal"` lines the label up beside the control; wrap label and description in `FieldContent` and the control stays aligned with the first line. */
export default function Horizontal() {
  return (
    <Card className="w-full max-w-md">
      <CardContent>
        <FieldGroup>
          <Field orientation="horizontal">
            <FieldLabel htmlFor="f-speed">Max speed (m/s)</FieldLabel>
            <Input
              id="f-speed"
              type="number"
              defaultValue={1.2}
              step={0.1}
              className="max-w-20 tabular-nums"
            />
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="f-stop" defaultChecked aria-describedby="f-stop-hint" />
            <FieldContent>
              <FieldLabel htmlFor="f-stop">Stop on obstacle</FieldLabel>
              <FieldDescription id="f-stop-hint">
                The robot halts when the lidar sees something within 0.5 m.
              </FieldDescription>
            </FieldContent>
          </Field>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor="f-lights">Headlights</FieldLabel>
              <FieldDescription id="f-lights-hint">
                Switch on automatically in dark aisles.
              </FieldDescription>
            </FieldContent>
            <Switch id="f-lights" aria-describedby="f-lights-hint" />
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
