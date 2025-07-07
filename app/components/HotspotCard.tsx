type Props = {
  name: string;
  locId: string;
  lat: number;
  lng: number;
  directionsUrl?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

export default function HotspotCard({
  name,
  locId,
  lat,
  lng,
  directionsUrl,
  onClick,
}: Props) {
  return (
    <div
      className="border p-4 rounded shadow bg-white cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      <div>
        <h3 className="font-semibold text-lg">{name}</h3>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-blue-600 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
            className="w-4 h-4 inline mr-1 text-green-600"
          >
            <path d="M3 13h14.586l-5.293 5.293 1.414 1.414L21.414 12l-7.707-7.707-1.414 1.414L17.586 11H3z" />
          </svg>
        </a>
      </div>
      <p className="text-sm text-gray-600">ID: {locId}</p>
      <p className="text-sm text-gray-500">
        📍 {lat}, {lng}
      </p>
    </div>
  );
}
