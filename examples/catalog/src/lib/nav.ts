import { getCollection } from "astro:content";

export interface NavLink {
  title: string;
  href: string;
  description: string;
}

export interface Nav {
  sections: NavLink[];
  components: NavLink[];
}

/** Sections in their declared order, then the Components index; components alphabetically. */
export async function buildNav(): Promise<Nav> {
  const sections = (await getCollection("sections"))
    .sort((a, b) => a.data.order - b.data.order)
    .map((entry) => ({
      title: entry.data.title,
      href: `/docs/${entry.id}`,
      description: plain(entry.data.description),
    }));
  const components = (await getCollection("components"))
    .sort((a, b) => a.data.title.localeCompare(b.data.title))
    .map((entry) => ({
      title: entry.data.title,
      href: `/components/${entry.id}`,
      description: plain(entry.data.description),
    }));
  return {
    sections: [
      ...sections,
      { title: "Components", href: "/components", description: "Every component, one page each." },
    ],
    components,
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
