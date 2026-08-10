import { useState, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import { Typography, Card, CardBody, Button } from "../../lib/mt-components";
import { CheckCircleIcon, MapPinIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { saveCollectionPoint, checkLocationAvailability, addMyLocation } from "../../lib/api";

const containerStyle = {
  width: "100%",
  height: "100%",
  position: "absolute" as const,
  top: 0,
  left: 0,
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
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#d2e5fc" }]
  },
];

export function SelectCollectionPoint() {
  const location = useLocation();
  const navigate = useNavigate();
  const [points, setPoints] = useState<any[]>(location.state?.collectionPoints || []);
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null);
  const [loading, setLoading] = useState(!location.state?.collectionPoints);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey || "",
  });

  useEffect(() => {
    if (!location.state?.collectionPoints) {
      // Fetch points if not passed in state
      checkLocationAvailability()
        .then(async (res) => {
          if (res.hasLocation && !res.hasCollectionPoint && res.residentLatitude && res.residentLongitude) {
            const locRes = await addMyLocation({
              residentLatitude: res.residentLatitude,
              residentLongitude: res.residentLongitude
            });
            if (locRes.collectionPoints && locRes.collectionPoints.success) {
              setPoints(locRes.collectionPoints.data);
            } else {
              setError("Failed to load collection points.");
            }
          } else {
             // Invalid state, redirect to dashboard or add location
             navigate("/citizen");
          }
        })
        .catch((err) => {
          setError(err.message || "An error occurred fetching data.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [location.state, navigate]);

  const mapOptions = useMemo(() => ({
    styles: LIGHT_MAP_STYLE,
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  }), []);

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    if (points.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      points.forEach((p) => {
        if (p.location?.coordinates) {
          bounds.extend({ lng: p.location.coordinates[0], lat: p.location.coordinates[1] });
        }
      });
      map.fitBounds(bounds);
    }
  };

  const handleSave = async () => {
    if (!selectedPointId) return;
    try {
      setSaving(true);
      await saveCollectionPoint({ collectionPointId: selectedPointId });
      // Force reload or redirect to let Guard re-verify
      window.location.href = "/citizen/dashboard";
    } catch (err: any) {
      setError(err.message || "Failed to save collection point.");
      setSaving(false);
    }
  };



  return (
    <div className="max-w-7xl mx-auto w-full h-full flex flex-col gap-5 py-4 px-4 sm:px-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
        <div>
          <Typography variant="h4" color="blue-gray" className="font-bold text-xl">
            Select Collection Point
          </Typography>
          <Typography variant="small" color="gray" className="text-sm mt-0.5">
            Choose the nearest collection point for your waste disposal.
          </Typography>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 flex-1 min-h-[600px]">
        {/* Map Area */}
        <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none flex-[2] min-h-[400px]">
          <CardBody className="p-3 h-full flex flex-col">
            <div className="flex-1 relative bg-[#e8edf3] rounded-xl overflow-hidden shadow-inner border border-gray-200">
              {(!apiKey || loadError) ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
                   <ExclamationTriangleIcon className="w-12 h-12 text-amber-500 mb-3" />
                   <Typography className="text-lg font-bold text-gray-700">Map Unavailable</Typography>
                 </div>
              ) : !isLoaded || loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
                  <div className="w-12 h-12 rounded-full border-4 border-t-green-500 border-green-200 animate-spin mb-4"></div>
                  <Typography className="text-sm font-semibold text-gray-500">Loading Map Services...</Typography>
                </div>
              ) : (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={points[0] ? { lat: points[0].location.coordinates[1], lng: points[0].location.coordinates[0] } : { lat: 6.9271, lng: 79.8612 }}
                  zoom={15}
                  onLoad={onMapLoad}
                  options={mapOptions}
                >
                  {points.map((p) => {
                    const lat = p.location.coordinates[1];
                    const lng = p.location.coordinates[0];
                    const isSelected = p._id === selectedPointId;
                    return (
                      <MarkerF
                        key={p._id}
                        position={{ lat, lng }}
                        title={p.roadName || "Collection Point"}
                        onClick={() => setSelectedPointId(p._id)}
                        icon={{
                           url: isSelected ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png" : "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                        }}
                      />
                    );
                  })}
                </GoogleMap>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Sidebar */}
        <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none flex-1 flex flex-col overflow-hidden max-h-full">
          <CardBody className="p-5 flex flex-col h-full gap-4">
            <Typography variant="h6" color="blue-gray" className="font-bold">
              Nearby Points ({points.length})
            </Typography>
            
            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-2 rounded-lg text-sm border border-red-100">
                <ExclamationTriangleIcon className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {loading && <div className="text-gray-500 text-sm">Loading points...</div>}
              {!loading && points.length === 0 && !error && (
                <div className="text-gray-500 text-sm">No collection points found.</div>
              )}
              {points.map((p) => (
                <div
                  key={p._id}
                  onClick={() => setSelectedPointId(p._id)}
                  className={`p-4 rounded-xl cursor-pointer border transition-all duration-200 ${
                    selectedPointId === p._id
                      ? "border-[#629955] bg-[#eef6ec] shadow-sm"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <MapPinIcon className={`w-5 h-5 shrink-0 mt-0.5 ${selectedPointId === p._id ? "text-[#629955]" : "text-gray-400"}`} />
                    <div>
                      <Typography className="text-sm font-semibold text-gray-800">
                        {p.roadName || "Unnamed Road"}
                      </Typography>
                      <Typography className="text-xs text-gray-500 mt-1">
                        Distance: {p.distanceAlongEdge}m
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-200 mt-auto">
              <Button
                onClick={handleSave}
                disabled={!selectedPointId || saving}
                className="w-full flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-base font-bold text-white bg-[#629955] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:bg-[#4d7e42] transition-colors duration-200 normal-case disabled:opacity-50 disabled:shadow-none"
              >
                <CheckCircleIcon className="w-5 h-5" strokeWidth={2.5} />
                {saving ? "Saving..." : "Confirm Selection"}
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
