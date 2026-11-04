import { useState } from "react";
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
  cn,
} from "@robomous/ui-core";
import { CircuitBoardIcon } from "@robomous/ui-core/icons";

const FIRMWARE = [
  { id: "fw-2-4-1", title: "fw-2.4.1.bin", size: "12.6 MB" },
  { id: "fw-2-5-0", title: "fw-2.5.0-rc1.bin", size: "13.1 MB" },
];

/** `AttachmentTrigger` covers the whole card and renders `type="button"`, so the card is the hit target without any part of it becoming a link. */
export default function Trigger() {
  const [selected, setSelected] = useState(FIRMWARE[0].id);

  return (
    <div className="grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
      {FIRMWARE.map((file) => (
        <Attachment
          key={file.id}
          className={cn("w-full", selected === file.id && "ring-2 ring-ring")}
        >
          <AttachmentTrigger
            aria-pressed={selected === file.id}
            onClick={() => setSelected(file.id)}
          >
            <span className="sr-only">Select {file.title}</span>
          </AttachmentTrigger>
          <AttachmentMedia>
            <CircuitBoardIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{file.title}</AttachmentTitle>
            <AttachmentDescription>{file.size}</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      ))}
    </div>
  );
}
