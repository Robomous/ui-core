import { Badge, Button } from "@robomous/ui-core";

/** A count rides inside the label it belongs to; `tabular-nums` keeps the width steady as it changes. */
export default function Counts() {
  return (
    <div className="flex w-fit gap-2 rounded-xl border p-2">
      <Button variant="secondary" size="sm">
        Review queue
        <Badge variant="default" className="tabular-nums">
          24
        </Badge>
      </Button>
      <Button variant="ghost" size="sm">
        Failed frames
        <Badge variant="destructive" className="tabular-nums">
          3
        </Badge>
      </Button>
      <Button variant="ghost" size="sm">
        Archived
        <Badge variant="quiet" className="tabular-nums">
          118
        </Badge>
      </Button>
    </div>
  );
}
