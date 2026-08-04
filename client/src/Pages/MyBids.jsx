import SidebarLayout from "../Layout/SidebarLayout";

const MyBids = () => {
  return (
    <SidebarLayout>

      <h1 className="text-4xl font-bold text-white mb-6">
        My Bids
      </h1>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

        <table className="w-full text-left">

          <thead>

            <tr className="text-slate-400 border-b border-slate-700">

              <th className="py-4">Product</th>
              <th>My Bid</th>
              <th>Highest Bid</th>
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
                  MacBook Pro
                </td>

                <td className="text-slate-300">
                  $1300
                </td>

                <td className="text-slate-300">
                  $1350
                </td>

                <td>

                  <span className="bg-red-600 px-3 py-1 rounded text-white text-sm">
                    Outbid
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

export default MyBids;