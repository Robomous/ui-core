import { CodeBlock } from "@robomous/ui-core";

const variants = [
  {
    label: "Python",
    language: "py",
    filename: "deploy.py",
    code: `from robomous import Models

endpoint = Models.deploy("detector-v3.2", gpu="a10g", replicas=2)
print(endpoint.url)`,
  },
  {
    label: "TypeScript",
    language: "ts",
    filename: "deploy.ts",
    code: `import { models } from "@robomous/sdk";

const endpoint = await models.deploy("detector-v3.2", { gpu: "a10g", replicas: 2 });
console.log(endpoint.url);`,
  },
  {
    label: "cURL",
    language: "bash",
    filename: "deploy.sh",
    code: `curl -X POST https://api.robomous.ai/v1/models/detector-v3.2/deploy \\
  -H "Authorization: Bearer $ROBOMOUS_TOKEN" \\
  -d '{"gpu": "a10g", "replicas": 2}'`,
  },
];

/** `variants` puts a language picker in the header; each variant can carry its own filename. */
export default function LanguageSwitcher() {
  return <CodeBlock variants={variants} className="w-full max-w-xl" />;
}
