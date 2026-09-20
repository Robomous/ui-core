import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@robomous/ui-core";

/** A listbox behind a button, closed until the trigger is pressed. */
export default function Default() {
  return (
    <Select defaultValue="base">
      <SelectTrigger className="w-56" aria-label="Model">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="tiny">org/detector-tiny</SelectItem>
        <SelectItem value="base">org/detector-base</SelectItem>
        <SelectItem value="large">org/detector-large</SelectItem>
      </SelectContent>
    </Select>
  );
}
