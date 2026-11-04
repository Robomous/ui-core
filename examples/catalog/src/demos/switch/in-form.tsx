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
  FieldLabel,
  Switch,
} from "@robomous/ui-core";
import { useState } from "react";

/** Inside a `<form>` a switch posts its `value` (default `on`) under its `name` when it is on. */
export default function InForm() {
  const [posted, setPosted] = useState<string | null>(null);

  return (
    <Card className="w-full max-w-sm">
      <form
        className="contents"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          setPosted(`autolabel = ${data.get("autolabel") ?? "(not sent)"}`);
        }}
      >
        <CardHeader>
          <CardTitle>Annotation settings</CardTitle>
          <CardDescription>Applied to every new frame in pallet-detection.</CardDescription>
        </CardHeader>
        <CardContent>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor="autolabel">Pre-label with detector-v3.2</FieldLabel>
              <FieldDescription id="autolabel-hint">
                Annotators review boxes instead of drawing them.
              </FieldDescription>
            </FieldContent>
            <Switch id="autolabel" name="autolabel" aria-describedby="autolabel-hint" />
          </Field>
        </CardContent>
        <CardFooter className="gap-3">
          <Button type="submit">Save</Button>
          {posted && <span className="font-mono text-muted-foreground">{posted}</span>}
        </CardFooter>
      </form>
    </Card>
  );
}
