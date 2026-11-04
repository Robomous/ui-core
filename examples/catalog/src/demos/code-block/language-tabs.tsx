import { CodeBlock } from "@robomous/ui-core";

const variants = [
  { label: "pnpm", language: "bash", code: "pnpm add @robomous/sdk @robomous/ui-core" },
  { label: "npm", language: "bash", code: "npm install @robomous/sdk @robomous/ui-core" },
  { label: "yarn", language: "bash", code: "yarn add @robomous/sdk @robomous/ui-core" },
];

/** `switcher="tabs"` lays the variants out as tabs above the block, best for two to four short alternatives like package managers. */
export default function LanguageTabs() {
  return <CodeBlock variants={variants} switcher="tabs" className="w-full max-w-xl" />;
}
