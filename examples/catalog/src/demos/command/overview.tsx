import {
  Badge,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@robomous/ui-core";
import { useState } from "react";

const ROBOTS = [
  { id: "rb-04", name: "Nova", site: "Monterrey DC-2", online: true },
  { id: "rb-07", name: "Atlas", site: "Monterrey DC-2", online: true },
  { id: "rb-12", name: "Kestrel", site: "Guadalajara DC-1", online: true },
  { id: "rb-15", name: "Vega", site: "Querétaro Hub", online: false },
  { id: "rb-19", name: "Orca", site: "Laredo Cross-dock", online: false },
];

/** Typing filters the list, arrows move the highlight, Enter selects; `keywords` lets a robot match by site. */
export default function Overview() {
  const [selected, setSelected] = useState<string | null>(null);
  const robot = ROBOTS.find((item) => item.id === selected);

  const renderGroup = (heading: string, online: boolean) => (
    <CommandGroup heading={heading}>
      {ROBOTS.filter((item) => item.online === online).map((item) => (
        <CommandItem
          key={item.id}
          value={item.id}
          keywords={[item.name, item.site]}
          data-checked={selected === item.id}
          onSelect={() => setSelected(item.id)}
        >
          <span className="font-mono text-muted-foreground">{item.id}</span>
          {item.name}
          <span className="flex-1 text-right text-muted-foreground group-data-[checked=true]/command-item:hidden">
            {item.site}
          </span>
        </CommandItem>
      ))}
    </CommandGroup>
  );

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Command className="ring-1 ring-foreground/10">
        <CommandInput placeholder="Find a robot or a site" aria-label="Find a robot or a site" />
        <CommandList>
          <CommandEmpty>No robot matches.</CommandEmpty>
          {renderGroup("Online", true)}
          {renderGroup("Offline", false)}
        </CommandList>
      </Command>
      <p className="flex items-center justify-center gap-2 text-muted-foreground">
        {robot ? (
          <>
            Selected <span className="font-mono">{robot.id}</span>
            <Badge variant={robot.online ? "success" : "quiet"}>
              {robot.online ? "Online" : "Offline"}
            </Badge>
          </>
        ) : (
          "Nothing selected yet."
        )}
      </p>
    </div>
  );
}
