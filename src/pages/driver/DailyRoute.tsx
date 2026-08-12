import { useState, useEffect, useRef, useMemo } from "react";
import { Typography, Card, CardBody } from "../../lib/mt-components";
import {
  MapPinIcon,
  ExclamationTriangleIcon,
  FlagIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { useJsApiLoader, GoogleMap, MarkerF, Polyline, DirectionsRenderer } from "@react-google-maps/api";
import { getDriverMyRoutes, getSingleRoute, finishDriverSession } from "../../lib/api";

/* ─── Types ────────────────────────────────────────────────────────── */

interface RouteStop {
  id: string;
  address: string;
  area: string;
  time: string;
  status: "completed" | "current" | "upcoming";
  wasteType: string;
  lat?: number;
  lng?: number;
}

/* ─── Static Data ──────────────────────────────────────────────────── */

const ROUTE_STOPS: RouteStop[] = [
  { id: "S-001", address: "12 Lake View Rd", area: "Colombo 03", time: "06:15", status: "completed", wasteType: "Organic" },
  { id: "S-002", address: "45 Temple Lane", area: "Colombo 05", time: "06:42", status: "completed", wasteType: "Recyclable" },
  { id: "S-003", address: "78 Park Avenue", area: "Colombo 07", time: "07:10", status: "completed", wasteType: "Organic" },
  { id: "S-004", address: "23 Galle Face Terrace", area: "Colombo 03", time: "07:35", status: "current", wasteType: "General" },
  { id: "S-005", address: "91 Baseline Road", area: "Colombo 09", time: "08:00", status: "upcoming", wasteType: "Organic" },
  { id: "S-006", address: "15 Duplication Road", area: "Colombo 04", time: "08:25", status: "upcoming", wasteType: "Recyclable" },
  { id: "S-007", address: "67 Havelock Road", area: "Colombo 06", time: "08:50", status: "upcoming", wasteType: "Organic" },
];

const containerStyle = {
  width: "100%",
  height: "100%",
};

const LIGHT_MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#f8f9fa" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "on" }, { opacity: 50 }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#525252" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f8f9fa" }] },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{ color: "#bdbdbd" }]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#f1f3f4" }]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#5f6368" }]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#e8f0fe" }]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#3c4043" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [{ color: "#ffffff" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [{ color: "#feeeb3" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#fdd663" }]
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.fill",
    stylers: [{ color: "#fdc145" }]
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [{ color: "#70757a" }]
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [{ color: "#e8eaed" }]
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [{ color: "#e8eaed" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#d2e5fc" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#70757a" }]
  }
];

const DARK_MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }]
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }]
  }
];

/* ─── Component ────────────────────────────────────────────────────── */

export function DailyRoute() {
  const [stops, setStops] = useState<RouteStop[]>(ROUTE_STOPS);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const [assignedRoutes, setAssignedRoutes] = useState<any[]>([]);
  const [truckDetails, setTruckDetails] = useState<any>(null);
  const [routePolylines, setRoutePolylines] = useState<{lat: number, lng: number}[][]>([]);
  
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [lastNavLocation, setLastNavLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await getDriverMyRoutes();
        if (res.truck) {
          setTruckDetails(res.truck);
          localStorage.setItem('currentTruckId', res.truck._id || res.truck.id);
        }
        
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setAssignedRoutes(res.data);
          localStorage.setItem('currentRouteId', res.data[0].routeId || res.data[0]._id);
          
          const allLines: {lat: number, lng: number}[][] = [];
          const allStops: RouteStop[] = [];

          // We fetch the full route data for each assigned route to get the proper OSRM routeSegments
          // because the basic route.coordinates array might be unordered or missing street curves.
          const fullRoutes = await Promise.all(
            res.data.map(async (route: any) => {
              try {
                const fullRouteRes = await getSingleRoute(route.routeId || route._id);
                return fullRouteRes.data || fullRouteRes;
              } catch (e) {
                console.error("Failed to fetch full route details", e);
                return route; // fallback to basic data
              }
            })
          );

          fullRoutes.forEach((route: any) => {
            // Extract properly ordered route segments that follow roads
            if (route.routeSegments && Array.isArray(route.routeSegments)) {
              route.routeSegments.forEach((seg: any) => {
                if (seg.coordinates && Array.isArray(seg.coordinates)) {
                  allLines.push(seg.coordinates.map((p: number[]) => ({ lat: p[1], lng: p[0] })));
                }
              });
            } else if (route.coordinates && Array.isArray(route.coordinates)) {
              // Fallback to basic coordinates if segments are missing
              allLines.push(route.coordinates.map((p: number[]) => ({ lat: p[1], lng: p[0] })));
            }
            
            // Extract collection points (array of [lng, lat])
            if (route.collectionPoints && Array.isArray(route.collectionPoints)) {
              route.collectionPoints.forEach((cp: number[], index: number) => {
                allStops.push({
                  id: `S-${route.routeId || route._id}-${index}`,
                  address: `Collection Point ${index + 1}`,
                  area: route.clusterGroupId || "Route Area",
                  time: "Pending",
                  status: "upcoming",
                  wasteType: "Mixed",
                  lat: cp[1],
                  lng: cp[0]
                });
              });
            }
          });

          // Set the first stop as current if any exist
          if (allStops.length > 0) {
            allStops[0].status = "current";
            setStops(allStops);
          }

          setRoutePolylines(allLines);
        }
      } catch (err) {
        console.error("Failed to fetch driver routes", err);
      }
    };
    fetchRoutes();
  }, []);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey || "",
  });

  const completedCount = stops.filter((s) => s.status === "completed").length;
  const totalStops = stops.length;
  const currentStop = stops.find((s) => s.status === "current");

  // Geolocation tracking
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // Calculate Live Navigation Route
  useEffect(() => {
    if (!currentLocation || stops.length === 0 || !window.google) return;
    
    // Find the next active stop
    const currentStop = stops.find((s) => s.status === 'current');
    if (!currentStop || !currentStop.lat || !currentStop.lng) return;

    // Throttle API requests by roughly ~50 meters difference
    if (lastNavLocation) {
       const latDiff = Math.abs(currentLocation.lat - lastNavLocation.lat);
       const lngDiff = Math.abs(currentLocation.lng - lastNavLocation.lng);
       if (latDiff < 0.0005 && lngDiff < 0.0005) return; 
    }

    setLastNavLocation(currentLocation);

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: currentLocation,
        destination: { lat: currentStop.lat, lng: currentStop.lng },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Error fetching live directions: ${status}`);
        }
      }
    );
  }, [currentLocation, stops, lastNavLocation]);

  const mapOptions = useMemo(() => ({
    styles: isDarkMode ? DARK_MAP_STYLE : LIGHT_MAP_STYLE,
    disableDefaultUI: true,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  }), [isDarkMode]);

  const truckIcon = useMemo(() => {
    if (!window.google) return undefined;
    return {
      path: "M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z M6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z M18 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z",
      fillColor: "#22c55e", // premium green
      fillOpacity: 1,
      strokeWeight: 1.5,
      strokeColor: "#166534",
      scale: 1.5,
      anchor: new window.google.maps.Point(12, 12),
    };
  }, [isLoaded]);

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    if (routePolylines.length > 0 && window.google) {
      const bounds = new window.google.maps.LatLngBounds();
      routePolylines.forEach(line => {
        line.forEach(point => {
          bounds.extend(point);
        });
      });
      map.fitBounds(bounds);
    }
  };

  const onMapUnmount = () => {
    mapRef.current = null;
  };

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.setZoom((mapRef.current.getZoom() || 15) + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.setZoom((mapRef.current.getZoom() || 15) - 1);
    }
  };

  useEffect(() => {
    if (mapRef.current && routePolylines.length > 0 && window.google) {
      const bounds = new window.google.maps.LatLngBounds();
      routePolylines.forEach(line => {
        line.forEach(point => {
          bounds.extend(point);
        });
      });
      mapRef.current.fitBounds(bounds);
      
      // add a little padding
      setTimeout(() => {
         if (mapRef.current) {
           mapRef.current.setZoom((mapRef.current.getZoom() || 15) - 1);
         }
      }, 300);
    }
  }, [routePolylines]);

  const handleRecenter = () => {
    if (mapRef.current && currentLocation) {
      mapRef.current.panTo(currentLocation);
      mapRef.current.setZoom(16);
    }
  };
  
  const handleCompleteRoute = async () => {
    const sessionId = localStorage.getItem('activeDriverSessionId');
    if (!sessionId) {
      return alert("No active shift found. Please start your shift from the sidebar first.");
    }
    
    if (!currentLocation) {
      return alert("Waiting for live GPS location. Please ensure location services are enabled.");
    }
    
    setIsFinishing(true);
    try {
      const coords = [currentLocation.lng, currentLocation.lat];

      const res = await finishDriverSession(sessionId, { coordinates: coords });
      if (res.success) {
        localStorage.removeItem('activeDriverSessionId');
        alert("Shift completed successfully!");
        window.location.reload(); 
      }
    } catch (err) {
      console.error(err);
      alert("Failed to complete shift");
    } finally {
      setIsFinishing(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* ── Info Cards Row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Next Destination */}
        <Card className="bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-4 sm:p-5">
            <Typography className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
              Next Destination
            </Typography>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                <ExclamationTriangleIcon className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <Typography className="font-bold text-base text-gray-800">
                  {truckDetails ? `Truck: ${truckDetails.plateNo}` : "Loading..."}
                </Typography>
                <Typography className="text-sm text-gray-500 font-medium">
                  {currentStop?.address || "Route Complete"}
                </Typography>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Distance Card */}
        <Card className="bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] rounded-2xl border-none">
          <CardBody className="p-4 sm:p-5">
            <Typography className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
              Distance
            </Typography>
            <Typography className="font-extrabold text-3xl text-gray-800">
              12.4 <span className="text-lg font-bold text-gray-500">mi</span>
            </Typography>
          </CardBody>
        </Card>
      </div>

      {/* ── Map Placeholder + Route Stops ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <Card className="bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] rounded-2xl border-none h-full min-h-[350px] sm:min-h-[450px]">
            <CardBody className="p-0 h-full flex flex-col">
              {/* Map visual */}
              <div className="flex-1 relative bg-[#e8edf3] rounded-t-2xl overflow-hidden min-h-[350px] sm:min-h-[450px]">
                {(!apiKey || loadError) ? (
                  // Fallback Mockup Map when API Key is missing or failed to load
                  <>
                    {/* Decorative Grid */}
                    <div 
                      className="absolute inset-0 opacity-[0.15]" 
                      style={{
                        backgroundImage: "radial-gradient(#4b5563 1px, transparent 1px)",
                        backgroundSize: "32px 32px"
                      }}
                    ></div>

                    {/* Simulated City Roads */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
                      <path d="M 600 0 L 800 0 L 800 600 L 750 600 Q 700 300 600 0" fill="#d2e0eb" opacity="0.6"/>
                      <path d="M 0 400 Q 150 450 300 600 L 0 600 Z" fill="#dcedd9" opacity="0.5"/>
                      
                      <g stroke="#ffffff" strokeWidth="4" opacity="0.8" fill="none" strokeLinecap="round">
                        <path d="M -50 100 L 850 150" />
                        <path d="M -50 350 L 850 300" />
                        <path d="M 200 -50 L 250 650" />
                        <path d="M 500 -50 L 450 650" />
                        <path d="M 100 100 L 150 350" />
                        <path d="M 200 200 L 500 220" />
                        <path d="M 400 320 L 450 550" />
                      </g>
                      
                      <path
                        d="M 100 100 L 200 120 L 250 260 L 450 240 L 500 450 L 700 420"
                        stroke="#1a5c2e"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        opacity="0.3"
                      />
                      <path
                        d="M 100 100 L 200 120 L 250 260 L 450 240 L 500 450 L 700 420"
                        stroke="#4ade80"
                        strokeWidth="4"
                        strokeDasharray="12 12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />

                      <circle cx="100" cy="100" r="6" fill="#1a5c2e" />
                      <circle cx="200" cy="120" r="6" fill="#1a5c2e" />
                      <circle cx="250" cy="260" r="6" fill="#1a5c2e" />
                      <circle cx="500" cy="450" r="5" fill="#a0aec0" />
                      <circle cx="700" cy="420" r="5" fill="#a0aec0" />
                      <circle cx="450" cy="240" r="14" fill="#1a5c2e" opacity="0.2" />
                      <circle cx="450" cy="240" r="6" fill="#1a5c2e" />
                    </svg>

                    {/* Area labels */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 z-10 flex gap-2">
                      <div className="flex items-center gap-1.5">
                        <MapPinIcon className="w-3.5 h-3.5 text-[#1a5c2e]" />
                        <Typography className="text-xs font-bold text-gray-700">Colombo District</Typography>
                      </div>
                      <div className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-200 flex items-center">
                        Mockup Map (Set VITE_GOOGLE_MAPS_API_KEY in .env)
                      </div>
                    </div>

                    {/* Simulated Truck */}
                    <div className="absolute top-[40%] left-[56%] transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-[#1a5c2e]/20 animate-ping absolute -inset-2"></div>
                        <div className="w-8 h-8 rounded-lg bg-[#1a5c2e] text-white flex items-center justify-center shadow-[0_8px_16px_rgba(0,0,0,0.3)] transform -rotate-12">
                          <TruckIcon className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </>
                ) : !isLoaded ? (
                  // Map Loading State
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
                    <div className="w-12 h-12 rounded-full border-4 border-t-green-500 border-green-200 animate-spin mb-4"></div>
                    <Typography className="text-sm font-semibold text-gray-500">Loading Map Services...</Typography>
                  </div>
                ) : (
                  // Real Google Map
                  <>
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={currentLocation || { lat: 6.9271, lng: 79.8612 }}
                      zoom={14}
                      onLoad={onMapLoad}
                      onUnmount={onMapUnmount}
                      options={mapOptions}
                    >
                      {currentLocation && (
                        <MarkerF
                          position={currentLocation}
                          icon={truckIcon}
                          title="Your Location"
                        />
                      )}
                      {routePolylines.map((line, idx) => (
                        <Polyline
                          key={`poly-${idx}`}
                          path={line}
                          options={{ strokeColor: '#186f45', strokeWeight: 5, strokeOpacity: 0.8 }}
                        />
                      ))}
                      
                      {directions && (
                        <DirectionsRenderer
                          directions={directions}
                          options={{
                            suppressMarkers: true, // we handle our own markers
                            polylineOptions: {
                              strokeColor: '#3b82f6', // Bright blue for live routing path
                              strokeWeight: 6,
                              strokeOpacity: 0.9,
                              zIndex: 10 // Draw over the green planned route
                            }
                          }}
                        />
                      )}
                    </GoogleMap>

                    {/* Controls & Overlays */}
                    <div className="absolute top-4 left-4 flex gap-2 z-10">
                      <div className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 flex items-center gap-1.5">
                        <MapPinIcon className="w-3.5 h-3.5 text-[#1a5c2e]" />
                        <Typography className="text-xs font-bold text-gray-700">
                          Colombo District
                        </Typography>
                      </div>

                      <button 
                        onClick={() => setIsDarkMode(!isDarkMode)} 
                        className="p-2 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 hover:bg-gray-50 text-gray-700 hover:text-[#1a5c2e] transition-all flex items-center justify-center cursor-pointer"
                        title="Toggle Dark/Light Map Theme"
                      >
                        {isDarkMode ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                          </svg>
                        )}
                      </button>

                      {currentLocation && (
                        <button 
                          onClick={handleRecenter} 
                          className="p-2 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 hover:bg-gray-50 text-gray-700 hover:text-[#1a5c2e] transition-all flex items-center justify-center cursor-pointer"
                          title="Recenter to My Location"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Scale + Zoom controls */}
                    <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
                      <button 
                        onClick={handleZoomIn}
                        className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur shadow-[4px_4px_10px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-[#1a5c2e] transition-all cursor-pointer font-bold text-lg"
                      >
                        +
                      </button>
                      <button 
                        onClick={handleZoomOut}
                        className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur shadow-[4px_4px_10px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-[#1a5c2e] transition-all cursor-pointer font-bold text-lg"
                      >
                        -
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Complete Route Button */}
              <div className="p-3">
                <button 
                  onClick={handleCompleteRoute}
                  disabled={isFinishing}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold bg-[#1a5c2e] shadow-[4px_4px_10px_#c4c7cc,-4px_-4px_10px_#ffffff] hover:bg-[#155025] active:shadow-[inset_3px_3px_6px_#0f3a1b,inset_-3px_-3px_6px_#1f7e37] transition-all duration-200 disabled:opacity-70"
                >
                  <FlagIcon className="w-5 h-5" />
                  {isFinishing ? "Completing..." : "Complete Route"}
                </button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Route Stops List */}
        <div className="lg:col-span-1">
          <Card className="bg-[#e6e9ef] shadow-[8px_8px_16px_#c4c7cc,-8px_-8px_16px_#ffffff] rounded-2xl border-none">
            <CardBody className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <Typography className="font-bold text-base text-gray-800">Route Stops</Typography>
                <span className="text-xs font-bold text-[#629955] bg-[#e8f5e3] px-2.5 py-1 rounded-full">
                  {completedCount}/{totalStops}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-[#d9dce1] shadow-[inset_2px_2px_4px_#c4c7cc,inset_-2px_-2px_4px_#ffffff] mb-5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#629955] to-[#7db96e] transition-all duration-500"
                  style={{ width: `${(completedCount / totalStops) * 100}%` }}
                ></div>
              </div>

              {/* Stops list */}
              <div className="space-y-1 overflow-y-auto max-h-[450px] pr-2 custom-scrollbar">
                {stops.map((stop, index) => (
                  <div
                    key={stop.id}
                    className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-200 ${
                      stop.status === "current"
                        ? "bg-[#e0f0db] shadow-[inset_2px_2px_4px_#c4dfc0,inset_-2px_-2px_4px_#f2fff0]"
                        : stop.status === "completed"
                        ? "opacity-60"
                        : ""
                    }`}
                  >
                    {/* Timeline indicator */}
                    <div className="flex flex-col items-center gap-0.5 pt-0.5 flex-shrink-0">
                      {stop.status === "completed" ? (
                        <CheckCircleIcon className="w-5 h-5 text-[#629955]" />
                      ) : stop.status === "current" ? (
                        <div className="w-5 h-5 rounded-full border-[3px] border-[#629955] bg-white flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#629955] animate-pulse"></div>
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white"></div>
                      )}
                      {index < stops.length - 1 && (
                        <div className={`w-0.5 h-6 ${stop.status === "completed" ? "bg-[#629955]/40" : "bg-gray-200"}`}></div>
                      )}
                    </div>

                    {/* Stop info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <Typography className={`font-semibold text-sm ${stop.status === "current" ? "text-[#3d6e32]" : "text-gray-700"}`}>
                          {stop.address}
                        </Typography>
                        <Typography className="text-[10px] text-gray-400 font-medium flex-shrink-0 ml-2">
                          {stop.time}
                        </Typography>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Typography className="text-[11px] text-gray-400">{stop.area}</Typography>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <Typography className="text-[11px] text-gray-400">{stop.wasteType}</Typography>
                      </div>
                    </div>

                    {/* Action for current stop */}
                    {stop.status === "current" && (
                      <button className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#629955] flex items-center justify-center shadow-sm hover:bg-[#527f47] transition-colors">
                        <ChevronRightIcon className="w-4 h-4 text-white" strokeWidth={3} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}