import {
  Badge,
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@robomous/ui-core";
import { useState } from "react";

const SITES = ["Monterrey DC-2", "Guadalajara DC-1", "Laredo Cross-dock", "Querétaro Hub"];

const ROBOTS = [
  { id: "rb-04", name: "Nova", site: "Monterrey DC-2", state: "docked", battery: 100 },
  { id: "rb-07", name: "Atlas", site: "Monterrey DC-2", state: "on mission", battery: 82 },
  { id: "rb-12", name: "Kestrel", site: "Guadalajara DC-1", state: "on mission", battery: 64 },
  { id: "rb-15", name: "Vega", site: "Querétaro Hub", state: "charging", battery: 38 },
  { id: "rb-19", name: "Orca", site: "Laredo Cross-dock", state: "docked", battery: 91 },
];

/** With `value` and `onValueChange` the selection lives in your state, and the list beside it follows. */
export default function Controlled() {
  const [site, setSite] = useState<string | null>("Monterrey DC-2");
  const shown = site ? ROBOTS.filter((robot) => robot.site === site) : ROBOTS;

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Combobox items={SITES} value={site} onValueChange={setSite}>
        <ComboboxInput showClear placeholder="All sites" aria-label="Site" />
        <ComboboxContent>
          <ComboboxEmpty>No matching sites</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <p className="text-muted-foreground tabular-nums">
        {shown.length} {shown.length === 1 ? "robot" : "robots"}
        {site ? ` at ${site}` : " across all sites"}
      </p>
      <ul className="flex flex-col divide-y rounded-lg border">
        {shown.map((robot) => (
          <li key={robot.id} className="flex items-center gap-3 px-3 py-2">
            <span className="font-mono text-muted-foreground">{robot.id}</span>
            <span className="font-medium">{robot.name}</span>
            <span className="ml-auto text-muted-foreground tabular-nums">{robot.battery}%</span>
            <Badge variant={robot.state === "on mission" ? "info" : "quiet"} className="w-20">
              {robot.state}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}
