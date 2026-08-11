import SidebarLayout from "../Layout/SidebarLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LiveAuctions = () => {
  const navigate = useNavigate();
  const [liveAuctions, setLiveAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/marketAuctions`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setLiveAuctions(response.data.auctions);
      } catch (error) {
        console.log("Error Fetching Auctions", error);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <SidebarLayout>

      <h1 className="text-4xl font-bold text-white mb-6">
        Live Auctions
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {liveAuctions.map((auction) => (

          <div onClick={() => navigate(`/auction/${auction._id}`)}
            key={auction._id}
            className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:border-amber-500 transition"
          >

            {/* Image */}
            <img
              src={auction.image}
              alt={auction.name}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">

  {/* Name */}
  <h2 className="text-xl font-bold text-white">
    {auction.name}
  </h2>

  {/* Category */}
  <p className="text-slate-400 mt-2">
    {auction.category}
  </p>

  {/* Start Date & Time */}
  <p className="text-slate-400 mt-3 text-sm">
    Starts:{" "}
    <span className="text-white">
      {new Date(auction.startDateTime).toLocaleString("en-PK", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}
    </span>
  </p>

  {/* Current Bid */}
  <p className="text-slate-400 mt-3">
    Current Bid
  </p>

  <h3 className="text-amber-500 text-3xl font-bold mt-2">
    PKR {(auction.currentBid || auction.startingPrice).toLocaleString()}
  </h3>

  {/* Minimum Bid */}
  <p className="text-slate-400 mt-2">
    Minimum Bid: PKR {auction.minBidAmount.toLocaleString()}
  </p>

  {/* Duration */}
  <p className="text-red-400 mt-3">
    Duration: {auction.duration} Hour
    {auction.duration > 1 ? "s" : ""}
  </p>

  {/* Status */}
  <div className="mt-3">
    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
      {auction.auctionStatus.toUpperCase()}
    </span>
  </div>

  {/* Button */}
  <button
    className="w-full mt-5 bg-amber-500 hover:bg-amber-600 py-3 rounded-lg text-white font-semibold"
  >
    Place Bid
  </button>

</div>

          </div>

        ))}

      </div>

      {/* No Auctions */}
      {liveAuctions.length === 0 && (
        <div className="text-center text-slate-400 mt-20 text-xl">
          No Live Auctions Found
        </div>
      )}

    </SidebarLayout>
  );
};

export default LiveAuctions;