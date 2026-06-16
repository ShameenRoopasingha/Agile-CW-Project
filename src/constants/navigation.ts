/**
 * Navigation links
 * ─────────────────────────────────────────────────────────────────────────
 * Single source of truth for the site-wide nav items.
 * Used by both the desktop and mobile menus in the Navbar component.
 */

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Home", href: "#" },
  { label: "Public Schedule", href: "#schedule" },
  { label: "Guidelines", href: "#guidelines" },
];
