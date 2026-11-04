import { Badge } from "@robomous/ui-core";

// Literal class strings per role, because Tailwind reads source text: a class
// built at runtime from the role name is a rule the build never emitted.
const ROLES = [
  {
    role: "success",
    badge: "Online",
    dot: ["bg-success", "Docked"],
    ink: ["text-success", "All 14 robots healthy"],
  },
  {
    role: "warning",
    badge: "Low battery",
    dot: ["bg-warning", "Recalibrating"],
    ink: ["text-warning", "3 frames dropped"],
  },
  {
    role: "info",
    badge: "Queued",
    dot: ["bg-info", "Syncing"],
    ink: ["text-info", "Starts at 02:00"],
  },
  {
    role: "destructive",
    badge: "Failed",
    dot: ["bg-destructive", "Offline"],
    ink: ["text-destructive", "Ingest stopped"],
  },
] as const;

/** One role, three weights: a chip, a dot beside a word, and a run of text. Every one of them carries a word, so colour is never the only signal. */
export default function Status() {
  return (
    <table className="w-full max-w-lg text-left">
      <thead>
        <tr className="font-mono text-[0.625rem] text-muted-foreground">
          <th className="pb-3 font-normal">role</th>
          <th className="pb-3 font-normal">Badge</th>
          <th className="pb-3 font-normal">dot</th>
          <th className="pb-3 font-normal">text-*</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {ROLES.map(({ role, badge, dot, ink }) => (
          <tr key={role}>
            <th
              scope="row"
              className="py-2.5 pr-4 font-mono text-[0.625rem] font-normal text-muted-foreground"
            >
              {role}
            </th>
            <td className="py-2.5 pr-4">
              <Badge variant={role}>{badge}</Badge>
            </td>
            <td className="py-2.5 pr-4">
              <span className="flex items-center gap-2">
                <span className={`size-1.5 shrink-0 rounded-full ${dot[0]}`} aria-hidden="true" />
                {dot[1]}
              </span>
            </td>
            <td className={`py-2.5 ${ink[0]}`}>{ink[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
