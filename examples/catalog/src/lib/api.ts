import type { ComponentApi } from "../../scripts/extract-api";

export type { ApiPart, ApiProp, ComponentApi } from "../../scripts/extract-api";

// Written by scripts/extract-api.ts before `astro dev` and inside `docs:check`.
const files = import.meta.glob<ComponentApi>("/src/generated/api/*.json", {
  eager: true,
  import: "default",
});

/** The generated API of `src/components/<slug>.tsx`, or a build error naming the fix. */
export function componentApi(slug: string): ComponentApi {
  const api = files[`/src/generated/api/${slug}.json`];
  if (!api) {
    throw new Error(
      `No generated API for "${slug}". Run \`pnpm api\` in examples/catalog ` +
        "(node scripts/extract-api.ts); `astro dev` and `pnpm docs:check` run it for you.",
    );
  }
  return api;
}
