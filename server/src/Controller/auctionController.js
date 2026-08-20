const Auction = require('../Models/auctionModel');
const imagekit = require('../Config/imageKit')


const createAuction = async (req, res) => {
    const {name, description, category, startingPrice, minBidAmount, duration} = req.body;

    try{

        const mainImage = req.files.image[0];

        const uploadImage = await imagekit.upload({
            file: mainImage.buffer,
            fileName: mainImage.originalname,
            folder: "/BidNest"
        })

        const galleryImages = [];

        for(const file of req.files.gallery || []){
            const uploadGalleryImage = await imagekit.upload({
                file: file.buffer,
                fileName: file.originalname,
                folder: "/Bidnest/gallery/auction"
            })
            galleryImages.push(uploadGalleryImage.url);
        }

        const newAuction = await Auction.create({
            name,
            description,
            category,
            image: uploadImage.url,
            gallery: galleryImages,
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
        const filter = {
            sellerId: req.user.id
        };

        if(req.query.status){
            filter.status = req.query.status
        }

        const auctions = await Auction.find(filter).populate("sellerId", "name email");
        
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

const updateAuction = async (req, res) => {
    const {id} = req.params;
    const {startDateTime, approvalStatus } = req.body;

    try{
        const updateAuction = await Auction.findByIdAndUpdate(id,
            {startDateTime, approvalStatus},
            {new: true}
        )

        if(!updateAuction){
            return res.status(404).json({
                success: false,
                message: "Auction Not Found"
            });
        }

        res.status(201).json({
            success: true,
            message: "Auction Updated Successfully",
            auction: updateAuction
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const marketAuctions = async (req, res) => {
    try{
        const auctions = await Auction.find({
            sellerId: { $ne: req.user.id},
            approvalStatus: "approved"
        });

        if(!auctions || auctions.length === 0){
            return res.status(200).json({
                success: true,
                message: "Auctions Fetched Successfully",
                auctions: []
            });
        }

        // populate bidder names for last bid
        const populated = await Auction.find({
            sellerId: { $ne: req.user.id},
            approvalStatus: "approved"
        }).populate("sellerId", "name email").populate("bids.bidderId", "name").lean();

        const auctionsWithLast = populated.map(a => {
            const lastBid = a.bids && a.bids.length ? a.bids[a.bids.length - 1] : null;
            return {
                ...a,
                lastBidderName: lastBid && lastBid.bidderId ? lastBid.bidderId.name : null,
                lastBidderId: lastBid && lastBid.bidderId ? String(lastBid.bidderId._id) : (lastBid ? String(lastBid.bidderId) : null)
            };
        });

        res.status(200).json({
            success: true,
            message: "Auctions Fetched Successfully",
            auctions: auctionsWithLast
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const auctionDelete = async (req, res) => {
    const {id} = req.params;

    try{

        const auction = await Auction.findByIdAndDelete(id);

        if(!auction){
            return res.status(404).json({
                success: false,
                message: "Auction Not Found"
            })
        }

         res.status(201).json({
                success: true,
                message: "Auction Deleted Successfully"
            })

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const getAuctionById = async (req, res) => {
  try {
    const { id } = req.params;

    const auction = await Auction.findById(id)
      .populate("sellerId", "name email");

    if (!auction) {
      return res.status(404).json({
        success: false,
        message: "Auction Not Found"
      });
    }

    res.status(200).json({
      success: true,
      auction
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getPendingAuction = async (req, res) => {
  try {
    const auctions = await Auction.find({
      approvalStatus: "pending"
    }).populate("sellerId", "name email");

    res.status(200).json({
      success: true,
      auctions
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const editAuction = async (req, res) => {
    const { id } = req.params;
    const { name, description, category, startingPrice, minBidAmount, duration } = req.body

    try {
        const updatedData = {
            name,
            description,
            category,
            startingPrice,
            minBidAmount,
            duration
        }

        if(req.files?.image?.length > 0) {
        const mainImage = req.files.image[0];
        const uploadImage = await imagekit.upload({
            file: mainImage.buffer,
            fileName: mainImage.originalname,
            folder: "/Bidnest/Aution/Products"
        });
        updatedData.image = uploadImage.url;
    }

    if(req.files?.gallery?.length > 0){
        const galleryImage = [];
        for(const file of req.files.gallery){
            const uploadGallery = await imagekit.upload({
                file: file.buffer,
                fileName: file.originalname,
                folder: "/Bidnest/Aution/Gallery"
            });
            galleryImage.push(uploadGallery.url)
        }

        updatedData.gallery = galleryImage;
    }

    const productUpdate = await Auction.findByIdAndUpdate(id,
        updatedData,
        {new: true}
    );

    if(!productUpdate){
        return res.status(404).json({
            success: false,
            message: "Auction Not Found"
        });
    }

    res.status(201).json({
        success: true,
        message: "Auction Updated Successfully",
        auction: productUpdate
    });

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
}

const placeBid = async (req, res) => {
    try {

        const { auctionId, bidAmount } = req.body;

        const auction = await Auction.findById(auctionId);

        if (!auction) {
            return res.status(404).json({
                success: false,
                message: "Auction Not Found"
            });
        }

        // Auction live honi chahiye
        if (auction.auctionStatus !== "live") {
            return res.status(400).json({
                success: false,
                message: "Auction is not live"
            });
        }

        const userBid = Number(bidAmount);
        const currentBid = Number(auction.currentBid) || 0;
        const startingPrice = Number(auction.startingPrice);
        const minBidAmount = Number(auction.minBidAmount);

        // Invalid amount
        if (!userBid || userBid <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid bid amount"
            });
        }

        // User ki bid minimum increment se kam nahi honi chahiye
        if (userBid < minBidAmount) {
            return res.status(400).json({
                success: false,
                message: `Minimum bid amount is PKR ${minBidAmount.toLocaleString()}`
            });
        }

        let newBid;

        // FIRST BID
        if (currentBid === 0) {

            newBid = startingPrice + userBid;

        }

        // NEXT BID
        else {

            newBid = currentBid + userBid;

        }

        // Update current bid
        auction.currentBid = newBid;

        // Save bid history
        auction.bids.push({
            bidderId: req.user.id,
            amount: newBid
        });

        await auction.save();

        // Emit real-time update to connected clients
        try {
            const io = req.app && req.app.get && req.app.get("io");
            const payload = {
                auctionId: auction._id,
                currentBid: auction.currentBid,
                bidderName: req.user && req.user.name ? req.user.name : "Someone",
                bidderId: req.user && req.user._id ? String(req.user._id) : null
            };
            if (io) {
                console.log("Emitting bidPlaced:", payload);
                io.emit("bidPlaced", payload);
            } else {
                console.warn("Socket.io instance not found on app to emit bidPlaced");
            }
        } catch (emitError) {
            console.error("Error emitting bidPlaced:", emitError);
        }

        return res.status(200).json({
            success: true,
            message: "Bid placed successfully",
            currentBid: auction.currentBid
        });

    } catch (error) {

        console.error("Place Bid Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

const getWinner = async (req, res) => {
    try{
        const winner = await Auction.find({
            winnerId: { $eq: req.user.id},
            auctionStatus: "ended"
        }).populate("sellerId", "name email");

        if(!winner || winner.length === 0){
            return res.status(200).json({
                success: true,
                message: "No Winning Auctions"
            });
        }

        res.status(200).json({
            success: true,
            message: "Winning Auctions Fetched Successfully",
            auctions: winner
        });

    }catch(error){
        console.error("Get Winner Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


module.exports =  {createAuction, getAuctions, updateAuction, marketAuctions, auctionDelete, getAuctionById, getPendingAuction, editAuction, placeBid, getWinner };