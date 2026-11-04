import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
} from "@robomous/ui-core";
import { useState } from "react";

const person = (slug: string) => `/assets/people/${slug}.svg`;

const ACTORS = [
  { name: "Sofia Brennan", initials: "SB", image: person("sofia-brennan") },
  { name: "Hannah Kim", initials: "HK", image: person("hannah-kim") },
  { name: "Daniel Okafor", initials: "DO", image: person("daniel-okafor") },
];
const ACTIONS = [
  "Exported batch to COCO",
  "Rotated an API key",
  "Approved a review",
  "Invited a member",
];
const EVENTS = Array.from({ length: 125 }, (_, i) => ({
  id: `evt-${4128 - i}`,
  actor: ACTORS[i % ACTORS.length],
  action: ACTIONS[i % ACTIONS.length],
}));

/** `TablePagination` is a `<tfoot>`: the range on the left, the pager on the right. */
export default function Pagination() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pageCount = Math.ceil(EVENTS.length / pageSize);
  const rows = EVENTS.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="w-full max-w-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Actor</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-mono">{event.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar size="sm">
                    <AvatarImage src={event.actor.image} alt="" />
                    <AvatarFallback>{event.actor.initials}</AvatarFallback>
                  </Avatar>
                  {event.actor.name}
                </div>
              </TableCell>
              <TableCell>{event.action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TablePagination
          colSpan={3}
          page={page}
          pageCount={pageCount}
          pageSize={pageSize}
          total={EVENTS.length}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
        />
      </Table>
    </div>
  );
}
