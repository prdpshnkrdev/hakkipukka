export async function fetchHotspots(lat: number, lng: number) {
  const apiKey = process.env.NEXT_PUBLIC_EBIRD_API_KEY;

  const res = await fetch(
    `https://api.ebird.org/v2/ref/hotspot/geo?lat=${lat}&lng=${lng}&fmt=json`,
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
// export async function fetchSpecies(lat: number, lng: number, dist = 30) {
//   const apiKey = process.env.NEXT_PUBLIC_EBIRD_API_KEY;

//   const res = await fetch(
//     `https://api.ebird.org/v2/data/obs/geo/recent?lat=${lat}&lng=${lng}&dist=${dist}`,
//     {
//       headers: {
//         "X-eBirdApiToken": apiKey!,
//       },
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch eBird species");
//   }

//   const data = await res.json();
//   return data;
// }
// export async function fetchSpeciesByHotspot(hotspotId: string) {
//   const apiKey = process.env.NEXT_PUBLIC_EBIRD_API_KEY;

//   const res = await fetch(
//     `https://api.ebird.org/v2/data/obs/${hotspotId}/recent`,
//     {
//       headers: {
//         "X-eBirdApiToken": apiKey!,
//       },
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch eBird species by hotspot");
//   }

//  const data = await res.json();
//   return data;
// }
// export async function fetchHotspotDetails(hotspotId: string) {
//   const apiKey = process.env.NEXT_PUBLIC_EBIRD_API_KEY;

//   const res = await fetch(
//     `https://api.ebird.org/v2/ref/hotspot/${hotspotId}`,
//     {
//       headers: {
//         "X-eBirdApiToken": apiKey!,
//       },
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch eBird hotspot details");
//   }

//   const data = await res.json();
//   return data;
// }
