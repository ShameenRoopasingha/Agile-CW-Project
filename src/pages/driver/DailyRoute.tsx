import { useState } from "react";
import { Typography, Card, CardBody, Button } from "../../lib/mt-components";
import {
  MapPinIcon,
  ExclamationTriangleIcon,
  FlagIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { MapPinIcon as MapPinSolidIcon } from "@heroicons/react/24/solid";

/* ─── Types ────────────────────────────────────────────────────────── */

interface RouteStop {
  id: string;
  address: string;
  area: string;
  time: string;
  status: "completed" | "current" | "upcoming";
  wasteType: string;
}

/* ─── Static Data ──────────────────────────────────────────────────── */

const ROUTE_STOPS: RouteStop[] = [
  { id: "S-001", address: "12 Lake View Rd", area: "Colombo 03", time: "06:15", status: "completed", wasteType: "Organic" },
  { id: "S-002", address: "45 Temple Lane", area: "Colombo 05", time: "06:42", status: "completed", wasteType: "Recyclable" },
  { id: "S-003", address: "78 Park Avenue", area: "Colombo 07", time: "07:10", status: "completed", wasteType: "Organic" },
  { id: "S-004", address: "23 Galle Face Terrace", area: "Colombo 03", time: "07:35", status: "current", wasteType: "General" },
  { id: "S-005", address: "91 Baseline Road", area: "Colombo 09", time: "08:00", status: "upcoming", wasteType: "Organic" },
  { id: "S-006", address: "15 Duplication Road", area: "Colombo 04", time: "08:25", status: "upcoming", wasteType: "Recyclable" },
  { id: "S-007", address: "67 Havelock Road", area: "Colombo 06", time: "08:50", status: "upcoming", wasteType: "Organic" },
];

/* ─── Component ────────────────────────────────────────────────────── */

export function DailyRoute() {
  const [stops] = useState(ROUTE_STOPS);

  const completedCount = stops.filter((s) => s.status === "completed").length;
  const totalStops = stops.length;
  const currentStop = stops.find((s) => s.status === "current");

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* ── Info Cards Row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Next Destination */}
        <Card className="bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-4 sm:p-5">
            <Typography className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
              Next Destination
            </Typography>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                <ExclamationTriangleIcon className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <Typography className="font-bold text-base text-gray-800">
                  {currentStop?.address || "Route Complete"}
                </Typography>
                <Typography className="text-sm text-gray-500 font-medium">
                  0.4 miles · 3 mins
                </Typography>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Distance Card */}
        <Card className="bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-4 sm:p-5">
            <Typography className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
              Distance
            </Typography>
            <Typography className="font-extrabold text-3xl text-gray-800">
              12.4 <span className="text-lg font-bold text-gray-500">mi</span>
            </Typography>
          </CardBody>
        </Card>
      </div>

      {/* ── Map Placeholder + Route Stops ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <Card className="bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] rounded-2xl border-none h-full min-h-[350px] sm:min-h-[450px]">
            <CardBody className="p-0 h-full flex flex-col">
              {/* Map visual */}
              <div className="flex-1 relative bg-[#e8edf3] rounded-t-2xl overflow-hidden">
                {/* Decorative Grid / Satellite texture approximation */}
                <div 
                  className="absolute inset-0 opacity-[0.15]" 
                  style={{
                    backgroundImage: "radial-gradient(#4b5563 1px, transparent 1px)",
                    backgroundSize: "32px 32px"
                  }}
                ></div>

                {/* Simulated City Roads (Background layer) */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
                  {/* Water / Parks */}
                  <path d="M 600 0 L 800 0 L 800 600 L 750 600 Q 700 300 600 0" fill="#d2e0eb" opacity="0.6"/>
                  <path d="M 0 400 Q 150 450 300 600 L 0 600 Z" fill="#dcedd9" opacity="0.5"/>
                  
                  {/* Roads */}
                  <g stroke="#ffffff" strokeWidth="4" opacity="0.8" fill="none" strokeLinecap="round">
                    <path d="M -50 100 L 850 150" />
                    <path d="M -50 350 L 850 300" />
                    <path d="M 200 -50 L 250 650" />
                    <path d="M 500 -50 L 450 650" />
                    <path d="M 100 100 L 150 350" />
                    <path d="M 200 200 L 500 220" />
                    <path d="M 400 320 L 450 550" />
                  </g>
                  <g stroke="#ffffff" strokeWidth="2" opacity="0.5" fill="none" strokeLinecap="round">
                    <path d="M -50 200 L 200 220" />
                    <path d="M -50 250 L 200 260" />
                    <path d="M 250 400 L 450 380" />
                    <path d="M 500 450 L 850 400" />
                  </g>

                  {/* The Actual Garbage Truck Route Line (Glowing Green) */}
                  <path
                    d="M 100 100 L 200 120 L 250 260 L 450 240 L 500 450 L 700 420"
                    stroke="#1a5c2e"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    opacity="0.3"
                  />
                  <path
                    d="M 100 100 L 200 120 L 250 260 L 450 240 L 500 450 L 700 420"
                    stroke="#4ade80"
                    strokeWidth="4"
                    strokeDasharray="12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    className="animate-[dash_3s_linear_infinite]"
                  />

                  {/* Route Stops / Nodes */}
                  {/* Completed */}
                  <circle cx="100" cy="100" r="6" fill="#1a5c2e" />
                  <circle cx="200" cy="120" r="6" fill="#1a5c2e" />
                  <circle cx="250" cy="260" r="6" fill="#1a5c2e" />
                  
                  {/* Upcoming */}
                  <circle cx="500" cy="450" r="5" fill="#a0aec0" />
                  <circle cx="700" cy="420" r="5" fill="#a0aec0" />
                  
                  {/* Current Stop Marker Area (Pulsing) */}
                  <circle cx="450" cy="240" r="14" fill="#1a5c2e" opacity="0.2">
                    <animate attributeName="r" values="14;24;14" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="450" cy="240" r="6" fill="#1a5c2e" />
                </svg>

                {/* Area labels */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100">
                  <Typography className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <MapPinIcon className="w-3.5 h-3.5 text-[#1a5c2e]" />
                    Colombo District
                  </Typography>
                </div>

                {/* Truck icon at current position overlay (HTML based for shadow/styling) */}
                <div className="absolute top-[40%] left-[56%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#1a5c2e]/20 animate-ping absolute -inset-2"></div>
                    <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shadow-[0_8px_16px_rgba(0,0,0,0.3)] transform -rotate-12 transition-transform hover:scale-110">
                      <TruckIcon className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Scale + controls */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                  <button className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur shadow-[4px_4px_10px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-[#1a5c2e] transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur shadow-[4px_4px_10px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-[#1a5c2e] transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                  </button>
                </div>
              </div>

              {/* Complete Route Button */}
              <div className="p-3">
                <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold bg-[#1a5c2e] shadow-[4px_4px_10px_#c4c7cc,-4px_-4px_10px_#ffffff] hover:bg-[#155025] active:shadow-[inset_3px_3px_6px_#0f3a1b,inset_-3px_-3px_6px_#1f7e37] transition-all duration-200">
                  <FlagIcon className="w-5 h-5" />
                  Complete Route
                </button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Route Stops List */}
        <div className="lg:col-span-1">
          <Card className="bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] rounded-2xl border-none">
            <CardBody className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <Typography className="font-bold text-base text-gray-800">Route Stops</Typography>
                <span className="text-xs font-bold text-[#629955] bg-[#e8f5e3] px-2.5 py-1 rounded-full">
                  {completedCount}/{totalStops}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-[#d9dce1] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] mb-5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#629955] to-[#7db96e] transition-all duration-500"
                  style={{ width: `${(completedCount / totalStops) * 100}%` }}
                ></div>
              </div>

              {/* Stops list */}
              <div className="space-y-1">
                {stops.map((stop, index) => (
                  <div
                    key={stop.id}
                    className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-200 ${
                      stop.status === "current"
                        ? "bg-[#e0f0db] shadow-[inset_2px_2px_4px_#c4dfc0,inset_-2px_-2px_4px_#f2fff0]"
                        : stop.status === "completed"
                        ? "opacity-60"
                        : ""
                    }`}
                  >
                    {/* Timeline indicator */}
                    <div className="flex flex-col items-center gap-0.5 pt-0.5 flex-shrink-0">
                      {stop.status === "completed" ? (
                        <CheckCircleIcon className="w-5 h-5 text-[#629955]" />
                      ) : stop.status === "current" ? (
                        <div className="w-5 h-5 rounded-full border-[3px] border-[#629955] bg-white flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#629955] animate-pulse"></div>
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white"></div>
                      )}
                      {index < stops.length - 1 && (
                        <div className={`w-0.5 h-6 ${stop.status === "completed" ? "bg-[#629955]/40" : "bg-gray-200"}`}></div>
                      )}
                    </div>

                    {/* Stop info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <Typography className={`font-semibold text-sm ${stop.status === "current" ? "text-[#3d6e32]" : "text-gray-700"}`}>
                          {stop.address}
                        </Typography>
                        <Typography className="text-[10px] text-gray-400 font-medium flex-shrink-0 ml-2">
                          {stop.time}
                        </Typography>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Typography className="text-[11px] text-gray-400">{stop.area}</Typography>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <Typography className="text-[11px] text-gray-400">{stop.wasteType}</Typography>
                      </div>
                    </div>

                    {/* Action for current stop */}
                    {stop.status === "current" && (
                      <button className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#629955] flex items-center justify-center shadow-sm hover:bg-[#527f47] transition-colors">
                        <ChevronRightIcon className="w-4 h-4 text-white" strokeWidth={3} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
