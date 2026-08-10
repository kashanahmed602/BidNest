import { useEffect, useState } from "react";
import SidebarLayout from "../Layout/SidebarLayout";
import AuctionModal from "../Components/auctiomModal";
import axios from "axios";
import { Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom"
import EditAuctionModal from "../Components/EditAuctionModal";


const MyBids = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [auctions, setAuctions] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState(null);

  const fetchAuctions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/auctions",{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setAuctions(response.data.auctions);
    } catch (error) {
      console.log("Error fetching Auctions", error);
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  const delteAuction = async (id) => {
    try{
      const response = await axios.delete(`http://localhost:3000/api/v1/deletAuction/${id}`,{
        headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
      });

      alert("Auction deleted Successfully");
      window.location.reload(true);

    }catch(error){
      alert("Error: ", error.message);
    }
  }

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

          <div onClick={() => navigate(`/auction/${auction._id}`)}
  key={auction._id}
  className="relative bg-slate-900 border border-slate-700 rounded-xl overflow-hidden"
>

 {/* Action Buttons */}

 {auction.approvalStatus === "pending" && (

   <div className="absolute top-3 right-3 z-10 flex gap-2">

  {/* Edit */}
  <button
    onClick={(e) => {
      e.stopPropagation();
      
      setSelectedAuction(auction);
      setEditModal(true);
    }}
    className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full shadow-lg transition"
    >
    <Pencil size={18} className="text-white" />
  </button>
 

  {/* Delete */}
  <button
    onClick={(e) => {
      e.stopPropagation();
      
      delteAuction(auction._id);
    }}
    className="bg-red-600 hover:bg-red-700 p-2 rounded-full shadow-lg transition"
    >
    <Trash2 size={18} className="text-white" />
  </button>

</div>
  )}

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
    <p className="text-slate-400 mt-3">
      Current Bid
    </p>

    <h3 className="text-green-400 text-lg font-semibold">
      PKR {auction.currentBid || auction.startingPrice}
    </h3>

    {/* Status */}
    <div className="mt-4 flex justify-between items-center">

      <div className="flex gap-2">

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
      <span className="text-slate-400 text-sm">
        {auction.duration}h
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
        <AuctionModal
          closeModal={() => {
            setShowModal(false);
            fetchAuctions();
          }}
        />
      )}

      {editModal && selectedAuction && (
  <EditAuctionModal
    auction={selectedAuction}
    closeModal={() => {
      setEditModal(false);
      setSelectedAuction(null);
    }}
  />
)}

    </SidebarLayout>
  );
};

export default MyBids;