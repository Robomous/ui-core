import { Button, Snippet } from "@robomous/ui-core";
import { useRef, useState } from "react";

const token = "rk_live_4f9c2e71b0d8";

/** `copied` drives the checkmark from outside, so a button that copies something else can borrow it; the parent owns the reset. */
export default function Controlled() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  function flash() {
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <span className="text-muted-foreground">API token</span>
        <Snippet className="w-full" prompt={false} text={token} copied={copied} onCopy={flash} />
      </div>
      <Button
        variant="outline"
        size="sm"
        className="self-start"
        onClick={() => {
          void navigator.clipboard?.writeText(`ROBOMOUS_TOKEN=${token}`);
          flash();
        }}
      >
        Copy as .env line
      </Button>
    </div>
  );
}
