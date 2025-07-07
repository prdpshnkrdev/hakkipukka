"use client";

import { useEffect, useState } from "react";
import HotspotCard from "./components/HotspotCard";
import { fetchSpeciesByHotspot } from "./lib/ebird";
import { getHotspotsWithFallback } from "./utils/locationUtils";
import "leaflet/dist/leaflet.css";
import { TileLayer, Marker, Popup, useMap } from "react-leaflet";
import BirdImage from "./components/BirdImage";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./components/LeafletMap"), {
  ssr: false,
});

export default function HotspotsPage() {
  const [hotspots, setHotspots] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<
    [number, number] | null
  >(null);
  const [radius, setRadius] = useState<number>(25); // in kilometers
  const [search, setSearch] = useState<string>("");
  const [selectedSpecies, setSelectedSpecies] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const MapUpdater = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, 16);
    }, [center, map]);
    return null;
  };

  useEffect(() => {
    getHotspotsWithFallback(radius).then(({ data, error }) => {
      if (data) setHotspots(data);
      if (error) setError(error);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radius]);

  const center =
    hotspots.length > 0
      ? [hotspots[0].lat, hotspots[0].lng]
      : [12.9716, 77.5946];

  // Filter hotspots by search keyword
  const filteredHotspots = hotspots.filter((spot) =>
    spot.locName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="w-full p-2">
      {!error && hotspots.length === 0 && <p>Loading hotspots...</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Map Section - 2/3 width */}
        <div
          className={`transition-all duration-500 ${
            selectedLocation
              ? "md:col-span-1 h-[400px]"
              : "md:col-span-2 h-[800px]"
          }`}
        >
          {hasMounted && (
            <LeafletMap
              key={selectedLocation ? "selected" : "default"}
              hotspots={filteredHotspots}
              selectedLocation={selectedLocation}
              onSelectHotspot={async (
                lat: number,
                lng: number,
                locId: string
              ) => {
                setSelectedLocation([lat, lng]);
                const species = await fetchSpeciesByHotspot(locId);
                setSelectedSpecies(species);
              }}
            />
          )}
          {error && <p className="text-yellow-700">{error}</p>}
        </div>

        {/* Hotspot List Section - 1/3 width, scrollable */}
        <div
          className={`overflow-y-auto pr-2 transition-all duration-500 ${
            selectedLocation
              ? "md:col-span-2 h-[1040px]"
              : "md:col-span-1 h-[800px]"
          }`}
        >
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium">
                  Search by Name
                </label>
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-full"
                  placeholder="E.g. Lalbagh"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Radius (km)</label>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-24"
                  min={1}
                  max={100}
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                />
              </div>
            </div>
            {selectedLocation && (
              <div className="mb-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => {
                    setSelectedLocation(null);
                    setSelectedSpecies([]);
                  }}
                >
                  ← Back to All Hotspots
                </button>
              </div>
            )}
            {filteredHotspots.map((spot: any) => {
              const isSelected =
                selectedLocation?.[0] === spot.lat &&
                selectedLocation?.[1] === spot.lng;

              if (!isSelected && selectedLocation) return null;

              return (
                <div key={spot.locId}>
                  <HotspotCard
                    name={spot.locName}
                    locId={spot.locId}
                    lat={spot.lat}
                    lng={spot.lng}
                    directionsUrl={`https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`}
                    onClick={async () => {
                      setSelectedLocation([spot.lat, spot.lng]);
                      const species = await fetchSpeciesByHotspot(spot.locId);
                      setSelectedSpecies(species);
                    }}
                  />
                  {isSelected && (
                    <div className="mt-4 p-4 border rounded bg-white shadow">
                      <h2 className="text-xl font-bold mb-2">
                        Species seen at {spot.locName}
                      </h2>
                      {selectedSpecies.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1 max-h-96 overflow-y-auto">
                          {selectedSpecies.map((s: any) => (
                            <li
                              key={s.speciesCode}
                              className="flex items-center gap-3"
                            >
                              <BirdImage comName={s.comName} />
                              <span>{s.comName}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600">
                          No species data available at this location.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
