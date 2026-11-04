import {
  Badge,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@robomous/ui-core";
import { CameraIcon, LayersIcon, TagIcon } from "@robomous/ui-core/icons";

/** `variant="floating"` lifts the panel off the edge into its own ringed box; `side="right"` docks it opposite the content, as an inspector beside a canvas. */
export default function Floating() {
  return (
    <div className="h-[19rem] w-full max-w-2xl overflow-hidden rounded-lg border contain-layout">
      <SidebarProvider persist={false} keyboardShortcut={false} className="h-full min-h-0 w-full">
        <SidebarInset>
          <div className="flex h-12 items-center justify-between gap-2 border-b px-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-medium">frame-0417.jpg</span>
              <Badge variant="quiet">cam-b07</Badge>
            </div>
            <SidebarTrigger />
          </div>
          <div className="relative m-3 aspect-video overflow-hidden rounded-lg bg-muted">
            <img
              src="/assets/frames/dock.svg"
              alt="Loading dock A with two workers and pallets staged by the doors, annotated"
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute top-[42.6%] left-[12.9%] h-[29%] w-[15.1%] rounded-sm border-2 border-info">
              <span className="absolute -top-5 -left-0.5 rounded-xs bg-info px-1 text-[0.625rem] text-background tabular-nums whitespace-nowrap">
                pallet 0.97
              </span>
            </div>
            <div className="absolute top-[46.2%] left-[31.2%] h-[30.1%] w-[6.9%] rounded-sm border-2 border-success">
              <span className="absolute -top-5 -left-0.5 rounded-xs bg-success px-1 text-[0.625rem] text-background tabular-nums whitespace-nowrap">
                person 0.94
              </span>
            </div>
            <div className="absolute top-[46.6%] left-[79%] h-[36%] w-[21%] rounded-sm border-2 border-warning">
              <span className="absolute -top-5 -left-0.5 rounded-xs bg-warning px-1 text-[0.625rem] text-background tabular-nums whitespace-nowrap">
                pallet 0.78
              </span>
            </div>
          </div>
        </SidebarInset>
        <Sidebar side="right" variant="floating" className="h-full">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Inspector</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      <TagIcon />
                      <span>Annotations</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>3</SidebarMenuBadge>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <LayersIcon />
                      <span>Layers</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <CameraIcon />
                      <span>Camera</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
}
