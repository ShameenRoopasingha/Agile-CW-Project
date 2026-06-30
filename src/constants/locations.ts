/**
 * Location / geography data
 * ─────────────────────────────────────────────────────────────────────────
 * Static lists of towns, districts, etc. used by form dropdowns.
 * Expand these arrays as coverage grows.
 */

export interface Town {
  value: string;
  label: string;
}

export const HOME_TOWNS: readonly Town[] = [
  { value: "colombo", label: "Colombo" },
  { value: "kandy", label: "Kandy" },
  { value: "galle", label: "Galle" },
];
