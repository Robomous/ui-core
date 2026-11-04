import { FilterParamsBar, type FilterDefinition } from "@robomous/ui-core";

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
  },
  {
    id: "model",
    label: "Model",
    options: [
      { value: "detector-v3.2", label: "detector-v3.2" },
      { value: "detector-v3.1", label: "detector-v3.1" },
      { value: "segmenter-v1.4", label: "segmenter-v1.4" },
    ],
  },
  {
    id: "node",
    label: "GPU node",
    options: [
      { value: "gpu-a10g-01", label: "gpu-a10g-01" },
      { value: "gpu-a10g-02", label: "gpu-a10g-02" },
      { value: "gpu-h100-01", label: "gpu-h100-01" },
    ],
  },
];

/** Left to itself: `defaultValues` sets the starting pills and `addLabel` renames the button. */
export default function Uncontrolled() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3 rounded-xl border p-4">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-medium">Run history</h3>
        <span className="text-muted-foreground">run-0405 to run-0421</span>
      </div>
      <FilterParamsBar
        filters={filters}
        defaultValues={{ model: "detector-v3.2", node: "gpu-a10g-01" }}
        addLabel="Filter runs"
      />
    </div>
  );
}
