import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  DestructiveActionModal,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  toast,
} from "@robomous/ui-core";
import {
  ChevronDownIcon,
  DownloadIcon,
  RotateCwIcon,
  Trash2Icon,
  VideoIcon,
} from "@robomous/ui-core/icons";
import { useState } from "react";

/** A destructive item only opens the confirmation; the modal lives beside the menu, since the item unmounts on select. */
export default function Destructive() {
  const [confirming, setConfirming] = useState(false);
  return (
    <>
      <Item variant="outline" className="w-full max-w-md">
        <ItemMedia variant="icon">
          <VideoIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="font-mono">dock-cam-02</ItemTitle>
          <ItemDescription>Monterrey DC-2 · streaming</ItemDescription>
        </ItemContent>
        <ItemActions>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Camera actions
                <ChevronDownIcon data-icon="inline-end" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52" align="end">
              <DropdownMenuItem>
                <RotateCwIcon />
                Restart stream
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DownloadIcon />
                Download last clip
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onSelect={() => setConfirming(true)}>
                <Trash2Icon />
                Remove camera
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ItemActions>
      </Item>
      <DestructiveActionModal
        open={confirming}
        onOpenChange={setConfirming}
        title="Remove Camera"
        description={
          <>
            <b>dock-cam-02</b> stops streaming and its 30 days of footage is deleted.
          </>
        }
        irreversibleDescription="Removing dock-cam-02 cannot be undone."
        verificationPhrase="dock-cam-02"
        verificationLabel="camera name"
        confirmLabel="Remove Camera"
        onConfirm={() => {
          setConfirming(false);
          toast.success("dock-cam-02 removed");
        }}
      />
    </>
  );
}
