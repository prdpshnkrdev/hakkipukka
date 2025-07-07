"use client";

import React, { useEffect, useState } from "react";
import { getHotspotsWithFallback } from "../utils/locationUtils";

interface Hotspot {
  locId: string;
  locName: string;
}

export default function HotspotSidebar({ radius = 25 }: { radius?: number }) {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotspots = async () => {
      try {
        getHotspotsWithFallback(radius).then(({ data, error }) => {
          if (data) setHotspots(data);
          if (error) setError(error);
        });
      } catch (error) {
        console.error("Failed to fetch hotspots:", error);
      }
    };

    fetchHotspots();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radius]);

  return (
    <div className="h-[400px] overflow-y-auto pr-2">
      <h2 className="font-semibold mb-2">Nearby Hotspots</h2>
      <ul className="space-y-2 text-sm">
        {hotspots.length > 0 ? (
          hotspots.map((hotspot) => (
            <li
              key={hotspot.locId}
              className="p-2 bg-white rounded shadow hover:bg-green-100 cursor-pointer"
            >
              {hotspot.locName}
            </li>
          ))
        ) : (
          <li className="text-gray-500 italic">Loading hotspots...</li>
        )}
      </ul>
    </div>
  );
}
