import { Badge, ScrollArea, ScrollBar, Separator } from "@robomous/ui-core";

const detections = [
  {
    id: "det-0412",
    label: "pallet",
    confidence: 0.97,
    bbox: [112, 86, 340, 291],
    camera: "cam-b07",
  },
  {
    id: "det-0413",
    label: "forklift",
    confidence: 0.91,
    bbox: [402, 120, 688, 470],
    camera: "cam-b07",
  },
  {
    id: "det-0414",
    label: "person",
    confidence: 0.88,
    bbox: [720, 90, 790, 310],
    camera: "cam-02",
  },
  {
    id: "det-0415",
    label: "pallet",
    confidence: 0.64,
    bbox: [18, 340, 190, 512],
    camera: "cam-02",
  },
  {
    id: "det-0416",
    label: "box",
    confidence: 0.59,
    bbox: [640, 410, 690, 470],
    camera: "cam-11",
  },
  {
    id: "det-0417",
    label: "damaged-box",
    confidence: 0.83,
    bbox: [301, 44, 372, 262],
    camera: "cam-11",
  },
];

// One detection per line, so the long lines overflow sideways while the list runs down.
const payload = [
  "{",
  '  "model": "detector-v3.2", "dataset": "pallet-detection", "frame": 417,',
  '  "detections": [',
  ...detections.map(
    (detection, index) =>
      `    ${JSON.stringify(detection)}${index < detections.length - 1 ? "," : ""}`,
  ),
  "  ]",
  "}",
].join("\n");

/** Add a horizontal ScrollBar to scroll both axes; the corner where the two meet is drawn for you. */
export default function Both() {
  return (
    <div className="flex w-full max-w-md flex-col rounded-lg border">
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <span className="font-mono">frame-0417.json</span>
        <Badge variant="secondary">6 detections</Badge>
      </div>
      <Separator />
      <ScrollArea className="h-48">
        <pre className="p-3 font-mono text-[0.6875rem] leading-relaxed">{payload}</pre>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
