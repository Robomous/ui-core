import { Input, Label } from "@robomous/ui-core";

/** The label is a flex row with a gap, so a marker or a hint is one more child. Mark the exception: `*` when most fields are optional, muted text when most are required. */
export default function Required() {
  return (
    <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-4 rounded-lg border p-4">
        <p className="font-medium text-muted-foreground">Mostly optional: mark required</p>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lb-req-model">
            Model name
            <span aria-hidden className="text-destructive">
              *
            </span>
          </Label>
          <Input id="lb-req-model" placeholder="detector-v3.2" required className="font-mono" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lb-req-note">Release note</Label>
          <Input id="lb-req-note" placeholder="Retrained on Q3 shelves" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lb-req-owner">Owner</Label>
          <Input id="lb-req-owner" placeholder="Daniel Okafor" />
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-lg border p-4">
        <p className="font-medium text-muted-foreground">Mostly required: mark optional</p>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lb-req-site">Site</Label>
          <Input id="lb-req-site" placeholder="Monterrey DC-2" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lb-req-shift">Shift lead</Label>
          <Input id="lb-req-shift" placeholder="María López" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lb-req-contact">
            On-call phone
            <span className="font-normal text-muted-foreground">Optional</span>
          </Label>
          <Input id="lb-req-contact" type="tel" placeholder="+52 81 5550 0142" />
        </div>
      </div>
    </div>
  );
}
