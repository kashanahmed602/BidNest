import SidebarLayout from "../Layout/SidebarLayout";

const Wishlist = () => {
  return (
    <SidebarLayout>

      <h1 className="text-4xl font-bold text-white mb-6">
        Wishlist
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {[1,2,3,4,5,6].map((item)=>(

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
                PlayStation 5
              </h2>

              <p className="text-slate-400 mt-2">
                Current Price
              </p>

              <h3 className="text-amber-500 text-2xl font-bold mt-2">
                $620
              </h3>

              <div className="flex gap-3 mt-5">

                <button className="flex-1 bg-amber-500 hover:bg-amber-600 py-2 rounded text-white">
                  View
                </button>

                <button className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded text-white">
                  Remove
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </SidebarLayout>
  );
};

export default Wishlist;