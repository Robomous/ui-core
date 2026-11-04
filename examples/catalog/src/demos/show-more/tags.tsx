import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ShowMore,
  ShowMoreContent,
  ShowMoreTrigger,
} from "@robomous/ui-core";

const classes = [
  "pallet",
  "forklift",
  "person",
  "box",
  "damaged-box",
  "pallet jack",
  "tote",
  "shelf",
  "conveyor",
  "hand truck",
  "safety vest",
  "hard hat",
  "barcode",
  "dock door",
  "dock plate",
  "robot",
];

/** `collapsedHeight` is any CSS length: two rows of chips here, with the hidden count in the label. */
export default function Tags() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Label classes</CardTitle>
        <CardDescription>{classes.length} classes in shelf-inspection-2026</CardDescription>
      </CardHeader>
      <CardContent>
        <ShowMore>
          <ShowMoreContent collapsedHeight="3.25rem" className="flex flex-wrap gap-1.5">
            {classes.map((name) => (
              <Badge key={name} variant="outline">
                {name}
              </Badge>
            ))}
          </ShowMoreContent>
          <ShowMoreTrigger moreLabel="Show 6 more classes" lessLabel="Show fewer" />
        </ShowMore>
      </CardContent>
    </Card>
  );
}
