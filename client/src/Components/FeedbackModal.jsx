import { useState } from "react";
import axios from "axios";

const FeedbackModal = ({ product, onClose, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/rateProduct`,
        {
          productId: product.productId,
          rating,
          message: message.trim()
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      if (response.data.success) {
        onSuccess?.(response.data);
        onClose();
      }

    } catch (error) {
      console.log("Feedback error:", error);

      alert(
        error.response?.data?.message ||
        "Unable to add feedback"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Add Feedback
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              {product.productName}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ×
          </button>

        </div>


        {/* Rating */}

        <div className="mb-6">

          <p className="text-white font-medium mb-3">
            Rate this product
          </p>

          <div className="flex gap-2">

            {[1, 2, 3, 4, 5].map((star) => (

              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-4xl transition-transform hover:scale-110"
              >
                <span
                  className={
                    star <= rating
                      ? "text-amber-400"
                      : "text-slate-600"
                  }
                >
                  ★
                </span>
              </button>

            ))}

          </div>

          <p className="text-slate-500 text-sm mt-2">
            {rating === 0
              ? "Select a rating"
              : `${rating} out of 5 stars`}
          </p>

        </div>


        {/* Comment */}

        <div className="mb-6">

          <label className="text-white font-medium">
            Comment
            <span className="text-slate-500 text-sm ml-2">
              (Optional)
            </span>
          </label>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your experience with this product..."
            rows={4}
            className="
              w-full
              mt-3
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              p-4
              text-white
              placeholder-slate-500
              outline-none
              resize-none
              focus:border-amber-500
            "
          />

        </div>


        {/* Buttons */}

        <div className="flex gap-3">

          <button
            onClick={onClose}
            disabled={loading}
            className="
              flex-1
              bg-slate-800
              hover:bg-slate-700
              text-slate-300
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading || rating === 0}
            className="
              flex-1
              bg-amber-500
              hover:bg-amber-600
              disabled:bg-slate-700
              disabled:text-slate-500
              text-white
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default FeedbackModal;