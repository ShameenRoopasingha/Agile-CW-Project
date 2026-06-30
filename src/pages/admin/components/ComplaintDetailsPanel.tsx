import { memo } from "react";
import { Typography, Card } from "../../../lib/mt-components";
import { XMarkIcon, UserIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { UsersIcon } from "@heroicons/react/24/solid";
import type { Complaint } from "../../../types/complaint";

interface ComplaintDetailsPanelProps {
  complaint: Complaint;
  onClose: () => void;
}

export const ComplaintDetailsPanel = memo(({ complaint, onClose }: ComplaintDetailsPanelProps) => {
  return (
    <Card className="w-full sm:w-[400px] shrink-0 bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] border-none rounded-2xl flex flex-col h-full overflow-hidden animate-in slide-in-from-right-8 duration-300 relative z-10">
      {/* Panel Header */}
      <div className="flex items-center justify-between p-6 shrink-0 bg-[#e6e9ef] shadow-[0_4px_6px_-4px_#c4c7cc] z-10">
        <Typography variant="h6" color="blue-gray" className="font-bold text-base">
          Complaint Details - {complaint.id}
        </Typography>
        <button 
          onClick={onClose}
          className="p-2 rounded-xl bg-[#e6e9ef] shadow-[3px_3px_6px_#c4c7cc,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-all text-gray-600"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Panel Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Photo Upload */}
        <div>
          <Typography variant="small" color="blue-gray" className="font-bold uppercase text-[11px] tracking-wider mb-3 text-gray-500">
            Attached Photo
          </Typography>
          <div className="w-full h-48 bg-[#f0f2f5] rounded-2xl shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff] overflow-hidden relative">
            {complaint.photo ? (
              <img src={complaint.photo} alt="Complaint" className="w-full h-full object-cover opacity-90" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-bold">
                No photo provided
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <Typography variant="small" color="blue-gray" className="font-bold uppercase text-[11px] tracking-wider mb-3 text-gray-500">
            Description
          </Typography>
          <div className="bg-[#e6e9ef] shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff] p-5 rounded-2xl">
            <p className="text-sm italic font-medium text-gray-700 leading-relaxed">
              {complaint.desc}
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-6 bg-[#e6e9ef] shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff] p-5 rounded-2xl">
          <div>
            <Typography variant="small" color="blue-gray" className="font-bold uppercase text-[10px] tracking-wider text-gray-500 mb-2">
              Resident Name
            </Typography>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <UserIcon className="w-4 h-4 text-[#2c5126]" />
              {complaint.reporter}
            </div>
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="font-bold uppercase text-[10px] tracking-wider text-gray-500 mb-2">
              Contact Number
            </Typography>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <PhoneIcon className="w-4 h-4 text-[#2c5126]" />
              {complaint.contact}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-5">
          <div>
            <Typography variant="small" color="blue-gray" className="font-bold uppercase text-[11px] tracking-wider mb-3 text-gray-500">
              Update Status
            </Typography>
            <div className="h-12 bg-[#f0f2f5] shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff] rounded-2xl flex items-center px-5 cursor-pointer hover:bg-[#e6e9ef] transition-colors">
              <span className="text-sm font-bold text-gray-700 flex-1">{complaint.status}</span>
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          <div>
            <Typography variant="small" color="blue-gray" className="font-bold uppercase text-[11px] tracking-wider mb-3 text-gray-500">
              Assign Inspector
            </Typography>
            <div className="h-12 bg-[#f0f2f5] shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff] rounded-2xl flex items-center px-5 cursor-pointer hover:bg-[#e6e9ef] transition-colors">
              <span className="text-sm font-bold text-gray-500 flex-1">Select an Inspector</span>
              <UsersIcon className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Panel Footer */}
      <div className="p-6 shrink-0 bg-[#e6e9ef] shadow-[0_-4px_6px_-4px_#c4c7cc] flex items-center gap-4 z-10">
        <button className="flex-1 bg-[#b2efcd] hover:bg-[#9de4be] text-[#2c5126] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] active:shadow-[inset_3px_3px_6px_#9de4be,inset_-3px_-3px_6px_#c5fadb] font-bold text-sm py-3.5 rounded-xl transition-all">
          Save Changes
        </button>
        <button 
          onClick={onClose}
          className="flex-1 bg-[#e6e9ef] text-gray-700 shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] active:shadow-[inset_3px_3px_6px_#c4c7cc,inset_-3px_-3px_6px_#ffffff] font-bold text-sm py-3.5 rounded-xl transition-all"
        >
          Cancel
        </button>
      </div>
    </Card>
  );
});
ComplaintDetailsPanel.displayName = "ComplaintDetailsPanel";
