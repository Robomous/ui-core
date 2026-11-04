import { Button, ButtonGroup } from "@robomous/ui-core";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, XIcon } from "@robomous/ui-core/icons";

/** A group of groups: the outer group puts a gap between the two, each inner one stays welded. */
export default function Nested() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2 rounded-xl border p-2">
      <div className="relative aspect-[2/1] overflow-hidden rounded-lg bg-muted">
        <img
          src="/assets/frames/conveyor.svg"
          alt="Overhead view of two sorting belts carrying parcels under a scanner gantry"
          loading="lazy"
          className="size-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <div className="absolute top-[30.4%] left-[33.7%] h-[17.5%] w-[8.8%] rounded-sm border-2 border-warning">
          <span className="absolute -top-px left-0 -translate-y-full rounded-t-sm bg-warning px-1 text-[0.625rem] whitespace-nowrap text-background tabular-nums">
            damaged-parcel 0.81
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 pl-1">
        <span className="pl-1 text-muted-foreground tabular-nums">Annotation 14 / 32</span>
        <ButtonGroup>
          <ButtonGroup>
            <Button variant="outline" size="icon" aria-label="Previous annotation">
              <ArrowLeftIcon />
            </Button>
            <Button variant="outline" size="icon" aria-label="Next annotation">
              <ArrowRightIcon />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline">
              <XIcon data-icon="inline-start" />
              Reject
            </Button>
            <Button variant="outline">
              <CheckIcon data-icon="inline-start" />
              Accept
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </div>
    </div>
  );
}
