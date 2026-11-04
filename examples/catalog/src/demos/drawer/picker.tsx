import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Label,
} from "@robomous/ui-core";
import { CheckIcon, ChevronsUpDownIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

const sites = [
  {
    name: "Monterrey DC-2",
    detail: "14 robots online",
    frame: "/assets/frames/dock.svg",
  },
  {
    name: "Guadalajara Hub",
    detail: "6 robots online",
    frame: "/assets/frames/conveyor-2.svg",
  },
  {
    name: "Laredo Cross-dock",
    detail: "9 robots online",
    frame: "/assets/frames/yard.svg",
  },
  {
    name: "Querétaro Hub",
    detail: "3 robots online",
    frame: "/assets/frames/floor.svg",
  },
];

/** On a phone a picker belongs at the thumb: each row is a DrawerClose, so choosing also dismisses. */
export default function Picker() {
  const [name, setName] = useState(sites[0].name);
  const site = sites.find((candidate) => candidate.name === name) ?? sites[0];
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>Fleet view</CardTitle>
        <CardDescription>Robots and cameras follow the site.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Label htmlFor="drawer-site">Site</Label>
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                id="drawer-site"
                variant="outline"
                className="h-11 w-full justify-start gap-2.5 px-2"
              >
                <img
                  src={site.frame}
                  alt=""
                  className="size-7 rounded-sm object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
                />
                {site.name}
                <ChevronsUpDownIcon data-icon="inline-end" className="ml-auto" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto flex w-full max-w-sm flex-col pb-4">
                <DrawerHeader>
                  <DrawerTitle>Switch site</DrawerTitle>
                  <DrawerDescription>
                    Robots and cameras follow the site you pick.
                  </DrawerDescription>
                </DrawerHeader>
                <ul className="flex flex-col gap-1 px-2">
                  {sites.map((option) => (
                    <li key={option.name}>
                      <DrawerClose asChild>
                        <button
                          type="button"
                          onClick={() => setName(option.name)}
                          aria-current={option.name === name ? "true" : undefined}
                          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=true]:bg-muted/60"
                        >
                          <img
                            src={option.frame}
                            alt=""
                            loading="lazy"
                            className="size-10 shrink-0 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
                          />
                          <span className="flex flex-1 flex-col gap-0.5">
                            <span className="font-medium">{option.name}</span>
                            <span className="text-muted-foreground tabular-nums">
                              {option.detail}
                            </span>
                          </span>
                          {option.name === name && <CheckIcon className="size-4" />}
                        </button>
                      </DrawerClose>
                    </li>
                  ))}
                </ul>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </CardContent>
    </Card>
  );
}
