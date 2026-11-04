import { Avatar, AvatarFallback, AvatarImage } from "@robomous/ui-core";

const sizes = [
  { size: "sm", px: "24px" },
  { size: "default", px: "32px" },
  { size: "lg", px: "40px" },
] as const;

/** Three sizes, carried as data-size so anything nested reads the same scale. */
export default function Sizes() {
  return (
    <div className="flex w-fit items-end gap-8">
      {sizes.map(({ size, px }) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Avatar size={size}>
            <AvatarImage src="/assets/people/lena-fischer.svg" alt="Lena Fischer" />
            <AvatarFallback>LF</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center">
            <span className="font-mono text-xs">{size}</span>
            <span className="text-xs text-muted-foreground tabular-nums">{px}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
