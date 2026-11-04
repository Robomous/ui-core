import { SearchInput } from "@robomous/ui-core";
import { useEffect, useState } from "react";

const still = (name: string) => `/assets/frames/${name}.svg`;

const sites = [
  { name: "Monterrey DC-2", robots: 9, image: still("dock") },
  { name: "Guadalajara DC-1", robots: 6, image: still("aisle") },
  { name: "Laredo Cross-dock", robots: 5, image: still("yard") },
  { name: "Querétaro Hub", robots: 4, image: still("floor") },
];

/** `loading` swaps the magnifier for a spinner and sets `aria-busy` while results are on their way; here every keystroke restarts a short fake request. */
export default function Loading() {
  const [query, setQuery] = useState("dc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [query]);

  const shown = sites.filter((site) =>
    site.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <SearchInput
        value={query}
        onValueChange={setQuery}
        loading={loading}
        aria-label="Search sites"
        placeholder="Search sites…"
      />
      <p role="status" className="text-muted-foreground tabular-nums">
        {loading ? "Searching sites…" : `${shown.length} ${shown.length === 1 ? "site" : "sites"}`}
      </p>
      <ul className="flex flex-col gap-1 rounded-lg border p-1" aria-busy={loading}>
        {shown.map((site) => (
          <li
            key={site.name}
            className={
              loading
                ? "flex items-center gap-3 rounded-md p-1.5 opacity-50"
                : "flex items-center gap-3 rounded-md p-1.5"
            }
          >
            <img
              src={site.image}
              alt=""
              width={32}
              height={32}
              loading="lazy"
              className="size-8 shrink-0 rounded-sm object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
            />
            <span className="font-medium">{site.name}</span>
            <span className="ml-auto text-muted-foreground tabular-nums">{site.robots} robots</span>
          </li>
        ))}
        {shown.length === 0 && (
          <li className="px-3 py-6 text-center text-muted-foreground">No sites match.</li>
        )}
      </ul>
    </div>
  );
}
