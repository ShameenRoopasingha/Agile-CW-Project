import { useState } from "react";
import { Typography, Card, CardBody } from "../../lib/mt-components";
import {
  MapPinIcon,
  ShieldCheckIcon,
  TruckIcon,
  ClockIcon,
  CheckCircleIcon,
  PencilSquareIcon,
  XMarkIcon,
  Squares2X2Icon,
  PhoneIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

type FlowState = "form" | "success" | "tracking";

export function BulkyWaste() {
  const [step, setStep] = useState<FlowState>("form");
  const [address, setAddress] = useState("");

  const handleNext = () => setStep("success");
  const handleOpenMap = () => setStep("tracking");
  const handleBackToDashboard = () => setStep("form");

  return (
    <div className="w-full">
      {step === "form" && (
        <RequestForm address={address} setAddress={setAddress} onNext={handleNext} />
      )}
      {step === "success" && (
        <RequestSuccess onBack={handleBackToDashboard} onTrack={handleOpenMap} />
      )}
      {step === "tracking" && (
        <LiveTracking onBack={handleBackToDashboard} />
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   STATE A: REQUEST FORM (Image 2)
   ────────────────────────────────────────────────────────────────────────── */
function RequestForm({ address, setAddress, onNext }: { address: string, setAddress: (v: string) => void, onNext: () => void }) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <Typography variant="h5" color="blue-gray" className="font-bold text-xl">
          Request New Pickup
        </Typography>
        <Typography className="text-sm font-medium text-gray-500 mt-1">
          Schedule a municipal waste collection for your location.
        </Typography>
      </div>

      <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
        {/* Top Progress Bar */}
        <div className="w-full h-1.5 flex overflow-hidden rounded-t-2xl">
          <div className="w-1/3 bg-[#1a5c2e]"></div>
          <div className="w-2/3 bg-gray-300"></div>
        </div>

        <CardBody className="p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1a5c2e] text-white flex items-center justify-center font-bold text-sm">
              1
            </div>
            <Typography className="font-extrabold text-[#1a5c2e] text-base">Address & Location</Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <Typography className="text-sm font-bold text-gray-700 mb-2">Pickup Address</Typography>
                <textarea
                  rows={4}
                  placeholder="123 Sustainability Ave, Green District, EcoCity 4001"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-4 rounded-xl text-sm bg-[#f0f2f5] shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff] border-none outline-none focus:ring-2 focus:ring-[#1a5c2e]/30 text-gray-700 resize-none font-medium"
                />
              </div>

              <div>
                <button className="flex items-center gap-2 text-sm font-bold text-blue-600 mb-3 hover:text-blue-700 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  Use Current Location
                </button>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#eef3ee] border border-green-200/50 shadow-sm">
                  <InformationCircleIcon className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
                  <Typography className="text-xs font-semibold text-gray-600 leading-relaxed">
                    Ensure the pickup point is accessible for heavy vehicles. Obstructed paths may lead to delays.
                  </Typography>
                </div>
              </div>
            </div>

            <div className="relative h-64 md:h-auto rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-[#a3ccff]">
              {/* Fake Map */}
              <div className="absolute inset-0 bg-[#e3eaef] opacity-50" style={{ backgroundImage: "radial-gradient(#4b5563 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
              <div className="absolute inset-x-0 top-1/2 h-8 bg-blue-300/30 -translate-y-1/2 transform -rotate-12"></div>
              
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow font-bold text-xs text-gray-800 border border-gray-100">
                GPS: 37.7749° N, 122.4194° W
              </div>
              
              {/* Map controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-1">
                <button className="w-8 h-8 bg-white rounded-t-lg shadow flex items-center justify-center font-bold text-gray-600 hover:bg-gray-50">+</button>
                <button className="w-8 h-8 bg-white rounded-b-lg shadow flex items-center justify-center font-bold text-gray-600 hover:bg-gray-50">−</button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-gray-300/50">
            <button 
              onClick={onNext}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1a5c2e] text-white font-bold shadow-[4px_4px_10px_#c4c7cc,-4px_-4px_10px_#ffffff] hover:bg-[#155025] transition-all"
            >
              Next Step
              <ArrowRightIcon className="w-4 h-4 stroke-2" />
            </button>
          </div>
        </CardBody>
      </Card>

      {/* Feature Cards Bottom */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
        <div className="p-5 rounded-2xl bg-[#e6e9ef] shadow-[6px_6px_14px_#c4c7cc,-6px_-6px_14px_#ffffff]">
          <ShieldCheckIcon className="w-7 h-7 text-green-600 mb-3" />
          <Typography className="font-bold text-sm text-gray-800 mb-1">Eco-Guaranteed</Typography>
          <Typography className="text-xs font-semibold text-gray-500 leading-relaxed">
            100% of collected recyclables are tracked to verified processing facilities.
          </Typography>
        </div>
        <div className="p-5 rounded-2xl bg-[#e6e9ef] shadow-[6px_6px_14px_#c4c7cc,-6px_-6px_14px_#ffffff]">
          <TruckIcon className="w-7 h-7 text-blue-600 mb-3" />
          <Typography className="font-bold text-sm text-gray-800 mb-1">Live Tracking</Typography>
          <Typography className="text-xs font-semibold text-gray-500 leading-relaxed">
            Receive a real-time GPS link when the driver is 15 minutes away.
          </Typography>
        </div>
        <div className="p-5 rounded-2xl bg-[#e6e9ef] shadow-[6px_6px_14px_#c4c7cc,-6px_-6px_14px_#ffffff]">
          <ClockIcon className="w-7 h-7 text-blue-800 mb-3" />
          <Typography className="font-bold text-sm text-gray-800 mb-1">24/7 Dispatch</Typography>
          <Typography className="text-xs font-semibold text-gray-500 leading-relaxed">
            Questions? Chat with our logistics support team anytime.
          </Typography>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   STATE B: REQUEST SUCCESS (Image 4)
   ────────────────────────────────────────────────────────────────────────── */
function RequestSuccess({ onBack, onTrack }: { onBack: () => void, onTrack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center pt-8 pb-12">
      <div className="w-20 h-20 rounded-full bg-[#3d6e32] text-white flex items-center justify-center mb-6 shadow-xl">
        <CheckCircleIcon className="w-10 h-10" strokeWidth={2.5} />
      </div>
      
      <Typography className="font-extrabold text-3xl text-[#1a5c2e] text-center mb-3">
        Request Submitted Successfully!
      </Typography>
      <Typography className="text-base font-medium text-gray-600 text-center mb-10">
        Your waste pickup has been logged and is awaiting dispatch approval.
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {/* Main Details Card */}
        <Card className="md:col-span-2 bg-white/50 backdrop-blur-sm rounded-2xl shadow-[16px_16px_32px_#c4c7cc,-16px_-16px_32px_#ffffff] border border-white">
          <CardBody className="p-6 sm:p-8">
            <div className="flex items-start justify-between mb-8 pb-6 border-b border-gray-200/60">
              <div>
                <Typography className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Request ID</Typography>
                <Typography className="font-extrabold text-2xl text-gray-800">#BW-8829</Typography>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 font-bold text-xs flex items-center gap-1.5 border border-amber-200/50">
                <ClockIcon className="w-4 h-4" />
                Pending Approval
              </div>
            </div>

            <div className="space-y-6 mb-8 pb-6 border-b border-gray-200/60 font-semibold text-sm text-gray-600">
              <div className="flex items-start gap-4">
                <MapPinIcon className="w-6 h-6 text-[#1a5c2e] shrink-0" />
                <div>
                  <Typography className="font-bold text-gray-800 text-sm mb-1">Pickup Address</Typography>
                  4228 Emerald District, Building 7, Suite 102<br/>Logistics Hub, Green City 90210
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ClockIcon className="w-6 h-6 text-[#1a5c2e] shrink-0" />
                <div>
                  <Typography className="font-bold text-gray-800 text-sm mb-1">Scheduled Window</Typography>
                  October 24, 2024 • 09:00 AM - 01:00 PM
                </div>
              </div>
            </div>

            <div className="mb-6">
              <Typography className="font-bold text-gray-800 text-sm mb-4">Waste Summary</Typography>
              <div className="space-y-3 text-sm font-medium text-gray-500">
                <div className="flex justify-between">
                  <span>1x Three-Seater Sofa (Fabric)</span>
                  <span className="font-bold text-gray-800">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>1x Industrial Fridge (Non-Hazardous)</span>
                  <span className="font-bold text-gray-800">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Logistics Processing Fee</span>
                  <span className="font-bold text-gray-800">$0.00</span>
                </div>
              </div>
            </div>

            <div className="bg-[#f0f9f2] rounded-xl p-5 flex items-center justify-between mb-6 shadow-[inset_2px_2px_4px_#d1ead7,inset_-2px_-2px_4px_#ffffff]">
              <Typography className="font-bold text-lg text-[#1a5c2e]">Estimated Fee</Typography>
              <Typography className="font-extrabold text-3xl text-[#1a5c2e]">$0.00</Typography>
            </div>

            <div className="flex items-center gap-2 bg-[#f0f2f5] p-3 rounded-xl border border-gray-200/50">
              <ShieldCheckIcon className="w-5 h-5 text-[#3d6e32]" />
              <Typography className="text-[10px] font-bold text-[#3d6e32] uppercase tracking-wider">
                Eco-Compliance Verified • Government Grade Logistics
              </Typography>
            </div>
          </CardBody>
        </Card>

        {/* Right Sidebar (Photos & Actions) */}
        <div className="space-y-4">
          <Card className="bg-[#e6e9ef] rounded-2xl shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] border-none">
            <CardBody className="p-5">
              <div className="flex items-center gap-2 mb-4 text-sm font-bold text-gray-800">
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Verification Photos
              </div>
              <div className="flex gap-3 mb-3">
                <div className="w-20 h-20 rounded-lg bg-gray-200 border border-gray-300 shadow-sm flex items-center justify-center">
                  <span className="text-[10px] font-medium text-gray-400">Sofa.jpg</span>
                </div>
                <div className="w-20 h-20 rounded-lg bg-gray-200 border border-gray-300 shadow-sm flex items-center justify-center">
                  <span className="text-[10px] font-medium text-gray-400">Fridge.jpg</span>
                </div>
              </div>
              <Typography className="text-[11px] font-medium text-gray-500 italic">2 files uploaded for review.</Typography>
            </CardBody>
          </Card>

          <button onClick={onBack} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#1a5c2e] text-white font-bold shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:bg-[#155025] transition-all">
            <Squares2X2Icon className="w-5 h-5" />
            Back to Dashboard
          </button>
          
          <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-[#1a5c2e] font-bold shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] border-2 border-[#1a5c2e] hover:bg-gray-50 transition-all">
            <PencilSquareIcon className="w-5 h-5" />
            Edit Request
          </button>
          
          <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-transparent text-red-500 font-bold hover:bg-red-50 transition-colors">
            <XMarkIcon className="w-5 h-5" />
            Cancel Request
          </button>

          {/* Need Help Card */}
          <div className="bg-[#0073b6] text-white p-5 rounded-2xl shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] mt-6">
            <Typography className="font-bold text-sm mb-2">Need help?</Typography>
            <Typography className="text-xs font-medium text-blue-100 mb-4 leading-relaxed">
              You can open live map on that Time
            </Typography>
            <button onClick={onTrack} className="text-sm font-bold underline hover:text-white transition-colors">
              Open Live Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   STATE C: LIVE TRACKING (Image 3)
   ────────────────────────────────────────────────────────────────────────── */
function LiveTracking({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-100px)] -mx-2">
      {/* Map Area */}
      <div className="flex-1 rounded-2xl overflow-hidden relative shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] bg-[#c5dac9]">
        {/* Fake Map Elements */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(#4b5563 1px, transparent 1px), linear-gradient(90deg, #4b5563 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
        
        {/* Efficiency Badge */}
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur rounded-xl p-3 shadow-md border border-white flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#e8f5e9] text-[#1a5c2e] flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div>
            <Typography className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Route Efficiency</Typography>
            <Typography className="text-lg font-extrabold text-[#1a5c2e] leading-none">98.4%</Typography>
          </div>
        </div>

        {/* Route Line */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path d="M 200 600 L 700 150" stroke="#1a5c2e" strokeWidth="6" strokeDasharray="12 12" opacity="0.6" fill="none" strokeLinecap="round" />
        </svg>

        {/* Truck Marker */}
        <div className="absolute top-[25%] left-[65%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 bg-[#1a5c2e] rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10">
              <TruckIcon className="w-6 h-6 text-white" />
            </div>
            <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-md text-[10px] font-extrabold text-gray-700 border border-gray-100 whitespace-nowrap">
              EV-742 <span className="text-[#1a5c2e] ml-1">• LIVE</span>
            </div>
          </div>
        </div>

        {/* Home Marker */}
        <div className="absolute top-[75%] left-[30%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-14 h-14 bg-[#1a5c2e]/20 rounded-full flex items-center justify-center absolute -inset-1 animate-ping"></div>
            <div className="w-12 h-12 bg-[#1a5c2e] rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10">
              <MapPinIcon className="w-6 h-6 text-white" />
            </div>
            <div className="bg-[#1a5c2e] text-white px-3 py-1 rounded-full shadow-md text-[10px] font-bold whitespace-nowrap z-10">
              Your Location
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
          <div className="flex flex-col rounded-xl bg-white/90 shadow-md border border-gray-100 overflow-hidden">
            <button className="w-10 h-10 flex items-center justify-center font-bold text-xl text-gray-600 hover:bg-gray-100 border-b border-gray-200">+</button>
            <button className="w-10 h-10 flex items-center justify-center font-bold text-xl text-gray-600 hover:bg-gray-100">−</button>
          </div>
          <button className="w-10 h-10 rounded-xl bg-[#1a5c2e] text-white shadow-md flex items-center justify-center hover:bg-[#155025]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar Panel */}
      <div className="w-full lg:w-96 shrink-0 flex flex-col gap-6 overflow-y-auto pr-2 pb-6">
        
        {/* Header */}
        <div>
          <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors mb-3">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Request
          </button>
          <div className="flex items-center justify-between mb-1">
            <Typography className="font-extrabold text-2xl text-gray-800">Live Tracking</Typography>
            <span className="px-2.5 py-1 rounded bg-[#1a5c2e] text-white text-[10px] font-bold uppercase tracking-wider">ACTIVE</span>
          </div>
          <Typography className="text-xs font-semibold text-gray-500">Order #EW-94210-BZ</Typography>
        </div>

        {/* ETA & Distance */}
        <div className="bg-[#f0f2f5] rounded-xl p-5 shadow-[inset_4px_4px_8px_#d9dce1,inset_-4px_-4px_8px_#ffffff] flex justify-between items-center relative overflow-hidden">
          <div className="absolute inset-y-0 left-1/2 w-px bg-gray-300"></div>
          <div className="flex-1 text-center">
            <Typography className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">ETA</Typography>
            <Typography className="text-3xl font-extrabold text-[#1a5c2e]">15 <span className="text-lg font-bold text-gray-700">mins</span></Typography>
          </div>
          <div className="flex-1 text-center">
            <Typography className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Distance</Typography>
            <Typography className="text-xl font-extrabold text-gray-800 mt-2">3.2 km</Typography>
          </div>
        </div>

        {/* Status Timeline */}
        <div>
          <Typography className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6">Status Timeline</Typography>
          <div className="space-y-6 relative pl-3">
            <div className="absolute left-5 top-2 bottom-4 w-0.5 bg-gray-200"></div>
            
            {/* Step 1 */}
            <div className="flex items-start gap-5 relative z-10">
              <div className="w-5 h-5 rounded-full bg-[#1a5c2e] text-white flex items-center justify-center shrink-0 mt-0.5 ring-4 ring-[#e6e9ef]">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <div>
                <Typography className="text-sm font-bold text-gray-800">Pickup Requested</Typography>
                <Typography className="text-[11px] font-medium text-gray-400 mt-0.5">09:12 AM</Typography>
              </div>
            </div>

            {/* Step 2 (Active) */}
            <div className="flex items-start gap-5 relative z-10">
              <div className="w-5 h-5 rounded-full border-4 border-[#1a5c2e] bg-white flex items-center justify-center shrink-0 mt-0.5 ring-4 ring-[#e6e9ef]">
                <div className="w-2 h-2 bg-[#1a5c2e] rounded-full"></div>
              </div>
              <div>
                <Typography className="text-sm font-bold text-[#1a5c2e]">On the Way</Typography>
                <Typography className="text-[11px] font-medium text-gray-500 mt-0.5">Driver is currently 3.2km away</Typography>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-5 relative z-10">
              <div className="w-5 h-5 rounded-full border-[3px] border-gray-300 bg-white shrink-0 mt-0.5 ring-4 ring-[#e6e9ef]"></div>
              <div>
                <Typography className="text-sm font-bold text-gray-400">Arriving Soon</Typography>
                <Typography className="text-[11px] font-medium text-gray-400 mt-0.5">Estimated 09:45 AM</Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Personnel & Vehicle Card */}
        <Card className="bg-white/80 rounded-2xl shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] border border-gray-100">
          <CardBody className="p-5">
            <Typography className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Personnel & Vehicle</Typography>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gray-200 overflow-hidden shadow-inner">
                {/* Fake Avatar */}
                <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
              </div>
              <div>
                <Typography className="font-bold text-base text-gray-800">Marcus Chen</Typography>
                <Typography className="text-xs font-bold text-[#1a5c2e]">Senior Fleet Operator</Typography>
                <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-gray-500">
                  <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  4.9 (2.4k jobs)
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-5 pb-5 border-b border-gray-100">
              <div className="flex-1">
                <Typography className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Vehicle</Typography>
                <Typography className="text-sm font-extrabold text-gray-800">Truck-EV 742</Typography>
              </div>
              <div className="flex-1">
                <Typography className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Plate</Typography>
                <Typography className="text-sm font-extrabold text-gray-800">ECO-8821</Typography>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1a5c2e] text-white font-bold shadow-[4px_4px_8px_rgba(26,92,46,0.3),-4px_-4px_8px_#ffffff] hover:bg-[#155025]">
                <PhoneIcon className="w-5 h-5" />
                Contact
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-600 shadow-sm hover:bg-gray-50 shrink-0">
                <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />
              </button>
            </div>
          </CardBody>
        </Card>

      </div>
    </div>
  );
}
