import { Button } from "@robomous/ui-core";

/** Six variants, one intent each; `default` is the page's single primary action. */
export default function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>Save changes</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="secondary">Duplicate</Button>
      <Button variant="ghost">Rename</Button>
      <Button variant="destructive">Delete dataset</Button>
      <Button variant="link">Read the docs</Button>
    </div>
  );
}
