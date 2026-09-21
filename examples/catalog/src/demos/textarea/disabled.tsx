import { Textarea } from "@robomous/ui-core";

/** Disabled keeps the arrow cursor; nothing will respond to focus or input. */
export default function Disabled() {
  return (
    <Textarea
      defaultValue="Frozen after the last export."
      disabled
      aria-label="Disabled textarea"
      className="max-w-sm"
    />
  );
}
