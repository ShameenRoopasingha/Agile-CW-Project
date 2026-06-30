import { useState } from "react";
import { Typography, Card, CardBody, Alert } from "../../lib/mt-components";
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
  CalendarDaysIcon,
  UserIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  TvIcon,
  HomeIcon,
  ScissorsIcon,
  EllipsisHorizontalIcon,
  PhotoIcon,
  CloudArrowUpIcon,
  CheckIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

// ── Types ───────────────────────────────────────────────────────────────

type FlowState = "wizard" | "success" | "tracking";

interface WizardData {
  // Step 1: Location
  addressSearch: string;
  streetAddress: string;
  apartmentUnit: string;
  zipCode: string;
  
  // Step 2: Waste Details
  category: string;
  materials: string[];
  quantity: string;
  weight: string;
  sourceOfWaste: string;
  excavatorNeeded: boolean;
  bobcatNeeded: boolean;
  hazardous: boolean;
  description: string;
  photos: string[];

  // Step 3: Schedule
  date: string; // YYYY-MM-DD
  timeWindow: string; // "morning" | "afternoon" | "evening"

  // Step 4: Contact
  fullName: string;
  phone: string;
  email: string;
  accessibilityNotes: string;
  
  // Step 5: Review
  termsAgreed: boolean;
}

const INITIAL_WIZARD_DATA: WizardData = {
  addressSearch: "",
  streetAddress: "",
  apartmentUnit: "",
  zipCode: "",
  category: "Construction & Demolition", // Default matching mockup
  materials: ["Concrete", "Tiles", "Wood"], // Default matching mockup
  quantity: "1-5 Cubic Yards (Small Pile)",
  weight: "500 - 2000 lbs",
  sourceOfWaste: "Residential Renovation",
  excavatorNeeded: false,
  bobcatNeeded: false,
  hazardous: false,
  description: "",
  photos: ["sofa.jpg", "fridge.jpg"], // Seeded mockup photos
  date: "2023-10-04", // Oct 4 Selected in calendar mock
  timeWindow: "morning",
  fullName: "Julian Alexander Reed",
  phone: "(555) 000-0000",
  email: "j.reed@example.com",
  accessibilityNotes: "",
  termsAgreed: false,
};

// Seeded unavailable/fully booked days for October 2023
const FULLY_BOOKED_DAYS = [8, 12, 14, 21, 22, 28, 29]; 
const RECOMMENDED_DAYS = [4, 10, 13, 17, 20]; // Highlighted optional recommendation dots if needed

export function BulkyWaste() {
  const [flow, setFlow] = useState<FlowState>("wizard");
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<WizardData>(INITIAL_WIZARD_DATA);
  const [validationError, setValidationError] = useState<string>("");

  const updateFormData = (fields: Partial<WizardData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    setValidationError("");
  };

  const handleNextStep = () => {
    // Perform basic validation before proceeding
    if (step === 1) {
      if (!formData.streetAddress.trim() || !formData.zipCode.trim()) {
        setValidationError("Street Address and Zip Code are required.");
        return;
      }
    } else if (step === 2) {
      if (!formData.category) {
        setValidationError("Please select a waste category.");
        return;
      }
    } else if (step === 3) {
      if (!formData.date || !formData.timeWindow) {
        setValidationError("Please select both a pickup date and a time window.");
        return;
      }
    } else if (step === 4) {
      if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
        setValidationError("Please enter your name, phone number, and email address.");
        return;
      }
    } else if (step === 5) {
      if (!formData.termsAgreed) {
        setValidationError("You must agree to the Terms and Conditions to submit.");
        return;
      }
      setFlow("success");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBackStep = () => {
    setValidationError("");
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleOpenMap = () => setFlow("tracking");
  const handleBackToDashboard = () => {
    setStep(1);
    setFormData(INITIAL_WIZARD_DATA);
    setFlow("wizard");
  };

  return (
    <div className="w-full">
      {flow === "wizard" && (
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header & Description */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Typography variant="h4" color="blue-gray" className="font-extrabold text-2xl tracking-tight">
                {step === 5 ? "Review your Request" : step === 3 ? "Bulky Waste Request" : "New Bulky Waste Pickup"}
              </Typography>
              <Typography className="text-sm font-semibold text-gray-500 mt-1">
                {step === 5 
                  ? "Please confirm the details below before submitting your bulky waste pickup request." 
                  : "Please provide the location and details for your municipal service request."
                }
              </Typography>
            </div>
            <div className="text-xs font-bold text-gray-500 sm:text-right">
              Step {step} of 5
            </div>
          </div>

          {/* Stepper Navigation */}
          <div className="w-full bg-[#e6e9ef] p-4 rounded-2xl shadow-[4px_4px_10px_#c4c7cc,-4px_-4px_10px_#ffffff] flex items-center justify-between gap-2 overflow-x-auto">
            {[
              { num: 1, label: "Location" },
              { num: 2, label: "Waste Details" },
              { num: 3, label: "Schedule" },
              { num: 4, label: "Contact" },
              { num: 5, label: "Review" },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center gap-2 shrink-0">
                {/* Step Circle */}
                <div 
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    step > s.num 
                      ? "bg-[#1a5c2e] text-white shadow-md" 
                      : step === s.num 
                      ? "bg-white border-2 border-[#1a5c2e] text-[#1a5c2e] font-extrabold scale-105 shadow" 
                      : "bg-white border border-gray-300 text-gray-400"
                  }`}
                >
                  {step > s.num ? (
                    <CheckIcon className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    s.num
                  )}
                </div>
                {/* Step Label */}
                <span className={`text-xs font-bold transition-colors ${step === s.num ? "text-[#1a5c2e]" : "text-gray-500"}`}>
                  {s.label}
                </span>
                {/* Connecting Line */}
                {idx < 4 && (
                  <div className="w-8 sm:w-16 h-0.5 bg-gray-300 mx-2" />
                )}
              </div>
            ))}
          </div>

          {/* Validation Error Alert */}
          {validationError && (
            <Alert color="red" className="rounded-xl font-bold flex items-center gap-2 text-sm border-l-4 border-red-500 py-3 bg-[#ffd9d9] text-red-700 shadow-sm">
              <InformationCircleIcon className="w-5 h-5 shrink-0" />
              {validationError}
            </Alert>
          )}

          {/* Step Form Rendering */}
          <div className="min-h-[480px]">
            {step === 1 && <LocationStep data={formData} update={updateFormData} />}
            {step === 2 && <WasteDetailsStep data={formData} update={updateFormData} />}
            {step === 3 && <ScheduleStep data={formData} update={updateFormData} />}
            {step === 4 && <ContactStep data={formData} update={updateFormData} />}
            {step === 5 && <ReviewStep data={formData} update={updateFormData} />}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-300/40">
            {step > 1 ? (
              <button 
                onClick={handleBackStep}
                className="px-8 py-3 rounded-xl font-bold text-sm text-gray-700 bg-[#e6e9ef] shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] hover:shadow-[inset_2px_2px_5px_#c4c7cc,inset_-2px_-2px_5px_#ffffff] transition-shadow duration-300"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button 
              onClick={handleNextStep}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl text-white font-extrabold text-sm transition-all shadow-[4px_4px_10px_rgba(26,92,46,0.3),-4px_-4px_10px_#ffffff] ${
                step === 5 
                  ? "bg-[#1a5c2e] hover:bg-[#155025]" 
                  : "bg-[#1a5c2e] hover:bg-[#155025]"
              }`}
            >
              {step === 5 ? "Submit Request" : "Next Step"}
              <ArrowRightIcon className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

      {flow === "success" && (
        <RequestSuccess onBack={handleBackToDashboard} onTrack={handleOpenMap} data={formData} />
      )}

      {flow === "tracking" && (
        <LiveTracking onBack={handleBackToDashboard} />
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   STEP 1: LOCATION
   ────────────────────────────────────────────────────────────────────────── */
function LocationStep({ data, update }: { data: WizardData; update: (fields: Partial<WizardData>) => void }) {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleUseCurrentLocation = (e: React.MouseEvent) => {
    e.preventDefault();
    update({
      streetAddress: "128 Maplewood Ave, Suite A",
      zipCode: "10001",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
      {/* Left panel: Address fields */}
      <div className="p-6 rounded-3xl bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] flex flex-col justify-between gap-6">
        <div className="space-y-5">
          <Typography variant="h5" color="blue-gray" className="font-bold text-lg mb-2">
            Step 1: Address & Pickup Point
          </Typography>
          
          <div>
            <Typography className="text-xs font-bold text-gray-700 mb-2">Search Address</Typography>
            <div className="relative">
              <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter street address..."
                value={data.addressSearch}
                onChange={(e) => update({ addressSearch: e.target.value })}
                className="w-full pl-11 pr-4 py-3 rounded-xl text-sm bg-[#e6e9ef] shadow-[inset_3px_3px_6px_#c4c7cc,inset_-3px_-3px_6px_#ffffff] border-none outline-none focus:ring-2 focus:ring-[#1a5c2e]/30 text-gray-700 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-gray-500">Street Address</span>
            <button 
              onClick={handleUseCurrentLocation}
              className="text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              Use current location
            </button>
          </div>
          
          <input
            type="text"
            placeholder="e.g. 123 Metro Ave"
            value={data.streetAddress}
            onChange={(e) => update({ streetAddress: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl text-sm bg-[#e6e9ef] shadow-[inset_3px_3px_6px_#c4c7cc,inset_-3px_-3px_6px_#ffffff] border-none outline-none focus:ring-2 focus:ring-[#1a5c2e]/30 text-gray-700 font-semibold"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Typography className="text-xs font-bold text-gray-700 mb-2">Apartment/Unit</Typography>
              <input
                type="text"
                placeholder="Apt 4B"
                value={data.apartmentUnit}
                onChange={(e) => update({ apartmentUnit: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl text-sm bg-[#e6e9ef] shadow-[inset_3px_3px_6px_#c4c7cc,inset_-3px_-3px_6px_#ffffff] border-none outline-none focus:ring-2 focus:ring-[#1a5c2e]/30 text-gray-700 font-semibold"
              />
            </div>
            <div>
              <Typography className="text-xs font-bold text-gray-700 mb-2">Zip Code</Typography>
              <input
                type="text"
                placeholder="10001"
                value={data.zipCode}
                onChange={(e) => update({ zipCode: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl text-sm bg-[#e6e9ef] shadow-[inset_3px_3px_6px_#c4c7cc,inset_-3px_-3px_6px_#ffffff] border-none outline-none focus:ring-2 focus:ring-[#1a5c2e]/30 text-gray-700 font-semibold"
              />
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-[#eef3ee] border border-green-200/50 shadow-sm mt-4">
          <InformationCircleIcon className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
          <Typography className="text-xs font-semibold text-gray-600 leading-relaxed">
            Ensure the pickup point is accessible for heavy vehicles. Obstructed paths may lead to delays.
          </Typography>
        </div>
      </div>

      {/* Right panel: Map preview */}
      <div className="p-6 rounded-3xl bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] flex flex-col gap-4 min-h-[350px]">
        <div className="flex items-center justify-between">
          <Typography className="font-bold text-sm text-gray-800 flex items-center gap-1.5">
            <MapPinIcon className="w-4 h-4 text-[#1a5c2e]" />
            Map Preview
          </Typography>
          <span className="text-[11px] font-bold text-gray-400">GPS Target Verified</span>
        </div>

        {/* Outer Isometric City Map Simulation */}
        <div className="flex-1 relative rounded-2xl overflow-hidden border border-white/50 bg-[#cce0d0] shadow-inner select-none">
          {/* Decorative radial grid to look like a map grid */}
          <div 
            className="absolute inset-0 opacity-20 transition-all duration-300"
            style={{ 
              backgroundImage: "radial-gradient(#1a5c2e 1.5px, transparent 1.5px)", 
              backgroundSize: "28px 28px",
              transform: `scale(${1 + (zoomLevel - 1) * 0.15})`
            }}
          />

          {/* Mock Roads */}
          <div 
            className="absolute inset-0 transition-transform duration-300" 
            style={{ transform: `scale(${1 + (zoomLevel - 1) * 0.15})` }}
          >
            <div className="absolute top-1/3 left-0 w-full h-8 bg-[#8fba97]/60 -rotate-12 transform origin-center"></div>
            <div className="absolute top-0 left-2/3 w-8 h-full bg-[#8fba97]/60 rotate-45 transform origin-center"></div>
            
            {/* Green Zone Indicator */}
            <div className="absolute top-[40%] left-[30%] w-32 h-20 rounded-full bg-[#4ade80]/15 border border-[#1a5c2e]/25 flex items-center justify-center">
              <span className="text-[9px] font-bold text-[#1a5c2e] uppercase tracking-wider bg-white/95 px-2 py-0.5 rounded shadow-sm">
                Pickup Zone #4
              </span>
            </div>
            
            {/* Target Pin Marker */}
            <div className="absolute top-[52%] left-[45%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#1a5c2e]/30 flex items-center justify-center animate-ping absolute -inset-2"></div>
              <div className="w-10 h-10 rounded-full bg-[#1a5c2e] border-2 border-white shadow-[0_4px_10px_rgba(0,0,0,0.2)] flex items-center justify-center text-white z-10">
                <MapPinIcon className="w-5 h-5 fill-white stroke-[#1a5c2e]" />
              </div>
            </div>
          </div>

          {/* Map controls bottom right overlay */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button 
              onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.2))}
              className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur shadow-[2px_2px_6px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95 transition-all font-bold text-lg"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setZoomLevel(prev => Math.max(0.6, prev - 0.2))}
              className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur shadow-[2px_2px_6px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-700 hover:bg-gray-50 active:scale-95 transition-all font-bold text-lg"
            >
              <MinusIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-[#1a5c2e] text-white text-[9px] font-bold tracking-widest uppercase">
            Route active Tue/Fri
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   STEP 2: WASTE DETAILS
   ────────────────────────────────────────────────────────────────────────── */
function WasteDetailsStep({ data, update }: { data: WizardData; update: (fields: Partial<WizardData>) => void }) {
  const CATEGORIES = [
    { name: "Household Bulky", icon: HomeIcon },
    { name: "Tree Cutting", icon: ScissorsIcon },
    { name: "Garden Waste", icon: EllipsisHorizontalIcon },
    { name: "Construction & Demolition", icon: WrenchScrewdriverIcon },
    { name: "Electronic Waste", icon: TvIcon },
    { name: "Other", icon: Squares2X2Icon },
  ];

  const MATERIALS = ["Concrete", "Bricks", "Tiles", "Sand", "Soil", "Steel", "Wood", "Glass", "Roofing", "Mixed"];

  const toggleMaterial = (m: string) => {
    if (data.materials.includes(m)) {
      update({ materials: data.materials.filter((item) => item !== m) });
    } else {
      update({ materials: [...data.materials, m] });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
      {/* Left panel: category, materials, details */}
      <div className="p-6 rounded-3xl bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] space-y-6">
        <div>
          <Typography className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-1">Waste Category</Typography>
          <Typography className="text-xs font-medium text-gray-500 mb-3">Select the primary category of your pickup request.</Typography>
          
          <div className="grid grid-cols-3 gap-3">
            {CATEGORIES.map((cat) => {
              const isSelected = data.category === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => update({ category: cat.name })}
                  className={`relative p-3.5 rounded-xl border flex flex-col items-center text-center gap-2 justify-center min-h-[92px] transition-all duration-200 ${
                    isSelected 
                      ? "bg-white border-[#1a5c2e] shadow-[4px_4px_10px_#c4c7cc,-4px_-4px_10px_#ffffff]" 
                      : "bg-[#e6e9ef] border-transparent hover:bg-gray-100"
                  }`}
                >
                  <cat.icon className={`w-5 h-5 ${isSelected ? "text-[#1a5c2e]" : "text-gray-500"}`} />
                  <span className={`text-[10px] font-bold leading-tight ${isSelected ? "text-gray-800" : "text-gray-600"}`}>
                    {cat.name}
                  </span>
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-[#1a5c2e] text-white flex items-center justify-center">
                      <CheckIcon className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <Typography className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-1">Material Types</Typography>
          <Typography className="text-xs font-medium text-gray-500 mb-3">Select all that apply for the chosen category.</Typography>
          
          <div className="flex flex-wrap gap-2">
            {MATERIALS.map((m) => {
              const isSelected = data.materials.includes(m);
              return (
                <button
                  key={m}
                  onClick={() => toggleMaterial(m)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    isSelected 
                      ? "bg-[#c5eacc] text-[#1a5c2e] border-[#1a5c2e]" 
                      : "bg-[#e6e9ef] border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Typography className="text-xs font-bold text-gray-700 mb-1.5">Estimated Quantity</Typography>
            <select
              value={data.quantity}
              onChange={(e) => update({ quantity: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl text-xs bg-[#e6e9ef] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] border-none outline-none text-gray-700 font-bold"
            >
              <option>1-5 Cubic Yards (Small Pile)</option>
              <option>5-10 Cubic Yards (Medium Pile)</option>
              <option>10+ Cubic Yards (Large Pile)</option>
            </select>
          </div>
          <div>
            <Typography className="text-xs font-bold text-gray-700 mb-1.5">Estimated Weight</Typography>
            <select
              value={data.weight}
              onChange={(e) => update({ weight: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl text-xs bg-[#e6e9ef] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] border-none outline-none text-gray-700 font-bold"
            >
              <option>500 - 2000 lbs</option>
              <option>2000 - 5000 lbs</option>
              <option>5000+ lbs</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Typography className="text-xs font-bold text-gray-700 mb-1.5">Source of Waste</Typography>
            <select
              value={data.sourceOfWaste}
              onChange={(e) => update({ sourceOfWaste: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl text-xs bg-[#e6e9ef] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] border-none outline-none text-gray-700 font-bold"
            >
              <option>Residential Renovation</option>
              <option>Landscaping Maintenance</option>
              <option>Commercial Cleanout</option>
              <option>Household Cleanout</option>
            </select>
          </div>
          <div className="flex flex-col justify-end gap-2 pb-1 text-xs font-bold">
            <Typography className="text-xs font-bold text-gray-700">Heavy Equipment Required</Typography>
            <div className="flex gap-4">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.excavatorNeeded}
                  onChange={(e) => update({ excavatorNeeded: e.target.checked })}
                  className="rounded text-[#1a5c2e] focus:ring-[#1a5c2e]/30 border-gray-400"
                />
                <span className="text-gray-600 text-[11px]">Excavator</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.bobcatNeeded}
                  onChange={(e) => update({ bobcatNeeded: e.target.checked })}
                  className="rounded text-[#1a5c2e] focus:ring-[#1a5c2e]/30 border-gray-400"
                />
                <span className="text-gray-600 text-[11px]">Loader/Bobcat</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel: hazardous toggle, description, photo upload */}
      <div className="p-6 rounded-3xl bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] flex flex-col justify-between gap-5">
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white/50 border border-white/50 flex flex-col gap-3 shadow-inner">
            <div className="flex items-center justify-between">
              <div>
                <Typography className="text-sm font-bold text-gray-800">Hazardous Materials</Typography>
                <Typography className="text-[10px] text-gray-500 font-semibold">e.g., Asbestos, Lead paint, Chemical drums</Typography>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={data.hazardous}
                  onChange={(e) => update({ hazardous: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1a5c2e]"></div>
              </label>
            </div>

            {data.hazardous && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200/50 flex items-start gap-2.5 text-xs text-red-800 leading-normal animate-fadeIn">
                <InformationCircleIcon className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
                <div>
                  <Typography className="font-extrabold text-red-700 mb-0.5">Hazardous Material Warning</Typography>
                  If your load contains hazardous materials, special handling fees apply and certification may be required prior to pickup.
                </div>
              </div>
            )}
          </div>

          <div>
            <Typography className="text-xs font-bold text-gray-700 mb-2">Waste Description</Typography>
            <textarea
              rows={4}
              placeholder="e.g., The waste is located behind the detached garage. Driveway is steep."
              value={data.description}
              onChange={(e) => update({ description: e.target.value })}
              className="w-full p-4 rounded-xl text-xs bg-[#e6e9ef] shadow-[inset_3px_3px_6px_#c4c7cc,inset_-3px_-3px_6px_#ffffff] border-none outline-none focus:ring-2 focus:ring-[#1a5c2e]/30 text-gray-700 font-semibold resize-none"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Typography className="text-xs font-bold text-gray-700">Upload Photos</Typography>
            <span className="text-[10px] text-gray-400 font-medium">Optional</span>
          </div>
          
          <div className="p-5 rounded-2xl border-2 border-dashed border-gray-400 bg-white/40 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/60 transition-all select-none">
            <CloudArrowUpIcon className="w-7 h-7 text-[#1a5c2e] mb-2" />
            <Typography className="text-xs font-extrabold text-gray-700">Drag & drop photos here</Typography>
            <Typography className="text-[10px] text-gray-400 font-bold mt-0.5">or click to browse</Typography>
          </div>

          <div className="flex gap-3 mt-4">
            <div className="w-16 h-16 rounded-xl bg-gray-200 border border-gray-300 shadow-sm flex items-center justify-center overflow-hidden relative">
              <span className="text-[9px] font-bold text-gray-400">Sofa.jpg</span>
              <div className="absolute top-1 right-1 w-4 h-4 bg-black/60 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-black">
                <XMarkIcon className="w-2.5 h-2.5" />
              </div>
            </div>
            <div className="w-16 h-16 rounded-xl bg-gray-200 border border-gray-300 shadow-sm flex items-center justify-center overflow-hidden relative">
              <span className="text-[9px] font-bold text-gray-400">Fridge.jpg</span>
              <div className="absolute top-1 right-1 w-4 h-4 bg-black/60 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-black">
                <XMarkIcon className="w-2.5 h-2.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   STEP 3: SCHEDULING
   ────────────────────────────────────────────────────────────────────────── */
function ScheduleStep({ data, update }: { data: WizardData; update: (fields: Partial<WizardData>) => void }) {
  // Simple calendar generator for October 2023
  // Starts on Sunday (October 1, 2023 is Sunday)
  const currentMonthYear = "October 2023";
  const startDayOffset = 0; // Oct 1, 2023 is Sunday
  const totalDays = 31;
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

  // Month days mapping
  const emptyBlocks = Array.from({ length: startDayOffset }, () => null);
  const calendarCells = [...emptyBlocks, ...daysArray];

  const handleSelectDay = (dayNum: number) => {
    if (FULLY_BOOKED_DAYS.includes(dayNum)) return; // fully booked day
    const formattedDate = `2023-10-${dayNum < 10 ? "0" + dayNum : dayNum}`;
    update({ date: formattedDate });
  };

  const getSelectedDayNum = () => {
    if (!data.date) return null;
    const parts = data.date.split("-");
    if (parts.length === 3 && parts[1] === "10") {
      return parseInt(parts[2], 10);
    }
    return null;
  };

  const selectedDay = getSelectedDayNum();

  // Helper for displaying day of week
  const getSelectedDateSummary = () => {
    if (!data.date) return { dateStr: "No date selected", weekdayStr: "" };
    const dateObj = new Date(2023, 9, selectedDay || 1); // 9 = October in JS Date
    const weekdayStr = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    const dateStr = dateObj.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    return { dateStr, weekdayStr };
  };

  const summary = getSelectedDateSummary();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
      {/* Left panel: Calendar widget */}
      <div className="p-6 rounded-3xl bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] flex flex-col justify-between gap-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <Typography className="font-extrabold text-lg text-gray-800">{currentMonthYear}</Typography>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-lg bg-white/90 shadow flex items-center justify-center hover:bg-gray-50 text-gray-500">
                &lt;
              </button>
              <button className="w-8 h-8 rounded-lg bg-white/90 shadow flex items-center justify-center hover:bg-gray-50 text-gray-500">
                &gt;
              </button>
            </div>
          </div>

          {/* Days labels */}
          <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold text-gray-400 mb-2">
            <div>SUN</div>
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2.5 text-center">
            {/* Pad offset if any */}
            {calendarCells.map((day, idx) => {
              if (day === null) return <div key={`empty-${idx}`} />;
              
              const isSelected = selectedDay === day;
              const isBooked = FULLY_BOOKED_DAYS.includes(day);

              return (
                <button
                  key={`day-${day}`}
                  onClick={() => handleSelectDay(day)}
                  disabled={isBooked}
                  className={`w-full aspect-square rounded-xl font-extrabold text-xs flex flex-col items-center justify-center relative transition-all duration-200 select-none ${
                    isBooked
                      ? "bg-[#ffd9d9] text-red-500 cursor-not-allowed border border-red-200/20"
                      : isSelected
                      ? "bg-[#1a5c2e] text-white shadow-[0_4px_10px_rgba(26,92,46,0.3)] scale-105"
                      : "bg-[#e6e9ef] hover:bg-gray-200 text-gray-700 active:scale-95"
                  }`}
                >
                  <span>{day}</span>
                  {/* Subtle recommended dot if applicable */}
                  {!isSelected && !isBooked && RECOMMENDED_DAYS.includes(day) && (
                    <div className="w-1 h-1 rounded-full bg-[#1a5c2e] absolute bottom-1.5"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-5 border-t border-gray-300/40 pt-4 text-xs font-bold">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-[#1a5c2e]" />
            <span className="text-gray-600">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-[#ffd9d9] border border-red-200/20" />
            <span className="text-gray-600">Fully Booked</span>
          </div>
        </div>
      </div>

      {/* Right panel: Time windows & Summary */}
      <div className="p-6 rounded-3xl bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] flex flex-col justify-between gap-6">
        <div className="space-y-4">
          <Typography className="text-xs font-bold text-gray-800 uppercase tracking-widest">Select Window</Typography>
          
          <div className="space-y-3">
            {/* Morning */}
            <button
              onClick={() => update({ timeWindow: "morning" })}
              className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all duration-200 ${
                data.timeWindow === "morning"
                  ? "bg-white border-[#1a5c2e] shadow-[4px_4px_10px_#c4c7cc,-4px_-4px_10px_#ffffff]"
                  : "bg-[#e6e9ef] border-transparent hover:bg-gray-100"
              }`}
            >
              <div className="text-left">
                <Typography className={`text-sm font-bold ${data.timeWindow === "morning" ? "text-[#1a5c2e]" : "text-gray-700"}`}>
                  Morning Window
                </Typography>
                <Typography className="text-[10px] text-gray-400 font-bold mt-0.5">08:00 AM — 12:00 PM</Typography>
              </div>
              {data.timeWindow === "morning" && (
                <div className="w-5 h-5 rounded-full bg-[#1a5c2e] text-white flex items-center justify-center">
                  <CheckIcon className="w-3.5 h-3.5 stroke-[3.5]" />
                </div>
              )}
            </button>

            {/* Afternoon */}
            <button
              onClick={() => update({ timeWindow: "afternoon" })}
              className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all duration-200 ${
                data.timeWindow === "afternoon"
                  ? "bg-white border-[#1a5c2e] shadow-[4px_4px_10px_#c4c7cc,-4px_-4px_10px_#ffffff]"
                  : "bg-[#e6e9ef] border-transparent hover:bg-gray-100"
              }`}
            >
              <div className="text-left">
                <Typography className={`text-sm font-bold ${data.timeWindow === "afternoon" ? "text-[#1a5c2e]" : "text-gray-700"}`}>
                  Afternoon Window
                </Typography>
                <Typography className="text-[10px] text-gray-400 font-bold mt-0.5">12:00 PM — 04:00 PM</Typography>
              </div>
              {data.timeWindow === "afternoon" && (
                <div className="w-5 h-5 rounded-full bg-[#1a5c2e] text-white flex items-center justify-center">
                  <CheckIcon className="w-3.5 h-3.5 stroke-[3.5]" />
                </div>
              )}
            </button>

            {/* Evening (Booked/Disabled) */}
            <button
              disabled
              className="w-full p-4 rounded-xl border border-transparent bg-gray-200/50 cursor-not-allowed flex items-center justify-between opacity-60"
            >
              <div className="text-left">
                <Typography className="text-sm font-bold text-gray-500">
                  Evening Window
                </Typography>
                <Typography className="text-[10px] text-gray-400 font-bold mt-0.5">Fully Booked</Typography>
              </div>
              <div className="w-5 h-5 rounded-full border border-red-300 text-red-500 flex items-center justify-center bg-white">
                <XMarkIcon className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </button>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/40 border border-white/50 space-y-4">
          <Typography className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pickup Summary</Typography>
          <div className="space-y-4 font-semibold text-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 border border-gray-100">
                <CalendarDaysIcon className="w-5 h-5 text-[#1a5c2e]" />
              </div>
              <div>
                <Typography className="text-[10px] font-bold text-gray-400 uppercase leading-none">Date</Typography>
                <Typography className="text-sm font-extrabold text-gray-800 mt-1">
                  {summary.weekdayStr ? `${summary.weekdayStr}, ${summary.dateStr.split(",")[0]}` : "Select a date"}
                </Typography>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 border border-gray-100">
                <ClockIcon className="w-5 h-5 text-[#1a5c2e]" />
              </div>
              <div>
                <Typography className="text-[10px] font-bold text-gray-400 uppercase leading-none">Window</Typography>
                <Typography className="text-sm font-extrabold text-gray-800 mt-1 capitalize">
                  {data.timeWindow === "morning" ? "08:00 AM — 12:00 PM" : "12:00 PM — 04:00 PM"}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   STEP 4: CONTACT
   ────────────────────────────────────────────────────────────────────────── */
function ContactStep({ data, update }: { data: WizardData; update: (fields: Partial<WizardData>) => void }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
      {/* Left panel: Info entry */}
      <div className="p-6 rounded-3xl bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <UserIcon className="w-5 h-5 text-[#1a5c2e]" />
          <Typography variant="h5" color="blue-gray" className="font-bold text-lg">Contact Information</Typography>
        </div>
        
        <div>
          <Typography className="text-xs font-bold text-gray-700 mb-2">Full Name</Typography>
          <input
            type="text"
            placeholder="e.g. John Doe"
            value={data.fullName}
            onChange={(e) => update({ fullName: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl text-sm bg-[#e6e9ef] shadow-[inset_3px_3px_6px_#c4c7cc,inset_-3px_-3px_6px_#ffffff] border-none outline-none focus:ring-2 focus:ring-[#1a5c2e]/30 text-gray-700 font-semibold"
          />
          <span className="text-[10px] text-gray-400 font-bold block mt-1.5 ml-1">Linked to your official resident profile</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Typography className="text-xs font-bold text-gray-700 mb-2">Phone Number</Typography>
            <input
              type="text"
              placeholder="(555) 000-0000"
              value={data.phone}
              onChange={(e) => update({ phone: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl text-sm bg-[#e6e9ef] shadow-[inset_3px_3px_6px_#c4c7cc,inset_-3px_-3px_6px_#ffffff] border-none outline-none focus:ring-2 focus:ring-[#1a5c2e]/30 text-gray-700 font-semibold"
            />
          </div>
          <div>
            <Typography className="text-xs font-bold text-gray-700 mb-2">Email Address</Typography>
            <input
              type="email"
              placeholder="john@example.com"
              value={data.email}
              onChange={(e) => update({ email: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl text-sm bg-[#e6e9ef] shadow-[inset_3px_3px_6px_#c4c7cc,inset_-3px_-3px_6px_#ffffff] border-none outline-none focus:ring-2 focus:ring-[#1a5c2e]/30 text-gray-700 font-semibold"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <DocumentTextIcon className="w-4 h-4 text-gray-500" />
            <Typography className="text-xs font-bold text-gray-700">Accessibility & Access</Typography>
          </div>
          <Typography className="text-[10px] font-medium text-gray-500 mb-2">Accessibility Notes: 'Are there any gates, dogs, or obstacles?'</Typography>
          <textarea
            rows={4}
            placeholder="e.g., Gate is heavy, please don't block the driveway, beware of friendly dog in side yard..."
            value={data.accessibilityNotes}
            onChange={(e) => update({ accessibilityNotes: e.target.value })}
            className="w-full p-4 rounded-xl text-xs bg-[#e6e9ef] shadow-[inset_3px_3px_6px_#c4c7cc,inset_-3px_-3px_6px_#ffffff] border-none outline-none focus:ring-2 focus:ring-[#1a5c2e]/30 text-gray-700 font-semibold resize-none"
          />
        </div>
      </div>

      {/* Right panel: Request Summary */}
      <div className="p-8 rounded-3xl bg-[#0e5c2f] shadow-[8px_8px_16px_rgba(14,92,47,0.35),-8px_-8px_16px_#ffffff] text-white flex flex-col justify-between gap-8 relative overflow-hidden">
        {/* Subtle decorative grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        
        <div className="space-y-6 relative z-10">
          <Typography variant="h5" color="white" className="font-extrabold text-xl border-b border-white/20 pb-4">
            Request Summary
          </Typography>

          <div className="space-y-4">
            {/* Item counts */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <CheckIcon className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <Typography className="text-sm font-semibold text-gray-100">
                {data.materials.length} Items Scheduled ({data.materials.join(", ")})
              </Typography>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <CheckIcon className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <Typography className="text-sm font-semibold text-gray-100">
                Location: {data.streetAddress || "Not entered yet"}
              </Typography>
            </div>

            {/* Date */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                <CheckIcon className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <Typography className="text-sm font-semibold text-gray-100">
                Date: {data.date ? new Date(2023, 9, parseInt(data.date.split("-")[2], 10)).toLocaleDateString("en-US", { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }) : "Not selected yet"}
              </Typography>
            </div>
          </div>
        </div>

        <Typography className="text-xs font-semibold text-green-100/70 italic relative z-10 leading-relaxed border-t border-white/10 pt-4">
          "Our crew will reach out via your preferred contact method 1 hour before arrival."
        </Typography>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   STEP 5: REVIEW
   ────────────────────────────────────────────────────────────────────────── */
function ReviewStep({ data, update }: { data: WizardData; update: (fields: Partial<WizardData>) => void }) {
  const getSelectedDayNum = () => {
    if (!data.date) return 1;
    return parseInt(data.date.split("-")[2], 10);
  };
  
  const dateObj = new Date(2023, 9, getSelectedDayNum());
  const dateFormatted = dateObj.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" });
  const timeFormatted = data.timeWindow === "morning" ? "Morning Window (8:00 AM - 12:00 PM)" : "Afternoon Window (12:00 PM - 4:00 PM)";

  return (
    <div className="space-y-6">
      {/* 2x2 review cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Location Review */}
        <Card className="bg-[#e6e9ef] shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] border-none rounded-2xl">
          <CardBody className="p-5 flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
              <MapPinIcon className="w-5 h-5 text-[#1a5c2e]" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <Typography className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pickup Location</Typography>
                <button className="text-xs text-[#1a5c2e] font-extrabold hover:underline">Edit</button>
              </div>
              <Typography className="text-xs font-bold text-gray-700 leading-normal">
                {data.streetAddress ? `${data.streetAddress}, ${data.apartmentUnit ? data.apartmentUnit + ', ' : ''}Zip ${data.zipCode}` : "No address specified"}
              </Typography>
              
              {/* Tiny Mock map thumbnail */}
              <div className="h-16 w-full rounded-lg bg-[#b4d6bc]/50 border border-white mt-2 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#1a5c2e 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#1a5c2e]/30 flex items-center justify-center animate-ping"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#1a5c2e] border border-white"></div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Waste Details Review */}
        <Card className="bg-[#e6e9ef] shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] border-none rounded-2xl">
          <CardBody className="p-5 flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
              <WrenchScrewdriverIcon className="w-5 h-5 text-[#1a5c2e]" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <Typography className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Waste Details</Typography>
                <button className="text-xs text-[#1a5c2e] font-extrabold hover:underline">Edit</button>
              </div>
              
              <div className="text-xs font-bold text-gray-700 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Category:</span>
                  <span>{data.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Materials:</span>
                  <span className="text-right max-w-[200px] truncate">{data.materials.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Quantity:</span>
                  <span>{data.quantity.split(" ")[0]} unit</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Pickup Schedule Review */}
        <Card className="bg-[#e6e9ef] shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] border-none rounded-2xl">
          <CardBody className="p-5 flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
              <CalendarDaysIcon className="w-5 h-5 text-[#1a5c2e]" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <Typography className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pickup Schedule</Typography>
                <button className="text-xs text-[#1a5c2e] font-extrabold hover:underline">Edit</button>
              </div>
              
              <div className="text-xs font-bold text-gray-700 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Scheduled Date:</span>
                  <span>{dateFormatted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Window:</span>
                  <span>{timeFormatted}</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Contact Review */}
        <Card className="bg-[#e6e9ef] shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] border-none rounded-2xl">
          <CardBody className="p-5 flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
              <UserIcon className="w-5 h-5 text-[#1a5c2e]" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <Typography className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contact Information</Typography>
                <button className="text-xs text-[#1a5c2e] font-extrabold hover:underline">Edit</button>
              </div>
              
              <div className="text-xs font-bold text-gray-700 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Full Name:</span>
                  <span>{data.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone:</span>
                  <span>{data.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span className="max-w-[180px] truncate">{data.email}</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Pricing / T&C container */}
      <div className="p-6 rounded-3xl bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white/50 border border-white shadow-inner">
          <div>
            <Typography className="text-xs font-extrabold text-[#1a5c2e] uppercase tracking-wider mb-0.5">Final Summary</Typography>
            <Typography className="text-xs font-semibold text-gray-500">Review the estimated fee and legal declarations below.</Typography>
          </div>
          <div className="text-center sm:text-right">
            <Typography className="text-[9px] font-bold text-gray-400 uppercase tracking-wider leading-none">Estimated Total Fee</Typography>
            <Typography className="text-3xl font-black text-[#1a5c2e] mt-1.5">Rs 12000.00</Typography>
            <Typography className="text-[10px] font-semibold text-gray-500 mt-1.5">Billed to your next utility statement</Typography>
          </div>
        </div>

        {/* T&C checkbox */}
        <label className="flex items-start gap-3 p-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={data.termsAgreed}
            onChange={(e) => update({ termsAgreed: e.target.checked })}
            className="rounded text-[#1a5c2e] focus:ring-[#1a5c2e]/30 border-gray-400 shrink-0 mt-1"
          />
          <div className="text-xs font-semibold text-gray-600 leading-normal">
            I agree to the <span className="text-blue-600 font-bold hover:underline cursor-pointer">Terms and Conditions</span> and confirm that the items listed follow the municipal safety guidelines for bulky waste disposal.
            <div className="text-[10px] text-gray-400 font-medium flex items-center gap-1.5 mt-2">
              <svg className="w-3.5 h-3.5 text-[#1a5c2e]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.9L10 .954 17.834 4.9A1 1 0 0118.5 5.8v4.92c0 4.195-2.613 7.977-6.527 9.53a1 1 0 01-.74 0c-3.914-1.553-6.527-5.335-6.527-9.53V5.8a1 1 0 01.666-.9zM10 2.25L3.5 5.5v4.22c0 3.398 2.052 6.47 5.253 7.732a1 1 0 00.74 0c3.2-1.262 5.253-4.334 5.253-7.732V5.5L10 2.25zM10 7a1 1 0 011 1v3a1 1 0 11-2 0V8a1 1 0 011-1zm0 7a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" clipRule="evenodd"/>
              </svg>
              Your data is handled according to our <span className="text-blue-600 hover:underline cursor-pointer font-bold">Privacy Policy</span>.
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   STATE B: REQUEST SUCCESS
   ────────────────────────────────────────────────────────────────────────── */
function RequestSuccess({ onBack, onTrack, data }: { onBack: () => void; onTrack: () => void; data: WizardData }) {
  const getSelectedDayNum = () => {
    if (!data.date) return 24;
    return parseInt(data.date.split("-")[2], 10);
  };
  const dateObj = new Date(2023, 9, getSelectedDayNum());
  const dateFormatted = dateObj.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  
  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center pt-8 pb-12">
      <div className="w-20 h-20 rounded-full bg-[#1a5c2e] text-white flex items-center justify-center mb-6 shadow-xl shadow-green-900/10">
        <CheckCircleIcon className="w-10 h-10 stroke-[2.5]" />
      </div>
      
      <Typography className="font-black text-3xl text-[#1a5c2e] text-center mb-3">
        Request Submitted Successfully!
      </Typography>
      <Typography className="text-base font-semibold text-gray-500 text-center mb-10">
        Your waste pickup has been logged and is awaiting dispatch approval.
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {/* Main Details Card */}
        <Card className="md:col-span-2 bg-[#e6e9ef] shadow-[16px_16px_32px_#c4c7cc,-16px_-16px_32px_#ffffff] rounded-3xl border-none">
          <CardBody className="p-6 sm:p-8">
            <div className="flex items-start justify-between mb-8 pb-6 border-b border-gray-300/40">
              <div>
                <Typography className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Request ID</Typography>
                <Typography className="font-extrabold text-2xl text-gray-800">#BW-8829</Typography>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 font-bold text-xs flex items-center gap-1.5 border border-amber-200/50">
                <ClockIcon className="w-4 h-4" />
                Pending Approval
              </div>
            </div>

            <div className="space-y-6 mb-8 pb-6 border-b border-gray-300/40 font-semibold text-sm text-gray-600">
              <div className="flex items-start gap-4">
                <MapPinIcon className="w-6 h-6 text-[#1a5c2e] shrink-0" />
                <div>
                  <Typography className="font-bold text-gray-800 text-sm mb-1">Pickup Address</Typography>
                  {data.streetAddress ? `${data.streetAddress}, ${data.apartmentUnit ? data.apartmentUnit + ', ' : ''}Zip ${data.zipCode}` : "128 Maplewood Ave, Suite A, Zip 10001"}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ClockIcon className="w-6 h-6 text-[#1a5c2e] shrink-0" />
                <div>
                  <Typography className="font-bold text-gray-800 text-sm mb-1">Scheduled Window</Typography>
                  {dateFormatted} • {data.timeWindow === "morning" ? "08:00 AM - 12:00 PM" : "12:00 PM - 04:00 PM"}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <Typography className="font-bold text-gray-800 text-sm mb-4">Waste Summary</Typography>
              <div className="space-y-3.5 text-sm font-semibold text-gray-500">
                <div className="flex justify-between">
                  <span>{data.materials.length} Items Scheduled ({data.materials.join(", ")})</span>
                  <span className="font-bold text-gray-800">Rs 12000.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Logistics Processing Fee</span>
                  <span className="font-bold text-gray-800">Rs 0.00</span>
                </div>
              </div>
            </div>

            <div className="bg-[#f0f9f2] rounded-2xl p-5 flex items-center justify-between mb-6 border border-[#a4d6b0]/30 shadow-inner">
              <Typography className="font-extrabold text-lg text-[#1a5c2e]">Estimated Fee</Typography>
              <Typography className="font-black text-3xl text-[#1a5c2e]">Rs 12000.00</Typography>
            </div>

            <div className="flex items-center gap-2.5 bg-white/50 border border-white p-3.5 rounded-xl">
              <ShieldCheckIcon className="w-5 h-5 text-[#1a5c2e]" />
              <Typography className="text-[10px] font-bold text-[#1a5c2e] uppercase tracking-wider">
                Eco-Compliance Verified • Government Grade Logistics
              </Typography>
            </div>
          </CardBody>
        </Card>

        {/* Right Sidebar (Photos & Actions) */}
        <div className="space-y-4">
          <Card className="bg-[#e6e9ef] rounded-3xl shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] border-none">
            <CardBody className="p-5">
              <div className="flex items-center gap-2 mb-4 text-xs font-bold text-gray-800 uppercase tracking-wider">
                <PhotoIcon className="w-5 h-5 text-gray-500" />
                Verification Photos
              </div>
              <div className="flex gap-3 mb-3">
                <div className="w-20 h-20 rounded-xl bg-gray-200 border border-gray-300 shadow-sm flex items-center justify-center">
                  <span className="text-[10px] font-bold text-gray-400">Sofa.jpg</span>
                </div>
                <div className="w-20 h-20 rounded-xl bg-gray-200 border border-gray-300 shadow-sm flex items-center justify-center">
                  <span className="text-[10px] font-bold text-gray-400">Fridge.jpg</span>
                </div>
              </div>
              <Typography className="text-[11px] font-semibold text-gray-500 italic">2 files uploaded for review.</Typography>
            </CardBody>
          </Card>

          <button onClick={onBack} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#1a5c2e] text-white font-extrabold text-sm shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:bg-[#155025] transition-all">
            <Squares2X2Icon className="w-5 h-5" />
            Back to Dashboard
          </button>
          
          <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-[#1a5c2e] font-extrabold text-sm shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] border border-gray-200 hover:bg-gray-50 transition-all">
            <PencilSquareIcon className="w-5 h-5" />
            Edit Request
          </button>
          
          <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-transparent text-red-500 font-extrabold text-sm hover:bg-red-50 transition-colors">
            <XMarkIcon className="w-5 h-5" />
            Cancel Request
          </button>

          {/* Need Help Card */}
          <div className="bg-[#0073b6] text-white p-5 rounded-3xl shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] mt-6">
            <Typography className="font-extrabold text-sm mb-2">Need help?</Typography>
            <Typography className="text-xs font-semibold text-blue-100 mb-4 leading-relaxed">
              You can open the live tracking map once dispatcher assigns your driver.
            </Typography>
            <button onClick={onTrack} className="text-sm font-extrabold underline hover:text-white transition-colors">
              Open Live Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   STATE C: LIVE TRACKING
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
