import SidebarLayout from "../Layout/SidebarLayout";

const SellProduct = () => {
  return (
    <SidebarLayout>

      <h1 className="text-4xl font-bold text-white mb-8">
        Sell Product
      </h1>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 max-w-3xl">

        <div className="grid gap-6">

          <input
            type="text"
            placeholder="Product Name"
            className="bg-slate-800 p-3 rounded-lg text-white outline-none"
          />

          <textarea
            rows="5"
            placeholder="Product Description"
            className="bg-slate-800 p-3 rounded-lg text-white outline-none"
          ></textarea>

          <input
            type="number"
            placeholder="Starting Price"
            className="bg-slate-800 p-3 rounded-lg text-white outline-none"
          />

          <select className="bg-slate-800 p-3 rounded-lg text-white">

            <option>Select Category</option>
            <option>Mobiles</option>
            <option>Laptops</option>
            <option>Cameras</option>
            <option>Accessories</option>

          </select>

          <input
            type="file"
            className="bg-slate-800 p-3 rounded-lg text-white"
          />

          <button className="bg-amber-500 hover:bg-amber-600 py-3 rounded-lg text-white font-semibold">
            Submit Product
          </button>

        </div>

      </div>

    </SidebarLayout>
  );
};

export default SellProduct;