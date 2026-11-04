import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  toast,
} from "@robomous/ui-core";
import {
  ArchiveIcon,
  CopyIcon,
  DownloadIcon,
  EllipsisIcon,
  GitCompareIcon,
  Trash2Icon,
} from "@robomous/ui-core/icons";

/** A row's actions folded behind one icon: the primary action stays visible, the rest are a keystroke away. */
export default function Overview() {
  return (
    <div className="flex w-full max-w-md items-center justify-between gap-4 rounded-lg border py-3 pr-3 pl-4">
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-sm font-medium">detector-v3.2</span>
        <span className="text-muted-foreground tabular-nums">mAP 0.71 · 2.3% over production</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="success">Live</Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Actions for detector-v3.2">
              <EllipsisIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem>
              <GitCompareIcon />
              Compare with production
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => toast("Copied detector-v3.2")}>
              <CopyIcon />
              Copy model ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DownloadIcon />
              Download weights
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ArchiveIcon />
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <Trash2Icon />
              Delete model
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
