import {
  Card,
  CardContent,
  CardDescription,
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

/** Locked while an export is running; the trigger keeps the arrow cursor. */
export default function Disabled() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Export in progress</CardTitle>
        <CardDescription>7,640 of 18,204 frames written.</CardDescription>
      </CardHeader>
      <CardContent>
        <Field data-disabled>
          <FieldLabel htmlFor="dataset-format">Dataset format</FieldLabel>
          <Select defaultValue="coco" disabled>
            <SelectTrigger id="dataset-format" className="w-full" aria-describedby="format-hint">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coco">COCO JSON</SelectItem>
              <SelectItem value="yolo">YOLO TXT</SelectItem>
            </SelectContent>
          </Select>
          <FieldDescription id="format-hint">
            The format is fixed until this export finishes.
          </FieldDescription>
        </Field>
      </CardContent>
    </Card>
  );
}
