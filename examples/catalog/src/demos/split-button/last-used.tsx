import { DropdownMenuRadioGroup, DropdownMenuRadioItem, SplitButton } from "@robomous/ui-core";
import { DownloadIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

const formats = ["COCO JSON", "YOLO TXT", "Pascal VOC"] as const;

/** The menu picks a format and the primary button remembers it, so the next export is one click. */
export default function LastUsed() {
  const [format, setFormat] = useState<(typeof formats)[number]>("COCO JSON");

  return (
    <div className="flex w-full max-w-md items-center justify-between gap-4 rounded-lg border p-3">
      <div className="flex items-center gap-3">
        <img
          src="/assets/frames/dock-2.svg"
          alt=""
          loading="lazy"
          className="size-10 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">pallet-detection</span>
          <span className="text-muted-foreground tabular-nums">18,204 frames · 41 batches</span>
        </div>
      </div>
      <SplitButton
        variant="outline"
        icon={<DownloadIcon data-icon="inline-start" />}
        label={`Export ${format}`}
        menuLabel="Choose export format"
        menuAlign="end"
      >
        <DropdownMenuRadioGroup
          value={format}
          onValueChange={(value) => setFormat(value as (typeof formats)[number])}
        >
          {formats.map((name) => (
            <DropdownMenuRadioItem key={name} value={name}>
              {name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </SplitButton>
    </div>
  );
}
