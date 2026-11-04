import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Progress,
} from "@robomous/ui-core";

/** A mission card with a bottom drawer for the detail: on a phone it reads like a native sheet, and it drags shut. */
export default function Overview() {
  return (
    <Card className="w-full max-w-sm pt-0">
      <div className="relative aspect-video overflow-hidden rounded-t-lg">
        <img
          src="/assets/frames/aisle.svg"
          alt="Camera frame from Aisle 14: a forklift and a worker in a hi-vis vest at the far end of the racking"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute top-[36.2%] left-[51%] h-[15.1%] w-[4.2%] rounded-sm border-2 border-info">
          <span className="absolute -top-5 -left-0.5 rounded-xs bg-info px-1 text-[0.625rem] whitespace-nowrap text-background tabular-nums">
            forklift 0.96
          </span>
        </div>
        <div className="absolute top-[40%] left-[56.5%] h-[17.2%] w-[3.9%] rounded-sm border-2 border-success">
          <span className="absolute top-full -left-0.5 mt-0.5 rounded-xs bg-success px-1 text-[0.625rem] whitespace-nowrap text-background tabular-nums">
            person 0.93
          </span>
        </div>
      </div>
      <CardHeader>
        <CardTitle>Mission 0412</CardTitle>
        <CardDescription>rb-07 Atlas · aisle 14 to dock B</CardDescription>
        <CardAction>
          <Badge variant="success">In progress</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Route</span>
          <span className="font-medium tabular-nums">64%</span>
        </div>
        <Progress value={64} aria-label="Route progress" />
      </CardContent>
      <CardFooter>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full">
              Mission details
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto flex w-full max-w-sm flex-col">
              <DrawerHeader>
                <DrawerTitle>Mission 0412</DrawerTitle>
                <DrawerDescription className="flex items-center justify-center gap-2 md:justify-start">
                  <Avatar size="sm">
                    <AvatarImage src="/assets/people/hannah-kim.svg" alt="" />
                    <AvatarFallback>HK</AvatarFallback>
                  </Avatar>
                  Started 14 minutes ago by Hannah Kim.
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex items-center gap-3 px-4 pb-4">
                <img
                  src="/assets/robots/atlas.svg"
                  alt=""
                  className="size-10 shrink-0 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium">rb-07 Atlas</span>
                  <span className="text-muted-foreground">Monterrey DC-2 · aisle 14</span>
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 px-4 text-sm">
                {[
                  ["Pallets moved", "7 of 11"],
                  ["Distance", "412 m"],
                  ["Battery", "82%"],
                  ["Estimated finish", "4 min"],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="font-medium tabular-nums">{value}</dd>
                  </div>
                ))}
              </dl>
              <DrawerFooter>
                <Button>Pause mission</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </CardFooter>
    </Card>
  );
}
