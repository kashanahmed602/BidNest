import SidebarLayout from "../Layout/SidebarLayout";

const ApprovedProducts = () => {
  return (
    <SidebarLayout>

      <h2 className="text-4xl font-bold text-white mb-8">
        Approved Products
      </h2>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

        <table className="w-full text-left">

          <thead>

            <tr className="text-slate-400 border-b border-slate-700">

              <th className="pb-3">Product</th>
              <th className="pb-3">Seller</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Action</th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-b border-slate-800 hover:bg-slate-800 transition">

              <td className="py-4 text-white">
                iPhone 15 Pro
              </td>

              <td className="text-slate-300">
                Ahmed
              </td>

              <td className="text-slate-300">
                Mobile
              </td>

              <td>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                  Approved
                </span>
              </td>

              <td>

                <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white transition">
                  Remove
                </button>

              </td>

            </tr>

            <tr className="border-b border-slate-800 hover:bg-slate-800 transition">

              <td className="py-4 text-white">
                Dell XPS 15
              </td>

              <td className="text-slate-300">
                Ali
              </td>

              <td className="text-slate-300">
                Laptop
              </td>

              <td>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                  Approved
                </span>
              </td>

              <td>

                <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white transition">
                  Remove
                </button>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </SidebarLayout>
  );
};

export default ApprovedProducts;