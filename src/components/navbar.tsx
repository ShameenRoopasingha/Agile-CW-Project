import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";

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
  const location = useLocation();

  // Dynamically switch the auth button between Login and Sign Up
  const isOnLogin = location.pathname === "/login";
  const authLabel = isOnLogin ? "Sign Up" : "Login";
  const authPath = isOnLogin ? "/signup" : "/login";

  // Close mobile menu when screen size increases past 960px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        <Link
          to="/"
          className="mr-4 flex items-center gap-2.5 cursor-pointer py-1.5 font-bold text-xl tracking-tight text-[#003829] hover:opacity-90 transition-opacity"
        >
          <img src={logo} alt="Clean Lanka Logo" className="h-9 w-auto object-contain" />
          Clean Lanka
        </Link>

        {/* ── Desktop: nav links + Login grouped on the right ── */}
        <div className="hidden lg:flex items-center gap-8">
          <nav aria-label="Main navigation">
            <ul className="mb-0 flex items-center gap-8">
              {renderLinks()}
            </ul>
          </nav>
          <Link to={authPath}>
            <Button
              size="sm"
              className="!bg-[#003829] !text-white hover:!bg-[#00291e] rounded-full px-6"
            >
              {authLabel}
            </Button>
          </Link>
        </div>

        {/* ── Mobile hamburger toggle ── */}
        <IconButton
          variant="text"
          aria-label="Toggle navigation menu"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent lg:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6 stroke-2" />
          ) : (
            <Bars3Icon className="h-6 w-6 stroke-2" />
          )}
        </IconButton>
      </div>

      {/* ── Mobile slide-down menu ── */}
      <MobileNav open={isMobileMenuOpen} className="overflow-hidden lg:hidden">
        <ul className="mb-4 flex flex-col gap-3">
          {renderLinks("block py-2")}
          <li>
            <Link to={authPath}>
              <Button
                size="sm"
                className="!bg-[#003829] !text-white hover:!bg-[#00291e]"
                fullWidth
              >
                {authLabel}
              </Button>
            </Link>
          </li>
        </ul>
      </MobileNav>
    </NavbarBase>
  );
};