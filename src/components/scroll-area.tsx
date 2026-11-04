import * as React from "react";
import { cn } from "cn";
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";

/**
 * A scroll region with a styled scrollbar. The viewport fades the edge that still has content
 * behind it (`fade`, vertical by default; `"x"` for a horizontal strip, `"none"` to keep hard
 * edges), and only once the content overflows. The focus ring sits on the root, because the fade's
 * mask would erase one drawn on the viewport.
 */
function ScrollArea({
  className,
  children,
  fade = "y",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  /** Which axis fades at the edge that can still scroll. */
  fade?: "y" | "x" | "none";
}) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn(
        "relative transition-[color,box-shadow] has-[>[data-slot=scroll-area-viewport]:focus-visible]:ring-3 has-[>[data-slot=scroll-area-viewport]:focus-visible]:ring-ring/50",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className={cn(
          "size-full rounded-[inherit] outline-none",
          fade === "y" && "supports-[animation-timeline:scroll()]:scroll-fade-y",
          fade === "x" && "supports-[animation-timeline:scroll()]:scroll-fade-x",
        )}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-border"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
