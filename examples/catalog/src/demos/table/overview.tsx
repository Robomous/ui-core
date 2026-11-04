import {
  Badge,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableFrame,
  TableFrameHeader,
  TableFrameTitle,
  TableHead,
  TableHeader,
  TableRow,
} from "@robomous/ui-core";
import {
  BatteryMediumIcon,
  BotIcon,
  CalendarCheckIcon,
  TagIcon,
  UserIcon,
} from "@robomous/ui-core/icons";
import { useState } from "react";

const robots = [
  {
    id: "rb-07",
    name: "Atlas",
    state: "info",
    label: "Running",
    battery: 82,
    technician: "Tom Becker",
    seen: "4 min ago",
  },
  {
    id: "rb-12",
    name: "Kestrel",
    state: "info",
    label: "Running",
    battery: 41,
    technician: "Lucas Moreau",
    seen: "1 min ago",
  },
  {
    id: "rb-19",
    name: "Orca",
    state: "success",
    label: "Completed",
    battery: 96,
    technician: "Mateo Ruiz",
    seen: "12 min ago",
  },
  {
    id: "rb-03",
    name: "Nopal",
    state: "quiet",
    label: "Paused",
    battery: 58,
    technician: "Hannah Kim",
    seen: "3 h ago",
  },
  {
    id: "rb-22",
    name: "Heron",
    state: "info",
    label: "Running",
    battery: 67,
    technician: "Sofia Brennan",
    seen: "now",
  },
  {
    id: "rb-15",
    name: "Tule",
    state: "quiet",
    label: "Offline",
    battery: 0,
    technician: "Tom Becker",
    seen: "2 days ago",
  },
] as const;

/** A fleet monitor: `TableFrame` holds the table on a muted tray under its title and a status line; the header labels lead with icons, and status reads as a tinted badge at the cell's size. */
export default function Overview() {
  const [selected, setSelected] = useState<string[]>([]);
  const all = selected.length === robots.length;

  return (
    <TableFrame className="max-w-3xl">
      <TableFrameHeader>
        <TableFrameTitle>Fleet monitor</TableFrameTitle>
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-1.5 rounded-full bg-current" />2 robots need attention
          today
        </span>
      </TableFrameHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                aria-label="Select all robots"
                className="rounded-full"
                checked={all ? true : selected.length > 0 ? "indeterminate" : false}
                onCheckedChange={(checked) =>
                  setSelected(checked === true ? robots.map((robot) => robot.id) : [])
                }
              />
            </TableHead>
            <TableHead>
              <BotIcon />
              Robot
            </TableHead>
            <TableHead>
              <TagIcon />
              Status
            </TableHead>
            <TableHead>
              <BatteryMediumIcon />
              Battery
            </TableHead>
            <TableHead>
              <UserIcon />
              Technician
            </TableHead>
            <TableHead>
              <CalendarCheckIcon />
              Last seen
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {robots.map((robot) => {
            const checked = selected.includes(robot.id);
            return (
              <TableRow key={robot.id} data-state={checked ? "selected" : undefined}>
                <TableCell>
                  <Checkbox
                    aria-label={`Select ${robot.name}`}
                    className="rounded-full"
                    checked={checked}
                    onCheckedChange={(value) =>
                      setSelected((current) =>
                        value === true
                          ? [...current, robot.id]
                          : current.filter((id) => id !== robot.id),
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  {robot.name} <span className="font-mono text-muted-foreground">{robot.id}</span>
                </TableCell>
                <TableCell>
                  <Badge variant={robot.state}>{robot.label}</Badge>
                </TableCell>
                <TableCell className="tabular-nums">
                  {robot.battery > 0 ? `${robot.battery}%` : "n/a"}
                </TableCell>
                <TableCell>{robot.technician}</TableCell>
                <TableCell className="text-muted-foreground">{robot.seen}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableFrame>
  );
}
