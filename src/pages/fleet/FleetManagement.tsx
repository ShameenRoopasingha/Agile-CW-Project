import { useState } from "react";
import { Typography, Card, CardBody } from "../../lib/mt-components";
import { TruckIcon, WrenchScrewdriverIcon, PlusIcon, Squares2X2Icon, ListBulletIcon } from "@heroicons/react/24/outline";

export function FleetManagement() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const trucks = [
    { id: "TRK-902", type: "Compactor", status: "ACTIVE", maxWeight: "12.5 T", volume: "20 m³", driver: "J. Smith" },
    { id: "TRK-405", type: "Tipper", status: "MAINT.", maxWeight: "18.0 T", volume: "15 m³", driver: "Unassigned" },
    { id: "TRK-911", type: "Compactor", status: "ACTIVE", maxWeight: "12.5 T", volume: "20 m³", driver: "A. Chen" },
    { id: "TRK-882", type: "Hooklift", status: "ACTIVE", maxWeight: "22.0 T", volume: "25 m³", driver: "M. Perera" },
    { id: "TRK-105", type: "Sweeper", status: "IDLE", maxWeight: "5.0 T", volume: "8 m³", driver: "K. Silva" },
    { id: "TRK-334", type: "Compactor", status: "MAINT.", maxWeight: "12.5 T", volume: "20 m³", driver: "Unassigned" },
  ];

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6 relative">
      
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 shrink-0">
         <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-6 flex justify-between items-center">
            <div>
              <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider mb-1 text-xs">Total Fleet</Typography>
              <Typography variant="h3" color="blue-gray" className="font-bold text-3xl">124</Typography>
            </div>
            <TruckIcon className="w-8 h-8 text-gray-400" />
          </CardBody>
         </Card>
         
         <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-6 flex justify-between items-center">
            <div>
              <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider mb-1 text-xs">Active Trucks</Typography>
              <Typography variant="h3" color="green" className="font-bold text-3xl text-[#2c5126]">98</Typography>
            </div>
            <div className="w-3 h-3 rounded-full bg-[#6cf3b7] shadow-[0_0_10px_#6cf3b7]"></div>
          </CardBody>
         </Card>

         <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-6 flex justify-between items-center">
            <div>
              <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider mb-1 text-xs">In Maintenance</Typography>
              <Typography variant="h3" color="amber" className="font-bold text-3xl text-amber-600">12</Typography>
            </div>
            <WrenchScrewdriverIcon className="w-8 h-8 text-amber-500" />
          </CardBody>
         </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
        <div className="flex-1 flex gap-4 w-full">
          <div className="flex-1 max-w-md bg-[#f0f2f5] rounded-xl px-4 py-2 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] h-12 flex items-center">
            <svg className="w-5 h-5 text-gray-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input type="text" placeholder="Search ID or Plate..." className="bg-transparent border-none outline-none w-full text-sm text-gray-700 font-medium placeholder-gray-400" />
          </div>
          
          <select className="h-12 px-4 rounded-xl bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] text-sm font-bold text-gray-700 border-none outline-none hidden sm:block">
            <option>All Types</option>
            <option>Compactor</option>
            <option>Tipper</option>
          </select>
          <select className="h-12 px-4 rounded-xl bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] text-sm font-bold text-gray-700 border-none outline-none hidden sm:block">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Maintenance</option>
          </select>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex bg-[#f0f2f5] rounded-xl p-1 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff]">
            <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#e6e9ef] shadow-[2px_2px_4px_#c4c7cc,-2px_-2px_4px_#ffffff] text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
              <Squares2X2Icon className="w-5 h-5" />
            </button>
            <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#e6e9ef] shadow-[2px_2px_4px_#c4c7cc,-2px_-2px_4px_#ffffff] text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
              <ListBulletIcon className="w-5 h-5" />
            </button>
          </div>
          <button className="h-12 px-5 bg-[#6cf3b7] text-[#145c39] rounded-xl font-bold text-sm flex items-center gap-2 shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15)] transition-all flex-1 sm:flex-none justify-center">
            <PlusIcon className="w-5 h-5" />
            Add Truck
          </button>
        </div>
      </div>

      {/* Truck Grid */}
      <div className="flex-1 overflow-y-auto pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {trucks.map(truck => (
            <Card key={truck.id} className="bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] rounded-2xl border-none">
              <CardBody className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#f0f2f5] flex items-center justify-center shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff]">
                      <TruckIcon className="w-6 h-6 text-gray-700" />
                    </div>
                    <div>
                      <Typography variant="h6" color="blue-gray" className="font-bold">{truck.id}</Typography>
                      <Typography variant="small" className="text-gray-500 font-medium text-xs">{truck.type}</Typography>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    truck.status === 'ACTIVE' 
                      ? 'bg-[#d0ebd6]/80 text-[#2c5126] border border-[#6cf3b7]' 
                      : truck.status === 'MAINT.'
                      ? 'bg-amber-100/80 text-amber-800 border border-amber-300'
                      : 'bg-gray-200 text-gray-700 border border-gray-300'
                  }`}>
                    {truck.status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#f0f2f5] p-3 rounded-xl shadow-[inset_1px_1px_3px_#c4c7cc,inset_-1px_-1px_3px_#ffffff]">
                    <Typography variant="small" className="text-[10px] uppercase text-gray-500 font-bold mb-1">Max Weight</Typography>
                    <Typography variant="h6" className="text-gray-800">{truck.maxWeight}</Typography>
                  </div>
                  <div className="bg-[#f0f2f5] p-3 rounded-xl shadow-[inset_1px_1px_3px_#c4c7cc,inset_-1px_-1px_3px_#ffffff]">
                    <Typography variant="small" className="text-[10px] uppercase text-gray-500 font-bold mb-1">Volume</Typography>
                    <Typography variant="h6" className="text-gray-800">{truck.volume}</Typography>
                  </div>
                </div>

                <div className="h-px w-full bg-gray-300 shadow-[inset_0_1px_1px_#c4c7cc] mb-4"></div>

                <div className="flex items-center gap-3">
                  {truck.driver !== "Unassigned" ? (
                    <>
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold shadow-[2px_2px_4px_#c4c7cc,-2px_-2px_4px_#ffffff]">
                        {truck.driver.charAt(0)}
                      </div>
                      <Typography variant="small" className="font-bold text-sm text-gray-700">{truck.driver}</Typography>
                    </>
                  ) : (
                    <Typography variant="small" className="font-medium text-sm text-gray-400 italic">Unassigned</Typography>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
