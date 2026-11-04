import { Tabs, TabsContent, TabsList, TabsTrigger } from "@robomous/ui-core";

const failures = [
  { src: "/assets/frames/dock.svg", frame: "frame-2210" },
  { src: "/assets/frames/dock-2.svg", frame: "frame-4875" },
  { src: "/assets/frames/aisle-night.svg", frame: "frame-7302" },
];

/** `activationMode="manual"` makes the arrow keys only move focus; Enter or Space opens the panel. */
export default function Manual() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-lg border p-4">
      <div className="flex flex-col gap-0.5">
        <span className="font-medium">Evaluation report · run-0419</span>
        <span className="text-muted-foreground">
          Arrow keys move focus; Enter or Space opens a panel.
        </span>
      </div>
      <Tabs defaultValue="summary" activationMode="manual">
        <TabsList aria-label="Evaluation report">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="confusion">Confusion matrix</TabsTrigger>
          <TabsTrigger value="errors">Failure cases</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="pt-2 text-muted-foreground tabular-nums">
          Six classes, 8,240 validation frames, mAP@50 0.912.
        </TabsContent>
        <TabsContent value="confusion" className="pt-2 text-muted-foreground tabular-nums">
          Rendered on demand: forklift and vehicle are confused 4.1% of the time.
        </TabsContent>
        <TabsContent value="errors" className="flex flex-col gap-2 pt-2">
          <span className="text-muted-foreground tabular-nums">
            Loaded on demand: 312 frames where the model missed a pallet.
          </span>
          <div className="grid grid-cols-3 gap-2">
            {failures.map(({ src, frame }) => (
              <div key={frame} className="flex flex-col gap-1">
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="aspect-video w-full rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
                />
                <span className="text-muted-foreground tabular-nums">{frame}</span>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
