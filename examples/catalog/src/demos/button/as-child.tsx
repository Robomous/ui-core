import { Button } from "@robomous/ui-core";

/** `asChild` hands the classes to the child, so a link looks like a button and stays a link. */
export default function AsChild() {
  return (
    <Button asChild variant="outline">
      <a href="/components">Browse components</a>
    </Button>
  );
}
