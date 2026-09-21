import { ScrollArea, ScrollBar } from "@robomous/ui-core";

const models = ["detector-v3", "classifier-v2", "segmenter-v1", "tracker-v4", "pose-v2", "ocr-v1"];

/** A second ScrollBar with orientation="horizontal" tracks the viewport's x-axis instead of its default y-axis. */
export default function Horizontal() {
  return (
    <ScrollArea className="w-72 rounded-lg border whitespace-nowrap">
      <div className="flex gap-3 p-3">
        {models.map((model) => (
          <div
            key={model}
            className="shrink-0 rounded-md border bg-card px-3 py-2 font-mono text-xs"
          >
            {model}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
