import { Badge, Button, ButtonGroup, ButtonGroupText } from "@robomous/ui-core";
import { ChevronLeftIcon, ChevronRightIcon, VideoIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

const TOTAL_FRAMES = 480;

/** A frame stepper for video review: two icon buttons welded around a read-only counter. */
export default function Overview() {
  const [frame, setFrame] = useState(142);

  return (
    <div className="flex w-full max-w-sm flex-col gap-2 rounded-xl border p-2">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
        <img
          src="/assets/frames/aisle.svg"
          alt="Camera frame of a racking aisle with a forklift and a worker in a yellow vest"
          className="size-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <div className="absolute top-[36.2%] left-[51%] h-[15.1%] w-[4.2%] rounded-sm border-2 border-warning">
          <span className="absolute -top-px left-0 -translate-y-full rounded-t-sm bg-warning px-1 text-[0.625rem] whitespace-nowrap text-background tabular-nums">
            forklift 0.94
          </span>
        </div>
        <div className="absolute top-[40%] left-[56.5%] h-[17.2%] w-[3.9%] rounded-sm border-2 border-info">
          <span className="absolute -bottom-px left-0 translate-y-full rounded-b-sm bg-info px-1 text-[0.625rem] whitespace-nowrap text-background tabular-nums">
            person 0.88
          </span>
        </div>
        <Badge variant="secondary" className="absolute bottom-2 left-2">
          <VideoIcon data-icon="inline-start" />
          cam-a12 · Aisle 14
        </Badge>
      </div>
      <div className="flex items-center justify-between gap-3 px-1 pb-1">
        <span className="text-muted-foreground tabular-nums">
          {(frame / 30).toFixed(2).padStart(5, "0")} s
        </span>
        <ButtonGroup aria-label="Frame stepper">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous frame"
            disabled={frame === 1}
            onClick={() => setFrame((current) => current - 1)}
          >
            <ChevronLeftIcon />
          </Button>
          <ButtonGroupText className="tabular-nums">
            Frame {frame} / {TOTAL_FRAMES}
          </ButtonGroupText>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next frame"
            disabled={frame === TOTAL_FRAMES}
            onClick={() => setFrame((current) => current + 1)}
          >
            <ChevronRightIcon />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
