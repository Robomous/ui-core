import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Spinner,
} from "@robomous/ui-core";
import { RefreshCwIcon } from "@robomous/ui-core/icons";
import { useEffect, useState } from "react";

const detections = [
  {
    label: "forklift",
    score: "0.94",
    box: "top-[36.2%] left-[51%] h-[15.1%] w-[4.2%] border-warning",
  },
  {
    label: "person",
    score: "0.88",
    box: "top-[40%] left-[56.5%] h-[17.2%] w-[3.9%] border-success",
  },
];

/** A region with nothing to show yet: centre the spinner in the space the content will take, and give it a name. */
export default function Panel() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Latest frame · cam-a12</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-md border border-dashed">
          {loading ? (
            <Spinner aria-label="Loading frame" className="size-5 text-muted-foreground" />
          ) : (
            <img
              src="/assets/frames/aisle.svg"
              alt="Racking aisle with a forklift and a worker, each boxed"
              className="size-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
            />
          )}
          {loading
            ? null
            : detections.map(({ label, box }) => (
                <div key={label} className={`absolute rounded-sm border-2 ${box}`} />
              ))}
        </div>
        <div className="flex min-h-5 flex-wrap gap-1.5">
          {loading
            ? null
            : detections.map(({ label, score }) => (
                <Badge key={label} variant="quiet" className="tabular-nums">
                  {label} · {score}
                </Badge>
              ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="self-start"
          disabled={loading}
          onClick={() => setLoading(true)}
        >
          <RefreshCwIcon data-icon="inline-start" />
          Reload
        </Button>
      </CardContent>
    </Card>
  );
}
