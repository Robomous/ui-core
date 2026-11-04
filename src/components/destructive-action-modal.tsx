import * as React from "react";
import { CircleAlertIcon } from "lucide-react";

import { cn } from "cn";
import { Button } from "./button.js";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog.js";
import { Input } from "./input.js";
import { Spinner } from "./spinner.js";

/**
 * A confirmation for an action that ends something: delete, revoke, rotate,
 * disconnect. Submit stays disabled until the reader types `verificationPhrase`
 * exactly — the friction is the feature. `irreversibleDescription` adds the
 * tinted band that names what cannot be undone; leave it out for an action that
 * can be rolled back, and the gate stays while the band goes.
 *
 * The caller owns `open`: `onConfirm` runs the action, and the caller closes
 * the modal once it settles, or keeps it open with `error` so the reader can
 * retry without losing their place.
 */
function DestructiveActionModal({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  irreversibleDescription,
  verificationPhrase,
  verificationLabel,
  confirmLabel,
  cancelLabel = "Cancel",
  onConfirm,
  loading = false,
  error,
  className,
}: {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** The element that opens the modal, usually a destructive Button. */
  trigger?: React.ReactNode;
  /** Title Case, Verb + Noun, a statement: `Delete Project`, never a question. */
  title: React.ReactNode;
  /** The consequence, naming the resource: `<b>atlas-07</b> and its telemetry will be deleted.` */
  description: React.ReactNode;
  /** What cannot be undone, ending in "cannot be undone." Omit it for reversible actions. */
  irreversibleDescription?: React.ReactNode;
  /** The exact text that unlocks submit: the resource's own name when there is one. */
  verificationPhrase: string;
  /** What the phrase is, for the prompt: `project name` reads `type the project name "…"`. */
  verificationLabel?: string;
  /** Matches the title: `Delete Project`. Never `Confirm` or `OK`. */
  confirmLabel: React.ReactNode;
  cancelLabel?: React.ReactNode;
  onConfirm: () => void;
  /** Disables both buttons and spins on the primary while the action is in flight. */
  loading?: boolean;
  /** The failure, verbatim, under the input. The modal stays open for a retry. */
  error?: string | globalThis.Error | null;
  className?: string;
}) {
  const [typed, setTyped] = React.useState("");
  const id = React.useId();
  const matches = typed === verificationPhrase;
  const message = error instanceof globalThis.Error ? error.message : error;

  // A modal reopened later starts with an empty gate, never a stale match.
  const handleOpenChange = (next: boolean) => {
    if (!next) setTyped("");
    onOpenChange?.(next);
  };

  return (
    <Dialog open={open} defaultOpen={defaultOpen} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        data-slot="destructive-action-modal"
        showCloseButton={false}
        // Loading is a commitment in flight: outside clicks and Escape wait.
        onEscapeKeyDown={(event) => loading && event.preventDefault()}
        onInteractOutside={(event) => loading && event.preventDefault()}
        className={cn("gap-0 overflow-hidden p-0 sm:max-w-md", className)}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (matches && !loading) onConfirm();
          }}
        >
          <div className="flex flex-col gap-4 p-5">
            <DialogHeader className="gap-2">
              <DialogTitle className="text-base font-semibold">{title}</DialogTitle>
              <DialogDescription className="text-foreground/80 *:[b]:font-semibold *:[b]:text-foreground *:[strong]:text-foreground">
                {description}
              </DialogDescription>
            </DialogHeader>
            {irreversibleDescription && (
              <p
                data-slot="destructive-action-modal-band"
                className="flex items-start gap-2 rounded-md bg-destructive/10 px-3 py-2.5 text-destructive dark:bg-destructive/20"
              >
                <CircleAlertIcon aria-hidden className="mt-0.5 size-3.5 shrink-0" />
                <span>{irreversibleDescription}</span>
              </p>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor={`${id}-phrase`} translate="no" className="notranslate">
                To confirm, type{verificationLabel ? ` the ${verificationLabel}` : ""}{" "}
                <span className="font-semibold">“{verificationPhrase}”</span>
              </label>
              <Input
                id={`${id}-phrase`}
                value={typed}
                onChange={(event) => setTyped(event.target.value)}
                autoFocus
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                translate="no"
                lang="zxx"
                dir="ltr"
                disabled={loading}
                aria-invalid={message ? true : undefined}
                aria-describedby={message ? `${id}-error` : undefined}
                className="notranslate h-8"
              />
              {message && (
                <p id={`${id}-error`} role="alert" className="text-destructive">
                  {message}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 border-t bg-muted/50 px-5 py-3">
            <DialogClose asChild>
              <Button variant="outline" disabled={loading}>
                {cancelLabel}
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="destructive"
              disabled={!matches || loading}
              aria-busy={loading || undefined}
            >
              {loading && <Spinner data-icon="inline-start" className="size-3.5" />}
              {confirmLabel}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { DestructiveActionModal };
