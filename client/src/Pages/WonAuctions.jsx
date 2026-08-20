import SidebarLayout from "../Layout/SidebarLayout";
import axios from "axios";
import { useState, useEffect } from "react";
import PaymentModal from "../Components/PaymentModal";

const WonAuctions = () => {
  const [winner, setWinner] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWinner = async () => {
      try{
        const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
        const [winnerResponse, ordersResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/getWinner`, { headers }),
          axios.get(`${import.meta.env.VITE_API_URL}/orders`, { headers }),
        ]);
        setWinner(winnerResponse.data.auctions || []);
        setOrders(ordersResponse.data.orders || []);
      }catch(error){
        console.log("winner not fetched", error.message);
      } finally {
        setLoading(false);
      }
    };

    getWinner();
  }, []);

  const getOrder = (auctionId) => orders.find((order) => String(order.auctionId) === String(auctionId));
  return (
    <SidebarLayout>

      <h1 className="text-4xl font-bold text-white mb-6">
        Won Auctions
      </h1>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 overflow-x-auto">

        <table className="w-full text-left">

          <thead>

            <tr className="border-b border-slate-700 text-slate-400">

              <th className="py-4">Product</th>
              <th>Winning Bid</th>
              <th>Seller</th>
              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (
              <tr><td colSpan="5" className="py-8 text-center text-slate-400">Loading won auctions...</td></tr>
            ) : winner.length === 0 ? (
              <tr><td colSpan="5" className="py-8 text-center text-slate-400">You have not won any auctions yet.</td></tr>
            ) : winner.map((auction) => {
              const order = getOrder(auction._id);
              const isPaid = order?.paymentStatus === "paid";

              return (

              <tr
                key={auction._id}
                className="border-b border-slate-800 hover:bg-slate-800"
              >

                <td className="py-4 text-white">
                  <div className="flex items-center gap-3">
                    <img
                      src={auction.image}
                      alt={auction.name}
                      className="h-12 w-12 rounded-lg object-cover border border-slate-700"
                    />
                    <span>{auction.name}</span>
                  </div>
                </td>

                <td className="text-slate-300">
                  PKR {Number(auction.currentBid || 0).toLocaleString()}
                </td>

                <td className="text-slate-300">
                  {auction.sellerId?.name || "Seller"}
                </td>

                <td>

                  {isPaid ? (
                    <span className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded text-emerald-400 text-sm">Paid</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedAuction({ ...auction, isAuction: true, price: auction.currentBid, quantity: 1 })}
                      className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-400"
                    >
                      Pay Now
                    </button>
                  )}

                </td>

              </tr>
              );
            })}

          </tbody>

        </table>

      </div>

      {selectedAuction && (
        <PaymentModal
          product={selectedAuction}
          onClose={() => setSelectedAuction(null)}
        />
      )}

    </SidebarLayout>
  );
};

export default WonAuctions;