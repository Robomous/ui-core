import {
  Badge,
  FilterParamsBar,
  type FilterDefinition,
  type FilterValues,
} from "@robomous/ui-core";
import { useState } from "react";

const RUNS = [
  { id: "run-0419", model: "detector-v3.3-rc", status: "running", epoch: "42/60", map: "0.68" },
  { id: "run-0412", model: "detector-v3.2", status: "finished", epoch: "60/60", map: "0.71" },
  { id: "run-0408", model: "detector-v3.2", status: "diverged", epoch: "14/60", map: "0.12" },
  { id: "run-0405", model: "segmenter-v1.4", status: "finished", epoch: "80/80", map: "0.59" },
  { id: "run-0421", model: "detector-v3.1", status: "queued", epoch: "0/60", map: "n/a" },
];

const filters: FilterDefinition[] = [
  {
    id: "status",
    label: "Status",
    options: [
      { value: "running", label: "Running" },
      { value: "finished", label: "Finished" },
      { value: "diverged", label: "Diverged" },
      { value: "queued", label: "Queued" },
    ],
    suggestion: "diverged",
  },
  {
    id: "model",
    label: "Model",
    options: [
      { value: "detector-v3.3-rc", label: "detector-v3.3-rc" },
      { value: "detector-v3.2", label: "detector-v3.2" },
      { value: "detector-v3.1", label: "detector-v3.1" },
      { value: "segmenter-v1.4", label: "segmenter-v1.4" },
    ],
  },
];

const tone = {
  running: "info",
  finished: "success",
  diverged: "destructive",
  queued: "quiet",
} as const;

/** The bar owns the constraints, the page owns the data: filter the rows from `values`. */
export default function Overview() {
  const [values, setValues] = useState<FilterValues>({ model: "detector-v3.2" });
  const shown = RUNS.filter(
    (run) =>
      (!values.status || run.status === values.status) &&
      (!values.model || run.model === values.model),
  );

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-xl border">
      <div className="flex flex-col gap-3 border-b p-4">
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm font-medium">Training runs</h3>
          <span className="text-muted-foreground tabular-nums">
            {shown.length} of {RUNS.length}
          </span>
        </div>
        <FilterParamsBar filters={filters} values={values} onValuesChange={setValues} />
      </div>
      <ul className="flex flex-col divide-y">
        {shown.map((run) => (
          <li key={run.id} className="flex items-center gap-3 px-4 py-2.5">
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="font-mono font-medium">{run.id}</span>
              <span className="truncate text-muted-foreground">{run.model}</span>
            </span>
            <span className="ml-auto flex flex-col items-end gap-0.5 text-muted-foreground tabular-nums">
              <span>mAP {run.map}</span>
              <span>epoch {run.epoch}</span>
            </span>
            <Badge variant={tone[run.status as keyof typeof tone]} className="w-[4.5rem]">
              {run.status}
            </Badge>
          </li>
        ))}
        {shown.length === 0 && (
          <li className="px-4 py-8 text-center text-muted-foreground">
            No runs match these filters.
          </li>
        )}
      </ul>
    </div>
  );
}
