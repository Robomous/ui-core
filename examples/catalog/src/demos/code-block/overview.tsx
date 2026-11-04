import { CodeBlock } from "@robomous/ui-core";

const code = `from robomous import Models, Datasets

# Fine-tune the detector on the latest reviewed batch.
dataset = Datasets.open("pallet-detection")
run = Models.train(
    "detector-v3.2",
    dataset=dataset.batches.latest(status="approved"),
    epochs=60,
    gpu="a10g",
)

print(run.id, run.state)`;

/** A filename header with a copy button and line numbers: the block as most pages use it. */
export default function Overview() {
  return <CodeBlock filename="finetune.py" language="py" code={code} className="w-full max-w-xl" />;
}
