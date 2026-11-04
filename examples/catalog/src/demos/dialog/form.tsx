import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from "@robomous/ui-core";
import { UserPlusIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

const members = [
  {
    name: "Sofia Brennan",
    initials: "SB",
    role: "Annotation lead",
    access: "Admin",
    photo: "/assets/people/sofia-brennan.svg",
  },
  {
    name: "Jonas Weber",
    initials: "JW",
    role: "QA analyst",
    access: "Annotator",
    photo: "/assets/people/jonas-weber.svg",
  },
  {
    name: "Amara Diallo",
    initials: "AD",
    role: "Customer success",
    access: "Viewer",
    photo: "/assets/people/amara-diallo.svg",
  },
];

/** Wrap the content in a form, own `open`, and close it yourself once the submit succeeds. */
export default function Form() {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex flex-col">
          <span className="text-sm font-medium">Team</span>
          <span className="text-muted-foreground tabular-nums">3 people can label and review</span>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <UserPlusIcon data-icon="inline-start" />
              Invite member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <form
              className="grid gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                const email = new FormData(event.currentTarget).get("email");
                setOpen(false);
                toast.success(`Invite sent to ${email}`);
              }}
            >
              <DialogHeader>
                <DialogTitle>Invite a member</DialogTitle>
                <DialogDescription>They get an email to join your organization.</DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="dlg-invite-email">Email</FieldLabel>
                  <Input
                    id="dlg-invite-email"
                    name="email"
                    type="email"
                    required
                    placeholder="daniel@robomous.example"
                    aria-describedby="dlg-invite-hint"
                  />
                  <FieldDescription id="dlg-invite-hint">Use their work address.</FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="dlg-invite-role">Role</FieldLabel>
                  <Select name="role" defaultValue="annotator">
                    <SelectTrigger id="dlg-invite-role" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="annotator">Annotator</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Send invite</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <ul className="divide-y border-t">
        {members.map((member) => (
          <li key={member.name} className="flex items-center gap-3 px-4 py-2.5">
            <Avatar>
              <AvatarImage src={member.photo} alt="" />
              <AvatarFallback>{member.initials}</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium">{member.name}</span>
              <span className="truncate text-muted-foreground">{member.role}</span>
            </div>
            <Badge variant="quiet">{member.access}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}
