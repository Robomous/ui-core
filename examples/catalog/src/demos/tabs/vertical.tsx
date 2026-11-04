import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@robomous/ui-core";

/** `orientation="vertical"` puts the list beside its panels; triggers fill the list's width and align left. */
export default function Vertical() {
  return (
    <div className="w-full max-w-md rounded-lg border p-4">
      <Tabs defaultValue="telemetry" orientation="vertical" className="gap-6">
        <TabsList aria-label="Robot sections" className="w-32 shrink-0">
          <TabsTrigger value="telemetry">Telemetry</TabsTrigger>
          <TabsTrigger value="missions">Missions</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        <TabsContent value="telemetry" className="flex items-start gap-3">
          <img
            src="/assets/robots/atlas.svg"
            alt=""
            className="size-12 shrink-0 rounded-lg object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
          />
          <div className="flex flex-col gap-1">
            <span className="font-medium">rb-07 Atlas</span>
            <span className="text-muted-foreground tabular-nums">
              Reports every 2 seconds. Battery 82%, no faults.
            </span>
          </div>
        </TabsContent>
        <TabsContent value="missions" className="flex flex-col gap-1">
          <span className="font-medium">Next mission</span>
          <span className="text-muted-foreground tabular-nums">Aisle 14 sweep at 06:30.</span>
        </TabsContent>
        <TabsContent value="maintenance" className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">Firmware 2.4.1</span>
            <Badge variant="success">Up to date</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <AvatarImage src="/assets/people/tom-becker.svg" alt="" />
              <AvatarFallback>TB</AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground">Service window Friday with Tom Becker.</span>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
