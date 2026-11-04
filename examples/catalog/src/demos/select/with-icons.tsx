import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@robomous/ui-core";
import { CameraIcon, RadarIcon, ScanLineIcon } from "@robomous/ui-core/icons";

/** An icon inside a `SelectItem` is part of its text, so the closed trigger shows it too. */
export default function WithIcons() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Calibration</CardTitle>
        <CardDescription>Pick the sensor to calibrate on rb-07 Atlas.</CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel htmlFor="sensor">Sensor</FieldLabel>
          <Select defaultValue="rgb">
            <SelectTrigger id="sensor" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rgb">
                <CameraIcon />
                RGB camera, 1080p
              </SelectItem>
              <SelectItem value="lidar">
                <ScanLineIcon />
                Lidar, 32 beams
              </SelectItem>
              <SelectItem value="radar">
                <RadarIcon />
                Radar, 77 GHz
              </SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </CardContent>
    </Card>
  );
}
