import { Badge } from "@robomous/ui-core";

/** All ten variants: plain hierarchy plus the five-role status vocabulary. */
export default function Variants() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>default</Badge>
      <Badge variant="secondary">secondary</Badge>
      <Badge variant="destructive">destructive</Badge>
      <Badge variant="success">success</Badge>
      <Badge variant="warning">warning</Badge>
      <Badge variant="info">info</Badge>
      <Badge variant="quiet">quiet</Badge>
      <Badge variant="outline">outline</Badge>
      <Badge variant="ghost">ghost</Badge>
      <Badge variant="link">link</Badge>
    </div>
  );
}
