const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
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

    gallery: [
        {
            type: String,
            required: true
        }
    ],

    quantity: {
        type: Number,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },

    // Average
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },

    comment: [
        {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        message:{
            type: String,
            trim: true
        },

        rating :{
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        createdAt:{
            type: Date,
            default: Date.now
        }

    }
    ]
},
{
    timestamps: true,
}
)

module.exports = mongoose.model("Product", productSchema);