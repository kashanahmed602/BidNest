import { useEffect, useState } from "react";
import SidebarLayout from "../Layout/SidebarLayout";
import AuctionModal from "../Components/auctiomModal";
import axios from "axios";

const MyBids = () => {
  const [showModal, setShowModal] = useState(false);
  const [auctions, setAuctions] = useState([]);

  const fetchAuctions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/auctions"
      );

      setAuctions(response.data.auctions);
    } catch (error) {
      console.log("Error fetching Auctions", error);
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  return (
    <SidebarLayout>
      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">
          My Auctions
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-lg font-semibold"
        >
          + Add Auction
        </button>
      </div>

      {/* Auctions */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {auctions.map((auction) => (

          <div
            key={auction._id}
            className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden"
          >

            <img
              src={auction.image}
              alt={auction.name}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">

              <h2 className="text-xl text-white font-semibold">
                {auction.name}
              </h2>

              <p className="text-slate-400 mt-3">
                Starting Price
              </p>

              <h3 className="text-amber-400 text-xl font-bold">
                PKR {auction.startingPrice}
              </h3>

              <p className="text-slate-400 mt-4">
                Current Bid
              </p>

              <h3 className="text-green-400 text-lg font-semibold">
                PKR {auction.currentBid}
              </h3>

              <div className="flex justify-between items-center mt-5">

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    auction.auctionStatus === "live"
                      ? "bg-green-500/20 text-green-400"
                      : auction.auctionStatus === "upcoming"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {auction.auctionStatus}
                </span>

                <span className="text-slate-400 text-sm">
                  {auction.duration} Hour Duration
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* No Auctions */}

      {auctions.length === 0 && (
        <div className="text-center text-slate-400 mt-20 text-xl">
          No Auctions Found
        </div>
      )}

      {/* Modal */}

      {showModal && (
        <AuctionModal closeModal={() => setShowModal(false)} />
      )}
    </SidebarLayout>
  );
};

export default MyBids;