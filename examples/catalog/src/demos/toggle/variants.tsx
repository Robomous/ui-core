import { Toggle } from "@robomous/ui-core";
import { BoldIcon } from "@robomous/ui-core/icons";

/** `aria-pressed` is the state, not a class; `outline` adds a border for a track-free toolbar. */
export default function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle aria-label="Bold">
        <BoldIcon />
      </Toggle>
      <Toggle defaultPressed aria-label="Bold, pressed">
        <BoldIcon />
      </Toggle>
      <Toggle variant="outline" aria-label="Bold, outline">
        <BoldIcon />
      </Toggle>
    </div>
  );
}
