import {
  Badge,
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
import { ActivityIcon, DatabaseIcon, RocketIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

const runs = [
  { id: "run-0419", epoch: "42 / 120", map: "0.713", status: "running", tone: "info" },
  { id: "run-0412", epoch: "120 / 120", map: "0.702", status: "finished", tone: "success" },
  { id: "run-0405", epoch: "37 / 120", map: "0.488", status: "failed", tone: "destructive" },
] as const;

/** `collapsible="icon"` keeps the icons; `tooltip` on each button names it while collapsed. The trigger and the rail toggle it. */
export default function Collapsing() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-[18rem] w-full max-w-2xl overflow-hidden rounded-lg border contain-layout">
      <SidebarProvider
        persist={false}
        keyboardShortcut={false}
        open={open}
        onOpenChange={setOpen}
        className="h-full min-h-0 w-full"
      >
        <Sidebar collapsible="icon" className="h-full">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive tooltip="Training runs">
                      <ActivityIcon />
                      <span>Training runs</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Checkpoints">
                      <DatabaseIcon />
                      <span>Checkpoints</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Endpoints">
                      <RocketIcon />
                      <span>Endpoints</span>
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
            <Separator orientation="vertical" className="h-4 data-vertical:self-center" />
            <span className="font-mono text-sm font-medium">detector-v3.2</span>
            <Badge variant="quiet" className="ml-auto">
              {open ? "Expanded" : "Collapsed to icons"}
            </Badge>
          </div>
          <div className="flex flex-col gap-3 p-4">
            <span className="text-sm font-medium">Training runs</span>
            <ul className="flex flex-col divide-y rounded-lg border">
              {runs.map(({ id, epoch, map, status, tone }) => (
                <li key={id} className="flex items-center gap-3 px-3 py-2">
                  <span className="font-mono">{id}</span>
                  <span className="ml-auto text-muted-foreground tabular-nums">
                    epoch {epoch} · mAP {map}
                  </span>
                  <Badge variant={tone} className="w-[4.5rem] justify-center">
                    {status}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
