export async function fetchHotspots(lat: number, lng: number, radius?: number) {
  const apiKey = process.env.NEXT_PUBLIC_EBIRD_API_KEY;

  const res = await fetch(
    `https://api.ebird.org/v2/ref/hotspot/geo?lat=${lat}&lng=${lng}&fmt=json${
      radius ? `&radius=${radius}` : ""
    }`,
    {
      headers: {
        "X-eBirdApiToken": apiKey!,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch hotspots");
  }

  const data = await res.json();
  return data;
}

export async function fetchSpeciesByHotspot(hotspotId: string) {
  const apiKey = process.env.NEXT_PUBLIC_EBIRD_API_KEY;

  const res = await fetch(
    `https://api.ebird.org/v2/data/obs/${hotspotId}/recent`,
    {
      headers: {
        "X-eBirdApiToken": apiKey!,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch eBird species by hotspot");
  }

  const data = await res.json();
  console.log("Fetched species data:", data);
  return data;
}

export async function fetchChecklist(locId: string) {
  // For now this wraps fetchSpeciesByHotspot but allows us to later expand
  return await fetchSpeciesByHotspot(locId);
}
