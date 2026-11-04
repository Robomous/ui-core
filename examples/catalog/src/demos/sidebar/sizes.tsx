import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@robomous/ui-core";
import { ActivityIcon, ArchiveIcon } from "@robomous/ui-core/icons";

/** Three heights, each tagged with its name: `sm` for dense lists, `default` for navigation, `lg` for a two-line row such as the signed-in person. */
export default function Sizes() {
  return (
    <SidebarProvider persist={false} keyboardShortcut={false} className="min-h-0 w-auto">
      <Sidebar collapsible="none" className="w-64 rounded-lg ring-1 ring-sidebar-border">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu button sizes</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton size="sm">
                    <ArchiveIcon />
                    <span>Archived runs</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>sm</SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton size="default">
                    <ActivityIcon />
                    <span>Training runs</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>default</SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton size="lg">
                    <Avatar>
                      <AvatarImage src="/assets/people/sofia-brennan.svg" alt="" />
                      <AvatarFallback>SB</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left leading-tight">
                      <span className="truncate font-medium">Sofia Brennan</span>
                      <span className="truncate text-sidebar-foreground/70">Ops lead</span>
                    </div>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>lg</SidebarMenuBadge>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
