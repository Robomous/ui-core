import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@robomous/ui-core";

const RANGES = [
  { value: "1h", label: "Last hour" },
  { value: "24h", label: "Last 24 hours" },
  { value: "7d", label: "Last 7 days" },
];

/** `default` for a form field, `sm` for a toolbar or table header where rows are tight. */
export default function Sizes() {
  return (
    <div className="grid w-full max-w-sm grid-cols-[4rem_1fr] items-center gap-x-4 gap-y-5">
      <code className="text-muted-foreground">default</code>
      <Select defaultValue="24h">
        <SelectTrigger className="w-full" aria-label="Alert window, default size">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {RANGES.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <code className="text-muted-foreground">sm</code>
      <Select defaultValue="24h">
        <SelectTrigger size="sm" className="w-full" aria-label="Alert window, small size">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {RANGES.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
