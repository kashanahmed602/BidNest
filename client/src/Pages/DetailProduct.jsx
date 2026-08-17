import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SidebarLayout from "../Layout/SidebarLayout";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  // Feedback states
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  // ==========================================
  // FETCH PRODUCT
  // ==========================================

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const fetchedProduct = response.data.product;

      console.log("Fetched Product:", fetchedProduct);

      setProduct(fetchedProduct);
      setSelectedImage(fetchedProduct.image);
    } catch (error) {
      console.log("Error Fetching Product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // ==========================================
  // ADD FEEDBACK
  // ==========================================

  const handleAddFeedback = async (e) => {
    e.preventDefault();

    if (!rating) {
      alert("Please select a rating");
      return;
    }

    try {
      setFeedbackLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/addFeedback`,
        {
          productId: id,
          rating: Number(rating),
          message: message.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Feedback Response:", response.data);

      if (response.data.success) {
        setShowFeedbackModal(false);
        setRating(0);
        setHoverRating(0);
        setMessage("");

        // Product dobara fetch karo taake
        // average rating + new review immediately show ho
        await fetchProduct();

        alert("Feedback added successfully!");
      } else {
        alert(response.data.message || "Unable to add feedback");
      }
    } catch (error) {
      console.log(
        "Add Feedback Error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Unable to add feedback"
      );
    } finally {
      setFeedbackLoading(false);
    }
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (!product) {
    return (
      <SidebarLayout>
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-slate-700 border-t-amber-500 rounded-full animate-spin mx-auto" />

            <p className="text-slate-400 text-lg mt-4">
              Loading Product...
            </p>
          </div>
        </div>
      </SidebarLayout>
    );
  }

  // ==========================================
  // GALLERY
  // ==========================================

  const galleryImages = product.gallery || [];

  // ==========================================
  // REVIEWS
  // ==========================================

  const reviews = product.comment || [];

  const averageRating = Number(product.rating || 0);

  const roundedAverage = Math.round(averageRating);

  return (
    <SidebarLayout>
      <div className="max-w-7xl mx-auto">

        {/* ========================================== */}
        {/* BACK BUTTON */}
        {/* ========================================== */}

        <button
          onClick={() => navigate(-1)}
          className="
            flex
            items-center
            gap-2
            text-slate-400
            hover:text-white
            mb-6
            transition
          "
        >
          <span className="text-xl">←</span>
          Back to Marketplace
        </button>

        {/* ========================================== */}
        {/* PRODUCT CONTAINER */}
        {/* ========================================== */}

        <div
          className="
            bg-slate-900
            border
            border-slate-700
            rounded-2xl
            p-6
            shadow-xl
          "
        >

          <div className="grid lg:grid-cols-2 gap-10">

            {/* ====================================== */}
            {/* LEFT - IMAGES */}
            {/* ====================================== */}

            <div>

              {/* MAIN IMAGE */}

              <div
                className="
                  bg-slate-800
                  rounded-2xl
                  overflow-hidden
                  border
                  border-slate-700
                "
              >
                <img
                  src={selectedImage || product.image}
                  alt={product.name}
                  className="
                    w-full
                    h-[450px]
                    object-cover
                  "
                />
              </div>

              {/* GALLERY */}

              {galleryImages.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mt-4">

                  {/* MAIN IMAGE */}

                  <button
                    onClick={() =>
                      setSelectedImage(product.image)
                    }
                    className={`
                      rounded-xl
                      overflow-hidden
                      border-2
                      transition
                      ${
                        selectedImage === product.image
                          ? "border-amber-500"
                          : "border-slate-700 hover:border-slate-500"
                      }
                    `}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-20 object-cover"
                    />
                  </button>

                  {/* GALLERY IMAGES */}

                  {galleryImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setSelectedImage(image)
                      }
                      className={`
                        rounded-xl
                        overflow-hidden
                        border-2
                        transition
                        ${
                          selectedImage === image
                            ? "border-amber-500"
                            : "border-slate-700 hover:border-slate-500"
                        }
                      `}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}

                </div>
              )}

            </div>

            {/* ====================================== */}
            {/* RIGHT - PRODUCT DETAILS */}
            {/* ====================================== */}

            <div>

              {/* CATEGORY */}

              <div className="flex items-center gap-3">

                <span
                  className="
                    px-3
                    py-1
                    rounded-full
                    bg-amber-500/10
                    border
                    border-amber-500/20
                    text-amber-400
                    text-sm
                    font-medium
                  "
                >
                  {product.category}
                </span>

                <span
                  className="
                    px-3
                    py-1
                    rounded-full
                    bg-green-500/10
                    border
                    border-green-500/20
                    text-green-400
                    text-sm
                  "
                >
                  {product.quantity > 0
                    ? "In Stock"
                    : "Out of Stock"}
                </span>

              </div>

              {/* NAME */}

              <h1 className="text-4xl font-bold text-white mt-4">
                {product.name}
              </h1>

              {/* RATING SUMMARY */}

              <div className="flex items-center gap-3 mt-4">

                <div className="flex items-center">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= roundedAverage
                          ? "text-amber-400 text-xl"
                          : "text-slate-600 text-xl"
                      }
                    >
                      ★
                    </span>
                  ))}

                </div>

                <span className="text-white font-semibold">
                  {averageRating.toFixed(1)}
                </span>

                <span className="text-slate-500">
                  ({reviews.length}{" "}
                  {reviews.length === 1
                    ? "review"
                    : "reviews"})
                </span>

              </div>

              {/* PRICE */}

              <h2 className="text-4xl font-bold text-amber-500 mt-6">
                PKR{" "}
                {Number(product.price || 0).toLocaleString()}
              </h2>

              {/* QUANTITY */}

              <div
                className="
                  mt-5
                  bg-slate-800/70
                  border
                  border-slate-700
                  rounded-xl
                  p-4
                "
              >
                <p className="text-slate-500 text-sm">
                  Available Quantity
                </p>

                <p className="text-white text-xl font-semibold mt-1">
                  {product.quantity}
                </p>
              </div>

              {/* DESCRIPTION */}

              <div className="mt-6">

                <h3 className="text-xl font-semibold text-white">
                  Description
                </h3>

                <p className="text-slate-400 mt-2 leading-7 whitespace-pre-line">
                  {product.description}
                </p>

              </div>

              {/* SELLER */}

              {product.userId && (
                <div
                  className="
                    mt-6
                    bg-slate-800/70
                    border
                    border-slate-700
                    rounded-xl
                    p-4
                  "
                >

                  <p className="text-slate-500 text-sm">
                    Seller
                  </p>

                  <p className="text-white font-semibold mt-1">
                    {product.userId.name}
                  </p>

                </div>
              )}

              {/* BUY BUTTON */}

              <button
                disabled={product.quantity <= 0}
                className={`
                  w-full
                  mt-8
                  py-4
                  rounded-xl
                  text-white
                  font-bold
                  text-lg
                  transition
                  ${
                    product.quantity > 0
                      ? "bg-amber-500 hover:bg-amber-600"
                      : "bg-slate-700 cursor-not-allowed text-slate-400"
                  }
                `}
              >
                {product.quantity > 0
                  ? "Buy Now"
                  : "Out of Stock"}
              </button>

            </div>

          </div>

        </div>

        {/* ========================================== */}
        {/* RATINGS & REVIEWS */}
        {/* ========================================== */}

        <div
          className="
            mt-8
            bg-slate-900
            border
            border-slate-700
            rounded-2xl
            p-6
          "
        >

          {/* REVIEW HEADER */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <p className="text-amber-500 text-sm font-semibold uppercase tracking-wider">
                Customer Feedback
              </p>

              <h2 className="text-3xl font-bold text-white mt-1">
                Ratings & Reviews
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                See what buyers think about this product
              </p>

            </div>

            {/* ADD FEEDBACK */}
{/* 
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="
                px-5
                py-3
                rounded-xl
                bg-amber-500
                hover:bg-amber-600
                text-white
                font-semibold
                transition
                shadow-lg
                shadow-amber-500/10
              "
            >
              + Add Feedback
            </button> */}

          </div>

          {/* ====================================== */}
          {/* RATING SUMMARY */}
          {/* ====================================== */}

          <div className="mt-7 grid md:grid-cols-[180px_1fr] gap-6">

            {/* AVERAGE */}

            <div
              className="
                bg-slate-800/70
                border
                border-slate-700
                rounded-2xl
                p-5
                text-center
              "
            >

              <p className="text-5xl font-bold text-white">
                {averageRating.toFixed(1)}
              </p>

              <div className="flex justify-center mt-2">

                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= roundedAverage
                        ? "text-amber-400 text-2xl"
                        : "text-slate-600 text-2xl"
                    }
                  >
                    ★
                  </span>
                ))}

              </div>

              <p className="text-slate-500 text-sm mt-2">
                Based on {reviews.length}{" "}
                {reviews.length === 1
                  ? "review"
                  : "reviews"}
              </p>

            </div>

            {/* SIMPLE RATING DESCRIPTION */}

            <div
              className="
                bg-slate-800/50
                border
                border-slate-700
                rounded-2xl
                p-5
                flex
                items-center
              "
            >

              <div>

                <p className="text-white font-semibold text-lg">
                  Customer satisfaction
                </p>

                <p className="text-slate-400 text-sm mt-2">
                  Ratings are submitted by users who have
                  purchased this product.
                </p>

                <div className="flex items-center gap-2 mt-4">

                  <span className="text-amber-400">
                    ★
                  </span>

                  <span className="text-slate-300 text-sm">
                    {averageRating >= 4
                      ? "Excellent"
                      : averageRating >= 3
                      ? "Good"
                      : averageRating >= 2
                      ? "Average"
                      : reviews.length > 0
                      ? "Needs improvement"
                      : "No ratings yet"}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* DIVIDER */}

          <div className="border-t border-slate-700 my-7" />

          {/* ====================================== */}
          {/* REVIEWS */}
          {/* ====================================== */}

          {reviews.length > 0 ? (

            <div className="space-y-4">

              {reviews.map((review, index) => {

                const reviewRating =
                  Number(review.rating || 0);

                const reviewerName =
                  review.userId?.name ||
                  "Anonymous User";

                return (
                  <div
                    key={review._id || index}
                    className="
                      bg-slate-800/60
                      border
                      border-slate-700
                      rounded-2xl
                      p-5
                      hover:border-slate-600
                      transition
                    "
                  >

                    {/* USER + RATING */}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                      {/* USER */}

                      <div className="flex items-center gap-3">

                        <div
                          className="
                            w-11
                            h-11
                            rounded-full
                            bg-amber-500/10
                            border
                            border-amber-500/20
                            flex
                            items-center
                            justify-center
                            text-amber-400
                            font-bold
                            text-lg
                          "
                        >
                          {reviewerName
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>

                          <p className="text-white font-semibold">
                            {reviewerName}
                          </p>

                          <div className="flex items-center gap-2 mt-1">

                            <span className="text-green-400 text-xs">
                              ✓ Verified Buyer
                            </span>

                          </div>

                        </div>

                      </div>

                      {/* RATING */}

                      <div className="flex items-center gap-1">

                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={
                              star <= reviewRating
                                ? "text-amber-400 text-lg"
                                : "text-slate-600 text-lg"
                            }
                          >
                            ★
                          </span>
                        ))}

                        <span className="text-slate-400 text-sm ml-2">
                          {reviewRating}/5
                        </span>

                      </div>

                    </div>

                    {/* COMMENT */}

                    {review.message &&
                      review.message.trim() !== "" && (
                        <div
                          className="
                            mt-4
                            bg-slate-900/60
                            rounded-xl
                            p-4
                          "
                        >
                          <p className="text-slate-300 leading-7">
                            "{review.message}"
                          </p>
                        </div>
                      )}

                    {/* DATE */}

                    {review.createdAt && (
                      <p className="text-slate-600 text-xs mt-4">
                        {formatDate(review.createdAt)}
                      </p>
                    )}

                  </div>
                );
              })}

            </div>

          ) : (

            <div className="py-12 text-center">

              <div
                className="
                  w-16
                  h-16
                  rounded-full
                  bg-slate-800
                  flex
                  items-center
                  justify-center
                  mx-auto
                  text-2xl
                "
              >
                ⭐
              </div>

              <h3 className="text-white text-lg font-semibold mt-4">
                No Reviews Yet
              </h3>

              <p className="text-slate-500 text-sm mt-2">
                Be the first buyer to review this product.
              </p>

            </div>

          )}

        </div>

      </div>

     

    </SidebarLayout>
  );
};

export default ProductDetails;