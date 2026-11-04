import { LoadingDots } from "@robomous/ui-core";

const sizes = [
  { size: 3, type: "caption", className: "text-[0.625rem]", label: "Queued for export" },
  { size: 4, type: "body", className: "text-xs", label: "Syncing telemetry" },
  { size: 6, type: "heading", className: "text-base font-medium", label: "Preparing workspace" },
];

/** `size` is the dot diameter in px: each step sits beside the type it was drawn for. */
export default function Default() {
  return (
    <dl className="grid w-fit grid-cols-[auto_auto] items-center gap-x-8 gap-y-5">
      {sizes.map(({ size, type, className, label }) => (
        <div key={size} className="contents">
          <dt className="font-mono text-[0.625rem] text-muted-foreground tabular-nums">
            {size}px · {type}
          </dt>
          <dd>
            <LoadingDots size={size === 4 ? undefined : size} className={className}>
              {label}
            </LoadingDots>
          </dd>
        </div>
      ))}
    </dl>
  );
}
