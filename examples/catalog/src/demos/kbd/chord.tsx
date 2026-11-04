import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Kbd,
  KbdGroup,
  Separator,
} from "@robomous/ui-core";

const shortcuts: [string, string[]][] = [
  ["Approve and next frame", ["⌘", "Enter"]],
  ["Flag as damaged-box", ["⌘", "D"]],
  ["Undo last box", ["⌘", "Z"]],
  ["Redo", ["⌘", "Shift", "Z"]],
  ["Toggle labels", ["Ctrl", "Shift", "L"]],
];

/** KbdGroup holds a chord: the keys read together as one shortcut, not a list of separate ones. */
export default function Chord() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>Review shortcuts</CardTitle>
        <CardDescription>Work through batch 41 without leaving the keyboard.</CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="flex flex-col gap-3 text-xs">
          {shortcuts.map(([action, keys], index) => (
            <div key={action} className="flex flex-col gap-3">
              {index > 0 ? <Separator /> : null}
              <div className="flex items-center justify-between gap-4">
                <dt>{action}</dt>
                <dd>
                  <KbdGroup>
                    {keys.map((key) => (
                      <Kbd key={key}>{key}</Kbd>
                    ))}
                  </KbdGroup>
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
