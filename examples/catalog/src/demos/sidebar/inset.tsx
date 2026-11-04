import {
  Badge,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@robomous/ui-core";
import { BoxIcon, DatabaseIcon, TagIcon } from "@robomous/ui-core/icons";

const thumbnails = [
  ["/assets/frames/dock.svg", "Loading dock A with pallets staged by the roll-up doors"],
  ["/assets/frames/dock-2.svg", "Loading dock A from the far side, a pallet jack in the lane"],
  ["/assets/frames/floor.svg", "Storage bay B11 seen from above, a forklift in the travel lane"],
];

/** `variant="inset"` turns the page into a rounded card sitting on the sidebar's own surface. */
export default function Inset() {
  return (
    <div className="h-[20rem] w-full max-w-2xl overflow-hidden rounded-lg border contain-layout">
      <SidebarProvider persist={false} keyboardShortcut={false} className="h-full min-h-0 w-full">
        <Sidebar variant="inset" className="h-full">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      <DatabaseIcon />
                      <span>Datasets</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <TagIcon />
                      <span>Annotations</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <BoxIcon />
                      <span>Models</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="flex h-12 items-center gap-2 border-b px-3">
            <SidebarTrigger />
            <span className="text-sm font-medium">Datasets</span>
          </div>
          <div className="flex flex-col gap-3 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-sm">pallet-detection</span>
                <span className="text-muted-foreground">
                  Monterrey DC-2 · updated Oct 28, 14:32
                </span>
              </div>
              <Badge variant="success">approved</Badge>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {thumbnails.map(([src, alt]) => (
                <img
                  key={src}
                  src={src}
                  alt={alt}
                  loading="lazy"
                  className="aspect-video w-full rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
                />
              ))}
            </div>
            <dl className="grid grid-cols-3 gap-2">
              {[
                ["Frames", "18,204"],
                ["Batches", "41"],
                ["Classes", "5"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-baseline justify-between gap-2 px-0.5">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="font-medium tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
