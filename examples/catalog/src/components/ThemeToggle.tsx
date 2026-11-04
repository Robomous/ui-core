import { MonitorIcon, MoonIcon, SunIcon } from "@robomous/ui-core/icons";
import { useEffect, useState } from "react";

type Theme = "system" | "light" | "dark";

declare global {
  interface Window {
    /** Defined by the inline script in Base.astro, before any island runs. */
    setTheme: (dark: boolean) => void;
  }
}

const OPTIONS: { value: Theme; label: string; Icon: typeof SunIcon }[] = [
  { value: "system", label: "System theme", Icon: MonitorIcon },
  { value: "light", label: "Light theme", Icon: SunIcon },
  { value: "dark", label: "Dark theme", Icon: MoonIcon },
];

/**
 * Three positions on one control: follow the system, or pin light or dark.
 * The `dark` class on <html> stays the theme's one source; the stored choice
 * is what the inline script in Base.astro replays before the next paint, and
 * "system" is the absence of a stored choice.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") setTheme(stored);
    } catch {
      // Storage may be unavailable; "system" is then the only position.
    }
  }, []);

  function choose(next: Theme) {
    const dark =
      next === "dark" || (next === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
    window.setTheme(dark);
    try {
      if (next === "system") localStorage.removeItem("theme");
      else localStorage.setItem("theme", next);
    } catch {
      // The class still applied for this page.
    }
    setTheme(next);
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="inline-flex items-center rounded-full border p-0.5"
    >
      {OPTIONS.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={theme === value}
          aria-label={label}
          onClick={() => choose(value)}
          className="inline-flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/30 aria-checked:bg-muted aria-checked:text-foreground"
        >
          <Icon className="size-3.5" />
        </button>
      ))}
    </div>
  );
}
