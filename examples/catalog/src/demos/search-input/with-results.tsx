import { Badge, SearchInput } from "@robomous/ui-core";
import { useState } from "react";

const still = (name: string) => `/assets/frames/${name}.svg`;

const cameras = [
  { id: "cam-b07", name: "Dock A", online: true, image: still("dock") },
  { id: "cam-a12", name: "Aisle 14", online: true, image: still("aisle") },
  { id: "cam-c03", name: "Sorting line", online: true, image: still("conveyor") },
  { id: "cam-f02", name: "Bay B11", online: false, image: still("floor") },
  { id: "cam-a09", name: "Cold storage", online: false, image: still("aisle-night") },
];

/** Controlled with `value` and `onValueChange`, filtering a list as the reader types and announcing the count. */
export default function WithResults() {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const shown = cameras.filter((camera) =>
    `${camera.id} ${camera.name}`.toLowerCase().includes(needle),
  );

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <SearchInput
        value={query}
        onValueChange={setQuery}
        aria-label="Search cameras"
        placeholder="Search cameras…"
      />
      <p role="status" className="text-muted-foreground tabular-nums">
        {shown.length} of {cameras.length} cameras
      </p>
      <ul className="flex flex-col gap-1 rounded-lg border p-1">
        {shown.map((camera) => (
          <li key={camera.id} className="flex items-center gap-3 rounded-md p-1.5">
            <img
              src={camera.image}
              alt=""
              width={64}
              height={36}
              loading="lazy"
              className={`aspect-video w-16 shrink-0 rounded-sm object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10 ${camera.online ? "" : "opacity-50 grayscale"}`}
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="font-medium">{camera.name}</span>
              <span className="font-mono text-muted-foreground">{camera.id}</span>
            </div>
            <Badge variant={camera.online ? "success" : "secondary"}>
              {camera.online ? "Online" : "Offline"}
            </Badge>
          </li>
        ))}
        {shown.length === 0 && (
          <li className="px-3 py-6 text-center text-muted-foreground">No cameras match.</li>
        )}
      </ul>
    </div>
  );
}
