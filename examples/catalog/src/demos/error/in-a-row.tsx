import { Badge, ErrorMessage } from "@robomous/ui-core";

const cameras = [
  {
    id: "cam-b07",
    place: "Dock A",
    frame: "/assets/frames/dock.svg",
    state: "streaming",
    error: null,
  },
  {
    id: "cam-a12",
    place: "Aisle 14",
    frame: "/assets/frames/aisle.svg",
    state: "offline",
    error: "No heartbeat for 12 min. Check the PoE switch on rack 14B.",
  },
  {
    id: "cam-c03",
    place: "Sorting line",
    frame: "/assets/frames/conveyor.svg",
    state: "streaming",
    error: null,
  },
] as const;

/** Next to the row that failed, the small size keeps the message in step with the line around it. */
export default function InARow() {
  return (
    <ul className="flex w-full max-w-md flex-col divide-y rounded-lg border">
      {cameras.map(({ id, place, frame, state, error }) => (
        <li key={id} className="flex items-start gap-3 px-3 py-2.5">
          <img
            src={frame}
            alt=""
            loading="lazy"
            className={`aspect-[7/5] w-14 shrink-0 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10 ${error ? "opacity-50 grayscale" : ""}`}
          />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <span className="font-mono">{id}</span>
                <span className="text-muted-foreground">{place}</span>
              </div>
              <Badge variant={error ? "destructive" : "success"}>{state}</Badge>
            </div>
            {error ? <ErrorMessage size="sm">{error}</ErrorMessage> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
