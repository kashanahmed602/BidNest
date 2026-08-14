import axios from "axios";
import { useState } from "react";

const PaymentModal = ({
  product,
  onClose
}) => {

  const [loading, setLoading] = useState(false);


  const handlePayment = async (paymentMethod) => {

    try {

      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/paymentCreate`,
        {
          productId: product._id,
          paymentMethod: paymentMethod
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );


      console.log("Payment Response:", response.data);


      if (!response.data.success) {

        alert(
          response.data.message ||
          "Payment failed"
        );

        return;
      }


      // Safepay
      if (paymentMethod === "safepay") {

        const checkoutUrl =
          response.data.checkoutURL;

        console.log(
          "Redirecting to Safepay checkout:",
          checkoutUrl
        );

        onClose();

        window.location.assign(checkoutUrl);

        return;
      }


      // Cash on Delivery
      if (paymentMethod === "cash_on_delivery") {

        alert("Order placed successfully!");

        onClose();

      }

    } catch (error) {

      console.log(
        "Payment Error:",
        error.response?.data ||
        error.message
      );

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >

      <div
        className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold text-white">
            Choose Payment Method
          </h2>

          <button
            disabled={loading}
            onClick={onClose}
            className="text-2xl text-slate-400 hover:text-white"
          >
            ×
          </button>

        </div>


        {/* Product */}

        <div className="mt-6 rounded-xl bg-slate-800 p-4">

          <div className="flex items-center gap-4">

            <img
              src={product.image}
              alt={product.name}
              className="h-20 w-20 rounded-lg object-cover"
            />

            <div>

              <h3 className="text-lg font-semibold text-white">
                {product.name}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                {product.category}
              </p>

              <p className="mt-2 text-lg font-bold text-amber-500">
                PKR {product.price?.toLocaleString()}
              </p>

            </div>

          </div>

        </div>


        {/* Payment Methods */}

        <div className="mt-6">

          <p className="mb-3 text-sm font-medium text-slate-400">
            Select Payment Method
          </p>


          {/* Cash On Delivery */}

          <button
            disabled={loading}
            onClick={() =>
              handlePayment("cash_on_delivery")
            }
            className="mb-3 w-full rounded-xl border border-slate-700 bg-slate-800 p-4 text-left transition hover:border-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-700 text-xl">
                💵
              </div>

              <div>

                <h3 className="font-semibold text-white">
                  Cash on Delivery
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Pay when your order is delivered
                </p>

              </div>

            </div>

          </button>


          {/* Safepay */}

          <button
            disabled={loading}
            onClick={() =>
              handlePayment("safepay")
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-4 text-left transition hover:border-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-500 text-xl">
                💳
              </div>

              <div>

                <h3 className="font-semibold text-white">
                  Pay with Safepay
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {loading
                    ? "Processing..."
                    : "Secure online payment"}
                </p>

              </div>

            </div>

          </button>

        </div>


        {/* Cancel */}

        <button
          disabled={loading}
          onClick={onClose}
          className="mt-5 w-full rounded-xl py-3 text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-50"
        >
          Cancel
        </button>

      </div>

    </div>

  );
};

export default PaymentModal;
