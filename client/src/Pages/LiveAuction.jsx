import SidebarLayout from "../Layout/SidebarLayout";

const LiveAuctions = () => {
  return (
    <SidebarLayout>

      <h1 className="text-4xl font-bold text-white mb-6">
        Live Auctions
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {[1,2,3,4,5,6].map((item) => (

          <div
            key={item}
            className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:border-amber-500 transition"
          >

            <img
              src="https://picsum.photos/400/250"
              alt=""
              className="w-full h-52 object-cover"
            />

            <div className="p-5">

              <h2 className="text-xl font-bold text-white">
                MacBook Pro M3
              </h2>

              <p className="text-slate-400 mt-2">
                Current Bid
              </p>

              <h3 className="text-amber-500 text-3xl font-bold mt-2">
                $1450
              </h3>

              <p className="text-red-400 mt-3">
                Ends in: 02h 15m
              </p>

              <button className="w-full mt-5 bg-amber-500 hover:bg-amber-600 py-3 rounded-lg text-white">
                Place Bid
              </button>

            </div>

          </div>

        ))}

      </div>

    </SidebarLayout>
  );
};

export default LiveAuctions;