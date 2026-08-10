import { useState } from "react";
import axios from 'axios'

const EditAuctionModal = ({ auction, closeModal }) => {

  console.log("Auction in Edit Modal:", auction);

  const [name, setName] = useState(auction?.name || "");
  const [description, setDescription] = useState(
    auction?.description || ""
  );

  const [startingPrice, setStartingPrice] = useState(
    auction?.startingPrice || ""
  );

  const [minBidAmount, setMinBidAmount] = useState(
    auction?.minBidAmount || ""
  );

  const [duration, setDuration] = useState(
    auction?.duration || ""
  );

  const [category, setCategory] = useState(
    auction?.category || ""
  );

//   const [startDateTime, setStartDateTime] = useState(
//     auction?.startDateTime
//       ? new Date(auction.startDateTime).toISOString().slice(0, 16)
//       : ""
//   );

  const [image, setImage] = useState(null);

  const [galleryImages, setGalleryImages] = useState([]);


  const handleSubmit = async (e) => {

    e.preventDefault();

    try{
        const formData = new FormData();

formData.append("name", name);
formData.append("description", description);
formData.append("startingPrice", startingPrice);
formData.append("minBidAmount", minBidAmount);
formData.append("duration", duration);
formData.append("category", category);

if (image) {
  formData.append("image", image);
}

galleryImages.forEach((file) => {
  formData.append("gallery", file);
});

const response = await axios.put(
  `http://localhost:3000/api/v1/auctionUpdated/${auction._id}`,
  formData,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

        alert("Auction Updated Successfully");
        closeModal(true);
        window.location.reload(true);
    }catch(error){
        alert("Error Updating Auction", error.message);
    }

    console.log("Updated Auction:", {
      id: auction._id,
      name,
      description,
      startingPrice,
      minBidAmount,
      duration,
      category,
    //   startDateTime,
      image,
      galleryImages
    });

    // API baad mein yahan lagayenge

    closeModal();
  };


  return (

    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-2xl p-7 relative max-h-[90vh] overflow-y-auto">


        {/* Close Button */}

        <button
          onClick={closeModal}
          className="absolute top-4 right-5 text-2xl text-slate-400 hover:text-white"
        >
          ×
        </button>


        {/* Heading */}

        <h2 className="text-2xl font-bold text-white mb-6">
          Edit Auction
        </h2>


        <form onSubmit={handleSubmit}>


          {/* Auction Name */}

          <div className="mb-5">

            <label className="block text-slate-300 mb-2">
              Auction Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter auction name"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-amber-500"
            />

          </div>


          {/* Description */}

          <div className="mb-5">

            <label className="block text-slate-300 mb-2">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Enter auction description"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-amber-500 resize-none"
            />

          </div>


          {/* Starting Price + Minimum Bid */}

          <div className="grid grid-cols-2 gap-4 mb-5">


            {/* Starting Price */}

            <div>

              <label className="block text-slate-300 mb-2">
                Starting Price
              </label>

              <input
                type="number"
                value={startingPrice}
                onChange={(e) => setStartingPrice(e.target.value)}
                placeholder="Starting price"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-amber-500"
              />

            </div>


            {/* Minimum Bid */}

            <div>

              <label className="block text-slate-300 mb-2">
                Minimum Bid Amount
              </label>

              <input
                type="number"
                value={minBidAmount}
                onChange={(e) => setMinBidAmount(e.target.value)}
                placeholder="Minimum bid"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-amber-500"
              />

            </div>

          </div>


          {/* Duration + Category */}

          <div className="grid grid-cols-2 gap-4 mb-5">


            {/* Duration */}

            <div>

              <label className="block text-slate-300 mb-2">
                Duration
              </label>

              <input
                type="number"
                min="1"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Duration in hours"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-amber-500"
              />

            </div>


            {/* Category */}

            <div>

              <label className="block text-slate-300 mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-amber-500"
              >

                <option value="">
                  Select Category
                </option>

                <option>Mobiles & Tablets</option>
                <option>Laptops & Computers</option>
                <option>Electronics</option>
                <option>Gaming</option>
                <option>Cameras & Drones</option>
                <option>Home Appliances</option>
                <option>Furniture</option>
                <option>Fashion</option>
                <option>Watches & Accessories</option>
                <option>Beauty & Health</option>
                <option>Books</option>
                <option>Sports & Fitness</option>
                <option>Toys & Kids</option>
                <option>Vehicles</option>
                <option>Motorcycles</option>
                <option>Property</option>
                <option>Tools & Machinery</option>
                <option>Art & Collectibles</option>
                <option>Musical Instruments</option>
                <option>Pets</option>
                <option>Office Equipment</option>
                <option>Garden & Outdoor</option>
                <option>Jewellery</option>
                <option>Other</option>

              </select>

            </div>

          </div>


          {/* Start Date Time */}

          {/* <div className="mb-6">

            <label className="block text-slate-300 mb-2">
              Auction Start Date & Time
            </label>

            <input
              type="datetime-local"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none focus:border-amber-500"
            />

          </div> */}


          {/* Current Main Image */}

          {auction?.image && (

            <div className="mb-5">

              <label className="block text-slate-300 mb-2">
                Current Image
              </label>

              <img
                src={auction.image}
                alt={auction.name}
                className="w-32 h-32 rounded-lg object-cover border border-slate-700"
              />

            </div>

          )}


          {/* Change Main Image */}

          <div className="mb-6">

            <label className="block text-slate-300 mb-2">
              Change Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-300"
            />

          </div>


          {/* Current Gallery */}

          {auction?.gallery?.length > 0 && (

            <div className="mb-6">

              <label className="block text-slate-300 mb-2">
                Current Gallery Images
              </label>

              <div className="flex flex-wrap gap-3">

                {auction.gallery.map((img, index) => (

                  <img
                    key={index}
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-24 h-24 rounded-lg object-cover border border-slate-700"
                  />

                ))}

              </div>

            </div>

          )}


          {/* New Gallery */}

          <div className="mb-6">

            <label className="block text-slate-300 mb-2">
              Change Gallery Images
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setGalleryImages(
                  Array.from(e.target.files)
                )
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-300"
            />

          </div>


          {/* Buttons */}

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={closeModal}
              className="bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-lg text-white"
            >
              Cancel
            </button>


            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 px-5 py-2 rounded-lg text-white font-semibold"
            >
              Update Auction
            </button>

          </div>


        </form>

      </div>

    </div>

  );
};

export default EditAuctionModal;