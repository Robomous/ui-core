import { DropdownMenuGroup, DropdownMenuItem, SplitButton } from "@robomous/ui-core";

const variants = ["default", "secondary", "outline"] as const;
const sizes = ["sm", "default", "lg"] as const;

/** `default`, `secondary` and `outline` at the three sizes; the chevron button always matches its sibling's height. */
export default function Default() {
  return (
    <div className="grid w-fit grid-cols-[5rem_repeat(3,auto)] items-center gap-x-6 gap-y-4">
      <span />
      {sizes.map((size) => (
        <span key={size} className="text-muted-foreground">
          {size}
        </span>
      ))}
      {variants.map((variant) => (
        <div key={variant} className="contents">
          <span className="text-muted-foreground">{variant}</span>
          {sizes.map((size) => (
            <SplitButton
              key={size}
              variant={variant}
              size={size}
              label="Deploy"
              menuLabel="More deploy options"
            >
              <DropdownMenuGroup>
                <DropdownMenuItem>Deploy</DropdownMenuItem>
                <DropdownMenuItem>Deploy to Staging</DropdownMenuItem>
                <DropdownMenuItem>Deploy as Canary</DropdownMenuItem>
              </DropdownMenuGroup>
            </SplitButton>
          ))}
        </div>
      ))}
    </div>
  );
}
