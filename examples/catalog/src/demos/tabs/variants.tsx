import { Tabs, TabsContent, TabsList, TabsTrigger } from "@robomous/ui-core";

/** `variant="default"` raises the active trigger on a muted track; `variant="line"` marks it with an underline instead. */
export default function Variants() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="schema" className="w-full">
        <TabsList aria-label="Dataset sections">
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="batches">Batches</TabsTrigger>
          <TabsTrigger value="exports">Exports</TabsTrigger>
        </TabsList>
        <TabsContent value="schema" className="text-muted-foreground">
          Six classes: person, forklift, pallet, box, cone, vehicle.
        </TabsContent>
        <TabsContent value="batches" className="text-muted-foreground">
          148 batches, 1.2M frames total.
        </TabsContent>
        <TabsContent value="exports" className="text-muted-foreground">
          Last export: COCO, 2 hours ago.
        </TabsContent>
      </Tabs>
      <Tabs defaultValue="schema" className="w-full">
        <TabsList variant="line" aria-label="Dataset sections, line variant">
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="batches">Batches</TabsTrigger>
          <TabsTrigger value="exports">Exports</TabsTrigger>
        </TabsList>
        <TabsContent value="schema" className="text-muted-foreground">
          Six classes: person, forklift, pallet, box, cone, vehicle.
        </TabsContent>
        <TabsContent value="batches" className="text-muted-foreground">
          148 batches, 1.2M frames total.
        </TabsContent>
        <TabsContent value="exports" className="text-muted-foreground">
          Last export: COCO, 2 hours ago.
        </TabsContent>
      </Tabs>
    </div>
  );
}
