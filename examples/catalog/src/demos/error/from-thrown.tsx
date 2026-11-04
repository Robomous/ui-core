import { Button, ErrorMessage } from "@robomous/ui-core";
import { DownloadIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

async function exportBatch() {
  await new Promise((resolve) => setTimeout(resolve, 600));
  throw new Error("Couldn't export batch 0412. The bucket rejected the upload.");
}

/** `error` accepts a thrown `Error` as is, so a catch block can hand it straight over. */
export default function FromThrown() {
  const [error, setError] = useState<Error | null>(null);

  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <img
          src="/assets/frames/conveyor-2.svg"
          alt=""
          loading="lazy"
          className="size-10 shrink-0 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="font-mono font-medium">batch-0412</span>
          <span className="text-muted-foreground tabular-nums">940 frames · 38 MB</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setError(null);
            exportBatch().catch(setError);
          }}
        >
          <DownloadIcon data-icon="inline-start" />
          Export
        </Button>
      </div>
      {error ? <ErrorMessage error={error} /> : null}
    </div>
  );
}
