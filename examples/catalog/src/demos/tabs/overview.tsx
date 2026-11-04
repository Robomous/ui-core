import { Badge, Tabs, TabsContent, TabsList, TabsTrigger } from "@robomous/ui-core";

const versions = [
  { name: "v3.2", note: "epoch 38 · 12 days ago", status: "Production" },
  { name: "v3.1", note: "epoch 35 · Oct 2, 09:15", status: "Archived" },
  { name: "v3.0", note: "epoch 40 · Sep 11, 16:48", status: "Archived" },
];

/** A model page: one underlined row switches between the sections that share the region below it. */
export default function Overview() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-4 rounded-lg border p-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">detector-v3.2</span>
        <Badge variant="success">Production</Badge>
      </div>
      <Tabs defaultValue="evaluation">
        <TabsList variant="line" aria-label="Model sections" className="w-full">
          <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
          <TabsTrigger value="versions">Versions</TabsTrigger>
          <TabsTrigger value="deployments">
            Deployments
            <Badge variant="quiet" className="tabular-nums">
              4
            </Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="evaluation" className="pt-3">
          <dl className="grid grid-cols-3 gap-3 tabular-nums">
            <div className="flex flex-col gap-0.5">
              <dt className="text-muted-foreground">mAP@50</dt>
              <dd className="text-sm font-medium">0.912</dd>
            </div>
            <div className="flex flex-col gap-0.5">
              <dt className="text-muted-foreground">Recall</dt>
              <dd className="text-sm font-medium">0.884</dd>
            </div>
            <div className="flex flex-col gap-0.5">
              <dt className="text-muted-foreground">Frames</dt>
              <dd className="text-sm font-medium">8,240</dd>
            </div>
          </dl>
        </TabsContent>
        <TabsContent value="versions" className="pt-3">
          <ul className="flex flex-col gap-2">
            {versions.map((version) => (
              <li key={version.name} className="flex items-center justify-between gap-3">
                <span className="font-medium">{version.name}</span>
                <span className="text-muted-foreground tabular-nums">{version.note}</span>
                <Badge variant={version.status === "Production" ? "success" : "quiet"}>
                  {version.status}
                </Badge>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="deployments" className="pt-3">
          <ul className="flex flex-col gap-2">
            {["Monterrey DC-2", "Guadalajara DC-1", "Laredo Cross-dock", "Querétaro Hub"].map(
              (site, index) => (
                <li key={site} className="flex items-center justify-between gap-3">
                  <span className="font-medium">{site}</span>
                  <span className="text-muted-foreground tabular-nums">
                    {index < 2 ? "Full traffic" : "Canary · 10%"}
                  </span>
                </li>
              ),
            )}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
}
