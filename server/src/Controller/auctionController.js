const Auction = require('../Models/auctionModel');
const imagekit = require('../Config/imageKit')


const createAuction = async (req, res) => {
    const {name, description, category, startingPrice, minBidAmount, duration} = req.body;

    try{

        const uploadImage = await imagekit.upload({
            file: req.file.buffer,
            fileName: req.file.originalname,
            folder: "/BidNest"
        })
        const newAuction = await Auction.create({
            name,
            description,
            category,
            image: uploadImage.url,
            sellerId: req.user.id,
            startingPrice,
            minBidAmount,
            duration
        })

        res.status(201).json({
            success: true,
            message: "Auction Created Successfully",
            auction: newAuction
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


const getAuctions = async (req, res) => {
    try{
        const auctions = await Auction.find().populate("sellerId", "name email");
        
        if(!auctions){
            return res.status(404).json({
                success: false,
                message: "No Auctions Data Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Auctions Data Fetched Successfully",
            auctions: auctions
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

module.exports =  {createAuction, getAuctions} 