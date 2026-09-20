import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@robomous/ui-core";

/** Locked while an ingest job holds the batch; the trigger keeps the arrow cursor. */
export default function Disabled() {
  return (
    <Select defaultValue="front-left" disabled>
      <SelectTrigger className="w-56" aria-label="Camera">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="front-left">front-left</SelectItem>
        <SelectItem value="front-right">front-right</SelectItem>
      </SelectContent>
    </Select>
  );
}
