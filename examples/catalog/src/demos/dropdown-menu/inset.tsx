import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@robomous/ui-core";
import { ChevronDownIcon, HouseIcon, PauseIcon } from "@robomous/ui-core/icons";

/** `inset` pads a row to the icon column, so plain rows line up with the iconed ones above. */
export default function Inset() {
  return (
    <div className="flex w-full max-w-sm items-center gap-3 rounded-lg border p-2 pl-3">
      <span className="text-muted-foreground">Controlling</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex-1 justify-between">
            rb-07 "Atlas"
            <ChevronDownIcon data-icon="inline-end" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52" align="end">
          <DropdownMenuLabel inset>Mission controls</DropdownMenuLabel>
          <DropdownMenuItem>
            <PauseIcon />
            Pause mission
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HouseIcon />
            Return to dock
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem inset>View telemetry</DropdownMenuItem>
          <DropdownMenuItem inset>Copy robot ID</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
