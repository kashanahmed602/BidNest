import { useEffect, useState } from "react";
import {
  useSearchParams,
  useNavigate,
  useLocation
} from "react-router-dom";
import axios from "axios";

const PaymentSuccess = ({ isCancelled = false }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    const cancelled = isCancelled || location.pathname.includes("/payment/cancel");

    if (cancelled) {
      setMessage("Payment cancelled.");
      setLoading(false);
      return;
    }

    const parseOrderId = () => {
      const directOrderId = searchParams.get("order_id") || searchParams.get("orderId") || "";
      if (!directOrderId) return "";

      const cleaned = directOrderId.includes("?order_id=")
        ? directOrderId.split("?order_id=")[1].split("&")[0]
        : directOrderId;

      return cleaned;
    };

    const verifyPayment = async () => {
      try {
        const orderId = parseOrderId();
        const tracker = searchParams.get("tracker") || "";

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
  }, [searchParams, isCancelled, location.pathname]);

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
            <h1 className={`text-3xl font-bold ${isCancelled || location.pathname.includes("/payment/cancel") ? "text-yellow-500" : "text-green-500"}`}>
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