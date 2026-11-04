import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@robomous/ui-core";

const members = [
  {
    name: "Lena Fischer",
    initials: "LF",
    image: "/assets/people/lena-fischer.svg",
    role: "Owner",
  },
  { name: "Ravi Shah", initials: "RS", image: "/assets/people/ravi-shah.svg", role: "Admin" },
  {
    name: "Sofia Brennan",
    initials: "SB",
    image: "/assets/people/sofia-brennan.svg",
    role: "Annotator",
  },
];

/** `CardContent` is where a `Table` usually lives: the card's own padding stays out of the table's cells. */
export default function WithTable() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Members</CardTitle>
        <CardDescription>People with access to this workspace.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.name}>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar size="sm">
                      <AvatarImage src={member.image} alt="" />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    {member.name}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="quiet">{member.role}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
