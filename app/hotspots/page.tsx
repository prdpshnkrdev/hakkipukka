"use client";

import { useEffect, useState } from "react";
import HotspotCard from "../components/HotspotCard";
import { fetchHotspots, fetchSpeciesByHotspot } from "../lib/ebird";
import { getHotspotsWithFallback } from "../utils/locationUtils";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import BirdImage from "../components/BirdImage";

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
    <section className="w-full mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Nearby Birding Hotspots</h1>
      {/* Filter UI */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium">Search by Name</label>
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
            {filteredHotspots.map((spot) => (
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
            {filteredHotspots.map((spot: any) => (
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
                    console.log("Fetched species:", species);
                    setSelectedSpecies(species);
                    setModalOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Species seen at{" "}
              {
                filteredHotspots.find(
                  (h) =>
                    [h.lat, h.lng].toString() === selectedLocation?.toString()
                )?.locName
              }
            </h2>
            {selectedSpecies.length > 0 ? (
              <ul className="list-disc list-inside space-y-1 max-h-96 overflow-y-auto">
                {selectedSpecies.map((s: any) => (
                  <li key={s.speciesCode} className="flex items-center gap-3">
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
            <div className="mt-6 text-right">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation?.[0]},${selectedLocation?.[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
