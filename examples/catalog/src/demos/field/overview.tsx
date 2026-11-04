import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Input,
  Switch,
} from "@robomous/ui-core";

/** A settings form: stacked fields with a description, and a horizontal field where the control sits at the end. */
export default function Overview() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex items-center gap-3">
        <img
          src="/assets/frames/aisle-2.svg"
          alt=""
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <div className="flex flex-col gap-0.5">
          <CardTitle>New endpoint</CardTitle>
          <CardDescription>Serve detector-v3.2 behind an HTTPS URL.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="f-ov-name">Endpoint name</FieldLabel>
            <Input
              id="f-ov-name"
              placeholder="detector-prod"
              autoComplete="off"
              aria-describedby="f-ov-name-hint"
            />
            <FieldDescription id="f-ov-name-hint">
              Appears in the inference URL and can't be changed later.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="f-ov-replicas">Minimum replicas</FieldLabel>
            <Input
              id="f-ov-replicas"
              type="number"
              min={1}
              defaultValue={2}
              className="tabular-nums"
            />
          </Field>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor="f-ov-autoscale">Autoscaling</FieldLabel>
              <FieldDescription id="f-ov-autoscale-hint">
                Add replicas when requests queue up.
              </FieldDescription>
            </FieldContent>
            <Switch id="f-ov-autoscale" defaultChecked aria-describedby="f-ov-autoscale-hint" />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Create endpoint</Button>
      </CardFooter>
    </Card>
  );
}
