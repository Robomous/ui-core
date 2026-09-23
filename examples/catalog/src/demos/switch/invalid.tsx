import { Label, Switch } from "@robomous/ui-core";

/** `aria-invalid` styles the destructive ring, as on every other control. */
export default function Invalid() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="switch-invalid" aria-invalid />
      <Label htmlFor="switch-invalid">Enable webhooks</Label>
    </div>
  );
}
