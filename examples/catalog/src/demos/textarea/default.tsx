import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Field,
  FieldLabel,
  Textarea,
} from "@robomous/ui-core";

/** Empty, it is a `min-h-16` box with a placeholder that says what belongs inside; the action stays off until there is something to send. */
export default function Default() {
  const [notes, setNotes] = useState("");

  return (
    <div className="flex w-full max-w-sm items-start gap-3">
      <Avatar>
        <AvatarImage src="/assets/people/sofia-brennan.svg" alt="Sofia Brennan" />
        <AvatarFallback>SB</AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="ta-notes">Note for batch-0412</FieldLabel>
          <Textarea
            id="ta-notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Anything annotators should know about this batch?"
          />
        </Field>
        <Button disabled={notes.trim() === ""} className="self-end">
          Add note
        </Button>
      </div>
    </div>
  );
}
