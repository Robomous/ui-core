import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@robomous/ui-core";

/** The full anatomy: a header with a title and description, a content region, and a footer band for actions. */
export default function Anatomy() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Warehouse cameras</CardTitle>
        <CardDescription>Twelve feeds, sampled every four seconds.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Frames land in the ingest bucket and are annotated in the order they arrive. Nothing is
          discarded before review.
        </p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost">Pause</Button>
        <Button>Open</Button>
      </CardFooter>
    </Card>
  );
}
