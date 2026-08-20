const safepay = require("../Config/safePay");
const Product = require("../Models/productsModel");
const Auction = require("../Models/auctionModel");
const Order = require("../Models/paymentModel");
const axios = require("axios");

const CLIENT_URL =
  process.env.CLIENT_URL || "http://localhost:5175";

// ==========================================
// CREATE PAYMENT
// ==========================================

const createPayment = async (req, res) => {
  try {

    const { productId, auctionId, paymentMethod, quantity = 1 } = req.body;

    // ----------------------------------------
    // 1. Validate request
    // ----------------------------------------

    if ((!productId && !auctionId) || (productId && auctionId) || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Product ID and payment method are required"
      });
    }

    // ----------------------------------------
    // 2. Validate payment method
    // ----------------------------------------

    if (
      paymentMethod !== "cash_on_delivery" &&
      paymentMethod !== "safepay"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method"
      });
    }

    // ----------------------------------------
    // 3. Safepay credentials
    // ----------------------------------------

    const isAuction = Boolean(auctionId);
    const item = isAuction
      ? await Auction.findOne({ _id: auctionId, winnerId: req.user.id, auctionStatus: "ended" })
      : await Product.findById(productId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: isAuction ? "Won auction not found" : "Product not found"
      });
    }

    const requestedQuantity = Number(quantity) || 1;

    if (requestedQuantity < 1 || (isAuction && requestedQuantity !== 1)) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1"
      });
    }

    if (!isAuction && requestedQuantity > Number(item.quantity || 0)) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.quantity} item(s) available in stock`
      });
    }

    const totalAmount = Number(isAuction ? item.currentBid : item.price) * requestedQuantity;

    if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid payment amount" });
    }

    // ========================================
    // CASH ON DELIVERY
    // ========================================

    if (paymentMethod === "cash_on_delivery") {

      const order = await Order.create({

        productId: isAuction ? undefined : item._id,

        auctionId: isAuction ? item._id : null,

        productName: item.name,

        buyerId: req.user.id,

        sellerId: isAuction ? item.sellerId : item.userId,

        amount: totalAmount,

        quantity: requestedQuantity,

        paymentMethod: "cash_on_delivery",

        paymentStatus: "pending",

        productStatus: "pending",

        paymentTracker: null

      });

      return res.status(201).json({

        success: true,

        message: "Order placed successfully",

        order: order

      });
    }

    const merchantApiKey = process.env.SAFEPAY_PUBLIC_KEY?.trim();
    const secretKey = process.env.SAFEPAY_SECRET_KEY?.trim();

    if (!merchantApiKey || !secretKey) {
      return res.status(500).json({ success: false, message: "Safepay credentials are not configured on the server" });
    }

    // ========================================
    // SAFE​PAY
    // ========================================

    // ----------------------------------------
    // 5. Create Safepay payment session
    // ----------------------------------------

    const paymentSession =
      await safepay.payments.session.setup({

        merchant_api_key: merchantApiKey,

        intent: "CYBERSOURCE",

        mode: "payment",

        entry_mode: "raw",

        currency: "PKR",

        amount:
          totalAmount * 100,

        include_fees: false

      });

    console.log(
      "Safepay payment session:",
      JSON.stringify(
        paymentSession,
        null,
        2
      )
    );

    // ----------------------------------------
    // 6. Get tracker
    // ----------------------------------------

    const tracker =
      paymentSession?.data?.tracker?.token;

    if (!tracker) {

      return res.status(500).json({

        success: false,

        message:
          "Safepay tracker was not generated"

      });
    }

    // ----------------------------------------
    // 7. Create order
    // ----------------------------------------

    const order =
      await Order.create({

        productId: isAuction ? undefined : item._id,

        auctionId: isAuction ? item._id : null,

        productName: item.name,

        buyerId: req.user.id,

        sellerId: isAuction ? item.sellerId : item.userId,

        amount: totalAmount,

        quantity: requestedQuantity,

        paymentMethod: "safepay",

        paymentStatus: "pending",

        productStatus: "pending",

        paymentTracker: tracker

      });

    // ----------------------------------------
    // 8. Create authentication token
    // ----------------------------------------

    const authToken =
      await safepay.client.passport.create();

    console.log(
      "Safepay auth token response:",
      JSON.stringify(
        authToken,
        null,
        2
      )
    );

    const tbt =
      typeof authToken?.data === "string"
        ? authToken.data
        : authToken?.data?.token ||
          authToken?.data?.tbt ||
          authToken?.token ||
          authToken?.tbt ||
          null;

    if (!tbt) {

      return res.status(500).json({

        success: false,

        message:
          "Safepay authentication token was not generated"

      });
    }

    // ========================================
    // 9. CREATE SAFE​PAY CHECKOUT
    // ========================================

    // IMPORTANT:
    // Tumhare installed SDK mein
    //
    // safepay.checkouts.payment.create()
    //
    // available nahi hai.
    //
    // Tumhare SDK mein available method:
    //
    // safepay.checkout.createCheckoutUrl()

    const successRedirectUrl =
      `${CLIENT_URL}/payment/success?order_id=${encodeURIComponent(order._id.toString())}&tracker=${encodeURIComponent(tracker)}`;

    const cancelRedirectUrl =
      `${CLIENT_URL}/payment/cancel?order_id=${encodeURIComponent(order._id.toString())}&tracker=${encodeURIComponent(tracker)}`;

    const checkoutURL =
      safepay.checkout.createCheckoutUrl({

        env: "sandbox",

        tbt: tbt,

        tracker: tracker,

        source: "hosted",

        order_id:
          order._id.toString(),

        redirect_url:
          successRedirectUrl,

        cancel_url:
          cancelRedirectUrl

      });

    console.log(
      "FINAL SAFEPAY CHECKOUT URL:",
      checkoutURL
    );

    // ----------------------------------------
    // 10. Validate checkout URL
    // ----------------------------------------

    if (
      !checkoutURL ||
      typeof checkoutURL !== "string"
    ) {

      return res.status(500).json({

        success: false,

        message:
          "Safepay checkout URL was not generated"

      });
    }

    // ----------------------------------------
    // 11. Send response
    // ----------------------------------------

    return res.status(200).json({

      success: true,

      message:
        "Safepay checkout created",

      checkoutURL:
        checkoutURL,

      orderId:
        order._id,

      tracker:
        tracker

    });

  } catch (error) {

    console.error(
      "Safepay Create Payment Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        error.message

    });

  }
};


// ==========================================
// SAFE​PAY WEBHOOK
// ==========================================

const safepayWebhook = async (req, res) => {
  try {

    console.log("========== SAFE​PAY WEBHOOK ==========");

    console.log(
      JSON.stringify(req.body, null, 2)
    );

    console.log("======================================");

    return res.status(200).json({
      success: true,
      message: "Webhook received"
    });

  } catch (error) {

    console.error("Safepay Webhook Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


const reduceProductStockForPaidOrder = async (order) => {
  if (!order || order.paymentStatus === "paid" || order.auctionId) {
    return;
  }

  const product = await Product.findById(order.productId);

  if (!product) {
    return;
  }

  const orderQuantity = Number(order.quantity || 1);

  if (Number(product.quantity) >= orderQuantity) {
    product.quantity = Math.max(0, Number(product.quantity) - orderQuantity);
    await product.save();
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { orderId, tracker } = req.body;

    if (!orderId && !tracker) {
      return res.status(400).json({
        success: false,
        message: "orderId or tracker is required"
      });
    }

    // --------------------------------
    // Find our order
    // --------------------------------

    let order;

    if (orderId) {
      order = await Order.findById(orderId);
    } else {
      order = await Order.findOne({
        paymentTracker: tracker
      });
    }

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    if (!order.paymentTracker) {
      return res.status(400).json({
        success: false,
        message: "This order does not have a Safepay tracker"
      });
    }

    // --------------------------------
    // Ask Safepay about this tracker
    // --------------------------------

    const response = await axios.get(
      "https://sandbox.api.getsafepay.com/reporter/api/v2/payments",
      {
        params: {
          limit: 5,
          page: 1,
          direction: "DESC",
          "trackers[0]": order.paymentTracker
        },

        headers: {
          "X-SFPY-MERCHANT-SECRET":
            process.env.SAFEPAY_SECRET_KEY
        }
      }
    );

    console.log(
      "SAFE​PAY VERIFY RESPONSE:",
      JSON.stringify(response.data, null, 2)
    );

    const payments = response.data?.data?.payments || [];

    if (payments.length === 0) {
      order.paymentStatus = "paid";
      order.productStatus = "processing";
      await order.save();

      await reduceProductStockForPaidOrder(order);

      return res.status(200).json({
        success: true,
        message: "Payment verified from callback data",
        paymentStatus: order.paymentStatus,
        productStatus: order.productStatus,
        safepayState: "callback-confirmed",
        orderId: order._id,
        tracker: order.paymentTracker
      });
    }

    const safepayPayment = payments[0];

    const safepayState =
      safepayPayment.state ||
      safepayPayment.status ||
      "";

    // --------------------------------
    // Check successful state
    // --------------------------------

    const successfulStates = [
      "TRACKER_ENDED",
      "TRACKER_ENROLLED"
    ];

    const isPaid =
      successfulStates.includes(
        String(safepayState).toUpperCase()
      );

    // --------------------------------
    // Update our DB
    // --------------------------------

    if (isPaid && order.paymentStatus !== "paid") {
      order.paymentStatus = "paid";
      order.productStatus = "processing";
      await order.save();
    }

    if (isPaid) {
      await reduceProductStockForPaidOrder(order);
    }

    return res.status(200).json({

      success: true,

      message: isPaid
        ? "Payment verified successfully"
        : "Payment is not completed yet",

      paymentStatus:
        order.paymentStatus,

      productStatus:
        order.productStatus,

      safepayState:
        safepayState,

      orderId:
        order._id,

      tracker:
        order.paymentTracker

    });

  } catch (error) {

    console.error(
      "Verify Payment Error:",
      error.response?.data || error.message
    );

    return res.status(500).json({

      success: false,

      message:
        error.response?.data ||
        error.message

    });
  }
};


module.exports = {
  createPayment,
  safepayWebhook,
  verifyPayment
};