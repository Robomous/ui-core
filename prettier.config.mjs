/**
 * Prettier is the half of the formatting story that gets *checked*.
 *
 * `.editorconfig` tells an editor what to do and `.gitattributes` holds the
 * line endings, but neither can fail a build — and a rule nothing checks is a
 * preference (DESIGN.md says so about the design rules; it is no less true
 * here). `pnpm format:check` is what makes this one a rule.
 *
 * Only two options depart from Prettier's defaults, and both match what the
 * repository already does rather than imposing a new taste:
 *
 * - `printWidth: 100` is the prose convention in `DESIGN.md` and `README.md`,
 *   where the 95th-percentile line is 99 characters. Leaving it at 80 would
 *   rewrap most of the package for no reason.
 * - `semi: true` is Prettier's default, and it is also what the hand-written
 *   modules here already do — `src/index.ts`, `src/theme/` and `src/gates/`.
 *   The component files are the ones that will change, in the one direction
 *   that converges the two halves of the package on a single answer.
 *
 * eslint carries no stylistic rules (see `eslint.config.js`), so there is
 * nothing for the two tools to disagree about and no need for a compatibility
 * plugin between them.
 */
export default {
  printWidth: 100,
  semi: true,
};
