import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Progress,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@robomous/ui-core";
import {
  ActivityIcon,
  BotIcon,
  BoxIcon,
  ChevronsUpDownIcon,
  DatabaseIcon,
  RocketIcon,
  RouteIcon,
} from "@robomous/ui-core/icons";

const platform = [
  { label: "Datasets", icon: DatabaseIcon },
  { label: "Models", icon: BoxIcon },
  { label: "Training runs", icon: ActivityIcon, active: true },
  { label: "Deployments", icon: RocketIcon },
];

const fleet = [
  { label: "Robots", icon: BotIcon },
  { label: "Missions", icon: RouteIcon },
];

const samples = [
  {
    src: "/assets/frames/dock.svg",
    caption: "cam-b07 · Dock A",
    box: { left: 31.2, top: 46.2, width: 6.9, height: 30.1 },
  },
  {
    src: "/assets/frames/aisle.svg",
    caption: "cam-a12 · Aisle 14",
    box: { left: 51, top: 36.2, width: 4.2, height: 15.1 },
  },
  {
    src: "/assets/frames/yard.svg",
    caption: "cam-y03 · Yard",
    box: { left: 54.1, top: 73, width: 20.6, height: 7.3 },
  },
];

/** An app shell: site switcher in the header, labelled groups with an active item and badges, the signed-in person in the footer, and the page beside it. */
export default function Overview() {
  return (
    <div className="h-[26rem] w-full max-w-3xl overflow-hidden rounded-lg border contain-layout">
      <SidebarProvider className="h-full min-h-0">
        <Sidebar collapsible="icon" className="h-full">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" tooltip="Monterrey DC-2">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                    <BotIcon />
                  </div>
                  <div className="grid flex-1 text-left leading-tight">
                    <span className="truncate font-medium">Robomous</span>
                    <span className="truncate text-sidebar-foreground/70">Monterrey DC-2</span>
                  </div>
                  <ChevronsUpDownIcon className="ml-auto" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Platform</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {platform.map(({ label, icon: Icon, active }) => (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton isActive={active} tooltip={label}>
                        <Icon />
                        <span>{label}</span>
                      </SidebarMenuButton>
                      {label === "Training runs" ? <SidebarMenuBadge>3</SidebarMenuBadge> : null}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Fleet</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {fleet.map(({ label, icon: Icon }) => (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton tooltip={label}>
                        <Icon />
                        <span>{label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" tooltip="Sofia Brennan">
                  <Avatar>
                    <AvatarImage src="/assets/people/sofia-brennan.svg" alt="" />
                    <AvatarFallback>SB</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left leading-tight">
                    <span className="truncate font-medium">Sofia Brennan</span>
                    <span className="truncate text-sidebar-foreground/70">Ops lead</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 items-center gap-2 border-b px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4 data-vertical:self-center" />
            <span className="text-sm font-medium">Training runs</span>
          </header>
          <div className="flex flex-col gap-4 p-4">
            <div className="flex items-start gap-3">
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate font-mono text-sm">detector-v3.2 · run-0419</span>
                <span className="text-muted-foreground">
                  pallet-detection · started 2h ago by Daniel Okafor
                </span>
              </div>
              <Badge variant="info">running</Badge>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Progress</span>
                <span className="tabular-nums">Epoch 42 of 120</span>
              </div>
              <Progress value={35} aria-label="Run progress" />
            </div>
            <dl className="grid grid-cols-3 gap-3">
              {[
                ["mAP", "0.713"],
                ["Loss", "0.241"],
                ["GPU", "A100 · 87%"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-0.5 rounded-lg border p-3">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="text-sm font-medium tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="grid grid-cols-3 gap-3">
              {samples.map(({ src, caption, box }) => (
                <figure key={src} className="flex flex-col gap-1.5">
                  <div className="relative overflow-hidden rounded-md">
                    <img
                      src={src}
                      alt=""
                      className="aspect-video w-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
                    />
                    <div
                      className="absolute rounded-xs border-2 border-info"
                      style={{
                        left: `${box.left}%`,
                        top: `${box.top}%`,
                        width: `${box.width}%`,
                        height: `${box.height}%`,
                      }}
                    />
                  </div>
                  <figcaption className="truncate text-muted-foreground">{caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
