import { Avatar, AvatarFallback, AvatarImage, Spinner } from "@robomous/ui-core";

const robots = [
  { id: "rb-07", image: "/assets/robots/atlas.svg" },
  { id: "rb-12", image: "/assets/robots/kestrel.svg" },
];

/** Beside a line of text: the words say what is loading, the spinner says it is still going. */
export default function Default() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3 rounded-xl border p-4">
      {robots.map(({ id, image }) => (
        <div key={id} className="flex items-center gap-2 text-muted-foreground">
          <img
            src={image}
            alt=""
            className="size-6 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
          />
          <span className="flex-1">Syncing telemetry from {id}</span>
          <Spinner />
        </div>
      ))}
      <div className="flex items-center gap-2 border-t pt-3 text-muted-foreground">
        <Avatar size="sm">
          <AvatarImage src="/assets/people/sofia-brennan.svg" alt="Sofia Brennan" />
          <AvatarFallback>SB</AvatarFallback>
        </Avatar>
        <span>
          <span className="font-medium text-foreground">Sofia Brennan</span> is checking in from
          Monterrey DC-2
        </span>
      </div>
    </div>
  );
}
