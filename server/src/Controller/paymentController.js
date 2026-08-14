const safepay = require("../Config/safePay");
const Product = require("../Models/productsModel");
const Order = require("../Models/paymentModel");

const CLIENT_URL =
  process.env.CLIENT_URL || "http://localhost:5175";

// ==========================================
// CREATE PAYMENT
// ==========================================

const createPayment = async (req, res) => {
  try {

    const { productId, paymentMethod } = req.body;

    // ----------------------------------------
    // 1. Validate request
    // ----------------------------------------

    if (!productId || !paymentMethod) {
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

    const merchantApiKey =
      process.env.SAFEPAY_PUBLIC_KEY?.trim();

    const secretKey =
      process.env.SAFEPAY_SECRET_KEY?.trim();

    if (!merchantApiKey || !secretKey) {
      return res.status(500).json({
        success: false,
        message:
          "Safepay credentials are not configured on the server"
      });
    }

    // ----------------------------------------
    // 4. Find product
    // ----------------------------------------

    const product =
      await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // ========================================
    // CASH ON DELIVERY
    // ========================================

    if (paymentMethod === "cash_on_delivery") {

      const order = await Order.create({

        productId: product._id,

        productName: product.name,

        buyerId: req.user.id,

        sellerId: product.userId,

        amount: product.price,

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
          Number(product.price) * 100,

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

        productId: product._id,

        productName: product.name,

        buyerId: req.user.id,

        sellerId: product.userId,

        amount: product.price,

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
      `${CLIENT_URL}/marketplace?payment=success&orderId=${order._id.toString()}`;

    const cancelRedirectUrl =
      `${CLIENT_URL}/marketplace?payment=cancelled&orderId=${order._id.toString()}`;

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

    const body = req.body || {};
    const payload = body.data || body;
    const tracker =
      payload?.tracker ||
      body?.tracker ||
      payload?.payment?.tracker ||
      null;

    const paymentStatus =
      payload?.status ||
      body?.status ||
      payload?.payment?.status ||
      payload?.transaction_status ||
      body?.transaction_status ||
      "";

    const normalizedStatus = String(paymentStatus).toLowerCase();
    const isSuccessfulPayment =
      ["paid", "succeeded", "success", "completed", "approved"].includes(
        normalizedStatus
      ) ||
      normalizedStatus.includes("paid") ||
      normalizedStatus.includes("success") ||
      normalizedStatus.includes("complete");

    console.log(
      "========== SAFE​PAY WEBHOOK =========="
    );
    console.log(JSON.stringify({
      tracker,
      paymentStatus,
      body
    }, null, 2));
    console.log(
      "======================================"
    );

    if (!tracker) {
      return res.status(200).json({
        success: true,
        message: "Webhook received without tracker"
      });
    }

    if (isSuccessfulPayment) {
      await Order.findOneAndUpdate(
        { paymentTracker: tracker },
        {
          paymentStatus: "paid",
          productStatus: "processing"
        },
        { new: true }
      );
    }

    return res.status(200).json({

      success: true,

      message:
        "Webhook received"

    });

  } catch (error) {

    console.error(
      "Safepay Webhook Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};


module.exports = {
  createPayment,
  safepayWebhook
};