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
              <div className="flex-1 relative bg-gradient-to-br from-[#e8edf3] to-[#dde2e8] rounded-t-2xl overflow-hidden">
                {/* Decorative grid lines */}
                <div className="absolute inset-0 opacity-[0.06]" style={{
                  backgroundImage: "linear-gradient(#9aa3af 1px, transparent 1px), linear-gradient(90deg, #9aa3af 1px, transparent 1px)",
                  backgroundSize: "40px 40px"
                }}></div>

                {/* Route path visualization */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400" fill="none" preserveAspectRatio="xMidYMid slice">
                  {/* Route line */}
                  <path
                    d="M 80 350 C 120 280, 180 250, 200 200 S 280 120, 350 150 S 420 200, 480 120 S 540 80, 560 60"
                    stroke="#629955"
                    strokeWidth="3"
                    strokeDasharray="8 4"
                    fill="none"
                    opacity="0.7"
                  />
                  {/* Completed stops */}
                  <circle cx="80" cy="350" r="8" fill="#629955" opacity="0.8" />
                  <circle cx="200" cy="200" r="8" fill="#629955" opacity="0.8" />
                  <circle cx="350" cy="150" r="8" fill="#629955" opacity="0.8" />
                  {/* Current stop — pulsing */}
                  <circle cx="480" cy="120" r="12" fill="#629955" opacity="0.2">
                    <animate attributeName="r" values="12;18;12" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="480" cy="120" r="7" fill="#629955" />
                  {/* Upcoming stops */}
                  <circle cx="560" cy="60" r="6" fill="#c4c7cc" />
                </svg>

                {/* Area labels */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm">
                  <Typography className="text-xs font-semibold text-gray-700">Colombo District</Typography>
                </div>

                {/* Truck icon at current position */}
                <div className="absolute" style={{ left: "76%", top: "25%", transform: "translate(-50%, -50%)" }}>
                  <div className="w-10 h-10 rounded-full bg-[#629955] shadow-lg flex items-center justify-center animate-bounce" style={{ animationDuration: "3s" }}>
                    <TruckIcon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Scale + controls */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-1.5">
                  <button className="w-8 h-8 rounded-lg bg-white/90 shadow-md flex items-center justify-center text-gray-600 hover:bg-white transition-colors text-lg font-bold">⊕</button>
                  <button className="w-8 h-8 rounded-lg bg-white/90 shadow-md flex items-center justify-center text-gray-600 hover:bg-white transition-colors text-lg font-bold">+</button>
                  <button className="w-8 h-8 rounded-lg bg-white/90 shadow-md flex items-center justify-center text-gray-600 hover:bg-white transition-colors text-lg font-bold">−</button>
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
