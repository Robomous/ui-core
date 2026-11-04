import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Field,
  FieldGroup,
  FieldLabel,
} from "@robomous/ui-core";
import { useState } from "react";

const CLASSES = ["pallet", "forklift", "person", "box", "damaged-box"];

/** Inside a `<form>` each checked box posts its `name` and `value`, as a native checkbox does. */
export default function InForm() {
  const [submitted, setSubmitted] = useState<string[] | null>(null);

  return (
    <Card className="w-full max-w-sm">
      <form
        className="contents"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(new FormData(event.currentTarget).getAll("classes") as string[]);
        }}
      >
        <CardHeader>
          <CardTitle>Classes to detect</CardTitle>
          <CardDescription>detector-v3.2 only reports the ones you tick.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className="grid grid-cols-2 gap-3">
            {CLASSES.map((name) => (
              <Field key={name} orientation="horizontal">
                <Checkbox
                  id={`class-${name}`}
                  name="classes"
                  value={name}
                  defaultChecked={name === "pallet" || name === "forklift"}
                />
                <FieldLabel htmlFor={`class-${name}`}>{name}</FieldLabel>
              </Field>
            ))}
          </FieldGroup>
        </CardContent>
        <CardFooter className="gap-3">
          <Button type="submit">Save classes</Button>
          {submitted && (
            <span className="min-w-0 truncate font-mono text-muted-foreground">
              classes = [{submitted.join(", ")}]
            </span>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
