import { Button, SearchInput } from "@robomous/ui-core";
import { SparklesIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

const suggestions = ["Forklift near a person", "Empty shelf", "Blocked aisle"];

const frames = [
  { id: "frame-004812", still: "aisle" },
  { id: "frame-011390", still: "aisle-2" },
  { id: "frame-017206", still: "aisle-night" },
];

/** `icon` replaces the magnifier, for a search that works differently: an assistant that takes a question instead of keywords. */
export default function CustomIcon() {
  const [query, setQuery] = useState("Forklift near a person");

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <SearchInput
        icon={<SparklesIcon aria-hidden />}
        value={query}
        onValueChange={setQuery}
        aria-label="Ask about pallet-detection"
        placeholder="Describe the frames you are looking for…"
      />
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground">Try</span>
        {suggestions.map((suggestion) => (
          <Button key={suggestion} variant="outline" size="xs" onClick={() => setQuery(suggestion)}>
            {suggestion}
          </Button>
        ))}
      </div>
      {query ? (
        <div className="flex flex-col gap-2">
          <p role="status" className="text-muted-foreground tabular-nums">
            3 of 18,204 frames in pallet-detection
          </p>
          <div className="grid grid-cols-3 gap-2">
            {frames.map((frame) => (
              <figure key={frame.id} className="flex flex-col gap-1">
                <img
                  src={`/assets/frames/${frame.still}.svg`}
                  alt=""
                  width={160}
                  height={90}
                  loading="lazy"
                  className="aspect-video w-full rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
                />
                <figcaption className="font-mono text-muted-foreground">{frame.id}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
