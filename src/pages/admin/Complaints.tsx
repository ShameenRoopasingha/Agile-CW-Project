import { useState, useCallback } from "react";
import { Typography, Card } from "../../lib/mt-components";
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid";
import type { Complaint } from "../../types/complaint";
import { ComplaintTableRow } from "./components/ComplaintTableRow";
import { ComplaintDetailsPanel } from "./components/ComplaintDetailsPanel";

const complaintsData: Complaint[] = [
  { 
    id: "#CMP-1042", 
    desc: "\"Uncollected garbage piled up near the community park entrance for 3 days.\"", 
    reporter: "A.B. Perera", 
    contact: "+94 77 123 4567",
    date: "Oct 12, 2023", 
    time: "09:45 AM",
    location: "Community Park North",
    asstNo: "AST-9902-12",
    status: "Pending",
    photo: "/trash_bags.png"
  },
  { 
    id: "#CMP-1041", 
    desc: "\"Broken bin lid allows animals to scatter trash on the street.\"", 
    reporter: "M. Fernando", 
    contact: "+94 71 987 6543",
    date: "Oct 11, 2023", 
    time: "04:15 PM",
    location: "Galle Road, Sector 4",
    asstNo: "AST-4451-09",
    status: "In Progress"
  },
  { 
    id: "#CMP-1038", 
    desc: "\"Illegal dumping of construction waste in empty lot.\"", 
    reporter: "K. Silva", 
    contact: "+94 76 555 4444",
    date: "Oct 10, 2023", 
    time: "11:30 AM",
    location: "Railway St. Terminal",
    asstNo: "AST-2210-55",
    status: "Resolved"
  },
  { 
    id: "#CMP-1035", 
    desc: "\"Missed regular scheduled pickup for the entire street.\"", 
    reporter: "D. Jayasuriya", 
    contact: "+94 70 111 2222",
    date: "Oct 09, 2023", 
    time: "08:20 AM",
    location: "Lotus Grove Housing",
    asstNo: "AST-1100-88",
    status: "Resolved"
  },
];

export function Complaints() {
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  // Memoize event handlers to prevent child components from unnecessarily re-rendering
  const handleSelectComplaint = useCallback((complaint: Complaint) => {
    setSelectedComplaint(complaint);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedComplaint(null);
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto h-full flex gap-6 relative items-start">
      
      {/* Left Side: Header, Controls, and Table */}
      <div className={`flex flex-col gap-6 transition-all duration-300 min-w-0 h-full ${selectedComplaint ? "flex-1" : "w-full"}`}>
        
        {/* Header Stack */}
        <div className="flex flex-col gap-5 shrink-0 w-full">
          {/* Controls Row */}
          <div className="flex items-center gap-3 w-full">
            {/* Search Input */}
            <div className="h-12 flex-1 bg-[#f0f2f5] rounded-xl shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff] flex items-center px-4 min-w-[120px]">
               <svg className="w-5 h-5 text-gray-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
               <input 
                 type="text" 
                 placeholder="Search by Assessment No. or Name" 
                 className="bg-transparent border-none outline-none w-full text-sm text-gray-700 font-medium placeholder-gray-400 min-w-0"
               />
            </div>
            
            {/* Status Dropdown */}
            <button className="h-12 shrink-0 bg-[#e6e9ef] rounded-xl shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] flex items-center px-4 hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-shadow text-gray-700">
              <span className="text-sm font-bold mr-2 hidden sm:block">All Statuses</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            
            {/* Date Dropdown */}
            <button className="h-12 shrink-0 bg-[#e6e9ef] rounded-xl shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] flex items-center px-4 hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-shadow text-gray-700">
              <span className="text-sm font-bold mr-2 hidden sm:block">This Week</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            {/* Filter Button */}
            <button className="h-12 w-12 shrink-0 bg-[#e6e9ef] rounded-xl shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] flex items-center justify-center hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-shadow text-gray-700">
              <Bars3BottomRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Table View */}
        <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none flex-1 overflow-hidden flex flex-col z-0">
          <div className="overflow-x-auto flex-1">
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
          </div>
          
          {/* Pagination Footer */}
          <div className="p-4 border-t border-gray-300/50 flex items-center justify-between text-sm text-gray-600 bg-[#e6e9ef] shadow-[inset_0_4px_6px_-4px_#c4c7cc]">
            <span className="font-medium text-xs">Showing 1 to 4 of 128 complaints</span>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-all">
                Previous
              </button>
              <div className="flex gap-2">
                <button className="w-9 h-9 rounded-xl bg-[#b2efcd] text-[#2c5126] flex items-center justify-center text-xs font-bold shadow-[inset_2px_2px_4px_#9de4be,inset_-2px_-2px_4px_#c5fadb]">
                  1
                </button>
                <button className="w-9 h-9 rounded-xl bg-[#e6e9ef] text-gray-700 flex items-center justify-center text-xs font-bold shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-all">
                  2
                </button>
              </div>
              <button className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-all">
                Next
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Side: Details Panel */}
      {selectedComplaint && (
        <ComplaintDetailsPanel 
          complaint={selectedComplaint} 
          onClose={handleClosePanel} 
        />
      )}
    </div>
  );
}
