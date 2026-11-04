import { Button, LoadingDots, Skeleton, Spinner } from "@robomous/ui-core";

/** Three waits, three treatments: content not here yet is a Skeleton, background work is LoadingDots, and an action in flight is a disabled button that says what it is doing. */
export default function Loading() {
  return (
    <div className="flex w-full max-w-sm flex-col rounded-xl border" aria-busy="true">
      <div className="flex items-center justify-between gap-4 border-b px-5 py-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">detector-v3.2</span>
          <LoadingDots className="text-muted-foreground">Computing metrics</LoadingDots>
        </div>
        <Button disabled>
          <Spinner data-icon="inline-start" />
          Exporting…
        </Button>
      </div>
      <dl className="grid grid-cols-3 gap-4 px-5 py-4">
        {["Precision", "Recall", "mAP@50"].map((metric) => (
          <div key={metric} className="flex flex-col gap-1.5">
            <dt className="text-muted-foreground">{metric}</dt>
            <dd>
              <Skeleton className="h-4 w-12" />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
