import { Badge, FilterParamsBar, useFilterParams, type FilterDefinition } from "@robomous/ui-core";

const robots = [
  { id: "rb-04", name: "Nova", site: "mty", state: "docked", battery: 100 },
  { id: "rb-07", name: "Atlas", site: "mty", state: "on-mission", battery: 82 },
  { id: "rb-12", name: "Kestrel", site: "gdl", state: "on-mission", battery: 64 },
  { id: "rb-15", name: "Vega", site: "qro", state: "charging", battery: 38 },
  { id: "rb-19", name: "Orca", site: "ldo", state: "docked", battery: 91 },
];

const filters: FilterDefinition[] = [
  {
    id: "site",
    label: "Site",
    options: [
      { value: "mty", label: "Monterrey DC-2" },
      { value: "gdl", label: "Guadalajara DC-1" },
      { value: "ldo", label: "Laredo Cross-dock" },
      { value: "qro", label: "Querétaro Hub" },
    ],
  },
  {
    id: "state",
    label: "State",
    options: [
      { value: "docked", label: "Docked" },
      { value: "on-mission", label: "On mission" },
      { value: "charging", label: "Charging" },
    ],
  },
];

/** `useFilterParams` keeps the bar in the URL: refresh or share the page and the filters stay. */
export default function Url() {
  const [values, setValues] = useFilterParams(["site", "state"]);
  const shown = robots.filter(
    (robot) =>
      (!values.site || robot.site === values.site) &&
      (!values.state || robot.state === values.state),
  );

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border">
      <div className="flex flex-col gap-3 border-b p-4">
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm font-medium">Fleet</h3>
          <span className="text-muted-foreground tabular-nums">
            {shown.length} of {robots.length} robots
          </span>
        </div>
        <FilterParamsBar filters={filters} values={values} onValuesChange={setValues} />
      </div>
      <ul className="flex flex-col divide-y">
        {shown.map((robot) => (
          <li key={robot.id} className="flex items-center gap-3 px-4 py-2.5">
            <span className="font-mono text-muted-foreground">{robot.id}</span>
            <span className="font-medium">{robot.name}</span>
            <span className="ml-auto text-muted-foreground tabular-nums">{robot.battery}%</span>
            <Badge variant={robot.state === "on-mission" ? "info" : "quiet"} className="w-20">
              {robot.state}
            </Badge>
          </li>
        ))}
        {shown.length === 0 && (
          <li className="px-4 py-8 text-center text-muted-foreground">No robots match.</li>
        )}
      </ul>
    </div>
  );
}
