import { useState, useCallback, useEffect } from "react";
import { Typography, Card } from "../../lib/mt-components";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import type { Complaint } from "../../types/complaint";
import { ComplaintTableRow } from "./components/ComplaintTableRow";
import { ComplaintDetailsPanel } from "./components/ComplaintDetailsPanel";
import { getAllComplaints, searchComplaints, filterComplaints } from "../../lib/api";

const mapBackendToFrontend = (item: any): Complaint => {
  const d = new Date(item.createdAt);
  return {
    id: item._id,
    title: item.title || "No Title",
    desc: item.description || "",
    type: item.type || "General",
    reporter: item.citizen?.name || "Unknown",
    contact: item.citizen?.contactNumber || item.citizen?.email || "Unknown",
    date: d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    time: d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    location: item.location || "Unknown",
    asstNo: item.citizen?.premisesNo || "Unknown",
    status: item.status || "Pending",
    photo: item.imageUrls?.[0] || undefined,
    imageUrls: item.imageUrls || [],
    citizen: item.citizen,
    createdAt: item.createdAt,
  };
};

export function Complaints() {
  const [complaintsData, setComplaintsData] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComplaints = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllComplaints();
      if (res && res.complaints) {
        setComplaintsData(res.complaints.map(mapBackendToFrontend));
      }
    } catch (err) {
      console.error("Failed to fetch complaints", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    
    if (val.trim() === "") {
      fetchComplaints();
      return;
    }
    
    try {
      setLoading(true);
      const res = await searchComplaints(val);
      if (res && res.results) {
        setComplaintsData(res.results.map(mapBackendToFrontend));
      }
    } catch (err) {
      console.error("Failed to search complaints", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterStatus = async (status: string) => {
    setStatusFilter(status);
    if (status === "") {
      fetchComplaints();
      return;
    }
    
    try {
      setLoading(true);
      const res = await filterComplaints(status);
      if (res && res.results) {
        setComplaintsData(res.results.map(mapBackendToFrontend));
      }
    } catch (err) {
      console.error("Failed to filter complaints", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectComplaint = useCallback((complaint: Complaint) => {
    setSelectedComplaint(complaint);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedComplaint(null);
  }, []);

  const handleRefresh = useCallback(() => {
    fetchComplaints();
    if (selectedComplaint) {
      // Opt to close panel or update its state; simplest is close for now
      setSelectedComplaint(null);
    }
  }, [fetchComplaints, selectedComplaint]);

  return (
    <div className="max-w-[1600px] mx-auto h-full flex gap-6 relative items-start">
      
      {/* Left Side: Header, Controls, and Table */}
      <div className={`flex flex-col gap-6 transition-all duration-300 min-w-0 h-full ${selectedComplaint ? "flex-1" : "w-full"}`}>
        
        {/* Header Stack */}
        <div className="flex flex-col gap-5 shrink-0 w-full">
          {/* Controls Row */}
          <div className="flex flex-wrap items-center gap-3 w-full">
            {/* Search Input */}
            <div className="h-12 flex-1 bg-[#f0f2f5] rounded-xl shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff] flex items-center px-4 min-w-[200px]">
               <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 mr-3 shrink-0" />
               <input 
                 type="text" 
                 placeholder="Search by Name or Asst. No..." 
                 value={searchQuery}
                 onChange={handleSearch}
                 className="bg-transparent border-none outline-none w-full text-sm text-gray-700 font-medium placeholder-gray-400 min-w-0"
               />
            </div>
            
            {/* Status Dropdown */}
            <select 
              className="h-12 shrink-0 bg-[#e6e9ef] rounded-xl shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] flex items-center px-4 text-sm font-bold text-gray-700 outline-none"
              value={statusFilter}
              onChange={(e) => handleFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Main Table View */}
        <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none flex-1 overflow-hidden flex flex-col z-0">
          <div className="overflow-x-auto flex-1 h-full min-h-[400px]">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Typography color="gray" className="font-bold">Loading complaints...</Typography>
              </div>
            ) : complaintsData.length === 0 ? (
               <div className="flex items-center justify-center h-full">
                <Typography color="gray" className="font-bold">No complaints found.</Typography>
              </div>
            ) : (
              <table className="w-full min-w-max table-auto text-left border-collapse">
                <thead>
                  <tr>
                    {["COMPLAINT ID", "DATE SUBMITTED", "LOCATION / ASST. NO", "STATUS"].map((head) => (
                      <th key={head} className="border-b border-gray-300 p-4 pt-6 pb-4">
                        <Typography variant="small" color="blue-gray" className="font-bold uppercase tracking-wider text-xs text-gray-800">
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {complaintsData.map((complaint, index) => (
                    <ComplaintTableRow 
                      key={complaint.id}
                      complaint={complaint}
                      isLast={index === complaintsData.length - 1}
                      isSelected={selectedComplaint?.id === complaint.id}
                      onSelect={handleSelectComplaint}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          {/* Pagination Footer */}
          <div className="p-4 border-t border-gray-300/50 flex items-center justify-between text-sm text-gray-600 bg-[#e6e9ef] shadow-[inset_0_4px_6px_-4px_#c4c7cc]">
            <span className="font-medium text-xs">Showing {complaintsData.length} complaints</span>
          </div>
        </Card>
      </div>

      {/* Right Side: Details Panel */}
      {selectedComplaint && (
        <ComplaintDetailsPanel 
          complaint={selectedComplaint} 
          onClose={handleClosePanel} 
          onRefresh={handleRefresh}
        />
      )}
    </div>
  );
}
