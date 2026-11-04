import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@robomous/ui-core";
import { useState } from "react";

const FORMATS = {
  coco: { label: "COCO JSON", file: "annotations.json" },
  yolo: { label: "YOLO TXT", file: "labels/*.txt" },
  voc: { label: "Pascal VOC XML", file: "Annotations/*.xml" },
};

/** Control it with `value` and `onValueChange` when the rest of the screen depends on the choice. */
export default function Controlled() {
  const [format, setFormat] = useState<keyof typeof FORMATS>("coco");

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Export annotations</CardTitle>
        <CardDescription>pallet-detection, 18,204 frames.</CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel htmlFor="export-format">Export format</FieldLabel>
          <Select value={format} onValueChange={(next) => setFormat(next as keyof typeof FORMATS)}>
            <SelectTrigger
              id="export-format"
              className="w-full"
              aria-describedby="export-format-hint"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(FORMATS).map(([value, { label }]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
              <SelectItem value="tfrecord" disabled>
                TFRecord (coming soon)
              </SelectItem>
            </SelectContent>
          </Select>
          <FieldDescription id="export-format-hint">
            Writes <span className="font-mono">{FORMATS[format].file}</span> into the archive.
          </FieldDescription>
        </Field>
      </CardContent>
      <CardFooter className="justify-end">
        <Button>Export</Button>
      </CardFooter>
    </Card>
  );
}
