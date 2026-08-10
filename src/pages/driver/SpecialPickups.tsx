import { useState } from "react";
import { Typography, Card, CardBody } from "../../lib/mt-components";
import {
  MapPinIcon,
  ArchiveBoxIcon,
  CheckCircleIcon,
  PlayIcon,
  MapIcon,
  ExclamationTriangleIcon,

} from "@heroicons/react/24/outline";

/* ─── Types ────────────────────────────────────────────────────────── */

type Priority = "high" | "medium" | "low";
type PickupStatus = "pending" | "accepted" | "in-progress" | "completed";

interface SpecialPickup {
  id: string;
  name: string;
  date: string;
  requestedAgo: string;
  address: string;
  area: string;
  wasteCategory: string;
  priority: Priority;
  status: PickupStatus;
}

/* ─── Static Data ──────────────────────────────────────────────────── */

const PICKUPS: SpecialPickup[] = [
  {
    id: "SP-8821",
    name: "Elena Rodriguez",
    date: "Oct 24, 2023",
    requestedAgo: "2h ago",
    address: "122 Oakwood Dr, North Sector",
    area: "North Sector",
    wasteCategory: "Hazardous Chemicals",
    priority: "high",
    status: "pending",
  },
  {
    id: "SP-8822",
    name: "Julian Thorne",
    date: "Oct 24, 2023",
    requestedAgo: "4h ago",
    address: "45 Maple Ave, Central Square",
    area: "Central Square",
    wasteCategory: "Bulky Furniture",
    priority: "medium",
    status: "accepted",
  },
  {
    id: "SP-8823",
    name: "Sarah Jenkins",
    date: "Oct 24, 2023",
    requestedAgo: "6h ago",
    address: "88 River Run, East Pier",
    area: "East Pier",
    wasteCategory: "Electronic Waste",
    priority: "low",
    status: "completed",
  },
  {
    id: "SP-8819",
    name: "Robert Chen",
    date: "Oct 24, 2023",
    requestedAgo: "1h ago",
    address: "12 Skyline Terrace",
    area: "Skyline",
    wasteCategory: "Industrial Batteries",
    priority: "high",
    status: "in-progress",
  },
];

/* ─── Helpers ──────────────────────────────────────────────────────── */

const PRIORITY_STYLES: Record<Priority, { bg: string; text: string; label: string; border: string }> = {
  high: { bg: "bg-red-50", text: "text-red-600", label: "HIGH PRIORITY", border: "border-l-red-500" },
  medium: { bg: "bg-blue-50", text: "text-blue-600", label: "MEDIUM PRIORITY", border: "border-l-blue-500" },
  low: { bg: "bg-green-50", text: "text-green-600", label: "LOW PRIORITY", border: "border-l-green-500" },
};

/* ─── Component ────────────────────────────────────────────────────── */

export function SpecialPickups() {
  const [pickups] = useState(PICKUPS);

  const pendingCount = pickups.filter((p) => p.status === "pending" || p.status === "accepted").length;
  const inProgressCount = pickups.filter((p) => p.status === "in-progress").length;

  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <Typography className="font-extrabold text-2xl text-gray-800">Special Pickups</Typography>
          <Typography className="text-sm text-gray-500 font-medium mt-1">
            Manage on-demand hazardous, bulky, or e-waste requests.
          </Typography>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex flex-col items-center px-5 py-2 rounded-xl bg-[#e6e9ef] shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff]">
            <Typography className="font-extrabold text-xl text-[#1a5c2e]">{String(pendingCount).padStart(2, "0")}</Typography>
            <Typography className="text-[10px] text-gray-500 font-semibold">Pending</Typography>
          </div>
          <div className="flex flex-col items-center px-5 py-2 rounded-xl bg-[#e6e9ef] shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff]">
            <Typography className="font-extrabold text-xl text-[#1a5c2e]">{String(inProgressCount).padStart(2, "0")}</Typography>
            <Typography className="text-[10px] text-gray-500 font-semibold">In Progress</Typography>
          </div>
        </div>
      </div>

      {/* ── Pickup Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {pickups.map((pickup) => {
          const priority = PRIORITY_STYLES[pickup.priority];
          const isCurrent = pickup.status === "in-progress";

          return (
            <Card
              key={pickup.id}
              className={`rounded-2xl border-none border-l-4 ${priority.border} overflow-hidden transition-all duration-300 ${
                isCurrent
                  ? "bg-blue-50/80 shadow-[8px_8px_16px_#b0c4de,-8px_-8px_16px_#ffffff] ring-1 ring-blue-200/60"
                  : "bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff]"
              }`}
            >
              <CardBody className="p-5">
                {/* Top row: priority badge, ID, date */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {isCurrent ? (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-700">
                        CURRENT
                      </span>
                    ) : (
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${priority.bg} ${priority.text}`}>
                        {priority.label}
                      </span>
                    )}
                    <Typography className="text-xs text-gray-400 font-medium">
                      ID: #{pickup.id}
                    </Typography>
                  </div>
                  <div className="text-right">
                    <Typography className="text-xs font-semibold text-gray-600">{pickup.date}</Typography>
                    <Typography className="text-[10px] text-gray-400">Requested {pickup.requestedAgo}</Typography>
                  </div>
                </div>

                {/* Active task badge */}
                {isCurrent && (
                  <div className="flex justify-end -mt-1 mb-2">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-green-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      ACTIVE TASK
                    </span>
                  </div>
                )}

                {/* Name */}
                <Typography className="font-bold text-lg text-gray-800 mb-3">
                  {pickup.name}
                </Typography>

                {/* Address + Waste Category */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="flex items-start gap-2">
                    <MapPinIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isCurrent ? "text-blue-500" : "text-gray-400"}`} />
                    <div>
                      <Typography className="text-[10px] text-gray-400 font-semibold uppercase">Address</Typography>
                      <Typography className="text-sm font-semibold text-gray-700">{pickup.address}</Typography>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <ArchiveBoxIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isCurrent ? "text-blue-500" : "text-gray-400"}`} />
                    <div>
                      <Typography className="text-[10px] text-gray-400 font-semibold uppercase">Waste Category</Typography>
                      <Typography className="text-sm font-semibold text-gray-700">{pickup.wasteCategory}</Typography>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {pickup.status === "pending" && (
                    <>
                      <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-gray-600 bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-all duration-200 border border-gray-200/60">
                        <MapIcon className="w-4 h-4" /> Map
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white bg-[#1a5c2e] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:bg-[#155025] active:shadow-[inset_2px_2px_4px_#0f3a1b,inset_-2px_-2px_4px_#1f7e37] transition-all duration-200">
                        <CheckCircleIcon className="w-4 h-4" /> Accept
                      </button>
                    </>
                  )}
                  {pickup.status === "accepted" && (
                    <>
                      <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-gray-600 bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-all duration-200 border border-gray-200/60">
                        <MapIcon className="w-4 h-4" /> Map
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white bg-[#1a5c2e] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:bg-[#155025] active:shadow-[inset_2px_2px_4px_#0f3a1b,inset_-2px_-2px_4px_#1f7e37] transition-all duration-200">
                        <PlayIcon className="w-4 h-4" /> Start
                      </button>
                    </>
                  )}
                  {pickup.status === "in-progress" && (
                    <>
                      <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-gray-600 bg-white/80 shadow-[4px_4px_8px_#b0c4de,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#b0c4de,inset_-2px_-2px_4px_#ffffff] transition-all duration-200 border border-blue-200/60">
                        <ExclamationTriangleIcon className="w-4 h-4" /> Navigate
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white bg-[#1a5c2e] shadow-[4px_4px_8px_#b0c4de,-4px_-4px_8px_#ffffff] hover:bg-[#155025] active:shadow-[inset_2px_2px_4px_#0f3a1b,inset_-2px_-2px_4px_#1f7e37] transition-all duration-200">
                        <CheckCircleIcon className="w-4 h-4" /> Complete
                      </button>
                    </>
                  )}
                  {pickup.status === "completed" && (
                    <>
                      <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-gray-600 bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-all duration-200 border border-gray-200/60">
                        <MapIcon className="w-4 h-4" /> Map
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-gray-400 bg-gray-200/70 cursor-not-allowed" disabled>
                        <CheckCircleIcon className="w-4 h-4" /> Complete
                      </button>
                    </>
                  )}
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
