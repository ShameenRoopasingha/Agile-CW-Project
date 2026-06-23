import { useState } from "react";
import { 
  XMarkIcon, 
  CameraIcon, 
  UserIcon, 
  BriefcaseIcon, 
  EnvelopeIcon, 
  LockClosedIcon, 
  PhoneIcon, 
  UserPlusIcon,
  EyeIcon,
  EyeSlashIcon,
  ChevronDownIcon,
  PencilIcon
} from "@heroicons/react/24/outline";
import { Typography, IconButton } from "../../../../lib/mt-components";

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddStaffModal({ isOpen, onClose }: AddStaffModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#e6e9ef]/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#e6e9ef] rounded-[2rem] shadow-[24px_24px_48px_#c4c7cc,-24px_-24px_48px_#ffffff] border border-white/40 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-300/50 flex justify-between items-start shrink-0">
          <div>
            <Typography variant="h4" color="blue-gray" className="font-bold tracking-tight mb-1 text-gray-900">
              Add New Staff
            </Typography>
            <Typography variant="small" className="text-gray-600 font-medium">
              Create a new profile and assign operational roles.
            </Typography>
          </div>
          <IconButton variant="text" color="blue-gray" onClick={onClose} className="rounded-full hover:bg-gray-200/50 -mr-2 -mt-2">
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </IconButton>
        </div>

        {/* Scrollable Body */}
        <div className="px-8 py-6 overflow-y-auto flex-1 custom-scrollbar">
          
          {/* Profile Photo Upload */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative group cursor-pointer">
              <div className="w-28 h-28 rounded-full border-2 border-dashed border-[#186f45]/50 flex flex-col items-center justify-center bg-[#f0f2f5] shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff] group-hover:border-[#186f45] transition-colors duration-300">
                <CameraIcon className="w-8 h-8 text-[#186f45]" />
                <span className="text-[10px] font-bold text-[#186f45] mt-1 tracking-wider">UPLOAD</span>
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#6cf3b7] rounded-full flex items-center justify-center text-[#186f45] shadow-[2px_2px_6px_rgba(0,0,0,0.15)] group-hover:bg-[#186f45] group-hover:text-white transition-colors duration-300 border-2 border-[#e6e9ef]">
                <PencilIcon className="w-4 h-4" />
              </div>
            </div>
            <span className="text-xs font-bold text-gray-500 mt-3">Upload Profile Photo (Max 5MB)</span>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Full Name</label>
              <div className="flex items-center bg-[#f0f2f5] rounded-xl px-4 py-2 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] h-12 focus-within:ring-2 focus-within:ring-[#186f45]/20 transition-shadow">
                <UserIcon className="w-5 h-5 text-gray-500 mr-3 shrink-0" />
                <input 
                  type="text" 
                  placeholder="e.g. John Doe" 
                  className="bg-transparent border-none outline-none w-full text-sm text-gray-800 font-bold placeholder-gray-400"
                />
              </div>
            </div>

            {/* Role Assignment */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Role Assignment</label>
              <div className="relative flex items-center bg-[#f0f2f5] rounded-xl px-4 py-2 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] h-12">
                <BriefcaseIcon className="w-5 h-5 text-gray-500 mr-3 shrink-0" />
                <select className="bg-transparent border-none outline-none w-full text-sm text-gray-800 font-bold appearance-none cursor-pointer">
                  <option value="" disabled selected>Select Role</option>
                  <option value="logistics">Logistics Coordinator</option>
                  <option value="fleet">Fleet Supervisor</option>
                  <option value="maintenance">Maintenance Tech</option>
                  <option value="sustainability">Environmental Analyst</option>
                </select>
                <ChevronDownIcon className="w-5 h-5 text-gray-500 absolute right-4 pointer-events-none" />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Email Address</label>
              <div className="flex items-center bg-[#f0f2f5] rounded-xl px-4 py-2 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] h-12 focus-within:ring-2 focus-within:ring-[#186f45]/20 transition-shadow">
                <EnvelopeIcon className="w-5 h-5 text-gray-500 mr-3 shrink-0" />
                <input 
                  type="email" 
                  placeholder="john.doe@ecocycle.gov" 
                  className="bg-transparent border-none outline-none w-full text-sm text-gray-800 font-bold placeholder-gray-400"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Mobile Number</label>
              <div className="flex items-center bg-[#f0f2f5] rounded-xl px-4 py-2 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] h-12 focus-within:ring-2 focus-within:ring-[#186f45]/20 transition-shadow">
                <PhoneIcon className="w-5 h-5 text-gray-500 mr-3 shrink-0" />
                <input 
                  type="tel" 
                  placeholder="+1 (555) 000-0000" 
                  className="bg-transparent border-none outline-none w-full text-sm text-gray-800 font-bold placeholder-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Password</label>
              <div className="flex items-center bg-[#f0f2f5] rounded-xl px-4 py-2 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] h-12 focus-within:ring-2 focus-within:ring-[#186f45]/20 transition-shadow">
                <LockClosedIcon className="w-5 h-5 text-gray-500 mr-3 shrink-0" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="bg-transparent border-none outline-none w-full text-sm text-gray-800 font-bold placeholder-gray-400 tracking-widest"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none">
                  {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Confirm Password</label>
              <div className="flex items-center bg-[#f0f2f5] rounded-xl px-4 py-2 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] h-12 focus-within:ring-2 focus-within:ring-[#186f45]/20 transition-shadow">
                <LockClosedIcon className="w-5 h-5 text-gray-500 mr-3 shrink-0" />
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="bg-transparent border-none outline-none w-full text-sm text-gray-800 font-bold placeholder-gray-400 tracking-widest"
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none">
                  {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 border-t border-gray-300/50 bg-[#e6e9ef] flex items-center justify-end gap-4 shrink-0 rounded-b-[2rem]">
          <button 
            onClick={onClose}
            className="px-6 py-3 rounded-xl font-bold text-sm text-[#186f45] hover:bg-gray-200/50 transition-colors"
          >
            Cancel
          </button>
          <button className="h-12 px-8 bg-[#6cf3b7] text-[#145c39] rounded-xl font-bold text-sm flex items-center gap-2 shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15)] transition-all">
            <UserPlusIcon className="w-5 h-5" />
            Create Account
          </button>
        </div>

      </div>
    </div>
  );
}
