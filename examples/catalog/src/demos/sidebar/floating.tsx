import { useState } from "react";
import {
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
import { CameraIcon, LayersIcon, TagIcon } from "@robomous/ui-core/icons";

/**
 * `variant="floating"` lifts the panel off the page's edge into its own ringed,
 * shadowed box instead of sharing a border with it; `side="right"` mirrors which
 * edge it docks to. Contained the same way as Collapsing, with `contain-layout`.
 */
export default function Floating() {
  const [open, setOpen] = useState(true);

  return (
    <div className="h-[20rem] w-full max-w-xl overflow-hidden rounded-lg contain-layout ring-1 ring-foreground/10">
      <SidebarProvider open={open} onOpenChange={setOpen} className="h-full min-h-0 w-full">
        <SidebarInset>
          <div className="flex h-12 items-center justify-end gap-2 border-b px-3">
            <span className="text-sm font-medium">frame-0417.png</span>
            <SidebarTrigger />
          </div>
        </SidebarInset>
        <Sidebar side="right" variant="floating" collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      <TagIcon />
                      <span>Annotations</span>
                    </SidebarMenuButton>
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
