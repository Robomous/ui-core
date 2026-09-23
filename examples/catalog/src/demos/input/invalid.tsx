import { Input } from "@robomous/ui-core";

/** `aria-invalid` styles the invalid state; there is no separate invalid class to reach for. */
export default function Invalid() {
  return (
    <Input
      defaultValue="not-a-camera-id"
      aria-invalid
      aria-label="Invalid camera ID"
      className="max-w-sm"
    />
  );
}
