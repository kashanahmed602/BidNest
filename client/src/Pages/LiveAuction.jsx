import SidebarLayout from "../Layout/SidebarLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const LiveAuctions = () => {

  const navigate = useNavigate();

  const [liveAuctions, setLiveAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [biddingAuctionId, setBiddingAuctionId] = useState(null);


  // ==========================================
  // FETCH AUCTIONS
  // ==========================================

  useEffect(() => {

    const fetchAuctions = async () => {

      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/marketAuctions`,
          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setLiveAuctions(
          response.data.auctions || []
        );

      } catch (error) {

        console.log(
          "Error Fetching Auctions",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    fetchAuctions();

  }, []);

  const placeBid = async (auctionId, bid) => {
    if (biddingAuctionId) return;

    setBiddingAuctionId(auctionId);

    try{
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/placeBid`, {
        auctionId: auctionId,
        bidAmount: bid
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const newCurrentBid = response.data.currentBid;
      const currentUser = JSON.parse(localStorage.getItem("user") || "null");

      // Optimistically update UI for current user
      setLiveAuctions(prev => prev.map(a => a._id === auctionId ? {
        ...a,
        currentBid: newCurrentBid,
        lastBidderName: currentUser?.name || "Someone",
        lastBidderId: currentUser?._id ? String(currentUser._id) : getCurrentUserId()
      } : a));

      alert("Bid Placed Successfully");
      console.log(response.data);
    }catch(error){
      alert("Error Placing Bid: " + error.message)

    }finally{
      setBiddingAuctionId(null);
    }
  }

  // Get current user id from token (safe decode)
  const getCurrentUserId = () => {
    try{
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      if (storedUser?._id) return String(storedUser._id);

      const token = localStorage.getItem("token") || "";
      if(!token) return null;
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(atob(base64).split("").map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const payload = JSON.parse(jsonPayload);
      return payload.id ? String(payload.id) : null;
    }catch(e){
      return null;
    }
  }

  // ==========================================
  // SOCKET: listen for bidPlaced events
  // ==========================================
  useEffect(() => {
    let socket;
    try{
      const apiUrl = import.meta.env.VITE_API_URL;
      let origin;
      if (apiUrl) {
        try {
          origin = new URL(apiUrl).origin;
        } catch (e) {
          origin = window.location.origin;
        }
      } else {
        origin = window.location.origin;
      }

      socket = io(origin, { transports: ["websocket"] });
      // expose for debugging across tabs
      try { window.__auctionSocket = socket } catch(e) {}

      socket.on("bidPlaced", (data) => {
        console.log("socket received bidPlaced:", data);
        const { auctionId, currentBid, bidderName, bidderId } = data;
        setLiveAuctions(prev => prev.map(a => a._id === auctionId ? {
          ...a,
          currentBid: currentBid,
          lastBidderName: bidderName,
          lastBidderId: bidderId ? String(bidderId) : null
        } : a));

      });
    }catch(err){
      console.warn("Socket init failed:", err);
    }

    return () => {
      if(socket && socket.disconnect) socket.disconnect();
    }
  }, []);



  // ==========================================
  // GET END TIME
  // ==========================================

  const getEndDate = (auction) => {

    if (!auction.startDateTime) {
      return null;
    }

    const start =
      new Date(auction.startDateTime);

    const end =
      new Date(
        start.getTime() +
        Number(auction.duration || 0) *
        60 *
        60 *
        1000
      );

    return end;

  };


  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {

    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleString(
      "en-PK",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    );

  };


  // ==========================================
  // CURRENT BID
  // ==========================================

  const getCurrentBid = (auction) => {

    return Number(auction.currentBid) > 0
      ? Number(auction.currentBid)
      : Number(auction.startingPrice);

  };


  return (

    <SidebarLayout>

      {/* ========================================== */}
      {/* HEADER */}
      {/* ========================================== */}

      <div className="mb-8">

        <div className="
          flex
          flex-col
          md:flex-row
          md:items-end
          md:justify-between
          gap-4
        ">

          <div>

            <p className="
              text-amber-500
              text-sm
              font-semibold
              uppercase
              tracking-wider
              mb-2
            ">
              Marketplace
            </p>

            <h1 className="
              text-4xl
              font-bold
              text-white
            ">
              Live Auctions
            </h1>

            <p className="
              text-slate-400
              mt-2
            ">
              Place your bid and compete for amazing products
            </p>

          </div>


          {/* COUNT */}

          {!loading && (
            <div className="
              bg-slate-900
              border
              border-slate-700
              px-4
              py-2
              rounded-lg
              text-slate-300
              text-sm
            ">
              {liveAuctions.length}{" "}
              {liveAuctions.length === 1
                ? "Auction"
                : "Auctions"}
            </div>
          )}

        </div>

      </div>


      {/* ========================================== */}
      {/* LOADING */}
      {/* ========================================== */}

      {loading && (

        <div className="
          flex
          flex-col
          items-center
          justify-center
          py-24
        ">

          <div className="
            w-10
            h-10
            border-2
            border-slate-700
            border-t-amber-500
            rounded-full
            animate-spin
          " />

          <p className="
            text-slate-400
            mt-4
          ">
            Loading auctions...
          </p>

        </div>

      )}


      {/* ========================================== */}
      {/* NO AUCTIONS */}
      {/* ========================================== */}

      {!loading &&
        liveAuctions.length === 0 && (

          <div className="
            bg-slate-900
            border
            border-slate-700
            rounded-2xl
            py-20
            text-center
          ">

            <div className="
              w-16
              h-16
              bg-slate-800
              rounded-full
              flex
              items-center
              justify-center
              mx-auto
              mb-5
            ">

              <span className="text-2xl">
                🔨
              </span>

            </div>

            <h2 className="
              text-xl
              font-semibold
              text-white
            ">
              No Live Auctions
            </h2>

            <p className="
              text-slate-500
              mt-2
            ">
              There are currently no auctions available.
            </p>

          </div>

        )}


      {/* ========================================== */}
      {/* AUCTION GRID */}
      {/* ========================================== */}

      {!loading &&
        liveAuctions.length > 0 && (

          <div className="
            grid
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-6
          ">

            {liveAuctions.map((auction) => {

              const currentBid =
                getCurrentBid(auction);

              const endDate =
                getEndDate(auction);


              return (

                <div
                  key={auction._id}
                  onClick={() =>
                    navigate(
                      `/auction/${auction._id}`
                    )
                  }
                  className="
                    group
                    bg-slate-900
                    border
                    border-slate-700
                    rounded-2xl
                    overflow-hidden
                    cursor-pointer
                    hover:border-amber-500/70
                    hover:-translate-y-1
                    transition-all
                    duration-200
                  "
                >

                  {/* ================================= */}
                  {/* IMAGE */}
                  {/* ================================= */}

                  <div className="
                    relative
                    h-52
                    overflow-hidden
                    bg-slate-800
                  ">

                    <img
                      src={auction.image}
                      alt={auction.name}
                      className="
                        w-full
                        h-full
                        object-cover
                        group-hover:scale-105
                        transition-transform
                        duration-300
                      "
                    />


                    {/* LIVE BADGE */}

                    <div className={`
                      absolute
                      top-3
                      left-3
                      flex
                      items-center
                      gap-2
                      ${auction.auctionStatus === "live" ? "bg-red-500/80" : "bg-green-500/80"}
                      text-white
                      px-3
                      py-1.5
                      rounded-full
                      text-xs
                      font-semibold
                    `}>

                      <span className="
                        w-1.5
                        h-1.5
                        bg-white
                        rounded-full
                        animate-pulse"
                      />

                      {auction.auctionStatus.toUpperCase()}

                    </div>


                    {/* CATEGORY */}

                    <div className="
                      absolute
                      top-3
                      right-3
                      bg-slate-950/80
                      backdrop-blur-sm
                      text-slate-200
                      px-3
                      py-1.5
                      rounded-full
                      text-xs
                    ">
                      {auction.category}
                    </div>

                  </div>


                  {/* ================================= */}
                  {/* CONTENT */}
                  {/* ================================= */}

                  <div className="p-5">


                    {/* NAME */}

                    <h2 className="
                      text-xl
                      font-bold
                      text-white
                      truncate
                    ">
                      {auction.name}
                    </h2>


                    {/* DESCRIPTION */}

                    <p className="
                      text-slate-500
                      text-sm
                      mt-2
                      line-clamp-2
                      min-h-[40px]
                    ">
                      {auction.description}
                    </p>


                    {/* ================================= */}
                    {/* CURRENT BID */}
                    {/* ================================= */}

                    <div className="
                      mt-5
                      bg-slate-800/70
                      border
                      border-slate-700
                      rounded-xl
                      p-4
                    ">

                      <p className="
                        text-slate-500
                        text-xs
                        uppercase
                        tracking-wide
                      ">
                        Current Bid
                      </p>

                      <p className="
                        text-amber-500
                        text-2xl
                        font-bold
                        mt-1
                      ">
                        PKR{" "}
                        {currentBid.toLocaleString()}
                      </p>

                      {auction.lastBidderName && (
                        <p className="text-slate-400 text-xs mt-2">
                          {auction.lastBidderId && auction.lastBidderId === getCurrentUserId() ? (
                            <>
                              Bid By You
                            </>
                          ) : (
                            <>{auction.lastBidderName} ne bid kari hai</>
                          )}
                        </p>
                      )}

                    </div>


                    {/* ================================= */}
                    {/* BID INFO */}
                    {/* ================================= */}

                    <div className="
                      grid
                      grid-cols-2
                      gap-3
                      mt-4
                    ">


                      {/* MIN BID */}

                      <div>

                        <p className="
                          text-slate-500
                          text-xs
                        ">
                          Min. Bid
                        </p>

                        <p className="
                          text-slate-200
                          text-sm
                          font-medium
                          mt-1
                        ">
                          PKR{" "}
                          {Number(
                            auction.minBidAmount || 0
                          ).toLocaleString()}
                        </p>

                      </div>


                      {/* DURATION */}

                      <div>

                        <p className="
                          text-slate-500
                          text-xs
                        ">
                          Duration
                        </p>

                        <p className="
                          text-slate-200
                          text-sm
                          font-medium
                          mt-1
                        ">
                          {auction.duration}{" "}
                          {Number(auction.duration) === 1
                            ? "Hour"
                            : "Hours"}
                        </p>

                      </div>

                    </div>


                    {/* ================================= */}
                    {/* START */}
                    {/* ================================= */}

                    <div className="mt-4">

                      <p className="
                        text-slate-500
                        text-xs
                      ">
                        Started
                      </p>

                      <p className="
                        text-slate-300
                        text-sm
                        mt-1
                      ">
                        {formatDate(
                          auction.startDateTime
                        )}
                      </p>

                    </div>


                    {/* ================================= */}
                    {/* END */}
                    {/* ================================= */}

                    <div className="
                      mt-2
                      flex
                      items-center
                      justify-between
                    ">

                      <div>

                        <p className="
                          text-slate-500
                          text-xs
                        ">
                          Ends
                        </p>

                        <p className="
                          text-red-400
                          text-sm
                          font-medium
                          mt-1
                        ">
                          {formatDate(endDate)}
                        </p>

                      </div>

                      <span className="
                        bg-green-500/10
                        border
                        border-green-500/20
                        text-green-400
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                      ">
                        {auction.auctionStatus.toUpperCase()}
                      </span>

                    </div>


                    {/* ================================= */}
                    {/* BUTTON */}
                    {/* ================================= */}

                    {auction.auctionStatus === "live" && (

                    <button
                      value={auction.minBidAmount}
                      disabled={biddingAuctionId === auction._id}
                      onClick={(e) => {

                        e.stopPropagation();
                        placeBid(auction._id, e.target.value);

                      }}
                      className="
                        w-full
                        mt-5
                        bg-amber-500
                        hover:bg-amber-600
                        disabled:bg-amber-500/60
                        disabled:cursor-not-allowed
                        text-white
                        font-semibold
                        py-3
                        rounded-xl
                        transition
                      "
                    >
                      {biddingAuctionId === auction._id ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Placing Bid...
                        </span>
                      ) : (
                        "Place Bid"
                      )}
                    </button>

            )}

                  </div>

                </div>

              );

            })}

          </div>

        )}

    </SidebarLayout>

  );

};

export default LiveAuctions;