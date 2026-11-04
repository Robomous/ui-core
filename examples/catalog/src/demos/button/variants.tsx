import { Button } from "@robomous/ui-core";

const rows = [
  { variant: "default", label: "Deploy model", note: "The page's one primary action" },
  { variant: "outline", label: "Compare runs", note: "Sits beside the primary" },
  { variant: "secondary", label: "Duplicate run", note: "A quieter alternative" },
  { variant: "ghost", label: "Rename", note: "Toolbars and dense rows" },
  { variant: "destructive", label: "Stop training", note: "Ends or removes something" },
  { variant: "link", label: "View metrics", note: "Navigation that reads as text" },
] as const;

/** Six variants, one intent each; `default` is the page's single primary action. */
export default function Variants() {
  return (
    <div className="grid w-fit grid-cols-[4.5rem_auto_auto] items-center gap-x-8 gap-y-3">
      {rows.map(({ variant, label, note }) => (
        <div key={variant} className="contents">
          <span className="text-muted-foreground">{variant}</span>
          <Button variant={variant} className="justify-self-start">
            {label}
          </Button>
          <span className="text-muted-foreground">{note}</span>
        </div>
      ))}
    </div>
  );
}
