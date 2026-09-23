import { Toggle } from "@robomous/ui-core";
import { BoldIcon } from "@robomous/ui-core/icons";

/** Three heights, matched to the buttons and inputs that sit beside a Toggle. */
export default function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle size="sm" aria-label="Bold, small">
        <BoldIcon />
      </Toggle>
      <Toggle aria-label="Bold">
        <BoldIcon />
      </Toggle>
      <Toggle size="lg" aria-label="Bold, large">
        <BoldIcon />
      </Toggle>
    </div>
  );
}
