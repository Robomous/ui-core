import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@robomous/ui-core";

const LONG =
  "run-0419, epoch 42, finetuned on Monterrey DC-2 night frames with glare augmentation, mAP 0.71";

/** `multiline` lets a long value wrap instead of clamping to one line and overflowing the box. */
export default function Multiline() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground">Default: clamped to one line</span>
        <Select defaultValue="e42">
          <SelectTrigger className="w-full" aria-label="Checkpoint, clamped">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="e42">{LONG}</SelectItem>
            <SelectItem value="e30">run-0412, epoch 30, base weights, mAP 0.64</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <code className="text-muted-foreground">multiline</code>
        <Select defaultValue="e42">
          <SelectTrigger multiline className="w-full" aria-label="Checkpoint, multiline">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="e42">{LONG}</SelectItem>
            <SelectItem value="e30">run-0412, epoch 30, base weights, mAP 0.64</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
