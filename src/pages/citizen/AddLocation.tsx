import { useState, useRef, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import { addMyLocation } from "../../lib/api";
import { Typography, Card, CardBody, Button } from "../../lib/mt-components";
import {
  MapPinIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const containerStyle = {
  width: "100%",
  height: "100%",
  position: "absolute" as const,
  top: 0,
  left: 0,
};

// Use the same map styles from DailyRoute if desired or keep it standard.
// Using a standard light map style for simplicity here.
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

export function AddLocation() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const mapRef = useRef<google.maps.Map | null>(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey || "",
  });

  // Check if they already have a location
  useEffect(() => {
    const saved = localStorage.getItem("citizenLocation");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.lat && parsed.lng) {
          setSelectedLocation(parsed);
        }
      } catch (e) {
        // ignore parsing errors
      }
    }
  }, []);

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
  };

  const onMapUnmount = () => {
    mapRef.current = null;
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setSelectedLocation({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
      setLocationError("");
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setSelectedLocation(newLoc);
        setIsLocating(false);
        if (mapRef.current) {
          mapRef.current.panTo(newLoc);
          mapRef.current.setZoom(16);
        }
      },
      (error) => {
        setIsLocating(false);
        setLocationError("Unable to retrieve your location. Please check your browser permissions.");
        console.error("Geolocation error:", error);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleSaveLocation = async () => {
    if (selectedLocation) {
      try {
        setIsLocating(true);
        const res = await addMyLocation({
          residentLatitude: selectedLocation.lat,
          residentLongitude: selectedLocation.lng
        });

        if (res.collectionPoints && res.collectionPoints.success) {
          navigate("/citizen/select-collection-point", {
            state: { collectionPoints: res.collectionPoints.data }
          });
        } else {
          setLocationError("Failed to fetch nearby collection points.");
        }
      } catch (err: any) {
        setLocationError(err.message || "An error occurred while saving location.");
      } finally {
        setIsLocating(false);
      }
    } else {
      setLocationError("Please select a location on the map first.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full h-full flex flex-col gap-5 py-4 px-4 sm:px-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
        <div>
          <Typography variant="h4" color="blue-gray" className="font-bold text-xl">
            Add Your Location
          </Typography>
          <Typography variant="small" color="gray" className="text-sm mt-0.5">
            Help us serve you better by specifying your exact residence on the map.
          </Typography>
        </div>
      </div>

      {/* ── Main Content ── */}
      <Card className="bg-[#e6e9ef] shadow-[12px_12px_24px_#c4c7cc,-12px_-12px_24px_#ffffff] rounded-2xl border-none flex-1 min-h-[600px]">
        <CardBody className="p-5 flex flex-col h-full gap-5">

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button
              onClick={handleUseMyLocation}
              disabled={isLocating}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#1a5c2e] bg-[#e6e9ef] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_5px_#c4c7cc,inset_-2px_-2px_5px_#ffffff] transition-shadow duration-300 normal-case"
            >
              <MapPinIcon className="w-5 h-5" />
              {isLocating ? "Locating..." : "Use My Current Location"}
            </Button>

            {locationError && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1.5 rounded-lg text-sm border border-red-100 flex-1 justify-center sm:justify-start">
                <ExclamationTriangleIcon className="w-4 h-4 shrink-0" />
                <span>{locationError}</span>
              </div>
            )}
          </div>

          {/* Map Area */}
          <div className="flex-1 relative bg-[#e8edf3] rounded-2xl overflow-hidden shadow-inner border border-gray-200 min-h-[450px]">
            {(!apiKey || loadError) ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
                <ExclamationTriangleIcon className="w-12 h-12 text-amber-500 mb-3" />
                <Typography className="text-lg font-bold text-gray-700">Map Unavailable</Typography>
                <Typography className="text-sm text-gray-500 mt-2">
                  Please ensure your VITE_GOOGLE_MAPS_API_KEY is properly set in the .env file.
                </Typography>
              </div>
            ) : !isLoaded ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
                <div className="w-12 h-12 rounded-full border-4 border-t-green-500 border-green-200 animate-spin mb-4"></div>
                <Typography className="text-sm font-semibold text-gray-500">Loading Map Services...</Typography>
              </div>
            ) : (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={selectedLocation || { lat: 6.9271, lng: 79.8612 }} // Default to Colombo
                zoom={13}
                onLoad={onMapLoad}
                onUnmount={onMapUnmount}
                options={mapOptions}
                onClick={handleMapClick}
              >
                {selectedLocation && (
                  <MarkerF
                    position={selectedLocation}
                    title="Your Residence"
                    animation={window.google.maps.Animation.DROP}
                  />
                )}
              </GoogleMap>
            )}

            {/* Instruction overlay */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm shadow-md border border-gray-100 flex items-center gap-2 z-10 pointer-events-none">
              <Typography className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                {selectedLocation ? "Location selected. Click elsewhere to change." : "Click on the map to pin your location"}
              </Typography>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex justify-end pt-2 border-t border-gray-200">
            <Button
              onClick={handleSaveLocation}
              disabled={!selectedLocation}
              className="flex items-center gap-2 px-8 py-3 rounded-xl text-base font-bold text-white bg-[#629955] shadow-[4px_4px_8px_#c4c7cc,-4px_-4px_8px_#ffffff] hover:bg-[#4d7e42] transition-colors duration-200 normal-case disabled:opacity-50 disabled:shadow-none"
            >
              <CheckCircleIcon className="w-5 h-5" strokeWidth={2.5} />
              Save Location & Continue
            </Button>
          </div>

        </CardBody>
      </Card>
    </div>
  );
}
