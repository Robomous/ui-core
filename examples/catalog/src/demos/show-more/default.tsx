import { Badge, ShowMore, ShowMoreContent, ShowMoreTrigger } from "@robomous/ui-core";

/** The region stops at `collapsedHeight` and fades; the trigger on its hairline reveals the rest. */
export default function Default() {
  return (
    <article className="flex w-full max-w-md flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-sm font-medium">Firmware 4.2.1</h3>
          <span className="text-muted-foreground">atlas fleet · released Oct 14</span>
        </div>
        <Badge variant="info">stable</Badge>
      </div>
      <ShowMore>
        <ShowMoreContent
          collapsedHeight="6rem"
          className="flex flex-col gap-2 text-muted-foreground"
        >
          <p>
            Docking now retries twice before raising an alert, and the approach slows to 0.3 m/s in
            the last metre.
          </p>
          <p>
            Battery estimates account for payload weight, so return-to-dock triggers earlier on
            heavy missions.
          </p>
          <p>
            Lidar dropouts under 200 ms no longer stop the robot; it holds its heading and logs the
            gap.
          </p>
          <p>
            Telemetry is batched every five seconds instead of every second, cutting uplink traffic
            by about 70%.
          </p>
        </ShowMoreContent>
        <ShowMoreTrigger />
      </ShowMore>
    </article>
  );
}
