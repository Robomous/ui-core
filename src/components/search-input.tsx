import * as React from "react";
import { SearchIcon, XIcon } from "lucide-react";

import { cn } from "cn";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./input-group.js";
import { Kbd, KbdGroup } from "./kbd.js";
import { Spinner } from "./spinner.js";

/**
 * A search field: the magnifier ahead, a clear button once there is something
 * to clear, Escape to clear from the keyboard. `shortcut` binds ⌘K / Ctrl+K
 * to focus it and shows the keys while the field is empty; `loading` swaps the
 * magnifier for a spinner while results are on their way.
 */
function SearchInput({
  className,
  value: valueProp,
  defaultValue,
  onValueChange,
  onChange,
  onKeyDown,
  onClear,
  shortcut = false,
  loading = false,
  icon,
  disabled,
  placeholder = "Search…",
  ...props
}: Omit<React.ComponentProps<"input">, "type" | "value" | "defaultValue"> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Called after the clear button or Escape empties the field. */
  onClear?: () => void;
  /** Bind ⌘K / Ctrl+K to focus the field, and show the keys while it is empty. */
  shortcut?: boolean;
  loading?: boolean;
  /** Replaces the magnifier: a scope icon, a sparkle for an assistant search. */
  icon?: React.ReactNode;
}) {
  const [valueState, setValueState] = React.useState(defaultValue ?? "");
  const value = valueProp ?? valueState;
  const ref = React.useRef<HTMLInputElement>(null);

  const setValue = (next: string) => {
    if (valueProp === undefined) setValueState(next);
    onValueChange?.(next);
  };

  const clear = () => {
    setValue("");
    onClear?.();
    ref.current?.focus();
  };

  React.useEffect(() => {
    if (!shortcut || disabled) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        ref.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [shortcut, disabled]);

  return (
    <InputGroup
      data-slot="search-input"
      data-disabled={disabled || undefined}
      className={cn("has-disabled:bg-muted", className)}
    >
      <InputGroupAddon>
        {loading ? <Spinner className="size-3.5" /> : (icon ?? <SearchIcon aria-hidden />)}
      </InputGroupAddon>
      <InputGroupInput
        ref={ref}
        type="search"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        aria-busy={loading || undefined}
        // The native cancel glyph would be a second, unstyled clear button.
        className="[&::-webkit-search-cancel-button]:appearance-none"
        onChange={(event) => {
          onChange?.(event);
          setValue(event.target.value);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;
          if (event.key === "Escape" && value) {
            event.preventDefault();
            clear();
          }
        }}
        {...props}
      />
      {value && !disabled ? (
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="Clear search" onClick={clear}>
            <XIcon />
          </InputGroupButton>
        </InputGroupAddon>
      ) : shortcut ? (
        <InputGroupAddon align="inline-end" aria-hidden>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  );
}

export { SearchInput };
