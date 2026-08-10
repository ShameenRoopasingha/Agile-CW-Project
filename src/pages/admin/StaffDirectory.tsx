import { useState, useEffect, useCallback } from "react";
import { UserPlusIcon, UsersIcon, ShieldCheckIcon, TruckIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import { StatCard } from "./components/staff/StatCard";
import { StaffTable } from "./components/staff/StaffTable";
import { AddStaffModal } from "./components/staff/AddStaffModal";
import type { Staff } from "../../types/staff";
import { getAllStaff, getStaffCount, searchStaff } from "../../lib/api";

export function StaffDirectory() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchStaffData = useCallback(async () => {
    try {
      setLoading(true);
      if (searchQuery.trim().length > 0) {
        // Search mode
        const res = await searchStaff(searchQuery);
        if (res && res.results) {
          const mapped = res.results.map((s: any) => ({
            id: s._id || s.id,
            name: s.name,
            email: s.email,
            role: s.role,
            department: s.role === "PHI" ? "Health" : s.role === "Driver" ? "Fleet" : "Operations",
            status: "Active"
          }));
          setStaffList(mapped);
        }
      } else {
        // Normal mode
        const [staffRes, countRes] = await Promise.all([
          getAllStaff(),
          getStaffCount()
        ]);
        
        if (staffRes) {
          const phis = (staffRes.PHI || []).map((s:any) => ({ ...s, id: s._id || s.id, department: "Health", status: "Active" }));
          const drivers = (staffRes.drivers || []).map((s:any) => ({ ...s, id: s._id || s.id, department: "Fleet", status: "Active" }));
          const fleets = (staffRes.fleetOperators || []).map((s:any) => ({ ...s, id: s._id || s.id, department: "Logistics", status: "Active" }));
          const collectors = (staffRes.collectionEmployees || []).map((s:any) => ({ ...s, id: s._id || s.id, department: "Operations", status: "Active" }));
          setStaffList([...phis, ...drivers, ...fleets, ...collectors]);
        }
        if (countRes) {
          setStats(countRes);
        }
      }
    } catch (err) {
      console.error("Failed to load staff", err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchStaffData();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchStaffData]);

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
             placeholder="Search staff by name, email or ID..." 
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
          value={stats?.totalStaff?.toString() || "-"} 
          icon={UsersIcon} 
          iconColorClass="text-[#186f45]" 
        />
        <StatCard 
          title="PHI Officers" 
          value={stats?.breakdown?.PHI?.toString() || "-"} 
          icon={ShieldCheckIcon} 
          iconColorClass="text-[#186f45]" 
        />
        <StatCard 
          title="Drivers" 
          value={stats?.breakdown?.driver?.toString() || "-"} 
          icon={TruckIcon} 
          iconColorClass="text-gray-600" 
        />
        <StatCard 
          title="Other Staff" 
          value={((stats?.breakdown?.fleetOperator || 0) + (stats?.breakdown?.collectionEmployee || 0)).toString() || "-"} 
          icon={BriefcaseIcon} 
          iconColorClass="text-blue-500" 
        />
      </div>

      {/* Main Table Section */}
      <div className="flex-1 min-h-0 flex flex-col pb-6">
        <StaffTable staffList={staffList} onRefresh={fetchStaffData} />
      </div>

      {/* Add Staff Modal */}
      <AddStaffModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={fetchStaffData}
      />

    </div>
  );
}
