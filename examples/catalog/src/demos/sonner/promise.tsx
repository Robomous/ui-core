import { Button, toast } from "@robomous/ui-core";

function exportBatch() {
  return new Promise<string>((resolve) => setTimeout(() => resolve("940 frames"), 1500));
}

/** `toast.promise` swaps a loading toast for a success or error one, decided by the promise it wraps. */
export default function ExportPromise() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.promise(exportBatch(), {
          loading: "Exporting batch-0041…",
          success: (frames) => `Exported ${frames} as COCO`,
          error: "Export failed",
        })
      }
    >
      Export batch
    </Button>
  );
}
