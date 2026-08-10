import { useState, useEffect, useCallback } from "react";
import { UserPlusIcon, UsersIcon, ShieldCheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { StatCard } from "./components/staff/StatCard"; // Reusing the same StatCard component
import { ResidentTable } from "./components/resident/ResidentTable";
import { AddResidentModal } from "./components/resident/AddResidentModal";
import type { Resident } from "../../types/resident";
import { getAllResidents, getResidentCount, searchResident } from "../../lib/api";

export function ResidentDirectory() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [residentList, setResidentList] = useState<Resident[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLoading] = useState(true);

  const fetchResidentData = useCallback(async () => {
    try {
      setLoading(true);
      if (searchQuery.trim().length > 0) {
        // Search mode
        const res = await searchResident(searchQuery);
        if (res && res.results) {
          const mapped = res.results.map((r: any) => ({
            id: r._id || r.id,
            name: r.name,
            address: r.premisesNo || "N/A",
            zone: r.HomeTown || "Unknown",
            status: r.isRegistered ? "Active" : "Suspended"
          }));
          setResidentList(mapped);
        }
      } else {
        // Normal mode
        const [resRes, countRes] = await Promise.all([
          getAllResidents(),
          getResidentCount()
        ]);
        
        if (resRes && resRes.citizens) {
          const mapped = resRes.citizens.map((r: any) => ({
            id: r._id || r.id,
            name: r.name,
            address: r.premisesNo || "N/A",
            zone: r.HomeTown || "Unknown",
            status: r.isRegistered ? "Active" : "Suspended"
          }));
          setResidentList(mapped);
        }
        if (countRes) {
          setStats(countRes);
        }
      }
    } catch (err) {
      console.error("Failed to load residents", err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResidentData();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchResidentData]);

  return (
    <div className="max-w-[1600px] mx-auto h-full flex flex-col gap-6 relative">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div className="flex-1 flex items-center bg-[#f0f2f5] rounded-xl px-4 py-2 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] h-12">
           <svg className="w-5 h-5 text-gray-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
           <input 
             type="text" 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             placeholder="Search residents by name, email, or premises..." 
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

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 shrink-0">
        <StatCard 
          title="Total Residents" 
          value={stats?.totalCitizens?.toString() || "-"} 
          icon={UsersIcon} 
          iconColorClass="text-[#186f45]" 
        />
        <StatCard 
          title="Active Accounts" 
          value={stats?.activeCitizens?.toString() || "-"} 
          icon={ShieldCheckIcon} 
          iconColorClass="text-[#186f45]" 
        />
        <StatCard 
          title="Non-Active Accounts" 
          value={stats?.nonActiveCitizens?.toString() || "-"} 
          icon={ExclamationTriangleIcon} 
          iconColorClass="text-orange-500" 
        />
      </div>

      {/* Main Table Section */}
      <div className="flex-1 min-h-0 flex flex-col pb-6">
        <ResidentTable residentList={residentList} onRefresh={fetchResidentData} />
      </div>

      {/* Add Resident Modal */}
      <AddResidentModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={fetchResidentData}
      />

    </div>
  );
}
