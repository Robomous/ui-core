import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  Spinner,
} from "@robomous/ui-core";
import { FileSpreadsheetIcon } from "@robomous/ui-core/icons";

const files = [
  { name: "rb-07-telemetry.csv", note: "4.2 MB", state: "done" },
  { name: "rb-12-telemetry.csv", note: "9.8 MB", state: "uploading" },
  { name: "rb-03-telemetry.csv", note: "Upload failed", state: "error" },
  { name: "rb-15-telemetry.csv", note: "6.1 MB", state: "done" },
  { name: "rb-21-telemetry.csv", note: "3.7 MB", state: "done" },
] as const;

/** `AttachmentGroup` lays a batch out as one scrolling, snapping row instead of wrapping it, with a fade at the edge that still has more. */
export default function Group() {
  return (
    <AttachmentGroup className="w-full max-w-md">
      {files.map((file) => (
        <Attachment key={file.name} state={file.state}>
          <AttachmentMedia>
            {file.state === "uploading" ? <Spinner /> : <FileSpreadsheetIcon />}
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{file.name}</AttachmentTitle>
            <AttachmentDescription>{file.note}</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      ))}
    </AttachmentGroup>
  );
}
