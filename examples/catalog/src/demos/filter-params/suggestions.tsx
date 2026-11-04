import {
  Badge,
  FilterParamsBar,
  type FilterDefinition,
  type FilterValues,
} from "@robomous/ui-core";
import { useState } from "react";

const FRAMES = [
  {
    id: "cam-b07",
    where: "Dock A",
    site: "mty",
    state: "online",
    image: "/assets/frames/dock.svg",
  },
  {
    id: "cam-a12",
    where: "Aisle 14",
    site: "mty",
    state: "online",
    image: "/assets/frames/aisle.svg",
  },
  {
    id: "cam-c03",
    where: "Sorting line",
    site: "mty",
    state: "offline",
    image: "/assets/frames/conveyor.svg",
  },
  {
    id: "cam-g03",
    where: "Rack row 6",
    site: "gdl",
    state: "online",
    image: "/assets/frames/aisle-3.svg",
  },
  {
    id: "cam-g05",
    where: "Dock C",
    site: "gdl",
    state: "offline",
    image: "/assets/frames/dock-2.svg",
  },
  {
    id: "cam-q01",
    where: "Truck yard",
    site: "qro",
    state: "online",
    image: "/assets/frames/yard.svg",
  },
];

const filters: FilterDefinition[] = [
  {
    id: "site",
    label: "Site",
    options: [
      { value: "mty", label: "Monterrey DC-2" },
      { value: "gdl", label: "Guadalajara Hub" },
      { value: "qro", label: "Querétaro Hub" },
    ],
  },
  {
    id: "state",
    label: "Stream",
    options: [
      { value: "online", label: "Online" },
      { value: "offline", label: "Offline" },
    ],
    suggestion: "offline",
  },
];

/** A `suggestion` draws a dashed pill for a useful starting value; it applies only when pressed. */
export default function Suggestions() {
  const [values, setValues] = useState<FilterValues>({ site: "mty" });
  const shown = FRAMES.filter(
    (frame) =>
      (!values.site || frame.site === values.site) &&
      (!values.state || frame.state === values.state),
  );

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border">
      <div className="border-b p-4">
        <FilterParamsBar filters={filters} values={values} onValuesChange={setValues} />
      </div>
      {shown.length > 0 ? (
        <ul className="grid grid-cols-3 gap-3 p-4">
          {shown.map((frame) => (
            <li key={frame.id} className="flex flex-col gap-1.5">
              <img
                src={frame.image}
                alt={`Latest frame from ${frame.id}, ${frame.where}`}
                loading="lazy"
                className={`aspect-[3/2] w-full rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10 ${frame.state === "offline" ? "opacity-50 grayscale" : ""}`}
              />
              <span className="flex items-center justify-between gap-1">
                <span className="truncate font-mono">{frame.id}</span>
                <Badge variant={frame.state === "online" ? "success" : "destructive"}>
                  {frame.state}
                </Badge>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-4 py-8 text-center text-muted-foreground">No streams match.</p>
      )}
    </div>
  );
}
