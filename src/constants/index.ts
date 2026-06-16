/**
 * Constants barrel export
 * ─────────────────────────────────────────────────────────────────────────
 * Re-exports every constant module so consumers can do:
 *   import { BRAND, NAV_LINKS, HOME_TOWNS } from "@/constants";
 */

export { BRAND } from "./brand";
export { NAV_LINKS, type NavLink } from "./navigation";
export { HOME_TOWNS, type Town } from "./locations";
