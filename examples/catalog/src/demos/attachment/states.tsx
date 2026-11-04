import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  Spinner,
} from "@robomous/ui-core";
import { FileArchiveIcon } from "@robomous/ui-core/icons";

/** Every part styles off `state`: dashed and quiet while idle, a spinner mid-upload, a shimmering title while processing, and a plain settled `done`. */
export default function States() {
  return (
    <div className="grid w-full max-w-md grid-cols-[5.5rem_1fr] items-center gap-x-4 gap-y-3">
      <span className="font-mono text-xs text-muted-foreground">idle</span>
      <Attachment state="idle" className="w-full">
        <AttachmentMedia>
          <FileArchiveIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Drop a batch</AttachmentTitle>
        </AttachmentContent>
      </Attachment>
      <span className="font-mono text-xs text-muted-foreground">uploading</span>
      <Attachment state="uploading" className="w-full">
        <AttachmentMedia>
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>frames-03.tar</AttachmentTitle>
          <AttachmentDescription>1.2 GB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <span className="font-mono text-xs text-muted-foreground">processing</span>
      <Attachment state="processing" className="w-full">
        <AttachmentMedia>
          <FileArchiveIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>batch-0044.zip</AttachmentTitle>
          <AttachmentDescription>Extracting frames</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <span className="font-mono text-xs text-muted-foreground">error</span>
      <Attachment state="error" className="w-full">
        <AttachmentMedia>
          <FileArchiveIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>frames-02.tar</AttachmentTitle>
          <AttachmentDescription>Upload failed</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <span className="font-mono text-xs text-muted-foreground">done</span>
      <Attachment state="done" className="w-full">
        <AttachmentMedia>
          <FileArchiveIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>batch-0041.zip</AttachmentTitle>
          <AttachmentDescription>311.9 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </div>
  );
}
