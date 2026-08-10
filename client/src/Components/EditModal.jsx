import { useState } from "react";
import axios from "axios";

const EditProductModal = ({ product, closeModal }) => {

  console.log("product in edit Modal", product);

  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [category, setCategory] = useState(product?.category || "");
  const [quantity, setQuantity] = useState(product?.quantity || "");
  const [status, setStatus] = useState("pending");
  const [image, setImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const productUpdate = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("status", status);

      // Only append image if user selected a new one
      if (image) {
        formData.append("image", image);
      }

      galleryImages.forEach((file) => {
        formData.append("gallery", file);
      });

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:3000/api/v1/productUpdate/${product._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Update Response:", response.data);

      alert("Product Updated Successfully");

      window.location.reload(true);

      closeModal();

    } catch (error) {

      console.log("Update Error:", error.response?.data || error.message);

      alert(error.response?.data?.message || "Error updating product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-2xl p-7 relative max-h-[90vh] overflow-y-auto">

        <button
          onClick={closeModal}
          className="absolute top-4 right-5 text-2xl text-slate-400 hover:text-white"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          Edit Product
        </h2>

        <form onSubmit={productUpdate}>

          {/* Product Name */}
          <div className="mb-5">
            <label className="block text-slate-300 mb-2">
              Product Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
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
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white resize-none"
            />
          </div>

          {/* Price + Quantity */}
          <div className="grid grid-cols-2 gap-4 mb-5">

            <div>
              <label className="block text-slate-300 mb-2">
                Price
              </label>

              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                Quantity
              </label>

              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
              />
            </div>

          </div>

          {/* Category */}
          <div className="mb-5">

            <label className="block text-slate-300 mb-2">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
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

          </div>

          {/* Current Main Image */}
          {product?.image && (
            <div className="mb-5">

              <label className="block text-slate-300 mb-2">
                Current Image
              </label>

              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 rounded-lg object-cover border border-slate-700"
              />

            </div>
          )}

          {/* New Main Image */}
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
          {product?.gallery?.length > 0 && (

            <div className="mb-6">

              <label className="block text-slate-300 mb-2">
                Current Gallery Images
              </label>

              <div className="flex flex-wrap gap-3">

                {product.gallery.map((img, index) => (
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
                setGalleryImages(Array.from(e.target.files))
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
              Update Product
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditProductModal;