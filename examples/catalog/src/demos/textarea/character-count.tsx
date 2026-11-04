import { useState } from "react";
import { Field, FieldDescription, FieldLabel, Textarea } from "@robomous/ui-core";

const LIMIT = 280;

/** A limit is `maxLength` on the control plus a live count beside the hint, so the reader sees it coming. */
export default function CharacterCount() {
  const [value, setValue] = useState(
    "Retrained on the Q3 shelf set with 4,100 new damaged-box frames. Fewer false positives on reflective packaging, and recall on forklift is up two points. Pallet edge cases still need work.",
  );
  const nearLimit = LIMIT - value.length <= 20;

  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="ta-summary">Release summary</FieldLabel>
      <Textarea
        id="ta-summary"
        value={value}
        maxLength={LIMIT}
        onChange={(event) => setValue(event.target.value)}
        placeholder="What changed in this version?"
        aria-describedby="ta-summary-hint"
      />
      <FieldDescription id="ta-summary-hint" className="flex justify-between gap-2">
        <span>Shown on the model card.</span>
        <span className={nearLimit ? "text-warning tabular-nums" : "tabular-nums"}>
          {value.length}/{LIMIT}
        </span>
      </FieldDescription>
    </Field>
  );
}
