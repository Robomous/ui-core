import { Progress } from "@robomous/ui-core";

/** Several stages of one pipeline, stacked, each with its own value and label. */
export default function Stages() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <Progress value={100} aria-label="Upload" className="w-48" />
        <span className="text-sm text-muted-foreground">Upload</span>
      </div>
      <div className="flex items-center gap-4">
        <Progress value={68} aria-label="Annotation review" className="w-48" />
        <span className="text-sm text-muted-foreground">Review</span>
      </div>
      <div className="flex items-center gap-4">
        <Progress value={5} aria-label="Export" className="w-48" />
        <span className="text-sm text-muted-foreground">Export</span>
      </div>
    </div>
  );
}
