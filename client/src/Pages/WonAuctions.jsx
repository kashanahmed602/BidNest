import SidebarLayout from "../Layout/SidebarLayout";

const WonAuctions = () => {
  return (
    <SidebarLayout>

      <h1 className="text-4xl font-bold text-white mb-6">
        Won Auctions
      </h1>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

        <table className="w-full text-left">

          <thead>

            <tr className="border-b border-slate-700 text-slate-400">

              <th className="py-4">Product</th>
              <th>Winning Bid</th>
              <th>Seller</th>
              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {[1,2,3].map((item)=>(

              <tr
                key={item}
                className="border-b border-slate-800 hover:bg-slate-800"
              >

                <td className="py-4 text-white">
                  Canon EOS R6
                </td>

                <td className="text-slate-300">
                  $950
                </td>

                <td className="text-slate-300">
                  Ahmed
                </td>

                <td>

                  <span className="bg-green-600 px-3 py-1 rounded text-white text-sm">
                    Won
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </SidebarLayout>
  );
};

export default WonAuctions;