"use client";

import * as React from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

// The theme this package runs on has one source: the `dark` class on <html>,
// which is what `styles.css`'s `@custom-variant dark` keys off and therefore
// what every other component in here already follows. A toast is portalled
// outside the tree but reads the same page, so it has to answer to the same
// source — hence this hook rather than a `next-themes` `useTheme`, which asks
// for a React provider none of this runs under. Sonner needs the answer as a
// value, not a class, which is the only reason the class has to be observed
// at all.
function useTheme(): { theme: "light" | "dark" } {
  const read = () =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  const [theme, setTheme] = React.useState<"light" | "dark">(read);
  React.useEffect(() => {
    const observer = new MutationObserver(() => setTheme(read()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return { theme };
}

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      // A typed toast wears its status the way a Badge does: the status's
      // surface role under its ink role. `richColors` is what makes sonner read
      // the --success-*/--info-*/--warning-*/--error-* variables below; a caller
      // that wants neutral toasts passes richColors={false}. The border takes
      // the surface too, because status is never a stroke on a container.
      richColors
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "var(--success-surface)",
          "--success-text": "var(--success)",
          "--success-border": "var(--success-surface)",
          "--info-bg": "var(--info-surface)",
          "--info-text": "var(--info)",
          "--info-border": "var(--info-surface)",
          "--warning-bg": "var(--warning-surface)",
          "--warning-text": "var(--warning)",
          "--warning-border": "var(--warning-surface)",
          "--error-bg": "var(--destructive-surface)",
          "--error-text": "var(--destructive)",
          "--error-border": "var(--destructive-surface)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
