import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@robomous/ui-core";

/** A realistic dataset table: `Table` wraps itself in an `overflow-x-auto` container, so extra columns scroll instead of squeezing the page. */
export default function Dataset() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Batch</TableHead>
          <TableHead>Camera</TableHead>
          <TableHead className="text-right">Frames</TableHead>
          <TableHead className="text-right">Annotated</TableHead>
          <TableHead className="text-right">Rejected</TableHead>
          <TableHead>Reviewer</TableHead>
          <TableHead>State</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-mono">batch-0041</TableCell>
          <TableCell className="font-mono">cam-b07</TableCell>
          <TableCell className="text-right tabular-nums">1,204</TableCell>
          <TableCell className="text-right tabular-nums">1,204</TableCell>
          <TableCell className="text-right tabular-nums">0</TableCell>
          <TableCell>a.kim</TableCell>
          <TableCell>
            <Badge variant="success">completed</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono">batch-0042</TableCell>
          <TableCell className="font-mono">cam-b08</TableCell>
          <TableCell className="text-right tabular-nums">318</TableCell>
          <TableCell className="text-right tabular-nums">296</TableCell>
          <TableCell className="text-right tabular-nums">22</TableCell>
          <TableCell>j.osei</TableCell>
          <TableCell>
            <Badge variant="warning">review pending</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono">batch-0043</TableCell>
          <TableCell className="font-mono">cam-b09</TableCell>
          <TableCell className="text-right tabular-nums">874</TableCell>
          <TableCell className="text-right tabular-nums">0</TableCell>
          <TableCell className="text-right tabular-nums">0</TableCell>
          <TableCell>m.silva</TableCell>
          <TableCell>
            <Badge variant="destructive">failed</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
