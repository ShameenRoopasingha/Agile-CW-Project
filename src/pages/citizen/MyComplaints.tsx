import { useState } from "react";
import { Typography, Card, CardBody, Button } from "../../lib/mt-components";
import {
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

interface Complaint {
  id: string;
  title: string;
  category: string;
  status: "Pending" | "In Progress" | "Resolved";
  date: string;
  description: string;
}

const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: "CMP-1042",
    title: "Missed collection on Main Street",
    category: "Missed Pickup",
    status: "In Progress",
    date: "Jun 24, 2026",
    description: "The waste collection truck did not come to our lane on the scheduled day.",
  },
  {
    id: "CMP-1038",
    title: "Overflowing public bin near park",
    category: "Public Bin Issue",
    status: "Pending",
    date: "Jun 22, 2026",
    description: "The public waste bin at Central Park entrance has been overflowing for 3 days.",
  },
  {
    id: "CMP-1025",
    title: "Illegal dumping reported",
    category: "Illegal Dumping",
    status: "Resolved",
    date: "Jun 18, 2026",
    description: "Construction waste dumped on vacant lot on 3rd Avenue.",
  },
  {
    id: "CMP-1010",
    title: "Recycling bins not provided",
    category: "Service Request",
    status: "Resolved",
    date: "Jun 10, 2026",
    description: "Our residential block has not received the new recycling bins.",
  },
];

const STATUS_STYLES = {
  Pending: {
    bg: "bg-[#ffecd2]",
    text: "text-orange-700",
    icon: ClockIcon,
  },
  "In Progress": {
    bg: "bg-[#dce8ff]",
    text: "text-blue-700",
    icon: ExclamationTriangleIcon,
  },
  Resolved: {
    bg: "bg-[#c5eacc]",
    text: "text-[#3d6e32]",
    icon: CheckCircleIcon,
  },
};

export function MyComplaints() {
  const [filter, setFilter] = useState<"All" | "Pending" | "In Progress" | "Resolved">("All");

  const filtered = filter === "All" ? MOCK_COMPLAINTS : MOCK_COMPLAINTS.filter((c) => c.status === filter);

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Typography variant="h4" color="blue-gray" className="font-bold text-xl">
            My Complaints
          </Typography>
          <Typography variant="small" color="gray" className="text-sm">
            {MOCK_COMPLAINTS.length} total complaints
          </Typography>
        </div>
        <Button
          className="flex items-center gap-2 !bg-[#629955] !text-white font-bold !shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] active:!shadow-[inset_4px_4px_8px_#4e7a44,inset_-4px_-4px_8px_#76b866] transition-all duration-300 py-3 px-5 rounded-xl text-sm border-none"
        >
          <PlusIcon className="h-4 w-4" strokeWidth={2.5} />
          New Complaint
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["All", "Pending", "In Progress", "Resolved"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              filter === tab
                ? "bg-[#e6e9ef] shadow-[inset_3px_3px_6px_#c4c7cc,inset_-3px_-3px_6px_#ffffff] text-gray-900"
                : "bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Complaint Cards */}
      <div className="flex flex-col gap-4">
        {filtered.map((complaint) => {
          const style = STATUS_STYLES[complaint.status];
          return (
            <Card
              key={complaint.id}
              className="bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] rounded-2xl border-none hover:shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] transition-shadow duration-300"
            >
              <CardBody className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <Typography variant="small" color="gray" className="font-mono text-xs text-gray-400">
                        {complaint.id}
                      </Typography>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${style.bg} ${style.text}`}>
                        <style.icon className="h-3.5 w-3.5" />
                        {complaint.status}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#f0f2f5] text-gray-600">
                        {complaint.category}
                      </span>
                    </div>
                    <Typography variant="h6" color="blue-gray" className="font-bold text-base mb-1">
                      {complaint.title}
                    </Typography>
                    <Typography variant="small" color="gray" className="text-sm">
                      {complaint.description}
                    </Typography>
                  </div>
                  <Typography variant="small" color="gray" className="text-xs whitespace-nowrap shrink-0 sm:mt-1">
                    {complaint.date}
                  </Typography>
                </div>
              </CardBody>
            </Card>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Typography color="gray" className="text-sm">
              No complaints found with status "{filter}".
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
