import { useState, useEffect, type FormEvent } from "react";
import { Typography, Card, CardBody, Select, Option } from "../../lib/mt-components";
import {
  CalendarDaysIcon,
  PaperAirplaneIcon,
  CloudArrowUpIcon,
  FunnelIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { applyLeave, getLeaveHistory } from "../../lib/api";

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

/* ─── Helper Functions ────────────────────────────────────────────────── */

const calculateDays = (start: string, end: string) => {
  const d1 = new Date(start);
  const d2 = new Date(end);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 0;
  const diff = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
};

const formatDateShort = (dateString: string) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
};

const formatDateFull = (dateString: string) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
};

const mapLeaveType = (type: string): LeaveType => {
  const lower = type.toLowerCase();
  if (lower.includes("casual")) return "casual";
  if (lower.includes("annual")) return "annual";
  if (lower.includes("emergency")) return "emergency";
  return "sick";
};

/* ─── Component ────────────────────────────────────────────────────── */

export function ApplyLeave() {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  
  const [history, setHistory] = useState<LeaveRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await getLeaveHistory();
      if (res && res.history) {
        const mapped = res.history.map((item: any) => ({
          id: item._id,
          type: mapLeaveType(item.leaveType),
          label: item.leaveType || "Unknown Leave",
          startDate: formatDateShort(item.startDate),
          endDate: formatDateShort(item.endDate),
          totalDays: `${calculateDays(item.startDate, item.endDate)} days total`,
          appliedDate: formatDateFull(item.createdAt),
          status: (item.status || "Pending").toLowerCase() as LeaveStatus,
        }));
        setHistory(mapped);
      }
    } catch (err: any) {
      console.error("Failed to load history", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!leaveType || !startDate || !endDate || !reason) {
      setError("Please fill in all fields");
      return;
    }
    
    try {
      setSubmitLoading(true);
      setError("");
      setSuccess("");
      
      const payload = {
        leaveType,
        startDate,
        endDate,
        reason
      };
      
      await applyLeave(payload);
      setSuccess("Leave request submitted successfully!");
      setLeaveType("");
      setStartDate("");
      setEndDate("");
      setReason("");
      
      // Refresh history
      fetchHistory();
    } catch (err: any) {
      setError(err.message || "Failed to submit leave request");
    } finally {
      setSubmitLoading(false);
    }
  };

  const pendingCount = history.filter(h => h.status === "pending").length;
  const sickCount = history.filter(h => h.type === "sick" && h.status === "approved").length;
  // Calculate total days used for approved leaves
  let daysUsed = 0;
  history.forEach(h => {
    if (h.status === "approved") {
       daysUsed += parseInt(h.totalDays.split(" ")[0]) || 0;
    }
  });

  return (
    <div className="space-y-5 relative">
      {success && (
        <div className="absolute top-0 right-0 z-50 bg-[#186f45] text-white px-6 py-4 rounded-xl shadow-[8px_8px_16px_rgba(0,0,0,0.2)] flex items-center gap-3 animate-in slide-in-from-top-10 fade-in duration-300">
          <CheckCircleIcon className="w-6 h-6 text-[#6cf3b7]" />
          <span className="font-bold text-sm">{success}</span>
        </div>
      )}
      
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

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-bold shadow-[inset_2px_2px_4px_rgba(255,100,100,0.2)]">
                  {error}
                </div>
              )}

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
                    <Option value="Casual">Casual Leave</Option>
                    <Option value="Annual">Annual Leave</Option>
                    <Option value="Sick">Sick Leave</Option>
                    <Option value="Emergency">Emergency Leave</Option>
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
                      min={startDate}
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
                  disabled={submitLoading}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white font-bold bg-[#1a5c2e] shadow-[4px_4px_10px_#c4c7cc,-4px_-4px_10px_#ffffff] hover:bg-[#155025] active:shadow-[inset_3px_3px_6px_#0f3a1b,inset_-3px_-3px_6px_#1f7e37] transition-all duration-200 disabled:opacity-50"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                  {submitLoading ? "Submitting..." : "Submit Leave Request"}
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
                    {daysUsed} <span className="text-sm text-gray-400 font-bold">/ 24</span>
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
                  <Typography className="font-extrabold text-xl text-blue-600">{pendingCount.toString().padStart(2, '0')}</Typography>
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
                  <Typography className="font-extrabold text-xl text-gray-800">{sickCount.toString().padStart(2, '0')}</Typography>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Leave History Table */}
          <Card className="bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] rounded-2xl border-none flex-1">
            <CardBody className="p-5 sm:p-6 flex flex-col h-full">
              {/* Table Header */}
              <div className="flex items-center justify-between mb-5 shrink-0">
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
              <div className="overflow-x-auto overflow-y-auto max-h-[300px] flex-1">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <Typography color="gray" className="font-bold">Loading history...</Typography>
                  </div>
                ) : history.length === 0 ? (
                   <div className="flex items-center justify-center h-full">
                    <Typography color="gray" className="font-bold">No leave history found.</Typography>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="text-left sticky top-0 bg-[#e6e9ef] z-10">
                        <th className="pb-3 pt-1 text-xs font-bold text-gray-400 uppercase">Type</th>
                        <th className="pb-3 pt-1 text-xs font-bold text-gray-400 uppercase">Date Range</th>
                        <th className="pb-3 pt-1 text-xs font-bold text-gray-400 uppercase hidden sm:table-cell">Applied Date</th>
                        <th className="pb-3 pt-1 text-xs font-bold text-gray-400 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/50">
                      {history.map((leave) => {
                        const statusStyle = STATUS_BADGE[leave.status] || STATUS_BADGE["pending"];
                        const StatusIcon = statusStyle.icon;

                        return (
                          <tr key={leave.id} className="hover:bg-[#dde0e5]/40 transition-colors">
                            {/* Type */}
                            <td className="py-4 pr-3">
                              <div className="flex items-center gap-2.5">
                                <span className={`w-2.5 h-2.5 rounded-full ${TYPE_DOT_COLORS[leave.type] || "bg-gray-500"}`}></span>
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
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
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
