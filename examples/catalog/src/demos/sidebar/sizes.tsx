import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@robomous/ui-core";
import { InboxIcon } from "@robomous/ui-core/icons";

/** Three heights on the same baseline: `sm`, `default`, `lg`. */
export default function Sizes() {
  return (
    <SidebarProvider className="min-h-0 w-auto">
      <Sidebar collapsible="none" className="w-56 rounded-lg ring-1 ring-sidebar-border">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton size="sm">
                    <InboxIcon />
                    <span>Small</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton size="default">
                    <InboxIcon />
                    <span>Default</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton size="lg">
                    <InboxIcon />
                    <span>Large</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
