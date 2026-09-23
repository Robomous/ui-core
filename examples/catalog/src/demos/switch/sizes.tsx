import { Label, Switch } from "@robomous/ui-core";

/** `size`: `default` and `sm`, carried as `data-size` so the thumb sizes to the track. */
export default function Sizes() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Switch id="switch-default" />
        <Label htmlFor="switch-default">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="switch-sm" size="sm" />
        <Label htmlFor="switch-sm">Small</Label>
      </div>
    </div>
  );
}
