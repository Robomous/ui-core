// Every demo's source text, keyed by its path, read by Vite at build time.
// The demo file is what a reader copies, so the file is the code sample.
const sources = import.meta.glob<string>("/src/demos/**/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
});

/** The source of `src/demos/<demo>.tsx` without its leading doc comment. */
export function demoSource(demo: string): string {
  const raw = sources[`/src/demos/${demo}.tsx`];
  if (raw === undefined) {
    throw new Error(
      `No demo at src/demos/${demo}.tsx. A <Preview demo="..."> names a file under src/demos/.`,
    );
  }
  return stripDoc(raw);
}

/** Drops the first doc-comment block: the demo's one-line note, shown in prose instead. */
export function stripDoc(source: string): string {
  return source.replace(/\/\*\*[\s\S]*?\*\/\r?\n/, "").trim();
}
