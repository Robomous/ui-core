import { Slider } from "@robomous/ui-core";

/** `orientation="vertical"`; the arrows follow it, Up raising the value. */
export default function Vertical() {
  return (
    <div className="flex h-40 gap-8">
      <Slider aria-label="Brightness" orientation="vertical" defaultValue={[70]} />
      <Slider aria-label="Contrast" orientation="vertical" defaultValue={[30, 60]} />
    </div>
  );
}
