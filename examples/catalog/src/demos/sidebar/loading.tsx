import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
  SidebarSeparator,
} from "@robomous/ui-core";

/** `SidebarMenuSkeleton` stands in for a row before its label is known; `showIcon` reserves space for the icon that will land once it does. */
export default function Loading() {
  return (
    <SidebarProvider className="min-h-0 w-auto">
      <Sidebar collapsible="none" className="w-56 rounded-lg ring-1 ring-sidebar-border">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Datasets</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {Array.from({ length: 3 }).map((_, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuSkeleton showIcon />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Cameras</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {Array.from({ length: 2 }).map((_, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuSkeleton />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
