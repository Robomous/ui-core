import { Badge, Button, ButtonGroup } from "@robomous/ui-core";
import { HouseIcon, PauseIcon, StethoscopeIcon } from "@robomous/ui-core/icons";

/** `orientation="vertical"` stacks the segments and rounds the top and bottom instead of the ends. */
export default function Vertical() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3 rounded-xl border p-1.5">
      <div className="relative aspect-[16/7] overflow-hidden rounded-lg bg-muted">
        <img
          src="/assets/frames/aisle-3.svg"
          alt="rb-07's camera: a racking aisle with a worker in a yellow vest ahead"
          loading="lazy"
          className="size-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <Badge variant="info" className="absolute top-2 right-2">
          On mission
        </Badge>
      </div>
      <div className="flex flex-col gap-3 px-1.5 pb-1.5">
        <div className="flex items-center gap-3">
          <img
            src="/assets/robots/atlas.svg"
            alt=""
            loading="lazy"
            className="size-10 shrink-0 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
          />
          <div className="flex flex-col gap-0.5">
            <span className="font-medium">rb-07 Atlas</span>
            <span className="text-muted-foreground tabular-nums">Monterrey DC-2 · battery 82%</span>
          </div>
        </div>
        <ButtonGroup orientation="vertical" className="w-full" aria-label="Robot controls">
          <Button variant="outline" className="justify-start">
            <PauseIcon data-icon="inline-start" />
            Pause mission
          </Button>
          <Button variant="outline" className="justify-start">
            <HouseIcon data-icon="inline-start" />
            Return to dock
          </Button>
          <Button variant="outline" className="justify-start">
            <StethoscopeIcon data-icon="inline-start" />
            Run diagnostics
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
