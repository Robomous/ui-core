import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// No `site`/`base` yet: the site is built in CI and served locally; a deploy
// target sets both when it exists.
export default defineConfig({
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
    // The package is a workspace link; one React for it and for the islands.
    resolve: { dedupe: ["react", "react-dom"] },
  },
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    },
  },
});
