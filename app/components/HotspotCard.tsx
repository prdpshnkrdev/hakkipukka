type Props = {
  name: string;
  locId: string;
  lat: number;
  lng: number;
  onClick?: () => void;
};

export default function HotspotCard({ name, locId, lat, lng, onClick }: Props) {
  return (
    <div
      className="border p-4 rounded shadow bg-white cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-sm text-gray-600">ID: {locId}</p>
      <p className="text-sm text-gray-500">
        📍 {lat}, {lng}
      </p>
    </div>
  );
}
