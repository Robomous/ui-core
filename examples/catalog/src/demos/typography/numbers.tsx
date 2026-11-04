import { useEffect, useState } from "react";

/** Two counters fed the same numbers: proportional digits make the row shiver; tabular ones hold still. */
export default function Numbers() {
  const [frames, setFrames] = useState(1184);

  useEffect(() => {
    const timer = setInterval(
      () => setFrames((n) => (n > 9800 ? 1184 : n + 1 + Math.floor(Math.random() * 37))),
      90,
    );
    return () => clearInterval(timer);
  }, []);

  const value = frames.toLocaleString("en-US");
  return (
    <div className="grid w-full max-w-md gap-6 sm:grid-cols-2">
      {(
        [
          ["proportional", ""],
          ["tabular-nums", "tabular-nums"],
        ] as const
      ).map(([label, numeric]) => (
        <div key={label} className="flex flex-col gap-2">
          <span className="font-mono text-[0.625rem] text-muted-foreground">{label}</span>
          <div className="flex items-baseline gap-1.5 rounded-lg border px-4 py-3">
            <span className={`text-2xl font-semibold tracking-tight ${numeric}`}>{value}</span>
            <span className="text-muted-foreground">frames labeled</span>
          </div>
        </div>
      ))}
    </div>
  );
}
