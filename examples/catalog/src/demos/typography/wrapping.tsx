const TITLE = "Three robots failed the health check during the rollout";
const BODY =
  "The new model failed its health check on three robots, so traffic stays on the previous version for now.";

/** The same card twice, at a width that leaves the greedy wrap with an orphan in both runs: the browser's greedy wrap on the left, `text-balance` and `text-pretty` on the right. */
export default function Wrapping() {
  return (
    <div className="grid w-full max-w-xl gap-6 sm:grid-cols-2">
      {(
        [
          ["default", "", ""],
          ["text-balance · text-pretty", "text-balance", "text-pretty"],
        ] as const
      ).map(([label, title, body]) => (
        <div key={label} className="flex flex-col gap-2">
          <span className="font-mono text-[0.625rem] text-muted-foreground">{label}</span>
          <div className="flex w-60 flex-col gap-1.5 rounded-lg border p-4">
            <span className={`text-base font-semibold tracking-tight ${title}`}>{TITLE}</span>
            <span className={`text-muted-foreground ${body}`}>{BODY}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
