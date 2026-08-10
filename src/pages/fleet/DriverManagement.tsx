import { Typography, Card, CardBody } from "../../lib/mt-components";
import { UsersIcon, CheckCircleIcon, UserIcon, MoonIcon, PlusIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/outline";

export function DriverManagement() {
  const drivers = [
    { id: "DRV-7701", name: "Nuwan Perera", contact: "+94 77 123 4567", license: "B549201", expiry: "2026-08-15", status: "ON DUTY", unit: "WP LK-4421", shift: "18:00 (in 3h 15m)" },
    { id: "DRV-7704", name: "Saman De Silva", contact: "+94 71 987 6543", license: "B992104", expiry: "2023-11-05 (Expiring)", status: "AVAILABLE", unit: "Unassigned", shift: "-" },
    { id: "DRV-7688", name: "Chaminda Kumara", contact: "+94 76 555 4321", license: "B331092", expiry: "2027-02-20", status: "ON LEAVE", unit: "N/A", shift: "Returns: Tomorrow" },
    { id: "DRV-7712", name: "Dilini Fernando", contact: "+94 70 888 1122", license: "B884211", expiry: "2025-12-10", status: "ON DUTY", unit: "WP LL-9002", shift: "22:00 (in 7h 15m)" },
  ];

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6 relative">
      
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
         <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-6 flex justify-between items-start">
            <div>
              <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider mb-1 text-xs">Total Drivers</Typography>
              <Typography variant="h3" color="blue-gray" className="font-bold text-3xl">142</Typography>
            </div>
            <UsersIcon className="w-6 h-6 text-gray-500" />
          </CardBody>
         </Card>
         
         <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none border-l-4 border-l-[#2c5126]">
          <CardBody className="p-6 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                 <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider text-xs">On Duty</Typography>
                 <div className="bg-[#d0ebd6] px-2 py-0.5 rounded text-[10px] font-bold text-[#2c5126] flex items-center gap-1 shadow-[inset_1px_1px_2px_rgba(44,81,38,0.2)]">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#2c5126]"></div> ACTIVE
                 </div>
              </div>
              <Typography variant="h3" color="blue-gray" className="font-bold text-3xl text-gray-800">87</Typography>
            </div>
          </CardBody>
         </Card>

         <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none border-l-4 border-l-blue-500">
          <CardBody className="p-6 flex justify-between items-start">
            <div>
              <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider mb-1 text-xs">Available (Standby)</Typography>
              <Typography variant="h3" color="blue-gray" className="font-bold text-3xl">43</Typography>
            </div>
            <UserIcon className="w-6 h-6 text-blue-500" />
          </CardBody>
         </Card>

         <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none border-l-4 border-l-gray-400">
          <CardBody className="p-6 flex justify-between items-start">
            <div>
              <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider mb-1 text-xs">On Leave / Rest</Typography>
              <Typography variant="h3" color="blue-gray" className="font-bold text-3xl">12</Typography>
            </div>
            <MoonIcon className="w-6 h-6 text-gray-400" />
          </CardBody>
         </Card>
      </div>

      {/* Main Content Area */}
      <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none flex-1 flex flex-col min-h-[400px]">
        {/* Controls Row */}
        <div className="p-4 sm:p-6 border-b border-gray-300/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 flex gap-4 w-full max-w-xl">
             <div className="flex-1 bg-[#f0f2f5] rounded-xl px-4 py-2 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] h-11 flex items-center">
                <svg className="w-5 h-5 text-gray-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <input type="text" placeholder="Search ID, Name, or License..." className="bg-transparent border-none outline-none w-full text-sm text-gray-700 font-medium placeholder-gray-400" />
             </div>
             <select className="h-11 px-4 rounded-xl bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] text-sm font-bold text-gray-700 border-none outline-none hidden sm:block min-w-[140px]">
                <option>All Status</option>
                <option>On Duty</option>
                <option>Available</option>
             </select>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
             <button className="h-11 px-4 bg-[#e6e9ef] rounded-xl shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] flex items-center gap-2 hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-shadow text-gray-700 font-bold text-sm">
                <PlusIcon className="w-4 h-4" />
                Add Driver
             </button>
             <button className="h-11 px-4 bg-[#e6e9ef] rounded-xl shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] flex items-center gap-2 hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-shadow text-gray-700 font-bold text-sm">
                <ArrowsRightLeftIcon className="w-4 h-4" />
                Manual Assign
             </button>
             <button className="h-11 px-5 bg-[#6cf3b7] text-[#145c39] rounded-xl font-bold text-sm flex items-center gap-2 shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15)] transition-all">
                <CheckCircleIcon className="w-5 h-5" />
                Auto-Assign Drivers
             </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full flex-1">
          <table className="w-full min-w-max table-auto text-left border-collapse">
            <thead className="bg-[#f0f2f5] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.05)]">
              <tr>
                {["Driver ID", "Name", "Contact", "License / Expiry", "Status", "Assigned Unit", "Shift End", "Action"].map((head) => (
                  <th key={head} className="p-4 py-5">
                    <Typography variant="small" color="blue-gray" className="font-bold tracking-wider text-xs text-gray-600 uppercase">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {drivers.map((drv, index) => {
                const isLast = index === drivers.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-gray-300/50";
                
                return (
                  <tr key={drv.id} className="hover:bg-[#f0f2f5]/50 transition-colors">
                    <td className={classes}>
                      <Typography variant="small" className="font-bold text-gray-700 text-sm">{drv.id}</Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-gray-300 flex items-center justify-center font-bold text-gray-600 text-xs shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
                           {drv.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-bold text-gray-900 text-sm">{drv.name}</span>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="font-medium text-gray-600 text-xs whitespace-pre-line">{drv.contact.replace(' ', '\n')}</Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800 text-sm">{drv.license}</span>
                        <span className={`text-[10px] font-bold ${drv.expiry.includes('Expiring') ? 'text-red-500' : 'text-gray-500'}`}>{drv.expiry}</span>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className={`inline-block px-3 py-1 rounded text-[10px] uppercase font-bold tracking-widest shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05)] ${
                        drv.status === 'ON DUTY' ? 'bg-[#d0ebd6]/80 text-[#2c5126]' :
                        drv.status === 'AVAILABLE' ? 'bg-blue-100/80 text-blue-800' :
                        'bg-gray-200/80 text-gray-600'
                      }`}>
                        {drv.status}
                      </div>
                    </td>
                    <td className={classes}>
                      {drv.unit !== "Unassigned" && drv.unit !== "N/A" ? (
                         <div className="bg-[#e6e9ef] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] rounded px-3 py-2 inline-flex flex-col items-center justify-center">
                            <span className="text-[10px] font-bold text-gray-500 uppercase">WP</span>
                            <span className="text-xs font-bold text-gray-800">LK-4421</span>
                         </div>
                      ) : (
                         <span className="text-gray-400 font-medium text-sm">{drv.unit}</span>
                      )}
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className={`font-medium text-xs ${drv.shift.includes('Returns') ? 'text-gray-400' : 'text-gray-700 whitespace-pre-line'}`}>
                        {drv.shift.replace(' (', '\n(')}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {drv.status === 'AVAILABLE' && (
                         <button className="text-[10px] bg-[#e6e9ef] shadow-[2px_2px_4px_#c4c7cc,-2px_-2px_4px_#ffffff] font-bold text-gray-600 px-3 py-1.5 rounded hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-all">
                            ASSIGN
                         </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-300/50 flex items-center justify-between bg-[#f0f2f5]/50 rounded-b-2xl">
          <Typography variant="small" className="text-xs font-medium text-gray-500">Showing 1-4 of 142 drivers</Typography>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg bg-[#186f45] text-white flex items-center justify-center text-xs font-bold shadow-[2px_2px_4px_#c4c7cc]">1</button>
            <button className="w-8 h-8 rounded-lg bg-transparent text-gray-700 flex items-center justify-center text-xs font-bold hover:bg-gray-200 transition-colors">2</button>
            <button className="w-8 h-8 rounded-lg bg-transparent text-gray-700 flex items-center justify-center text-xs font-bold hover:bg-gray-200 transition-colors">3</button>
          </div>
        </div>
      </Card>
    </div>
  );
}
