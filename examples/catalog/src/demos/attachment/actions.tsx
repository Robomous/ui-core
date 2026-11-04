import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@robomous/ui-core";
import { DownloadIcon, FileArchiveIcon, FileJsonIcon, Trash2Icon } from "@robomous/ui-core/icons";

const exports = [
  { name: "coco-export-0412.json", note: "18.2 MB, exported 4 min ago", icon: FileJsonIcon },
  { name: "yolo-export-0412.zip", note: "42.7 MB, exported 4 min ago", icon: FileArchiveIcon },
];

/** `AttachmentActions` holds the card's own controls, lifted above the trigger layer so each stays its own hit target. */
export default function Actions() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      {exports.map(({ name, note, icon: Icon }) => (
        <Attachment key={name} className="w-full">
          <AttachmentMedia>
            <Icon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{name}</AttachmentTitle>
            <AttachmentDescription>{note}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label={`Download ${name}`}>
              <DownloadIcon />
            </AttachmentAction>
            <AttachmentAction aria-label={`Delete ${name}`}>
              <Trash2Icon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
    </div>
  );
}
