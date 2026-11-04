import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@robomous/ui-core";

const CAMERAS = [
  { value: "b07", label: "cam-b07 · Dock A" },
  { value: "02", label: "cam-02 · Aisle 14" },
  { value: "11", label: "cam-11 · Loading bay" },
];

/** `item-aligned` (the default) lays the list over the trigger; `popper` opens it below, like a menu. */
export default function Position() {
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-6">
      <div className="flex flex-col gap-2">
        <code className="text-muted-foreground">item-aligned</code>
        <Select defaultValue="02">
          <SelectTrigger className="w-full" aria-label="Camera, aligned to the selected item">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CAMERAS.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <code className="text-muted-foreground">popper</code>
        <Select defaultValue="02">
          <SelectTrigger className="w-full" aria-label="Camera, opening below the trigger">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper" align="start">
            {CAMERAS.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
