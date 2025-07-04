import HotspotCard from "../components/HotspotCard";
import { fetchHotspots } from "../lib/ebird";

export default async function HotspotsPage() {
  // Sample: Nandi Hills area
  const lat = 13.3392;
  const lng = 77.1135;

  const hotspots = await fetchHotspots(lat, lng);

  return (
    <section className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Nearby Birding Hotspots</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hotspots.map((spot: any) => (
          <HotspotCard
            key={spot.locId}
            name={spot.locName}
            locId={spot.locId}
            lat={spot.lat}
            lng={spot.lng}
          />
        ))}
      </div>
    </section>
  );
}
