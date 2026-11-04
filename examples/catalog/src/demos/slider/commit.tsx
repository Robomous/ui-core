import { Label, Slider } from "@robomous/ui-core";
import { useState } from "react";

const TOTAL = 1840;

/** `onValueChange` fires on every step of a drag; `onValueCommit` fires once, on release, for work that is costly. */
export default function Commit() {
  const [draft, setDraft] = useState([70]);
  const [applied, setApplied] = useState(70);
  // Stand-in for a server query: a stricter threshold keeps fewer detections.
  const pending = Math.round(TOTAL * (1 - applied / 100) ** 1.4);

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border p-5">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Label id="review-threshold-label">Auto-approve above</Label>
          <span className="font-medium tabular-nums">{draft[0]}%</span>
        </div>
        <Slider
          aria-labelledby="review-threshold-label"
          value={draft}
          onValueChange={setDraft}
          onValueCommit={([value]) => setApplied(value)}
          step={5}
        />
        <p className="text-muted-foreground">
          Batch 41 of pallet-detection, scored by detector-v3.2. The counts update on release.
        </p>
      </div>
      <dl className="grid grid-cols-2 gap-3 border-t pt-4 tabular-nums">
        <div className="flex flex-col gap-0.5">
          <dt className="text-muted-foreground">Auto-approved</dt>
          <dd className="text-sm font-medium">{(TOTAL - pending).toLocaleString("en-US")}</dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="text-muted-foreground">Needs a reviewer</dt>
          <dd className="text-sm font-medium">{pending.toLocaleString("en-US")}</dd>
        </div>
      </dl>
    </div>
  );
}
