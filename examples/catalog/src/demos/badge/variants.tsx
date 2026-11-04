import { Badge } from "@robomous/ui-core";

/** All ten variants in two groups: plain hierarchy, then the status roles that carry a meaning. */
export default function Variants() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-3">
        <span className="text-muted-foreground">Hierarchy</span>
        <div className="flex flex-wrap gap-2">
          <Badge>default</Badge>
          <Badge variant="secondary">secondary</Badge>
          <Badge variant="outline">outline</Badge>
          <Badge variant="quiet">quiet</Badge>
          <Badge variant="ghost">ghost</Badge>
          <Badge variant="link">link</Badge>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-muted-foreground">Status</span>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">success</Badge>
          <Badge variant="info">info</Badge>
          <Badge variant="warning">warning</Badge>
          <Badge variant="destructive">destructive</Badge>
        </div>
      </div>
    </div>
  );
}
