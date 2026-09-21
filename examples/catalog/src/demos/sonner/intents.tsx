import { Button, toast } from "@robomous/ui-core";

/** Four intents beyond a plain `toast()`: each supplies its own icon, and there is no `variant` prop to reach for instead. */
export default function Intents() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() => toast.success("Export finished: 940 frames as COCO")}
      >
        toast.success
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Storage almost full — 92% used")}>
        toast.warning
      </Button>
      <Button variant="outline" onClick={() => toast.info("Retraining queued for org/model-base")}>
        toast.info
      </Button>
      <Button variant="outline" onClick={() => toast.error("Could not reach the ingest bucket")}>
        toast.error
      </Button>
    </div>
  );
}
