import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BellIcon,
  UserCircleIcon,
  Squares2X2Icon,
  UsersIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  TruckIcon,
  MapPinIcon,
  MapIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";
import { Typography, IconButton } from "../lib/mt-components";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

const NAVIGATION = [
  { name: "Dashboard", href: "/fleet/dashboard", icon: Squares2X2Icon },
  { name: "Route Management", href: "/fleet/routes", icon: MapIcon },
  { name: "Live Tracking", href: "/fleet/tracking", icon: MapPinIcon },
  { name: "Fleet Management", href: "/fleet/management", icon: TruckIcon },
  { name: "Driver Management", href: "/fleet/drivers", icon: UsersIcon },
  { name: "Employees", href: "/fleet/employees", icon: UserGroupIcon },
];

export function FleetLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const location = useLocation();
  
  const { logout, user } = useAuth();

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    logout();
  };

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
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-[#e6e9ef] flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        style={{
          boxShadow: "16px 16px 32px #c4c7cc, -16px -16px 32px #ffffff"
        }}
      >
        <div className="flex items-center justify-between px-6 pt-8 pb-4">
          <div>
            <Link to="/fleet/dashboard" className="flex items-center gap-2">
              <img src={logo} alt="Agile CW Logo" className="h-10 w-auto object-contain" />
            </Link>
            <Typography variant="small" color="gray" className="mt-2 font-medium">
              fleet manager
            </Typography>
          </div>
          <IconButton variant="text" color="blue-gray" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <XMarkIcon className="h-6 w-6" />
          </IconButton>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {NAVIGATION.map((item) => {
            const isActive = location.pathname.startsWith(item.href) || (item.href === "#" && false);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
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
          <button
            onClick={handleLogoutClick}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[#c5eacc] text-[#3d6e32] font-semibold hover:bg-[#b0dfb9] transition-colors cursor-pointer"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 shrink-0 px-4 sm:px-6 flex items-center border-b border-gray-300/50 bg-[#e6e9ef] z-10">
          <div className="flex items-center gap-4 flex-1">
            <IconButton variant="text" color="blue-gray" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Bars3Icon className="h-6 w-6" />
            </IconButton>

            {/* Conditional Title */}
            <div className="hidden md:flex flex-1 items-center">
              {location.pathname.includes('/fleet/drivers') && (
                <div>
                  <Typography variant="h5" color="blue-gray" className="font-bold text-xl mb-1 tracking-tight">
                    Driver Force
                  </Typography>
                  <Typography variant="small" color="gray" className="font-medium text-sm text-gray-500">
                    Manage, assign, and monitor operator status across the fleet network.
                  </Typography>
                </div>
              )}
              {location.pathname.includes('/fleet/employees') && (
                <div>
                  <Typography variant="h5" color="blue-gray" className="font-bold text-xl mb-1 tracking-tight">
                    Collection Employees
                  </Typography>
                  <Typography variant="small" color="gray" className="font-medium text-sm text-gray-500">
                    Manage collectors, helpers, and supervisors across all active shifts.
                  </Typography>
                </div>
              )}
              {location.pathname.includes('/fleet/management') && (
                <div>
                  <Typography variant="h5" color="blue-gray" className="font-bold text-xl mb-1 tracking-tight">
                    Fleet Management
                  </Typography>
                  <Typography variant="small" color="gray" className="font-medium text-sm text-gray-500">
                    Overview of active trucks and maintenance statuses.
                  </Typography>
                </div>
              )}
              {location.pathname.includes('/fleet/tracking') && (
                <div>
                  <Typography variant="h5" color="blue-gray" className="font-bold text-xl mb-1 tracking-tight">
                    Live Tracking
                  </Typography>
                  <Typography variant="small" color="gray" className="font-medium text-sm text-gray-500">
                    Monitor active routes and real-time fleet locations.
                  </Typography>
                </div>
              )}
              {location.pathname.includes('/fleet/routes') && (
                <div>
                  <Typography variant="h5" color="blue-gray" className="font-bold text-xl mb-1 tracking-tight">
                    Route Management
                  </Typography>
                  <Typography variant="small" color="gray" className="font-medium text-sm text-gray-500">
                    Generate and oversee weekly collection routes.
                  </Typography>
                </div>
              )}
              {location.pathname.includes('/fleet/dashboard') && (
                <div>
                  <Typography variant="h5" color="blue-gray" className="font-bold text-xl mb-1 tracking-tight">
                    Command Center
                  </Typography>
                  <Typography variant="small" color="gray" className="font-medium text-sm text-gray-500">
                    Comprehensive overview of fleet operations.
                  </Typography>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 ml-4">
            <IconButton variant="text" color="blue-gray" className="rounded-full relative text-gray-600">
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </IconButton>
            <div className="h-8 w-px bg-gray-300 hidden sm:block"></div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <Typography variant="small" color="blue-gray" className="font-bold text-sm leading-tight text-gray-900">
                  {user?.name || "Fleet Admin"}
                </Typography>
                <Typography variant="small" color="gray" className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                  Fleet Manager
                </Typography>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden shadow-[2px_2px_4px_#c4c7cc,-2px_-2px_4px_#ffffff]">
                <UserCircleIcon className="w-full h-full text-gray-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 pt-2">
          {children}
        </div>
      </main>

      {/* Logout Dialog Overlay */}
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
