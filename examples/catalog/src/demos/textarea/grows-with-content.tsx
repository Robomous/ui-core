import { useState } from "react";
import { Textarea, Field, FieldLabel, FieldDescription } from "@robomous/ui-core";

/** `field-sizing-content` grows the box with what is typed, instead of scrolling inside a fixed height. */
export default function GrowsWithContent() {
  const [value, setValue] = useState(
    "Recording started at 09:14.\nTwo cameras dropped frames after the network switch was replaced.\nRe-ingest scheduled for tonight.",
  );

  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="ta-log">Incident log</FieldLabel>
      <Textarea
        id="ta-log"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-describedby="ta-log-hint"
      />
      <FieldDescription id="ta-log-hint">
        The box grows as you add lines; it never scrolls internally.
      </FieldDescription>
    </Field>
  );
}
