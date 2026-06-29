import { useState } from "react";
import { UserPlusIcon, UsersIcon, ShieldCheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { StatCard } from "./components/staff/StatCard"; // Reusing the same StatCard component
import { ResidentTable } from "./components/resident/ResidentTable";
import { AddResidentModal } from "./components/resident/AddResidentModal";
import type { Resident } from "../../types/resident";

const mockResidents: Resident[] = [
  {
    id: "RES-8921",
    name: "Michael Chang",
    address: "45 Lotus Ave, Green City",
    zone: "Zone B - West",
    status: "Active",
    avatarUrl: "/avatars/resident1.jpg"
  },
  {
    id: "RES-1102",
    name: "Sarah Silva",
    address: "12 Palm Grove, Green City",
    zone: "Zone A - Central",
    status: "Suspended",
    avatarUrl: "/avatars/resident2.jpg"
  },
  {
    id: "RES-9934",
    name: "David Fernando",
    address: "88 Ocean Drive, Sea View",
    zone: "Zone C - Coastal",
    status: "Active",
    avatarUrl: "/avatars/resident3.jpg"
  }
];

export function ResidentDirectory() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="max-w-[1600px] mx-auto h-full flex flex-col gap-6 relative">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div className="flex-1 flex items-center bg-[#f0f2f5] rounded-xl px-4 py-2 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] h-12">
           <svg className="w-5 h-5 text-gray-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
           <input 
             type="text" 
             placeholder="Search residents by name, ID, or zone..." 
             className="bg-transparent border-none outline-none w-full text-sm text-gray-700 font-medium placeholder-gray-400 min-w-0"
           />
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="h-11 px-5 bg-[#186f45] text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)] transition-all shrink-0"
        >
          <UserPlusIcon className="w-5 h-5" />
          Add New Resident
        </button>
      </div>

      {/* Stats Cards Section - 3 Cards as requested */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 shrink-0">
        <StatCard 
          title="Total Residents" 
          value="4,205" 
          icon={UsersIcon} 
          iconColorClass="text-[#186f45]" 
        />
        <StatCard 
          title="Active Accounts" 
          value="4,180" 
          icon={ShieldCheckIcon} 
          iconColorClass="text-[#186f45]" 
        />
        <StatCard 
          title="Recent Violations" 
          value="25" 
          icon={ExclamationTriangleIcon} 
          iconColorClass="text-orange-500" 
        />
      </div>

      {/* Main Table Section */}
      <div className="flex-1 min-h-0 flex flex-col pb-6">
        <ResidentTable residentList={mockResidents} />
      </div>

      {/* Add Resident Modal */}
      <AddResidentModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

    </div>
  );
}
