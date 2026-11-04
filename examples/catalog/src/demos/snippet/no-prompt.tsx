import { Snippet } from "@robomous/ui-core";

/** `prompt={false}` for what is not a shell command: a URL, an identifier, a token. */
export default function NoPrompt() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="text-muted-foreground">Inference endpoint</span>
        <Snippet
          className="w-full"
          prompt={false}
          text="https://api.robomous.ai/v1/models/detector-v3.2"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-muted-foreground">Export location</span>
        <Snippet
          className="w-full"
          prompt={false}
          text="s3://vision-exports/pallet-detection/0412/"
        />
      </div>
    </div>
  );
}
