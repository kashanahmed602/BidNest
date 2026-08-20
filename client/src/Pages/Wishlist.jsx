import SidebarLayout from "../Layout/SidebarLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../Components/PaymentModal";

const Wishlist = () => {

  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ==========================================
  // GET WISHLIST
  // ==========================================

  useEffect(() => {

    const getWishlist = async () => {

      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/wishlist`,
          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("Wishlist Response:", response.data);

        setWishlist(
          response.data.wishlist || []
        );

      } catch (error) {

        console.log(
          "Error Fetching Wishlist:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    getWishlist();

  }, []);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <SidebarLayout>

        <div className="
          flex
          items-center
          justify-center
          min-h-[70vh]
        ">

          <div className="text-center">

            <div className="
              w-10
              h-10
              border-2
              border-slate-700
              border-t-amber-500
              rounded-full
              animate-spin
              mx-auto
            " />

            <p className="
              text-slate-400
              mt-4
            ">
              Loading wishlist...
            </p>

          </div>

        </div>

      </SidebarLayout>

    );

  }


  // ==========================================
  // EMPTY WISHLIST
  // ==========================================

  if (wishlist.length === 0) {

    return (

      <SidebarLayout>

        <h1 className="
          text-4xl
          font-bold
          text-white
          mb-6
        ">
          Wishlist
        </h1>

        <div className="
          bg-slate-900
          border
          border-slate-700
          rounded-2xl
          py-20
          text-center
        ">

          <div className="
            w-16
            h-16
            bg-slate-800
            rounded-full
            flex
            items-center
            justify-center
            mx-auto
            mb-5
          ">

            <span className="text-2xl">
              ❤️
            </span>

          </div>

          <h2 className="
            text-xl
            font-semibold
            text-white
          ">
            Your Wishlist is Empty
          </h2>

          <p className="
            text-slate-500
            mt-2
          ">
            Add products to your wishlist and they will appear here.
          </p>

        </div>

      </SidebarLayout>

    );

  }


  return (

    <SidebarLayout>

      {/* ========================================== */}
      {/* HEADER */}
      {/* ========================================== */}

      <div className="mb-8">

        <p className="
          text-amber-500
          text-sm
          font-semibold
          uppercase
          tracking-wider
          mb-2
        ">
          Marketplace
        </p>

        <h1 className="
          text-4xl
          font-bold
          text-white
        ">
          Wishlist
        </h1>

        <p className="
          text-slate-400
          mt-2
        ">
          Products you have saved for later
        </p>

      </div>


      {/* ========================================== */}
      {/* WISHLIST PRODUCTS */}
      {/* ========================================== */}

      <div className="
        grid
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-6
      ">

        {wishlist.map((item, index) => {

          /*
           * Agar backend se wishlist mein sirf
           * productId stored hai:
           *
           * item.productId
           *
           * Agar populated product object araha hai:
           *
           * item.productId.name
           */

          const product = item.productId;

          return (

            <div
              key={product?._id || item._id || index}
              onClick={() => product?._id && navigate(`/product/${product._id}`)}
              className="
                bg-slate-900
                border
                border-slate-700
                rounded-xl
                overflow-hidden
                hover:border-amber-500
                transition
                cursor-pointer
              "
            >

              {/* ================================= */}
              {/* IMAGE */}
              {/* ================================= */}

              <img
                src={product?.image}
                alt={product?.name || "Product"}
                className="
                  w-full
                  h-52
                  object-cover
                  bg-slate-800
                "
              />


              {/* ================================= */}
              {/* DETAILS */}
              {/* ================================= */}

              <div className="p-5">

                <h2 className="
                  text-xl
                  font-bold
                  text-white
                  truncate
                ">
                  {product?.name || "Product"}
                </h2>


                <p className="
                  text-slate-400
                  mt-2
                  text-sm
                  line-clamp-2
                ">
                  {product?.description || "No description available"}
                </p>


                {/* PRICE */}

                <h3 className="
                  text-amber-500
                  text-2xl
                  font-bold
                  mt-4
                ">
                  PKR{" "}
                  {Number(
                    product?.price || 0
                  ).toLocaleString()}
                </h3>


                {/* CATEGORY */}

                <p className="
                  text-slate-500
                  text-xs
                  mt-2
                ">
                  {product?.category || "N/A"}
                </p>


                {/* ================================= */}
                {/* BUTTONS */}
                {/* ================================= */}

                <div className="
                  flex
                  gap-3
                  mt-5
                ">

                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    disabled={!product?._id || Number(product?.quantity || 0) <= 0}
                    className="
                      flex-1
                      bg-amber-500
                      hover:bg-amber-600
                      py-2.5
                      rounded-lg
                      text-white
                      font-semibold
                      transition
                      disabled:cursor-not-allowed
                      disabled:bg-slate-700
                      disabled:text-slate-400
                    "
                  >
                    {Number(product?.quantity || 0) > 0
                      ? "Buy Now"
                      : "Out of Stock"}
                  </button>


                  <button
                    onClick={(event) => event.stopPropagation()}
                    className="
                      flex-1
                      bg-red-600
                      hover:bg-red-700
                      py-2.5
                      rounded-lg
                      text-white
                      font-semibold
                      transition
                    "
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>

          );

        })}

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

export default Wishlist;