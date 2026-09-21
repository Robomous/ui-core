import { Toggle } from "@robomous/ui-core";
import { BoldIcon } from "lucide-react";

/** Disabled keeps the arrow cursor: nothing will respond to a press. */
export default function Disabled() {
  return (
    <Toggle disabled aria-label="Bold, disabled">
      <BoldIcon />
    </Toggle>
  );
}
