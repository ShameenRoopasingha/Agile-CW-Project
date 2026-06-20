import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon,
  Squares2X2Icon,
  UsersIcon,
  UserGroupIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { Typography, Input, IconButton } from "../lib/mt-components";

const NAVIGATION = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Squares2X2Icon },
  { name: "Staff Management", href: "#", icon: UsersIcon },
  { name: "Citizen Accounts", href: "#", icon: UserGroupIcon },
  { name: "Manage Complaints", href: "#", icon: ChatBubbleLeftEllipsisIcon },
  { name: "System Settings", href: "#", icon: Cog6ToothIcon },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#e6e9ef] overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-[#e6e9ef] flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          boxShadow: "16px 16px 32px #c4c7cc, -16px -16px 32px #ffffff"
        }}
      >
        <div className="flex items-center justify-between px-6 pt-8 pb-4">
          <div>
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#629955] [clip-path:polygon(50%_0%,0%_100%,100%_100%)]"></div>
              <Typography variant="h5" color="blue-gray" className="font-bold text-xl tracking-tight">
                EcoCycle
              </Typography>
            </Link>
            <Typography variant="small" color="gray" className="mt-2 font-medium">
              system administrator
            </Typography>
          </div>
          <IconButton variant="text" color="blue-gray" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <XMarkIcon className="h-6 w-6" />
          </IconButton>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {NAVIGATION.map((item) => {
            const isActive = location.pathname === item.href || (item.href === "#" && false);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-[#6cf3b7] text-black shadow-[4px_4px_10px_#c4c7cc,-4px_-4px_10px_#ffffff]"
                    : "text-gray-600 hover:bg-[#d9dce1]"
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? "text-black" : "text-gray-500"}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mb-4">
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#c5eacc] text-[#3d6e32] font-semibold hover:bg-[#b0dfb9] transition-colors"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            Log out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 shrink-0 px-4 sm:px-6 flex items-center justify-between border-b border-gray-300/50 bg-[#e6e9ef]/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4">
            <IconButton variant="text" color="blue-gray" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Bars3Icon className="h-6 w-6" />
            </IconButton>
            <div className="hidden md:block w-72">
              <Input
                type="text"
                placeholder="Global Search.."
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                className="!border-none !bg-[#f0f2f5] !rounded-xl shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff]"
                labelProps={{ className: "hidden" }}
                crossOrigin={undefined}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <IconButton variant="text" color="blue-gray" className="rounded-full">
              <BellIcon className="h-6 w-6" />
            </IconButton>
            <div className="h-8 w-px bg-gray-300 hidden sm:block"></div>
            <div className="flex items-center gap-3">
              <Typography variant="small" color="blue-gray" className="font-semibold hidden sm:block">
                Profile
              </Typography>
              <UserCircleIcon className="h-9 w-9 text-gray-700" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
