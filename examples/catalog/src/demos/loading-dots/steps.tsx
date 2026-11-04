import { LoadingDots } from "@robomous/ui-core";
import { CircleCheckIcon, CircleDotIcon, CircleIcon } from "@robomous/ui-core/icons";

const steps = [
  { label: "Validate model", state: "done" },
  { label: "Push to Monterrey DC-2", state: "active" },
  { label: "Warm up robots", state: "pending" },
] as const;

const icons = {
  done: <CircleCheckIcon className="size-3.5 text-success" aria-hidden />,
  active: <CircleDotIcon className="size-3.5 text-foreground" aria-hidden />,
  pending: <CircleIcon className="size-3.5 text-muted-foreground/60" aria-hidden />,
};

/** A multi-step job: only the step in flight gets the dots, so the eye finds it at once. */
export default function Steps() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4 rounded-xl border p-4">
      <div className="flex items-baseline justify-between">
        <span className="font-medium">Deploying detector-v3.2</span>
        <span className="text-muted-foreground tabular-nums">2 of 3</span>
      </div>
      <ol className="flex flex-col gap-2.5">
        {steps.map(({ label, state }) => (
          <li key={label} className="flex items-center gap-2.5">
            {icons[state]}
            {state === "active" ? (
              <LoadingDots>{label}</LoadingDots>
            ) : (
              <span className={state === "pending" ? "text-muted-foreground" : undefined}>
                {label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
