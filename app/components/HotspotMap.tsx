"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Hotspot {
  locId: string;
  locName: string;
  lat: number;
  lng: number;
}

interface Props {
  center: [number, number];
  hotspots: Hotspot[];
  onMarkerClick: (hotspot: Hotspot) => void;
}

export default function HotspotMap({ center, hotspots, onMarkerClick }: Props) {
  return (
    <MapContainer center={center} zoom={12} className="h-full w-full">
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hotspots.map((spot) => (
        <Marker
          key={spot.locId}
          position={[spot.lat, spot.lng]}
          eventHandlers={{ click: () => onMarkerClick(spot) }}
        >
          <Popup>{spot.locName}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
