import { Badge, ShowMore, ShowMoreContent, ShowMoreTrigger } from "@robomous/ui-core";

const trace = `Traceback (most recent call last):
  File "train.py", line 212, in run_epoch
    loss = criterion(outputs, targets)
  File "losses/iou.py", line 58, in forward
    raise ValueError("box has non-positive area")
ValueError: box has non-positive area
  frame: frame-0417.jpg
  annotation: ann_9f2c71
  box: [412.0, 118.0, 412.0, 301.0]`;

/** Monospace content clips the same way; labels can name what is hidden instead of saying "more". */
export default function Trace() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3 rounded-lg border p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">run-0405 failed at epoch 37</span>
          <span className="text-muted-foreground">A degenerate box in the validation set.</span>
        </div>
        <Badge variant="destructive">failed</Badge>
      </div>
      <ShowMore>
        <ShowMoreContent collapsedHeight="4.5rem">
          <pre className="font-mono text-[0.6875rem] leading-relaxed whitespace-pre-wrap text-muted-foreground">
            {trace}
          </pre>
        </ShowMoreContent>
        <ShowMoreTrigger moreLabel="Show full trace" lessLabel="Hide trace" />
      </ShowMore>
    </div>
  );
}
