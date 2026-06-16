import type { ReactNode } from "react";
import { Navbar } from "../components/navbar";

interface LayoutProps {
  children: ReactNode;
}

/**
 * Top-level page shell.
 *
 * Renders the sticky navigation bar, the page content passed via `children`,
 * and a simple site-wide footer.  Every route/page should be wrapped with
 * this component to keep the chrome consistent.
 *
 * The navbar is sticky at the top, so `main` gets top-padding equal to the
 * navbar height (~64px) to prevent content from hiding underneath.
 */
export const Layout = ({ children }: LayoutProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Navbar />

      {/* pt-16 = 64px to clear the sticky navbar, pb-14 to clear the fixed footer */}
      <main className="min-h-screen flex flex-col pt-16 pb-14">{children}</main>

      <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-blue-gray-100 bg-white py-3 px-4 sm:px-8 text-sm text-blue-gray-600">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-medium text-xs">
            EcoCycle &nbsp;|&nbsp; &copy; {currentYear} EcoCycle Waste Management. All rights reserved.
          </p>
          <nav className="flex items-center gap-4 text-xs">
            <a href="#" className="hover:text-blue-gray-900">Privacy Policy</a>
            <a href="#" className="hover:text-blue-gray-900">Terms of Service</a>
            <a href="#" className="hover:text-blue-gray-900">Contact Support</a>
            <a href="#" className="hover:text-blue-gray-900">Accessibility</a>
          </nav>
        </div>
      </footer>
    </>
  );
};
