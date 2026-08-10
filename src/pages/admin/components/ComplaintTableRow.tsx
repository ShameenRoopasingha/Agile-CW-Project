import { memo } from "react";
import { Typography } from "../../../lib/mt-components";
import type { Complaint } from "../../../types/complaint";

interface ComplaintTableRowProps {
  complaint: Complaint;
  isLast: boolean;
  isSelected: boolean;
  onSelect: (complaint: Complaint) => void;
}

export const ComplaintTableRow = memo(({ complaint, isLast, isSelected, onSelect }: ComplaintTableRowProps) => {
  const { id, date, time, location, asstNo, status } = complaint;
  const classes = isLast ? "p-4" : "p-4 border-b border-gray-300/50";
  
  let badgeColor = "";
  let badgeBg = "";
  const s = status.toLowerCase();
  if (s === "pending") {
    badgeColor = "text-red-800";
    badgeBg = "bg-red-100/80 shadow-[inset_1px_1px_2px_rgba(255,150,150,0.3)]";
  } else if (s === "in-progress") {
    badgeColor = "text-yellow-800";
    badgeBg = "bg-yellow-100 shadow-[inset_1px_1px_2px_rgba(255,200,100,0.3)]";
  } else if (s === "resolved") {
    badgeColor = "text-teal-800";
    badgeBg = "bg-teal-100/80 shadow-[inset_1px_1px_2px_rgba(150,255,255,0.3)]";
  } else if (s === "rejected") {
    badgeColor = "text-red-900";
    badgeBg = "bg-red-200 shadow-[inset_1px_1px_2px_rgba(255,100,100,0.3)]";
  }

  return (
    <tr 
      onClick={() => onSelect(complaint)}
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
});
ComplaintTableRow.displayName = "ComplaintTableRow";
