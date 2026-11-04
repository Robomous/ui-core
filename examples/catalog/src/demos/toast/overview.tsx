import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  toast,
} from "@robomous/ui-core";
import { DownloadIcon } from "@robomous/ui-core/icons";

/** A confirmation of something the reader just did: a title that names it, a line of detail, then it leaves. */
export default function Overview() {
  return (
    <Card className="w-full max-w-sm">
      <img
        src="/assets/frames/dock.svg"
        alt="Loading dock A with four roll-up doors, staged pallets and two workers"
        className="aspect-[9/4] w-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
      />
      <CardHeader>
        <CardTitle className="font-mono">batch-0412</CardTitle>
        <CardDescription className="tabular-nums">
          940 annotated frames · 38 MB · Monterrey DC-2
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            toast.success("Batch 0412 exported", {
              description: "940 frames as COCO JSON, ready in your downloads.",
            })
          }
        >
          <DownloadIcon data-icon="inline-start" />
          Export as COCO
        </Button>
      </CardContent>
    </Card>
  );
}
