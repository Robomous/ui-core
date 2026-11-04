import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@robomous/ui-core";
import { CircleHelpIcon } from "@robomous/ui-core/icons";

const versions = [
  { name: "v3.0", map: 0.62 },
  { name: "v3.1", map: 0.68 },
  { name: "v3.2", map: 0.71 },
];

/** A trigger on the card's trailing edge opens with `align="end"`, so the popover grows inward instead of off the page. */
export default function Align() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Mean average precision</CardTitle>
        <CardDescription>detector-v3.2 on the validation set</CardDescription>
        <CardAction>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="About this metric">
                <CircleHelpIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-64">
              <PopoverHeader>
                <PopoverTitle>mAP@0.5</PopoverTitle>
                <PopoverDescription>
                  The average precision across classes, counting a detection as correct when it
                  overlaps the label by at least half.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-end justify-between gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-3xl font-semibold tracking-tight tabular-nums">0.71</span>
          <span className="text-muted-foreground tabular-nums">+0.03 vs v3.1</span>
        </div>
        <ul className="flex h-14 items-end gap-3" aria-label="mAP by model version">
          {versions.map((version, index) => (
            <li key={version.name} className="flex flex-col items-center gap-1">
              <span
                className={
                  index === versions.length - 1
                    ? "w-8 rounded-sm bg-foreground"
                    : "w-8 rounded-sm bg-muted"
                }
                style={{ height: `${version.map * 56}px` }}
              />
              <span className="text-[10px] text-muted-foreground">{version.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
