import { Snippet } from "@robomous/ui-core";

const rows = [
  { variant: "default", text: "robomous models list --site monterrey-dc-2" },
  { variant: "inverted", text: "robomous login" },
  { variant: "info", text: "robomous models deploy detector-v3.2 --dry-run" },
  { variant: "success", text: "robomous fleet resume monterrey-dc-2" },
  { variant: "warning", text: "robomous fleet flash --all --firmware 4.2.1" },
  { variant: "error", text: "robomous datasets delete pallet-detection --force" },
] as const;

/** The default is a bordered line; `inverted` sets one command apart; status variants carry a role's colour for a command with a warning attached. */
export default function Variants() {
  return (
    <div className="grid w-full max-w-xl grid-cols-[4.5rem_1fr] items-center gap-x-4 gap-y-3">
      {rows.map(({ variant, text }) => (
        <div key={variant} className="contents">
          <span className="font-mono text-xs text-muted-foreground">{variant}</span>
          <Snippet className="w-full" variant={variant} text={text} />
        </div>
      ))}
    </div>
  );
}
