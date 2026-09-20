import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@robomous/ui-core";
import { FileIcon } from "lucide-react";

/** `default`, `sm` and `xs` step the padding and text down together; `xs` also tightens the corner radius. */
export default function Sizes() {
  return (
    <div className="flex flex-wrap items-start gap-3">
      <Attachment size="default">
        <AttachmentMedia variant="icon">
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>batch-0041.zip</AttachmentTitle>
          <AttachmentDescription>311.9 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment size="sm">
        <AttachmentMedia variant="icon">
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>batch-0041.zip</AttachmentTitle>
          <AttachmentDescription>311.9 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment size="xs">
        <AttachmentMedia variant="icon">
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>batch-0041.zip</AttachmentTitle>
          <AttachmentDescription>311.9 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </div>
  );
}
