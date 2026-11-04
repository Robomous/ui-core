import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldLabel,
  Input,
  toast,
} from "@robomous/ui-core";
import { LinkIcon, ShareIcon } from "@robomous/ui-core/icons";

const link = "https://app.robomous.example/datasets/pallet-detection";

const people = [
  {
    name: "Hannah Kim",
    initials: "HK",
    role: "Owner",
    photo: "/assets/people/hannah-kim.svg",
  },
  {
    name: "Daniel Okafor",
    initials: "DO",
    role: "Editor",
    photo: "/assets/people/daniel-okafor.svg",
  },
  {
    name: "Mei Tanaka",
    initials: "MT",
    role: "Viewer",
    photo: "/assets/people/mei-tanaka.svg",
  },
];

/** A dataset header whose Share action opens a short, focused dialog: who has access, and a link. */
export default function Overview() {
  return (
    <div className="flex w-full max-w-md items-center gap-3 rounded-xl border bg-card p-2.5 pr-3">
      <img
        src="/assets/frames/dock.svg"
        alt=""
        className="size-14 shrink-0 rounded-lg object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate font-mono text-sm font-medium">pallet-detection</span>
        <span className="text-muted-foreground tabular-nums">
          18,204 frames · 41 batches · Updated Oct 28
        </span>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <ShareIcon data-icon="inline-start" />
            Share
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share pallet-detection</DialogTitle>
            <DialogDescription>
              Anyone with access can view frames and annotations.
            </DialogDescription>
          </DialogHeader>
          <ul className="flex flex-col gap-3">
            {people.map((person) => (
              <li key={person.name} className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={person.photo} alt="" />
                  <AvatarFallback>{person.initials}</AvatarFallback>
                </Avatar>
                <span className="flex-1 truncate text-sm font-medium">{person.name}</span>
                <Badge variant={person.role === "Owner" ? "secondary" : "quiet"}>
                  {person.role}
                </Badge>
              </li>
            ))}
          </ul>
          <Field>
            <FieldLabel htmlFor="dlg-overview-link">Link</FieldLabel>
            <Input id="dlg-overview-link" readOnly value={link} className="font-mono" />
          </Field>
          <DialogFooter showCloseButton>
            <Button
              onClick={() => {
                void navigator.clipboard?.writeText(link);
                toast.success("Link copied");
              }}
            >
              <LinkIcon data-icon="inline-start" />
              Copy link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
