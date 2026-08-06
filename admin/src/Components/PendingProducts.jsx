import SidebarLayout from "../Layout/SidebarLayout";
import axios from 'axios';
import { useEffect, useState } from 'react'

const PendingProducts = () => {
  const [pendingProducts, setPendingProducts] = useState([]);

  const updateStatus = async (id, status) => {
    try{
      const response = await axios.put(`http://localhost:3000/api/v1/updateStatusProducts/${id}`,{
        status
    });

    alert(`Product ${status}`);
    window.location.reload(true);
    }catch(error){
      alert(error);
    }
  }

  useEffect(() => {
    const FetchPendingProducts = async () => {
      try{
        const response = await axios.get("http://localhost:3000/api/v1/products?status=pending");

        setPendingProducts(response.data.products);
      }catch(error){
        alert("Error Fetching Pending Products");
      }
    }

    FetchPendingProducts();
  },[])

  return (
    <SidebarLayout>

        <h2 className="text-4xl font-bold text-white mb-8">
        Pending Products
      </h2>

    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

      

      <table className="w-full text-left">

        <thead>

<tr className="text-slate-400 border-b border-slate-700">

  <th className="py-3 text-left">Product</th>

  <th className="py-3 text-left">Seller</th>

  <th className="py-3 text-left">Email</th>

  <th className="py-3 text-left">Price</th>

  <th className="py-3 text-left">Quantity</th>

  <th className="py-3 text-center">Action</th>

</tr>

</thead>

        <tbody>

{pendingProducts.map((product) => (

<tr
  key={product._id}
  className="border-t border-slate-700 hover:bg-slate-800 transition"
>

  {/* Product */}
  <td className="py-4">

    <div className="flex items-center gap-3">

      <img
        src={product.image}
        alt={product.name}
        className="w-16 h-16 rounded-lg object-cover"
      />

      <span className="text-white font-semibold">
        {product.name}
      </span>

    </div>

  </td>

  {/* Seller */}
  <td className="text-amber-400 font-semibold">
    {product.userId.name}
  </td>

   {/* email */}
  <td className="text-slate-300">
    {product.userId.email}
  </td>

  {/* Price */}
  <td className="text-amber-400 font-semibold">
    PKR {product.price}
  </td>

  {/* Quantity */}
  <td className="text-slate-300">
    {product.quantity}
  </td>

  {/* Action */}
  <td className="text-center">

    <button onClick={() => updateStatus(product._id, "approved")} className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded mr-2 text-white">
      Approve
    </button>

    <button onClick={() => updateStatus(product._id, "rejected")} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white">
      Reject
    </button>

  </td>

</tr>

))}

</tbody>
      </table>

    </div>

    </SidebarLayout>
  );
};

export default PendingProducts;