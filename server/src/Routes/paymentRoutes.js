const express = require("express");

const router = express.Router();

const {
  createPayment,
  safepayWebhook,
  verifyPayment
} = require("../Controller/paymentController");

const auth = require("../Middleware/auth");


// Create payment
router.post("/paymentCreate", auth, createPayment);

// Verify payment after Safepay redirect
router.post("/paymentVerify", auth, verifyPayment);

// Safepay webhook
router.post("/paymentWebhook", safepayWebhook);


module.exports = router;