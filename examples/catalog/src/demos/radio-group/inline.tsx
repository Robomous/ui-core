import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  RadioGroup,
  RadioGroupItem,
} from "@robomous/ui-core";
import { useState } from "react";

const rates = [15, 30, 60];
const resolutions = [
  { value: "720p", mb: 0.06 },
  { value: "1080p", mb: 0.15 },
  { value: "4K", mb: 0.5 },
];

/** The group is a grid; `flex` in `className` lays a short list of options out in a row, and the value stays controlled so the page can react to it. */
export default function Inline() {
  const [rate, setRate] = useState("30");
  const [resolution, setResolution] = useState("1080p");
  const mb = resolutions.find((r) => r.value === resolution)?.mb ?? 0;
  const gigabytes = (Number(rate) * 3600 * mb) / 1000;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>cam-b07 capture</CardTitle>
        <CardDescription>Dock A, Monterrey DC-2</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="font-medium">Capture rate</p>
          <RadioGroup
            value={rate}
            onValueChange={setRate}
            aria-label="Capture rate"
            className="flex gap-6"
          >
            {rates.map((r) => (
              <div key={r} className="flex items-center gap-2">
                <RadioGroupItem value={String(r)} id={`rg-rate-${r}`} />
                <Label htmlFor={`rg-rate-${r}`} className="tabular-nums">
                  {r} fps
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-medium">Resolution</p>
          <RadioGroup
            value={resolution}
            onValueChange={setResolution}
            aria-label="Resolution"
            className="flex gap-6"
          >
            {resolutions.map((r) => (
              <div key={r.value} className="flex items-center gap-2">
                <RadioGroupItem value={r.value} id={`rg-res-${r.value}`} />
                <Label htmlFor={`rg-res-${r.value}`}>{r.value}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <p className="rounded-md bg-muted px-3 py-2 text-muted-foreground tabular-nums">
          About {gigabytes.toFixed(1)} GB per camera, per hour.
        </p>
      </CardContent>
    </Card>
  );
}
