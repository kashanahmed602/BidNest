import { useState, useEffect } from "react";
import SidebarLayout from "../Layout/SidebarLayout";
import SellProductModal from "./SellProducts";
import axios from 'axios'
import { Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditProductModal from "../Components/EditModal";

const MyProducts = () => {

  const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try{

                const response = await axios.get('http://localhost:3000/api/v1/products',{
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  }
                });

                setProducts(response.data.products);

            }catch(error){
                alert(error);
            }
        }

        fetchProducts();
    },[])

    const deleteProduct = async (id) => {
        try{
            const response = await axios.delete(`http://localhost:3000/api/v1/productDeleted/${id}`);

            alert("Product Deleted Successfully");
            window.location.reload();

        }catch(error){
            alert(error);
        }
    }

    return (

        <SidebarLayout>

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold text-white">
                    My Products
                </h1>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-lg font-semibold"
                >
                    + Add Product
                </button>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

  {products.map((product) => (

    <div onClick={() => navigate(`/product/${product._id}`)}
      key={product._id}
      className="relative bg-slate-900 border border-slate-700 rounded-xl overflow-hidden"
    >

  {/* Edit + Delete Buttons */}

<div className="absolute top-3 right-3 z-10 flex gap-2">

  {/* Edit Button */}
  <button
    onClick={(e) => {
      e.stopPropagation();
      setEditModal(true);
      setSelectedProduct(product);
    }}
    className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full shadow-lg transition"
  >
    <Pencil size={18} className="text-white" />
  </button>


  {/* Delete Button */}
  <button
    onClick={(e) => {
      e.stopPropagation();
      deleteProduct(product._id);
    }}
    className="bg-red-600 hover:bg-red-700 p-2 rounded-full shadow-lg transition"
  >
    <Trash2 size={18} className="text-white" />
  </button>

</div>

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl text-white font-semibold">
          {product.name}
        </h2>

        <p className="text-slate-400 mt-2">
          Starting Price
        </p>

        <h3 className="text-amber-400 text-xl font-bold">
          PKR {product.price}
        </h3>

        <span
          className={`inline-block mt-4 px-3 py-1 rounded-full text-sm
            ${
              product.status === "approved"
                ? "bg-green-500/20 text-green-400"
                : product.status === "rejected"
                ? "bg-red-500/20 text-red-400"
                : "bg-yellow-500/20 text-yellow-400"
            }`}
        >
          {product.status}
        </span>

      </div>

    </div>

  ))}

</div>

            {showModal && (
                <SellProductModal closeModal={() => setShowModal(false)} />
            )}

            {editModal && (
              <EditProductModal product={selectedProduct} closeModal={() => setEditModal(false)}/>
            )

            }

        </SidebarLayout>

    );
};

export default MyProducts;