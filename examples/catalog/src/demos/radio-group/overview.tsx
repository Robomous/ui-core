import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Label,
  RadioGroup,
  RadioGroupItem,
} from "@robomous/ui-core";
import { useState } from "react";

const formats = [
  { value: "coco", label: "COCO", hint: "JSON, one file · 38 MB" },
  { value: "yolo", label: "YOLO", hint: "TXT per image · 41 MB" },
  { value: "voc", label: "Pascal VOC", hint: "XML per image · 112 MB" },
];

/** One choice out of a few, each with its hint; the action below always says what the selection will do. */
export default function Overview() {
  const [format, setFormat] = useState("coco");
  const selected = formats.find((f) => f.value === format);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Export annotations</CardTitle>
        <CardDescription className="tabular-nums">
          pallet-detection · 18,204 frames · 41 batches
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={format} onValueChange={setFormat} aria-label="Export format">
          {formats.map((f) => (
            <div key={f.value} className="flex items-center gap-2">
              <RadioGroupItem value={f.value} id={`rg-ov-${f.value}`} />
              <Label htmlFor={`rg-ov-${f.value}`}>{f.label}</Label>
              <span className="ml-auto text-muted-foreground tabular-nums">{f.hint}</span>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="justify-end">
        <Button>Export as {selected?.label}</Button>
      </CardFooter>
    </Card>
  );
}
