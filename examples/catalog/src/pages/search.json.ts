import type { APIRoute } from "astro";

import { buildNav } from "@/lib/nav";

/** The page index the search palette in the header filters. */
export const GET: APIRoute = async () => {
  const nav = await buildNav();
  const entries = [
    ...nav.sections.map((link) => ({ ...link, group: "Sections" })),
    ...nav.components.map((link) => ({ ...link, group: "Components" })),
  ];
  return new Response(JSON.stringify(entries), {
    headers: { "Content-Type": "application/json" },
  });
};
