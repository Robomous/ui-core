import { Spinner } from "@robomous/ui-core";

/** Spinner alone: role="status" and an aria-label announce it without any visible text. */
export default function Default() {
  return <Spinner />;
}
