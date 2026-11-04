import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@robomous/ui-core";
import { RocketIcon } from "@robomous/ui-core/icons";

/** A model card: one status badge for state, quiet ones for metadata that doesn't ask for attention. */
export default function Overview() {
  return (
    <Card className="w-full max-w-sm">
      <img
        src="/assets/frames/aisle.svg"
        alt="Validation frame: a forklift and a worker in a yellow vest in a racking aisle"
        className="aspect-[9/4] w-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
      />
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-mono">
          detector-v3.2
          <Badge variant="success">production</Badge>
        </CardTitle>
        <CardDescription>Trained on pallet-detection · mAP 0.71</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="quiet">object-detection</Badge>
          <Badge variant="quiet">int8</Badge>
          <Badge variant="quiet">onnx</Badge>
          <Badge variant="outline">312 MB</Badge>
        </div>
        <Button variant="outline" size="sm" className="self-start">
          <RocketIcon data-icon="inline-start" />
          Deploy to a fleet
        </Button>
      </CardContent>
    </Card>
  );
}
