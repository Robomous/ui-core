import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from "@robomous/ui-core";

const robots = [
  { id: "rb-07", name: "Atlas", value: 100 },
  { id: "rb-12", name: "Kestrel", value: 64 },
  { id: "rb-19", name: "Orca", value: 8 },
];

/** Several bars stacked report one rollout independently, each with its own value and label. */
export default function Stages() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Firmware 4.2.1</CardTitle>
        <CardDescription>Rolling out to Monterrey DC-2 · 2 of 3 robots left</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3.5">
        {robots.map(({ id, name, value }) => (
          <div key={id} className="grid grid-cols-[5.5rem_1fr_2.5rem] items-center gap-3">
            <span className="flex flex-col leading-tight">
              <span className="font-mono">{id}</span>
              <span className="text-muted-foreground">{name}</span>
            </span>
            <Progress value={value} aria-label={`Firmware 4.2.1 on ${id}`} />
            {value === 100 ? (
              <Badge variant="success" className="justify-self-end">
                done
              </Badge>
            ) : (
              <span className="text-right text-muted-foreground tabular-nums">{value}%</span>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
