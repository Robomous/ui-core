import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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
  BotIcon,
  ChevronsUpDownIcon,
  MoreHorizontalIcon,
  PlusIcon,
  RouteIcon,
  WrenchIcon,
} from "@robomous/ui-core/icons";

/** Header input, a group with an action, an active item with a badge, a hover action with a sub-menu, and the signed-in person in the footer. */
export default function Anatomy() {
  return (
    <SidebarProvider persist={false} keyboardShortcut={false} className="min-h-0 w-auto">
      <Sidebar collapsible="none" className="h-[26rem] w-64 rounded-lg ring-1 ring-sidebar-border">
        <SidebarHeader>
          <SidebarInput placeholder="Search robots, e.g. rb-07" aria-label="Search robots" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Fleet</SidebarGroupLabel>
            <SidebarGroupAction title="Add robot">
              <PlusIcon />
              <span className="sr-only">Add robot</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <RouteIcon />
                    <span>Missions</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>12</SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <BotIcon />
                    <span>Robots</span>
                  </SidebarMenuButton>
                  <SidebarMenuAction showOnHover title="More">
                    <MoreHorizontalIcon />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#on-mission" isActive>
                        On mission · 9
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#charging">Charging · 3</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <WrenchIcon />
                    <span>Maintenance</span>
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
                <Avatar>
                  <AvatarImage src="/assets/people/sofia-brennan.svg" alt="" />
                  <AvatarFallback>SB</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-medium">Sofia Brennan</span>
                  <span className="truncate text-sidebar-foreground/70">Ops lead · Monterrey</span>
                </div>
                <ChevronsUpDownIcon className="ml-auto" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
