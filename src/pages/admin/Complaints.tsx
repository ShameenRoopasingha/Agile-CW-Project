import { useState } from "react";
import { Typography, Card } from "../../lib/mt-components";
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon, XMarkIcon, UserIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Bars3BottomRightIcon, UsersIcon } from "@heroicons/react/24/solid";

interface Complaint {
  id: string;
  desc: string;
  reporter: string;
  contact: string;
  date: string;
  time: string;
  location: string;
  asstNo: string;
  status: string;
  photo?: string;
}

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

  return (
    <div className="max-w-[1600px] mx-auto h-full flex flex-col gap-6">
      {/* Header section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 shrink-0">
        <div>
          <Typography variant="h5" color="blue-gray" className="font-bold text-xl mb-1 tracking-tight">
            Manage Complaints
          </Typography>
          <Typography variant="small" color="gray" className="font-medium text-sm text-gray-500">
            Review and resolve citizen reported sanitation issues.
          </Typography>
        </div>
      </div>

      {/* Main Content Area (Split View) */}
      <div className="flex flex-1 gap-6 min-h-0 overflow-hidden">
        {/* Left Side: Controls & Table */}
        <div className={`flex flex-col gap-6 transition-all duration-300 min-w-0 ${selectedComplaint ? "flex-1" : "w-full"}`}>
          {/* Controls Bar */}
          <Card className="bg-[#e6e9ef] shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] rounded-2xl border-none p-4 shrink-0 flex flex-col gap-4">
            <div className="h-12 bg-[#f0f2f5] rounded-xl shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff] flex items-center px-4">
               <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
               <input 
                 type="text" 
                 placeholder="Search by Assessment Number or Citizen Name" 
                 className="bg-transparent border-none outline-none flex-1 text-sm text-gray-700 font-medium placeholder-gray-400"
               />
            </div>
            <div className="flex items-center gap-3">
              {/* Status Dropdown */}
              <div className="h-10 bg-[#e6e9ef] rounded-lg shadow-[3px_3px_6px_#c4c7cc,-3px_-3px_6px_#ffffff] flex items-center px-4 cursor-pointer hover:bg-[#e0e3e9] transition-colors border border-gray-300/30">
                <span className="text-sm font-medium text-gray-700 mr-3">All Statuses</span>
              </div>
              {/* Date Dropdown */}
              <div className="h-10 bg-[#e6e9ef] rounded-lg shadow-[3px_3px_6px_#c4c7cc,-3px_-3px_6px_#ffffff] flex items-center px-4 cursor-pointer hover:bg-[#e0e3e9] transition-colors border border-gray-300/30">
                <span className="text-sm font-medium text-gray-700 mr-3">This Week</span>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              {/* Filter Button */}
              <div className="w-10 h-10 bg-[#e6e9ef] rounded-lg shadow-[3px_3px_6px_#c4c7cc,-3px_-3px_6px_#ffffff] flex items-center justify-center cursor-pointer hover:bg-[#e0e3e9] transition-colors border border-gray-300/30">
                <Bars3BottomRightIcon className="w-5 h-5 text-gray-700" />
              </div>
            </div>
          </Card>

          {/* Table Card */}
          <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none flex-1 overflow-hidden flex flex-col">
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
                  {complaintsData.map((complaint, index) => {
                    const { id, date, time, location, asstNo, status } = complaint;
                    const isLast = index === complaintsData.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-gray-300/50";
                    const isSelected = selectedComplaint?.id === id;
                    
                    let badgeColor = "";
                    let badgeBg = "";
                    if (status === "Pending") {
                      badgeColor = "text-red-800";
                      badgeBg = "bg-red-100/80 shadow-[inset_1px_1px_2px_rgba(255,150,150,0.3)]";
                    } else if (status === "In Progress") {
                      badgeColor = "text-yellow-800";
                      badgeBg = "bg-yellow-100 shadow-[inset_1px_1px_2px_rgba(255,200,100,0.3)]";
                    } else if (status === "Resolved") {
                      badgeColor = "text-teal-800";
                      badgeBg = "bg-teal-100/80 shadow-[inset_1px_1px_2px_rgba(150,255,255,0.3)]";
                    }

                    return (
                      <tr 
                        key={id} 
                        onClick={() => setSelectedComplaint(complaint)}
                        className={`cursor-pointer transition-colors ${isSelected ? "bg-[#d0ebd6]/40" : "hover:bg-[#f0f2f5]/80"}`}
                      >
                        <td className={classes}>
                          <Typography variant="small" color="blue-gray" className="font-bold text-[#2c5126]">
                            {id}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-800 text-sm">{date}</span>
                            <span className="text-gray-500 text-xs">| {time}</span>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-800 text-sm">{location}</span>
                            <span className="text-gray-500 text-xs uppercase">{asstNo}</span>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className={`inline-block px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${badgeBg} ${badgeColor}`}>
                            {status}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Footer */}
            <div className="p-4 border-t border-gray-300 flex items-center justify-between text-sm text-gray-600 bg-[#e6e9ef] shadow-[inset_0_4px_6px_-4px_#c4c7cc]">
              <span className="font-medium text-xs">Showing 1 to 4 of 128 complaints</span>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1 rounded-lg text-xs font-medium border border-gray-400 text-gray-700 hover:bg-gray-200">
                  Previous
                </button>
                <button className="w-7 h-7 rounded bg-[#629955] text-white flex items-center justify-center text-xs font-bold shadow-[2px_2px_4px_#c4c7cc]">
                  1
                </button>
                <button className="w-7 h-7 rounded bg-transparent border border-gray-400 text-gray-700 flex items-center justify-center text-xs font-bold">
                  2
                </button>
                <button className="px-3 py-1 rounded-lg text-xs font-medium border border-gray-400 text-gray-700 hover:bg-gray-200">
                  Next
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side: Details Panel */}
        {selectedComplaint && (
          <Card className="w-[400px] shrink-0 bg-white border border-gray-200 shadow-xl rounded-2xl flex flex-col h-full overflow-hidden animate-in slide-in-from-right-8 duration-300">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 shrink-0 bg-gray-50">
              <Typography variant="h6" color="blue-gray" className="font-bold text-sm">
                Complaint Details - {selectedComplaint.id}
              </Typography>
              <button 
                onClick={() => setSelectedComplaint(null)}
                className="p-1 hover:bg-gray-200 rounded-md transition-colors text-gray-600"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Panel Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Photo Upload */}
              <div>
                <Typography variant="small" color="blue-gray" className="font-bold uppercase text-[11px] tracking-wider mb-2">
                  Photo Upload
                </Typography>
                <div className="w-full h-40 bg-gray-100 rounded-xl border border-gray-200 overflow-hidden relative">
                  {selectedComplaint.photo ? (
                    <img src={selectedComplaint.photo} alt="Complaint" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      No photo provided
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <Typography variant="small" color="blue-gray" className="font-bold uppercase text-[11px] tracking-wider mb-2">
                  Description
                </Typography>
                <div className="bg-[#f2f5fb] p-4 rounded-xl border border-[#dce4f5]">
                  <p className="text-sm italic font-medium text-gray-800 leading-relaxed">
                    {selectedComplaint.desc}
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-6">
                <div>
                  <Typography variant="small" color="blue-gray" className="font-bold uppercase text-[10px] tracking-wider text-gray-600 mb-1">
                    Resident Name
                  </Typography>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-gray-900">
                    <UserIcon className="w-4 h-4 text-[#2c5126]" />
                    {selectedComplaint.reporter}
                  </div>
                </div>
                <div>
                  <Typography variant="small" color="blue-gray" className="font-bold uppercase text-[10px] tracking-wider text-gray-600 mb-1">
                    Contact
                  </Typography>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-gray-900">
                    <PhoneIcon className="w-4 h-4 text-[#2c5126]" />
                    {selectedComplaint.contact}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                <div>
                  <Typography variant="small" color="blue-gray" className="font-bold uppercase text-[11px] tracking-wider mb-2 text-gray-900">
                    Status Update Control
                  </Typography>
                  <div className="h-10 bg-white border border-gray-300 rounded-lg flex items-center px-3 cursor-pointer">
                    <span className="text-sm text-gray-800 flex-1">{selectedComplaint.status}</span>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>

                <div>
                  <Typography variant="small" color="blue-gray" className="font-bold uppercase text-[11px] tracking-wider mb-2 text-gray-900">
                    Assign To Inspector
                  </Typography>
                  <div className="h-10 bg-white border border-gray-300 rounded-lg flex items-center px-3 cursor-pointer">
                    <span className="text-sm text-gray-600 flex-1">Select an Inspector</span>
                    <UsersIcon className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="p-4 border-t border-gray-200 shrink-0 bg-gray-50 flex items-center gap-3">
              <button className="flex-1 bg-[#6c9868] hover:bg-[#5a8157] text-white font-bold text-sm py-2.5 rounded-lg shadow-sm transition-colors">
                Save Changes
              </button>
              <button 
                onClick={() => setSelectedComplaint(null)}
                className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold text-sm py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
