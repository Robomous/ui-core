import { Button } from "@robomous/ui-core";
import { MoonIcon, SunIcon } from "@robomous/ui-core/icons";
import { useEffect, useState } from "react";

/**
 * Flips the `dark` class on <html>, the theme's one source, and remembers the
 * choice for the inline script in Base.astro to replay before the next paint.
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Storage may be unavailable; the class still applied for this page.
    }
    setDark(next);
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-pressed={dark}
      aria-label="Dark theme"
      onClick={toggle}
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
