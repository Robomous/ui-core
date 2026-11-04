import { Label, Slider } from "@robomous/ui-core";
import { useState } from "react";

const CHANNELS = [
  { id: "exposure", label: "Exposure", initial: 55 },
  { id: "gain", label: "Gain", initial: 30 },
  { id: "gamma", label: "Gamma", initial: 70 },
];

/** `orientation="vertical"` fills the height it is given, so the parent sets it; Up raises the value. */
export default function Vertical() {
  const [values, setValues] = useState(() =>
    Object.fromEntries(CHANNELS.map((channel) => [channel.id, [channel.initial]])),
  );
  const [exposure, gain, gamma] = CHANNELS.map((channel) => values[channel.id][0]);

  return (
    <div className="flex w-fit items-center gap-6 rounded-xl border p-4">
      <div className="relative w-44 overflow-hidden rounded-lg">
        <img
          src="/assets/frames/aisle.svg"
          alt="Racking aisle seen by cam-a12, adjusted by the sliders"
          className="aspect-square size-full object-cover"
          style={{
            filter: `brightness(${0.5 + exposure / 100}) contrast(${0.7 + gamma / 150}) saturate(${0.6 + gain / 100})`,
          }}
        />
        <div className="absolute inset-0 rounded-lg outline outline-1 -outline-offset-1 outline-foreground/10" />
        <span className="absolute bottom-2 left-2 rounded-full bg-background/85 px-2 py-0.5 text-[0.625rem] text-foreground backdrop-blur-sm whitespace-nowrap">
          cam-a12 · Aisle 14
        </span>
      </div>
      <div className="flex gap-5">
        {CHANNELS.map((channel) => (
          <div key={channel.id} className="flex flex-col items-center gap-3">
            <span className="font-medium tabular-nums">{values[channel.id][0]}</span>
            <div className="h-40">
              <Slider
                aria-labelledby={`${channel.id}-label`}
                orientation="vertical"
                value={values[channel.id]}
                onValueChange={(next) =>
                  setValues((current) => ({ ...current, [channel.id]: next }))
                }
              />
            </div>
            <Label id={`${channel.id}-label`}>{channel.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}
