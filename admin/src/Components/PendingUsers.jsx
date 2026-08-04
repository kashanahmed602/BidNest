import SidebarLayout from "../Layout/SidebarLayout";
import axios from 'axios';
import { useEffect, useState } from "react";

const PendingUsers = () => {

  const [pendingUsers, setPendingUsers] = useState([]);

  const updateStatus = async (id, status) => {
    try{

      const response = await axios.put(`http://localhost:3000/api/v1/updateStatus/${id}`,{
        status
      });

      alert(`User ${status}`);

      window.location.reload(true);

    }catch(error){

      alert(error)

    }
  }

  useEffect(() => {

    const fetchPendingUsers = async () => {

    try{
    const response = await axios.get("http://localhost:3000/api/v1/pendingUsers");

    setPendingUsers(response.data.users);
    console.log(response.data.users);
    }
    catch(error){
      alert("Error Fetching Pending Users");
    }
  }

  fetchPendingUsers();
},[])
  return (
    <SidebarLayout>

      <h2 className="text-4xl font-bold text-white mb-8">
        Pending Users
      </h2>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

        <table className="w-full table-fixed">

          <thead>
  <tr className="text-slate-400 border-b border-slate-700">

    <th className="w-1/5 py-3 text-left">Name</th>
    <th className="w-1/5 py-3 text-left">Email</th>
    <th className="w-1/5 py-3 text-left">Country</th>
    <th className="w-1/5 py-3 text-left">Phone</th>
    <th className="w-1/5 py-3 text-center">Action</th>

  </tr>
</thead>

          <tbody>

  {pendingUsers.length > 0 ? (

    pendingUsers.map((user) => (

    <tr
  key={user._id}
  className="border-t border-slate-700 hover:bg-slate-800 transition"
>

  <td className="py-4 text-white">
    {user.name}
  </td>

  <td className="text-slate-300">
    {user.email}
  </td>

  <td className="text-slate-300">
    {user.country}
  </td>

  <td className="text-slate-300">
    {user.phone}
  </td>

  <td className="text-center">

    <button onClick={() => updateStatus(user._id, "approved")} className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded mr-2 text-white">
      Approve
    </button>

    <button onClick={() => updateStatus(user._id, "rejected")} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white">
      Reject
    </button>

  </td>

</tr>

    ))

  ) : (

    <tr>

      <td
        colSpan="4"
        className="text-center py-8 text-slate-400"
      >
        No Pending Users
      </td>

    </tr>

  )}

</tbody>
        </table>

      </div>

    </SidebarLayout>
  );
};

export default PendingUsers;