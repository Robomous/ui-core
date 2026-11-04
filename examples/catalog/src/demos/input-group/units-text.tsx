import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldGroup,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@robomous/ui-core";
import { BatteryLowIcon } from "@robomous/ui-core/icons";

/** `InputGroupText` is plain, non-interactive copy: a unit after the value or a prefix before it, never part of what the reader types. */
export default function UnitsText() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Mission defaults</CardTitle>
        <CardDescription>Applied to rb-07 Atlas at Monterrey DC-2.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="ig-dock">Return-to-dock threshold</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <BatteryLowIcon />
              </InputGroupAddon>
              <InputGroupInput
                id="ig-dock"
                type="number"
                defaultValue={20}
                min={5}
                max={50}
                className="tabular-nums"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupText>% charge</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="ig-speed">Maximum speed</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="ig-speed"
                type="number"
                defaultValue={1.2}
                step={0.1}
                className="tabular-nums"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupText>m/s</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="ig-bucket">Archive bucket</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>s3://</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                id="ig-bucket"
                placeholder="robomous-mty/archive"
                className="font-mono"
              />
            </InputGroup>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
