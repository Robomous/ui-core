import { Button, toast } from "@robomous/ui-core";
import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
} from "@robomous/ui-core/icons";

/** Four intents beyond a plain `toast()`: each supplies its own icon, and there is no `variant` prop to reach for instead. */
export default function Intents() {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-3">
      <Button variant="outline" onClick={() => toast.success("Key rk_live_4f2a revoked")}>
        <CircleCheckIcon data-icon="inline-start" />
        toast.success
      </Button>
      <Button variant="outline" onClick={() => toast.info("Retraining queued for detector-v3.2")}>
        <InfoIcon data-icon="inline-start" />
        toast.info
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Storage almost full: 92% used")}>
        <TriangleAlertIcon data-icon="inline-start" />
        toast.warning
      </Button>
      <Button variant="outline" onClick={() => toast.error("Couldn't reach the ingest bucket")}>
        <CircleAlertIcon data-icon="inline-start" />
        toast.error
      </Button>
    </div>
  );
}
