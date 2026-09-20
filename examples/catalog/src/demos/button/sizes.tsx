import { Button } from "@robomous/ui-core";

/** Four heights on one baseline; the small sizes step down the radius scale with them. */
export default function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}
