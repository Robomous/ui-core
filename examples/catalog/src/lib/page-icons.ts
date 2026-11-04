import {
  BookOpenIcon,
  ComponentIcon,
  FileTextIcon,
  LayersIcon,
  LayoutGridIcon,
  type LucideIcon,
  MousePointerClickIcon,
  PackageIcon,
  PaletteIcon,
  TypeIcon,
} from "@robomous/ui-core/icons";

/*
 * The prose pages are few and each says something different, so each gets an
 * icon of its own, shared by the sidebar and the search palette. Component
 * pages are many and read as one kind of thing, so they share one.
 */
const SECTION_ICONS: Record<string, LucideIcon> = {
  "/docs/introduction": BookOpenIcon,
  "/docs/installation": PackageIcon,
  "/components": LayoutGridIcon,
  "/docs/colors": PaletteIcon,
  "/docs/typography": TypeIcon,
  "/docs/materials": LayersIcon,
  "/docs/states": MousePointerClickIcon,
};

/** The icon a page wears in the navigation and the search palette. */
export function pageIcon(href: string): LucideIcon {
  if (href.startsWith("/components/")) return ComponentIcon;
  return SECTION_ICONS[href] ?? FileTextIcon;
}
