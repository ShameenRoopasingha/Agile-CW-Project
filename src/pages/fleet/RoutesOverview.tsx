import { useState, useEffect } from "react";
import { Typography, Card, Alert } from "../../lib/mt-components";
import { EyeIcon, TrashIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { generateWeeklyRoutes, deleteAllRoutesForWeek, getAllRoutePlans, getRoutesForPlan, getSingleRoute, randomlyAssignTrucks, manuallyAssignTruck, unassignTruck, unassignAllTrucks, getAvailableTrucks } from "../../lib/api";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";






export function RoutesOverview() {
  const [activeTab, setActiveTab] = useState("Weekly Overview");
  const [routes, setRoutes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Using the documentation example date
  const [weekStartDate, setWeekStartDate] = useState("2026-08-03");

  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const [selectedMapRouteId, setSelectedMapRouteId] = useState<string | null>(null);

  const [routePolylines, setRoutePolylines] = useState<[number, number][][]>([]);
  const [isMapLoading, setIsMapLoading] = useState(false);

  // Truck Assignment State
  const [isAssigning, setIsAssigning] = useState(false);
  const [isRandomAssigning, setIsRandomAssigning] = useState(false);
  const [isUnassigningAll, setIsUnassigningAll] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedRouteForAssign, setSelectedRouteForAssign] = useState<any>(null);
  const [availableTrucks, setAvailableTrucks] = useState<any[]>([]);
  const [selectedTruckId, setSelectedTruckId] = useState<string>("");

  const fetchPlans = async () => {
    try {
      const res = await getAllRoutePlans();
      const fetchedPlans = res.plans || [];
      setPlans(fetchedPlans);
      if (fetchedPlans.length > 0) {
        // Select the newest plan by default if nothing is selected
        if (!selectedPlanId || !fetchedPlans.find((p: any) => p.planId === selectedPlanId)) {
          setSelectedPlanId(fetchedPlans[0].planId);
        }
      } else {
        setSelectedPlanId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRoutes = async () => {
    if (!selectedPlanId) {
      setRoutes([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await getRoutesForPlan(selectedPlanId);
      setRoutes(response.routes || response || []);
    } catch (err: any) {
      if (err.status === 404) {
        setRoutes([]);
      } else {
        setError(err.message || "Failed to fetch routes");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    fetchRoutes();
  }, [selectedPlanId]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      await generateWeeklyRoutes({ weekStartDate });
      await fetchPlans(); // Refresh the plans list (newest will be selected automatically)
      setActiveTab("Weekly Overview"); // Switch back to overview
    } catch (err: any) {
      setError(err.message || "Failed to generate routes");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete all routes for the week starting ${weekStartDate}?`)) return;

    setIsDeleting(true);
    setError(null);
    try {
      await deleteAllRoutesForWeek(weekStartDate);
      await fetchPlans(); // Refresh plans list (should be empty for that week now)
    } catch (err: any) {
      setError(err.message || "Failed to delete routes");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleViewMap = async (routeId: string) => {
    setSelectedMapRouteId(routeId);
    setActiveTab("Route Map View");
    setIsMapLoading(true);
    setRoutePolylines([]);

    try {
      const res = await getSingleRoute(routeId);
      const routeData = res.data || res; // Handle if data is wrapped or direct

      // Extract polylines from segments
      if (routeData.routeSegments && Array.isArray(routeData.routeSegments)) {
        const segmentLines = routeData.routeSegments
          .filter((seg: any) => seg.coordinates && Array.isArray(seg.coordinates) && seg.coordinates.length > 0)
          .map((seg: any) => seg.coordinates.map((p: number[]) => [p[1], p[0]] as [number, number]));
        setRoutePolylines(segmentLines);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsMapLoading(false);
    }
  };

  const handleRandomAssign = async () => {
    if (!selectedPlanId) return;
    setIsRandomAssigning(true);
    setError(null);
    try {
      await randomlyAssignTrucks(selectedPlanId);
      await fetchRoutes();
    } catch (err: any) {
      setError(err.message || "Failed to random assign trucks");
    } finally {
      setIsRandomAssigning(false);
    }
  };

  const handleUnassignAll = async () => {
    if (!selectedPlanId) return;
    if (!window.confirm("Are you sure you want to unassign all trucks in this plan?")) return;
    setIsUnassigningAll(true);
    setError(null);
    try {
      await unassignAllTrucks(selectedPlanId);
      await fetchRoutes();
    } catch (err: any) {
      setError(err.message || "Failed to unassign all trucks");
    } finally {
      setIsUnassigningAll(false);
    }
  };

  const handleOpenAssignModal = async (route: any) => {
    setSelectedRouteForAssign(route);
    setIsAssignModalOpen(true);
    setSelectedTruckId("");
    setAvailableTrucks([]);
    
    if (selectedPlanId && route.dayOfWeek !== undefined) {
      try {
        const res = await getAvailableTrucks(selectedPlanId, route.dayOfWeek);
        setAvailableTrucks(res.availableTrucks || []);
      } catch (err: any) {
        setError("Failed to fetch available trucks.");
      }
    }
  };

  const handleManualAssign = async () => {
    if (!selectedRouteForAssign || !selectedTruckId) return;
    setIsAssigning(true);
    setError(null);
    try {
      await manuallyAssignTruck({ routeId: selectedRouteForAssign.routeId, truckId: selectedTruckId });
      setIsAssignModalOpen(false);
      await fetchRoutes();
    } catch (err: any) {
      setError(err.message || "Failed to assign truck manually.");
    } finally {
      setIsAssigning(false);
    }
  };

  const handleUnassignTruck = async (routeId: string) => {
    if (!window.confirm("Unassign this truck?")) return;
    setIsAssigning(true);
    setError(null);
    try {
      await unassignTruck(routeId);
      await fetchRoutes();
    } catch (err: any) {
      setError(err.message || "Failed to unassign truck.");
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6 relative">

      {/* Header Tabs */}
      <div className="flex gap-8 border-b border-gray-300/50 pb-2 shrink-0">
        {["Weekly Overview", "Generate Routes", "Route Map View"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-1 text-lg font-bold transition-all ${activeTab === tab
                ? "text-[#145c39] border-b-4 border-[#6cf3b7]"
                : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {error && (
        <Alert color="red" className="font-medium text-sm">
          {error}
        </Alert>
      )}

      {activeTab === "Generate Routes" ? (
        <div className="flex flex-col gap-6 w-full pb-8">
          <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none p-12 flex flex-col items-center justify-center">
            <Typography variant="h4" color="blue-gray" className="font-bold mb-4">
              Generate Route Plan
            </Typography>

            <div className="mb-8 flex flex-col items-center gap-6 w-full max-w-md">
              <Typography color="gray" className="text-center">
                Select the week start date to trigger the RouteG algorithm to build optimal collection routes. This process may take a few moments.
              </Typography>
              <div className="bg-[#f0f2f5] px-6 py-4 rounded-xl shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] flex items-center justify-between w-full">
                <span className="font-bold text-[#145c39] text-sm">Week Start Date:</span>
                <input
                  type="date"
                  value={weekStartDate}
                  onChange={(e) => setWeekStartDate(e.target.value)}
                  className="bg-transparent border-none outline-none font-medium text-gray-700 cursor-pointer text-right"
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !weekStartDate}
              className="px-8 py-4 bg-[#6cf3b7] text-[#145c39] rounded-xl font-bold text-lg flex items-center gap-3 shadow-[6px_6px_12px_#c4c7cc,-6px_-6px_12px_#ffffff] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15)] transition-all disabled:opacity-50"
            >
              {isGenerating ? <ArrowPathIcon className="w-6 h-6 animate-spin" /> : <ArrowPathIcon className="w-6 h-6" />}
              {isGenerating ? "Generating..." : "Run Optimization Algorithm"}
            </button>
          </Card>

          <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none p-6">
            <Typography variant="h5" color="blue-gray" className="font-bold mb-6 px-2">
              Previously Created Plans
            </Typography>
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-max table-auto text-left border-collapse">
                <thead className="bg-[#f0f2f5] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.05)]">
                  <tr>
                    {["Plan ID", "Week Start Date", "Total Routes", "Generated At", "Status"].map((head) => (
                      <th key={head} className="p-4 py-5">
                        <Typography variant="small" color="blue-gray" className="font-bold tracking-wider text-xs text-gray-600 uppercase">
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plans.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500 font-medium">
                        No plans created yet.
                      </td>
                    </tr>
                  ) : (
                    plans.map((plan, index) => {
                      const isLast = index === plans.length - 1;
                      const classes = isLast ? "p-4" : "p-4 border-b border-gray-300/50";

                      return (
                        <tr key={plan.planId || index} className="hover:bg-[#f0f2f5]/50 transition-colors">
                          <td className={classes}>
                            <Typography variant="small" className="font-bold text-[#186f45] text-sm">{plan.planId}</Typography>
                          </td>
                          <td className={classes}>
                            <Typography variant="small" className="font-medium text-gray-800 text-sm">
                              {plan.weekStartDate ? new Date(plan.weekStartDate).toLocaleDateString() : 'N/A'}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography variant="small" className="font-medium text-gray-800 text-sm">
                              {plan.stats?.totalRoutes || 0}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography variant="small" className="font-medium text-gray-800 text-sm">
                              {plan.createdAt ? new Date(plan.createdAt).toLocaleString() : 'N/A'}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <div className={`inline-block px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${plan.status === 'Active' ? 'bg-[#d0ebd6]/80 text-[#2c5126] border border-[#6cf3b7]' :
                                'bg-gray-200/80 text-gray-600 border border-gray-300'
                              }`}>
                              {plan.status || 'Unknown'}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      ) : activeTab === "Weekly Overview" ? (
        <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none flex-1 flex flex-col min-h-[400px]">
          {/* Controls Row */}
          <div className="p-4 sm:p-6 border-b border-gray-300/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#f0f2f5] px-4 py-2.5 rounded-xl shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] text-sm font-bold text-[#145c39] flex items-center gap-2">
                <span>Plan:</span>
                <select
                  className="bg-transparent border-none outline-none cursor-pointer"
                  value={selectedPlanId || ""}
                  onChange={(e) => setSelectedPlanId(e.target.value)}
                >
                  <option value="" disabled>No plans available</option>
                  {plans.map(p => (
                    <option key={p.planId} value={p.planId}>{p.planId}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
                {["All", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <button
                    key={day}
                    className={`h-9 px-4 rounded-full text-xs font-bold transition-all shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] border ${day === 'All'
                        ? 'bg-[#186f45] text-[#6cf3b7] border-[#186f45]'
                        : 'bg-[#e6e9ef] text-gray-600 border-transparent hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff]'
                      }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

               {routes.length > 0 && (
                 <>
                   <button 
                     onClick={handleRandomAssign}
                     disabled={isRandomAssigning}
                     className="h-10 px-4 bg-[#6cf3b7] text-[#145c39] rounded-xl shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] font-bold text-xs hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15)] transition-shadow flex items-center gap-2"
                   >
                     {isRandomAssigning ? "Assigning..." : "Auto Assign"}
                   </button>
                   <button 
                     onClick={handleUnassignAll}
                     disabled={isUnassigningAll}
                     className="h-10 px-4 bg-orange-100 text-orange-700 rounded-xl shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] font-bold text-xs hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)] transition-shadow flex items-center gap-2"
                   >
                     {isUnassigningAll ? "Unassigning..." : "Unassign All"}
                   </button>
                   <button 
                     onClick={handleDelete}
                     disabled={isDeleting}
                     className="h-10 px-4 bg-red-100 text-red-600 rounded-xl shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] font-bold text-xs hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)] transition-shadow flex items-center gap-2"
                   >
                     <TrashIcon className="w-4 h-4" />
                     {isDeleting ? "Deleting..." : "Clear Week"}
                   </button>
                 </>
               )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto w-full flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-48">
                <Typography color="gray" className="font-bold animate-pulse">Loading routes...</Typography>
              </div>
            ) : routes.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-center p-6">
                <Typography variant="h6" color="blue-gray" className="mb-2">No routes generated yet</Typography>
                <Typography variant="small" color="gray" className="mb-4 max-w-sm">
                  Switch to the "Generate Routes" tab to run the optimization algorithm for this week.
                </Typography>
                <button
                  onClick={() => setActiveTab("Generate Routes")}
                  className="px-6 py-2 bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] rounded-xl text-[#145c39] font-bold text-sm hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff]"
                >
                  Generate Now
                </button>
              </div>
            ) : (
              <table className="w-full min-w-max table-auto text-left border-collapse">
                <thead className="bg-[#f0f2f5] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.05)]">
                  <tr>
                    {["Route ID", "Day", "Demand (kg)", "Distance (m)", "Assigned Truck", "Status", "Action"].map((head) => (
                      <th key={head} className="p-4 py-5">
                        <Typography variant="small" color="blue-gray" className="font-bold tracking-wider text-xs text-gray-600 uppercase">
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routes.map((route, index) => {
                    const isLast = index === routes.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-gray-300/50";

                    return (
                      <tr key={route.routeId || index} className="hover:bg-[#f0f2f5]/50 transition-colors">
                        <td className={classes}>
                          <Typography variant="small" className="font-bold text-[#186f45] text-sm">{route.routeId}</Typography>
                        </td>
                        <td className={classes}>
                          <div className="bg-[#e6e9ef] shadow-[inset_1px_1px_3px_#c4c7cc,inset_-1px_-1px_3px_#ffffff] rounded px-3 py-1 inline-block text-xs font-bold text-gray-700">
                            {route.dayName || "Unknown"}
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography variant="small" className="font-medium text-gray-800 text-sm">{route.totalDemand}</Typography>
                        </td>
                        <td className={classes}>
                          <Typography variant="small" className="font-medium text-gray-800 text-sm">{route.totalLength}</Typography>
                        </td>
                        <td className={classes}>
                          {!route.assignedTruck ? (
                            <button
                              onClick={() => handleOpenAssignModal(route)}
                              className="px-3 py-1 rounded text-[11px] font-bold inline-flex items-center gap-1 text-amber-600 border border-amber-300 bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer"
                            >
                              <span className="text-amber-500">⚠</span> Pending (Assign)
                            </button>
                          ) : (
                            <div className="flex items-center gap-2">
                              <div className="bg-[#d0ebd6]/80 text-[#2c5126] border border-[#6cf3b7] shadow-[inset_1px_1px_2px_#c4c7cc,inset_-1px_-1px_2px_#ffffff] px-3 py-1 rounded text-[11px] font-bold inline-flex items-center">
                                {typeof route.assignedTruck === 'object' ? route.assignedTruck.truckId : "Assigned"}
                              </div>
                              <button
                                onClick={() => handleUnassignTruck(route.routeId)}
                                className="text-red-500 hover:text-red-700 text-xs font-bold"
                                title="Unassign Truck"
                              >
                                ✕
                              </button>
                            </div>
                          )}
                        </td>
                        <td className={classes}>
                          <div className={`inline-block px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${route.status === 'Generated' ? 'bg-[#d0ebd6]/80 text-[#2c5126] border border-[#6cf3b7]' :
                              'bg-gray-200/80 text-gray-600 border border-gray-300'
                            }`}>
                            {route.status || 'Active'}
                          </div>
                        </td>
                        <td className={classes}>
                          <button
                            onClick={() => handleViewMap(route.routeId)}
                            className="p-2 bg-[#e6e9ef] shadow-[2px_2px_5px_#c4c7cc,-2px_-2px_5px_#ffffff] rounded-lg text-gray-500 hover:text-[#186f45] hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] transition-all"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </Card>
      ) : activeTab === "Route Map View" ? (
        <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none flex-1 overflow-hidden min-h-[500px] flex flex-col p-4 relative z-0">
          {selectedMapRouteId ? (
            <>
              <div className="mb-4">
                <Typography variant="h6" color="blue-gray">Route: {selectedMapRouteId}</Typography>
                <Typography variant="small" color="gray">
                  {isMapLoading ? "Loading route segments..." : `Showing ${routePolylines.length} route segments.`}
                </Typography>
              </div>
              <div className="flex-1 w-full rounded-xl overflow-hidden shadow-[inset_4px_4px_8px_#c4c7cc,inset_-4px_-4px_8px_#ffffff] relative z-0">
                <MapContainer
                  key={selectedMapRouteId}
                  center={routePolylines.length > 0 && routePolylines[0].length > 0 ? routePolylines[0][0] : [6.9271, 79.8612]}
                  zoom={14}
                  style={{ height: "100%", width: "100%", zIndex: 0 }}
                >
                  {/* Using CARTO Voyager for a cleaner, modern look that matches Neumorphism well */}
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {/* No collection points are loaded per latest requirement */}
                  {routePolylines.map((line, idx) => (
                    <Polyline
                      key={`poly-${idx}`}
                      positions={line}
                      pathOptions={{ color: '#186f45', weight: 5, opacity: 0.8 }}
                    />
                  ))}
                </MapContainer>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <Typography variant="h6" color="gray">No Route Selected</Typography>
              <Typography variant="small" color="gray" className="mb-4 text-center max-w-sm">
                Go to the Weekly Overview and click the eye icon next to a route to view its path on the map.
              </Typography>
              <button
                onClick={() => setActiveTab("Weekly Overview")}
                className="px-6 py-2 bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] rounded-xl text-[#145c39] font-bold text-sm hover:shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff]"
              >
                Go back to Overview
              </button>
            </div>
          )}
        </Card>
      ) : null}

      {/* Manual Assign Modal */}
      {isAssignModalOpen && selectedRouteForAssign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl p-6 w-full max-w-md m-4">
            <Typography variant="h5" color="blue-gray" className="font-bold mb-4">
              Assign Truck to {selectedRouteForAssign.routeId}
            </Typography>
            
            <div className="mb-6 flex flex-col gap-2">
              <Typography variant="small" color="gray" className="font-medium">
                Day: {selectedRouteForAssign.dayName}
              </Typography>
              <Typography variant="small" color="gray" className="font-medium">
                Demand: {selectedRouteForAssign.totalDemand} kg
              </Typography>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-2">Available Trucks</label>
              {availableTrucks.length === 0 ? (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-200">
                  No trucks available for this day.
                </div>
              ) : (
                <select 
                  className="w-full bg-[#f0f2f5] px-4 py-3 rounded-xl shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] border-none outline-none font-medium text-gray-700"
                  value={selectedTruckId}
                  onChange={(e) => setSelectedTruckId(e.target.value)}
                >
                  <option value="" disabled>Select a truck...</option>
                  {availableTrucks.map(truck => (
                    <option key={truck._id} value={truck._id}>
                      {truck.truckId || truck._id} ({truck.truckType} - {truck.volumeCapacity})
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsAssignModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleManualAssign}
                disabled={!selectedTruckId || isAssigning}
                className="px-4 py-2 bg-[#6cf3b7] text-[#145c39] rounded-xl font-bold text-sm shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.15)] transition-all disabled:opacity-50"
              >
                {isAssigning ? "Assigning..." : "Assign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
