import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  toast,
} from "@robomous/ui-core";

function exportBatch() {
  return new Promise<string>((resolve) => setTimeout(() => resolve("940 frames"), 1500));
}

/** `toast.promise` swaps a loading toast for a success or error one, decided by the promise it wraps. */
export default function ExportPromise() {
  return (
    <Item variant="outline" className="w-full max-w-md">
      <ItemMedia variant="image" className="size-10 rounded-md">
        <img
          src="/assets/frames/dock.svg"
          alt=""
          loading="lazy"
          className="outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="font-mono">batch-0412</ItemTitle>
        <ItemDescription className="tabular-nums">940 annotated frames · 38 MB</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            toast.promise(exportBatch(), {
              loading: "Exporting batch 0412…",
              success: (frames) => `Exported ${frames} as COCO JSON`,
              error: "Export failed",
            })
          }
        >
          Export
        </Button>
      </ItemActions>
    </Item>
  );
}
