import { Separator } from "@robomous/ui-core";

/** A horizontal separator dividing two stacked blocks of content. */
export default function Horizontal() {
  return (
    <div className="flex w-64 flex-col gap-3 text-sm">
      <div>
        <div className="font-medium">batch-0041</div>
        <div className="text-muted-foreground">1,204 frames ingested</div>
      </div>
      <Separator />
      <div>
        <div className="font-medium">batch-0042</div>
        <div className="text-muted-foreground">318 frames ingested</div>
      </div>
    </div>
  );
}
