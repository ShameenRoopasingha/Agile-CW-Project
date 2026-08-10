import { Typography, Card, CardBody } from "../../lib/mt-components";
import { UsersIcon, CheckCircleIcon, BriefcaseIcon, CalendarDaysIcon, PlusIcon, ArrowsRightLeftIcon, ArrowDownTrayIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export function Employees() {
  const employees = [
    { id: "EMP-4092", name: "Saman Kumara", contact: "077 123 4567", role: "Collector", status: "ASSIGNED", unit: "TRK-CMC-01", shift: "Morning" },
    { id: "EMP-4105", name: "Nilantha Perera", contact: "071 987 6543", role: "Helper", status: "ASSIGNED", unit: "TRK-CMC-01", shift: "Morning" },
    { id: "EMP-3881", name: "Dinesh Silva", contact: "076 555 1234", role: "Supervisor", status: "AVAILABLE", unit: "-", shift: "Evening" },
    { id: "EMP-4210", name: "Kamal Rathnayake", contact: "070 111 2222", role: "Helper", status: "ON LEAVE", unit: "-", shift: "-" },
  ];

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6 relative">
      
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
         <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider text-xs">Total Staff</Typography>
              <UsersIcon className="w-5 h-5 text-gray-500" />
            </div>
            <Typography variant="h3" color="blue-gray" className="font-bold text-3xl mb-1">1,248</Typography>
            <Typography variant="small" color="green" className="font-bold text-xs flex items-center gap-1 text-[#2c5126]">
              <span className="text-[#6cf3b7]">↗</span> +12 this month
            </Typography>
          </CardBody>
         </Card>
         
         <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider text-xs">On Duty</Typography>
              <BriefcaseIcon className="w-5 h-5 text-gray-500" />
            </div>
            <Typography variant="h3" color="blue-gray" className="font-bold text-3xl mb-2">856</Typography>
            <div className="w-full bg-gray-300 rounded-full h-1.5 shadow-[inset_1px_1px_2px_#c4c7cc] mb-1">
               <div className="bg-[#2c5126] h-1.5 rounded-full shadow-[1px_1px_2px_#c4c7cc]" style={{ width: "68%" }}></div>
            </div>
            <Typography variant="small" color="gray" className="font-medium text-[10px]">68% of total workforce</Typography>
          </CardBody>
         </Card>

         <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider text-xs">Available</Typography>
              <CalendarDaysIcon className="w-5 h-5 text-gray-500" />
            </div>
            <Typography variant="h3" color="blue-gray" className="font-bold text-3xl mb-2">312</Typography>
            <div className="w-full bg-gray-300 rounded-full h-1.5 shadow-[inset_1px_1px_2px_#c4c7cc] mb-1">
               <div className="bg-[#5ca84b] h-1.5 rounded-full shadow-[1px_1px_2px_#c4c7cc]" style={{ width: "25%" }}></div>
            </div>
            <Typography variant="small" color="gray" className="font-medium text-[10px]">Ready for assignment</Typography>
          </CardBody>
         </Card>

         <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider text-xs">On Leave</Typography>
              <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
            </div>
            <Typography variant="h3" color="blue-gray" className="font-bold text-3xl mb-1">80</Typography>
            <Typography variant="small" color="red" className="font-bold text-xs flex items-center gap-1 text-red-500">
              <ExclamationTriangleIcon className="w-3 h-3" /> Higher than usual
            </Typography>
          </CardBody>
         </Card>
      </div>

      {/* Main Content Area */}
      <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none flex-1 flex flex-col min-h-[400px]">
        {/* Controls Row */}
        <div className="p-4 sm:p-6 border-b border-gray-300/50 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex-1 flex flex-wrap gap-4 w-full">
             <div className="flex-1 min-w-[200px] max-w-md bg-[#f0f2f5] rounded-xl px-4 py-2 shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] h-11 flex items-center">
                <svg className="w-5 h-5 text-gray-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <input type="text" placeholder="Search by ID or Name..." className="bg-transparent border-none outline-none w-full text-sm text-gray-700 font-medium placeholder-gray-400" />
             </div>
             <select className="h-11 px-4 rounded-xl bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] text-sm font-bold text-gray-700 border-none outline-none min-w-[120px]">
                <option>All Roles</option>
                <option>Collector</option>
                <option>Helper</option>
                <option>Supervisor</option>
             </select>
             <select className="h-11 px-4 rounded-xl bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] text-sm font-bold text-gray-700 border-none outline-none min-w-[140px]">
                <option>All Statuses</option>
                <option>Assigned</option>
                <option>Available</option>
                <option>On Leave</option>
             </select>
          </div>
          
          <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
             <button className="h-11 px-4 bg-[#e6e9ef] rounded-xl shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] flex items-center gap-2 hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-shadow text-gray-700 font-bold text-sm whitespace-nowrap">
                <ArrowDownTrayIcon className="w-4 h-4" />
                Export
             </button>
             <button className="h-11 px-4 bg-[#e6e9ef] rounded-xl shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] flex items-center gap-2 hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-shadow text-[#145c39] font-bold text-sm whitespace-nowrap border border-[#6cf3b7]">
                <CheckCircleIcon className="w-4 h-4 text-[#6cf3b7]" />
                Auto-Assign
             </button>
             <button className="h-11 px-4 bg-[#e6e9ef] rounded-xl shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] flex items-center gap-2 hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-shadow text-blue-600 font-bold text-sm whitespace-nowrap border border-blue-400">
                <ArrowsRightLeftIcon className="w-4 h-4 text-blue-400" />
                Manual Assign
             </button>
             <button className="h-11 px-5 bg-[#6cf3b7] text-[#145c39] rounded-xl font-bold text-sm flex items-center gap-2 shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15)] transition-all whitespace-nowrap">
                <PlusIcon className="w-5 h-5" />
                Add Employee
             </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full flex-1">
          <table className="w-full min-w-max table-auto text-left border-collapse">
            <thead className="bg-[#f0f2f5] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.05)]">
              <tr>
                {["ID", "Employee Name", "Contact", "Role", "Status", "Assigned Unit", "Shift"].map((head) => (
                  <th key={head} className="p-4 py-5">
                    <Typography variant="small" color="blue-gray" className="font-bold tracking-wider text-xs text-gray-600 uppercase">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => {
                const isLast = index === employees.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-gray-300/50";
                
                return (
                  <tr key={emp.id} className="hover:bg-[#f0f2f5]/50 transition-colors">
                    <td className={classes}>
                      <Typography variant="small" className="font-bold text-gray-700 text-sm">{emp.id}</Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-[#e6e9ef] shadow-[2px_2px_4px_#c4c7cc,-2px_-2px_4px_#ffffff] flex items-center justify-center font-bold text-[#2c5126] text-xs">
                           {emp.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-bold text-gray-900 text-sm">{emp.name}</span>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="font-medium text-gray-600 text-sm">{emp.contact}</Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="font-medium text-gray-800 text-sm">{emp.role}</Typography>
                    </td>
                    <td className={classes}>
                      <div className={`inline-block px-3 py-1 rounded text-[10px] uppercase font-bold tracking-widest shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05)] ${
                        emp.status === 'ASSIGNED' ? 'bg-[#d0ebd6]/80 text-[#2c5126] border border-[#6cf3b7]' :
                        emp.status === 'AVAILABLE' ? 'bg-blue-100/80 text-blue-800 border border-blue-300' :
                        'bg-red-100/80 text-red-800 border border-red-300'
                      }`}>
                        {emp.status}
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className={`font-medium text-sm ${emp.unit === '-' ? 'text-gray-400' : 'text-gray-700 font-mono'}`}>
                        {emp.unit}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className={`font-medium text-sm ${emp.shift === '-' ? 'text-gray-400' : 'text-gray-700'}`}>
                        {emp.shift}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-300/50 flex items-center justify-between bg-[#f0f2f5]/50 rounded-b-2xl">
          <Typography variant="small" className="text-xs font-medium text-gray-500">Showing 1 to 10 of 1,248 entries</Typography>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg bg-[#186f45] text-white flex items-center justify-center text-xs font-bold shadow-[2px_2px_4px_#c4c7cc]">1</button>
            <button className="w-8 h-8 rounded-lg bg-transparent text-gray-700 flex items-center justify-center text-xs font-bold hover:bg-gray-200 transition-colors">2</button>
            <button className="w-8 h-8 rounded-lg bg-transparent text-gray-700 flex items-center justify-center text-xs font-bold hover:bg-gray-200 transition-colors">3</button>
            <span className="text-gray-500 font-bold px-1">...</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
