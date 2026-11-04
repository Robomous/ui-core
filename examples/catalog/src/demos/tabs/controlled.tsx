import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@robomous/ui-core";
import { ArrowRightIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

const steps = ["data", "model", "review"];
const frames = ["dock", "dock-2", "floor"];

/** `value` and `onValueChange` let something outside the list, here a button, move the selection. */
export default function Controlled() {
  const [step, setStep] = useState("data");

  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-lg border p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="font-medium">New training run</span>
        <span className="text-muted-foreground tabular-nums">
          Step {steps.indexOf(step) + 1} of {steps.length}
        </span>
      </div>
      <Tabs value={step} onValueChange={setStep}>
        <TabsList aria-label="New training run">
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="model">Model</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
        </TabsList>
        <TabsContent value="data" className="flex min-h-24 flex-col items-start gap-3 pt-2">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {frames.map((frame) => (
                <img
                  key={frame}
                  src={`/assets/frames/${frame}.svg`}
                  alt=""
                  loading="lazy"
                  className="size-8 rounded-md object-cover ring-2 ring-background"
                />
              ))}
            </div>
            <p className="text-muted-foreground tabular-nums">
              pallet-detection, 18,204 frames across 41 batches.
            </p>
          </div>
          <Button size="sm" onClick={() => setStep("model")}>
            Continue to model
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </TabsContent>
        <TabsContent value="model" className="flex min-h-24 flex-col items-start gap-3 pt-2">
          <p className="text-muted-foreground tabular-nums">
            Fine-tune detector-v3.2 for 40 epochs on one GPU.
          </p>
          <Button size="sm" onClick={() => setStep("review")}>
            Continue to review
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </TabsContent>
        <TabsContent value="review" className="flex min-h-24 flex-col items-start gap-3 pt-2">
          <p className="text-muted-foreground tabular-nums">Estimated 3 h 20 min on gpu-node-03.</p>
          <Button size="sm">Start run</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
