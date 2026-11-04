import {
  Badge,
  Button,
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@robomous/ui-core";
import { MaximizeIcon } from "@robomous/ui-core/icons";

/** An `<img>` as the first child bleeds to the card's edges: the top padding drops and the image takes the rounded corners. */
export default function CoverImage() {
  return (
    <Card className="w-full max-w-xs">
      <img
        src="/assets/frames/dock.svg"
        alt="Latest frame from cam-b07: Dock A with staged pallets, a pallet jack and two workers"
        loading="lazy"
        className="aspect-video w-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
      />
      <CardHeader>
        <CardTitle>cam-b07</CardTitle>
        <CardDescription>Dock A, Monterrey DC-2. Frame captured 2 seconds ago.</CardDescription>
        <CardAction>
          <Badge variant="success">online</Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm">
          <MaximizeIcon data-icon="inline-start" />
          Open stream
        </Button>
        <span className="text-muted-foreground tabular-nums">2 people in view</span>
      </CardFooter>
    </Card>
  );
}
