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
} from "@robomous/ui-core";

import type { Nav, NavLink } from "@/lib/nav";

/** The docs' left navigation: the package's own Sidebar, pinned open. */
export default function DocsSidebar({ nav, current }: { nav: Nav; current: string }) {
  return (
    <SidebarProvider className="min-h-0 w-auto">
      <Sidebar collapsible="none" className="w-full bg-transparent">
        <SidebarContent className="gap-5 py-6">
          <Group label="Getting started" links={nav.sections} current={current} />
          {nav.groups.map((group) => (
            <Group key={group.label} label={group.label} links={group.links} current={current} />
          ))}
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}

function Group({ label, links, current }: { label: string; links: NavLink[]; current: string }) {
  return (
    <SidebarGroup className="p-0">
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {links.map((link) => {
            const active = link.href === current;
            return (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton asChild isActive={active} size="sm">
                  <a href={link.href} aria-current={active ? "page" : undefined}>
                    {link.title}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
