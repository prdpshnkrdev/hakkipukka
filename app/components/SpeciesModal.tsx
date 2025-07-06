"use client";

import React from "react";

interface Species {
  comName: string;
  speciesCode: string;
}

interface Props {
  species: Species[];
  hotspotName: string;
  onClose: () => void;
  directionsUrl: string;
}

export default function SpeciesModal({
  species,
  hotspotName,
  onClose,
  directionsUrl,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Birds at {hotspotName}</h2>
        {species.length ? (
          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {species.map((s) => (
              <li key={s.speciesCode} className="flex gap-2 items-center">
                <span>🦜</span>
                <span>{s.comName}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No species data available.</p>
        )}
        <div className="mt-4 flex justify-end gap-3">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Close
          </button>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
}
