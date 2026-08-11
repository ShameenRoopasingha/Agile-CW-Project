import { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Card, CardBody } from "../../lib/mt-components";
import { TruckIcon, WrenchScrewdriverIcon, PlusIcon, Squares2X2Icon, ListBulletIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

const TRUCKS_API = "/routeg-api/driver-assignments/detailed-trucks";

export function FleetManagement() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [trucks, setTrucks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    plateNo: "",
    truckType: "Compactor",
    maxWeight: 5000,
    volumeCapacity: "12-14 m³",
    truckStatus: "Active",
    depotLong: 79.8612,
    depotLat: 6.9271,
    disposeLong: 79.8732,
    disposeLat: 6.9412
  });

  const fetchTrucks = async () => {
    setIsLoading(true);
    try {
      if (activeSearch) {
        const res = await axios.get(`/routeg-api/trucks/plate/${encodeURIComponent(activeSearch)}`);
        const data = res.data.data || res.data;
        let result = data ? (Array.isArray(data) ? data : [data]) : [];
        if (result.length > 0 && !result[0]._id) {
           result = [];
        }
        setTrucks(result);
      } else if (typeFilter !== "All Types") {
        const res = await axios.get(`/routeg-api/trucks/type/${typeFilter}`);
        let result = Array.isArray(res.data.data) ? res.data.data : (Array.isArray(res.data) ? res.data : []);
        if (statusFilter !== "All Statuses") {
          result = result.filter(t => t.truckStatus === statusFilter || t.truckStatus === statusFilter.toUpperCase());
        }
        setTrucks(result);
      } else if (statusFilter !== "All Statuses") {
        const res = await axios.get(`/routeg-api/trucks/status/${statusFilter}`);
        const result = Array.isArray(res.data.data) ? res.data.data : (Array.isArray(res.data) ? res.data : []);
        setTrucks(result);
      } else {
        const res = await axios.get(TRUCKS_API);
        if (res.data && res.data.success) {
          setTrucks(res.data.data);
        } else if (Array.isArray(res.data)) {
          setTrucks(res.data);
        } else {
          setTrucks([]);
        }
      }
    } catch (error) {
      console.error("Error fetching trucks:", error);
      setTrucks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrucks();
  }, [activeSearch, typeFilter, statusFilter]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setActiveSearch(searchInput.trim());
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this truck?")) return;
    try {
      await axios.delete(`/routeg-api/trucks/${id}`);
      fetchTrucks();
    } catch (error) {
      console.error("Error deleting truck:", error);
      alert("Failed to delete truck.");
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      // Create optimistic update locally to make UI feel snappier, then refetch
      setTrucks(prev => prev.map(t => t._id === id ? { ...t, truckStatus: newStatus } : t));
      await axios.put(`/routeg-api/trucks/${id}`, { truckStatus: newStatus });
      fetchTrucks();
    } catch (error) {
      console.error("Error updating truck status:", error);
      alert("Failed to update truck status.");
      fetchTrucks(); // revert optimistic update on fail
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        plateNo: formData.plateNo,
        truckType: formData.truckType,
        maxWeight: Number(formData.maxWeight),
        volumeCapacity: formData.volumeCapacity,
        truckStatus: formData.truckStatus,
        depotPoint: { coordinates: [Number(formData.depotLong), Number(formData.depotLat)] },
        disposePoint: { coordinates: [Number(formData.disposeLong), Number(formData.disposeLat)] }
      };
      await axios.post("/routeg-api/trucks", payload);
      setIsAddModalOpen(false);
      fetchTrucks();
    } catch (error) {
      console.error("Error adding truck:", error);
      alert("Failed to add truck.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeCount = trucks.filter(t => t.truckStatus === "Active" || t.truckStatus === "ACTIVE").length;
  const maintCount = trucks.filter(t => t.truckStatus === "Maintenance" || t.truckStatus === "MAINT.").length;

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6 relative">
      
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 shrink-0">
         <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-6 flex justify-between items-center">
            <div>
              <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider mb-1 text-xs">Total Fleet</Typography>
              <Typography variant="h3" color="blue-gray" className="font-bold text-3xl">{trucks.length}</Typography>
            </div>
            <TruckIcon className="w-8 h-8 text-gray-400" />
          </CardBody>
         </Card>
         
         <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-6 flex justify-between items-center">
            <div>
              <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider mb-1 text-xs">Active Trucks</Typography>
              <Typography variant="h3" color="green" className="font-bold text-3xl text-[#2c5126]">{activeCount}</Typography>
            </div>
            <div className="w-3 h-3 rounded-full bg-[#6cf3b7] shadow-[0_0_10px_#6cf3b7]"></div>
          </CardBody>
         </Card>

         <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-6 flex justify-between items-center">
            <div>
              <Typography variant="small" color="gray" className="font-bold uppercase tracking-wider mb-1 text-xs">In Maintenance</Typography>
              <Typography variant="h3" color="amber" className="font-bold text-3xl text-amber-600">{maintCount}</Typography>
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
            <input 
              type="text" 
              placeholder="Search Plate No (Press Enter)..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="bg-transparent border-none outline-none w-full text-sm text-gray-700 font-medium placeholder-gray-400" 
            />
            {activeSearch && (
              <button onClick={() => { setSearchInput(""); setActiveSearch(""); }} className="text-gray-400 hover:text-gray-600">
                <XMarkIcon className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="h-12 px-4 rounded-xl bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] text-sm font-bold text-gray-700 border-none outline-none hidden sm:block"
          >
            <option value="All Types">All Types</option>
            <option value="Compactor">Compactor</option>
            <option value="Tipper">Tipper</option>
          </select>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-12 px-4 rounded-xl bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] text-sm font-bold text-gray-700 border-none outline-none hidden sm:block"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Inactive">Inactive</option>
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
          <button onClick={() => setIsAddModalOpen(true)} className="h-12 px-5 bg-[#6cf3b7] text-[#145c39] rounded-xl font-bold text-sm flex items-center gap-2 shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15)] transition-all flex-1 sm:flex-none justify-center">
            <PlusIcon className="w-5 h-5" />
            Add Truck
          </button>
        </div>
      </div>

      {/* Truck Grid */}
      <div className="flex-1 overflow-y-auto pb-6">
        {isLoading ? (
          <div className="w-full text-center p-8 text-gray-500 font-medium">Loading fleet data...</div>
        ) : trucks.length === 0 ? (
          <div className="w-full text-center p-8 text-gray-500 font-medium">No trucks found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {trucks.map(truck => {
              const displayId = truck.plateNo || `TRK-${truck._id.slice(-4).toUpperCase()}`;
              const isAssigned = truck.driverDetails || truck.assignedDriver;
              const driverName = truck.driverDetails?.name || "Assigned Driver";
              
              return (
                <Card key={truck._id} className="bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] rounded-2xl border-none">
                  <CardBody className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#f0f2f5] flex items-center justify-center shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff]">
                          <TruckIcon className="w-6 h-6 text-gray-700" />
                        </div>
                        <div>
                          <Typography variant="h6" color="blue-gray" className="font-bold">{displayId}</Typography>
                          <Typography variant="small" className="text-gray-500 font-medium text-xs">{truck.truckType}</Typography>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <select 
                          value={truck.truckStatus || 'Active'}
                          onChange={(e) => handleStatusUpdate(truck._id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider outline-none cursor-pointer text-center appearance-none ${
                            (truck.truckStatus === 'Active' || truck.truckStatus === 'ACTIVE')
                              ? 'bg-[#d0ebd6]/80 text-[#2c5126] border border-[#6cf3b7]' 
                              : (truck.truckStatus === 'Maintenance' || truck.truckStatus === 'MAINT.')
                              ? 'bg-amber-100/80 text-amber-800 border border-amber-300'
                              : 'bg-gray-200 text-gray-700 border border-gray-300'
                          }`}
                        >
                          <option value="Active">ACTIVE</option>
                          <option value="Maintenance">MAINTENANCE</option>
                          <option value="Inactive">INACTIVE</option>
                        </select>
                        <button onClick={() => handleDelete(truck._id)} className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-[#f0f2f5] p-3 rounded-xl shadow-[inset_1px_1px_3px_#c4c7cc,inset_-1px_-1px_3px_#ffffff]">
                        <Typography variant="small" className="text-[10px] uppercase text-gray-500 font-bold mb-1">Max Weight</Typography>
                        <Typography variant="h6" className="text-gray-800">{truck.maxWeight} kg</Typography>
                      </div>
                      <div className="bg-[#f0f2f5] p-3 rounded-xl shadow-[inset_1px_1px_3px_#c4c7cc,inset_-1px_-1px_3px_#ffffff]">
                        <Typography variant="small" className="text-[10px] uppercase text-gray-500 font-bold mb-1">Volume</Typography>
                        <Typography variant="h6" className="text-gray-800">{truck.volumeCapacity}</Typography>
                      </div>
                    </div>

                    <div className="h-px w-full bg-gray-300 shadow-[inset_0_1px_1px_#c4c7cc] mb-4"></div>

                    <div className="flex items-center gap-3">
                      {isAssigned ? (
                        <>
                          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold shadow-[2px_2px_4px_#c4c7cc,-2px_-2px_4px_#ffffff]">
                            {driverName.charAt(0)}
                          </div>
                          <Typography variant="small" className="font-bold text-sm text-gray-700">{driverName}</Typography>
                        </>
                      ) : (
                        <Typography variant="small" className="font-medium text-sm text-gray-400 italic">Unassigned</Typography>
                      )}
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Truck Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-[#e6e9ef] w-full max-w-lg rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <Typography variant="h5" color="blue-gray" className="font-bold">Add New Truck</Typography>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-gray-800">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 block">Plate No</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. WP-1234"
                  value={formData.plateNo}
                  onChange={e => setFormData({...formData, plateNo: e.target.value})}
                  className="w-full h-11 px-3 rounded-xl bg-[#f0f2f5] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] border-none outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Truck Type</label>
                  <select 
                    value={formData.truckType} 
                    onChange={e => setFormData({...formData, truckType: e.target.value})}
                    className="w-full h-11 px-3 rounded-xl bg-[#f0f2f5] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] border-none outline-none text-sm"
                  >
                    <option value="Compactor">Compactor</option>
                    <option value="Tipper">Tipper</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Status</label>
                  <select 
                    value={formData.truckStatus} 
                    onChange={e => setFormData({...formData, truckStatus: e.target.value})}
                    className="w-full h-11 px-3 rounded-xl bg-[#f0f2f5] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] border-none outline-none text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Max Weight (kg)</label>
                  <input 
                    type="number" 
                    required
                    value={formData.maxWeight}
                    onChange={e => setFormData({...formData, maxWeight: Number(e.target.value)})}
                    className="w-full h-11 px-3 rounded-xl bg-[#f0f2f5] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] border-none outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Volume Capacity</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 12-14 m³"
                    value={formData.volumeCapacity}
                    onChange={e => setFormData({...formData, volumeCapacity: e.target.value})}
                    className="w-full h-11 px-3 rounded-xl bg-[#f0f2f5] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] border-none outline-none text-sm"
                  />
                </div>
              </div>
              
              <div className="border-t border-gray-300 my-2"></div>
              
              <Typography variant="small" className="font-bold text-gray-600">Depot Coordinates</Typography>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Longitude</label>
                  <input 
                    type="number" step="any" required
                    value={formData.depotLong}
                    onChange={e => setFormData({...formData, depotLong: Number(e.target.value)})}
                    className="w-full h-11 px-3 rounded-xl bg-[#f0f2f5] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] border-none outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Latitude</label>
                  <input 
                    type="number" step="any" required
                    value={formData.depotLat}
                    onChange={e => setFormData({...formData, depotLat: Number(e.target.value)})}
                    className="w-full h-11 px-3 rounded-xl bg-[#f0f2f5] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] border-none outline-none text-sm"
                  />
                </div>
              </div>

              <Typography variant="small" className="font-bold text-gray-600">Dispose Coordinates</Typography>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Longitude</label>
                  <input 
                    type="number" step="any" required
                    value={formData.disposeLong}
                    onChange={e => setFormData({...formData, disposeLong: Number(e.target.value)})}
                    className="w-full h-11 px-3 rounded-xl bg-[#f0f2f5] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] border-none outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Latitude</label>
                  <input 
                    type="number" step="any" required
                    value={formData.disposeLat}
                    onChange={e => setFormData({...formData, disposeLat: Number(e.target.value)})}
                    className="w-full h-11 px-3 rounded-xl bg-[#f0f2f5] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] border-none outline-none text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 rounded-xl text-gray-700 font-bold hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 bg-[#6cf3b7] text-[#145c39] rounded-xl font-bold shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15)] transition-all disabled:opacity-50">
                  {isSubmitting ? "Adding..." : "Add Truck"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
