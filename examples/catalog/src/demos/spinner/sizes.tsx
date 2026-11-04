import { Spinner } from "@robomous/ui-core";

const sizes = [
  { label: "size-3", className: "size-3" },
  { label: "default", className: undefined },
  { label: "size-6", className: "size-6" },
  { label: "size-8 muted", className: "size-8 text-muted-foreground" },
  { label: "size-8 primary", className: "size-8 text-primary" },
];

/** The size and colour come from `className`: `size-*` for the glyph, and the text colour for the stroke. */
export default function Sizes() {
  return (
    <div className="flex w-fit items-end gap-8">
      {sizes.map(({ label, className }) => (
        <div key={label} className="flex flex-col items-center gap-3">
          <Spinner className={className} />
          <span className="text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}
