import { Label, Slider } from "@robomous/ui-core";

/** Disabled: the thumb leaves the tab order and the whole control dims. */
export default function Disabled() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-xl border p-5">
      <div className="flex items-center justify-between">
        <Label id="sampling-label">Frame sampling</Label>
        <span className="font-medium tabular-nums">12 fps</span>
      </div>
      <Slider aria-labelledby="sampling-label" defaultValue={[12]} min={1} max={30} disabled />
      <p className="text-muted-foreground">Set by the camera profile on cam-02, Aisle 14.</p>
    </div>
  );
}
