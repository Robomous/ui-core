import { Avatar, AvatarFallback, AvatarImage, Badge, LoadingDots } from "@robomous/ui-core";

const runs = [
  {
    id: "run-0419",
    model: "detector-v3.2",
    state: "training",
    owner: "Daniel Okafor",
    initials: "DO",
    slug: "daniel-okafor",
  },
  {
    id: "run-0412",
    model: "segmenter-v1.4",
    state: "finished",
    owner: "Mei Tanaka",
    initials: "MT",
    slug: "mei-tanaka",
  },
  {
    id: "run-0405",
    model: "detector-v3.1",
    state: "finished",
    owner: "Daniel Okafor",
    initials: "DO",
    slug: "daniel-okafor",
  },
];

/** In a list, the dots replace a status only while it is changing. */
export default function InContext() {
  return (
    <ul className="flex w-full max-w-md flex-col divide-y rounded-lg border">
      {runs.map((run) => (
        <li key={run.id} className="flex items-center gap-3 px-3 py-2.5">
          <Avatar size="sm">
            <AvatarImage src={`/assets/people/${run.slug}.svg`} alt={run.owner} />
            <AvatarFallback>{run.initials}</AvatarFallback>
          </Avatar>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="font-medium">{run.model}</span>
            <span className="font-mono text-muted-foreground">{run.id}</span>
          </span>
          <span className="ml-auto">
            {run.state === "training" ? (
              <LoadingDots className="text-muted-foreground">Training</LoadingDots>
            ) : (
              <Badge variant="success">Finished</Badge>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
