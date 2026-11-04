import { CodeBlock } from "@robomous/ui-core";

const code = `from robomous import VisionSet

dataset = VisionSet.open("pallet-detection")
batch = dataset.batches.get("0412")

for frame in batch.frames(status="needs_review"):
    frame.assign(reviewer="maria.lopez")`;

/** `highlightLines` points at the lines the prose is talking about, and only those. */
export default function HighlightedLines() {
  return (
    <CodeBlock
      filename="assign_review.py"
      language="py"
      code={code}
      highlightLines={[6, 7]}
      className="w-full max-w-xl"
    />
  );
}
