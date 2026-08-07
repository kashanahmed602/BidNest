import { useState, useEffect } from "react";
import SidebarLayout from "../Layout/SidebarLayout";
import axios from 'axios';

const PendingAuctions = () => {

  const [showModal, setShowModal] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [startDateTime, setStartDateTime] = useState("");
  const [pendingAuctions, setPendingAuctions] = useState([]);

  useEffect(() => {
    const fetchPendingAuctions = async () => {
        try{

            const response = await axios.get("http://localhost:3000/api/v1/auctions?approvalStatus=pending");

            setPendingAuctions(response.data.auctions);

        }catch(error){
            console.log(error.message);
        }
    }

    fetchPendingAuctions();
  },[])
  
  // Dummy data - baad mein API se replace kar denge
//   const [pendingAuctions, setPendingAuctions] = useState([
//     {
//       id: 1,
//       name: "Honda 125",
//       image: "https://placehold.co/400x250",
//       seller: "Kashan Ahmed",
//       email: "kashan@exe.com",
//       startingPrice: 200000,
//       minBidAmount: 5000,
//       duration: 1,
//     },

//     {
//       id: 2,
//       name: "iPhone 15 Pro Max",
//       image: "https://placehold.co/400x250",
//       seller: "Ali Ahmed",
//       email: "ali@example.com",
//       startingPrice: 250000,
//       minBidAmount: 5000,
//       duration: 3,
//     },

//     {
//       id: 3,
//       name: "Gaming Laptop",
//       image: "https://placehold.co/400x250",
//       seller: "Ahmed Khan",
//       email: "ahmed@example.com",
//       startingPrice: 180000,
//       minBidAmount: 3000,
//       duration: 2,
//     },
//   ]);


  // Approve button
  const handleApproveClick = (auction) => {

    setSelectedAuction(auction);

    console.log(selectedAuction);

    setStartDateTime("");

    setShowModal(true);
  };


  // Confirm approval
  const confirmApproval = async (id, status) => {

  // Pehle date/time check karo
  if (!startDateTime) {
    alert("Please select auction start date and time");
    return;
  }

  try {

    console.log("Auction ID:", id);
    console.log("Status:", status);
    console.log("Start Date:", startDateTime);

    const response = await axios.put(
      `http://localhost:3000/api/v1/auctionUpdate/${id}`,
      {
        approvalStatus: status,
        startDateTime: startDateTime
      }
    );

    console.log("Update Response:", response.data);

    alert(`Auction "${selectedAuction.name}" approved successfully`);

    setShowModal(false);
    setSelectedAuction(null);
    setStartDateTime("");

    // Pending list se remove
    setPendingAuctions((prev) =>
      prev.filter((auction) => auction._id !== id)
    );

  } catch (error) {

    console.log("Update Error:", error);

    console.log("Backend Response:", error.response?.data);

    alert(
      error.response?.data?.message ||
      "Error approving auction"
    );
  }
};


  // Reject
  const handleReject = (id) => {

    const confirmReject = window.confirm(
      "Are you sure you want to reject this auction?"
    );

    if (!confirmReject) {
      return;
    }

    setPendingAuctions(
      pendingAuctions.filter(
        (auction) => auction.id !== id
      )
    );

    alert("Auction Rejected");
  };


  return (
    <SidebarLayout>

      {/* Heading */}

      <h2 className="text-4xl font-bold text-white mb-8">
        Pending Auctions
      </h2>


      {/* Table */}

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 overflow-x-auto">

        <table className="w-full text-left">

          <thead>

            <tr className="text-slate-400 border-b border-slate-700">

              <th className="py-3">
                Auction
              </th>

              <th className="py-3">
                Seller
              </th>

              <th className="py-3">
                Email
              </th>

              <th className="py-3">
                Starting Price
              </th>

              <th className="py-3">
                Min Bid
              </th>

              <th className="py-3">
                Duration
              </th>

              <th className="py-3 text-center">
                Action
              </th>

            </tr>

          </thead>


          <tbody>

            {pendingAuctions.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center text-slate-400 py-10"
                >
                  No Pending Auctions
                </td>

              </tr>

            ) : (

              pendingAuctions.map((auction) => (

                <tr
                  key={auction._id}
                  className="border-t border-slate-700 hover:bg-slate-800 transition"
                >

                  {/* Auction */}

                  <td className="py-4">

                    <div className="flex items-center gap-3">

                      <img
                        src={auction.image}
                        alt={auction.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />

                      <span className="text-white font-semibold">
                        {auction.name}
                      </span>

                    </div>

                  </td>


                  {/* Seller */}

                  <td className="text-amber-400 font-semibold">
                    {auction.seller}
                  </td>


                  {/* Email */}

                  <td className="text-slate-300">
                    {auction.email}
                  </td>


                  {/* Starting Price */}

                  <td className="text-amber-400 font-semibold">
                    PKR {auction.startingPrice.toLocaleString()}
                  </td>


                  {/* Minimum Bid */}

                  <td className="text-green-400 font-semibold">
                    PKR {auction.minBidAmount.toLocaleString()}
                  </td>


                  {/* Duration */}

                  <td className="text-slate-300">

                    {auction.duration} Hour
                    {auction.duration > 1 ? "s" : ""}

                  </td>


                  {/* Actions */}

                  <td className="text-center">

                    <button
                      onClick={() => handleApproveClick(auction)}
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded mr-2 text-white"
                    >
                      Approve
                    </button>


                    <button
                      onClick={() => handleReject(auction.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
                    >
                      Reject
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>


      {/* Approve Modal */}

      {showModal && selectedAuction && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg p-7 relative">

            {/* Close */}

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-5 text-2xl text-slate-400 hover:text-white"
            >
              ×
            </button>


            {/* Heading */}

            <h2 className="text-2xl font-bold text-white mb-2">
              Approve Auction
            </h2>

            <p className="text-slate-400 mb-6">
              Set the date and time when this auction should start.
            </p>


            {/* Auction Name */}

            <div className="mb-5">

              <p className="text-slate-400 text-sm mb-1">
                Auction
              </p>

              <p className="text-white font-semibold text-lg">
                {selectedAuction.name}
              </p>

            </div>


            {/* Duration */}

            <div className="mb-5">

              <p className="text-slate-400 text-sm mb-1">
                Auction Duration
              </p>

              <p className="text-amber-400 font-semibold">
                {selectedAuction.duration} Hour
                {selectedAuction.duration > 1 ? "s" : ""}
              </p>

            </div>


            {/* Date & Time */}

            <div className="mb-6">

              <label className="block text-slate-300 mb-2">
                Auction Start Date & Time
              </label>

              <input
                type="datetime-local"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-amber-500"
              />

            </div>


            {/* Buttons */}

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowModal(false)}
                className="bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-lg text-white"
              >
                Cancel
              </button>


              <button
                onClick={() => confirmApproval(selectedAuction._id, "approved")}
                className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg text-white font-semibold"
              >
                Confirm & Approve
              </button>

            </div>

          </div>

        </div>

      )}

    </SidebarLayout>
  );
};

export default PendingAuctions;