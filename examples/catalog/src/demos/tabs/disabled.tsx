import { Tabs, TabsContent, TabsList, TabsTrigger } from "@robomous/ui-core";

/** `disabled` on a single `TabsTrigger` dims it and blocks selection without removing it from the row. */
export default function Disabled() {
  return (
    <Tabs defaultValue="schema" className="w-full">
      <TabsList aria-label="Dataset sections">
        <TabsTrigger value="schema">Schema</TabsTrigger>
        <TabsTrigger value="batches">Batches</TabsTrigger>
        <TabsTrigger value="exports" disabled>
          Exports
        </TabsTrigger>
      </TabsList>
      <TabsContent value="schema" className="text-muted-foreground">
        Six classes: person, forklift, pallet, box, cone, vehicle.
      </TabsContent>
      <TabsContent value="batches" className="text-muted-foreground">
        148 batches, 1.2M frames total.
      </TabsContent>
    </Tabs>
  );
}
