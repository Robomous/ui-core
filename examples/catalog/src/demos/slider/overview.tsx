import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Slider,
} from "@robomous/ui-core";
import { useState } from "react";

const DEFAULTS = { confidence: 60, iou: 45 };

const DETECTIONS = [
  {
    label: "pallet",
    score: 0.93,
    box: "top-[42.6%] left-[12.9%] h-[29%] w-[15.1%] border-info",
    tag: "bg-info-surface text-info",
  },
  {
    label: "person",
    score: 0.88,
    box: "top-[46.2%] left-[31.2%] h-[30.1%] w-[6.9%] border-success",
    tag: "bg-success-surface text-success",
  },
  {
    label: "pallet jack",
    score: 0.81,
    box: "top-[52.4%] left-[46.2%] h-[40.6%] w-[14.5%] border-warning",
    tag: "bg-warning-surface text-warning",
  },
  {
    label: "pallet",
    score: 0.67,
    box: "top-[46.6%] left-[79%] h-[36%] w-[21%] border-info",
    tag: "bg-info-surface text-info",
  },
  {
    label: "person",
    score: 0.41,
    box: "top-[38.5%] left-[85%] h-[21.2%] w-[4.8%] border-destructive",
    tag: "bg-destructive/10 text-destructive",
  },
];

/** Two continuous knobs with a live readout each: the thumb is the control, the number is the exact value. */
export default function Overview() {
  const [confidence, setConfidence] = useState([DEFAULTS.confidence]);
  const [iou, setIou] = useState([DEFAULTS.iou]);
  const changed = confidence[0] !== DEFAULTS.confidence || iou[0] !== DEFAULTS.iou;
  const shown = DETECTIONS.filter((detection) => detection.score * 100 >= confidence[0]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Inference settings</CardTitle>
        <CardDescription>detector-v3.2 on cam-b07, Dock A.</CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="sm"
            disabled={!changed}
            onClick={() => {
              setConfidence([DEFAULTS.confidence]);
              setIou([DEFAULTS.iou]);
            }}
          >
            Reset
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
          <img
            src="/assets/frames/dock.svg"
            alt="Dock A seen by cam-b07, with detections drawn over the frame"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 rounded-lg outline outline-1 -outline-offset-1 outline-foreground/10" />
          {shown.map((detection) => (
            <div
              key={`${detection.label}-${detection.score}`}
              className={`absolute rounded-[3px] border-2 ${detection.box}`}
            >
              <span
                className={`absolute -top-0.5 -left-0.5 rounded-br-[3px] px-1 text-[0.625rem] leading-4 whitespace-nowrap tabular-nums ${detection.tag}`}
              >
                {detection.label} {detection.score.toFixed(2)}
              </span>
            </div>
          ))}
          <span className="absolute right-2 bottom-2 rounded-full bg-background/85 px-2 py-0.5 text-[0.625rem] text-foreground tabular-nums backdrop-blur-sm">
            {shown.length} {shown.length === 1 ? "detection" : "detections"}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Label id="confidence-label">Confidence threshold</Label>
            <span className="text-muted-foreground tabular-nums">{confidence[0]}%</span>
          </div>
          <Slider
            aria-labelledby="confidence-label"
            value={confidence}
            onValueChange={setConfidence}
            step={5}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Label id="iou-label">NMS overlap (IoU)</Label>
            <span className="text-muted-foreground tabular-nums">{(iou[0] / 100).toFixed(2)}</span>
          </div>
          <Slider aria-labelledby="iou-label" value={iou} onValueChange={setIou} step={5} />
        </div>
      </CardContent>
    </Card>
  );
}
