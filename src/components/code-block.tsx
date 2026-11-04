"use client";

import * as React from "react";
import { FileCodeIcon } from "lucide-react";

import { cn } from "cn";
import { CopyIconSwap, useCopy } from "@/lib/clipboard";
import { Button } from "./button.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select.js";

/** One version of the block for a language switcher. */
interface CodeBlockVariant {
  /** The switcher's label: `Python`, `TypeScript`, `cURL`. */
  label: string;
  code: string;
  language?: string;
  filename?: string;
}

const KEYWORDS = new Set(
  (
    "import from export default function return const let var if else for while do switch case " +
    "break continue async await class extends new this super typeof instanceof in of as type " +
    "interface enum implements public private readonly static try catch finally throw yield " +
    "def lambda pass raise except with global nonlocal elif not and or is del assert print " +
    "true false null undefined None True False void echo then fi done esac local"
  ).split(" "),
);

type Token = {
  kind: "plain" | "comment" | "string" | "number" | "keyword" | "fn" | "tag";
  text: string;
};

const TOKEN_CLASS: Record<Token["kind"], string> = {
  plain: "",
  comment: "text-muted-foreground italic",
  string: "text-emerald-700 dark:text-emerald-400",
  number: "text-sky-700 dark:text-sky-400",
  keyword: "text-pink-700 dark:text-pink-400",
  fn: "text-violet-700 dark:text-violet-400",
  tag: "text-sky-700 dark:text-sky-400",
};

const HASH_COMMENTS = new Set([
  "py",
  "python",
  "sh",
  "bash",
  "shell",
  "zsh",
  "yaml",
  "yml",
  "toml",
  "rb",
  "ruby",
]);

/**
 * A small, line-at-a-time highlighter: comments, strings, numbers, keywords,
 * calls and JSX tags. It is deliberately not a parser — a string or comment
 * that spans lines colours its first line only — because a code sample should
 * not ship a grammar engine. A block that needs exact highlighting passes
 * `highlight={false}` and pre-rendered lines through `renderLine`.
 */
function tokenize(line: string, language?: string): Token[] {
  const comment = HASH_COMMENTS.has(language ?? "")
    ? String.raw`#.*`
    : String.raw`\/\/.*|\/\*.*?\*\/`;
  const pattern = new RegExp(
    [
      `(${comment})`,
      String.raw`("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\`(?:\\.|[^\`\\])*\`)`,
      String.raw`(\b\d[\d_]*(?:\.\d+)?\b)`,
      String.raw`(<\/?[A-Za-z][\w.-]*)`,
      String.raw`([A-Za-z_$][\w$]*)(?=\s*\()`,
      String.raw`([A-Za-z_$][\w$]*)`,
    ].join("|"),
    "g",
  );
  const tokens: Token[] = [];
  let last = 0;
  for (const match of line.matchAll(pattern)) {
    if (match.index > last) tokens.push({ kind: "plain", text: line.slice(last, match.index) });
    const [text, isComment, isString, isNumber, isTag, isFn] = match;
    let kind: Token["kind"] = "plain";
    if (isComment) kind = "comment";
    else if (isString) kind = "string";
    else if (isNumber) kind = "number";
    else if (isTag) kind = "tag";
    else if (KEYWORDS.has(text)) kind = "keyword";
    else if (isFn) kind = "fn";
    tokens.push({ kind, text });
    last = match.index + text.length;
  }
  if (last < line.length) tokens.push({ kind: "plain", text: line.slice(last) });
  return tokens;
}

/**
 * Multi-line source for the reader to scan or paste: a filename header with a
 * copy button, line numbers, and three ways to point at lines — `highlightLines`
 * for the ones under discussion, `addedLines`/`removedLines` for a change, and
 * `referenceable` to make every line number a link to its line. `variants`
 * turns the header into a language switcher (`switcher="tabs"` for tabs).
 *
 * The removed lines stay in the copy, marked; what lands on the clipboard is
 * the code with the removed lines dropped, so a pasted diff runs.
 */
function CodeBlock({
  className,
  code = "",
  language,
  filename,
  variants,
  switcher = "select",
  showLineNumbers = true,
  highlightLines = [],
  addedLines = [],
  removedLines = [],
  referenceable = false,
  highlight = true,
  renderLine,
  actions,
  id: idProp,
  ...props
}: Omit<React.ComponentProps<"figure">, "children"> & {
  code?: string;
  /** Picks the comment syntax for the highlighter: `tsx`, `py`, `bash`, `json`… */
  language?: string;
  filename?: string;
  variants?: CodeBlockVariant[];
  switcher?: "select" | "tabs";
  showLineNumbers?: boolean;
  /** 1-based line numbers. Highlight only what is under discussion. */
  highlightLines?: number[];
  addedLines?: number[];
  removedLines?: number[];
  /** Every line number becomes a link to `#<id>-L<n>`; the targeted line highlights. */
  referenceable?: boolean;
  highlight?: boolean;
  /** Renders a line yourself — for output from a real highlighter. */
  renderLine?: (line: string, index: number) => React.ReactNode;
  /** Extra controls at the header's trailing edge, ahead of the copy button. */
  actions?: React.ReactNode;
}) {
  const reactId = React.useId();
  const id = idProp ?? `code${reactId.replace(/[^\w-]/g, "")}`;
  const [variantIndex, setVariantIndex] = React.useState(0);
  const variant = variants?.[variantIndex];
  const source = (variant?.code ?? code).replace(/\n$/, "");
  const lang = variant?.language ?? language;
  const name = variant?.filename ?? filename;
  const lines = source.split("\n");
  const copy = useCopy();

  const isDiff = addedLines.length > 0 || removedLines.length > 0;
  const copyText = lines.filter((_, index) => !removedLines.includes(index + 1)).join("\n");

  const copyButton = (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Copy code"
      data-copied={copy.copied || undefined}
      className="text-muted-foreground data-copied:text-success"
      onClick={() => copy.copy(copyText)}
    >
      <CopyIconSwap copied={copy.copied} />
    </Button>
  );

  const header = name || (variants && switcher === "select") || actions;
  const tabs = Boolean(variants && switcher === "tabs");

  return (
    <figure
      id={id}
      data-slot="code-block"
      className={cn(
        "relative flex flex-col overflow-hidden rounded-lg border bg-background text-xs has-[>pre:focus-visible]:ring-2 has-[>pre:focus-visible]:ring-ring/30",
        className,
      )}
      {...props}
    >
      {variants && switcher === "tabs" && (
        <div
          role="tablist"
          aria-label="Language"
          className="flex items-center gap-1 border-b p-1"
          onKeyDown={(event) => {
            // One tab stop for the row; the arrows, Home and End move along it
            // and select as they go, as a tablist does.
            const last = variants.length - 1;
            const next = {
              ArrowRight: variantIndex === last ? 0 : variantIndex + 1,
              ArrowLeft: variantIndex === 0 ? last : variantIndex - 1,
              Home: 0,
              End: last,
            }[event.key];
            if (next === undefined) return;
            event.preventDefault();
            setVariantIndex(next);
            event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus();
          }}
        >
          {variants.map((item, index) => (
            <button
              key={item.label}
              id={`${id}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={index === variantIndex}
              aria-controls={`${id}-panel`}
              tabIndex={index === variantIndex ? 0 : -1}
              onClick={() => setVariantIndex(index)}
              className="h-6 rounded-md px-2 font-medium text-muted-foreground transition-colors duration-150 ease-out outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/30 aria-selected:bg-muted aria-selected:text-foreground"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
      {header ? (
        <figcaption className="flex h-9 items-center gap-2 border-b pr-1 pl-3">
          {name && (
            <>
              <FileCodeIcon aria-hidden className="size-3.5 shrink-0 text-muted-foreground" />
              <span className="min-w-0 truncate font-mono text-muted-foreground">{name}</span>
            </>
          )}
          <span className="ml-auto flex items-center gap-1">
            {actions}
            {variants && switcher === "select" && (
              <Select
                value={String(variantIndex)}
                onValueChange={(value) => setVariantIndex(Number(value))}
              >
                <SelectTrigger
                  size="sm"
                  aria-label="Language"
                  className="border-0 bg-transparent shadow-none hover:bg-muted dark:bg-transparent"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end" position="popper">
                  {variants.map((item, index) => (
                    <SelectItem key={item.label} value={String(index)}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {copyButton}
          </span>
        </figcaption>
      ) : (
        <span className="absolute top-1.5 right-1.5 z-10">{copyButton}</span>
      )}
      <pre
        tabIndex={0}
        {...(tabs
          ? {
              id: `${id}-panel`,
              role: "tabpanel",
              "aria-labelledby": `${id}-tab-${variantIndex}`,
            }
          : { "aria-label": name ? `${name} source` : "Code" })}
        className={cn(
          "overflow-x-auto py-3 font-mono text-xs/5 outline-none supports-[animation-timeline:scroll()]:scroll-fade-x",
          !header && "pr-12",
        )}
      >
        <code className="grid min-w-max">
          {lines.map((line, index) => {
            const n = index + 1;
            const added = addedLines.includes(n);
            const removed = removedLines.includes(n);
            const marked = highlightLines.includes(n);
            return (
              <span
                key={index}
                id={referenceable ? `${id}-L${n}` : undefined}
                data-line={n}
                data-highlighted={marked || undefined}
                data-diff={added ? "added" : removed ? "removed" : undefined}
                className={cn(
                  "flex pr-4 pl-3",
                  marked && "bg-info/10 shadow-[inset_2px_0_0_var(--color-info)]",
                  added && "bg-success/10 shadow-[inset_2px_0_0_var(--color-success)]",
                  removed && "bg-destructive/10 shadow-[inset_2px_0_0_var(--color-destructive)]",
                  referenceable &&
                    "scroll-mt-12 target:bg-warning/15 target:shadow-[inset_2px_0_0_var(--color-warning)]",
                )}
              >
                {showLineNumbers &&
                  (referenceable ? (
                    <a
                      href={`#${id}-L${n}`}
                      aria-label={`Line ${n}`}
                      className="w-8 shrink-0 pr-4 text-right text-muted-foreground/70 tabular-nums select-none hover:text-foreground"
                    >
                      {n}
                    </a>
                  ) : (
                    <span
                      aria-hidden
                      className="w-8 shrink-0 pr-4 text-right text-muted-foreground/70 tabular-nums select-none"
                    >
                      {n}
                    </span>
                  ))}
                {isDiff && (
                  <span
                    aria-hidden
                    className={cn(
                      "w-4 shrink-0 select-none",
                      added && "text-success",
                      removed && "text-destructive",
                    )}
                  >
                    {added ? "+" : removed ? "-" : " "}
                  </span>
                )}
                {removed && <span className="sr-only">Removed: </span>}
                {added && <span className="sr-only">Added: </span>}
                <span className="whitespace-pre">
                  {renderLine
                    ? renderLine(line, index)
                    : highlight
                      ? tokenize(line, lang).map((token, i) =>
                          token.kind === "plain" ? (
                            token.text
                          ) : (
                            <span key={i} className={TOKEN_CLASS[token.kind]}>
                              {token.text}
                            </span>
                          ),
                        )
                      : line}
                  {/* An empty line still takes its height. */}
                  {line === "" && !renderLine ? " " : null}
                </span>
              </span>
            );
          })}
        </code>
      </pre>
    </figure>
  );
}

export { CodeBlock };
export type { CodeBlockVariant };
