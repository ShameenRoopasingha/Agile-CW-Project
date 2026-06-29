import { Typography, Card, CardBody } from "../../lib/mt-components";
import {
  TruckIcon,
  ArchiveBoxIcon,
  BeakerIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

interface ScheduleItem {
  day: string;
  date: string;
  type: string;
  time: string;
  icon: typeof TruckIcon;
  iconBg: string;
  iconColor: string;
  isToday?: boolean;
  isNext?: boolean;
}

const SCHEDULE: ScheduleItem[] = [
  {
    day: "Monday",
    date: "Jun 23",
    type: "General Waste",
    time: "7:00 AM – 9:00 AM",
    icon: TruckIcon,
    iconBg: "bg-[#e6e9ef]",
    iconColor: "text-gray-700",
  },
  {
    day: "Wednesday",
    date: "Jun 25",
    type: "Recyclable Waste",
    time: "7:00 AM – 9:00 AM",
    icon: ArchiveBoxIcon,
    iconBg: "bg-[#c5eacc]",
    iconColor: "text-[#3d6e32]",
    isToday: true,
  },
  {
    day: "Thursday",
    date: "Jun 26",
    type: "General Waste",
    time: "7:00 AM – 9:00 AM",
    icon: TruckIcon,
    iconBg: "bg-[#e6e9ef]",
    iconColor: "text-gray-700",
    isNext: true,
  },
  {
    day: "Saturday",
    date: "Jun 28",
    type: "Organic Waste",
    time: "6:30 AM – 8:30 AM",
    icon: BeakerIcon,
    iconBg: "bg-[#ffecd2]",
    iconColor: "text-orange-600",
  },
  {
    day: "Monday",
    date: "Jun 30",
    type: "General Waste",
    time: "7:00 AM – 9:00 AM",
    icon: TruckIcon,
    iconBg: "bg-[#e6e9ef]",
    iconColor: "text-gray-700",
  },
  {
    day: "Wednesday",
    date: "Jul 2",
    type: "Recyclable Waste",
    time: "7:00 AM – 9:00 AM",
    icon: ArchiveBoxIcon,
    iconBg: "bg-[#c5eacc]",
    iconColor: "text-[#3d6e32]",
  },
];

const WASTE_TYPES = [
  {
    name: "General Waste",
    color: "bg-gray-500",
    description: "Non-recyclable household waste",
    icon: TruckIcon,
  },
  {
    name: "Recyclable",
    color: "bg-[#629955]",
    description: "Paper, plastic, glass, metal",
    icon: ArchiveBoxIcon,
  },
  {
    name: "Organic",
    color: "bg-orange-500",
    description: "Food scraps, garden waste",
    icon: BeakerIcon,
  },
  {
    name: "Hazardous",
    color: "bg-red-500",
    description: "Batteries, chemicals, e-waste",
    icon: CubeIcon,
  },
];

export function CollectionSchedule() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div>
        <Typography variant="h4" color="blue-gray" className="font-bold text-xl">
          Collection Schedule
        </Typography>
        <Typography variant="small" color="gray" className="text-sm">
          Your area: <span className="font-semibold text-gray-700">Colombo Zone A</span>
        </Typography>
      </div>

      {/* Waste Type Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {WASTE_TYPES.map((type) => (
          <div
            key={type.name}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff]"
          >
            <div className={`w-3 h-3 rounded-full ${type.color} shrink-0`}></div>
            <div>
              <Typography variant="small" color="blue-gray" className="font-semibold text-xs">
                {type.name}
              </Typography>
              <Typography variant="small" color="gray" className="text-[10px]">
                {type.description}
              </Typography>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule List */}
      <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
        <CardBody className="p-6">
          <Typography variant="h6" color="blue-gray" className="font-bold mb-5">
            Upcoming Collections
          </Typography>
          <div className="flex flex-col gap-3">
            {SCHEDULE.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                  item.isToday
                    ? "bg-[#c5eacc]/30 shadow-[inset_3px_3px_6px_#b4d4bb,inset_-3px_-3px_6px_#d6ffdd] border border-[#629955]/20"
                    : item.isNext
                    ? "bg-[#f0f2f5] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff]"
                    : "hover:bg-[#dde0e5]"
                }`}
              >
                <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0 shadow-[2px_2px_4px_#c4c7cc,-2px_-2px_4px_#ffffff]`}>
                  <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Typography variant="small" color="blue-gray" className="font-semibold text-sm">
                      {item.type}
                    </Typography>
                    {item.isToday && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#629955] text-white uppercase">
                        Today
                      </span>
                    )}
                    {item.isNext && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-500 text-white uppercase">
                        Next
                      </span>
                    )}
                  </div>
                  <Typography variant="small" color="gray" className="text-xs">
                    {item.time}
                  </Typography>
                </div>
                <div className="text-right shrink-0">
                  <Typography variant="small" color="blue-gray" className="font-semibold text-sm">
                    {item.day}
                  </Typography>
                  <Typography variant="small" color="gray" className="text-xs">
                    {item.date}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
