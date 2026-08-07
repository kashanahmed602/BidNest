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

  // Format Date
  const formatDate = (date) => {
    if (!date) return "Not Set";

    return new Date(date).toLocaleDateString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Format Time
  const formatTime = (date) => {
    if (!date) return "Not Set";

    return new Date(date).toLocaleTimeString("en-PK", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

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

            {/* Image */}

            <img
              src={auction.image}
              alt={auction.name}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">

  {/* Name + Start Date/Time */}
  <div className="flex justify-between items-start gap-3">

    <h2 className="text-xl text-white font-semibold truncate">
      {auction.name}
    </h2>

    <div className="text-right shrink-0">
      <p className="text-slate-400 text-xs">
        {auction.startDateTime
          ? new Date(auction.startDateTime).toLocaleDateString("en-PK", {
              day: "2-digit",
              month: "short",
            })
          : "Not Set"}
      </p>

      <p className="text-amber-400 text-xs">
        {auction.startDateTime
          ? new Date(auction.startDateTime).toLocaleTimeString("en-PK", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : ""}
      </p>
    </div>

  </div>

  {/* Starting Price */}
  <p className="text-slate-400 mt-3">
    Starting Price
  </p>

  <h3 className="text-amber-400 text-xl font-bold">
    PKR {auction.startingPrice}
  </h3>

  {/* Current Bid */}
  <p className="text-slate-400 mt-4">
    Current Bid
  </p>

  <h3 className="text-green-400 text-lg font-semibold">
    PKR {auction.currentBid}
  </h3>

  {/* Status + Approval + Duration */}
  <div className="flex justify-between items-center mt-5">

    <div>
    {/* Auction Status */}
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

    {/* Approval Status */}
    <span
      className={`px-3 py-1 rounded-full text-sm ${
        auction.approvalStatus === "approved"
          ? "bg-green-500/20 text-green-400"
          : auction.approvalStatus === "rejected"
          ? "bg-red-500/20 text-red-400"
          : "bg-orange-500/20 text-orange-400"
      }`}
    >
      {auction.approvalStatus}
    </span>

    </div>

    {/* Duration */}
    <div>
    <span className="text-slate-400 text-sm">
      {auction.duration}h
    </span>
    </div>

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
        <AuctionModal
          closeModal={() => {
            setShowModal(false);
            fetchAuctions();
          }}
        />
      )}

    </SidebarLayout>
  );
};

export default MyBids;