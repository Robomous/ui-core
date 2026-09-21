import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
} from "@robomous/ui-core";
import {
  FolderIcon,
  InboxIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

/**
 * `useSidebar` throws outside a `SidebarProvider`, so every composition starts there.
 * `collapsible="none"` and a fixed height keep the panel inline instead of pinned to
 * the viewport, which is what `offcanvas` and `icon` do — the Collapsing section shows
 * that mode instead, contained a different way.
 */
export default function Anatomy() {
  return (
    <SidebarProvider className="min-h-0 w-auto">
      <Sidebar collapsible="none" className="h-[26rem] w-56 rounded-lg ring-1 ring-sidebar-border">
        <SidebarHeader>
          <SidebarInput placeholder="Search" aria-label="Search" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupAction title="Add dataset">
              <PlusIcon />
              <span className="sr-only">Add dataset</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <InboxIcon />
                    <span>Review queue</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>12</SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FolderIcon />
                    <span>Datasets</span>
                  </SidebarMenuButton>
                  <SidebarMenuAction showOnHover title="More">
                    <MoreHorizontalIcon />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#training" isActive>
                        Training
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#validation">Validation</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
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
        <SidebarSeparator />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <UserIcon />
                <span>Signed in</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
