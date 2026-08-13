const safepay = require("../Config/safePay");
const Product = require("../Models/productsModel");
const Order = require("../Models/paymentModel");

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
    // 3. Find product
    // ----------------------------------------

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }


    // ----------------------------------------
    // 4. CASH ON DELIVERY
    // ----------------------------------------

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


    // ----------------------------------------
    // 5. SAFE​PAY PAYMENT SESSION
    // ----------------------------------------

    const paymentSession =
      await safepay.payments.session.setup({

        merchant_api_key:
          process.env.SAFEPAY_PUBLIC_KEY,

        intent: "CYBERSOURCE",

        mode: "payment",

        entry_mode: "raw",

        currency: "PKR",

        // Safepay uses lowest denomination
        // PKR 550,000 -> 55,000,000
        amount: Number(product.price) * 100,

        include_fees: false

      });


    // ----------------------------------------
    // 6. Get Safepay tracker
    // ----------------------------------------

    const tracker =
      paymentSession.data.tracker.token;


    if (!tracker) {

      return res.status(500).json({

        success: false,

        message: "Safepay tracker was not generated"

      });
    }


    // ----------------------------------------
    // 7. Create Order
    // ----------------------------------------

    const order = await Order.create({

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
    // 8. Create Safepay Checkout URL
    // ----------------------------------------

   const checkoutQuery =
  await safepay.checkout.createCheckoutUrl({
    tracker,
    environment: "sandbox",
    source: "hosted",
    redirect_url: "...",
    cancel_url: "..."
  });

// ========================================
// CREATE CHECKOUT URL
// ========================================

const checkoutURL =
  "https://sandbox.api.getsafepay.com/components" +
  "?env=sandbox" +
  "&beacon=" + encodeURIComponent(tracker) +
  "&source=hosted" +
  "&order_id=" + encodeURIComponent(order._id.toString()) +
  "&redirect_url=" + encodeURIComponent(
    "https://kas-bidnest.vercel.app/payment/success"
  ) +
  "&cancel_url=" + encodeURIComponent(
    "https://kas-bidnest.vercel.app/payment/cancel"
  );

console.log("FINAL CHECKOUT URL:");
console.log(checkoutURL);
    // ----------------------------------------
    // 9. Send response
    // ----------------------------------------

    return res.status(200).json({

      success: true,

      message: "Safepay checkout created",

      checkoutURL:
        checkoutURL.url || checkoutURL,

      orderId:
        order._id,

      tracker:
        tracker

    });


  } catch (error) {

    console.log(
      "Safepay Create Payment Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }
};


// ==========================================
// SAFE​PAY WEBHOOK
// ==========================================

const safepayWebhook = async (req, res) => {

  try {

    console.log(
      "========== SAFE​PAY WEBHOOK =========="
    );

    console.log(req.body);

    console.log(
      "======================================"
    );


    return res.status(200).json({

      success: true,

      message: "Webhook received"

    });

  } catch (error) {

    console.log(
      "Safepay Webhook Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


module.exports = {
  createPayment,
  safepayWebhook
};

