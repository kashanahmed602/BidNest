import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SidebarLayout from "../Layout/SidebarLayout";
import axios from "axios";

const ProductDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const response = await axios.get(
          `http://localhost:3000/api/v1/product/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const fetchedProduct = response.data.product;

        console.log("Fetched Products : ", fetchedProduct);

        setProduct(fetchedProduct);
        setSelectedImage(fetchedProduct.image);

      } catch (error) {

        console.log("Error Fetching Product", error);

      }

    };

    fetchProduct();

  }, [id]);


  // Loading
  if (!product) {
    return (
      <SidebarLayout>
        <div className="flex justify-center items-center h-96">
          <p className="text-slate-400 text-xl">
            Loading Product...
          </p>
        </div>
      </SidebarLayout>
    );
  }


  // Gallery images
  const galleryImages = product.gallery || [];


  return (

    <SidebarLayout>

      {/* Back Button */}

      <button
        onClick={() => navigate(-1)}
        className="text-slate-400 hover:text-white mb-6"
      >
        ← Back to Marketplace
      </button>


      {/* Product Container */}

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

        <div className="grid lg:grid-cols-2 gap-10">


          {/* LEFT SIDE - Images */}

          <div>

            {/* Main Image */}

            <div className="bg-slate-800 rounded-xl overflow-hidden">

              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-[450px] object-cover"
              />

            </div>


            {/* Gallery */}

            {galleryImages.length > 0 && (

              <div className="grid grid-cols-4 gap-3 mt-4">

                {/* Main Image Thumbnail */}

                <button
                  onClick={() => setSelectedImage(product.image)}
                  className={`rounded-lg overflow-hidden border-2 ${
                    selectedImage === product.image
                      ? "border-amber-500"
                      : "border-slate-700"
                  }`}
                >

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-20 object-cover"
                  />

                </button>


                {/* Gallery Images */}

                {galleryImages.map((image, index) => (

                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`rounded-lg overflow-hidden border-2 ${
                      selectedImage === image
                        ? "border-amber-500"
                        : "border-slate-700"
                    }`}
                  >

                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />

                  </button>

                ))}

              </div>

            )}

          </div>


          {/* RIGHT SIDE - Details */}

          <div>

            {/* Category */}

            <p className="text-amber-400 font-medium">
              {product.category}
            </p>


            {/* Name */}

            <h1 className="text-4xl font-bold text-white mt-2">
              {product.name}
            </h1>


            {/* Price */}

            <h2 className="text-4xl font-bold text-amber-500 mt-6">
              PKR {product.price?.toLocaleString()}
            </h2>


            {/* Quantity */}

            <div className="mt-5">

              <p className="text-slate-400">
                Available Quantity
              </p>

              <p className="text-white text-lg font-semibold">
                {product.quantity}
              </p>

            </div>


            {/* Description */}

            <div className="mt-6">

              <h3 className="text-xl font-semibold text-white">
                Description
              </h3>

              <p className="text-slate-400 mt-2 leading-7">
                {product.description}
              </p>

            </div>


            {/* Seller */}

            {product.userId && (

              <div className="mt-6 bg-slate-800 rounded-lg p-4">

                <p className="text-slate-400 text-sm">
                  Seller
                </p>

                <p className="text-white font-semibold mt-1">
                  {product.userId.name}
                </p>

                {/* <p className="text-slate-400 text-sm">
                  {product.userId.email}
                </p> */}

              </div>

            )}


            {/* Buy Button */}

            <button
              className="w-full mt-8 bg-amber-500 hover:bg-amber-600 py-4 rounded-lg text-white font-bold text-lg"
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>

    </SidebarLayout>

  );
};

export default ProductDetails;