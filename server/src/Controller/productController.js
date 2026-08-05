const Product = require("../Models/productsModel");
const imagekit = require("../Config/imageKit")


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
    try{
        const products = await Product.find();

        if(!products){
            return res.status(404).json({
                success: false,
                message: "No Product Found"
            })
        }

        res.status(200).json({
            success: true,
            products: products
        });

    }catch(error){

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};


module.exports = { createProduct, getProducts };