import { CodeBlock } from "@robomous/ui-core";

const code = `epochs: 120
batch_size: 32
learning_rate: 0.0004
augment:
  mosaic: true
  hsv: [0.015, 0.7, 0.4]
early_stop:
  metric: map50
  patience: 12`;

/** `referenceable` makes every line number a link; the line it targets lights up. */
export default function ReferencedLines() {
  return (
    <CodeBlock
      id="train-config"
      filename="detector-v3.2/train.yaml"
      language="yaml"
      code={code}
      referenceable
      className="w-full max-w-xl"
    />
  );
}
