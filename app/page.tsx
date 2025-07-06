import Image from "next/image";
import HotspotSidebar from "./components/HotspotSideBar";

export default function Home() {
  return (
    <>
      <main className="flex flex-grow">
        {/* <aside className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
          <div className="text-sm text-gray-600 italic">
            <HotspotSidebar />
          </div>
        </aside> */}

        <section className="flex-grow bg-green-50 p-4">
          <div className="w-full h-full text-center text-green-700 italic">
            [HotspotMap goes here]
          </div>
        </section>

        {/* <aside className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
          <h2 className="font-semibold mb-2">Details</h2>
          <div className="text-sm text-gray-600 italic">
            [HotspotDetails goes here]
          </div>
        </aside> */}
      </main>
    </>
  );
}
