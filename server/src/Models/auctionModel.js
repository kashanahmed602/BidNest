const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    startingPrice: {
        type: Number,
        required: true
    },

    minBidAmount: {
        type: Number,
        required: true
    },

    startDateTime: {
        type: Date,
        default: null

    },

    duration: {
        type: Number,
        required: true
    },

    currentBid: {
        type: Number,
        default: 0
    },

    winnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    approvalStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },

    auctionStatus: {
    type: String,
    enum: ["upcoming", "live", "ended"],
    default: "upcoming"
}

},

{
    timestamps: true
})

module.exports = mongoose.model('Auction', auctionSchema);