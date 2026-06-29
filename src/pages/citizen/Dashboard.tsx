import { useState } from "react";
import { Typography, Card, CardBody } from "../../lib/mt-components";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowDownTrayIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

/* ─── Types ────────────────────────────────────────────────────────── */

interface WasteEvent {
  day: number;
  label: string;
  type: "perishable" | "non-perishable";
}

/* ─── Static Data ──────────────────────────────────────────────────── */

/** Example events for September 2024 matching the reference design */
const EVENTS_SEPT_2024: WasteEvent[] = [
  { day: 3, label: "Organic Bin", type: "perishable" },
  { day: 5, label: "Glass & Plastic", type: "non-perishable" },
  { day: 10, label: "Green Waste", type: "perishable" },
  { day: 17, label: "Food Scrap", type: "perishable" },
  { day: 19, label: "Paper & Cardboard", type: "non-perishable" },
];

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* ─── Helper ───────────────────────────────────────────────────────── */

function getCalendarGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const cells: { day: number; isCurrentMonth: boolean }[] = [];

  // Previous-month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, isCurrentMonth: false });
  }
  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, isCurrentMonth: true });
  }
  // Pad to full rows of 7
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length - (firstDay + daysInMonth) + 1, isCurrentMonth: false });
  }

  return cells;
}

/* ─── Component ────────────────────────────────────────────────────── */

export function CitizenDashboard() {
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(8); // September (0-indexed)

  const today = 4; // Highlighted "today" for the demo
  const cells = getCalendarGrid(year, month);
  const monthLabel = new Date(year, month).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const goToPrevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };

  const goToNextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const goToToday = () => {
    const now = new Date();
    setYear(now.getFullYear());
    setMonth(now.getMonth());
  };

  // Lookup events for a given day
  const getEventsForDay = (day: number) =>
    EVENTS_SEPT_2024.filter(e => e.day === day);

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-5">
      {/* ── Page Header Row ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
        <div>
          <Typography variant="h4" color="blue-gray" className="font-bold text-xl">
            Waste Collection Schedule
          </Typography>
          <Typography variant="small" color="gray" className="text-sm mt-0.5">
            Plan your disposal accordingly.
          </Typography>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#3d6e32] bg-[#e6e9ef] shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] hover:shadow-[inset_3px_3px_6px_#c4c7cc,inset_-3px_-3px_6px_#ffffff] transition-shadow duration-300">
            <ArrowDownTrayIcon className="h-4 w-4" />
            Download PDF
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#629955] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:bg-[#4d7e42] transition-colors duration-200">
            Request Special Pickup
          </button>
        </div>
      </div>

      {/* ── Main Grid: Calendar + Right Sidebar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 flex-1 min-h-0">

        {/* ── Calendar Card ── */}
        <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none overflow-hidden">
          <CardBody className="p-5">
            {/* Calendar Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={goToPrevMonth}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#e6e9ef] shadow-[3px_3px_6px_#c4c7cc,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-shadow"
                  aria-label="Previous month"
                >
                  <ChevronLeftIcon className="h-4 w-4 text-gray-600" />
                </button>
                <Typography variant="h6" color="blue-gray" className="font-bold text-base min-w-[160px] text-center">
                  {monthLabel}
                </Typography>
                <button
                  onClick={goToNextMonth}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#e6e9ef] shadow-[3px_3px_6px_#c4c7cc,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-shadow"
                  aria-label="Next month"
                >
                  <ChevronRightIcon className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  onClick={goToToday}
                  className="ml-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 bg-[#e6e9ef] shadow-[3px_3px_6px_#c4c7cc,-3px_-3px_6px_#ffffff] hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-shadow"
                >
                  Today
                </button>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#629955]"></span>
                  <span className="text-gray-600 font-medium">Perishable</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3b82a0]"></span>
                  <span className="text-gray-600 font-medium">Non-Perishable</span>
                </span>
              </div>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 border-b border-gray-300/60 pb-2 mb-1">
              {DAYS_OF_WEEK.map(d => (
                <div key={d} className="text-center">
                  <Typography variant="small" className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {d}
                  </Typography>
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
              {cells.map((cell, idx) => {
                const events = cell.isCurrentMonth ? getEventsForDay(cell.day) : [];
                const isToday = cell.isCurrentMonth && cell.day === today;

                return (
                  <div
                    key={idx}
                    className={`min-h-[80px] p-1.5 border-b border-r border-gray-200/50 relative ${
                      !cell.isCurrentMonth ? "opacity-40" : ""
                    } ${idx % 7 === 0 ? "border-l border-gray-200/50" : ""}`}
                  >
                    {/* Day Number */}
                    <div className="flex items-start justify-between">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold ${
                          isToday
                            ? "bg-[#629955] text-white shadow-[2px_2px_4px_#c4c7cc]"
                            : "text-gray-700"
                        }`}
                      >
                        {cell.day}
                      </span>
                    </div>

                    {/* Events */}
                    {events.map((evt, eIdx) => (
                      <div
                        key={eIdx}
                        className={`mt-1 px-1.5 py-1 rounded-md text-[10px] font-bold leading-tight ${
                          evt.type === "perishable"
                            ? "bg-[#c5eacc] text-[#2c5126]"
                            : "bg-[#c5e3ec] text-[#1a5a6e]"
                        }`}
                      >
                        <span className="block uppercase text-[8px] font-extrabold tracking-wider opacity-80">
                          {evt.type === "perishable" ? "PERISHABLE" : "NON-PERISH"}
                        </span>
                        {evt.label}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* ── Right Sidebar ── */}
        <div className="flex flex-col gap-5">

          {/* Next Pickup Card */}
          <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
            <CardBody className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                <Typography variant="h6" color="blue-gray" className="font-bold text-sm">
                  Next Pickup
                </Typography>
              </div>

              {/* Tomorrow Highlight */}
              <div className="rounded-xl bg-[#ecfdf5] border border-[#a7e8c4]/40 p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#16a34a] font-extrabold text-sm uppercase tracking-wide">
                    TOMORROW
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                  </svg>
                </div>
                <Typography variant="small" className="text-[#16a34a] text-sm font-medium leading-snug">
                  Non - Perishable Waste
                </Typography>
                <Typography variant="small" className="text-[#16a34a] text-xs mt-1 leading-relaxed">
                  Please ensure the green bin is on the curb by 6:00 AM.
                </Typography>
                <div className="flex items-center gap-1.5 mt-3">
                  <ClockIcon className="h-3.5 w-3.5 text-[#16a34a]" />
                  <Typography variant="small" className="text-[#16a34a] text-xs font-semibold">
                    Estimated arrival: 08:45 AM
                  </Typography>
                </div>
              </div>

              {/* Upcoming Collection */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] cursor-pointer hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-shadow group">
                <div className="w-9 h-9 rounded-lg bg-[#c5e3ec] flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#1a5a6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <Typography variant="small" className="text-[10px] text-gray-500 font-medium uppercase">
                    WED, SEP, 5
                  </Typography>
                  <Typography variant="small" color="blue-gray" className="text-sm font-bold">
                    Non-Perishable
                  </Typography>
                </div>
                <ChevronRightIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors shrink-0" />
              </div>
            </CardBody>
          </Card>

          {/* Waste Guidelines Card */}
          <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none flex-1">
            <CardBody className="p-5">
              <Typography variant="small" className="font-bold text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-4">
                WASTE GUIDELINES
              </Typography>

              <div className="flex flex-col gap-4">
                {/* Perishable (Green) */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#c5eacc] flex items-center justify-center shrink-0 mt-0.5 shadow-[2px_2px_4px_#c4c7cc,-2px_-2px_4px_#ffffff]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#2c5126]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                  </div>
                  <div>
                    <Typography variant="small" className="text-sm font-bold text-[#2c5126]">
                      Perishable (Green)
                    </Typography>
                    <Typography variant="small" className="text-xs text-gray-600 leading-relaxed mt-0.5">
                      Food scraps, garden clippings, soiled paper. No plastic bags.
                    </Typography>
                  </div>
                </div>

                {/* Non-Perishable (Blue) */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#c5e3ec] flex items-center justify-center shrink-0 mt-0.5 shadow-[2px_2px_4px_#c4c7cc,-2px_-2px_4px_#ffffff]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#1a5a6e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                  </div>
                  <div>
                    <Typography variant="small" className="text-sm font-bold text-[#1a5a6e]">
                      Non-Perishable (Blue)
                    </Typography>
                    <Typography variant="small" className="text-xs text-gray-600 leading-relaxed mt-0.5">
                      Glass, hard plastics, metals, paper & cardboard. Rinse containers.
                    </Typography>
                  </div>
                </div>

                {/* Hazardous */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#ffd9d9] flex items-center justify-center shrink-0 mt-0.5 shadow-[2px_2px_4px_#c4c7cc,-2px_-2px_4px_#ffffff]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  </div>
                  <div>
                    <Typography variant="small" className="text-sm font-bold text-red-700">
                      Hazardous (Red)
                    </Typography>
                    <Typography variant="small" className="text-xs text-gray-600 leading-relaxed mt-0.5">
                      Batteries, chemicals, e-waste. Schedule a special pickup.
                    </Typography>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
