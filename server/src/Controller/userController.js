const User = require("../Models/userModel");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { name, email, phone, country, password, role } = req.body;

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



module.exports = {registerUser, loginUser, loginAdmin};