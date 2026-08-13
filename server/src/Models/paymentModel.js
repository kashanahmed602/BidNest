const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // Product
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    // Buyer
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Seller
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Amount
    amount: {
      type: Number,
      required: true,
    },

    // Payment method
    paymentMethod: {
      type: String,
      enum: ["cash_on_delivery", "safepay"],
      required: true,
    },

    // Payment status
    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "paid",
        "failed",
        "cancelled",
      ],
      default: "pending",
    },

    // Product / delivery status
    productStatus: {
      type: String,
      enum: [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },

    // Safepay tracker
    paymentTracker: {
      type: String,
      default: null,
    },  
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);