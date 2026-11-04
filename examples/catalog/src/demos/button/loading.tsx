import { Button, Spinner } from "@robomous/ui-core";
import { useState } from "react";

/** While the request runs the label says so, the spinner takes the icon's slot and the button holds still. */
export default function Loading() {
  const [pending, setPending] = useState(false);
  return (
    <div className="flex w-full max-w-sm items-center gap-3 rounded-lg border p-3">
      <img
        src="/assets/frames/aisle.svg"
        alt=""
        loading="lazy"
        className="size-10 shrink-0 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="font-medium">detector-v3.2</span>
        <span className="truncate text-muted-foreground tabular-nums">
          {pending ? "Converting weights…" : "ONNX · fp16 · 48 MB"}
        </span>
      </div>
      <Button
        className="min-w-28"
        disabled={pending}
        onClick={() => {
          setPending(true);
          setTimeout(() => setPending(false), 1800);
        }}
      >
        {pending ? <Spinner data-icon="inline-start" /> : null}
        {pending ? "Exporting…" : "Export ONNX"}
      </Button>
    </div>
  );
}
