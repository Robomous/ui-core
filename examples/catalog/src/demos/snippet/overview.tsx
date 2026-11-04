import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Snippet,
} from "@robomous/ui-core";

const steps = [
  { label: "Install the CLI", command: "pnpm add -g @robomous/cli" },
  { label: "Sign in to your workspace", command: "robomous login" },
  { label: "Register the robot", command: "robomous robots register rb-07 --site monterrey-dc-2" },
];

/** Setup steps as a card: one command per snippet, so each is read, copied and run on its own. */
export default function Overview() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Connect a robot</CardTitle>
        <CardDescription>Run these on the machine that will stream telemetry.</CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="flex flex-col gap-4">
          {steps.map((step, index) => (
            <li key={step.command} className="flex flex-col gap-1.5">
              <span className="text-muted-foreground">
                <span className="tabular-nums">{index + 1}.</span> {step.label}
              </span>
              <Snippet className="w-full" text={step.command} />
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
