import { Badge, cn, Toggle } from "@robomous/ui-core";
import { ActivityIcon } from "@robomous/ui-core/icons";
import { useEffect, useState } from "react";

/** `pressed` and `onPressedChange` let the Toggle drive other state; here it starts and stops a live reading. */
export default function Controlled() {
  const [live, setLive] = useState(false);
  const [reading, setReading] = useState({ fps: 29.8, latency: 41, battery: 78 });

  useEffect(() => {
    if (!live) return;
    const timer = setInterval(
      () =>
        setReading((current) => ({
          fps: 29 + Math.random() * 1.5,
          latency: Math.round(38 + Math.random() * 9),
          battery: Math.max(0, current.battery - (Math.random() < 0.2 ? 1 : 0)),
        })),
      800,
    );
    return () => clearInterval(timer);
  }, [live]);

  return (
    <div className="flex w-full max-w-sm flex-col gap-2 rounded-xl border p-2">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
        <img
          src="/assets/frames/aisle-3.svg"
          alt="Onboard camera view down a racking aisle with a worker near the camera"
          className={cn(
            "size-full object-cover outline outline-1 -outline-offset-1 outline-black/10 transition-[filter,opacity] duration-300 dark:outline-white/10",
            !live && "opacity-60 grayscale",
          )}
        />
        <Badge variant={live ? "success" : "secondary"} className="absolute top-2 left-2">
          {live ? "Streaming" : "Paused"}
        </Badge>
      </div>
      <div className="flex items-center justify-between gap-3 px-1">
        <span className="flex items-center gap-2.5 font-medium">
          <img
            src="/assets/robots/atlas.svg"
            alt=""
            className="size-8 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
          />
          rb-07 Atlas telemetry
        </span>
        <Toggle variant="outline" pressed={live} onPressedChange={setLive}>
          <ActivityIcon data-icon="inline-start" />
          Live
        </Toggle>
      </div>
      <dl className="grid grid-cols-3 gap-3 border-t px-1 pt-3 pb-1 tabular-nums">
        <div className="flex flex-col gap-0.5">
          <dt className="text-muted-foreground">Frame rate</dt>
          <dd className="font-medium">{live ? `${reading.fps.toFixed(1)} fps` : "–"}</dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="text-muted-foreground">Latency</dt>
          <dd className="font-medium">{live ? `${reading.latency} ms` : "–"}</dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="text-muted-foreground">Battery</dt>
          <dd className="font-medium">{live ? `${reading.battery}%` : "–"}</dd>
        </div>
      </dl>
    </div>
  );
}
