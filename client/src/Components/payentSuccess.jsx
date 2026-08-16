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
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {

    const cancelled =
      isCancelled ||
      location.pathname.includes("/payment/cancel");

    if (cancelled) {

      setMessage("Payment cancelled.");
      setLoading(false);

      return;
    }

    const verifyPayment = async () => {

      try {

        const orderId =
          searchParams.get("order_id") ||
          searchParams.get("orderId") ||
          "";

        const tracker =
          searchParams.get("tracker") ||
          "";

        console.log("========== PAYMENT SUCCESS ==========");
        console.log("Order ID:", orderId);
        console.log("Tracker:", tracker);

        if (!orderId || !tracker) {

          setMessage(
            "Invalid payment information."
          );

          setLoading(false);

          return;
        }

        // ======================================
        // VERIFY PAYMENT
        // ======================================

        const response = await axios.post(

          `${import.meta.env.VITE_API_URL}/paymentVerify`,

          {
            orderId,
            tracker
          },

          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem("token")}`
            }
          }

        );

        console.log(
          "========== VERIFY RESPONSE =========="
        );

        console.log(
          response.data
        );

        console.log(
          "===================================="
        );

        // ======================================
        // SAVE PAYMENT STATUS
        // ======================================

        setPaymentStatus(
          response.data.paymentStatus || ""
        );

        // ======================================
        // SUCCESS
        // ======================================

        if (
          response.data.success &&
          response.data.paymentStatus === "paid"
        ) {

          setMessage(
            "Payment successful!"
          );

        }

        // ======================================
        // NOT PAID YET
        // ======================================

        else {

          setMessage(
            response.data.message ||
            "Payment verification failed."
          );

        }

      } catch (error) {

        console.error(
          "Payment verification error:",
          error.response?.data ||
          error.message
        );

        setMessage(
          "Unable to verify payment."
        );

      } finally {

        setLoading(false);

      }

    };

    verifyPayment();

  }, [
    searchParams,
    isCancelled,
    location.pathname
  ]);

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-10 text-center">

        {loading ? (

          <>

            <h1 className="text-2xl text-white font-bold">
              Verifying Payment...
            </h1>

            <p className="text-slate-400 mt-3">
              Please wait while we verify your payment.
            </p>

          </>

        ) : (

          <>

            <h1
              className={`text-3xl font-bold ${
                isCancelled ||
                location.pathname.includes("/payment/cancel")
                  ? "text-yellow-500"
                  : paymentStatus === "paid"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </h1>

            {paymentStatus && (

              <p className="text-slate-400 mt-3">
                Payment Status: {paymentStatus}
              </p>

            )}

            <button
              onClick={() =>
                navigate("/marketplace")
              }
              className="mt-6 bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-lg text-white"
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