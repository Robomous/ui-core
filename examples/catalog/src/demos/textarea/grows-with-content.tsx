import { useState } from "react";
import { Field, FieldDescription, FieldLabel, Textarea } from "@robomous/ui-core";

/** `field-sizing-content` grows the box with what is typed, instead of scrolling inside a fixed height. */
export default function GrowsWithContent() {
  const [value, setValue] = useState(
    "rb-07 Atlas stopped in aisle 14 at 09:14.\nLidar lens was dusty; cleaned and recalibrated.\nBack on the mission queue at 09:40.",
  );
  const lines = value.split("\n").length;

  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="ta-log">Maintenance log</FieldLabel>
      <Textarea
        id="ta-log"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-describedby="ta-log-hint"
      />
      <FieldDescription id="ta-log-hint" className="flex justify-between gap-2">
        <span>Add lines and the box grows with them.</span>
        <span className="tabular-nums">
          {lines} {lines === 1 ? "line" : "lines"}
        </span>
      </FieldDescription>
    </Field>
  );
}
