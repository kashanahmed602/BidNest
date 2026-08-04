import SidebarLayout from "../Layout/SidebarLayout";

const PendingProducts = () => {
  return (
    <SidebarLayout>

        <h2 className="text-4xl font-bold text-white mb-8">
        Pending Products
      </h2>

    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

      

      <table className="w-full text-left">

        <thead>

          <tr className="text-slate-400">

            <th>Product</th>
            <th>Seller</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          <tr className="border-t border-slate-700">

            <td className="py-3 text-white">
              iPhone 15 Pro
            </td>

            <td className="text-slate-300">
              Ahmed
            </td>

            <td>

              <button className="bg-green-600 px-3 py-1 rounded mr-2">
                Approve
              </button>

              <button className="bg-red-600 px-3 py-1 rounded">
                Reject
              </button>

            </td>

          </tr>

        </tbody>

      </table>

    </div>

    </SidebarLayout>
  );
};

export default PendingProducts;