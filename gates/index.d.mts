/**
 * Hand-written declarations for `@robomous/ui-core/gates` — the module is
 * plain ESM JavaScript (it runs under `node --test` with no build step), so
 * its types are maintained here beside it.
 */

// ---- canonical ----
export function additiveOnly(
  snapshot: string,
  actual: string,
): { ok: true } | { ok: false; missing: string };
export const FRAMEWORK_ADAPTERS: string[];
export const ADAPTER_REMOVED_LINES: string[];
export function withoutLines(text: string, removed: readonly string[]): string;
export function checkAdapter(
  file: string,
  actualText: string,
): { ok: true; isAdapter: boolean } | { ok: false; reason: string };

// ---- rosters and vocabulary ----
export function variantKeys(source: string, block?: string): string[];
export function variantClasses(source: string, key: string): string;
export const OFFICIAL_BADGE: string[];
export const FOUNDATION_BADGE: string[];
export const BUTTON_VARIANTS: string[];
export const BUTTON_SIZES: string[];
export function openTagsIn(text: string, tagName: string): { at: number; tag: string }[];
export function legacyVocabularyIn(file: string, text: string): string[];
export function statusPaletteIn(file: string, text: string): string[];
export function competingStatusPaletteIn(file: string, text: string): string[];
export function statusTokenUtilitiesIn(file: string, text: string): string[];
export function menuSurfaceGapsIn(file: string, text: string): string[];

// ---- colour discipline ----
export function colouredClassesIn(file: string, text: string): string[];
export function brandUsagesIn(
  file: string,
  text: string,
): { file: string; at: number; text: string }[];
export function retiredDeclarationsIn(text: string): string[];

// ---- stylesheet parsing ----
export function normalize(value: string): string;
export function blockBody(css: string, header: string): string;
export function rawDeclarations(block: string): Map<string, string>;
export function declarations(block: string): Map<string, string>;
export const SEMANTIC_NAMES: string[];

// ---- foundation facts ----
export function snapshotsDir(): string;
export function foundationTokenNames(): string[];
