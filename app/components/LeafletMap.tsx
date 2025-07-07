"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

export default function LeafletMap({
  hotspots,
  selectedLocation,
  onSelectHotspot,
}: any) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // Prevent SSR hydration errors

  const center =
    hotspots.length > 0
      ? [hotspots[0].lat, hotspots[0].lng]
      : [12.9716, 77.5946];

  const MapUpdater = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, 16);
    }, [center, map]);
    return null;
  };

  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom={true}
      className="h-full w-full z-0"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hotspots.map((spot: any) => (
        <Marker
          key={spot.locId}
          position={[spot.lat, spot.lng]}
          eventHandlers={{
            click: () => {
              onSelectHotspot(spot.lat, spot.lng, spot.locId);
              setTimeout(() => {
                const el = document.getElementById(spot.locId);
                if (el) {
                  const yOffset = -80;
                  const y =
                    el.getBoundingClientRect().top +
                    window.pageYOffset +
                    yOffset;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }, 0);
            },
          }}
        >
          <Popup>
            {spot.locName}
            <div className="mt-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
      {selectedLocation && <MapUpdater center={selectedLocation} />}
    </MapContainer>
  );
}
