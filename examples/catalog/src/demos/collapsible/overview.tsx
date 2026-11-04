import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@robomous/ui-core";
import { ChevronDownIcon } from "@robomous/ui-core/icons";

const variables = [
  ["MODEL_URI", "s3://models/detector-v3.2"],
  ["CONFIDENCE", "0.45"],
  ["MAX_BATCH", "8"],
  ["CAMERAS", "cam-b07,cam-02,cam-11"],
  ["LOG_LEVEL", "info"],
];

/** A deployment card with its secondary detail folded away: the summary stays, the environment opens on request. */
export default function Overview() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>warehouse-detector</CardTitle>
        <CardDescription>detector-v3.2 on 2 replicas · Monterrey DC-2</CardDescription>
        <CardAction>
          <Badge variant="success">healthy</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Collapsible className="flex flex-col gap-2">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="group/env -ml-2 w-fit">
              Environment variables
              <ChevronDownIcon
                data-icon="inline-end"
                className="transition-transform group-aria-expanded/env:rotate-180"
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <dl className="flex flex-col gap-1.5 rounded-md border p-3 font-mono">
              {variables.map(([name, value]) => (
                <div key={name} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{name}</dt>
                  <dd className="truncate">{value}</dd>
                </div>
              ))}
            </dl>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
