import { memo, useState } from "react";
import { Typography, Card, IconButton } from "../../../../lib/mt-components";
import { 
  FunnelIcon, 
  BarsArrowDownIcon, 
  UserCircleIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import type { Staff } from "../../../../types/staff";
import { updateStaff, deleteStaff } from "../../../../lib/api";

interface StaffTableProps {
  staffList: Staff[];
  onRefresh?: () => void;
}

export const StaffTable = memo(({ staffList, onRefresh }: StaffTableProps) => {
  const [deleteModalStaff, setDeleteModalStaff] = useState<Staff | null>(null);
  const [editModalStaff, setEditModalStaff] = useState<Staff | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Edit form state
  const [editPhone, setEditPhone] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editName, setEditName] = useState("");

  const handleDelete = (staff: Staff) => {
    setDeleteModalStaff(staff);
  };

  const confirmDelete = async () => {
    if (!deleteModalStaff) return;
    try {
      setIsProcessing(true);
      await deleteStaff(deleteModalStaff.id);
      setDeleteModalStaff(null);
      setSuccessMessage("Staff deleted successfully!");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      if (onRefresh) onRefresh();
    } catch (err: any) {
      alert("Failed to delete staff: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEdit = (staff: Staff) => {
    setEditModalStaff(staff);
    setEditName(staff.name);
    setEditPhone("");
    setEditPassword("");
  };

  const confirmEdit = async () => {
    if (!editModalStaff) return;
    try {
      setIsProcessing(true);
      const payload: any = { name: editName };
      if (editPhone) payload.phone = editPhone;
      if (editPassword) payload.password = editPassword;

      await updateStaff(editModalStaff.id, payload);
      setEditModalStaff(null);
      setSuccessMessage("Staff updated successfully!");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      if (onRefresh) onRefresh();
    } catch (err: any) {
      alert("Failed to update staff: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none flex flex-col z-0 w-full relative">
        {/* Controls Row */}
        <div className="p-4 sm:p-6 border-b border-gray-300/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="h-10 px-4 bg-[#e6e9ef] rounded-xl shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] flex items-center gap-2 hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-shadow text-gray-700 font-bold text-xs">
              <FunnelIcon className="w-4 h-4" />
              Filter By Department
            </button>
            <button className="h-10 px-4 bg-[#e6e9ef] rounded-xl shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] flex items-center gap-2 hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-shadow text-gray-700 font-bold text-xs">
              <BarsArrowDownIcon className="w-4 h-4" />
              Sort
            </button>
          </div>
          <Typography variant="small" color="gray" className="font-bold text-xs">
            Showing 1-10 of 142 team members
          </Typography>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-max table-auto text-left border-collapse">
            <thead>
              <tr>
                {["Team Member", "Role / Department", "Email Address", "Status", "Actions"].map((head) => (
                  <th key={head} className="border-b border-gray-300 p-4 pt-6 pb-4">
                    <Typography variant="small" color="blue-gray" className="font-bold tracking-wider text-xs text-gray-800">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff, index) => {
                const isLast = index === staffList.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-gray-300/50";
                
                const getBadgeClasses = (status: string) => {
                  if (status === "Active") {
                    return "bg-[#d0ebd6]/80 text-[#2c5126] shadow-[inset_1px_1px_2px_rgba(44,81,38,0.2)]";
                  }
                  if (status === "Inactive") {
                    return "bg-red-100/80 text-red-800 shadow-[inset_1px_1px_2px_rgba(255,150,150,0.3)]";
                  }
                  return "bg-gray-200 text-gray-800 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]";
                };
                const finalBadgeClass = getBadgeClasses(staff.status);

                return (
                  <tr key={staff.id} className="hover:bg-[#f0f2f5]/80 transition-colors">
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden shadow-[2px_2px_4px_#c4c7cc,-2px_-2px_4px_#ffffff]">
                           {staff.avatarUrl ? <img src={staff.avatarUrl} alt={staff.name} className="w-full h-full object-cover" /> : <UserCircleIcon className="w-full h-full text-gray-600" />}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 text-sm">{staff.name}</span>
                          <span className="text-gray-500 text-xs">ID: {staff.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800 text-sm">{staff.role}</span>
                        <span className="text-[#2c5126] font-bold text-xs">{staff.department}</span>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-medium text-sm text-gray-700">
                        {staff.email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className={`inline-block px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${finalBadgeClass}`}>
                        {staff.status}
                      </div>
                    </td>
                    <td className={classes}>
                       <div className="flex items-center gap-2">
                         <IconButton 
                           variant="text" 
                           color="blue" 
                           onClick={() => handleEdit(staff)}
                           className="w-8 h-8 rounded-lg bg-[#e6e9ef] shadow-[2px_2px_5px_#c4c7cc,-2px_-2px_5px_#ffffff] hover:shadow-[inset_2px_2px_5px_#c4c7cc,inset_-2px_-2px_5px_#ffffff] transition-all"
                         >
                           <PencilIcon className="w-4 h-4 text-blue-600" />
                         </IconButton>
                         <IconButton 
                           variant="text" 
                           color="red"
                           onClick={() => handleDelete(staff)} 
                           className="w-8 h-8 rounded-lg bg-[#e6e9ef] shadow-[2px_2px_5px_#c4c7cc,-2px_-2px_5px_#ffffff] hover:shadow-[inset_2px_2px_5px_#c4c7cc,inset_-2px_-2px_5px_#ffffff] transition-all"
                         >
                           <TrashIcon className="w-4 h-4 text-red-500" />
                         </IconButton>
                       </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-300/50 flex items-center justify-between">
          <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors">
            <ChevronLeftIcon className="w-4 h-4" /> Previous
          </button>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg bg-[#186f45] text-white flex items-center justify-center text-xs font-bold shadow-[2px_2px_4px_#c4c7cc]">
              1
            </button>
            <button className="w-8 h-8 rounded-lg bg-transparent text-gray-700 flex items-center justify-center text-xs font-bold hover:bg-gray-200 transition-colors">
              2
            </button>
            <button className="w-8 h-8 rounded-lg bg-transparent text-gray-700 flex items-center justify-center text-xs font-bold hover:bg-gray-200 transition-colors">
              3
            </button>
            <span className="text-gray-500 text-xs font-bold px-1">...</span>
            <button className="w-8 h-8 rounded-lg bg-transparent text-gray-700 flex items-center justify-center text-xs font-bold hover:bg-gray-200 transition-colors">
              15
            </button>
          </div>
          <button className="flex items-center gap-2 text-xs font-bold text-gray-900 hover:text-gray-700 transition-colors">
            Next <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </Card>

      {/* Fake Edit Modal */}
      {editModalStaff && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-[#e6e9ef]/80 backdrop-blur-md" onClick={() => setEditModalStaff(null)} />
          <div className="relative w-full max-w-md bg-[#e6e9ef] rounded-[2rem] shadow-[24px_24px_48px_#c4c7cc,-24px_-24px_48px_#ffffff] border border-white/40 flex flex-col p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <Typography variant="h5" color="blue-gray" className="font-bold">Edit Staff Profile</Typography>
              <IconButton variant="text" onClick={() => setEditModalStaff(null)} className="rounded-full -mr-2">
                <XMarkIcon className="w-5 h-5 text-gray-600" />
              </IconButton>
            </div>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Full Name</label>
                <div className="bg-[#f0f2f5] rounded-xl px-4 py-2 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] h-11 flex items-center">
                  <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="bg-transparent border-none outline-none w-full text-sm font-bold text-gray-800" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Role / Department (Read-only)</label>
                <div className="bg-[#f0f2f5] rounded-xl px-4 py-2 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] h-11 flex items-center opacity-70">
                  <span className="text-sm font-bold text-gray-800">{editModalStaff.role}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">New Phone Number (Optional)</label>
                <div className="bg-[#f0f2f5] rounded-xl px-4 py-2 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] h-11 flex items-center">
                  <input type="tel" placeholder="Leave empty to keep current" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="bg-transparent border-none outline-none w-full text-sm font-bold text-gray-800" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">New Password (Optional)</label>
                <div className="bg-[#f0f2f5] rounded-xl px-4 py-2 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] h-11 flex items-center">
                  <input type="password" placeholder="Leave empty to keep current" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} className="bg-transparent border-none outline-none w-full text-sm font-bold text-gray-800" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4">
              <button onClick={() => setEditModalStaff(null)} className="px-6 py-2.5 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-200/50 transition-colors">
                Cancel
              </button>
              <button onClick={confirmEdit} disabled={isProcessing} className="px-6 py-2.5 bg-[#6cf3b7] text-[#145c39] rounded-xl font-bold text-sm shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15)] transition-all disabled:opacity-50">
                {isProcessing ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fake Delete Confirmation Modal */}
      {deleteModalStaff && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-[#e6e9ef]/80 backdrop-blur-md" onClick={() => setDeleteModalStaff(null)} />
          <div className="relative w-full max-w-sm bg-[#e6e9ef] rounded-[2rem] shadow-[24px_24px_48px_#c4c7cc,-24px_-24px_48px_#ffffff] border border-white/40 flex flex-col p-8 items-center text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4 shadow-[inset_2px_2px_4px_rgba(255,100,100,0.2)]">
              <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
            </div>
            <Typography variant="h5" color="blue-gray" className="font-bold mb-2">Delete {deleteModalStaff.name}?</Typography>
            <Typography className="text-gray-600 text-sm font-medium mb-8">
              Are you sure you want to remove this staff member from the directory? This action cannot be undone.
            </Typography>
            <div className="flex items-center justify-center gap-4 w-full">
              <button onClick={() => setDeleteModalStaff(null)} className="flex-1 py-2.5 rounded-xl font-bold text-sm text-gray-700 bg-[#e6e9ef] shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-all">
                Cancel
              </button>
              <button onClick={confirmDelete} disabled={isProcessing} className="flex-1 py-2.5 bg-[#ffd9d9] text-red-600 rounded-xl font-bold text-sm shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-all disabled:opacity-50">
                {isProcessing ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Success Notification Overlay */}
      {showSuccess && (
        <div className="fixed top-8 right-8 z-[110] bg-[#186f45] text-white px-6 py-4 rounded-xl shadow-[8px_8px_16px_rgba(0,0,0,0.2)] flex items-center gap-3 animate-in slide-in-from-top-10 fade-in duration-300">
          <CheckCircleIcon className="w-6 h-6 text-[#6cf3b7]" />
          <span className="font-bold text-sm">{successMessage}</span>
        </div>
      )}
    </>
  );
});
StaffTable.displayName = "StaffTable";
