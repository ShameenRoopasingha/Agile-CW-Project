import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

// ── Shared modules ─────────────────────────────────────────────────────
import {
  Typography,
  Button,
  IconButton,
  NavbarBase,
  MobileNav,
} from "../lib/mt-components";
import { NAV_LINKS } from "../constants";

// ── Component ──────────────────────────────────────────────────────────

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /** Renders the list of navigation links (shared between desktop & mobile). */
  const renderLinks = (extraClasses = "") =>
    NAV_LINKS.map(({ label, href }) => (
      <li key={label}>
        <Typography
          as="a"
          href={href}
          className={`text-sm font-normal text-blue-gray-700 hover:text-blue-900 ${extraClasses}`}
        >
          {label}
        </Typography>
      </li>
    ));

  return (
    <NavbarBase className="mx-auto max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-3 shadow-sm fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        {/* ── Brand: icon + name ── */}
        <Typography
          as="a"
          href="#"
          className="mr-4 flex items-center gap-2 cursor-pointer py-1.5 font-semibold text-lg"
        >
          <ArrowPathIcon className="h-5 w-5 text-[#003829]" />
          EcoCycle Citizen Portal
        </Typography>

        {/* ── Desktop: nav links + Login grouped on the right ── */}
        <div className="hidden lg:flex items-center gap-8">
          <nav aria-label="Main navigation">
            <ul className="mb-0 flex items-center gap-8">
              {renderLinks()}
            </ul>
          </nav>
          <Button
            size="sm"
            className="!bg-[#003829] !text-white hover:!bg-[#00291e] rounded-full px-6"
          >
            Login
          </Button>
        </div>

        {/* ── Mobile hamburger toggle ── */}
        <IconButton
          variant="text"
          aria-label="Toggle navigation menu"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent lg:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <Bars3Icon className="h-6 w-6" />
        </IconButton>
      </div>

      {/* ── Mobile slide-down menu ── */}
      <MobileNav open={isMobileMenuOpen} className="overflow-hidden lg:hidden">
        <ul className="mb-4 flex flex-col gap-3">
          {renderLinks("block py-2")}
          <li>
            <Button
              size="sm"
              className="!bg-[#003829] !text-white hover:!bg-[#00291e]"
              fullWidth
            >
              Login
            </Button>
          </li>
        </ul>
      </MobileNav>
    </NavbarBase>
  );
};