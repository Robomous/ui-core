import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@robomous/ui-core";
import { ChevronDownIcon } from "@robomous/ui-core/icons";

import type { Nav, NavGroup, NavLink } from "@/lib/nav";
import { pageIcon } from "@/lib/page-icons";

interface Section {
  label: string;
  /** Pages straight under the section, each with its icon. */
  links?: NavLink[];
  /** Or headed subgroups, for the components, which are many and iconless. */
  groups?: NavGroup[];
}

/**
 * The docs' left navigation: three sections that fold, divided by hairlines.
 * The one holding the current page starts open, the rest closed, so the rail
 * opens on where the reader is and the inventory stays one click away. The
 * prose pages each carry an icon; the components sit under their group
 * labels, plain, the way an index reads.
 */
export default function DocsSidebar({ nav, current }: { nav: Nav; current: string }) {
  const sections: Section[] = [
    ...nav.sectionGroups.map((group) => ({ label: group.label, links: group.links })),
    { label: "Components", groups: nav.groups },
  ];
  const holds = (section: Section) =>
    [...(section.links ?? []), ...(section.groups ?? []).flatMap((group) => group.links)].some(
      (link) => link.href === current,
    );
  const open = sections.findIndex(holds);

  return (
    <nav aria-label="Documentation" className="flex flex-col text-sm">
      {sections.map((section, index) => (
        <Collapsible
          key={section.label}
          defaultOpen={index === (open === -1 ? 0 : open)}
          className="border-b px-3 py-2"
        >
          <CollapsibleTrigger className="group/section flex h-9 w-full items-center justify-between rounded-md px-3 font-medium text-foreground transition-colors outline-none hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring/30">
            {section.label}
            <ChevronDownIcon
              aria-hidden="true"
              className="size-4 text-muted-foreground transition-transform duration-200 ease-out group-data-[state=open]/section:rotate-180"
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <div className="pt-1 pb-2">
              {section.links && <Links links={section.links} current={current} icons />}
              {section.groups?.map((group) => (
                // A category reads above its pages by ink and weight, not
                // size: the label is the foreground in medium small caps,
                // the pages the muted ink, and they hang from a guide rule
                // so where one category ends is plain at a glance.
                <div key={group.label} className="pt-4 first:pt-2">
                  <p className="px-3 pb-1.5 text-xs font-medium tracking-[0.06em] text-foreground uppercase">
                    {group.label}
                  </p>
                  <Links links={group.links} current={current} nested />
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </nav>
  );
}

function Links({
  links,
  current,
  icons = false,
  nested = false,
}: {
  links: NavLink[];
  current: string;
  icons?: boolean;
  nested?: boolean;
}) {
  return (
    <ul className={nested ? "ml-3 flex flex-col gap-0.5 border-l pl-1.5" : "flex flex-col gap-0.5"}>
      {links.map((link) => {
        const Icon = pageIcon(link.href);
        return (
          <li key={link.href}>
            <a
              href={link.href}
              aria-current={link.href === current ? "page" : undefined}
              className="flex h-8 items-center gap-2.5 rounded-md px-3 text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:bg-muted aria-[current=page]:font-medium aria-[current=page]:text-foreground"
            >
              {icons && <Icon aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.75} />}
              <span className="truncate">{link.title}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
