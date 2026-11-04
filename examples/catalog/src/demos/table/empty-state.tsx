import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@robomous/ui-core";
import { CalendarPlusIcon } from "@robomous/ui-core/icons";

/** An empty result set stays inside the table: one row, spanning every column, carries the message. */
export default function EmptyState() {
  return (
    <div className="w-full max-w-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mission</TableHead>
            <TableHead>Robot</TableHead>
            <TableHead>Zone</TableHead>
            <TableHead>Starts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={4} className="py-8 text-center">
              <div className="flex flex-col items-center gap-3">
                <p className="text-muted-foreground">No missions are scheduled for this site.</p>
                <Button variant="outline" size="sm">
                  <CalendarPlusIcon data-icon="inline-start" />
                  Schedule a mission
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
