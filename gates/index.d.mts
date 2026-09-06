/**
 * Hand-written declarations for `@robomous/ui-core/gates` — the module is
 * plain ESM JavaScript (it runs under `node --test` with no build step), so
 * its types are maintained here beside it.
 */

// ---- status palette discipline ----
export function statusPaletteIn(file: string, text: string): string[];
export function competingStatusPaletteIn(file: string, text: string): string[];

// ---- colour discipline ----
export function colouredClassesIn(file: string, text: string): string[];
export function brandUsagesIn(
  file: string,
  text: string,
): { file: string; at: number; text: string }[];

// ---- stylesheet parsing ----
export function blockBody(css: string, header: string): string;
export function rawDeclarations(block: string): Map<string, string>;
export function declarations(block: string): Map<string, string>;

// ---- foundation facts ----
export function foundationTokenNames(): string[];
