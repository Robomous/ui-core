import { Badge, Tabs, TabsContent, TabsList, TabsTrigger } from "@robomous/ui-core";
import { ImageIcon, ScanIcon, VideoIcon } from "@robomous/ui-core/icons";

const edge = "outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10";

/** An icon with `data-icon="inline-start"` leads a label and trims the padding on its side. */
export default function WithIcons() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3 rounded-xl border p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">cam-a12 · Aisle 14</span>
          <span className="text-muted-foreground tabular-nums">frame-0417 · Oct 28, 14:32</span>
        </div>
        <Badge variant="success">Online</Badge>
      </div>
      <Tabs defaultValue="frame">
        <TabsList aria-label="Frame views">
          <TabsTrigger value="frame">
            <ImageIcon data-icon="inline-start" />
            Frame
          </TabsTrigger>
          <TabsTrigger value="annotations">
            <ScanIcon data-icon="inline-start" />
            Annotations
          </TabsTrigger>
          <TabsTrigger value="stream">
            <VideoIcon data-icon="inline-start" />
            Stream
          </TabsTrigger>
        </TabsList>
        <TabsContent value="frame" className="pt-2">
          <img
            src="/assets/frames/aisle.svg"
            alt="Raw camera frame of a racking aisle with a forklift and a worker in a yellow vest"
            className={`aspect-video w-full rounded-lg object-cover ${edge}`}
          />
        </TabsContent>
        <TabsContent value="annotations" className="pt-2">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <img
              src="/assets/frames/aisle.svg"
              alt="The same frame with the forklift and the worker boxed"
              className={`size-full object-cover ${edge}`}
            />
            <div className="absolute top-[36.2%] left-[51%] h-[15.1%] w-[4.2%] rounded-sm border-2 border-info">
              <span className="absolute -top-px left-0 -translate-y-full rounded-t-sm bg-info px-1 text-[0.625rem] text-background tabular-nums whitespace-nowrap">
                forklift 0.94
              </span>
            </div>
            <div className="absolute top-[40%] left-[56.5%] h-[17.2%] w-[3.9%] rounded-sm border-2 border-success">
              <span className="absolute -bottom-px left-0 translate-y-full rounded-b-sm bg-success px-1 text-[0.625rem] text-background tabular-nums whitespace-nowrap">
                person 0.88
              </span>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="stream" className="pt-2">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <img
              src="/assets/frames/aisle-2.svg"
              alt="Live view of the aisle with two workers close to the camera"
              className={`size-full object-cover ${edge}`}
            />
            <Badge variant="secondary" className="absolute bottom-2 left-2 tabular-nums">
              1080p · 30 fps · 180 ms
            </Badge>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
