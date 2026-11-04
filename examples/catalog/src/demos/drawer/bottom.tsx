import {
  Badge,
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Field,
  FieldGroup,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  toast,
} from "@robomous/ui-core";
import { FlagIcon } from "@robomous/ui-core/icons";

const robots = [
  { id: "rb-07", name: "Atlas", image: "/assets/robots/atlas.svg" },
  { id: "rb-12", name: "Kestrel", image: "/assets/robots/kestrel.svg" },
  { id: "rb-19", name: "Orca", image: "/assets/robots/orca.svg" },
];

/** The default direction: a drag handle sits above the content, and any DrawerClose dismisses it. */
export default function Bottom() {
  return (
    <div className="flex w-full max-w-md items-center gap-3 rounded-xl border bg-card p-2.5 pr-3">
      <img
        src="/assets/robots/atlas.svg"
        alt=""
        loading="lazy"
        className="size-14 shrink-0 rounded-lg object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex items-center gap-2 text-sm font-medium">
          <span>
            <span className="font-mono">rb-07</span> Atlas
          </span>
          <Badge variant="quiet">Idle</Badge>
        </span>
        <span className="truncate text-muted-foreground tabular-nums">
          Aisle 14 · idle for 4 min · Battery 71%
        </span>
      </div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            <FlagIcon data-icon="inline-start" />
            Report
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto flex w-full max-w-sm flex-col">
            <DrawerHeader>
              <DrawerTitle>Report a problem</DrawerTitle>
              <DrawerDescription>Tell the fleet team what the robot did.</DrawerDescription>
            </DrawerHeader>
            <FieldGroup className="px-4">
              <Field>
                <FieldLabel htmlFor="drawer-bottom-robot">Robot</FieldLabel>
                <Select defaultValue="rb-07">
                  <SelectTrigger id="drawer-bottom-robot" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {robots.map((robot) => (
                      <SelectItem key={robot.id} value={robot.id}>
                        <img
                          src={robot.image}
                          alt=""
                          className="size-5 rounded-sm object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
                        />
                        {robot.id} · {robot.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="drawer-bottom-notes">What happened</FieldLabel>
                <Textarea
                  id="drawer-bottom-notes"
                  placeholder="It stopped in Aisle 14 and did not dock."
                />
              </Field>
            </FieldGroup>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button onClick={() => toast.success("Report sent to the fleet team")}>
                  Send report
                </Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
