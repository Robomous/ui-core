import { Badge } from "@robomous/ui-core";

/** `asChild` hands the classes to an anchor: it stays a link, and the badge gains hover and focus styles. */
export default function AsLink() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
        <img
          src="/assets/frames/aisle-2.svg"
          alt="Frame 0417 from cam-a12: two workers and a forklift in a racking aisle"
          loading="lazy"
          className="size-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <div className="absolute top-[39.9%] left-[41.6%] h-[23.2%] w-[5.3%] rounded-sm border-2 border-info" />
        <div className="absolute top-[40.1%] left-[49.6%] h-[13.1%] w-[2.9%] rounded-sm border-2 border-info" />
        <div className="absolute top-[37.4%] left-[49.1%] h-[10.8%] w-[3.1%] rounded-sm border-2 border-warning" />
      </div>
      <div className="flex items-baseline justify-between">
        <span className="font-medium">Frame 0417</span>
        <span className="text-muted-foreground tabular-nums">cam-a12 · 3 labels</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Badge asChild variant="secondary">
          <a href="#aisle">aisle</a>
        </Badge>
        <Badge asChild variant="secondary">
          <a href="#person">person</a>
        </Badge>
        <Badge asChild variant="secondary">
          <a href="#forklift">forklift</a>
        </Badge>
        <Badge asChild variant="outline">
          <a href="#all-labels">all 14 labels</a>
        </Badge>
      </div>
    </div>
  );
}
