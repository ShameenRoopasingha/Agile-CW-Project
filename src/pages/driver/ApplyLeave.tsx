import { useState, type FormEvent } from "react";
import { Typography, Card, CardBody, Select, Option, Input, Button } from "../../lib/mt-components";
import {
  CalendarDaysIcon,
  PaperAirplaneIcon,
  CloudArrowUpIcon,
  FunnelIcon,
  XCircleIcon,
  EyeIcon,
  ChatBubbleLeftIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

/* ─── Types ────────────────────────────────────────────────────────── */

type LeaveStatus = "pending" | "approved" | "rejected";
type LeaveType = "casual" | "annual" | "emergency" | "sick";

interface LeaveRecord {
  id: string;
  type: LeaveType;
  label: string;
  startDate: string;
  endDate: string;
  totalDays: string;
  appliedDate: string;
  status: LeaveStatus;
}

/* ─── Static Data ──────────────────────────────────────────────────── */

const LEAVE_HISTORY: LeaveRecord[] = [
  {
    id: "L-001",
    type: "casual",
    label: "Casual Leave",
    startDate: "Nov 02",
    endDate: "Nov 04",
    totalDays: "3 days total",
    appliedDate: "Oct 24, 2024",
    status: "pending",
  },
  {
    id: "L-002",
    type: "annual",
    label: "Annual Leave",
    startDate: "Sep 15",
    endDate: "Sep 22",
    totalDays: "8 days total",
    appliedDate: "Sep 01, 2024",
    status: "approved",
  },
  {
    id: "L-003",
    type: "emergency",
    label: "Emergency Leave",
    startDate: "Aug 12",
    endDate: "Aug 12",
    totalDays: "1 day total",
    appliedDate: "Aug 11, 2024",
    status: "rejected",
  },
  {
    id: "L-004",
    type: "sick",
    label: "Sick Leave",
    startDate: "Jul 04",
    endDate: "Jul 05",
    totalDays: "2 days total",
    appliedDate: "Jul 04, 2024",
    status: "approved",
  },
];

const TYPE_DOT_COLORS: Record<LeaveType, string> = {
  casual: "bg-blue-500",
  annual: "bg-green-500",
  emergency: "bg-red-500",
  sick: "bg-green-400",
};

const STATUS_BADGE: Record<LeaveStatus, { bg: string; text: string; icon: typeof CheckCircleIcon; label: string }> = {
  pending: { bg: "bg-amber-50", text: "text-amber-600", icon: ClockIcon, label: "Pending" },
  approved: { bg: "bg-green-50", text: "text-green-600", icon: CheckCircleIcon, label: "Approved" },
  rejected: { bg: "bg-red-50", text: "text-red-600", icon: ExclamationCircleIcon, label: "Rejected" },
};

/* ─── Component ────────────────────────────────────────────────────── */

export function ApplyLeave() {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Leave request:", { leaveType, startDate, endDate, reason });
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* ══════════════ LEFT COLUMN: Request Form ══════════════ */}
        <div className="lg:col-span-2">
          <Card className="bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] rounded-2xl border-none">
            <CardBody className="p-5 sm:p-6">
              {/* Title */}
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[#e0f0db] flex items-center justify-center">
                  <CalendarDaysIcon className="w-5 h-5 text-[#3d6e32]" />
                </div>
                <Typography className="font-bold text-lg text-gray-800">Request Leave</Typography>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Leave Type */}
                <div>
                  <Typography className="text-sm font-semibold text-gray-700 mb-2">Leave Type</Typography>
                  <Select
                    label="Select category..."
                    className="!border-none !bg-[#f0f2f5] !rounded-xl shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff]"
                    value={leaveType}
                    onChange={(val: string | undefined) => setLeaveType(val || "")}
                  >
                    <Option value="casual">Casual Leave</Option>
                    <Option value="annual">Annual Leave</Option>
                    <Option value="sick">Sick Leave</Option>
                    <Option value="emergency">Emergency Leave</Option>
                  </Select>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Typography className="text-sm font-semibold text-gray-700 mb-2">Start Date</Typography>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full h-[46px] px-3 rounded-xl text-sm bg-[#f0f2f5] shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff] border-none outline-none focus:ring-2 focus:ring-[#629955]/30 text-gray-700"
                    />
                  </div>
                  <div>
                    <Typography className="text-sm font-semibold text-gray-700 mb-2">End Date</Typography>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full h-[46px] px-3 rounded-xl text-sm bg-[#f0f2f5] shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff] border-none outline-none focus:ring-2 focus:ring-[#629955]/30 text-gray-700"
                    />
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <Typography className="text-sm font-semibold text-gray-700 mb-2">Reason for Leave</Typography>
                  <textarea
                    rows={3}
                    placeholder="Please provide brief details for your supervisor..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-[#f0f2f5] shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff] border-none outline-none focus:ring-2 focus:ring-[#629955]/30 placeholder:text-gray-400 text-gray-700 resize-none"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <Typography className="text-sm font-semibold text-gray-700 mb-2">Optional Attachment</Typography>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center gap-2 bg-[#f0f2f5]/50 hover:border-[#629955]/50 transition-colors cursor-pointer">
                    <CloudArrowUpIcon className="w-8 h-8 text-gray-400" />
                    <Typography className="text-sm font-semibold text-gray-500 text-center">
                      Upload medical cert or documents
                    </Typography>
                    <Typography className="text-xs text-gray-400">PDF, JPG up to 5MB</Typography>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white font-bold bg-[#1a5c2e] shadow-[4px_4px_10px_#c4c7cc,-4px_-4px_10px_#ffffff] hover:bg-[#155025] active:shadow-[inset_3px_3px_6px_#0f3a1b,inset_-3px_-3px_6px_#1f7e37] transition-all duration-200"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                  Submit Leave Request
                </button>
              </form>
            </CardBody>
          </Card>
        </div>

        {/* ══════════════ RIGHT COLUMN: Stats + History ══════════════ */}
        <div className="lg:col-span-3 space-y-5">
          {/* Stat Cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {/* Days Used */}
            <Card className="bg-[#e6e9ef] shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] rounded-xl border-none">
              <CardBody className="p-3 sm:p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <Typography className="text-[10px] text-gray-400 font-bold uppercase">Days Used</Typography>
                  <Typography className="font-extrabold text-xl text-gray-800">
                    12 <span className="text-sm text-gray-400 font-bold">/ 24</span>
                  </Typography>
                </div>
              </CardBody>
            </Card>

            {/* Pending */}
            <Card className="bg-[#e6e9ef] shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] rounded-xl border-none">
              <CardBody className="p-3 sm:p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <ClockIcon className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <Typography className="text-[10px] text-gray-400 font-bold uppercase">Pending</Typography>
                  <Typography className="font-extrabold text-xl text-blue-600">01</Typography>
                </div>
              </CardBody>
            </Card>

            {/* Sick Leave */}
            <Card className="bg-[#e6e9ef] shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] rounded-xl border-none">
              <CardBody className="p-3 sm:p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <CalendarDaysIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <Typography className="text-[10px] text-gray-400 font-bold uppercase">Sick Leave</Typography>
                  <Typography className="font-extrabold text-xl text-gray-800">03</Typography>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Leave History Table */}
          <Card className="bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] rounded-2xl border-none">
            <CardBody className="p-5 sm:p-6">
              {/* Table Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#e0f0db] flex items-center justify-center">
                    <ClockIcon className="w-4 h-4 text-[#3d6e32]" />
                  </div>
                  <Typography className="font-bold text-base text-gray-800">Leave History</Typography>
                </div>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-[#629955] hover:text-[#3d6e32] transition-colors">
                  <FunnelIcon className="w-3.5 h-3.5" />
                  Filter
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <th className="pb-3 text-xs font-bold text-gray-400 uppercase">Type</th>
                      <th className="pb-3 text-xs font-bold text-gray-400 uppercase">Date Range</th>
                      <th className="pb-3 text-xs font-bold text-gray-400 uppercase hidden sm:table-cell">Applied Date</th>
                      <th className="pb-3 text-xs font-bold text-gray-400 uppercase">Status</th>
                      <th className="pb-3 text-xs font-bold text-gray-400 uppercase text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/50">
                    {LEAVE_HISTORY.map((leave) => {
                      const statusStyle = STATUS_BADGE[leave.status];
                      const StatusIcon = statusStyle.icon;

                      return (
                        <tr key={leave.id} className="hover:bg-[#dde0e5]/40 transition-colors">
                          {/* Type */}
                          <td className="py-4 pr-3">
                            <div className="flex items-center gap-2.5">
                              <span className={`w-2.5 h-2.5 rounded-full ${TYPE_DOT_COLORS[leave.type]}`}></span>
                              <Typography className="font-semibold text-sm text-gray-700">{leave.label}</Typography>
                            </div>
                          </td>

                          {/* Date Range */}
                          <td className="py-4 pr-3">
                            <Typography className="text-sm font-semibold text-gray-700">
                              {leave.startDate} - {leave.endDate}
                            </Typography>
                            <Typography className="text-[11px] text-gray-400">{leave.totalDays}</Typography>
                          </td>

                          {/* Applied Date */}
                          <td className="py-4 pr-3 hidden sm:table-cell">
                            <Typography className="text-sm text-gray-500">{leave.appliedDate}</Typography>
                          </td>

                          {/* Status */}
                          <td className="py-4 pr-3">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${statusStyle.bg} ${statusStyle.text}`}>
                              <StatusIcon className="w-3.5 h-3.5" />
                              {statusStyle.label}
                            </span>
                          </td>

                          {/* Action */}
                          <td className="py-4 text-center">
                            {leave.status === "pending" && (
                              <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all" title="Cancel">
                                <XCircleIcon className="w-5 h-5" />
                              </button>
                            )}
                            {leave.status === "approved" && (
                              <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all" title="View">
                                <EyeIcon className="w-5 h-5" />
                              </button>
                            )}
                            {leave.status === "rejected" && (
                              <button className="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-amber-50 transition-all" title="Feedback">
                                <ChatBubbleLeftIcon className="w-5 h-5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          {/* Leave Policy Tip */}
          <Card className="bg-[#e6e9ef] shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] rounded-xl border-none">
            <CardBody className="p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <InformationCircleIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <Typography className="font-bold text-sm text-gray-700 mb-1">Leave Policy Tip</Typography>
                <Typography className="text-sm text-gray-500 leading-relaxed">
                  Leave requests should be submitted at least 48 hours in advance for non-emergency situations. 
                  Emergency leave requires supervisor approval via phone within 2 hours of the shift start.
                </Typography>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
