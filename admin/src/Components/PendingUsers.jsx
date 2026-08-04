import SidebarLayout from "../Layout/SidebarLayout";

const PendingUsers = () => {
  return (
    <SidebarLayout>

      <h2 className="text-4xl font-bold text-white mb-8">
        Pending Users
      </h2>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

        <table className="w-full text-left">

          <thead>

            <tr className="text-slate-400 border-b border-slate-700">

              <th className="pb-3">Name</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Country</th>
              <th className="pb-3">Action</th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-t border-slate-700 hover:bg-slate-800 transition">

              <td className="py-4 text-white">
                Ali Khan
              </td>

              <td className="text-slate-300">
                ali@gmail.com
              </td>

              <td className="text-slate-300">
                Pakistan
              </td>

              <td>

                <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded mr-2 text-white">
                  Approve
                </button>

                <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white">
                  Reject
                </button>

              </td>

            </tr>

            <tr className="border-t border-slate-700 hover:bg-slate-800 transition">

              <td className="py-4 text-white">
                John Smith
              </td>

              <td className="text-slate-300">
                john@gmail.com
              </td>

              <td className="text-slate-300">
                USA
              </td>

              <td>

                <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded mr-2 text-white">
                  Approve
                </button>

                <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white">
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

export default PendingUsers;