import { Badge, Button, Progress } from "@robomous/ui-core";
import { CircleCheckIcon, UploadIcon } from "@robomous/ui-core/icons";
import { useEffect, useState } from "react";

const FRAMES = 940;

/** The bar is for the wait; once the work is done, a status takes its place. */
export default function Upload() {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const done = value >= 100;

  useEffect(() => {
    if (!started || done) return;
    const timer = setTimeout(() => setValue((current) => Math.min(100, current + 8)), 250);
    return () => clearTimeout(timer);
  }, [started, done, value]);

  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-xl border p-3">
      <div className="flex items-center gap-3">
        <img
          src="/assets/frames/aisle.svg"
          alt=""
          loading="lazy"
          className="size-12 shrink-0 rounded-lg object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <span id="upload-label" className="truncate font-mono font-medium">
            frames-2026-10.zip
          </span>
          <span className="text-muted-foreground tabular-nums">
            {FRAMES} frames · 38 MB · cam-02
          </span>
        </div>
        {done ? (
          <Badge variant="success">
            <CircleCheckIcon data-icon="inline-start" />
            Uploaded
          </Badge>
        ) : (
          <span className="text-muted-foreground tabular-nums">{value}%</span>
        )}
      </div>
      <Progress value={value} aria-labelledby="upload-label" />
      <div className="flex items-center justify-between gap-2">
        <span className="text-muted-foreground tabular-nums">
          {Math.round((value / 100) * FRAMES)} of {FRAMES} frames
        </span>
        <Button
          size="sm"
          disabled={started && !done}
          onClick={() => {
            setValue(0);
            setStarted(true);
          }}
        >
          <UploadIcon data-icon="inline-start" />
          {done ? "Upload again" : started ? "Uploading" : "Start upload"}
        </Button>
      </div>
    </div>
  );
}
