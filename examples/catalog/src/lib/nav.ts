import { getCollection } from "astro:content";

export interface NavLink {
  title: string;
  href: string;
  description: string;
  /** The component's group, for a component page; sections have none. */
  group?: string;
}

export interface NavGroup {
  label: string;
  links: NavLink[];
}

export interface Nav {
  sections: NavLink[];
  /** Every component, in group order and alphabetically inside each group. */
  components: NavLink[];
  groups: NavGroup[];
}

/*
 * The groups are for finding things, the same ones the design file's inventory
 * uses; they change no name and imply no hierarchy. Every component page must
 * appear here exactly once — a new page without a group fails the build rather
 * than landing somewhere arbitrary.
 */
const GROUPS: Record<string, string[]> = {
  Actions: ["button", "button-group", "toggle", "toggle-group"],
  Forms: [
    "label",
    "input",
    "textarea",
    "input-group",
    "field",
    "radio-group",
    "checkbox",
    "switch",
    "slider",
    "select",
    "combobox",
    "command",
  ],
  Navigation: ["tabs", "breadcrumb", "pagination"],
  Feedback: ["alert", "badge", "progress", "spinner", "skeleton", "sonner", "empty"],
  Overlays: [
    "dialog",
    "sheet",
    "drawer",
    "popover",
    "hover-card",
    "tooltip",
    "dropdown-menu",
    "context-menu",
  ],
  "Data display": ["card", "item", "table", "avatar", "attachment"],
  "Layout & shell": ["sidebar", "separator", "scroll-area", "accordion", "collapsible", "kbd"],
};

const groupOf = new Map(
  Object.entries(GROUPS).flatMap(([label, ids]) => ids.map((id) => [id, label] as const)),
);

/** The group a component page sits in, by its id. */
export function groupFor(id: string): string | undefined {
  return groupOf.get(id);
}

/** Sections in their declared order, then the Components index; components by group. */
export async function buildNav(): Promise<Nav> {
  const sections = (await getCollection("sections"))
    .sort((a, b) => a.data.order - b.data.order)
    .map((entry) => ({
      title: entry.data.title,
      href: `/docs/${entry.id}`,
      description: plain(entry.data.description),
    }));
  const entries = await getCollection("components");
  const groups = Object.keys(GROUPS).map((label) => ({ label, links: [] as NavLink[] }));
  for (const entry of entries) {
    const label = groupOf.get(entry.id);
    if (!label) throw new Error(`Component page "${entry.id}" has no group in src/lib/nav.ts.`);
    groups
      .find((group) => group.label === label)!
      .links.push({
        title: entry.data.title,
        href: `/components/${entry.id}`,
        description: plain(entry.data.description),
        group: label,
      });
  }
  for (const group of groups) group.links.sort((a, b) => a.title.localeCompare(b.title));
  return {
    sections: [
      ...sections,
      { title: "Components", href: "/components", description: "Every component, one page each." },
    ],
    components: groups.flatMap((group) => group.links),
    groups,
  };
}

/** The page before and after `href` in reading order: sections, then components. */
export function neighbours(nav: Nav, href: string): { prev?: NavLink; next?: NavLink } {
  const all = [...nav.sections, ...nav.components];
  const index = all.findIndex((link) => link.href === href);
  if (index === -1) return {};
  return { prev: all[index - 1], next: all[index + 1] };
}

/** Frontmatter descriptions mark code with backticks; nav, search and meta tags want plain text. */
export function plain(text: string): string {
  return text.replaceAll("`", "");
}

/** A pathname without its trailing slash, so `/components/button/` matches its link. */
export function normalise(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}
