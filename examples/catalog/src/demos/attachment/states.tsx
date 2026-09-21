import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  Spinner,
} from "@robomous/ui-core";
import { FileIcon } from "lucide-react";

/** Every part styles off `state`: dashed and quiet while idle, a spinner mid-upload, a shimmering title while processing, and a plain settled `done`. */
export default function States() {
  return (
    <div className="flex flex-wrap gap-3">
      <Attachment state="idle">
        <AttachmentMedia variant="icon">
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Drop a batch</AttachmentTitle>
        </AttachmentContent>
      </Attachment>
      <Attachment state="uploading">
        <AttachmentMedia variant="icon">
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>frames-03.tar</AttachmentTitle>
          <AttachmentDescription>1.2 GB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="processing">
        <AttachmentMedia variant="icon">
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>batch-0044.zip</AttachmentTitle>
          <AttachmentDescription>Extracting frames</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="error">
        <AttachmentMedia variant="icon">
          <FileIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>broken.zip</AttachmentTitle>
          <AttachmentDescription>Upload failed</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="done">
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
