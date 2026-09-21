import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@robomous/ui-core";

/** `TableCaption` sits below the table in muted text, for the one line of context a heading would overstate. */
export default function Caption() {
  return (
    <Table>
      <TableCaption>Annotation counts for the last seven days.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Class</TableHead>
          <TableHead className="text-right">Instances</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>forklift</TableCell>
          <TableCell className="text-right tabular-nums">8,204</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>pallet-jack</TableCell>
          <TableCell className="text-right tabular-nums">2,116</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
