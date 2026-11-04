import { LoadingDots } from "@robomous/ui-core";
import { RadioTowerIcon, RocketIcon, UploadIcon } from "@robomous/ui-core/icons";

const jobs = [
  { Icon: RadioTowerIcon, label: "Syncing telemetry", elapsed: "0:04" },
  { Icon: UploadIcon, label: "Uploading 312 frames", elapsed: "1:12" },
  { Icon: RocketIcon, label: "Deploying detector-v3.2", elapsed: "2:38" },
];

/** The label names the work in flight; the dots only say it is still going. */
export default function WithText() {
  return (
    <ul className="flex w-full max-w-xs flex-col divide-y rounded-xl border">
      {jobs.map(({ Icon, label, elapsed }) => (
        <li key={label} className="flex items-center gap-3 px-4 py-3">
          <Icon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
          <LoadingDots>{label}</LoadingDots>
          <span className="ml-auto font-mono text-[0.625rem] text-muted-foreground tabular-nums">
            {elapsed}
          </span>
        </li>
      ))}
    </ul>
  );
}
