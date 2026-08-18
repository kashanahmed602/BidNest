import SidebarLayout from "../Layout/SidebarLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LiveAuctions = () => {

  const navigate = useNavigate();

  const [liveAuctions, setLiveAuctions] = useState([]);
  const [loading, setLoading] = useState(true);


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
    try{
      const bidAmount = await axios.post(`${import.meta.env.VITE_API_URL}/placeBid`, {
        auctionId: auctionId,
        bidAmount: bid
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      alert("Bid Placed Successfully")
      console.log(bidAmount)
    }catch(error){
      alert("Error Placing Bid: " + error.message)

    }
  }


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

                    <div className="
                      absolute
                      top-3
                      left-3
                      flex
                      items-center
                      gap-2
                      bg-green-500/90
                      text-white
                      px-3
                      py-1.5
                      rounded-full
                      text-xs
                      font-semibold
                    ">

                      <span className="
                        w-1.5
                        h-1.5
                        bg-white
                        rounded-full
                        animate-pulse"
                      />

                      LIVE

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
                      onClick={(e) => {

                        e.stopPropagation();
                        placeBid(auction._id, e.target.value);

                      }}
                      className="
                        w-full
                        mt-5
                        bg-amber-500
                        hover:bg-amber-600
                        text-white
                        font-semibold
                        py-3
                        rounded-xl
                        transition
                      "
                    >
                      Place Bid
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