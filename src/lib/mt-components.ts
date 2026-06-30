/**
 * Material Tailwind – type-safe re-exports
 * ─────────────────────────────────────────────────────────────────────────
 * Material Tailwind v2 ships with incomplete TypeScript definitions for
 * React 18.  Every component import across the app would otherwise need
 * its own `as unknown as ComponentType<any>` cast + eslint-disable comment.
 *
 * This module does the cast ONCE and re-exports clean, importable symbols.
 * See: https://github.com/creativetimofficial/material-tailwind/issues/528
 */

import type { ComponentType } from "react";

import {
  Typography as MTTypography,
  Input as MTInput,
  Select as MTSelect,
  Option as MTOption,
  Button as MTButton,
  Alert as MTAlert,
  Navbar as MTNavbar,
  IconButton as MTIconButton,
  MobileNav as MTMobileNav,
  Card as MTCard,
  CardBody as MTCardBody,
} from "@material-tailwind/react";

/* eslint-disable @typescript-eslint/no-explicit-any -- centralised MT workaround */
export const Typography = MTTypography as unknown as ComponentType<any>;
export const Input      = MTInput      as unknown as ComponentType<any>;
export const Select     = MTSelect     as unknown as ComponentType<any>;
export const Option     = MTOption     as unknown as ComponentType<any>;
export const Button     = MTButton     as unknown as ComponentType<any>;
export const Alert      = MTAlert      as unknown as ComponentType<any>;
export const NavbarBase = MTNavbar     as unknown as ComponentType<any>;
export const IconButton = MTIconButton as unknown as ComponentType<any>;
export const MobileNav  = MTMobileNav  as unknown as ComponentType<any>;
export const Card       = MTCard       as unknown as ComponentType<any>;
export const CardBody   = MTCardBody   as unknown as ComponentType<any>;
/* eslint-enable @typescript-eslint/no-explicit-any */
