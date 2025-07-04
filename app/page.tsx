import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-green-600 text-gray-200 py-8 px-6 text-center flex flex-col items-center">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Karnataka, India
          </h1>
          <div className="flex flex-wrap gap-4 text-sm sm:text-base mt-4">
            <div>
              📘 <strong>553</strong> Species
            </div>
            <div>
              📋 <strong>470.5K</strong> Checklists
            </div>
            <div>
              🧑‍🤝‍🧑 <strong>11,755</strong> eBirders
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-screen-xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* India News */}
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-2">India News</h2>
          <div className="text-sm text-gray-600">What's On in July</div>
          <p className="text-gray-700 mt-2">
            While July might seem like a slower period for bird watching to some
            enthusiasts, it’s actually a valuable time for expanding our
            understanding of avian behavior. The monsoon rains bring notable
            shifts in local bird populations.
          </p>
        </div>

        {/* Community Targets */}
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-4">eBirding This Month</h2>
          <ul className="space-y-3 text-sm">
            <li>
              🦅 <strong>White-eyed Buzzard</strong> - Last seen: 30 Jun 2025
            </li>
            <li>
              🎶 <strong>Clamorous Reed Warbler</strong> - Last seen: 27 Jun
              2025
            </li>
            <li>
              🔥 <strong>Flame-throated Bulbul</strong> - Last seen: 27 Jun 2025
            </li>
            <li>
              🟥 <strong>Red Spurfowl</strong> - Last seen: 29 Jun 2025
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
