import SidebarLayout from "../Layout/SidebarLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../Components/PaymentModal";

const Marketplace = () => {

  const navigate = useNavigate();

  const [marketPlaceProducts, setMarketPlaceProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const FetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/marketplaceProducts`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          }
        );

        setMarketPlaceProducts(response.data.products);
      } catch (error) {
        console.log("Error Marketplace Products", error);
      }
    };

    FetchProducts();
  }, []);

  // Search + Category Filter
  const filteredProducts = marketPlaceProducts.filter((product) => {
    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All Categories" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <SidebarLayout>

      {/* Welcome Header */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Marketplace
        </h1>

        <p className="text-slate-400 mt-2">
          Discover products from other sellers
        </p>
      </div>


      {/* Marketplace Container */}

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

        {/* Search + Category */}

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-800 text-white px-4 py-3 rounded-lg w-full md:w-96 outline-none border border-slate-700 focus:border-amber-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-slate-800 text-white px-4 py-3 rounded-lg outline-none border border-slate-700"
          >
            <option>All Categories</option>
            <option>Mobiles & Tablets</option>
            <option>Laptops & Computers</option>
            <option>Electronics</option>
            <option>Gaming</option>
            <option>Cameras & Drones</option>
            <option>Home Appliances</option>
            <option>Furniture</option>
            <option>Fashion</option>
            <option>Watches & Accessories</option>
            <option>Beauty & Health</option>
            <option>Books</option>
            <option>Sports & Fitness</option>
            <option>Toys & Kids</option>
            <option>Vehicles</option>
            <option>Motorcycles</option>
            <option>Property</option>
            <option>Tools & Machinery</option>
            <option>Art & Collectibles</option>
            <option>Musical Instruments</option>
            <option>Pets</option>
            <option>Office Equipment</option>
            <option>Garden & Outdoor</option>
            <option>Jewellery</option>
            <option>Other</option>
          </select>

        </div>


        {/* Products */}

        {filteredProducts.length === 0 ? (

          <div className="text-center py-20">
            <p className="text-slate-400 text-xl">
              No Products Found
            </p>
          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {filteredProducts.map((product) => (

              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-amber-500 transition"
              >

                {/* Product Image */}

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />


                {/* Product Details */}

                <div className="p-5">

                  <h2 className="text-xl text-white font-semibold truncate">
                    {product.name}
                  </h2>

                  <p className="text-slate-400 mt-2">
                    {product.category}
                  </p>

                  <p className="text-slate-400 text-sm mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <h3 className="text-amber-500 text-2xl font-bold mt-4">
                    PKR {product.price?.toLocaleString()}
                  </h3>

                  <button onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(product);
                  }}
                    className="w-full mt-5 bg-amber-500 hover:bg-amber-600 py-3 rounded-lg text-white font-semibold"
                  >
                    Buy Now
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {selectedProduct && (
  <PaymentModal
    product={selectedProduct}
    onClose={() => setSelectedProduct(null)}
  />
)}

    </SidebarLayout>
  );
};

export default Marketplace;