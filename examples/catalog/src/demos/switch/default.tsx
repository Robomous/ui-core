import { Label, Switch } from "@robomous/ui-core";

/** A setting that applies the moment it is flipped. Its state is `aria-checked` on `role="switch"`. */
export default function Default() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="auto-save" defaultChecked />
      <Label htmlFor="auto-save">Auto-save annotations</Label>
    </div>
  );
}
