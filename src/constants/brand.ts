/**
 * Brand design tokens
 * ─────────────────────────────────────────────────────────────────────────
 * Centralised colour palette used for CTA buttons, links, and highlights.
 * Import from here instead of hard-coding hex values in components.
 */

export const BRAND = {
  /** Dark teal – primary CTA buttons */
  primary: "#003829",
  /** Darker teal – hover state for primary buttons */
  primaryHover: "#00291e",
  /** Medium teal – accent links and highlights */
  accent: "#006b50",
  /** Light blue tint – left-panel background */
  panelBg: "#f0f8ff",
} as const;
