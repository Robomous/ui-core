import { useState } from "react";
import {
  Separator,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@robomous/ui-core";
import { FolderIcon, InboxIcon, SettingsIcon } from "@robomous/ui-core/icons";

/**
 * `collapsible="icon"` renders the panel `position: fixed`, the way it behaves in a
 * real app shell, so the wrapper below carries `contain-layout`: that gives the fixed
 * panel a containing block other than the browser viewport, and it stays inside this
 * card instead of pinning itself to the window. `⌘/Ctrl+B` does the same toggle as the
 * button, and the choice it leaves behind is read back from the `sidebar_state` cookie.
 */
export default function Collapsing() {
  const [open, setOpen] = useState(true);

  return (
    <div className="h-[22rem] w-full max-w-xl overflow-hidden rounded-lg contain-layout ring-1 ring-sidebar-border">
      <SidebarProvider open={open} onOpenChange={setOpen} className="h-full min-h-0 w-full">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      <InboxIcon />
                      <span>Review queue</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <FolderIcon />
                      <span>Datasets</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <SettingsIcon />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <div className="flex h-12 items-center gap-2 border-b px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />
            <span className="text-sm font-medium">org/model-base</span>
          </div>
          <div className="p-4 text-sm text-muted-foreground">
            The rail along the panel&apos;s edge toggles it too.
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
