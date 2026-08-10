import { Typography, Card, CardBody } from "../../lib/mt-components";
import {
  TruckIcon,
  UsersIcon,
  MapPinIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

export function FleetDashboard() {
  const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6">
      {/* Header */}
      <div className="shrink-0">
        <Typography variant="h3" color="blue-gray" className="font-bold text-2xl mb-1">
          Command Center
        </Typography>
        <Typography variant="small" color="gray" className="font-medium text-sm">
          {currentDate}
        </Typography>
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
        {/* Active Fleet */}
        <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-6">
            <div className="w-12 h-12 rounded-xl bg-[#c5eacc] flex items-center justify-center mb-4 shadow-[3px_3px_6px_#c4c7cc,-3px_-3px_6px_#ffffff]">
              <TruckIcon className="h-6 w-6 text-[#3d6e32]" />
            </div>
            <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider mb-1 text-xs">
              Active Fleet
            </Typography>
            <Typography variant="h3" color="blue-gray" className="font-bold text-3xl">
              124
            </Typography>
          </CardBody>
        </Card>

        {/* Drivers On Duty */}
        <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-6">
            <div className="w-12 h-12 rounded-xl bg-[#e6e9ef] flex items-center justify-center mb-4 shadow-[inset_3px_3px_6px_#c4c7cc,inset_-3px_-3px_6px_#ffffff]">
              <UsersIcon className="h-6 w-6 text-gray-700" />
            </div>
            <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider mb-1 text-xs">
              Drivers On Duty
            </Typography>
            <Typography variant="h3" color="blue-gray" className="font-bold text-3xl">
              87
            </Typography>
          </CardBody>
        </Card>

        {/* Active Routes */}
        <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-6">
            <div className="w-12 h-12 rounded-xl bg-[#e6e9ef] flex items-center justify-center mb-4 shadow-[inset_3px_3px_6px_#c4c7cc,inset_-3px_-3px_6px_#ffffff]">
              <MapPinIcon className="h-6 w-6 text-blue-500" />
            </div>
            <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider mb-1 text-xs">
              Active Routes
            </Typography>
            <Typography variant="h3" color="blue-gray" className="font-bold text-3xl">
              98
            </Typography>
          </CardBody>
        </Card>

        {/* In Maintenance */}
        <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-6">
            <div className="w-12 h-12 rounded-xl bg-[#ffd9d9] flex items-center justify-center mb-4 shadow-[3px_3px_6px_#c4c7cc,-3px_-3px_6px_#ffffff]">
              <WrenchScrewdriverIcon className="h-6 w-6 text-red-500" />
            </div>
            <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider mb-1 text-xs">
              In Maintenance
            </Typography>
            <Typography variant="h3" color="red" className="font-bold text-3xl">
              12
            </Typography>
          </CardBody>
        </Card>
      </div>

      {/* Main Content Area Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[300px] pb-2">
        {/* Weekly Activity */}
        <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none h-full lg:col-span-2">
          <CardBody className="p-6 h-full flex flex-col">
            <Typography variant="h6" color="blue-gray" className="font-semibold mb-6">
              Weekly Fleet Activity (Tonnage)
            </Typography>
            
            <div className="flex-1 flex items-end relative mt-2 pl-10 pb-5">
              {/* Y Axis Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-5 text-[10px] text-gray-400 z-0">
                 <div className="flex items-center gap-4 w-full h-0 border-t border-gray-300"><span className="absolute -mt-2 -left-2 w-8 text-right bg-[#e6e9ef]">200t</span></div>
                 <div className="flex items-center gap-4 w-full h-0 border-t border-gray-300"><span className="absolute -mt-2 -left-2 w-8 text-right bg-[#e6e9ef]">150t</span></div>
                 <div className="flex items-center gap-4 w-full h-0 border-t border-gray-300"><span className="absolute -mt-2 -left-2 w-8 text-right bg-[#e6e9ef]">100t</span></div>
                 <div className="flex items-center gap-4 w-full h-0 border-t border-gray-300"><span className="absolute -mt-2 -left-2 w-8 text-right bg-[#e6e9ef]">50t</span></div>
                 <div className="flex items-center gap-4 w-full h-0 border-t border-gray-400"><span className="absolute -mt-2 -left-2 w-8 text-right bg-[#e6e9ef]">0t</span></div>
              </div>

              {/* Bars */}
              <div className="flex-1 flex items-end justify-around h-full z-10 relative">
                {[
                  { label: "Mon", value: 120, max: 200 },
                  { label: "Tue", value: 180, max: 200 },
                  { label: "Wed", value: 150, max: 200 },
                  { label: "Thu", value: 90, max: 200 },
                  { label: "Fri", value: 160, max: 200 },
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

        {/* Alerts & Notifications */}
        <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none h-full lg:col-span-1">
          <CardBody className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <Typography variant="h6" color="blue-gray" className="font-semibold text-base">
                System Alerts
              </Typography>
              <button className="text-[11px] font-bold text-[#2c5126] hover:underline uppercase tracking-wide">
                view All
              </button>
            </div>
            <div className="h-px w-full bg-gray-300 mb-4 shadow-[inset_0px_1px_2px_#c4c7cc]"></div>
            
            <div className="flex flex-col gap-4 overflow-y-auto pr-2">
              <div className="bg-[#f0f2f5] p-3 rounded-xl shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] border-l-4 border-red-500">
                <Typography variant="small" color="blue-gray" className="font-bold text-xs">
                  TRK-405 Engine Warning
                </Typography>
                <Typography className="text-xs text-gray-600 mt-1">
                  Immediate maintenance required. Vehicle returned to depot.
                </Typography>
                <Typography className="text-[10px] text-gray-400 mt-2 font-bold">10 MINS AGO</Typography>
              </div>

              <div className="bg-[#f0f2f5] p-3 rounded-xl shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] border-l-4 border-amber-500">
                <Typography variant="small" color="blue-gray" className="font-bold text-xs">
                  Route B114-T Delayed
                </Typography>
                <Typography className="text-xs text-gray-600 mt-1">
                  Heavy traffic reported in sector 4. Expected delay: 25 mins.
                </Typography>
                <Typography className="text-[10px] text-gray-400 mt-2 font-bold">1 HOUR AGO</Typography>
              </div>

              <div className="bg-[#f0f2f5] p-3 rounded-xl shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] border-l-4 border-blue-500">
                <Typography variant="small" color="blue-gray" className="font-bold text-xs">
                  Shift Handover Complete
                </Typography>
                <Typography className="text-xs text-gray-600 mt-1">
                  Morning shift drivers have successfully clocked out.
                </Typography>
                <Typography className="text-[10px] text-gray-400 mt-2 font-bold">2 HOURS AGO</Typography>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
