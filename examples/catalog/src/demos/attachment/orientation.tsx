import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@robomous/ui-core";
import { FileIcon, XIcon } from "@robomous/ui-core/icons";

/** `vertical` stacks the media above the content and floats `AttachmentActions` over its corner, the shape a thumbnail grid wants. */
export default function Orientation() {
  return (
    <div className="flex flex-wrap items-start gap-3">
      <Attachment orientation="horizontal">
        <AttachmentMedia variant="icon">
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>batch-0041.zip</AttachmentTitle>
          <AttachmentDescription>311.9 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment orientation="vertical">
        <AttachmentMedia variant="icon">
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>batch-0041.zip</AttachmentTitle>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove batch-0041.zip">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  );
}
