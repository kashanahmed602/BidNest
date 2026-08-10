import { useRef, useState } from "react";
import axios from 'axios';

const AuctionModal = ({ closeModal }) => {
  const fileInputRef = useRef(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [minBidAmount, setMinBidAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  const createAuction = async () => {
    try{
        const formData = new FormData();

    formData.append("name", name);
formData.append("description", description);
formData.append("category", category);
formData.append("startingPrice", startingPrice);
formData.append("minBidAmount", minBidAmount);
formData.append("duration", duration);
formData.append("image", image);  

gallery.forEach((file) => {
  formData.append("gallery", file)
})
    
      const token = localStorage.getItem("token");

        const response = await axios.post("http://localhost:3000/api/v1/createAuction",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
        })


    alert("Auction Submitted Successfully");

    setName("");
    setDescription("");
    setCategory("");
    setStartingPrice("");
    setMinBidAmount("");
    setDuration("");
    setImage(null);
    setGallery(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    closeModal();

}catch(error){

}
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-3xl p-8 relative">

        {/* Close */}

        <button
          onClick={closeModal}
          className="absolute top-4 right-5 text-2xl text-slate-400 hover:text-white"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-white mb-8">
          Create Auction
        </h2>

        <div className="grid gap-6">

          {/* Name */}

          <input
            type="text"
            placeholder="Auction Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-slate-800 p-3 rounded-lg text-white outline-none"
          />

          {/* Description */}

          <textarea
            rows="5"
            placeholder="Auction Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-slate-800 p-3 rounded-lg text-white outline-none resize-none"
          />

          {/* Category */}

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-slate-800 p-3 rounded-lg text-white"
          >
            <option value="">Select Category</option>

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

          {/* Prices */}

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="number"
              placeholder="Starting Price"
              value={startingPrice}
              onChange={(e) => setStartingPrice(e.target.value)}
              className="bg-slate-800 p-3 rounded-lg text-white outline-none"
            />

            <input
              type="number"
              placeholder="Minimum Bid Increment"
              value={minBidAmount}
              onChange={(e) => setMinBidAmount(e.target.value)}
              className="bg-slate-800 p-3 rounded-lg text-white outline-none"
            />

          </div>

          {/* Duration */}

          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="bg-slate-800 p-3 rounded-lg text-white"
          >
            <option value="">Auction Duration</option>

            <option value="1">1 Hour</option>
            <option value="2">2 Hours</option>
            <option value="3">3 Hours</option>
            <option value="6">6 Hours</option>
            <option value="12">12 Hours</option>
            <option value="24">24 Hours</option>
            <option value="48">48 Hours</option>
            <option value="72">72 Hours</option>
          </select>

          {/* Image */}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="bg-slate-800 p-3 rounded-lg text-white"
          />

           <input

        type="file"
        accept='image/*'
        multiple
        onChange={(e) => setGallery(Array.from(e.target.files))}
        className="bg-slate-800 p-3 rounded-lg text-white"
        />

          {/* Buttons */}

          <div className="flex justify-end gap-3">

            <button
              onClick={closeModal}
              className="bg-slate-700 hover:bg-slate-600 px-5 py-3 rounded-lg text-white"
            >
              Cancel
            </button>

            <button
              onClick={createAuction}
              className="bg-amber-500 hover:bg-amber-600 px-5 py-3 rounded-lg text-white font-semibold"
            >
              Submit Auctionssssss
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AuctionModal;