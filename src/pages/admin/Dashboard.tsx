import { Typography, Card, CardBody } from "../../lib/mt-components";
import {
  UserIcon,
  ExclamationTriangleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export function Dashboard() {
  const currentDate = "14, june, 2026";

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6">
      {/* Header */}
      <div className="shrink-0">
        <Typography variant="h3" color="blue-gray" className="font-bold text-2xl mb-1">
          System Overview
        </Typography>
        <Typography variant="small" color="gray" className="font-medium text-sm">
          {currentDate}
        </Typography>
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shrink-0">
        {/* Active Users */}
        <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-6">
            <div className="w-12 h-12 rounded-xl bg-[#e6e9ef] flex items-center justify-center mb-4 shadow-[inset_3px_3px_6px_#c4c7cc,inset_-3px_-3px_6px_#ffffff]">
              <UserIcon className="h-6 w-6 text-gray-700" />
            </div>
            <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider mb-1 text-xs">
              Active Users
            </Typography>
            <Typography variant="h3" color="blue-gray" className="font-bold text-3xl">
              14,500
            </Typography>
          </CardBody>
        </Card>

        {/* Urgent Issues */}
        <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-6">
            <div className="w-12 h-12 rounded-xl bg-[#ffd9d9] flex items-center justify-center mb-4 shadow-[3px_3px_6px_#c4c7cc,-3px_-3px_6px_#ffffff]">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
            </div>
            <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider mb-1 text-xs">
              Urgent Issues
            </Typography>
            <Typography variant="h3" color="red" className="font-bold text-3xl">
              20
            </Typography>
          </CardBody>
        </Card>

        {/* Active Staff */}
        <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-6 flex flex-col justify-between h-full">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#c5eacc] flex items-center justify-center mb-4 shadow-[3px_3px_6px_#c4c7cc,-3px_-3px_6px_#ffffff]">
                <UsersIcon className="h-6 w-6 text-[#3d6e32]" />
              </div>
              <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider mb-3 text-xs">
                Active Staff
              </Typography>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 font-medium">Drivers</span>
                  <span className="font-bold text-gray-800">84</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-1.5 shadow-[inset_1px_1px_2px_#c4c7cc]">
                  <div className="bg-[#2c5126] h-1.5 rounded-full shadow-[1px_1px_2px_#c4c7cc]" style={{ width: "80%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 font-medium">Inspectors/Supervisors</span>
                  <span className="font-bold text-gray-800">60</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-1.5 shadow-[inset_1px_1px_2px_#c4c7cc]">
                  <div className="bg-[#8fd89b] h-1.5 rounded-full shadow-[1px_1px_2px_#c4c7cc]" style={{ width: "60%" }}></div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Bottom Cards Grid - flex-1 allows it to fill remaining screen height */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[300px] pb-2">
        {/* Chart */}
        <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none h-full lg:col-span-2">
          <CardBody className="p-6 h-full flex flex-col">
            <Typography variant="h6" color="blue-gray" className="font-semibold mb-6">
              Weekly Collection Volume
            </Typography>
            
            <div className="flex-1 flex items-end relative mt-2 pl-10 pb-5">
              {/* Y Axis Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-5 text-[10px] text-gray-400 z-0">
                 <div className="flex items-center gap-4 w-full h-0 border-t border-gray-300"><span className="absolute -mt-2 -left-2 w-8 text-right bg-[#e6e9ef]">200</span></div>
                 <div className="flex items-center gap-4 w-full h-0 border-t border-gray-300"><span className="absolute -mt-2 -left-2 w-8 text-right bg-[#e6e9ef]">150</span></div>
                 <div className="flex items-center gap-4 w-full h-0 border-t border-gray-300"><span className="absolute -mt-2 -left-2 w-8 text-right bg-[#e6e9ef]">100</span></div>
                 <div className="flex items-center gap-4 w-full h-0 border-t border-gray-300"><span className="absolute -mt-2 -left-2 w-8 text-right bg-[#e6e9ef]">50</span></div>
                 <div className="flex items-center gap-4 w-full h-0 border-t border-gray-400"><span className="absolute -mt-2 -left-2 w-8 text-right bg-[#e6e9ef]">0</span></div>
              </div>

              {/* Bars */}
              <div className="flex-1 flex items-end justify-around h-full z-10 relative">
                {[
                  { label: "Mon", value: 120, max: 200 },
                  { label: "Tue", value: 200, max: 200 },
                  { label: "Wed", value: 150, max: 200 },
                  { label: "Thu", value: 80, max: 200 },
                  { label: "Fri", value: 70, max: 200 },
                  { label: "Sat", value: 110, max: 200 },
                  { label: "Sun", value: 130, max: 200 },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center h-full justify-end group">
                    <div className="w-6 sm:w-8 md:w-12 bg-[#f0f2f5] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] h-full relative rounded-t-lg">
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-[#5ca84b] hover:bg-[#48863b] shadow-[2px_0_4px_#c4c7cc] transition-all duration-300 rounded-t-lg"
                        style={{ height: `${(item.value / item.max) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] text-gray-600 absolute -bottom-5 font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none h-full lg:col-span-1">
          <CardBody className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <Typography variant="h6" color="blue-gray" className="font-semibold text-base">
                Recent activity
              </Typography>
              <button className="text-[11px] font-bold text-[#2c5126] hover:underline uppercase tracking-wide">
                view All
              </button>
            </div>
            <div className="h-px w-full bg-gray-300 mb-4 shadow-[inset_0px_1px_2px_#c4c7cc]"></div>
            
            <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
              No recent activity
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
