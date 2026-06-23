import { useState } from "react";
import { UserPlusIcon, UsersIcon, ShieldCheckIcon, TruckIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { StatCard } from "./components/staff/StatCard";
import { StaffTable } from "./components/staff/StaffTable";
import { AddStaffModal } from "./components/staff/AddStaffModal";
import type { Staff } from "../../types/staff";

const mockStaff: Staff[] = [
  {
    id: "EC-4829",
    name: "Sarah Chen",
    role: "Logistics Coordinator",
    department: "Central Logistics",
    email: "s.chen@ecocycle.gov",
    status: "Active",
    avatarUrl: "/avatars/sarah.jpg"
  },
  {
    id: "EC-1025",
    name: "Arthur Miller",
    role: "Fleet Supervisor",
    department: "Operations",
    email: "a.miller@ecocycle.gov",
    status: "Active",
    avatarUrl: "/avatars/arthur.jpg"
  },
  {
    id: "EC-3310",
    name: "James Doe",
    role: "Maintenance Tech",
    department: "Asset Management",
    email: "j.doe@ecocycle.gov",
    status: "Inactive",
    avatarUrl: "/avatars/james.jpg"
  },
  {
    id: "EC-5012",
    name: "Elena Rodriguez",
    role: "Environmental Analyst",
    department: "Sustainability",
    email: "e.rodriguez@ecocycle.gov",
    status: "Active",
    avatarUrl: "/avatars/elena.jpg"
  }
];

export function StaffDirectory() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="max-w-[1600px] mx-auto h-full flex flex-col gap-6 relative">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div className="flex-1 flex items-center bg-[#f0f2f5] rounded-xl px-4 py-2 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] h-12">
           <svg className="w-5 h-5 text-gray-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
           <input 
             type="text" 
             placeholder="Search staff, roles, or departments..." 
             className="bg-transparent border-none outline-none w-full text-sm text-gray-700 font-medium placeholder-gray-400 min-w-0"
           />
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="h-11 px-5 bg-[#186f45] text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)] transition-all shrink-0"
        >
          <UserPlusIcon className="w-5 h-5" />
          Add New Staff
        </button>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
        <StatCard 
          title="Total Personnel" 
          value="142" 
          icon={UsersIcon} 
          iconColorClass="text-[#186f45]" 
        />
        <StatCard 
          title="Active Duty" 
          value="138" 
          icon={ShieldCheckIcon} 
          iconColorClass="text-[#186f45]" 
        />
        <StatCard 
          title="Fleet Staff" 
          value="56" 
          icon={TruckIcon} 
          iconColorClass="text-gray-600" 
        />
        <StatCard 
          title="On Leave" 
          value="4" 
          icon={ExclamationCircleIcon} 
          iconColorClass="text-red-500" 
        />
      </div>

      {/* Main Table Section */}
      <div className="flex-1 min-h-0 flex flex-col pb-6">
        <StaffTable staffList={mockStaff} />
      </div>

      {/* Add Staff Modal */}
      <AddStaffModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

    </div>
  );
}
