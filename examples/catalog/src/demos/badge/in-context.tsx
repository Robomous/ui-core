import { Badge } from "@robomous/ui-core";

const robots = [
  {
    id: "rb-07",
    image: "/assets/robots/atlas.svg",
    name: "Atlas",
    site: "Monterrey DC-2",
    status: "active",
    variant: "success",
  },
  {
    id: "rb-12",
    image: "/assets/robots/kestrel.svg",
    name: "Kestrel",
    site: "Guadalajara Hub",
    status: "charging",
    variant: "info",
  },
  {
    id: "rb-19",
    image: "/assets/robots/orca.svg",
    name: "Orca",
    site: "Laredo Cross-dock",
    status: "fault",
    variant: "destructive",
  },
  {
    id: "rb-23",
    image: "/assets/robots/heron.svg",
    name: "Heron",
    site: "Querétaro Hub",
    status: "idle",
    variant: "quiet",
  },
] as const;

/** Status badges beside the row they describe, in their own column so the states scan down the list. */
export default function InContext() {
  return (
    <ul className="flex w-full max-w-lg flex-col divide-y rounded-lg border text-sm">
      {robots.map(({ id, name, image, site, status, variant }) => (
        <li key={id} className="grid grid-cols-[auto_1fr_5rem] items-center gap-3 px-3 py-2.5">
          <img
            src={image}
            alt=""
            loading="lazy"
            className="size-10 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
          />
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-medium">
              <span className="font-mono">{id}</span> “{name}”
            </span>
            <span className="truncate text-muted-foreground">{site}</span>
          </div>
          <Badge variant={variant} className="justify-self-start">
            {status}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
