import { Slider } from "@robomous/ui-core";

/** One thumb, named through `aria-label`, which the component puts on the thumb itself. */
export default function Default() {
  return (
    <Slider aria-label="Confidence threshold" defaultValue={[60]} step={5} className="max-w-sm" />
  );
}
