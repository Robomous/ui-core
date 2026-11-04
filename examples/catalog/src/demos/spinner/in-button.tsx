import { Button, Spinner } from "@robomous/ui-core";

/** There is no isPending prop: compose a Spinner into the Button and disable it yourself. */
export default function InButton() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border p-4">
      <div className="flex items-center gap-3">
        <img
          src="/assets/frames/floor.svg"
          alt=""
          loading="lazy"
          className="size-10 shrink-0 rounded-lg object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <div className="flex flex-col">
          <span className="font-medium">Deploy detector-v3.2</span>
          <span className="text-muted-foreground">Monterrey DC-2 · 8 cameras</span>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" disabled>
          Cancel
        </Button>
        <Button size="sm" disabled>
          <Spinner data-icon="inline-start" />
          Deploying
        </Button>
      </div>
    </div>
  );
}
