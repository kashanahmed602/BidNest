import { useEffect, useState } from "react";
import axios from "axios";
import SidebarLayout from "../Layout/SidebarLayout";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // ==========================================
  // FETCH ORDERS
  // ==========================================

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/myOrders`,
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

  useEffect(() => {
    fetchOrders();
  }, []);

  // ==========================================
  // FILTER
  // ==========================================

  const filteredOrders = orders.filter((order) => {
    if (category === "all") {
      return true;
    }

    if (category === "paid") {
      return order.paymentStatus === "paid";
    }

    if (category === "unpaid") {
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
  // PAYMENT STATUS STYLE
  // ==========================================

  const getPaymentStatusStyle = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-500/10 border-green-500/20 text-green-400";

      case "failed":
        return "bg-red-500/10 border-red-500/20 text-red-400";

      case "cancelled":
        return "bg-red-500/10 border-red-500/20 text-red-400";

      case "pending":
      default:
        return "bg-yellow-500/10 border-yellow-500/20 text-yellow-400";
    }
  };

  // ==========================================
  // PRODUCT STATUS STYLE
  // ==========================================

  const getProductStatusStyle = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-500/10 border-green-500/20 text-green-400";

      case "shipped":
        return "bg-blue-500/10 border-blue-500/20 text-blue-400";

      case "processing":
        return "bg-purple-500/10 border-purple-500/20 text-purple-400";

      case "cancelled":
        return "bg-red-500/10 border-red-500/20 text-red-400";

      case "pending":
      default:
        return "bg-yellow-500/10 border-yellow-500/20 text-yellow-400";
    }
  };

  // ==========================================
  // PAYMENT STATUS BADGE
  // ==========================================

  const PaymentStatusBadge = ({ status }) => {
    return (
      <span
        className={`
          inline-flex
          items-center
          px-3
          py-1.5
          rounded-full
          border
          text-xs
          font-semibold
          uppercase
          tracking-wide
          ${getPaymentStatusStyle(status)}
        `}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />

        {formatText(status)}
      </span>
    );
  };

  // ==========================================
  // PRODUCT STATUS BADGE
  // ==========================================

  const ProductStatusBadge = ({ status }) => {
    return (
      <span
        className={`
          inline-flex
          items-center
          px-3
          py-1.5
          rounded-full
          border
          text-xs
          font-semibold
          uppercase
          tracking-wide
          ${getProductStatusStyle(status)}
        `}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />

        {formatText(status)}
      </span>
    );
  };

  // ==========================================
  // UPDATE PAYMENT STATUS
  // ==========================================

  const updatePaymentStatus = async (orderId, paymentStatus) => {
    try {
      setUpdatingId(orderId);

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/updateOrderPaymentStatus/${orderId}`,
        {
          paymentStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  paymentStatus,
                }
              : order
          )
        );
      }
    } catch (error) {
      console.log("Payment status update error:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  // ==========================================
  // UPDATE PRODUCT STATUS
  // ==========================================

  const updateProductStatus = async (orderId, productStatus) => {
    try {
      setUpdatingId(orderId);

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/updateOrderProductStatus/${orderId}`,
        {
          productStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  productStatus,
                }
              : order
          )
        );
      }
    } catch (error) {
      console.log("Product status update error:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  // ==========================================
  // PAYMENT OPTIONS
  // ==========================================

  const paymentStatuses = [
    "pending",
    "paid",
    "failed",
    "cancelled",
  ];

  // ==========================================
  // PRODUCT OPTIONS
  // ==========================================

  const productStatuses = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  return (
    <SidebarLayout>

      {/* ========================================== */}
      {/* HEADER */}
      {/* ========================================== */}

      <div className="mb-8">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

          <div>

            <p className="text-amber-500 text-sm font-semibold uppercase tracking-wider mb-2">
              Marketplace
            </p>

            <h1 className="text-4xl font-bold text-white">
              My Orders
            </h1>

            <p className="text-slate-400 mt-2">
              Manage your purchases, payments and order status
            </p>

          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2">

            <span className="text-slate-400 text-sm">
              {filteredOrders.length}{" "}
              {filteredOrders.length === 1 ? "Order" : "Orders"}
            </span>

          </div>

        </div>

      </div>


      {/* ========================================== */}
      {/* MAIN CARD */}
      {/* ========================================== */}

      <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">

        {/* ========================================== */}
        {/* FILTER BAR */}
        {/* ========================================== */}

        <div className="p-5 border-b border-slate-700">

          <div className="flex flex-wrap gap-3">

            {/* ALL */}

            <button
              onClick={() => setCategory("all")}
              className={`
                px-5 py-2.5
                rounded-lg
                text-sm
                font-semibold
                transition
                ${
                  category === "all"
                    ? "bg-amber-500 text-white"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }
              `}
            >
              All Orders
            </button>


            {/* PAID */}

            <button
              onClick={() => setCategory("paid")}
              className={`
                px-5 py-2.5
                rounded-lg
                text-sm
                font-semibold
                transition
                ${
                  category === "paid"
                    ? "bg-green-500 text-white"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }
              `}
            >
              Paid
            </button>


            {/* UNPAID */}

            <button
              onClick={() => setCategory("unpaid")}
              className={`
                px-5 py-2.5
                rounded-lg
                text-sm
                font-semibold
                transition
                ${
                  category === "unpaid"
                    ? "bg-yellow-500 text-white"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }
              `}
            >
              Unpaid
            </button>

          </div>

        </div>


        {/* ========================================== */}
        {/* CONTENT */}
        {/* ========================================== */}

        <div className="p-5">

          {/* LOADING */}

          {loading && (

            <div className="py-20 text-center">

              <div className="w-9 h-9 border-2 border-slate-700 border-t-amber-500 rounded-full animate-spin mx-auto" />

              <p className="text-slate-400 mt-4">
                Loading orders...
              </p>

            </div>

          )}


          {/* EMPTY */}

          {!loading && filteredOrders.length === 0 && (

            <div className="py-20 text-center">

              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto">

                <span className="text-2xl">
                  🛒
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

          {!loading && filteredOrders.length > 0 && (

            <div className="space-y-5">

              {filteredOrders.map((order) => {

                const isPaymentPaid =
                  order.paymentStatus === "paid";

                const isDelivered =
                  order.productStatus === "delivered";

                const isUpdating =
                  updatingId === order._id;

                return (

                  <div
                    key={order._id}
                    className="
                      bg-slate-800/70
                      border border-slate-700
                      rounded-2xl
                      overflow-hidden
                      hover:border-slate-600
                      transition
                    "
                  >

                    {/* ========================================== */}
                    {/* PRODUCT HEADER */}
                    {/* ========================================== */}

                    <div className="p-5">

                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

                        {/* PRODUCT */}

                        <div className="flex items-center gap-4">

                          <div className="
                            w-14
                            h-14
                            rounded-xl
                            bg-slate-700
                            flex
                            items-center
                            justify-center
                            text-2xl
                          ">
                            📦
                          </div>

                          <div>

                            <h2 className="text-lg font-bold text-white">
                              {order.productName}
                            </h2>

                            <p className="text-slate-500 text-xs mt-1">
                              Order #{order._id}
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
                      {/* INFORMATION */}
                      {/* ========================================== */}

                      <div className="
                        grid
                        grid-cols-2
                        md:grid-cols-4
                        gap-4
                        mt-6
                        pt-5
                        border-t
                        border-slate-700
                      ">

                        <div>

                          <p className="text-slate-500 text-xs uppercase">
                            Payment Method
                          </p>

                          <p className="text-slate-200 text-sm font-medium mt-1.5">
                            {formatText(order.paymentMethod)}
                          </p>

                        </div>


                        <div>

                          <p className="text-slate-500 text-xs uppercase">
                            Buyer
                          </p>

                          <p className="text-slate-200 text-sm font-medium mt-1.5">
                            {order.buyerId?.name || "N/A"}
                          </p>

                        </div>


                        <div>

                          <p className="text-slate-500 text-xs uppercase">
                            Seller
                          </p>

                          <p className="text-slate-200 text-sm font-medium mt-1.5">
                            {order.sellerId?.name || "N/A"}
                          </p>

                        </div>


                        <div>

                          <p className="text-slate-500 text-xs uppercase">
                            Order Date
                          </p>

                          <p className="text-slate-200 text-sm font-medium mt-1.5">
                            {order.createdAt
                              ? new Date(
                                  order.createdAt
                                ).toLocaleDateString()
                              : "N/A"}
                          </p>

                        </div>

                      </div>

                    </div>


                    {/* ========================================== */}
                    {/* STATUS SECTION */}
                    {/* ========================================== */}

                    <div className="
                      bg-slate-900/50
                      border-t border-slate-700
                      p-5
                    ">

                      <div className="grid md:grid-cols-2 gap-4">


                        {/* ====================================== */}
                        {/* PAYMENT STATUS */}
                        {/* ====================================== */}

                        <div className="
                          bg-slate-900
                          border border-slate-700
                          rounded-xl
                          p-4
                        ">

                          <p className="
                            text-slate-500
                            text-xs
                            uppercase
                            tracking-wide
                            mb-3
                          ">
                            Payment Status
                          </p>


                          {isPaymentPaid ? (

                            <PaymentStatusBadge
                              status="paid"
                            />

                          ) : (

                            <select
                              value={order.paymentStatus || "pending"}
                              disabled={isUpdating}
                              onChange={(e) =>
                                updatePaymentStatus(
                                  order._id,
                                  e.target.value
                                )
                              }
                              className="
                                w-full
                                bg-slate-800
                                border border-slate-700
                                text-white
                                px-4
                                py-2.5
                                rounded-lg
                                outline-none
                                focus:border-amber-500
                                disabled:opacity-50
                              "
                            >

                              {paymentStatuses.map((status) => (

                                <option
                                  key={status}
                                  value={status}
                                >
                                  {formatText(status)}
                                </option>

                              ))}

                            </select>

                          )}

                        </div>


                        {/* ====================================== */}
                        {/* PRODUCT STATUS */}
                        {/* ====================================== */}

                        <div className="
                          bg-slate-900
                          border border-slate-700
                          rounded-xl
                          p-4
                        ">

                          <p className="
                            text-slate-500
                            text-xs
                            uppercase
                            tracking-wide
                            mb-3
                          ">
                            Product Status
                          </p>


                          {isDelivered ? (

                            <ProductStatusBadge
                              status="delivered"
                            />

                          ) : (

                            <select
                              value={order.productStatus || "pending"}
                              disabled={isUpdating}
                              onChange={(e) =>
                                updateProductStatus(
                                  order._id,
                                  e.target.value
                                )
                              }
                              className="
                                w-full
                                bg-slate-800
                                border border-slate-700
                                text-white
                                px-4
                                py-2.5
                                rounded-lg
                                outline-none
                                focus:border-amber-500
                                disabled:opacity-50
                              "
                            >

                              {productStatuses.map((status) => (

                                <option
                                  key={status}
                                  value={status}
                                >
                                  {formatText(status)}
                                </option>

                              ))}

                            </select>

                          )}

                        </div>

                      </div>


                      {/* UPDATE INDICATOR */}

                      {isUpdating && (

                        <p className="text-slate-500 text-xs mt-3 text-center">
                          Updating order...
                        </p>

                      )}

                    </div>

                  </div>

                );

              })}

            </div>

          )}

        </div>

      </div>

    </SidebarLayout>
  );
};

export default MyOrders;