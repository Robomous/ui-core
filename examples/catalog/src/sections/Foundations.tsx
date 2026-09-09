import { Button, Input } from "@robomous/ui-core";

import { Section, Specimen } from "../App";

// Literal class strings, because Tailwind reads source text: a class built at
// runtime is a rule the build never emitted.
const SURFACES = [
  { name: "background / foreground", fill: "bg-background text-foreground" },
  { name: "card / card-foreground", fill: "bg-card text-card-foreground" },
  { name: "popover / popover-foreground", fill: "bg-popover text-popover-foreground" },
  { name: "muted / muted-foreground", fill: "bg-muted text-muted-foreground" },
  { name: "primary / primary-foreground", fill: "bg-primary text-primary-foreground" },
  { name: "secondary / secondary-foreground", fill: "bg-secondary text-secondary-foreground" },
  { name: "accent / accent-foreground", fill: "bg-accent text-accent-foreground" },
];

const STATUS = [
  { name: "success", solid: "bg-success", soft: "bg-success/10 text-success" },
  { name: "warning", solid: "bg-warning", soft: "bg-warning/10 text-warning" },
  { name: "info", solid: "bg-info", soft: "bg-info/10 text-info" },
  { name: "destructive", solid: "bg-destructive", soft: "bg-destructive/10 text-destructive" },
];

const STRUCTURE = [
  { name: "border", fill: "bg-border" },
  { name: "input", fill: "bg-input" },
  { name: "ring", fill: "bg-ring" },
  { name: "overlay", fill: "bg-overlay" },
];

const RADII = [
  { name: "rounded-sm", cls: "rounded-sm" },
  { name: "rounded-md", cls: "rounded-md" },
  { name: "rounded-lg", cls: "rounded-lg" },
  { name: "rounded-xl", cls: "rounded-xl" },
  { name: "rounded-2xl", cls: "rounded-2xl" },
  { name: "rounded-3xl", cls: "rounded-3xl" },
  { name: "rounded-4xl", cls: "rounded-4xl" },
];

const TYPE = [
  { name: "text-xs", cls: "text-xs" },
  { name: "text-sm", cls: "text-sm" },
  { name: "text-base", cls: "text-base" },
  { name: "text-lg", cls: "text-lg" },
  { name: "text-xl", cls: "text-xl" },
  { name: "text-2xl", cls: "text-2xl" },
];

export function Foundations() {
  return (
    <Section
      id="foundations"
      title="Foundations"
      lede="Every colour is a role. The default Tailwind palette is closed, so bg-red-500 produces nothing; success, warning, info and destructive are the status vocabulary; brand is a CSS variable for identity, never a utility."
    >
      <Specimen title="Surfaces and emphasis" note="Toggle the theme to see each role flip.">
        {SURFACES.map((role) => (
          <div
            key={role.name}
            className={`flex h-16 w-44 items-end rounded-lg p-2 text-xs ring-1 ring-foreground/10 ${role.fill}`}
          >
            {role.name}
          </div>
        ))}
      </Specimen>

      <Specimen title="Status" note="Solid for a mark; /10 surface with matching ink for a chip.">
        {STATUS.map((role) => (
          <div key={role.name} className="flex flex-col gap-2">
            <div className={`h-10 w-44 rounded-lg ${role.solid}`} />
            <div className={`rounded-lg px-2 py-1 text-xs ${role.soft}`}>{role.name}</div>
          </div>
        ))}
      </Specimen>

      <Specimen title="Structure">
        {STRUCTURE.map((role) => (
          <div key={role.name} className="flex flex-col gap-2 text-xs">
            <div className={`h-10 w-32 rounded-lg ring-1 ring-foreground/10 ${role.fill}`} />
            {role.name}
          </div>
        ))}
        <div className="flex flex-col gap-2 text-xs">
          {/* Brand is reached as a variable, which is the whole point. */}
          <div className="h-10 w-32 rounded-lg" style={{ backgroundColor: "var(--brand)" }} />
          brand (var(--brand))
        </div>
      </Specimen>

      <Specimen
        title="Typography"
        note="One family, Geist; sizes from Tailwind's scale; font-mono for machine-shaped content."
      >
        <div className="flex flex-col gap-2">
          {TYPE.map((step) => (
            <p key={step.name} className={step.cls}>
              <span className="mr-3 font-mono text-xs text-muted-foreground">{step.name}</span>
              The quick brown fox jumps over the lazy dog
            </p>
          ))}
          <p className="font-mono text-sm">a1b2c3d4 · 311.9 MB · org/model-tiny</p>
        </div>
      </Specimen>

      <Specimen title="Radius" note="Every step derives from --radius.">
        {RADII.map((step) => (
          <div key={step.name} className="flex flex-col items-center gap-2 text-xs">
            <div className={`size-16 bg-muted ring-1 ring-foreground/10 ${step.cls}`} />
            {step.name}
          </div>
        ))}
      </Specimen>

      <Specimen title="Focus" note="Tab through: each control carries its own ring-3 in ring/50.">
        <Button variant="outline">A button</Button>
        <Input className="w-48" placeholder="An input" aria-label="Focus specimen" />
      </Specimen>
    </Section>
  );
}
