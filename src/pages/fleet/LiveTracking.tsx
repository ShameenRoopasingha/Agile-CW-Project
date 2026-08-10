import { Typography, Card, CardBody } from "../../lib/mt-components";
import { FunnelIcon, MapPinIcon, ChatBubbleLeftRightIcon, SignalSlashIcon } from "@heroicons/react/24/outline";

export function LiveTracking() {
  const activeTrucks = [
    { id: "TRK-01", route: "Route Alpha-N", status: "COLLECTING", progress: 68 },
    { id: "TRK-04", route: "Route Beta-S", status: "IN TRANSIT", eta: "14m" },
    { id: "TRK-09", route: "Unassigned", status: "OFFLINE", lastPing: "2h ago" },
  ];

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-120px)] flex gap-6 relative">
      
      {/* Sidebar Stats & List */}
      <div className="w-80 flex flex-col gap-6 shrink-0 h-full">
         <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-5 flex flex-col gap-4">
            <Typography variant="h6" color="blue-gray" className="font-bold text-base mb-1">Fleet Status</Typography>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#f0f2f5] p-3 rounded-xl shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff]">
                <Typography variant="small" className="text-[10px] font-bold uppercase text-gray-500 mb-1">Collecting</Typography>
                <div className="flex items-end gap-1">
                  <Typography variant="h5" className="font-bold text-[#2c5126] leading-none">12</Typography>
                  <span className="text-[10px] font-medium text-gray-400 mb-0.5">/40</span>
                </div>
              </div>
              <div className="bg-[#f0f2f5] p-3 rounded-xl shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff]">
                <Typography variant="small" className="text-[10px] font-bold uppercase text-gray-500 mb-1">In Transit</Typography>
                <div className="flex items-end gap-1">
                  <Typography variant="h5" className="font-bold text-blue-600 leading-none">18</Typography>
                  <span className="text-[10px] font-medium text-gray-400 mb-0.5">/40</span>
                </div>
              </div>
              <div className="bg-[#f0f2f5] p-3 rounded-xl shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff]">
                <Typography variant="small" className="text-[10px] font-bold uppercase text-gray-500 mb-1">At Dispose</Typography>
                <div className="flex items-end gap-1">
                  <Typography variant="h5" className="font-bold text-amber-600 leading-none">8</Typography>
                  <span className="text-[10px] font-medium text-gray-400 mb-0.5">/40</span>
                </div>
              </div>
              <div className="bg-[#f0f2f5] p-3 rounded-xl shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff]">
                <Typography variant="small" className="text-[10px] font-bold uppercase text-gray-500 mb-1">Idle/Offline</Typography>
                <div className="flex items-end gap-1">
                  <Typography variant="h5" className="font-bold text-gray-600 leading-none">2</Typography>
                  <span className="text-[10px] font-medium text-gray-400 mb-0.5">/40</span>
                </div>
              </div>
            </div>
          </CardBody>
         </Card>

         <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none flex-1 flex flex-col min-h-0">
          <CardBody className="p-0 flex flex-col h-full">
            <div className="p-5 border-b border-gray-300/50 flex justify-between items-center shrink-0">
              <Typography variant="small" className="font-bold uppercase tracking-wider text-xs text-gray-600">Active Trucks</Typography>
              <button className="text-gray-400 hover:text-gray-700 transition-colors">
                 <FunnelIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {activeTrucks.map((truck, idx) => (
                <div key={idx} className="bg-[#f0f2f5] rounded-xl p-4 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff]">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <Typography variant="h6" color="blue-gray" className="font-bold text-sm leading-tight">{truck.id}</Typography>
                      <Typography variant="small" className="text-gray-500 text-[10px] font-medium">{truck.route}</Typography>
                    </div>
                    <div className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wider border ${
                      truck.status === 'COLLECTING' ? 'bg-[#d0ebd6]/80 text-[#2c5126] border-[#6cf3b7]' :
                      truck.status === 'IN TRANSIT' ? 'bg-blue-100/80 text-blue-800 border-blue-300' :
                      'bg-gray-200/80 text-gray-600 border-gray-300'
                    }`}>
                      {truck.status}
                    </div>
                  </div>
                  
                  {truck.status === 'COLLECTING' && (
                    <div className="mt-3">
                      <div className="flex justify-between text-[10px] font-medium mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="text-[#2c5126] font-bold">{truck.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-1.5 shadow-[inset_1px_1px_2px_#c4c7cc]">
                         <div className="bg-[#2c5126] h-1.5 rounded-full shadow-[1px_1px_2px_#c4c7cc]" style={{ width: `${truck.progress}%` }}></div>
                      </div>
                    </div>
                  )}

                  {truck.status === 'IN TRANSIT' && (
                    <div className="mt-3">
                      <div className="flex justify-between text-[10px] font-medium mb-1">
                        <span className="text-gray-500">ETA Dispose</span>
                        <span className="text-blue-600 font-bold">{truck.eta}</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-1.5 shadow-[inset_1px_1px_2px_#c4c7cc]">
                         <div className="bg-blue-500 h-1.5 rounded-full shadow-[1px_1px_2px_#c4c7cc]" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  )}

                  {truck.status === 'OFFLINE' && (
                     <div className="mt-3 flex justify-between text-[10px] font-medium">
                        <span className="text-gray-500">Last ping</span>
                        <span className="text-red-500 font-bold flex items-center gap-1"><SignalSlashIcon className="w-3 h-3"/> {truck.lastPing}</span>
                     </div>
                  )}
                </div>
              ))}
            </div>
          </CardBody>
         </Card>
      </div>

      {/* Main Map Area (Mocked with Neumorphic Debossed Container) */}
      <div className="flex-1 bg-[#f0f2f5] shadow-[inset_8px_8px_16px_#c4c7cc,inset_-8px_-8px_16px_#ffffff] rounded-3xl relative overflow-hidden flex items-center justify-center">
        
        {/* Fake Map Grid lines for effect */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(#9ca3af 1px, transparent 1px), linear-gradient(90deg, #9ca3af 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>

        {/* Fake Route path */}
        <svg className="absolute w-full h-full" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))' }}>
           <path d="M 100,300 Q 250,150 400,250 T 700,100" fill="none" stroke="#6cf3b7" strokeWidth="4" strokeDasharray="8 8" />
        </svg>

        {/* Fake Map Markers */}
        <div className="absolute top-[100px] right-[200px] w-4 h-4 bg-amber-400 rounded-full border-2 border-white shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
        <div className="absolute top-[300px] left-[100px] w-5 h-5 bg-blue-500 rounded-full border-4 border-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
        <div className="absolute top-[250px] left-[400px] w-6 h-6 bg-[#2c5126] rounded-full border-4 border-[#6cf3b7] shadow-[0_0_20px_rgba(108,243,183,0.5)] flex items-center justify-center z-10">
           <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>

        {/* Floating Controls */}
        <div className="absolute top-6 right-6 flex gap-3">
          <button className="w-10 h-10 bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] rounded-xl flex items-center justify-center hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-all">
             <span className="font-bold text-xs text-gray-700">10s</span>
          </button>
          <button className="w-10 h-10 bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] rounded-xl flex items-center justify-center hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-all text-[#145c39] border-2 border-[#6cf3b7]">
             <MapPinIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Floating Detail Card */}
        <Card className="absolute top-20 right-6 w-64 bg-[#e6e9ef]/90 backdrop-blur-md shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border border-white/50 z-20">
          <CardBody className="p-5">
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6" className="font-bold text-gray-800">TRK-01 Details</Typography>
              <button className="text-gray-400 hover:text-gray-600">×</button>
            </div>
            
            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-gray-500 uppercase tracking-wider">Driver</span>
                <span className="text-gray-900 font-bold">J. Smith</span>
              </div>
              <div className="flex justify-between text-xs font-medium">
                <span className="text-gray-500 uppercase tracking-wider">Speed</span>
                <span className="text-[#2c5126] font-bold">24 km/h</span>
              </div>
              <div className="flex justify-between text-xs font-medium">
                <span className="text-gray-500 uppercase tracking-wider">Load</span>
                <span className="text-gray-900 font-bold">8.4T (70%)</span>
              </div>
            </div>

            <button className="w-full h-10 bg-[#f0f2f5] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-gray-600 hover:bg-gray-200 transition-colors border border-gray-300">
               <ChatBubbleLeftRightIcon className="w-4 h-4" />
               Contact Driver
            </button>
          </CardBody>
        </Card>
      </div>

    </div>
  );
}
