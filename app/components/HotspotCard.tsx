type Props = {
  name: string;
  locId: string;
  lat: number;
  lng: number;
};

export default function HotspotCard({ name, locId, lat, lng }: Props) {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-sm text-gray-600">ID: {locId}</p>
      <p className="text-sm text-gray-500">
        📍 {lat}, {lng}
      </p>
    </div>
  );
}
