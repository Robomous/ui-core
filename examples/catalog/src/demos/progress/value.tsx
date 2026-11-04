import { Progress } from "@robomous/ui-core";

/** A single bar with a visible label and value; Progress has no label of its own. */
export default function Value() {
  return (
    <div className="flex w-full max-w-sm items-start gap-3 rounded-xl border p-3">
      <img
        src="/assets/frames/conveyor.svg"
        alt=""
        loading="lazy"
        className="size-12 shrink-0 rounded-lg object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <div className="flex items-baseline justify-between gap-3">
          <span id="export-progress-label" className="font-medium">
            Exporting batch 0412
          </span>
          <span className="text-muted-foreground tabular-nums">62%</span>
        </div>
        <Progress value={62} aria-labelledby="export-progress-label" />
        <p className="text-muted-foreground tabular-nums">
          583 of 940 frames written to COCO JSON.
        </p>
      </div>
    </div>
  );
}
