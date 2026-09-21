import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentMedia,
  AttachmentTitle,
} from "@robomous/ui-core";
import { XIcon } from "lucide-react";

const FRAME_PREVIEW = "/placeholder-frame.svg";

/** `variant="image"` fills the media slot with the attachment's own thumbnail instead of an icon. */
export default function ImageMedia() {
  return (
    <Attachment orientation="vertical" className="w-32">
      <AttachmentMedia variant="image">
        <img src={FRAME_PREVIEW} alt="Warehouse camera frame preview" />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>frame-0417.png</AttachmentTitle>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove frame-0417.png">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  );
}
