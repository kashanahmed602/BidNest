import { useEffect, useState } from "react";
import axios from "axios";
import SidebarLayout from "../Layout/SidebarLayout";
import FeedbackModal from "../Components/FeedbackModal";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // ==========================================
  // FETCH MY ORDERS
  // ==========================================

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setOrders(response.data.orders || []);
      } catch (error) {
        console.log("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ==========================================
  // FILTER ORDERS
  // ==========================================

  const filteredOrders = orders.filter((order) => {
    if (filter === "paid") {
      return order.paymentStatus === "paid";
    }

    if (filter === "unpaid") {
      return order.paymentStatus !== "paid";
    }

    return true;
  });

  // ==========================================
  // FORMAT TEXT
  // ==========================================

  const formatText = (text) => {
    if (!text) return "N/A";

    return text
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // ==========================================
  // PAYMENT STATUS
  // ==========================================

  const getPaymentStyle = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-500/10 text-green-400 border-green-500/20";

      case "failed":
        return "bg-red-500/10 text-red-400 border-red-500/20";

      case "cancelled":
        return "bg-red-500/10 text-red-400 border-red-500/20";

      case "pending":
      default:
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    }
  };

  // ==========================================
  // PRODUCT STATUS
  // ==========================================

  const getProductStyle = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-500/10 text-green-400 border-green-500/20";

      case "shipped":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";

      case "processing":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";

      case "cancelled":
        return "bg-red-500/10 text-red-400 border-red-500/20";

      case "pending":
      default:
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    }
  };

  // ==========================================
  // STATUS BADGE
  // ==========================================

  const StatusBadge = ({ status, type }) => {
    const style =
      type === "payment"
        ? getPaymentStyle(status)
        : getProductStyle(status);

    return (
      <span
        className={`
          inline-flex
          items-center
          gap-2
          px-3
          py-1.5
          rounded-full
          border
          text-xs
          font-semibold
          uppercase
          tracking-wide
          ${style}
        `}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current" />

        {formatText(status)}
      </span>
    );
  };

  

  // ==========================================
  // FILTER BUTTON
  // ==========================================

  const FilterButton = ({ value, children }) => {
    const active = filter === value;

    return (
      <button
        onClick={() => setFilter(value)}
        className={`
          px-5
          py-2.5
          rounded-lg
          text-sm
          font-semibold
          transition-all
          ${
            active
              ? "bg-amber-500 text-white shadow-lg shadow-amber-500/10"
              : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
          }
        `}
      >
        {children}
      </button>
    );
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <SidebarLayout>
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-slate-700 border-t-amber-500 rounded-full animate-spin mx-auto" />

            <p className="text-slate-400 mt-4">
              Loading your orders...
            </p>
          </div>
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

        <p className="text-amber-500 text-sm font-semibold uppercase tracking-wider mb-2">
          Marketplace
        </p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

          <div>
            <h1 className="text-4xl font-bold text-white">
              My Orders
            </h1>

            <p className="text-slate-400 mt-2">
              View and track all your purchases
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-xl px-5 py-3">

            <span className="text-slate-400 text-sm">
              Total Orders
            </span>

            <p className="text-white text-xl font-bold">
              {orders.length}
            </p>

          </div>

        </div>

      </div>


      {/* ========================================== */}
      {/* FILTERS */}
      {/* ========================================== */}

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 mb-6">

        <div className="flex flex-wrap gap-3">

          <FilterButton value="all">
            All Orders
          </FilterButton>

          <FilterButton value="paid">
            Paid
          </FilterButton>

          <FilterButton value="unpaid">
            Unpaid
          </FilterButton>

        </div>

      </div>


      {/* ========================================== */}
      {/* EMPTY STATE */}
      {/* ========================================== */}

      {filteredOrders.length === 0 && (

        <div className="bg-slate-900 border border-slate-700 rounded-2xl py-20 text-center">

          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto">

            <span className="text-2xl">
              📦
            </span>

          </div>

          <h2 className="text-xl font-semibold text-white mt-5">
            No Orders Found
          </h2>

          <p className="text-slate-500 mt-2">
            You don't have any orders in this category.
          </p>

        </div>

      )}


      {/* ========================================== */}
      {/* ORDERS */}
      {/* ========================================== */}

      {filteredOrders.length > 0 && (

        <div className="space-y-5">

          {filteredOrders.map((order) => (

            <div
              key={order._id}
              className="
                bg-slate-900
                border
                border-slate-700
                rounded-2xl
                overflow-hidden
                hover:border-slate-600
                transition-all
              "
            >

              {/* ========================================== */}
              {/* ORDER HEADER */}
              {/* ========================================== */}

              <div className="p-6">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                  {/* PRODUCT */}

                  <div className="flex items-center gap-4">

                    <div
                      className="
                        w-14
                        h-14
                        rounded-xl
                        bg-slate-800
                        border
                        border-slate-700
                        flex
                        items-center
                        justify-center
                        text-2xl
                      "
                    >
                      📦
                    </div>

                    <div>

                      <h2 className="text-xl font-bold text-white">
                        {order.productName}
                      </h2>

                      <p className="text-slate-500 text-xs mt-1">
                        Order ID: {order._id}
                      </p>

                    </div>

                  </div>


                  {/* PRICE */}

                  <div className="lg:text-right">

                    <p className="text-amber-500 text-2xl font-bold">
                      PKR{" "}
                      {Number(order.amount || 0).toLocaleString()}
                    </p>

                    <p className="text-slate-500 text-sm mt-1">
                      Quantity: {order.quantity || 1}
                    </p>

                  </div>

                </div>


                {/* ========================================== */}
                {/* ORDER INFORMATION */}
                {/* ========================================== */}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6 pt-5 border-t border-slate-800">

                  {/* PAYMENT METHOD */}

                  <div>

                    <p className="text-slate-500 text-xs uppercase tracking-wide">
                      Payment Method
                    </p>

                    <p className="text-slate-200 font-medium text-sm mt-1.5">
                      {formatText(order.paymentMethod)}
                    </p>

                  </div>


                  {/* SELLER */}

                  <div>

                    <p className="text-slate-500 text-xs uppercase tracking-wide">
                      Seller
                    </p>

                    <p className="text-slate-200 font-medium text-sm mt-1.5">
                      {order.sellerId?.name || "N/A"}
                    </p>

                  </div>


                  {/* SELLER EMAIL */}

                  <div>

                    <p className="text-slate-500 text-xs uppercase tracking-wide">
                      Seller Email
                    </p>

                    <p className="text-slate-200 font-medium text-sm mt-1.5 truncate">
                      {order.sellerId?.email || "N/A"}
                    </p>

                  </div>


                  {/* DATE */}

                  <div>

                    <p className="text-slate-500 text-xs uppercase tracking-wide">
                      Order Date
                    </p>

                    <p className="text-slate-200 font-medium text-sm mt-1.5">
                      {order.createdAt
                        ? new Date(
                            order.createdAt
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </p>

                  </div>

                </div>

              </div>


              {/* ========================================== */}
              {/* STATUS SECTION */}
              {/* ========================================== */}

              <div className="bg-slate-950/50 border-t border-slate-800 p-6">

                <div className="grid md:grid-cols-2 gap-4">

                  {/* PAYMENT STATUS */}

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">

                    <div className="flex items-center justify-between mb-3">

                      <p className="text-slate-500 text-xs uppercase tracking-wide">
                        Payment Status
                      </p>

                      <span className="text-xs text-slate-600">
                        PAYMENT
                      </span>

                    </div>

                    <StatusBadge
                      status={order.paymentStatus}
                      type="payment"
                    />

                    {/* FEEDBACK */}

{order.paymentStatus === "paid" &&
 order.productStatus === "delivered" && (

  <div className="mt-5">

    <button
      onClick={() => setSelectedOrder(order)}
      className="
        w-full
        bg-amber-500
        hover:bg-amber-600
        text-white
        py-3
        rounded-xl
        font-semibold
        transition
      "
    >
      ⭐ Add Feedback
    </button>

  </div>

)}

                  </div>


                  {/* PRODUCT STATUS */}

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">

                    <div className="flex items-center justify-between mb-3">

                      <p className="text-slate-500 text-xs uppercase tracking-wide">
                        Order Status
                      </p>

                      <span className="text-xs text-slate-600">
                        ORDER
                      </span>

                    </div>

                    <StatusBadge
                      status={order.productStatus}
                      type="product"
                    />

                  </div>

                </div>


                {/* ========================================== */}
                {/* SAFEPAY TRACKER */}
                {/* ========================================== */}

                {order.paymentMethod === "safepay" &&
                  order.paymentTracker && (

                    <div className="mt-4 bg-slate-900 border border-slate-800 rounded-xl p-4">

                      <p className="text-slate-500 text-xs uppercase tracking-wide">
                        Payment Reference
                      </p>

                      <p className="text-slate-400 text-xs mt-2 break-all">
                        {order.paymentTracker}
                      </p>

                    </div>

                  )}

              </div>

            </div>

          ))}

        </div>

      )}

      {selectedOrder && (
  <FeedbackModal
    product={selectedOrder}
    onClose={() => setSelectedOrder(null)}
    onSuccess={() => {
      setSelectedOrder(null);
    }}
  />
)}

    </SidebarLayout>
  );
};

export default MyOrders;