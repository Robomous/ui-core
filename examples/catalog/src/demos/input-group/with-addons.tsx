import {
  Field,
  FieldDescription,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@robomous/ui-core";
import { SearchIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

/** An icon at `inline-start`, the control, and a button at `inline-end`; a click on the icon refocuses the input, and Enter submits as well as the button. */
export default function WithAddons() {
  const [submitted, setSubmitted] = useState("");

  return (
    <form
      className="w-full max-w-sm"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(String(new FormData(event.currentTarget).get("frame-query") ?? ""));
      }}
    >
      <Field>
        <FieldLabel htmlFor="ig-frames">Find frames</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            id="ig-frames"
            name="frame-query"
            placeholder="Class or frame ID"
            aria-describedby="ig-frames-hint"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton type="submit">Search</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription id="ig-frames-hint" role="status">
          {submitted
            ? `Showing frames that match “${submitted}”.`
            : "Try forklift or frame-004812 in pallet-detection."}
        </FieldDescription>
      </Field>
    </form>
  );
}
