"use client";

import React from "react";

export default function HeaderBar() {
  return (
    <header className="flex justify-between items-center px-4 py-2 bg-white shadow">
      <div className="text-xl font-bold">Hakkipukka</div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search Hotspot"
          className="border rounded px-2 py-1"
        />
        <input
          type="number"
          placeholder="Radius (km)"
          className="border rounded px-2 py-1 w-24"
        />
      </div>
    </header>
  );
}
