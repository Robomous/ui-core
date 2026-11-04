import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "cn";
import { Button } from "./button.js";
import { ButtonGroup } from "./button-group.js";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./dropdown-menu.js";

/**
 * One clear default action welded to a menu of its close variants: `Deploy`
 * beside `Deploy to preview`. Children are the menu's items — mirror the
 * primary action as the first one, so a keyboard or screen-reader user meets
 * the same set. Only `default`, `secondary` and `outline` are offered: a
 * destructive action hidden in a dropdown is a sharp edge.
 */
function SplitButton({
  className,
  label,
  icon,
  onClick,
  menuLabel,
  menuAlign = "start",
  variant = "default",
  size = "default",
  disabled,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "onClick"> & {
  /** The primary action's visible label. */
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** The trigger's accessible name, a sentence naming the set: `More deploy options`. */
  menuLabel: string;
  /** `end` when the button sits flush with its container's right edge. */
  menuAlign?: "start" | "end";
  variant?: "default" | "secondary" | "outline";
  size?: "sm" | "default" | "lg";
  disabled?: boolean;
}) {
  const square = { sm: "icon-sm", default: "icon", lg: "icon-lg" } as const;

  return (
    <ButtonGroup data-slot="split-button" className={className} {...props}>
      <Button variant={variant} size={size} disabled={disabled} onClick={onClick}>
        {icon}
        {label}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={disabled}>
          {/* A filled button has no border to weld on, so a hairline in the
              button's own ink marks the seam; an outline one shares its stroke. */}
          <Button
            variant={variant}
            size={square[size]}
            aria-label={menuLabel}
            className={cn(
              variant !== "outline" &&
                "relative before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-current before:opacity-20",
            )}
          >
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={menuAlign} className="min-w-44">
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}

export { SplitButton };
