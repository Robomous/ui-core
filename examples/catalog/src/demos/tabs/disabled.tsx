import { Tabs, TabsContent, TabsList, TabsTrigger } from "@robomous/ui-core";

/** `disabled` on a single `TabsTrigger` dims it and blocks selection without removing it from the row. */
export default function Disabled() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <img
          src="/assets/frames/aisle.svg"
          alt=""
          loading="lazy"
          className="size-10 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">shelf-inspection-2026</span>
          <span className="text-muted-foreground">
            Exports unlock after the first batch is approved.
          </span>
        </div>
      </div>
      <Tabs defaultValue="schema">
        <TabsList aria-label="Dataset sections">
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="batches">Batches</TabsTrigger>
          <TabsTrigger value="exports" disabled>
            Exports
          </TabsTrigger>
        </TabsList>
        <TabsContent value="schema" className="pt-2 text-muted-foreground">
          Five classes: pallet, forklift, person, box, damaged-box.
        </TabsContent>
        <TabsContent value="batches" className="pt-2 text-muted-foreground tabular-nums">
          4 batches in review, 12,480 frames total.
        </TabsContent>
      </Tabs>
    </div>
  );
}
