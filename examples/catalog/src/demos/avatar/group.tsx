import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@robomous/ui-core";

const person = (slug: string) => `/assets/people/${slug}.svg`;

const rows = [
  {
    batch: "Batch 0412",
    size: "lg",
    note: <code>lg</code>,
    annotators: [
      { initials: "SB", slug: "sofia-brennan" },
      { initials: "MT", slug: "mei-tanaka" },
      { initials: "JW", slug: "jonas-weber" },
    ],
  },
  {
    batch: "Batch 0413",
    size: "default",
    note: "default",
    annotators: [
      { initials: "HK", slug: "hannah-kim" },
      { initials: "AB", slug: "aisha-bello" },
      { initials: "RS", slug: "ravi-shah" },
    ],
  },
  {
    batch: "Batch 0414",
    size: "sm",
    note: "sm, for a table cell",
    annotators: [
      { initials: "AD", slug: "amara-diallo" },
      { initials: "MR", slug: "mateo-ruiz" },
      { initials: "LF", slug: "lena-fischer" },
    ],
  },
] as const;

/** `AvatarGroupCount` reads the group's size, so the overflow count lines up with the avatars at every size. */
export default function Group() {
  return (
    <div className="grid w-full max-w-md grid-cols-[auto_1fr] items-center gap-x-4 gap-y-5">
      {rows.map(({ batch, size, note, annotators }) => (
        <div key={batch} className="col-span-2 grid grid-cols-subgrid items-center">
          <AvatarGroup>
            {annotators.map(({ initials, slug }) => (
              <Avatar key={initials} size={size}>
                <AvatarImage src={person(slug)} alt="" />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+4</AvatarGroupCount>
          </AvatarGroup>
          <div className="flex flex-col">
            <span className="font-medium">{batch}</span>
            <span className="text-muted-foreground">
              <span className="tabular-nums">7</span> annotators, {note}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
