import { Button, Input, Label } from "@robomous/ui-core";

/** `htmlFor` matches the control's `id`: clicking the label focuses the input, and a screen reader announces the name. */
export default function Default() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="lb-robot">Robot ID</Label>
        <div className="flex gap-2">
          <Input id="lb-robot" placeholder="rb-12" autoComplete="off" className="font-mono" />
          <Button variant="outline">Pair robot</Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="lb-site">Site</Label>
        <Input id="lb-site" placeholder="Guadalajara DC-1" />
      </div>
    </div>
  );
}
