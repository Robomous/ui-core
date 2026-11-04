import { Tabs, TabsContent, TabsList, TabsTrigger } from "@robomous/ui-core";

/** `default` raises the active trigger on a muted track; `line` clears the track and underlines it instead. */
export default function Variants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <div className="flex flex-col gap-3 rounded-lg border p-4">
        <span className="text-muted-foreground">default</span>
        <Tabs defaultValue="metrics">
          <TabsList aria-label="Training run sections">
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="checkpoints">Checkpoints</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>
          <TabsContent value="metrics" className="pt-1 text-muted-foreground tabular-nums">
            run-0419: mAP@50 0.912 at epoch 38, validation loss 0.241.
          </TabsContent>
          <TabsContent value="checkpoints" className="pt-1 text-muted-foreground tabular-nums">
            7 checkpoints saved, the latest at epoch 35.
          </TabsContent>
          <TabsContent value="logs" className="pt-1 text-muted-foreground">
            Streaming from gpu-node-03.
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex flex-col gap-3 rounded-lg border p-4">
        <span className="text-muted-foreground">line</span>
        <Tabs defaultValue="general">
          <TabsList variant="line" aria-label="Workspace settings" className="w-full">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="api-keys">API keys</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="pt-2 text-muted-foreground">
            Workspace name, region and default export format.
          </TabsContent>
          <TabsContent value="members" className="pt-2 text-muted-foreground tabular-nums">
            14 members across four roles.
          </TabsContent>
          <TabsContent value="api-keys" className="pt-2 text-muted-foreground tabular-nums">
            3 active keys, 1 expires in 6 days.
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
