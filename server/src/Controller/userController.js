const User = require("../Models/userModel");
const Product = require("../Models/productsModel");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { name, email, phone, country, password, role, status } = req.body;

    try{

    const userExists = await User.findOne({email});

    if(userExists){
        return res.status(400).json({
            success: false,
            message: "User Already Exists"          
        })
    }

    const createUser = await User.create({
        name,
        email,
        phone,
        country,
        role,
        status,
        password: await bycrypt.hash(password, 10)
    })

    res.status(201).json({
        success: true,
        message: "User Registered Successfully",
        user: createUser
    })

}catch(error){
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message
    });
}

};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email, role: "user"});
        const isPasswordValid = await bycrypt.compare(password, user.password);

        if(!user && !isPasswordValid){
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "2h"
        });

        res.status(200).json({
            success: true,
            message: "User Logged In Successfully",
            token: token,
            user:user
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}


const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email, role: "admin"});
        const isPasswordValid = await bycrypt.compare(password, user.password);

        if(!user && !isPasswordValid){
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "2h"
        });

        res.status(200).json({
            success: true,
            message: "User Logged In Successfully",
            token: token
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}


const getUsers = async (req, res) => {

    const { status } = req.query;

    try {

        const users = await User.find({
            role: "user",
            status: status
        });

        res.status(200).json({
            success: true,
            users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};


const updateStatus = async (req, res) => {
    const {id} = req.params;
    const {status} = req.body;

    try{

        const update = await User.findByIdAndUpdate(
            id,
            {status},
            {new: true}
        );

        if(!update){
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
            user: update
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
}

const addToWishlist = async(req, res) => {
    const { productId } = req.body;

    try{
        const user = await User.find({_id: req.user.id, status: "approved"});

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User Not Exists"
            });
        }

        const product = await Product.findById({_id: productId, status: "approved"});

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product Not Exists"
            })
        }

        const wishlistItem = await User.findByIdAndUpdate(
            req.user.id,
            {$push: {wishlist: {productId}}},
            {new: true}
        );

        res.status(200).json({
            success: true,
            message: "Product Added to Wishlist",
            wishlist: wishlistItem.wishlist
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

module.exports = {registerUser, loginUser, loginAdmin, getUsers, updateStatus, addToWishlist};