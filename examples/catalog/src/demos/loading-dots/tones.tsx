import { LoadingDots } from "@robomous/ui-core";

const tones = [
  { className: "text-muted-foreground", label: "Syncing telemetry" },
  { className: "text-foreground", label: "Waiting for first frame" },
  { className: "text-info", label: "Training run-0419" },
  { className: "text-warning", label: "Reconnecting to rb-12" },
];

/** The dots are `currentColor`, so a text colour on the wrapper tints the label and the dots together. */
export default function Tones() {
  return (
    <dl className="grid w-fit grid-cols-[auto_auto] items-center gap-x-8 gap-y-4">
      {tones.map(({ className, label }) => (
        <div key={className} className="contents">
          <dt className="font-mono text-[0.625rem] text-muted-foreground">{className}</dt>
          <dd>
            <LoadingDots className={className}>{label}</LoadingDots>
          </dd>
        </div>
      ))}
    </dl>
  );
}
