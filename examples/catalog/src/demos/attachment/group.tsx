import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  Spinner,
} from "@robomous/ui-core";
import { FileIcon } from "@robomous/ui-core/icons";

/** `AttachmentGroup` lays a batch of uploads out as a horizontally scrolling, snapping row instead of wrapping them. */
export default function Group() {
  return (
    <AttachmentGroup className="w-full max-w-md">
      <Attachment state="done">
        <AttachmentMedia variant="icon">
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>batch-0041.zip</AttachmentTitle>
          <AttachmentDescription>311.9 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="uploading">
        <AttachmentMedia variant="icon">
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>batch-0042.zip</AttachmentTitle>
          <AttachmentDescription>1.1 GB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="error">
        <AttachmentMedia variant="icon">
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>batch-0043.zip</AttachmentTitle>
          <AttachmentDescription>Upload failed</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </AttachmentGroup>
  );
}
