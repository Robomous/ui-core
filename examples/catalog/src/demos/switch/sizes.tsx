import { Label, Switch } from "@robomous/ui-core";

const SENSORS = ["Front camera", "Rear camera", "Lidar", "IMU"];

/** `default` for settings rows, `sm` for dense lists such as a table cell or a sidebar. */
export default function Sizes() {
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-4">
      {(["default", "sm"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-3 rounded-xl border p-4">
          <div className="flex flex-col gap-0.5">
            <code className="text-muted-foreground">{size}</code>
            <span className="font-medium">Atlas sensors</span>
          </div>
          {SENSORS.map((name, index) => (
            <div key={name} className="flex items-center justify-between gap-3">
              <Label htmlFor={`switch-${size}-${index}`}>{name}</Label>
              <Switch id={`switch-${size}-${index}`} size={size} defaultChecked={index < 3} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
