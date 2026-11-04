import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Progress,
} from "@robomous/ui-core";
import { PauseIcon } from "@robomous/ui-core/icons";

/** A training run as a card: status in the header, progress and metrics in the body, owner and actions in a ruled footer. */
export default function Overview() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Run 0418</CardTitle>
        <CardDescription>detector-v3.2 on gpu-node-03, started 14 minutes ago.</CardDescription>
        <CardAction>
          <Badge variant="info">running</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between">
            <span className="text-muted-foreground">Epoch</span>
            <span className="tabular-nums">38 / 60</span>
          </div>
          <Progress value={63} aria-label="Training progress" />
        </div>
        <dl className="grid grid-cols-3 gap-4">
          <div>
            <dt className="text-muted-foreground">mAP@50</dt>
            <dd className="font-heading text-sm font-medium tabular-nums">0.912</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Val loss</dt>
            <dd className="font-heading text-sm font-medium tabular-nums">0.241</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Frames</dt>
            <dd className="font-heading text-sm font-medium tabular-nums">18,204</dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter className="gap-2 border-t">
        <Avatar size="sm">
          <AvatarImage src="/assets/people/daniel-okafor.svg" alt="" />
          <AvatarFallback>DO</AvatarFallback>
        </Avatar>
        <span className="mr-auto text-muted-foreground">Daniel Okafor</span>
        <Button variant="ghost">
          <PauseIcon data-icon="inline-start" />
          Pause
        </Button>
        <Button>View metrics</Button>
      </CardFooter>
    </Card>
  );
}
