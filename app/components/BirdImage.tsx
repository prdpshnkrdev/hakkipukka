"use client";
import { useEffect, useState } from "react";

export default function BirdImage({ comName }: { comName: string }) {
  const [imgUrl, setImgUrl] = useState<string>(
    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
  );

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(
          `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(
            comName
          )}&per_page=1`
        );
        const data = await res.json();
        const photoUrl = data.results?.[0]?.default_photo?.square_url;
        if (photoUrl) setImgUrl(photoUrl);
      } catch (e) {
        // fallback already set
      }
    };

    fetchImage();
  }, [comName]);

  return (
    <img
      src={imgUrl}
      alt={comName}
      className="w-12 h-12 object-cover rounded"
    />
  );
}
