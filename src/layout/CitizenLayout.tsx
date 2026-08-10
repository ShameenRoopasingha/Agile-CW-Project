import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BellIcon,
  UserCircleIcon,
  CalendarDaysIcon,
  TruckIcon,
  ArchiveBoxIcon,
  CreditCardIcon,
  ChatBubbleLeftEllipsisIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Typography, IconButton } from "../lib/mt-components";
import logo from "../assets/logo.png";

const NAVIGATION = [
  { name: "Calendar", href: "/citizen/dashboard", icon: CalendarDaysIcon },
  { name: "Add Location", href: "/citizen/add-location", icon: MapPinIcon },
  { name: "Track Garbage Truck", href: "/citizen/schedule", icon: TruckIcon },
  { name: "Bulky Waste", href: "/citizen/bulky-waste", icon: ArchiveBoxIcon },
  // { name: "Payments", href: "/citizen/profile", icon: CreditCardIcon },
  { name: "My Complaints", href: "/citizen/complaints", icon: ChatBubbleLeftEllipsisIcon },
  // { name: "Violation Notices", href: "/citizen/violations", icon: ExclamationTriangleIcon },
];

export function CitizenLayout({ children }: { children: React.ReactNode }) {
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

  // Derive page title from current route
  const getPageInfo = () => {
    if (location.pathname.includes("/citizen/dashboard")) return { title: "Dashboard", subtitle: "Your waste management overview" };
    if (location.pathname.includes("/citizen/schedule")) return { title: "Collection Schedule", subtitle: "Upcoming waste collection dates for your area" };
    if (location.pathname.includes("/citizen/complaints")) return { title: "My Complaints", subtitle: "Track and submit waste-related complaints" };
    if (location.pathname.includes("/citizen/bulky-waste")) return { title: "Bulky Waste Request", subtitle: "Schedule and track bulky waste pickups" };
    if (location.pathname.includes("/citizen/profile")) return { title: "My Profile", subtitle: "Manage your account details" };
    return { title: "Dashboard", subtitle: "" };
  };

  const pageInfo = getPageInfo();

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
            <Link to="/citizen/dashboard" className="flex items-center gap-2">
              <img src={logo} alt="Agile CW Logo" className="h-10 w-auto object-contain" />
            </Link>
            <Typography variant="small" color="blue-gray" className="mt-3 font-bold text-sm">
              Resident Portal
            </Typography>
            <Typography variant="small" color="gray" className="text-xs font-medium">
              Colombo District
            </Typography>
          </div>
          <IconButton variant="text" color="blue-gray" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <XMarkIcon className="h-6 w-6" />
          </IconButton>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {NAVIGATION.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                  ? "bg-[#c5eacc] text-[#3d6e32] shadow-[4px_4px_10px_#c4c7cc,-4px_-4px_10px_#ffffff]"
                  : "text-gray-600 hover:bg-[#d9dce1]"
                  }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? "text-[#3d6e32]" : "text-gray-500"}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 pb-4 mt-auto space-y-2">
          <Link
            to="/citizen/support"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-[#d9dce1] transition-all duration-200"
          >
            <QuestionMarkCircleIcon className="h-5 w-5 text-gray-500" />
            <span className="font-medium">Support</span>
          </Link>
          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-600 hover:bg-[#d9dce1] transition-all duration-200 cursor-pointer"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-500" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 shrink-0 px-4 sm:px-6 flex items-center bg-white/60 backdrop-blur-sm border-b border-gray-200/60 z-10">
          <div className="flex items-center gap-4 flex-1">
            <IconButton variant="text" color="blue-gray" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Bars3Icon className="h-6 w-6" />
            </IconButton>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-[#e6e9ef] shadow-[inset_3px_3px_6px_#c4c7cc,inset_-3px_-3px_6px_#ffffff] border-none outline-none focus:ring-2 focus:ring-[#629955]/30 placeholder:text-gray-400 text-gray-700"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-4">
            <IconButton variant="text" color="blue-gray" className="rounded-full relative text-gray-500 hover:text-gray-700">
              <BellIcon className="h-5 w-5" />
            </IconButton>
            <IconButton variant="text" color="blue-gray" className="rounded-full text-gray-500 hover:text-gray-700">
              <Cog6ToothIcon className="h-5 w-5" />
            </IconButton>
            <div className="w-9 h-9 rounded-full bg-[#629955] overflow-hidden shadow-[2px_2px_4px_#c4c7cc,-2px_-2px_4px_#ffffff] flex items-center justify-center">
              <UserCircleIcon className="w-7 h-7 text-white" />
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
