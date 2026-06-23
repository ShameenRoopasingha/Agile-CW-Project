import { memo } from "react";
import { Typography, Card } from "../../../../lib/mt-components";
import { FunnelIcon, BarsArrowDownIcon, UserCircleIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { Staff } from "../../../../types/staff";

interface StaffTableProps {
  staffList: Staff[];
}

export const StaffTable = memo(({ staffList }: StaffTableProps) => {
  return (
    <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none flex flex-col z-0 w-full">
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
                     {/* Actions placeholder */}
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
  );
});
StaffTable.displayName = "StaffTable";
