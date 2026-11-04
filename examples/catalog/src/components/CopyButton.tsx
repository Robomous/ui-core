import { Button } from "@robomous/ui-core";
import { CheckIcon, CopyIcon } from "@robomous/ui-core/icons";
import { useEffect, useState } from "react";

import IconSwap from "@/components/IconSwap";

/** Copies a code sample; the icon confirms for a moment, then resets. */
export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label={copied ? "Copied" : "Copy code"}
      data-copied={copied || undefined}
      className="relative text-muted-foreground after:absolute after:-inset-2 hover:text-foreground data-copied:text-success"
      onClick={() => {
        void navigator.clipboard.writeText(code).then(() => setCopied(true));
      }}
    >
      <IconSwap active={copied} on={<CheckIcon />} off={<CopyIcon />} />
    </Button>
  );
}
