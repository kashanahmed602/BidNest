import SidebarLayout from "../Layout/SidebarLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PaymentModal from "../Components/PaymentModal";
import { Heart } from "lucide-react";

const Marketplace = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [marketPlaceProducts, setMarketPlaceProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ==========================================
  // WISHLIST IDS
  // ==========================================

  const [wishlistIds, setWishlistIds] = useState(() => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      return new Set(
        (user.wishlist || []).map(
          (item) => String(item.productId)
        )
      );

    } catch {

      return new Set();

    }

  });

  // Currently processing wishlist product
  const [wishlistLoading, setWishlistLoading] = useState(null);


  // ==========================================
  // TOGGLE WISHLIST
  // ==========================================

  const toggleWishlist = async (productId) => {

    const id = String(productId);

    // Prevent duplicate request
    if (wishlistLoading === id) {
      return;
    }

    const alreadyInWishlist =
      wishlistIds.has(id);

    try {

      setWishlistLoading(id);

      let response;

      // ==========================================
      // REMOVE FROM WISHLIST
      // ==========================================

      if (alreadyInWishlist) {

        response = await axios.put(
          `${import.meta.env.VITE_API_URL}/removeFromWishlist`,
          {
            productId
          },
          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem("token")}`
            }
          }
        );


        // Remove product ID from React state
        setWishlistIds((currentIds) => {

          const nextIds =
            new Set(currentIds);

          nextIds.delete(id);

          return nextIds;

        });


        // Update localStorage
        const user =
          JSON.parse(
            localStorage.getItem("user") || "{}"
          );

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            wishlist:
              response.data.wishlist ||
              (user.wishlist || []).filter(
                (item) =>
                  String(item.productId) !== id
              )
          })
        );

      }

      // ==========================================
      // ADD TO WISHLIST
      // ==========================================

      else {

        response = await axios.put(
          `${import.meta.env.VITE_API_URL}/addInToWishlist`,
          {
            productId
          },
          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem("token")}`
            }
          }
        );


        // Add product ID to React state
        setWishlistIds((currentIds) => {

          const nextIds =
            new Set(currentIds);

          nextIds.add(id);

          return nextIds;

        });


        // Update localStorage
        const user =
          JSON.parse(
            localStorage.getItem("user") || "{}"
          );

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            wishlist:
              response.data.wishlist ||
              user.wishlist ||
              []
          })
        );

      }

    } catch (error) {

      console.log(
        "Wishlist Error:",
        error
      );

      alert(
        alreadyInWishlist
          ? "Error Removing From Wishlist"
          : "Error Adding To Wishlist"
      );

    } finally {

      setWishlistLoading(null);

    }

  };


  // ==========================================
  // PAYMENT REDIRECT
  // ==========================================

  useEffect(() => {

    const rawSearch =
      location.search || "";

    const params =
      new URLSearchParams(rawSearch);

    const paymentState =
      params.get("payment");

    const rawOrderId =
      params.get("order_id") ||
      params.get("orderId") ||
      "";

    const tracker =
      params.get("tracker") || "";


    if (
      paymentState &&
      (
        paymentState === "success" ||
        paymentState === "cancelled"
      )
    ) {

      const normalizedOrderId =
        rawOrderId.includes("?order_id=")
          ? rawOrderId
              .split("?order_id=")[1]
              .split("&")[0]
          : rawOrderId;


      const targetRoute =
        paymentState === "cancelled"
          ? "cancel"
          : "success";


      if (
        normalizedOrderId &&
        tracker
      ) {

        navigate(
          `/payment/${targetRoute}?order_id=${encodeURIComponent(
            normalizedOrderId
          )}&tracker=${encodeURIComponent(
            tracker
          )}`,
          {
            replace: true
          }
        );

        return;

      }


      if (normalizedOrderId) {

        navigate(
          `/payment/${targetRoute}?order_id=${encodeURIComponent(
            normalizedOrderId
          )}`,
          {
            replace: true
          }
        );

        return;

      }

    }

  }, [location.search, navigate]);


  // ==========================================
  // FETCH PRODUCTS
  // ==========================================

  useEffect(() => {

    const FetchProducts = async () => {

      try {

        const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/marketplaceProducts`,
            {
              headers: {
                Authorization:
                  `Bearer ${localStorage.getItem("token")}`,
              }
            }
          );


        setMarketPlaceProducts(
          response.data.products || []
        );

      } catch (error) {

        console.log(
          "Error Marketplace Products",
          error
        );

      }

    };


    FetchProducts();

  }, []);


  // ==========================================
  // SEARCH + CATEGORY FILTER
  // ==========================================

  const filteredProducts =
    marketPlaceProducts.filter(
      (product) => {

        // Quantity 0 wale products show nahi honge
        const hasStock =
          Number(product.quantity) > 0;


        // Search
        const matchesSearch =
          product.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );


        // Category
        const matchesCategory =
          category === "All Categories" ||
          product.category === category;


        return (
          hasStock &&
          matchesSearch &&
          matchesCategory
        );

      }
    );


  // ==========================================
  // RATING STARS
  // ==========================================

  const RatingStars = ({ rating }) => {

    const numericRating =
      Number(rating || 0);

    const roundedRating =
      Math.round(numericRating);


    return (

      <div className="flex items-center gap-2">

        {/* Stars */}

        <div className="flex items-center">

          {[1, 2, 3, 4, 5].map(
            (star) => (

              <span
                key={star}
                className={`
                  text-lg
                  leading-none
                  ${
                    star <= roundedRating
                      ? "text-yellow-400"
                      : "text-slate-600"
                  }
                `}
              >
                ★
              </span>

            )
          )}

        </div>


        {/* Rating Number */}

        <span className="
          text-slate-400
          text-sm
          font-medium
        ">
          {numericRating.toFixed(1)}
        </span>

      </div>

    );

  };


  // ==========================================
  // UI
  // ==========================================

  return (

    <SidebarLayout>

      {/* ========================================== */}
      {/* HEADER */}
      {/* ========================================== */}

      <div className="mb-8">

        <h1 className="
          text-4xl
          font-bold
          text-white
        ">
          Marketplace
        </h1>

        <p className="
          text-slate-400
          mt-2
        ">
          Discover products from other sellers
        </p>

      </div>


      {/* ========================================== */}
      {/* MARKETPLACE CONTAINER */}
      {/* ========================================== */}

      <div className="
        bg-slate-900
        border
        border-slate-700
        rounded-xl
        p-6
      ">


        {/* ========================================== */}
        {/* SEARCH + CATEGORY */}
        {/* ========================================== */}

        <div className="
          flex
          flex-col
          md:flex-row
          justify-between
          gap-4
          mb-6
        ">


          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              bg-slate-800
              text-white
              px-4
              py-3
              rounded-lg
              w-full
              md:w-96
              outline-none
              border
              border-slate-700
              focus:border-amber-500
            "
          />


          {/* CATEGORY */}

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="
              bg-slate-800
              text-white
              px-4
              py-3
              rounded-lg
              outline-none
              border
              border-slate-700
            "
          >

            <option>
              All Categories
            </option>

            <option>
              Mobiles & Tablets
            </option>

            <option>
              Laptops & Computers
            </option>

            <option>
              Electronics
            </option>

            <option>
              Gaming
            </option>

            <option>
              Cameras & Drones
            </option>

            <option>
              Home Appliances
            </option>

            <option>
              Furniture
            </option>

            <option>
              Fashion
            </option>

            <option>
              Watches & Accessories
            </option>

            <option>
              Beauty & Health
            </option>

            <option>
              Books
            </option>

            <option>
              Sports & Fitness
            </option>

            <option>
              Toys & Kids
            </option>

            <option>
              Vehicles
            </option>

            <option>
              Motorcycles
            </option>

            <option>
              Property
            </option>

            <option>
              Tools & Machinery
            </option>

            <option>
              Art & Collectibles
            </option>

            <option>
              Musical Instruments
            </option>

            <option>
              Pets
            </option>

            <option>
              Office Equipment
            </option>

            <option>
              Garden & Outdoor
            </option>

            <option>
              Jewellery
            </option>

            <option>
              Other
            </option>

          </select>

        </div>


        {/* ========================================== */}
        {/* PRODUCTS */}
        {/* ========================================== */}

        {filteredProducts.length === 0 ? (

          <div className="
            text-center
            py-20
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
              mb-4
            ">

              <span className="text-2xl">
                📦
              </span>

            </div>

            <p className="
              text-slate-400
              text-xl
            ">
              No Products Found
            </p>

            <p className="
              text-slate-500
              text-sm
              mt-2
            ">
              Try changing your search or category.
            </p>

          </div>

        ) : (

          <div className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-6
          ">


            {filteredProducts.map(
              (product) => {

                const isWishlisted =
                  wishlistIds.has(
                    String(product._id)
                  );

                const isWishlistLoading =
                  wishlistLoading ===
                  String(product._id);


                return (

                  <div
                    key={product._id}
                    onClick={() =>
                      navigate(
                        `/product/${product._id}`
                      )
                    }
                    className="
                      bg-slate-800
                      rounded-xl
                      overflow-hidden
                      border
                      border-slate-700
                      hover:border-amber-500
                      transition
                      cursor-pointer
                    "
                  >


                    {/* ========================================== */}
                    {/* PRODUCT IMAGE */}
                    {/* ========================================== */}

                    <div className="
                      relative
                    ">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="
                          h-48
                          w-full
                          object-cover
                        "
                      />


                      {/* CATEGORY BADGE */}

                      <span className="
                        absolute
                        top-3
                        left-3
                        bg-slate-950/80
                        backdrop-blur-sm
                        text-slate-200
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-medium
                      ">
                        {product.category}
                      </span>


                      {/* ========================================== */}
                      {/* WISHLIST HEART */}
                      {/* ========================================== */}

                      <button
                        type="button"
                        aria-label={
                          isWishlisted
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                        disabled={
                          isWishlistLoading
                        }
                        onClick={(e) => {

                          // Card ka onClick trigger nahi hoga
                          e.stopPropagation();

                          toggleWishlist(
                            product._id
                          );

                        }}
                        className="
                          absolute
                          top-3
                          right-3
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          bg-slate-950/80
                          text-white
                          backdrop-blur-sm
                          transition
                          hover:bg-slate-950
                          disabled:cursor-wait
                          disabled:opacity-70
                        "
                      >

                        <Heart
                          size={21}
                          className={
                            isWishlisted
                              ? "text-amber-400"
                              : "text-white"
                          }
                          fill={
                            isWishlisted
                              ? "currentColor"
                              : "none"
                          }
                        />

                      </button>

                    </div>


                    {/* ========================================== */}
                    {/* PRODUCT DETAILS */}
                    {/* ========================================== */}

                    <div className="p-5">


                      {/* PRODUCT NAME */}

                      <h2 className="
                        text-xl
                        text-white
                        font-semibold
                        truncate
                      ">
                        {product.name}
                      </h2>


                      {/* RATING */}

                      <div className="mt-2">

                        <RatingStars
                          rating={
                            product.rating
                          }
                        />

                      </div>


                      {/* DESCRIPTION */}

                      <p className="
                        text-slate-400
                        text-sm
                        mt-3
                        line-clamp-2
                      ">
                        {product.description}
                      </p>


                      {/* ========================================== */}
                      {/* PRICE + STOCK */}
                      {/* ========================================== */}

                      <div className="
                        mt-4
                        flex
                        items-center
                        justify-between
                        gap-3
                      ">


                        {/* PRICE */}

                        <h3 className="
                          text-amber-500
                          text-2xl
                          font-bold
                        ">
                          PKR{" "}
                          {product.price?.toLocaleString()}
                        </h3>


                        {/* STOCK */}

                        <span className="
                          rounded-full
                          bg-slate-700
                          px-2.5
                          py-1
                          text-xs
                          text-slate-200
                          whitespace-nowrap
                        ">
                          Stock:{" "}
                          {product.quantity || 0}
                        </span>

                      </div>


                      {/* ========================================== */}
                      {/* BUY NOW */}
                      {/* ========================================== */}

                      <button
                        onClick={(e) => {

                          e.stopPropagation();

                          setSelectedProduct(
                            product
                          );

                        }}
                        className="
                          w-full
                          mt-5
                          bg-amber-500
                          hover:bg-amber-600
                          py-3
                          rounded-lg
                          text-white
                          font-semibold
                          transition
                        "
                      >
                        Buy Now
                      </button>


                    </div>

                  </div>

                );

              }
            )}

          </div>

        )}

      </div>


      {/* ========================================== */}
      {/* PAYMENT MODAL */}
      {/* ========================================== */}

      {selectedProduct && (

        <PaymentModal
          product={selectedProduct}
          onClose={() =>
            setSelectedProduct(null)
          }
        />

      )}

    </SidebarLayout>

  );

};

export default Marketplace;