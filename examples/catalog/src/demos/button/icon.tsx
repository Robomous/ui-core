import { Button } from "@robomous/ui-core";
import { RefreshCwIcon } from "@robomous/ui-core/icons";

const sizes = [
  { text: "xs", icon: "icon-xs" },
  { text: "sm", icon: "icon-sm" },
  { text: "default", icon: "icon" },
  { text: "lg", icon: "icon-lg" },
] as const;

/** Square sizes for a bare icon, each as tall as its text sibling. The label moves to `aria-label`. */
export default function Icon() {
  return (
    <div className="flex w-fit items-end gap-8">
      {sizes.map(({ text, icon }) => (
        <div key={icon} className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size={text}>
              Refresh
            </Button>
            <Button variant="outline" size={icon} aria-label={`Refresh telemetry, ${text}`}>
              <RefreshCwIcon />
            </Button>
          </div>
          <span className="text-muted-foreground">{icon}</span>
        </div>
      ))}
    </div>
  );
}
