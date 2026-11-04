import { Badge, Kbd, KbdGroup, SearchInput } from "@robomous/ui-core";
import { useState } from "react";

const robots = [
  { id: "rb-07", name: "Atlas", site: "Monterrey DC-2", battery: 82 },
  { id: "rb-12", name: "Kestrel", site: "Guadalajara DC-1", battery: 64 },
  { id: "rb-19", name: "Orca", site: "Laredo Cross-dock", battery: 37 },
];

/** Press ⌘K (Ctrl+K elsewhere) anywhere on the page to focus the field; the keys show while it is empty. */
export default function Shortcut() {
  const [query, setQuery] = useState("");
  const shown = robots.filter((robot) =>
    `${robot.id} ${robot.name} ${robot.site}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Fleet</h3>
        <Badge variant="secondary" className="tabular-nums">
          24 robots
        </Badge>
      </div>
      <SearchInput
        shortcut
        value={query}
        onValueChange={setQuery}
        aria-label="Search robots"
        placeholder="Search robots…"
      />
      <ul className="flex flex-col divide-y rounded-lg border">
        {shown.map((robot) => (
          <li key={robot.id} className="flex items-center gap-3 px-3 py-2">
            <span className="font-mono">{robot.id}</span>
            <span className="font-medium">{robot.name}</span>
            <span className="truncate text-muted-foreground">{robot.site}</span>
            <span className="ml-auto text-muted-foreground tabular-nums">{robot.battery}%</span>
          </li>
        ))}
        {shown.length === 0 && (
          <li className="px-3 py-6 text-center text-muted-foreground">No robots match.</li>
        )}
      </ul>
      <p className="flex items-center gap-1.5 text-muted-foreground">
        Press{" "}
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>{" "}
        from anywhere on the page.
      </p>
    </div>
  );
}
