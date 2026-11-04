import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@robomous/ui-core";
import { FileCodeIcon, XIcon } from "@robomous/ui-core/icons";

/** `vertical` stacks the media above the content and floats `AttachmentActions` over its corner, the shape a thumbnail grid wants. */
export default function Orientation() {
  return (
    <div className="flex w-fit items-start gap-10">
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-muted-foreground">horizontal</span>
        <Attachment orientation="horizontal">
          <AttachmentMedia>
            <FileCodeIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>coco-export.json</AttachmentTitle>
            <AttachmentDescription>18.2 MB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove coco-export.json">
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="font-mono text-xs text-muted-foreground">vertical</span>
        <Attachment orientation="vertical">
          <AttachmentMedia>
            <FileCodeIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>yolo-labels.zip</AttachmentTitle>
            <AttachmentDescription>6.4 MB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction variant="secondary" aria-label="Remove yolo-labels.zip">
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      </div>
    </div>
  );
}
