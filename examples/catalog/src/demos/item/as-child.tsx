import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@robomous/ui-core";
import { ChevronRightIcon } from "@robomous/ui-core/icons";

const datasets = [
  {
    slug: "pallet-detection",
    detail: "18,204 frames, 4 batches in review",
    image: "/assets/frames/dock.svg",
  },
  {
    slug: "forklift-night",
    detail: "8,730 frames, all reviewed",
    image: "/assets/frames/aisle-night.svg",
  },
  {
    slug: "shelf-inspection-2026",
    detail: "860 frames, annotation not started",
    image: "/assets/frames/aisle-3.svg",
  },
];

/** `asChild` hands the row's classes to an anchor: the whole item is one link and one tab stop, and the row tints on hover. */
export default function AsChild() {
  return (
    <nav aria-label="Datasets" className="flex w-full max-w-md flex-col gap-1">
      {datasets.map((dataset) => (
        <Item key={dataset.slug} asChild variant="outline">
          <a href={`/datasets/${dataset.slug}`}>
            <ItemMedia variant="image">
              <img
                src={dataset.image}
                alt=""
                loading="lazy"
                className="outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
              />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{dataset.slug}</ItemTitle>
              <ItemDescription>{dataset.detail}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon className="size-4 text-muted-foreground" aria-hidden="true" />
            </ItemActions>
          </a>
        </Item>
      ))}
    </nav>
  );
}
