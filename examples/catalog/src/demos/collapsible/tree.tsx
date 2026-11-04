import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from "@robomous/ui-core";
import { ChevronRightIcon, FileJsonIcon, FolderIcon, ImageIcon } from "@robomous/ui-core/icons";

const splits = [
  { name: "train", files: ["frame-0001.jpg", "frame-0002.jpg", "labels.json"] },
  { name: "val", files: ["frame-0901.jpg", "labels.json"] },
  { name: "test", files: ["frame-1001.jpg", "labels.json"] },
];

/** One Collapsible per folder: each branch keeps its own open state, so nesting needs no extra wiring. */
export default function Tree() {
  return (
    <div className="flex w-full max-w-xs flex-col rounded-lg border p-2 font-mono">
      <span className="px-2 py-1 font-medium">pallet-detection</span>
      <div className="ml-3 flex flex-col border-l pl-2">
        {splits.map((split, index) => (
          <Collapsible key={split.name} defaultOpen={index === 0}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="group/folder w-full justify-start font-mono"
              >
                <ChevronRightIcon
                  data-icon="inline-start"
                  className="transition-transform group-aria-expanded/folder:rotate-90"
                />
                <FolderIcon data-icon="inline-start" />
                {split.name}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul className="ml-3 flex flex-col border-l pl-2">
                {split.files.map((file) => {
                  const Icon = file.endsWith(".json") ? FileJsonIcon : ImageIcon;
                  return (
                    <li
                      key={file}
                      className="flex items-center gap-2 px-2 py-1 text-muted-foreground"
                    >
                      <Icon className="size-3.5" />
                      {file}
                    </li>
                  );
                })}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
