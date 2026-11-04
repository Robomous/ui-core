import { getCollection } from "astro:content";

export interface NavLink {
  title: string;
  href: string;
  description: string;
  /** The sidebar heading the page sits under: a component's group, or a section's. */
  group?: string;
}

export interface NavGroup {
  label: string;
  links: NavLink[];
}

export interface Nav {
  /** Every prose page in reading order, the Components index last. */
  sections: NavLink[];
  /** The prose pages under their sidebar headings: Getting started, Foundations. */
  sectionGroups: NavGroup[];
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
  Actions: ["button", "button-group", "split-button", "toggle", "toggle-group"],
  Forms: [
    "label",
    "input",
    "search-input",
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
    "filter-params",
  ],
  Navigation: ["tabs", "breadcrumb", "pagination"],
  Feedback: [
    "alert",
    "badge",
    "error",
    "progress",
    "spinner",
    "loading-dots",
    "skeleton",
    "toast",
    "empty",
  ],
  Overlays: [
    "dialog",
    "destructive-action-modal",
    "sheet",
    "drawer",
    "popover",
    "hover-card",
    "tooltip",
    "dropdown-menu",
    "context-menu",
  ],
  "Data display": ["card", "item", "table", "avatar", "attachment", "code-block", "snippet"],
  "Layout & shell": [
    "sidebar",
    "separator",
    "scroll-area",
    "accordion",
    "collapsible",
    "show-more",
    "kbd",
  ],
};

const groupOf = new Map(
  Object.entries(GROUPS).flatMap(([label, ids]) => ids.map((id) => [id, label] as const)),
);

const SECTION_GROUPS = ["Getting started", "Foundations"] as const;

/** Sections in their declared order, then the Components index; components by group. */
export async function buildNav(): Promise<Nav> {
  const pages = (await getCollection("sections"))
    .sort((a, b) => a.data.order - b.data.order)
    .map((entry) => ({
      title: entry.data.title,
      href: `/docs/${entry.id}`,
      description: plain(entry.data.description),
      group: entry.data.group,
    }));
  const index: NavLink = {
    title: "Components",
    href: "/components",
    description: "Every component, one page each.",
    group: "Getting started",
  };
  const sections = [...pages, index];
  const sectionGroups = SECTION_GROUPS.map((label) => ({
    label,
    links: sections.filter((link) => link.group === label),
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
    sections,
    sectionGroups,
    components: groups.flatMap((group) => group.links),
    groups,
  };
}

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Where a page sits, after Home: its sidebar section, the component group when
 * there is one, then the page itself. Only a crumb that is a page of its own
 * links; a group is a heading, not a place.
 */
export function crumbsFor(nav: Nav, href: string): Crumb[] {
  const component = nav.components.find((link) => link.href === href);
  if (component) {
    return [
      { label: "Components", href: "/components" },
      ...(component.group ? [{ label: component.group }] : []),
      { label: component.title },
    ];
  }
  if (href === "/components") return [{ label: "Components" }];
  const section = nav.sections.find((link) => link.href === href);
  if (section)
    return [...(section.group ? [{ label: section.group }] : []), { label: section.title }];
  return [];
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
