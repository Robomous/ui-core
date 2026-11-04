import { Badge, Checkbox, Label, Separator } from "@robomous/ui-core";
import { useState } from "react";

const robots = [
  { id: "rb-07", name: "Atlas", site: "Monterrey DC-2", battery: 82, online: true },
  { id: "rb-12", name: "Kestrel", site: "Guadalajara DC-1", battery: 64, online: true },
  { id: "rb-19", name: "Orca", site: "Laredo Cross-dock", battery: 11, online: false },
];

/** A select-all reads `aria-checked="mixed"` while only some of its rows are chosen. */
export default function Indeterminate() {
  const [chosen, setChosen] = useState<string[]>(["rb-07"]);
  const all = chosen.length === robots.length ? true : chosen.length > 0 ? "indeterminate" : false;

  return (
    <div className="w-full max-w-sm rounded-xl border">
      <div className="flex items-center gap-3 px-4 py-3">
        <Checkbox
          id="select-all-robots"
          checked={all}
          onCheckedChange={(checked) => setChosen(checked === true ? robots.map((r) => r.id) : [])}
        />
        <Label htmlFor="select-all-robots">All robots</Label>
        <span className="ml-auto text-muted-foreground tabular-nums">
          {chosen.length} of {robots.length} selected
        </span>
      </div>
      <Separator />
      <ul className="flex flex-col gap-1 p-2">
        {robots.map((robot) => (
          <li key={robot.id}>
            <Label
              htmlFor={robot.id}
              className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted"
            >
              <Checkbox
                id={robot.id}
                checked={chosen.includes(robot.id)}
                onCheckedChange={(checked) =>
                  setChosen((current) =>
                    checked === true
                      ? [...current, robot.id]
                      : current.filter((id) => id !== robot.id),
                  )
                }
              />
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="font-medium">
                  {robot.name} <span className="font-mono text-muted-foreground">{robot.id}</span>
                </span>
                <span className="truncate font-normal text-muted-foreground">{robot.site}</span>
              </span>
              <span className="ml-auto text-muted-foreground tabular-nums">{robot.battery}%</span>
              <Badge variant={robot.online ? "success" : "quiet"}>
                {robot.online ? "Online" : "Offline"}
              </Badge>
            </Label>
          </li>
        ))}
      </ul>
    </div>
  );
}
