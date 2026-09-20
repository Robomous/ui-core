import { Label, Input } from "@robomous/ui-core";

/** A label paired with the control it names via `htmlFor`/`id`. */
export default function Default() {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="lbl-camera">Camera ID</Label>
      <Input id="lbl-camera" placeholder="cam-004" className="w-48" />
    </div>
  );
}
