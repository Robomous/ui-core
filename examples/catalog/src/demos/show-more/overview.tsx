import {
  Badge,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ShowMore,
  ShowMoreContent,
  ShowMoreTrigger,
} from "@robomous/ui-core";

/** A long dataset description folded in a card: the first lines set the scene, the trigger opens the rest. */
export default function Overview() {
  return (
    <Card className="w-full max-w-md">
      <img
        src="/assets/frames/aisle.svg"
        alt="Racking aisle at Monterrey DC-2: cartons on pallets, a forklift and a worker in a yellow vest"
        className="h-36 w-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
      />
      <CardHeader>
        <CardTitle>pallet-detection</CardTitle>
        <CardDescription>18,204 frames · 41 batches · 5 classes</CardDescription>
        <CardAction>
          <Badge variant="success">approved</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ShowMore>
          <ShowMoreContent collapsedHeight="4.5rem" className="flex flex-col gap-2">
            <p className="text-pretty">
              Overhead and aisle-level frames from three fixed cameras across the Monterrey DC-2
              floor, captured at 15 to 30 fps and sampled every two seconds.
            </p>
            <p className="text-pretty">
              Pallets, forklifts, people, boxes and damaged boxes are labeled with tight boxes.
              Occluded objects are labeled when at least a third of the object is visible.
            </p>
            <p className="text-pretty">
              Night-shift frames make up 18% of the set. Frames with motion blur above the review
              threshold were dropped before annotation, not after.
            </p>
            <p className="text-pretty">
              Every box was reviewed by a second annotator; disagreements above 0.3 IoU were
              resolved by Sofia Brennan's team.
            </p>
          </ShowMoreContent>
          <ShowMoreTrigger />
        </ShowMore>
      </CardContent>
    </Card>
  );
}
