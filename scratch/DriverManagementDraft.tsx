import { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Card, CardBody } from "../../lib/mt-components";
import { UsersIcon, CheckCircleIcon, UserIcon, MoonIcon, PlusIcon, ArrowsRightLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";

const DRIVERS_API = "http://localhost:5000/api/drivers";
const ASSIGNMENTS_API = "http://localhost:3000/api/driver-assignments";

export function DriverManagement() {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [detailedTrucks, setDetailedTrucks] = useState<any[]>([]);
  const [unassignedDrivers, setUnassignedDrivers] = useState<any[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTruckId, setSelectedTruckId] = useState("");
  const [selectedDriverId, setSelectedDriverId] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [driversRes, trucksRes, unassignedRes] = await Promise.all([
        axios.get(DRIVERS_API),
        axios.get(`${ASSIGNMENTS_API}/detailed-trucks`),
        axios.get(`${ASSIGNMENTS_API}/unassigned`)
      ]);

      if (driversRes.data.success) {
        setDrivers(driversRes.data.data);
      }
      if (trucksRes.data.success) {
        setDetailedTrucks(trucksRes.data.data);
      }
      if (unassignedRes.data.success) {
        setUnassignedDrivers(unassignedRes.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      showToast("Failed to fetch data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleAutoAssign = async () => {
    try {
      const res = await axios.post(`${ASSIGNMENTS_API}/assign-random`);
      if (res.data.success) {
        showToast(res.data.message || "Drivers auto-assigned successfully.");
        fetchData();
      }
    } catch (error) {
      console.error(error);
      showToast("Error auto-assigning drivers.");
    }
  };

  const handleClearAll = async () => {
    try {
      const res = await axios.post(`${ASSIGNMENTS_API}/unassign-all`);
      if (res.data.success) {
        showToast(res.data.message || "All drivers unassigned.");
        fetchData();
      }
    } catch (error) {
      console.error(error);
      showToast("Error clearing assignments.");
    }
  };

  const handleManualAssign = async () => {
    if (!selectedTruckId || !selectedDriverId) {
      showToast("Please select both a truck and a driver.");
      return;
    }
    const driver = unassignedDrivers.find(d => d._id === selectedDriverId);
    if (!driver) return;

    try {
      const res = await axios.put(`${ASSIGNMENTS_API}/manual/${selectedTruckId}`, {
        driverId: driver._id,
        driverEmail: driver.email || driver.driverEmail
      });
      if (res.data.success) {
        showToast("Driver assigned successfully.");
        setIsModalOpen(false);
        setSelectedTruckId("");
        setSelectedDriverId("");
        fetchData();
      }
    } catch (error) {
      console.error(error);
      showToast("Error assigning driver.");
    }
  };

  const getAssignedTruck = (driverId: string) => {
    const truck = detailedTrucks.find(t => t.assignedDriver === driverId || t.driverDetails?._id === driverId);
    return truck ? `TRK-${truck._id.slice(-4).toUpperCase()}` : "Unassigned";
  };

  const onDutyCount = drivers.filter(d => d.status === "onduty").length;
  const availableCount = unassignedDrivers.length;
  const onLeaveCount = drivers.filter(d => d.status === "onleave").length;

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6 relative">
      {toastMessage && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 text-white px-4 py-2 rounded shadow-lg">
          {toastMessage}
        </div>
      )}

      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
         <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-6 flex justify-between items-start">
            <div>
              <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider mb-1 text-xs">Total Drivers</Typography>
              <Typography variant="h3" color="blue-gray" className="font-bold text-3xl">{drivers.length}</Typography>
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
              <Typography variant="h3" color="blue-gray" className="font-bold text-3xl text-gray-800">{onDutyCount}</Typography>
            </div>
          </CardBody>
         </Card>

         <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none border-l-4 border-l-blue-500">
          <CardBody className="p-6 flex justify-between items-start">
            <div>
              <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider mb-1 text-xs">Unassigned</Typography>
              <Typography variant="h3" color="blue-gray" className="font-bold text-3xl">{availableCount}</Typography>
            </div>
            <UserIcon className="w-6 h-6 text-blue-500" />
          </CardBody>
         </Card>

         <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none border-l-4 border-l-gray-400">
          <CardBody className="p-6 flex justify-between items-start">
            <div>
              <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider mb-1 text-xs">On Leave / Rest</Typography>
              <Typography variant="h3" color="blue-gray" className="font-bold text-3xl">{onLeaveCount}</Typography>
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
                <input type="text" placeholder="Search ID, Name..." className="bg-transparent border-none outline-none w-full text-sm text-gray-700 font-medium placeholder-gray-400" />
             </div>
             <select className="h-11 px-4 rounded-xl bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] text-sm font-bold text-gray-700 border-none outline-none hidden sm:block min-w-[140px]">
                <option>All Status</option>
                <option>On Duty</option>
                <option>Available</option>
             </select>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
             <button onClick={handleClearAll} className="h-11 px-4 bg-[#ffccd5] text-[#d6334a] rounded-xl shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] flex items-center gap-2 hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)] transition-shadow font-bold text-sm whitespace-nowrap">
                Clear All Assignments
             </button>
             <button onClick={() => setIsModalOpen(true)} className="h-11 px-4 bg-[#e6e9ef] rounded-xl shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] flex items-center gap-2 hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-shadow text-gray-700 font-bold text-sm whitespace-nowrap">
                <ArrowsRightLeftIcon className="w-4 h-4" />
                Manual Assign
             </button>
             <button onClick={handleAutoAssign} className="h-11 px-5 bg-[#6cf3b7] text-[#145c39] rounded-xl font-bold text-sm flex items-center gap-2 shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15)] transition-all whitespace-nowrap">
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
                {["Driver ID", "Name", "Email", "Home Town", "Status", "Assigned Truck", "Action"].map((head) => (
                  <th key={head} className="p-4 py-5">
                    <Typography variant="small" color="blue-gray" className="font-bold tracking-wider text-xs text-gray-600 uppercase">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500 font-medium">Loading drivers...</td>
                </tr>
              ) : drivers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500 font-medium">No drivers found.</td>
                </tr>
              ) : (
                drivers.map((drv, index) => {
                  const isLast = index === drivers.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-gray-300/50";
                  const assignedUnit = getAssignedTruck(drv._id);
                  const isAvailable = unassignedDrivers.some(u => u._id === drv._id);
                  
                  return (
                    <tr key={drv._id} className="hover:bg-[#f0f2f5]/50 transition-colors">
                      <td className={classes}>
                        <Typography variant="small" className="font-bold text-gray-700 text-sm">
                           DRV-{drv._id.slice(-4).toUpperCase()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-gray-300 flex items-center justify-center font-bold text-gray-600 text-xs shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
                             {drv.name ? drv.name.split(' ').map((n: string) => n[0]).join('').substring(0,2) : "DR"}
                          </div>
                          <span className="font-bold text-gray-900 text-sm">{drv.name}</span>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" className="font-medium text-gray-600 text-xs">{drv.email || "N/A"}</Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" className="font-bold text-gray-800 text-sm">{drv.HomeTown || "Not Specified"}</Typography>
                      </td>
                      <td className={classes}>
                        <div className={`inline-block px-3 py-1 rounded text-[10px] uppercase font-bold tracking-widest shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05)] ${
                          drv.status === 'onduty' ? 'bg-[#d0ebd6]/80 text-[#2c5126]' :
                          drv.status === 'onleave' ? 'bg-amber-100/80 text-amber-800' :
                          'bg-gray-200/80 text-gray-600'
                        }`}>
                          {drv.status || 'unknown'}
                        </div>
                      </td>
                      <td className={classes}>
                        {assignedUnit !== "Unassigned" ? (
                           <div className="bg-[#e6e9ef] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] rounded px-3 py-2 inline-flex flex-col items-center justify-center">
                              <span className="text-[10px] font-bold text-gray-500 uppercase">TRK</span>
                              <span className="text-xs font-bold text-gray-800">{assignedUnit.split('-')[1]}</span>
                           </div>
                        ) : (
                           <span className="text-gray-400 font-medium text-sm">{assignedUnit}</span>
                        )}
                      </td>
                      <td className={classes}>
                        {isAvailable && (
                           <button 
                             onClick={() => {
                               setSelectedDriverId(drv._id);
                               setIsModalOpen(true);
                             }}
                             className="text-[10px] bg-[#e6e9ef] shadow-[2px_2px_4px_#c4c7cc,-2px_-2px_4px_#ffffff] font-bold text-gray-600 px-3 py-1.5 rounded hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-all">
                              ASSIGN
                           </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-300/50 flex items-center justify-between bg-[#f0f2f5]/50 rounded-b-2xl">
          <Typography variant="small" className="text-xs font-medium text-gray-500">Showing all {drivers.length} drivers</Typography>
        </div>
      </Card>

      {/* Manual Assign Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-[#e6e9ef] w-full max-w-md rounded-2xl shadow-[12px_12px_24px_rgba(0,0,0,0.2)] p-6">
            <div className="flex justify-between items-center mb-6">
              <Typography variant="h5" color="blue-gray" className="font-bold">Manual Driver Assignment</Typography>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-500 hover:text-gray-800 transition-colors">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Select Unassigned Driver</label>
                <select 
                  className="w-full h-12 px-4 rounded-xl bg-[#f0f2f5] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] border-none outline-none font-medium text-gray-700"
                  value={selectedDriverId}
                  onChange={(e) => setSelectedDriverId(e.target.value)}
                >
                  <option value="">-- Choose Driver --</option>
                  {unassignedDrivers.map(d => (
                    <option key={d._id} value={d._id}>{d.name} ({d.email})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Select Truck</label>
                <select 
                  className="w-full h-12 px-4 rounded-xl bg-[#f0f2f5] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] border-none outline-none font-medium text-gray-700"
                  value={selectedTruckId}
                  onChange={(e) => setSelectedTruckId(e.target.value)}
                >
                  <option value="">-- Choose Truck --</option>
                  {detailedTrucks.map(t => (
                    <option key={t._id} value={t._id}>
                      TRK-{t._id.slice(-4).toUpperCase()} - {t.truckType} {t.assignedDriver ? '(Already Assigned)' : '(Empty)'}
                    </option>
                  ))}
                </select>
                {selectedTruckId && detailedTrucks.find(t => t._id === selectedTruckId)?.assignedDriver && (
                  <p className="text-xs text-amber-600 mt-2 font-medium">
                    Note: This truck already has a driver. Proceeding will replace the driver.
                  </p>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 h-12 bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] rounded-xl font-bold text-gray-700 hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-all">
                  Cancel
                </button>
                <button 
                  onClick={handleManualAssign}
                  className="flex-1 h-12 bg-[#6cf3b7] text-[#145c39] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] rounded-xl font-bold hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15)] transition-all">
                  Assign Driver
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
