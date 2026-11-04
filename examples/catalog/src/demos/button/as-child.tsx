import { Button } from "@robomous/ui-core";
import { ExternalLinkIcon } from "@robomous/ui-core/icons";

/** `asChild` hands the classes to the child, so a link looks like a button and stays a link. */
export default function AsChild() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-xl border p-1.5">
      <img
        src="/assets/frames/aisle-3.svg"
        alt="A wide-angle camera view down a racking aisle, with a worker in the foreground"
        loading="lazy"
        className="aspect-[9/4] w-full rounded-lg object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
      />
      <div className="flex flex-col gap-3 px-2 pb-2">
        <div className="flex flex-col gap-0.5">
          <span className="font-medium text-balance">Calibrate your cameras</span>
          <span className="text-pretty text-muted-foreground">
            Intrinsics and extrinsics, step by step, with a checkerboard.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild size="sm">
            <a href="/components">Open the guide</a>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href="https://robomous.ai" target="_blank" rel="noreferrer">
              Read the docs
              <ExternalLinkIcon data-icon="inline-end" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
