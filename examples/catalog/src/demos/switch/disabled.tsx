import { Label, Switch } from "@robomous/ui-core";

/** Disabled, on and off. */
export default function Disabled() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Switch id="switch-disabled-off" disabled />
        <Label htmlFor="switch-disabled-off">Public sharing</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="switch-disabled-on" disabled defaultChecked />
        <Label htmlFor="switch-disabled-on">Audit log</Label>
      </div>
    </div>
  );
}
