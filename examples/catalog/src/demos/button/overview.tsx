import { Badge, Button } from "@robomous/ui-core";
import { EllipsisIcon, GitCompareIcon, RocketIcon } from "@robomous/ui-core/icons";

/** A release bar: one primary action, a secondary one, and the rest behind an icon. */
export default function Overview() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3 rounded-xl border p-1.5">
      <div className="relative aspect-[21/9] overflow-hidden rounded-lg bg-muted">
        <img
          src="/assets/frames/aisle.svg"
          alt="Frame from cam-a12: a forklift and a worker in a yellow vest in a racking aisle"
          className="size-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <div className="absolute top-[31.9%] left-[51%] h-[19.8%] w-[4.2%] rounded-sm border-2 border-warning">
          <span className="absolute -top-px left-0 -translate-y-full rounded-t-sm bg-warning px-1 text-[0.625rem] whitespace-nowrap text-background tabular-nums">
            forklift 0.93
          </span>
        </div>
        <div className="absolute top-[36.9%] left-[56.5%] h-[22.6%] w-[3.9%] rounded-sm border-2 border-info">
          <span className="absolute -bottom-px left-0 translate-y-full rounded-b-sm bg-info px-1 text-[0.625rem] whitespace-nowrap text-background tabular-nums">
            person 0.97
          </span>
        </div>
        <Badge variant="secondary" className="absolute bottom-2 left-2">
          Validated on cam-a12 · Aisle 14
        </Badge>
      </div>
      <div className="flex items-center justify-between gap-4 px-2 pb-1.5">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">detector-v3.2</span>
          <span className="text-muted-foreground tabular-nums">
            mAP 0.71 · +2.3% over production
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon" aria-label="More actions">
            <EllipsisIcon />
          </Button>
          <Button variant="outline">
            <GitCompareIcon data-icon="inline-start" />
            Compare
          </Button>
          <Button>
            <RocketIcon data-icon="inline-start" />
            Deploy
          </Button>
        </div>
      </div>
    </div>
  );
}
