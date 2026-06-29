import { Typography, Card, CardBody } from "../../lib/mt-components";
import {
  TrashIcon,
  ArrowPathIcon,
  BeakerIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const WASTE_CATEGORIES = [
  {
    name: "General Waste",
    icon: TrashIcon,
    color: "bg-gray-500",
    bgLight: "bg-[#e6e9ef]",
    description: "Non-recyclable household waste that goes to landfill.",
    items: ["Polythene bags", "Styrofoam", "Diapers", "Sanitary products", "Broken ceramics", "Soiled paper"],
    binColor: "Black bin",
    tips: "Minimise general waste by choosing recyclable alternatives whenever possible.",
  },
  {
    name: "Recyclable Waste",
    icon: ArrowPathIcon,
    color: "bg-[#629955]",
    bgLight: "bg-[#c5eacc]",
    description: "Materials that can be processed and reused.",
    items: ["Paper & cardboard", "Plastic bottles (PET)", "Glass bottles & jars", "Metal cans", "Clean aluminium foil", "Newspapers & magazines"],
    binColor: "Green bin",
    tips: "Rinse containers before placing in the bin. Flatten cardboard boxes to save space.",
  },
  {
    name: "Organic Waste",
    icon: BeakerIcon,
    color: "bg-orange-500",
    bgLight: "bg-[#ffecd2]",
    description: "Biodegradable waste that can be composted.",
    items: ["Fruit & vegetable scraps", "Egg shells", "Tea bags & coffee grounds", "Garden trimmings", "Leaves & flowers", "Cooked food (no oil)"],
    binColor: "Brown bin",
    tips: "Wrap wet organic waste in newspaper before placing in the bin to reduce odour.",
  },
  {
    name: "Hazardous Waste",
    icon: ExclamationTriangleIcon,
    color: "bg-red-500",
    bgLight: "bg-[#ffd9d9]",
    description: "Dangerous items that require special disposal.",
    items: ["Batteries", "Paint & solvents", "Electronic waste", "Fluorescent bulbs", "Expired medicines", "Pesticides & chemicals"],
    binColor: "Red bin (special collection)",
    tips: "Never mix hazardous waste with regular waste. Contact the municipality for special pickup.",
  },
];

export function WasteGuide() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div>
        <Typography variant="h4" color="blue-gray" className="font-bold text-xl">
          Waste Segregation Guide
        </Typography>
        <Typography variant="small" color="gray" className="text-sm mt-1">
          Sort your waste correctly to help build a cleaner, greener community.
        </Typography>
      </div>

      {/* Category Cards */}
      <div className="flex flex-col gap-6">
        {WASTE_CATEGORIES.map((category) => (
          <Card
            key={category.name}
            className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none"
          >
            <CardBody className="p-6">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-12 h-12 rounded-xl ${category.bgLight} flex items-center justify-center shadow-[3px_3px_6px_#c4c7cc,-3px_-3px_6px_#ffffff]`}>
                  <category.icon className="h-6 w-6 text-gray-700" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                    <Typography variant="h6" color="blue-gray" className="font-bold">
                      {category.name}
                    </Typography>
                  </div>
                  <Typography variant="small" color="gray" className="text-xs">
                    {category.binColor}
                  </Typography>
                </div>
              </div>

              <Typography variant="small" color="gray" className="text-sm mb-4">
                {category.description}
              </Typography>

              {/* Items Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                {category.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#f0f2f5] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff]"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${category.color} shrink-0`}></div>
                    <Typography variant="small" color="blue-gray" className="text-xs font-medium">
                      {item}
                    </Typography>
                  </div>
                ))}
              </div>

              {/* Tip */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#dce8ff]/50 border border-blue-200/30">
                <Typography variant="small" className="text-xs text-blue-700 font-semibold shrink-0">
                  💡 Tip:
                </Typography>
                <Typography variant="small" className="text-xs text-blue-700">
                  {category.tips}
                </Typography>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
