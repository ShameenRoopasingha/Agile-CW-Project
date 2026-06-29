import { Typography, Card, CardBody } from "../../lib/mt-components";
import {
  ClockIcon,
  ChevronDownIcon,
  InformationCircleIcon,
  BellAlertIcon,
  MapPinIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

export function CollectionSchedule() {
  return (
    <div className="relative w-full h-[calc(100vh-80px)] -mt-2 -mx-4 sm:-mx-6 rounded-none sm:rounded-tl-2xl overflow-hidden bg-[#e8edf3]">
      {/* ─── Map Background Layer ─── */}
      <div className="absolute inset-0 z-0 bg-[#e8edf3]">
        {/* Decorative Grid / Satellite texture approximation */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{
            backgroundImage: "radial-gradient(#4b5563 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }}
        ></div>

        {/* Route Line (Glowing Green) */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path
            d="M -100 800 C 100 600, 300 700, 400 500 S 500 300, 700 400 S 900 200, 1200 100"
            stroke="#1a5c2e"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M -100 800 C 100 600, 300 700, 400 500 S 500 300, 700 400 S 900 200, 1200 100"
            stroke="#4ade80"
            strokeWidth="4"
            strokeDasharray="12 12"
            strokeLinecap="round"
            fill="none"
            className="animate-[dash_2s_linear_infinite]"
          />
        </svg>

        {/* Truck Marker */}
        <div className="absolute top-[45%] left-[45%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-[#1a5c2e]/20 animate-ping absolute -inset-2"></div>
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shadow-lg transform -rotate-12">
              <TruckIcon className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Home Marker */}
        <div className="absolute top-[20%] left-[60%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-white text-white flex items-center justify-center shadow-lg">
              <span className="w-2 h-2 bg-white rounded-full"></span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Top Right Badges ─── */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md text-xs font-bold text-gray-700">
          <span className="w-3 h-1 rounded-full bg-[#1a5c2e]"></span>
          Active Route
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md text-xs font-bold text-gray-700">
          <MapPinIcon className="w-4 h-4 text-red-500" />
          Your Home
        </div>
      </div>

      {/* ─── Bottom Right Control ─── */}
      <div className="absolute bottom-6 right-6 z-10">
        <button className="w-12 h-12 rounded-xl bg-[#1a5c2e] text-white flex items-center justify-center shadow-lg hover:bg-[#155025] transition-colors">
          <div className="w-5 h-5 border-2 border-white rounded-full relative">
            <span className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-0.5 bg-white"></span>
            <span className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-0.5 bg-white"></span>
          </div>
        </button>
      </div>

      {/* ─── Left Floating Panels ─── */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 w-[calc(100%-32px)] sm:w-96 flex flex-col gap-4 pointer-events-none">
        
        {/* Live Status Card */}
        <Card className="bg-[#e6e9ef]/95 backdrop-blur-md shadow-[12px_12px_24px_rgba(196,199,204,0.6),-12px_-12px_24px_rgba(255,255,255,0.6)] rounded-2xl border border-white/50 pointer-events-auto">
          <CardBody className="p-5 sm:p-6">
            
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <Typography className="font-extrabold text-lg text-gray-800">Live Status</Typography>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3d6e32] animate-pulse"></span>
                  <Typography className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                    Live GPS Connection
                  </Typography>
                </div>
              </div>
              <button className="w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
                <ChevronDownIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Current Location */}
            <div className="flex items-start gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 transform rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <div>
                <Typography className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                  Current Location
                </Typography>
                <Typography className="text-sm font-bold text-gray-800 leading-tight">
                  Approaching Sector 4, Pine Street
                </Typography>
              </div>
            </div>

            {/* Estimated Arrival (Inner Card) */}
            <div className="bg-[#d2e2d5] rounded-xl p-4 flex items-center gap-4 mb-5 shadow-[inset_2px_2px_4px_#bccbc0,inset_-2px_-2px_4px_#e8f9eb]">
              <div className="w-10 h-10 rounded-lg bg-[#1a5c2e] text-white flex items-center justify-center shrink-0 shadow-sm">
                <ClockIcon className="w-6 h-6" />
              </div>
              <div>
                <Typography className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-0.5">
                  Estimated Arrival
                </Typography>
                <div className="flex items-baseline gap-2">
                  <Typography className="text-2xl font-extrabold text-[#1a5c2e]">12 mins</Typography>
                  <Typography className="text-xs font-semibold text-gray-500">09:14 AM</Typography>
                </div>
              </div>
            </div>

            {/* Details Row */}
            <div className="flex items-center justify-between mb-6 px-1">
              <div>
                <Typography className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Collection Type
                </Typography>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <Typography className="text-sm font-bold text-gray-800">Non-Perishable</Typography>
                </div>
              </div>
              <div>
                <Typography className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Departure
                </Typography>
                <Typography className="text-sm font-bold text-gray-800">08:30 AM</Typography>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full py-3.5 rounded-xl bg-[#5a9c50] text-white font-bold flex items-center justify-center gap-2 shadow-[4px_4px_10px_rgba(90,156,80,0.3),-4px_-4px_10px_#ffffff] hover:bg-[#4d8644] transition-all">
              <BellAlertIcon className="w-5 h-5" />
              Truck will Arrive Soon
            </button>
          </CardBody>
        </Card>

        {/* Traffic Notice Card */}
        <Card className="bg-[#e6e9ef]/95 backdrop-blur-md shadow-[12px_12px_24px_rgba(196,199,204,0.6),-12px_-12px_24px_rgba(255,255,255,0.6)] rounded-2xl border border-white/50 pointer-events-auto">
          <CardBody className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
              <InformationCircleIcon className="w-6 h-6" />
            </div>
            <div>
              <Typography className="text-sm font-bold text-gray-800 mb-0.5">Traffic Notice</Typography>
              <Typography className="text-xs font-semibold text-gray-500">
                Expect 2 min delay near Oak Circle.
              </Typography>
            </div>
          </CardBody>
        </Card>

      </div>
    </div>
  );
}
