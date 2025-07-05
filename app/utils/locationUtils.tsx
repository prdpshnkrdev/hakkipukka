import { fetchHotspots } from "../lib/ebird";

export async function getHotspotsWithFallback(
  radius: number
): Promise<{ data: any; error: string | null }> {
  try {
    const coords = await new Promise<GeolocationCoordinates>(
      (resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation not supported."));
        } else {
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos.coords),
            () => reject(new Error("Location access denied."))
          );
        }
      }
    );

    const lat = coords.latitude;
    const lng = coords.longitude;
    const data = await fetchHotspots(lat, lng, radius);
    return { data, error: null };
  } catch (err: any) {
    const fallbackLat = 12.9716;
    const fallbackLng = 77.5946;
    try {
      const data = await fetchHotspots(fallbackLat, fallbackLng, radius);
      return {
        data,
        error:
          (err.message || "Failed to load hotspots.") +
          " Showing default (Bangalore) hotspots.",
      };
    } catch {
      return { data: null, error: "Failed to load hotspots." };
    }
  }
}
