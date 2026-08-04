import SidebarLayout from "../Layout/SidebarLayout";

const Marketplace = () => {
  return (
    <SidebarLayout>

      <h1 className="text-4xl font-bold text-white mb-6">
        Marketplace
      </h1>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

        <div className="flex justify-between items-center mb-6">

          <input
            type="text"
            placeholder="Search Products..."
            className="bg-slate-800 text-white px-4 py-3 rounded-lg w-96 outline-none"
          />

          <select className="bg-slate-800 text-white px-4 py-3 rounded-lg">

            <option>All Categories</option>
            <option>Mobiles</option>
            <option>Laptops</option>
            <option>Cameras</option>
            <option>Accessories</option>

          </select>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {[1,2,3,4,5,6,7,8].map((item)=>(

            <div
              key={item}
              className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-amber-500 transition"
            >

              <img
                src="https://picsum.photos/300/220"
                alt=""
                className="h-48 w-full object-cover"
              />

              <div className="p-5">

                <h2 className="text-xl text-white font-semibold">
                  iPhone 15 Pro
                </h2>

                <p className="text-slate-400 mt-2">
                  Seller: Ahmed
                </p>

                <h3 className="text-amber-500 text-2xl font-bold mt-4">
                  $1200
                </h3>

                <button className="w-full mt-5 bg-amber-500 hover:bg-amber-600 py-3 rounded-lg text-white font-semibold">
                  View Product
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </SidebarLayout>
  );
};

export default Marketplace;