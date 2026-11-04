import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from "@robomous/ui-core";
import { PauseIcon, PlayIcon } from "@robomous/ui-core/icons";
import { useEffect, useState } from "react";

const EPOCHS = 100;

/** A training run: the bar and the counter share one number, and pausing stops both. */
export default function Overview() {
  const [epoch, setEpoch] = useState(42);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running || epoch >= EPOCHS) return;
    const timer = setTimeout(() => setEpoch((value) => value + 1), 700);
    return () => clearTimeout(timer);
  }, [running, epoch]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-mono">
          run-0419
          <Badge variant={epoch >= EPOCHS ? "success" : running ? "info" : "quiet"}>
            {epoch >= EPOCHS ? "finished" : running ? "training" : "paused"}
          </Badge>
        </CardTitle>
        <CardDescription>detector-v3.2 on pallet-detection · started Oct 28, 14:32</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <span id="run-0419-label">Epoch</span>
          <span className="text-muted-foreground tabular-nums">
            {epoch} of {EPOCHS}
          </span>
        </div>
        <Progress value={epoch} max={EPOCHS} aria-labelledby="run-0419-label" />
        <div className="flex gap-4 text-muted-foreground tabular-nums">
          <span>loss {(0.08 + 0.9 * Math.exp(-epoch / 28)).toFixed(3)}</span>
          <span>mAP {(0.71 * (1 - Math.exp(-epoch / 22))).toFixed(2)}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="self-start"
          disabled={epoch >= EPOCHS}
          onClick={() => setRunning((value) => !value)}
        >
          {running ? <PauseIcon data-icon="inline-start" /> : <PlayIcon data-icon="inline-start" />}
          {running ? "Pause" : "Resume"}
        </Button>
      </CardContent>
    </Card>
  );
}
