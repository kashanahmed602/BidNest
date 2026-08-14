import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const orderId = searchParams.get("order_id");
        const tracker = searchParams.get("tracker");

        if (!orderId || !tracker) {
          setMessage("Invalid payment information.");
          setLoading(false);
          return;
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/paymentVerify`,
          {
            orderId,
            tracker
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        if (response.data.success) {
          setMessage("Payment successful!");
        } else {
          setMessage("Payment verification failed.");
        }

      } catch (error) {
        console.log("Payment verification error:", error);
        setMessage("Unable to verify payment.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-10 text-center">

        {loading ? (
          <>
            <h1 className="text-2xl text-white font-bold">
              Verifying Payment...
            </h1>

            <p className="text-slate-400 mt-3">
              Please wait.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl text-green-500 font-bold">
              {message}
            </h1>

            <button
              onClick={() => navigate("/marketplace")}
              className="mt-6 bg-amber-500 px-6 py-3 rounded-lg text-white"
            >
              Continue Shopping
            </button>
          </>
        )}

      </div>

    </div>
  );
};

export default PaymentSuccess;