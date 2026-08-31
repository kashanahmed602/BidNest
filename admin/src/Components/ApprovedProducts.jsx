import SidebarLayout from "../Layout/SidebarLayout";
import axios from 'axios'
import { useState, useEffect } from 'react'

const ApprovedProducts = () => {

  const [approvedProducts, setApprovedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:3000/api/v1/productDashboard', {
        
          headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        
      })

      const allProducts = response.data.products || [];
      const allApprovedProducts = allProducts.filter(product => product.status === "approved");

      setApprovedProducts(allApprovedProducts)
    }

    fetchProducts();
  },[])

  const deleteProducts = async (id) => {
    try{
      const deleteProduct = await axios.delete(`http://localhost:3000/api/v1/productDeleted/${id}`)

      alert("Product Deleted Successfully");
      window.location.reload(true)
    }catch(error){
      alert(error.message)
    }
  }
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
              {/* <th className="pb-3">Seller</th> */}
              <th className="pb-3">Category</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Action</th>

            </tr>

          </thead>


          <tbody>
          {approvedProducts.length > 0 ? (
            approvedProducts.map((product) => (

            <tr key={product._id} className="border-b border-slate-800 hover:bg-slate-800 transition">

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

              {/* <td className="text-slate-300">
                Ahmed
              </td> */}

              <td className="text-slate-300">
                {product.category}
              </td>

              <td>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                  {product.status}
                </span>
              </td>

              <td>

                <button onClick={()=> deleteProducts(product._id)} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white transition">
                  Remove
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

export default ApprovedProducts;