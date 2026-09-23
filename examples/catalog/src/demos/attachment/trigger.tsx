import { useState } from "react";
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@robomous/ui-core";
import { FileIcon } from "@robomous/ui-core/icons";

const FILES = [
  { id: "batch-0041", title: "batch-0041.zip", size: "311.9 MB" },
  { id: "batch-0042", title: "batch-0042.zip", size: "289.4 MB" },
];

/** `AttachmentTrigger` covers the whole card and renders `type="button"`, so the card is the hit target without any part of it becoming a link. */
export default function Trigger() {
  const [selected, setSelected] = useState(FILES[0].id);

  return (
    <div className="flex flex-wrap gap-3">
      {FILES.map((file) => (
        <Attachment key={file.id} className={selected === file.id ? "ring-2 ring-ring" : undefined}>
          <AttachmentTrigger
            aria-pressed={selected === file.id}
            onClick={() => setSelected(file.id)}
          >
            <span className="sr-only">Select {file.title}</span>
          </AttachmentTrigger>
          <AttachmentMedia variant="icon">
            <FileIcon />
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
