import { Textarea } from "@robomous/ui-core";

/** `aria-invalid` styles the invalid state; there is no separate invalid class to reach for. */
export default function Invalid() {
  return (
    <Textarea
      defaultValue="Too many frames reference a missing class."
      aria-invalid
      aria-label="Invalid textarea"
      className="max-w-sm"
    />
  );
}
