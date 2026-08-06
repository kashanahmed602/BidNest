const Product = require("../Models/productsModel");
const imagekit = require("../Config/imageKit");
// const { findByIdAndDelete } = require("../Models/userModel");


const createProduct = async (req, res) => {

    const { name, description, price, category, quantity } = req.body;

    console.log("Controller Hit");
    console.log(req.file);
    console.log(req.body);

    try {

        const uploadedImage = await imagekit.upload({
            file: req.file.buffer,
            fileName: req.file.originalname,
            folder: "/BidNest"
        });


        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            quantity,
            userId: req.user.id,
            image: uploadedImage.url
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

        const filter = {};

        if (req.query.status) {
            filter.status = req.query.status;
        }

        const products = await Product.find(filter)
            .populate("userId", "name email");

        res.status(200).json({
            success: true,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
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


module.exports = { createProduct, getProducts, deleteProduct, updateStatusProducts };