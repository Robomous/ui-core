import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@robomous/ui-core";
import { BoxIcon } from "@robomous/ui-core/icons";

/** `default`, `sm` and `xs` step the padding, media and corner radius down together, for one card in a form, a list and a composer. */
export default function Sizes() {
  return (
    <div className="grid w-full max-w-md grid-cols-[4.5rem_1fr] items-center gap-x-4 gap-y-4">
      {(["default", "sm", "xs"] as const).map((size) => (
        <div key={size} className="contents">
          <span className="font-mono text-xs text-muted-foreground">{size}</span>
          <Attachment size={size}>
            <AttachmentMedia>
              <BoxIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>detector-v3.2.pt</AttachmentTitle>
              <AttachmentDescription>86.4 MB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        </div>
      ))}
    </div>
  );
}
