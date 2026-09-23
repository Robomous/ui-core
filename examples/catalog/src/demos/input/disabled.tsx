import { Input } from "@robomous/ui-core";

/** Disabled keeps the arrow cursor and drops the opacity; nothing will respond to focus or input. */
export default function Disabled() {
  return (
    <Input
      defaultValue="rk_live_...revoked"
      disabled
      aria-label="Disabled input"
      className="max-w-sm"
    />
  );
}
