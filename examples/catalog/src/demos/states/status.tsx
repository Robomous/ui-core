import { Fragment } from "react";

import { Badge } from "@robomous/ui-core";

// Literal class strings per role, because Tailwind reads source text: a class
// built at runtime from the role name is a rule the build never emitted.
const ROLES = [
  { role: "success", label: "ingesting", dot: "bg-success", ink: "text-success" },
  { role: "warning", label: "recalibrating", dot: "bg-warning", ink: "text-warning" },
  { role: "info", label: "queued", dot: "bg-info", ink: "text-info" },
  { role: "destructive", label: "failed", dot: "bg-destructive", ink: "text-destructive" },
] as const;

/** The same four roles read as a chip, a solid dot and inline ink: colour is never the only signal. */
export default function Status() {
  return (
    <div className="grid w-full grid-cols-[6rem_1fr] items-center gap-x-6 gap-y-4 text-sm">
      {ROLES.map(({ role, label, dot, ink }) => (
        <Fragment key={role}>
          <span className="text-muted-foreground">{role}</span>
          <div className="flex flex-wrap items-center gap-4">
            <Badge variant={role}>{label}</Badge>
            <span className="flex items-center gap-2">
              <span className={`size-2 rounded-full ${dot}`} aria-hidden="true" />
              status dot
            </span>
            <span className={ink}>inline {role} text</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
