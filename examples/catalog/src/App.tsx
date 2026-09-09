import { useEffect, useState } from "react";
import { Button, Toaster } from "@robomous/ui-core";

import { Components } from "./sections/Components";
import { Foundations } from "./sections/Foundations";
import { States } from "./sections/States";

const SECTIONS = [
  { id: "foundations", title: "Foundations" },
  { id: "components", title: "Components" },
  { id: "states", title: "States" },
];

export function App() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 flex items-center gap-4 border-b bg-background/90 px-6 py-3 backdrop-blur-sm">
        <span className="font-heading text-sm font-medium">@robomous/ui-core</span>
        <nav className="flex gap-1">
          {SECTIONS.map((section) => (
            <Button key={section.id} asChild variant="ghost" size="sm">
              <a href={`#${section.id}`}>{section.title}</a>
            </Button>
          ))}
        </nav>
        <Button
          className="ml-auto"
          variant="outline"
          size="sm"
          aria-pressed={dark}
          onClick={() => setDark((value) => !value)}
        >
          {dark ? "Dark" : "Light"} theme
        </Button>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-10">
        <Foundations />
        <Components />
        <States />
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}

/** A titled region of the catalog, with an anchor for the header nav. */
export function Section({
  id,
  title,
  lede,
  children,
}: {
  id: string;
  title: string;
  lede: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="flex scroll-mt-20 flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-medium">{title}</h2>
        <p className="max-w-prose text-sm text-muted-foreground">{lede}</p>
      </div>
      {children}
    </section>
  );
}

/** A labelled specimen row inside a section. */
export function Specimen({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline gap-3">
        <h3 className="text-sm font-medium">{title}</h3>
        {note ? <p className="text-xs text-muted-foreground">{note}</p> : null}
      </div>
      <div className="flex flex-wrap items-start gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
        {children}
      </div>
    </div>
  );
}
