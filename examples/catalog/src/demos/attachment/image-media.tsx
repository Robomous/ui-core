import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@robomous/ui-core";
import { XIcon } from "@robomous/ui-core/icons";

const frames = [
  {
    name: "dock-a.jpg",
    note: "2.1 MB",
    src: "/assets/frames/dock.svg",
    alt: "Dock A: four roll-up doors, staged pallets and two workers",
    state: "done",
  },
  {
    name: "aisle-14.jpg",
    note: "1.8 MB",
    src: "/assets/frames/aisle.svg",
    alt: "Aisle 14: a forklift and a worker in a yellow vest between the racks",
    state: "done",
  },
  {
    name: "bay-b11.jpg",
    note: "Uploading…",
    src: "/assets/frames/floor.svg",
    alt: "Bay B11 from above: pallet slots and a forklift in the travel lane",
    state: "uploading",
  },
] as const;

/** `variant="image"` fills the media slot with a thumbnail; vertical cards in a row make a gallery of the frames about to be attached. */
export default function ImageMedia() {
  return (
    <div className="flex w-fit gap-3">
      {frames.map(({ name, note, src, alt, state }) => (
        <Attachment key={name} state={state} orientation="vertical" className="w-32">
          <AttachmentMedia variant="image">
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className="outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
            />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{name}</AttachmentTitle>
            <AttachmentDescription>{note}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction variant="secondary" aria-label={`Remove ${name}`}>
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
    </div>
  );
}
