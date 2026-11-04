import { Label, RadioGroup, RadioGroupItem } from "@robomous/ui-core";

/** `disabled` on one `RadioGroupItem` removes just that option, here one the plan doesn't include; its `Label` dims with it through `peer`. Put `disabled` on the `RadioGroup` to lock them all. */
export default function Disabled() {
  return (
    <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-3 rounded-lg border p-4">
        <p className="font-medium text-muted-foreground">One option disabled</p>
        <RadioGroup defaultValue="staging" aria-label="Deployment target">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="staging" id="target-staging" />
            <Label htmlFor="target-staging">Staging endpoint</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="production" id="target-production" />
            <Label htmlFor="target-production">Production endpoint</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="edge" id="target-edge" disabled />
            <Label htmlFor="target-edge">Edge device (not on this plan)</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-3 rounded-lg border p-4">
        <p className="font-medium text-muted-foreground">Whole group disabled</p>
        <RadioGroup defaultValue="weekly" disabled aria-label="Backup schedule">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="daily" id="backup-daily" />
            <Label htmlFor="backup-daily">Daily</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="weekly" id="backup-weekly" />
            <Label htmlFor="backup-weekly">Weekly</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="never" id="backup-never" />
            <Label htmlFor="backup-never">Never</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
