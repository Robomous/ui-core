/**
 * `@robomous/ui-core/icons` — the icon set the components draw from, re-exported.
 *
 * The components are iconed with lucide-react, and a product that draws its own icons from the
 * same set should not have to declare, and keep in step, a second copy of the dependency. So the
 * whole of lucide-react is available here, at the version this package ships with:
 *
 * ```ts
 * import { CheckIcon, type LucideIcon } from "@robomous/ui-core/icons";
 * ```
 *
 * It is a subpath, not part of the main entry, for two reasons. Five lucide names — `Badge`,
 * `Command`, `Sheet`, `Sidebar`, `Table` — are also components here, so the two surfaces cannot
 * share a namespace. And the main entry is listed name by name so it can be read in one file,
 * which six thousand icons would end. Prefer the `…Icon` spelling (`TableIcon`, not `Table`); it
 * is what the components use and it cannot be mistaken for one of them.
 *
 * lucide-react has no side effects, so an import of one icon bundles one icon.
 */
export * from "lucide-react";
