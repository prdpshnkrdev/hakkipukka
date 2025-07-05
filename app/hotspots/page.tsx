"use client";

import { useEffect, useState } from "react";
import HotspotCard from "../components/HotspotCard";
import { fetchHotspots } from "../lib/ebird";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

export default function HotspotsPage() {
  const [hotspots, setHotspots] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<
    [number, number] | null
  >(null);

  const MapUpdater = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, 13);
    }, [center, map]);
    return null;
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const data = await fetchHotspots(lat, lng);
            setHotspots(data);
          } catch (err) {
            setError("Failed to load hotspots.");
          }
        },
        async () => {
          // Fallback to Bangalore coordinates
          const defaultLat = 12.9716;
          const defaultLng = 77.5946;
          try {
            const data = await fetchHotspots(defaultLat, defaultLng);
            setHotspots(data);
            setError(
              "Location access denied. Showing default (Bangalore) hotspots."
            );
          } catch {
            setError("Failed to load default hotspots.");
          }
        }
      );
    } else {
      setError("Geolocation not supported.");
    }
  }, []);

  const center =
    hotspots.length > 0
      ? [hotspots[0].lat, hotspots[0].lng]
      : [12.9716, 77.5946];

  return (
    <section className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Nearby Birding Hotspots</h1>
      {error && <p className="text-yellow-700">{error}</p>}
      {!error && hotspots.length === 0 && <p>Loading hotspots...</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Map Section - 2/3 width */}
        <div className="md:col-span-2 h-[750px]">
          <MapContainer
            center={center}
            zoom={10}
            scrollWheelZoom={true}
            className="h-full w-full z-0"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {hotspots.map((spot) => (
              <Marker key={spot.locId} position={[spot.lat, spot.lng]}>
                <Popup>{spot.locName}</Popup>
              </Marker>
            ))}
            {selectedLocation && <MapUpdater center={selectedLocation} />}
          </MapContainer>
        </div>

        {/* Hotspot List Section - 1/3 width, scrollable */}
        <div className="h-[750px] overflow-y-auto pr-2">
          <div className="space-y-4">
            {hotspots.map((spot: any) => (
              <HotspotCard
                key={spot.locId}
                name={spot.locName}
                locId={spot.locId}
                lat={spot.lat}
                lng={spot.lng}
                onClick={() => setSelectedLocation([spot.lat, spot.lng])}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
