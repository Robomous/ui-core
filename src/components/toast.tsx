"use client";

import * as React from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { Loader2Icon, XIcon } from "lucide-react";

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

// A toast wears its status the way an Alert does: in the icon alone, on a
// neutral card. The marks are solid here rather than outlined, because a toast
// is read in passing, over whatever the page is showing; a filled shape is
// found at a glance where a hairline one is not. The glyph is cut out of the
// shape in the toast's own surface (`--normal-bg`, set on the toaster below),
// so it reads in both themes, and each status keeps a shape of its own, so the
// colour is never the only cue.
function StatusIcon({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className}>
      {children}
    </svg>
  );
}

const glyph = {
  fill: "none",
  className: "stroke-(--normal-bg)",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const icons = {
  success: (
    <StatusIcon className="size-4.5 text-success">
      <circle cx="10" cy="10" r="9" fill="currentColor" />
      <path d="m6.25 10.25 2.5 2.5 5-5.25" {...glyph} />
    </StatusIcon>
  ),
  info: (
    <StatusIcon className="size-4.5 text-info">
      <circle cx="10" cy="10" r="9" fill="currentColor" />
      <path d="M10 9.25v4.5" {...glyph} />
      <circle cx="10" cy="6.4" r="1.1" className="fill-(--normal-bg)" />
    </StatusIcon>
  ),
  warning: (
    <StatusIcon className="size-4.5 text-warning">
      <path
        d="M8.6 2.9a1.6 1.6 0 0 1 2.8 0l6.85 11.9a1.6 1.6 0 0 1-1.4 2.4H3.15a1.6 1.6 0 0 1-1.4-2.4z"
        fill="currentColor"
      />
      <path d="M10 7.25v3.75" {...glyph} />
      <circle cx="10" cy="13.9" r="1.1" className="fill-(--normal-bg)" />
    </StatusIcon>
  ),
  error: (
    <StatusIcon className="size-4.5 text-destructive">
      <path
        d="M6.9 2.5h6.2l4.4 4.4v6.2l-4.4 4.4H6.9l-4.4-4.4V6.9z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="m7.75 7.75 4.5 4.5m0-4.5-4.5 4.5" {...glyph} />
    </StatusIcon>
  ),
  loading: <Loader2Icon className="size-4 animate-spin text-muted-foreground" />,
  close: <XIcon className="size-4" />,
};

// The toast's buttons share one press: a small give under the pointer, with
// only the properties that change on hover and press in the transition.
const press =
  "transition-[scale,background-color,color]! duration-150! ease-out! active:scale-[0.96]!";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={icons}
      style={
        {
          // The card is lifted a half step off the page toward `muted`, so it
          // reads as something laid over the page rather than cut out of it;
          // in dark the same mix lifts it off the popover's neutral-900.
          "--normal-bg": "color-mix(in oklch, var(--muted) 50%, var(--popover))",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius-lg)",
          // Wider than sonner's 356px, so a title still has room beside an
          // action and the X on one line.
          "--width": "400px",
          // The close button joins the row instead of hanging off the corner.
          "--toast-close-button-transform": "none",
          "--toast-icon-margin-start": "0",
          "--toast-icon-margin-end": "0",
          "--toast-button-margin-start": "0",
          "--toast-button-margin-end": "0",
        } as React.CSSProperties
      }
      // Every toast can be closed by hand. One that carries its own cancel
      // button (`Dismiss`) drops the X, so there is one way out, not two.
      closeButton
      toastOptions={{
        classNames: {
          // One row: the icon, the text, then the buttons and the X trailing,
          // all hung from the title's line. Every override is `!`: sonner's
          // stylesheet is unlayered, so it beats any utility in Tailwind's
          // layers whatever the specificity.
          toast:
            "cn-toast items-start! gap-2.5! p-3! text-[13px]/5! shadow-[0_1px_2px_oklch(0_0_0/0.04),0_2px_6px_oklch(0_0_0/0.04)]! dark:shadow-[0_1px_2px_oklch(0_0_0/0.3),0_4px_12px_oklch(0_0_0/0.4)]! has-data-cancel:[&_[data-close-button]]:hidden!",
          content: "gap-0.5!",
          title: "font-semibold! text-pretty",
          // A step darker than `muted-foreground`: on the lifted card the
          // detail still has to read without squinting at 13px.
          description: "text-[13px]/5! text-pretty text-foreground/75!",
          // A fixed box one title line tall: the mark centres on the first line, and
          // the text starts in the same place whichever mark, or spinner, it holds.
          icon: "h-5! w-4.5! justify-center!",
          // The buttons are 24px against a 20px line: lifted by half the
          // difference, they centre on the title too. The action is a chip of
          // the popover's white on the lifted card (bare in dark, where the
          // popover sits below the card); the cancel stays bare.
          actionButton: `-my-0.5! h-6! rounded-md! border! border-border! bg-popover! px-2! dark:bg-transparent! text-xs! font-medium! text-foreground! hover:bg-foreground/5! ${press}`,
          cancelButton: `-my-0.5! h-6! rounded-md! bg-transparent! px-2! text-xs! font-medium! text-foreground/75! hover:bg-foreground/5! hover:text-foreground! ${press}`,
          // The X is last in the row whatever sonner's DOM order: a disc one
          // title line tall that darkens on hover, its hit area grown past the
          // 20px it draws. The ink is mixed opaque rather than given an alpha:
          // the X's two strokes overlap, and a translucent stroke doubles up
          // into a dark knot where they cross.
          closeButton: `relative! inset-auto! order-last size-5! shrink-0! rounded-full! border-0! bg-foreground/8! text-[color-mix(in_oklch,var(--foreground)_75%,var(--normal-bg))]! after:absolute after:-inset-2 hover:bg-foreground/12! hover:text-foreground! ${press}`,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
