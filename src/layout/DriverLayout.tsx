import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BellIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  MapIcon,
  TruckIcon,
  CalendarDaysIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Typography, IconButton } from "../lib/mt-components";
import logo from "../assets/logo.png";

const NAVIGATION = [
  { name: "Daily Route", href: "/driver/daily-route", icon: MapIcon },
  { name: "Special Pickups", href: "/driver/special-pickups", icon: TruckIcon },
  { name: "Apply Leave", href: "/driver/apply-leave", icon: CalendarDaysIcon },
];

export function DriverLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  // Current date for header
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });

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
        className={`fixed inset-y-0 left-0 z-50 w-56 transform bg-[#e6e9ef] flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          boxShadow: "16px 16px 32px #c4c7cc, -16px -16px 32px #ffffff",
        }}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 pt-6 pb-3">
          <Link to="/driver/dashboard" className="flex items-center gap-2">
            <img src={logo} alt="Agile CW Logo" className="h-10 w-auto object-contain" />
          </Link>
          <IconButton variant="text" color="blue-gray" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <XMarkIcon className="h-5 w-5" />
          </IconButton>
        </div>

        {/* Driver Info Card */}
        <div className="mx-4 mt-3 mb-2 p-4 rounded-xl bg-[#e6e9ef] shadow-[6px_6px_14px_#c4c7cc,-6px_-6px_14px_#ffffff]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center shadow-[2px_2px_4px_#c4c7cc,-2px_-2px_4px_#ffffff]">
              <UserCircleIcon className="w-9 h-9 text-gray-500" />
            </div>
            <div>
              <Typography className="font-bold text-sm text-gray-800">Driver ID: #4492</Typography>
              <Typography className="text-[11px] text-gray-500 font-medium">Shift: Morning (06:00 - 14:00)</Typography>
            </div>
          </div>
          <button className="w-full py-2 rounded-xl text-sm font-bold text-white bg-[#629955] shadow-[4px_4px_8px_#4e7a44,-4px_-4px_8px_#76b866] hover:shadow-[inset_2px_2px_4px_#4e7a44,inset_-2px_-2px_4px_#76b866] active:shadow-[inset_3px_3px_6px_#4e7a44,inset_-3px_-3px_6px_#76b866] transition-all duration-200">
            Start Shift
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {NAVIGATION.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-[#c5eacc] text-[#3d6e32] shadow-[4px_4px_10px_#c4c7cc,-4px_-4px_10px_#ffffff]"
                    : "text-gray-600 hover:bg-[#d9dce1]"
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? "text-[#3d6e32]" : "text-gray-500"}`} />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5 mt-auto">
          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-600 hover:bg-[#d9dce1] transition-all duration-200 cursor-pointer"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-500" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-14 shrink-0 px-4 sm:px-6 flex items-center bg-white/60 backdrop-blur-sm border-b border-gray-200/60 z-10">
          <div className="flex items-center gap-3 flex-1">
            <IconButton variant="text" color="blue-gray" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Bars3Icon className="h-6 w-6" />
            </IconButton>

            {/* Brand + Online badge */}
            <div className="hidden sm:flex items-center gap-2">
              <Typography className="font-extrabold text-base text-gray-800 tracking-tight">
                EcoCollect Smart
              </Typography>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-green-700">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Online
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-4">
            {/* Date & Route */}
            <div className="hidden md:flex flex-col items-end">
              <Typography className="text-xs font-semibold text-gray-700">{dateStr}</Typography>
              <Typography className="text-[10px] text-gray-400 font-medium">Route ID: RT-2023-994</Typography>
            </div>

            <IconButton variant="text" color="blue-gray" className="rounded-full relative text-gray-500 hover:text-gray-700">
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></span>
            </IconButton>
            <IconButton variant="text" color="blue-gray" className="rounded-full text-gray-500 hover:text-gray-700">
              <Cog6ToothIcon className="h-5 w-5" />
            </IconButton>

            {/* Online badge (mobile) */}
            <div className="sm:hidden flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 border border-green-200">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-[11px] font-semibold text-green-700">Online</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 pt-2">
          {children}
        </div>
      </main>

      {/* Logout Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#e6e9ef]/60 backdrop-blur-md">
          <div className="bg-[#e6e9ef] p-8 rounded-3xl shadow-[20px_20px_40px_#c4c7cc,-20px_-20px_40px_#ffffff] w-[90%] max-w-sm border border-white/50">
            <Typography variant="h5" color="blue-gray" className="font-bold mb-3 text-center">
              Logout Confirmation
            </Typography>
            <Typography className="text-sm font-medium text-gray-600 mb-8 text-center">
              Are you sure you want to log out of your session?
            </Typography>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="px-6 py-2.5 rounded-xl font-bold text-sm text-gray-700 bg-[#e6e9ef] shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] hover:shadow-[inset_2px_2px_5px_#c4c7cc,inset_-2px_-2px_5px_#ffffff] transition-shadow duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-6 py-2.5 rounded-xl font-bold text-sm text-red-500 bg-[#ffd9d9] shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] hover:shadow-[inset_2px_2px_5px_#c4c7cc,inset_-2px_-2px_5px_#ffffff] transition-shadow duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
