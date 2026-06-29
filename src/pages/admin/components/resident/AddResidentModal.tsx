import { useState } from "react";
import { 
  XMarkIcon, 
  UserIcon, 
  MapPinIcon,
  MapIcon,
  UserPlusIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import { Typography, IconButton } from "../../../../lib/mt-components";

interface AddResidentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddResidentModal({ isOpen, onClose }: AddResidentModalProps) {
  const [showSuccess, setShowSuccess] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [zone, setZone] = useState("");

  const handleCreateAccount = () => {
    setShowSuccess(true);
    setFullName("");
    setAddress("");
    setZone("");
  };

  const handleClose = () => {
    setShowSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-[#e6e9ef]/80 backdrop-blur-md"
        onClick={handleClose}
      />
      
      <div className="relative w-full max-w-2xl bg-[#e6e9ef] rounded-[2rem] shadow-[24px_24px_48px_#c4c7cc,-24px_-24px_48px_#ffffff] border border-white/40 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Success Overlay */}
        {showSuccess && (
          <div className="absolute inset-0 z-50 bg-[#e6e9ef]/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
            <div className="w-20 h-20 rounded-full bg-[#186f45] text-white flex items-center justify-center mb-6 shadow-lg shadow-[#186f45]/20">
              <CheckCircleIcon className="w-10 h-10" />
            </div>
            <Typography variant="h4" color="blue-gray" className="font-bold mb-2">
              Resident Added Successfully!
            </Typography>
            <Typography className="text-gray-600 font-medium mb-8 max-w-sm">
              The resident profile has been created and assigned to the specified zone.
            </Typography>
            <button 
              onClick={handleClose}
              className="px-8 py-3 bg-[#6cf3b7] text-[#145c39] rounded-xl font-bold shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15)] transition-all"
            >
              Done
            </button>
          </div>
        )}

        <div className="px-8 py-6 border-b border-gray-300/50 flex justify-between items-start shrink-0">
          <div>
            <Typography variant="h4" color="blue-gray" className="font-bold tracking-tight mb-1 text-gray-900">
              Add New Resident
            </Typography>
            <Typography variant="small" className="text-gray-600 font-medium">
              Create a new resident profile for municipal services.
            </Typography>
          </div>
          <IconButton variant="text" color="blue-gray" onClick={handleClose} className="rounded-full hover:bg-gray-200/50 -mr-2 -mt-2">
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </IconButton>
        </div>

        <div className="px-8 py-8 overflow-y-auto flex-1 custom-scrollbar">
          <div className="flex flex-col gap-6">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Full Name</label>
              <div className="flex items-center bg-[#f0f2f5] rounded-xl px-4 py-2 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] h-12 focus-within:ring-2 focus-within:ring-[#186f45]/20 transition-shadow">
                <UserIcon className="w-5 h-5 text-gray-500 mr-3 shrink-0" />
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Jane Doe" 
                  autoComplete="off"
                  className="bg-transparent border-none outline-none w-full text-sm text-gray-800 font-bold placeholder-gray-400"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Home Address</label>
              <div className="flex items-center bg-[#f0f2f5] rounded-xl px-4 py-2 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] h-12 focus-within:ring-2 focus-within:ring-[#186f45]/20 transition-shadow">
                <MapPinIcon className="w-5 h-5 text-gray-500 mr-3 shrink-0" />
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Eco Street, Green City" 
                  autoComplete="off"
                  className="bg-transparent border-none outline-none w-full text-sm text-gray-800 font-bold placeholder-gray-400"
                />
              </div>
            </div>

            {/* Zone */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Collection Zone / Area</label>
              <div className="flex items-center bg-[#f0f2f5] rounded-xl px-4 py-2 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] h-12 focus-within:ring-2 focus-within:ring-[#186f45]/20 transition-shadow">
                <MapIcon className="w-5 h-5 text-gray-500 mr-3 shrink-0" />
                <input 
                  type="text" 
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  placeholder="e.g. Zone A - North" 
                  autoComplete="off"
                  className="bg-transparent border-none outline-none w-full text-sm text-gray-800 font-bold placeholder-gray-400"
                />
              </div>
            </div>

          </div>
        </div>

        <div className="px-8 py-6 border-t border-gray-300/50 bg-[#e6e9ef] flex items-center justify-end gap-4 shrink-0 rounded-b-[2rem]">
          <button 
            onClick={handleClose}
            className="px-6 py-3 rounded-xl font-bold text-sm text-[#186f45] hover:bg-gray-200/50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleCreateAccount}
            className="h-12 px-8 bg-[#6cf3b7] text-[#145c39] rounded-xl font-bold text-sm flex items-center gap-2 shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15)] transition-all"
          >
            <UserPlusIcon className="w-5 h-5" />
            Add Resident
          </button>
        </div>

      </div>
    </div>
  );
}
