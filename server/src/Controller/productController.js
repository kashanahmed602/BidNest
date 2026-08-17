const Product = require("../Models/productsModel");
const imagekit = require("../Config/imageKit");
// const { findByIdAndDelete } = require("../Models/userModel");


const createProduct = async (req, res) => {

    const { name, description, price, category, quantity } = req.body;

    try {

        const mainImage = req.files.image[0]

        const uploadedImage = await imagekit.upload({
            file: mainImage.buffer,
            fileName: mainImage.originalname,
            folder: "/BidNest"
        });

        const galleryImages = [];

        for (const file of req.files.gallery || []){
            const uploadGalleryImage = await imagekit.upload({
                file: file.buffer,
                fileName: file.originalname,
                folder: "/Bidnest/gallery"
            });

            galleryImages.push(uploadGalleryImage.url);
        }


        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            quantity,
            userId: req.user.id,
            image: uploadedImage.url,
            gallery: galleryImages
        });

        res.status(201).json({
            success: true,
            products: newProduct
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getProducts = async (req, res) => {
    try {

         const filter = {
        userId: req.user.id
        };

        if (req.query.status) {
            filter.status = req.query.status;
        }

        const products = await Product.find(filter).populate("userId", "name email");

        res.status(200).json({
            success: true,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try{
        const deleteItem = await Product.findByIdAndDelete(id);

        if(!deleteItem){
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const updateStatusProducts = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try{
        const product = await Product.findByIdAndUpdate(id,
            { status: status },
            { new: true }
        );

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: `Product ${status} Successfully`,
            product: product
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const getMarketPlaceProducts = async (req, res) => {
    try{

        const products = await Product.find({
            userId: { $ne: req.user.id },
            status: "approved"
        });

        if(!products){
            return res.status(404).json({
                success: false,
                message: "No Products Found"
            });
        }

        res.status(200).json({
            success: false,
            message: "Products Fetched Successfully",
            products: products
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const getProductById = async (req, res) => {

    const { id } = req.params;

    try {

        const product = await Product.findById(id)
            .populate("userId", "name email");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getPendingProducts = async (req, res) => {
  try {
    const products = await Product.find({
      status: "pending"
    }).populate("userId", "name email");

    res.status(200).json({
      success: true,
      products
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const EditProduct = async (req, res) => {

    const { id } = req.params;

    const {
        name,
        description,
        price,
        category,
        quantity,
        status
    } = req.body;

    try {

        const updateData = {
            name,
            description,
            price,
            category,
            quantity,
            status
        };


        // =========================
        // MAIN IMAGE
        // =========================

        if (req.files?.image?.length > 0) {

            const mainImage = req.files.image[0];

            const uploadImage = await imagekit.upload({
                file: mainImage.buffer,
                fileName: mainImage.originalname,
                folder: "/Bidnet/Update/Products"
            });

            updateData.image = uploadImage.url;
        }


        // =========================
        // GALLERY IMAGES
        // =========================

        if (req.files?.gallery?.length > 0) {

            const galleryImages = [];

            for (const file of req.files.gallery) {

                const uploadGallery = await imagekit.upload({
                    file: file.buffer,
                    fileName: file.originalname,
                    folder: "/Bidnest/Update/Gallery"
                });

                galleryImages.push(uploadGallery.url);
            }

            updateData.gallery = galleryImages;
        }


        // =========================
        // UPDATE PRODUCT
        // =========================

        const productUpdate = await Product.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true
            }
        );


        if (!productUpdate) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }


        res.status(200).json({

            success: true,

            message: "Product Updated Successfully",

            product: productUpdate

        });


    } catch (error) {

        console.log("Edit Product Error:", error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



module.exports = { createProduct, getProducts, deleteProduct, updateStatusProducts, getMarketPlaceProducts, getProductById, getPendingProducts, EditProduct };