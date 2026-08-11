import axios from 'axios'
import {useState , useRef} from 'react'

const SellProductModal = ({ closeModal }) => {

  const fileInputRef = useRef(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  const createProduct = async () => {
    try{
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("category", category);
      formData.append("image", image);    

      gallery.forEach((file) => {
        formData.append("gallery", file);
      })
    
      const token = localStorage.getItem("token");

await axios.post(
  `${import.meta.env.VITE_API_URL}/createProduct`,
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }
);

      alert("Product Created Successfully");
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setQuantity('');
      setImage(null);
      setGallery([]);

      if (fileInputRef.current) {
      fileInputRef.current.value = "";
}

    }catch(error){
      alert(error);
    }
  }

    return (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

            <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-3xl p-8 relative">

                <button
                    onClick={closeModal}
                    className="absolute top-4 right-5 text-2xl text-slate-400 hover:text-white"
                >
                    ×
                </button>

                <h2 className="text-3xl font-bold text-white mb-8">
                    Add Product
                </h2>

                <div className="grid gap-6">

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Product Name"
                        className="bg-slate-800 p-3 rounded-lg text-white outline-none"
                    />

                    <textarea
                        rows="5"
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                        placeholder="Product Description"
                        className="bg-slate-800 p-3 rounded-lg text-white outline-none resize-none"
                    ></textarea>

                    <input
                        type="number"
                        value={price}
                        onChange={(e)=> setPrice(e.target.value)}
                        placeholder="Starting Price"
                        className="bg-slate-800 p-3 rounded-lg text-white outline-none"
                    />

                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Stock Quantity"
                        className="bg-slate-800 p-3 rounded-lg text-white outline-none"
                    />

                   <select
                   value={category}
                   onChange={(e)=> setCategory(e.target.value)}
                   className="bg-slate-800 p-3 rounded-lg text-white">

                        <option value="Electronics">Select Category</option>

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

                    <div className="flex justify-end gap-3">

                        <button
                            onClick={closeModal}
                            className="bg-slate-700 hover:bg-slate-600 px-5 py-3 rounded-lg text-white"
                        >
                            Cancel
                        </button>

                        <button onClick={createProduct}
                            className="bg-amber-500 hover:bg-amber-600 px-5 py-3 rounded-lg text-white font-semibold"
                        >
                            Submit Product
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default SellProductModal;