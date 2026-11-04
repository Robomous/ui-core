import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@robomous/ui-core";

const person = (slug: string) => `/assets/people/${slug}.svg`;

const daniel = { name: "Daniel Okafor", initials: "DO", image: person("daniel-okafor") };
const mei = { name: "Mei Tanaka", initials: "MT", image: person("mei-tanaka") };

const runs = [
  {
    id: "run-0419",
    model: "detector-v3.2",
    epoch: "38 / 60",
    map: "0.712",
    loss: "0.241",
    node: "gpu-node-03",
    started: "Oct 28, 14:32",
    owner: daniel,
    state: "info",
    label: "running",
  },
  {
    id: "run-0412",
    model: "detector-v3.1",
    epoch: "60 / 60",
    map: "0.694",
    loss: "0.268",
    node: "gpu-node-01",
    started: "Oct 24, 09:10",
    owner: daniel,
    state: "success",
    label: "completed",
  },
  {
    id: "run-0409",
    model: "segmenter-v1.4",
    epoch: "12 / 40",
    map: "0.634",
    loss: "NaN",
    node: "gpu-node-02",
    started: "Oct 22, 16:45",
    owner: mei,
    state: "destructive",
    label: "diverged",
  },
] as const;

/** A realistic training-runs table: `Table` is its own bordered `overflow-x-auto` frame, so extra columns scroll inside it instead of squeezing the page. */
export default function Dataset() {
  return (
    <div className="w-full max-w-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Run</TableHead>
            <TableHead>Model</TableHead>
            <TableHead className="text-right">Epoch</TableHead>
            <TableHead className="text-right">mAP@50</TableHead>
            <TableHead className="text-right">Val loss</TableHead>
            <TableHead>GPU node</TableHead>
            <TableHead>Started</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>State</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {runs.map((run) => (
            <TableRow key={run.id}>
              <TableCell className="font-mono">{run.id}</TableCell>
              <TableCell className="font-mono">{run.model}</TableCell>
              <TableCell className="text-right tabular-nums">{run.epoch}</TableCell>
              <TableCell className="text-right tabular-nums">{run.map}</TableCell>
              <TableCell className="text-right tabular-nums">{run.loss}</TableCell>
              <TableCell className="font-mono">{run.node}</TableCell>
              <TableCell className="tabular-nums">{run.started}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar size="sm">
                    <AvatarImage src={run.owner.image} alt="" />
                    <AvatarFallback>{run.owner.initials}</AvatarFallback>
                  </Avatar>
                  {run.owner.name}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={run.state}>{run.label}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
