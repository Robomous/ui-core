import pkg from "../../../../package.json";

/** The one place the site names the package, its version and its repository. */
export const SITE = {
  name: pkg.name,
  short: "ui-core",
  version: pkg.version,
  repo: "https://github.com/Robomous/ui-core",
  npm: `https://www.npmjs.com/package/${pkg.name}`,
} as const;
