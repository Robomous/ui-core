import {
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

/** `CardContent` is where a `Table` usually lives: the card's own padding stays out of the table's cells. */
export default function WithTable() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Cameras</CardTitle>
        <CardDescription>Feed health by device.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono">cam-b07</TableCell>
              <TableCell>
                <Badge variant="success">online</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono">cam-b08</TableCell>
              <TableCell>
                <Badge variant="destructive">offline</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
