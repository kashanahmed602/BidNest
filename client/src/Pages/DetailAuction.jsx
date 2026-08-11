import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarLayout from "../Layout/SidebarLayout";
import axios from "axios";

const AuctionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [auction, setAuction] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auction/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const fetchedAuction = response.data.auction;

        setAuction(fetchedAuction);

        // Main image initially selected
        setSelectedImage(fetchedAuction.image);

      } catch (error) {
        console.log(
          "Error Fetching Auction:",
          error.response?.data || error.message
        );
      }
    };

    fetchAuction();
  }, [id]);

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

  // Loading
  if (!auction) {
    return (
      <SidebarLayout>
        <div className="flex justify-center items-center h-96">
          <p className="text-slate-400 text-xl">
            Loading Auction...
          </p>
        </div>
      </SidebarLayout>
    );
  }

  const currentBid =
    auction.currentBid || auction.startingPrice;

  return (
    <SidebarLayout>

      {/* Back Button */}

      <button
        onClick={() => navigate(-1)}
        className="text-slate-400 hover:text-white mb-6 transition"
      >
        ← Back to Live Auctions
      </button>


      {/* Main Container */}

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

        <div className="grid lg:grid-cols-2 gap-10">


          {/* ================================================= */}
          {/* LEFT SIDE - IMAGES */}
          {/* ================================================= */}

          <div>

            {/* Main Image */}

            <div className="bg-slate-800 rounded-xl overflow-hidden">

              <img
                src={selectedImage || auction.image}
                alt={auction.name}
                className="w-full h-[450px] object-cover"
              />

            </div>


            {/* Gallery */}

            {auction.gallery &&
              auction.gallery.length > 0 && (

                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">

                  {/* Main Image Thumbnail */}

                  <button
                    onClick={() =>
                      setSelectedImage(auction.image)
                    }
                    className={`shrink-0 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === auction.image
                        ? "border-amber-500"
                        : "border-slate-700 hover:border-slate-500"
                    }`}
                  >

                    <img
                      src={auction.image}
                      alt={auction.name}
                      className="w-20 h-20 object-cover"
                    />

                  </button>


                  {/* Gallery Images */}

                  {auction.gallery.map((image, index) => (

                    <button
                      key={index}
                      onClick={() =>
                        setSelectedImage(image)
                      }
                      className={`shrink-0 rounded-lg overflow-hidden border-2 transition ${
                        selectedImage === image
                          ? "border-amber-500"
                          : "border-slate-700 hover:border-slate-500"
                      }`}
                    >

                      <img
                        src={image}
                        alt={`${auction.name} ${index + 1}`}
                        className="w-20 h-20 object-cover"
                      />

                    </button>

                  ))}

                </div>

              )}

          </div>


          {/* ================================================= */}
          {/* RIGHT SIDE - AUCTION DETAILS */}
          {/* ================================================= */}

          <div>


            {/* Category */}

            <p className="text-amber-400 font-medium">
              {auction.category}
            </p>


            {/* Name */}

            <h1 className="text-4xl font-bold text-white mt-2">
              {auction.name}
            </h1>


            {/* Auction Status */}

            <div className="flex gap-2 mt-4">

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


              <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                Auction
              </span>

            </div>


            {/* Current Bid */}

            <div className="mt-7">

              <p className="text-slate-400">
                Current Bid
              </p>

              <h2 className="text-4xl font-bold text-amber-500 mt-1">
                PKR {currentBid?.toLocaleString()}
              </h2>

            </div>


            {/* Starting Price */}

            <div className="mt-5">

              <p className="text-slate-400">
                Starting Price
              </p>

              <p className="text-white text-lg font-semibold">
                PKR {auction.startingPrice?.toLocaleString()}
              </p>

            </div>


            {/* Minimum Bid */}

            <div className="mt-5">

              <p className="text-slate-400">
                Minimum Bid Amount
              </p>

              <p className="text-green-400 text-lg font-semibold">
                PKR {auction.minBidAmount?.toLocaleString()}
              </p>

            </div>


            {/* Start Date / Time */}

            <div className="grid grid-cols-2 gap-4 mt-6">


              {/* Start Date */}

              <div className="bg-slate-800 rounded-lg p-4">

                <p className="text-slate-400 text-sm">
                  Start Date
                </p>

                <p className="text-white font-semibold mt-1">
                  {formatDate(auction.startDateTime)}
                </p>

              </div>


              {/* Start Time */}

              <div className="bg-slate-800 rounded-lg p-4">

                <p className="text-slate-400 text-sm">
                  Start Time
                </p>

                <p className="text-amber-400 font-semibold mt-1">
                  {formatTime(auction.startDateTime)}
                </p>

              </div>

            </div>


            {/* Duration */}

            <div className="mt-4 bg-slate-800 rounded-lg p-4">

              <p className="text-slate-400 text-sm">
                Auction Duration
              </p>

              <p className="text-white font-semibold mt-1">
                {auction.duration} Hour
                {auction.duration > 1 ? "s" : ""}
              </p>

            </div>


            {/* Description */}

            <div className="mt-7">

              <h3 className="text-xl font-semibold text-white">
                Description
              </h3>

              <p className="text-slate-400 mt-2 leading-7">
                {auction.description}
              </p>

            </div>


            {/* Seller */}

            {auction.userId && (

              <div className="mt-6 bg-slate-800 rounded-lg p-4">

                <p className="text-slate-400 text-sm">
                  Seller
                </p>

                <p className="text-white font-semibold mt-1">
                  {auction.userId.name}
                </p>

                <p className="text-slate-400 text-sm">
                  {auction.userId.email}
                </p>

              </div>

            )}


            {/* Place Bid */}

            <button
              disabled={auction.auctionStatus !== "live"}
              className={`w-full mt-8 py-4 rounded-lg text-white font-bold text-lg ${
                auction.auctionStatus === "live"
                  ? "bg-amber-500 hover:bg-amber-600"
                  : "bg-slate-700 cursor-not-allowed"
              }`}
            >

              {auction.auctionStatus === "live"
                ? "Place Bid"
                : "Auction Not Live"}

            </button>

          </div>

        </div>

      </div>

    </SidebarLayout>
  );
};

export default AuctionDetails;