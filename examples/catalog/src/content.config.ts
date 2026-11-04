import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

/** The library a component's behaviour comes from, with where to read about it. */
const builtOn = z.object({
  name: z.string(),
  docsUrl: z.url(),
  apiUrl: z.url().optional(),
});

// Prose pages. `group` is the sidebar heading they sit under — the two
// pages that get a reader started, then the foundations every component
// resolves through — and `order` their place across both groups, which is
// also the reading order the previous/next links follow.
const sections = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/sections" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    group: z.enum(["Getting started", "Foundations"]),
    order: z.number().int(),
  }),
});

// One page per component. The id is the file name, which is the component's
// file name in src/components/ and the key of its generated API JSON.
const components = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/components" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    builtOn: z.array(builtOn).min(1),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { sections, components };
