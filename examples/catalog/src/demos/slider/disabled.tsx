import { Slider } from "@robomous/ui-core";

/** Disabled: the thumb leaves the tab order and the whole control dims. */
export default function Disabled() {
  return <Slider aria-label="Locked threshold" defaultValue={[40]} disabled className="max-w-sm" />;
}
