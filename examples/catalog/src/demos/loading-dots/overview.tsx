import { LoadingDots } from "@robomous/ui-core";
import { BotIcon, CircleCheckIcon } from "@robomous/ui-core/icons";
import { useEffect, useState } from "react";

const robots = [
  { id: "rb-07", name: "Atlas", frames: 312, takes: 1600 },
  { id: "rb-12", name: "Kestrel", frames: 148, takes: 2600 },
  { id: "rb-19", name: "Orca", frames: 506, takes: 3800 },
];

/**
 * A fleet sync: every robot that is still uploading carries the dots, and each
 * one swaps them for a settled count the moment it finishes. The run repeats on
 * its own, so the page always has one in flight.
 */
export default function Overview() {
  const [run, setRun] = useState(0);
  const [synced, setSynced] = useState<string[]>([]);

  useEffect(() => {
    const timers = robots.map((robot) =>
      setTimeout(() => setSynced((done) => [...done, robot.id]), robot.takes),
    );
    const last = Math.max(...robots.map((robot) => robot.takes));
    timers.push(
      setTimeout(() => {
        setSynced([]);
        setRun((n) => n + 1);
      }, last + 2400),
    );
    return () => timers.forEach(clearTimeout);
  }, [run]);

  return (
    <div className="w-full max-w-sm rounded-xl border">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <span className="font-medium">Fleet sync</span>
        <span className="text-muted-foreground tabular-nums">
          {synced.length} of {robots.length} synced
        </span>
      </div>
      <ul className="flex flex-col gap-1 p-2">
        {robots.map((robot) => (
          <li key={robot.id} className="flex items-center gap-3 rounded-md px-2 py-1.5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md border text-muted-foreground">
              <BotIcon className="size-3.5" />
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="font-medium">{robot.name}</span>
              <span className="font-mono text-[0.625rem] text-muted-foreground">{robot.id}</span>
            </span>
            <span className="ml-auto text-muted-foreground tabular-nums">
              {synced.includes(robot.id) ? (
                <span className="flex items-center gap-1.5">
                  <CircleCheckIcon className="size-3.5 text-success" aria-hidden />
                  {robot.frames} frames
                </span>
              ) : (
                <LoadingDots>Uploading</LoadingDots>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
