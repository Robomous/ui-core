import { Tabs, TabsContent, TabsList, TabsTrigger } from "@robomous/ui-core";

/** `orientation="vertical"` places the list beside its panels; triggers stretch to the list's width and left-align their label. */
export default function Vertical() {
  return (
    <Tabs defaultValue="cameras" orientation="vertical" className="w-full">
      <TabsList aria-label="Review sections">
        <TabsTrigger value="cameras">Cameras</TabsTrigger>
        <TabsTrigger value="models">Models</TabsTrigger>
        <TabsTrigger value="alerts">Alerts</TabsTrigger>
      </TabsList>
      <TabsContent value="cameras" className="text-muted-foreground">
        14 cameras online, 1 unreachable.
      </TabsContent>
      <TabsContent value="models" className="text-muted-foreground">
        org/model-base is serving inference.
      </TabsContent>
      <TabsContent value="alerts" className="text-muted-foreground">
        No open alerts.
      </TabsContent>
    </Tabs>
  );
}
