import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@robomous/ui-core";
import { CloudIcon, DatabaseIcon, HardDriveIcon } from "@robomous/ui-core/icons";

/** `variant="outline"` rings a menu button with `--sidebar-border` instead of filling it on hover, for an item that reads as a control. */
export default function Outline() {
  return (
    <SidebarProvider persist={false} keyboardShortcut={false} className="min-h-0 w-auto">
      <Sidebar collapsible="none" className="w-64 rounded-lg ring-1 ring-sidebar-border">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>outline</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton variant="outline">
                    <DatabaseIcon />
                    <span className="font-mono">s3://vision-exports</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton variant="outline" isActive>
                    <CloudIcon />
                    <span className="font-mono">gcs://fleet-logs</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton variant="outline">
                    <HardDriveIcon />
                    <span className="font-mono">nas://lab-archive</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>default</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <DatabaseIcon />
                    <span className="font-mono">s3://vision-exports</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <CloudIcon />
                    <span className="font-mono">gcs://fleet-logs</span>
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
